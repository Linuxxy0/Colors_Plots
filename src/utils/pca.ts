import type { Bounds, PlotPoint, Point } from "../types";

export const COLORS: Record<string, string> = {
  Dog: "#2563eb",
  Wolf: "#ef4444",
  Fox: "#f59e0b",
  Control: "#10b981",
  Treated: "#8b5cf6",
  Resistant: "#ec4899",
};

export const DISPLAY_TEXT: Record<string, string> = {
  Dog: "犬类",
  Wolf: "狼类",
  Fox: "狐类",
  Control: "对照组",
  Treated: "处理组",
  Resistant: "耐受组",
  Ancient: "古代",
  Modern: "现代",
  Healthy: "健康",
  StageA: "A阶段",
  StageB: "B阶段",
  StageC: "C阶段",
};

export const SYMBOL_LABELS: Record<string, string> = {
  Ancient: "圆形",
  Modern: "三角形",
  Healthy: "圆形",
  StageA: "圆形",
  StageB: "菱形",
  StageC: "方形",
};

export function t(value: string) {
  return DISPLAY_TEXT[value] || value;
}

export function withLabelIndex(points: Point[]): PlotPoint[] {
  let currentIndex = 0;
  return points.map((point) => {
    if (!point.highlight) {
      return { ...point, labelIndex: null };
    }
    currentIndex += 1;
    return { ...point, labelIndex: currentIndex };
  });
}

export function getBounds(points: Point[]): Bounds {
  const xs = points.map((point) => point.x);
  const ys = points.map((point) => point.y);
  return {
    minX: Math.min(...xs) - 0.8,
    maxX: Math.max(...xs) + 0.8,
    minY: Math.min(...ys) - 0.8,
    maxY: Math.max(...ys) + 0.8,
  };
}

export function getGroups(points: Point[]) {
  return Array.from(new Set(points.map((point) => point.group)));
}

export function getSubtypes(points: Point[]) {
  return Array.from(new Set(points.map((point) => point.subtype)));
}

export function ellipseBox(points: Point[]) {
  if (points.length === 0) return null;
  const xs = points.map((point) => point.x);
  const ys = points.map((point) => point.y);
  return {
    minX: Math.min(...xs) - 0.55,
    maxX: Math.max(...xs) + 0.55,
    minY: Math.min(...ys) - 0.55,
    maxY: Math.max(...ys) + 0.55,
  };
}

export function shapeType(subtype: string) {
  switch (subtype) {
    case "Modern":
      return "triangle" as const;
    case "StageB":
      return "diamond" as const;
    case "StageC":
      return "square" as const;
    default:
      return "circle" as const;
  }
}

export function formatTick(value: number) {
  return Number.isFinite(value) ? value.toFixed(1) : "";
}
