import type { CategoryMeta, ExampleMeta } from "../types";
import { getBounds, withLabelIndex } from "./pca";

export type CheckItem = {
  name: string;
  passed: boolean;
  count: number;
};

export function buildChecks(examples: ExampleMeta[], categories: CategoryMeta[]): CheckItem[] {
  const datasetChecks = examples.map((example) => {
    const plotPoints = withLabelIndex(example.points);
    const bounds = getBounds(example.points);
    const invalidPoint = example.points.some(
      (point) =>
        typeof point.id !== "string" ||
        typeof point.group !== "string" ||
        typeof point.subtype !== "string" ||
        typeof point.x !== "number" ||
        typeof point.y !== "number" ||
        typeof point.highlight !== "boolean"
    );
    const hasNaN = example.points.some((point) => Number.isNaN(point.x) || Number.isNaN(point.y));
    const boundsValid = [bounds.minX, bounds.maxX, bounds.minY, bounds.maxY].every(Number.isFinite);
    const labelIndexes = plotPoints.filter((point) => point.labelIndex !== null).map((point) => point.labelIndex);
    const uniqueLabelIndexes = new Set(labelIndexes).size === labelIndexes.length;

    return {
      name: example.badge,
      passed: !invalidPoint && !hasNaN && boundsValid && uniqueLabelIndexes && example.points.length > 0,
      count: example.points.length,
    };
  });

  const categoryIds = categories.map((item) => item.id);
  const uniqueCategoryIds = new Set(categoryIds).size === categoryIds.length;
  const exampleKeys = examples.map((item) => item.key);
  const uniqueExampleKeys = new Set(exampleKeys).size === exampleKeys.length;
  const categoryReferenceValid = examples.every((example) => categories.some((category) => category.id === example.categoryId));

  return [
    ...datasetChecks,
    {
      name: "分类注册",
      passed: uniqueCategoryIds && categoryReferenceValid,
      count: categories.length,
    },
    {
      name: "示例索引",
      passed: uniqueExampleKeys,
      count: examples.length,
    },
  ];
}
