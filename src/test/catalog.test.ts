import { describe, expect, it } from "vitest";
import { categories, exampleCatalog } from "../catalog";
import { buildChecks } from "../utils/checks";

describe("catalog structure", () => {
  it("has unique category ids", () => {
    const ids = categories.map((item) => item.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has unique example keys", () => {
    const keys = exampleCatalog.map((item) => item.key);
    expect(new Set(keys).size).toBe(keys.length);
  });

  it("maps every example to an existing category", () => {
    const categoryIds = new Set(categories.map((item) => item.id));
    expect(exampleCatalog.every((item) => categoryIds.has(item.categoryId))).toBe(true);
  });

  it("includes at least one online category and one example", () => {
    expect(categories.some((item) => item.status === "online")).toBe(true);
    expect(exampleCatalog.length).toBeGreaterThan(0);
  });

  it("passes structural checks", () => {
    const checks = buildChecks(exampleCatalog, categories);
    expect(checks.every((item) => item.passed)).toBe(true);
  });
});
