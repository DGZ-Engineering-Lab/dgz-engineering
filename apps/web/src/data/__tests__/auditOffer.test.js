import { describe, expect, it } from "vitest";
import { AUDIT_OFFER, buildAuditLeadMessage } from "../auditOffer";

describe("AUDIT_OFFER", () => {
  it("has a price, delivery time and deliverables to show", () => {
    expect(AUDIT_OFFER.price).toMatch(/COP/);
    expect(AUDIT_OFFER.delivery).toBeTruthy();
    expect(AUDIT_OFFER.deliverables.length).toBeGreaterThan(0);
  });
});

describe("buildAuditLeadMessage", () => {
  it("includes the offer and the numbers the visitor saw", () => {
    const msg = buildAuditLeadMessage({
      source: "calculator",
      municipio: "Cartago",
      numPredios: 45000,
      yearsOutdated: 7,
      avgTax: 650000,
      annualLeak: 4504500000,
      totalLoss: 18018000000,
    });
    expect(msg).toContain("desde la calculadora");
    expect(msg).toContain(AUDIT_OFFER.name);
    expect(msg).toContain("Municipio / organización: Cartago");
    expect(msg).toContain("Años sin actualizar: 7");
    expect(msg).toMatch(/Fuga anual estimada: .*4\.504\.500\.000/);
  });

  it("skips fields that were not provided and stays within the contact API limit", () => {
    const msg = buildAuditLeadMessage({ source: "report" });
    expect(msg).toContain("desde el informe");
    expect(msg).not.toContain("Municipio");
    expect(msg).not.toContain("Predios");
    expect(msg.length).toBeLessThan(5000);
  });
});
