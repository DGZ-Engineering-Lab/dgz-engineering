import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Dobles de Resend y Redis: el servicio es un singleton que lee el entorno al importarse.
const mocks = vi.hoisted(() => ({
  send: vi.fn(),
  contactsCreate: vi.fn(),
  segmentsList: vi.fn(),
  redisSet: vi.fn(),
}));

vi.mock("resend", () => ({
  Resend: class {
    constructor() {
      this.emails = { send: mocks.send };
      this.contacts = { create: mocks.contactsCreate };
      this.segments = { list: mocks.segmentsList };
    }
  },
}));

vi.mock("../upstash.js", () => ({
  redis: { set: mocks.redisSet },
}));

async function loadService(env = {}) {
  vi.stubEnv("RESEND_API_KEY", "re_test");
  vi.stubEnv("RESEND_FROM_EMAIL", "hola@devgiz.co");
  vi.stubEnv("RESEND_ADMIN_EMAIL", "admin@devgiz.co");
  vi.stubEnv("RESEND_AUDIENCE_ID", "aud_1");
  for (const [key, value] of Object.entries(env)) vi.stubEnv(key, value);
  vi.resetModules();
  const { emailService } = await import("../email-service.js");
  return emailService;
}

const visitor = {
  name: "Ana",
  email: "ana@example.co",
  company: "<b>ACME</b> http://phish.example",
  message: "Visita http://phish.example y escribe tu clave",
};

describe("EmailService", () => {
  beforeEach(() => {
    vi.spyOn(console, "log").mockImplementation(() => {});
    vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
    mocks.send.mockReset().mockResolvedValue({ data: { id: "e1" }, error: null });
    mocks.contactsCreate.mockReset().mockResolvedValue({ data: { id: "c1" }, error: null });
    mocks.redisSet.mockReset().mockResolvedValue("OK");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("skips the admin notification when RESEND_ADMIN_EMAIL is missing (no hardcoded fallback)", async () => {
    const service = await loadService({ RESEND_ADMIN_EMAIL: "" });
    const res = await service.sendAdminNotification(visitor);
    expect(res).toEqual({ skipped: true, reason: "missing_admin_email" });
    expect(mocks.send).not.toHaveBeenCalled();
  });

  it("sends the admin notification to the configured address", async () => {
    const service = await loadService();
    await service.sendAdminNotification(visitor);
    expect(mocks.send).toHaveBeenCalledOnce();
    expect(mocks.send.mock.calls[0][0].to).toEqual(["admin@devgiz.co"]);
  });

  it("never reflects the visitor's free-text message or company in the confirmation", async () => {
    const service = await loadService();
    await service.sendUserConfirmation(visitor);

    expect(mocks.send).toHaveBeenCalledOnce();
    const { html, to } = mocks.send.mock.calls[0][0];
    expect(to).toEqual(["ana@example.co"]);
    expect(html).not.toContain("phish.example");
    expect(html).not.toContain("ACME");
    expect(html).toContain("Ana");
  });

  it("sends at most one confirmation per address every 24 h", async () => {
    const service = await loadService();
    mocks.redisSet.mockResolvedValueOnce("OK").mockResolvedValueOnce(null);

    await service.sendUserConfirmation(visitor);
    const second = await service.sendUserConfirmation(visitor);

    expect(second).toEqual({ skipped: true, reason: "cooldown" });
    expect(mocks.send).toHaveBeenCalledOnce();
    const [key, value, opts] = mocks.redisSet.mock.calls[0];
    expect(key).toMatch(/^email:confirm:[0-9a-f]{64}$/);
    expect(key).not.toContain("ana@example.co");
    expect(value).toBe("1");
    expect(opts).toEqual({ nx: true, ex: 86400 });
  });

  it("only adds contacts to the audience with explicit consent", async () => {
    const service = await loadService();

    await expect(service.addContactToAudience({ firstName: "Ana", email: visitor.email })).resolves.toEqual({
      skipped: true,
      reason: "no_consent",
    });
    await service.addContactToAudience({ firstName: "Ana", email: visitor.email, consent: "yes" });
    expect(mocks.contactsCreate).not.toHaveBeenCalled();

    await service.addContactToAudience({ firstName: "Ana", email: visitor.email, consent: true });
    expect(mocks.contactsCreate).toHaveBeenCalledOnce();
  });
});
