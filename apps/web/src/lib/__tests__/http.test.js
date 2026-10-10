import { describe, expect, it, vi } from "vitest";
import { getClientIp, internalError } from "../http";

const req = (headers) => ({ headers: new Headers(headers) });

describe("getClientIp", () => {
  it("prefers the Cloudflare header", () => {
    expect(getClientIp(req({ "cf-connecting-ip": "1.1.1.1", "x-forwarded-for": "2.2.2.2" }))).toBe(
      "1.1.1.1"
    );
  });

  it("uses the first X-Forwarded-For hop", () => {
    expect(getClientIp(req({ "x-forwarded-for": " 3.3.3.3 , 10.0.0.1" }))).toBe("3.3.3.3");
  });

  it("falls back when no header is present", () => {
    expect(getClientIp(req({}))).toBe("127.0.0.1");
    expect(getClientIp(req({ "x-forwarded-for": "" }), "unknown")).toBe("unknown");
  });
});

describe("internalError", () => {
  it("returns a generic 500 without leaking the error message", async () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    const res = internalError(new Error("DATABASE_URL=postgres://secret"), "test");

    expect(res.status).toBe(500);
    const body = await res.json();
    expect(body).toEqual({ error: "Internal server error" });
    expect(JSON.stringify(body)).not.toContain("secret");
    expect(spy).toHaveBeenCalledOnce();
  });
});
