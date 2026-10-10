import { describe, expect, it, vi } from "vitest";
import { internalError } from "../http";

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
