import { describe, expect, it } from "vitest";
import { SERVICES_DATA } from "../servicesData";

const services = Object.entries(SERVICES_DATA);

describe("SERVICES_DATA", () => {
  it("contains the ten published services", () => {
    expect(services).toHaveLength(10);
  });

  it("keys every service by its slug", () => {
    for (const [key, service] of services) {
      expect(service.slug).toBe(key);
      expect(key).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    }
  });

  it("uses unique service ids", () => {
    const ids = services.map(([, s]) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it.each(services)("%s has the fields the service page renders", (_, service) => {
    for (const field of [
      "id",
      "title",
      "capa",
      "capaLabel",
      "tagline",
      "theme",
      "iconName",
      "concept",
      "problemSolved",
      "solution",
    ]) {
      expect(typeof service[field], field).toBe("string");
      expect(service[field].trim(), field).not.toBe("");
    }
    expect(service.capa).toMatch(/^capa-[123]$/);
    expect(service.metrics.length).toBeGreaterThan(0);
    expect(service.useCases.length).toBeGreaterThan(0);
    for (const useCase of service.useCases) {
      expect(useCase.title).toBeTruthy();
      expect(useCase.desc).toBeTruthy();
    }
  });
});

describe("marketplace tiers", () => {
  it("every tier has a name, price and duration", () => {
    for (const [, service] of services) {
      for (const tier of service.marketplace ?? []) {
        expect(tier.name).toBeTruthy();
        expect(tier.price).toBeTruthy();
        expect(tier.duration).toBeTruthy();
      }
    }
  });

  it("tiers with a deposit declare a percent between 30 and 50", () => {
    for (const [, service] of services) {
      for (const tier of service.marketplace ?? []) {
        if (!tier.deposit) continue;
        expect(tier.deposit.percent).toBeGreaterThanOrEqual(30);
        expect(tier.deposit.percent).toBeLessThanOrEqual(50);
        expect(tier.deposit.amount).toBeTruthy();
        expect(typeof tier.deposit.url).toBe("string");
      }
    }
  });
});
