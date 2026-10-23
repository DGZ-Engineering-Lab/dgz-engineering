import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Dobles de @upstash/redis y @upstash/ratelimit para probar la rama con Redis sin red.
const mocks = vi.hoisted(() => ({
  limit: vi.fn(),
  incr: vi.fn(),
  expire: vi.fn(),
  ratelimitConfigs: [],
}));

vi.mock("@upstash/redis", () => ({
  Redis: class {
    constructor() {
      this.incr = mocks.incr;
      this.expire = mocks.expire;
      this.get = vi.fn();
      this.set = vi.fn();
    }
  },
}));

vi.mock("@upstash/ratelimit", () => ({
  Ratelimit: class {
    constructor(config) {
      mocks.ratelimitConfigs.push(config);
      this.limit = mocks.limit;
    }
    static slidingWindow(tokens, window) {
      return { tokens, window };
    }
  },
}));

function stubNoCredentials() {
  vi.stubEnv("UPSTASH_REDIS_REST_URL", "");
  vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "");
  vi.stubEnv("KV_REST_API_URL", "");
  vi.stubEnv("KV_REST_API_TOKEN", "");
}

// Without Upstash credentials the module must degrade to pass-through
// behaviour so local development and previews keep working.
describe("upstash helpers without credentials", () => {
  let mod;

  beforeEach(async () => {
    stubNoCredentials();
    vi.stubEnv("VERCEL_ENV", "");
    vi.stubEnv("NODE_ENV", "test");
    vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.resetModules();
    mod = await import("../upstash");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("does not create a client", () => {
    expect(mod.redis).toBeNull();
    expect(mod.ratelimit).toBeNull();
  });

  it("lets every request through the rate limiter", async () => {
    const result = await mod.checkRateLimit("rate_limit:test:1.1.1.1");
    expect(result.success).toBe(true);
    expect(result.remaining).toBe(result.limit);
  });

  it("lets fail-closed limiters through outside production", async () => {
    const result = await mod.checkRateLimit("1.1.1.1", {
      name: "contact",
      tokens: 3,
      window: "1 h",
      failClosed: true,
    });
    expect(result.success).toBe(true);
    expect(result.limit).toBe(3);
  });

  it("fails closed in production only when requested", async () => {
    vi.stubEnv("VERCEL_ENV", "production");
    const closed = await mod.checkRateLimit("1.1.1.1", { name: "ai", tokens: 5, window: "1 m", failClosed: true });
    expect(closed.success).toBe(false);
    expect(closed.reason).toBe("unavailable");

    const open = await mod.checkRateLimit("1.1.1.1", { name: "read", tokens: 30, window: "1 m" });
    expect(open.success).toBe(true);
  });

  it("treats Vercel previews as non-production", async () => {
    vi.stubEnv("VERCEL_ENV", "preview");
    vi.stubEnv("NODE_ENV", "production");
    expect(mod.isProductionEnv()).toBe(false);
    const result = await mod.checkRateLimit("1.1.1.1", { name: "ai", tokens: 5, window: "1 m", failClosed: true });
    expect(result.success).toBe(true);
  });

  it("allows the daily budget without Redis", async () => {
    await expect(mod.dailyBudget("ai", 400)).resolves.toEqual({ allowed: true, count: 0, max: 400 });
  });

  it("calls the producer directly in cacheWrap", async () => {
    const producer = vi.fn().mockResolvedValue({ ok: 1 });
    await expect(mod.cacheWrap("k", 60, producer)).resolves.toEqual({ ok: 1 });
    expect(producer).toHaveBeenCalledOnce();
  });
});

describe("upstash helpers with Redis configured", () => {
  let mod;

  beforeEach(async () => {
    stubNoCredentials();
    vi.stubEnv("UPSTASH_REDIS_REST_URL", "https://example.upstash.io");
    vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "token");
    vi.spyOn(console, "log").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
    mocks.ratelimitConfigs.length = 0;
    mocks.limit.mockReset();
    mocks.incr.mockReset();
    mocks.expire.mockReset();
    vi.resetModules();
    mod = await import("../upstash");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("creates named limiters once, with their own prefix and no analytics", async () => {
    mocks.limit.mockResolvedValue({ success: true, limit: 5, remaining: 4, reset: 0 });
    const opts = { name: "ai", tokens: 5, window: "1 m", failClosed: true };

    await mod.checkRateLimit("1.1.1.1", opts);
    await mod.checkRateLimit("2.2.2.2", opts);

    const named = mocks.ratelimitConfigs.filter((c) => c.prefix === "rl:ai");
    expect(named).toHaveLength(1);
    expect(named[0].analytics).toBe(false);
    expect(named[0].limiter).toEqual({ tokens: 5, window: "1 m" });
    expect(mocks.limit).toHaveBeenCalledWith("2.2.2.2");
  });

  it("keeps the default limiter for legacy calls", async () => {
    mocks.limit.mockResolvedValue({ success: false, limit: 10, remaining: 0, reset: 0 });
    const result = await mod.checkRateLimit("rate_limit:legacy:1.1.1.1");
    expect(result.success).toBe(false);
    expect(mocks.ratelimitConfigs.some((c) => c.prefix === "@upstash/ratelimit")).toBe(true);
  });

  it("fails closed or open on Redis errors depending on the option", async () => {
    mocks.limit.mockRejectedValue(new Error("redis down"));
    const closed = await mod.checkRateLimit("1.1.1.1", { name: "upload", tokens: 5, window: "1 d", failClosed: true });
    expect(closed.success).toBe(false);
    expect(closed.reason).toBe("unavailable");

    const open = await mod.checkRateLimit("1.1.1.1", { name: "read", tokens: 30, window: "1 m" });
    expect(open.success).toBe(true);
  });

  it("counts the daily budget and sets the expiry on first use", async () => {
    mocks.incr.mockResolvedValueOnce(1).mockResolvedValueOnce(41);

    const first = await mod.dailyBudget("contact", 40);
    expect(first).toEqual({ allowed: true, count: 1, max: 40 });
    expect(mocks.expire).toHaveBeenCalledOnce();
    expect(mocks.incr.mock.calls[0][0]).toMatch(/^budget:contact:\d{4}-\d{2}-\d{2}$/);

    const over = await mod.dailyBudget("contact", 40);
    expect(over.allowed).toBe(false);
    expect(mocks.expire).toHaveBeenCalledOnce();
  });
});
