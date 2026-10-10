import { describe, expect, it } from "vitest";
import { escapeHtml } from "../html";

describe("escapeHtml", () => {
  it("escapes the five HTML-significant characters", () => {
    expect(escapeHtml(`<a href="x" title='y'>&</a>`)).toBe(
      "&lt;a href=&quot;x&quot; title=&#39;y&#39;&gt;&amp;&lt;/a&gt;"
    );
  });

  it("neutralises script injection", () => {
    expect(escapeHtml("<script>alert(1)</script>")).not.toContain("<script>");
  });

  it("returns an empty string for null and undefined", () => {
    expect(escapeHtml(null)).toBe("");
    expect(escapeHtml(undefined)).toBe("");
  });

  it("stringifies non-string values and keeps plain text untouched", () => {
    expect(escapeHtml(42)).toBe("42");
    expect(escapeHtml("Catastro Multipropósito – Medellín")).toBe(
      "Catastro Multipropósito – Medellín"
    );
  });
});
