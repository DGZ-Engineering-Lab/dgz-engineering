import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Without Upstash credentials the module must degrade to pass-through
// behaviour so local development and previews keep working.
describe("upstash helpers without credentials", () => {
  let mod;

  beforeEach(async () => {
    vi.stubEnv("UPSTASH_REDIS_REST_URL", "");
    vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "");
    vi.spyOn(console, "warn").mockImplementation(() => {});
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

  it("calls the producer directly in cacheWrap", async () => {
    const producer = vi.fn().mockResolvedValue({ ok: 1 });
    await expect(mod.cacheWrap("k", 60, producer)).resolves.toEqual({ ok: 1 });
    expect(producer).toHaveBeenCalledOnce();
  });
});
