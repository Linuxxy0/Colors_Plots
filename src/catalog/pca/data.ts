import type { Point } from "../../types";

function mulberry32(seed: number) {
  return function () {
    let next = (seed += 0x6d2b79f5);
    next = Math.imul(next ^ (next >>> 15), next | 1);
    next ^= next + Math.imul(next ^ (next >>> 7), next | 61);
    return ((next ^ (next >>> 14)) >>> 0) / 4294967296;
  };
}

function randn(rng: () => number) {
  const u = Math.max(rng(), 1e-9);
  const v = Math.max(rng(), 1e-9);
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

function cluster(
  seed: number,
  center: [number, number],
  n: number,
  group: string,
  subtype: string,
  spread = 0.7,
  highlightEvery = 0
): Point[] {
  const rng = mulberry32(seed);
  return Array.from({ length: n }, (_, i) => ({
    id: `${group}-${subtype}-${i + 1}`,
    group,
    subtype,
    x: center[0] + randn(rng) * spread + randn(rng) * 0.12,
    y: center[1] + randn(rng) * spread,
    highlight: highlightEvery > 0 ? i % highlightEvery === 0 : false,
  }));
}

export function buildDatasetA(): Point[] {
  return [
    ...cluster(1, [-2.4, 1.2], 20, "Dog", "Ancient", 0.65),
    ...cluster(2, [2.2, 1.8], 20, "Wolf", "Ancient", 0.7),
    ...cluster(3, [0.2, -2.1], 20, "Fox", "Ancient", 0.6),
  ];
}

export function buildDatasetB(): Point[] {
  return [
    ...cluster(11, [-2.8, 1.3], 18, "Dog", "Ancient", 0.72),
    ...cluster(12, [-1.2, 0.4], 18, "Dog", "Modern", 0.72),
    ...cluster(13, [1.2, 1.9], 18, "Wolf", "Ancient", 0.7),
    ...cluster(14, [2.9, 0.8], 18, "Wolf", "Modern", 0.7),
  ];
}

export function buildDatasetC(): Point[] {
  return [
    ...cluster(21, [-2.6, 1.6], 16, "Control", "Healthy", 0.7),
    ...cluster(22, [-0.4, -1.6], 16, "Treated", "StageA", 0.7),
    ...cluster(23, [1.8, 1.7], 16, "Treated", "StageB", 0.65),
    ...cluster(24, [3.3, -0.8], 16, "Resistant", "StageC", 0.7),
  ];
}

export function buildDatasetD(): Point[] {
  return [
    ...cluster(31, [-3.0, 1.3], 18, "Dog", "Ancient", 0.68, 8),
    ...cluster(32, [-0.8, -1.4], 18, "Dog", "Modern", 0.7, 9),
    ...cluster(33, [1.3, 1.9], 18, "Wolf", "Ancient", 0.72, 7),
    ...cluster(34, [3.0, -0.6], 18, "Wolf", "Modern", 0.68, 10),
  ];
}
