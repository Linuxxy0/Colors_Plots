import type { DatasetMeta, DatasetRecord, DatasetState } from '@/types/dataset';
import { getDatasetMeta } from '@/utils/dataset';

const lineRecords: DatasetRecord[] = [
  { epoch: 1, score: 0.62, loss: 1.28 },
  { epoch: 2, score: 0.69, loss: 1.02 },
  { epoch: 3, score: 0.75, loss: 0.84 },
  { epoch: 4, score: 0.81, loss: 0.72 },
  { epoch: 5, score: 0.86, loss: 0.6 },
  { epoch: 6, score: 0.9, loss: 0.51 },
  { epoch: 7, score: 0.93, loss: 0.43 },
  { epoch: 8, score: 0.95, loss: 0.39 },
];

const barRecords: DatasetRecord[] = [
  { model: 'CNN', accuracy: 0.86, latency: 112 },
  { model: 'ViT-B', accuracy: 0.91, latency: 128 },
  { model: 'Swin-T', accuracy: 0.93, latency: 121 },
  { model: 'ConvNext', accuracy: 0.92, latency: 118 },
  { model: 'Ours', accuracy: 0.95, latency: 109 },
];

const heatmapRecords: DatasetRecord[] = [
  { feature: 'A', precision: 0.92, recall: 0.87, f1: 0.89, auc: 0.94 },
  { feature: 'B', precision: 0.88, recall: 0.84, f1: 0.86, auc: 0.9 },
  { feature: 'C', precision: 0.9, recall: 0.89, f1: 0.9, auc: 0.93 },
  { feature: 'D', precision: 0.85, recall: 0.82, f1: 0.83, auc: 0.88 },
  { feature: 'E', precision: 0.94, recall: 0.9, f1: 0.92, auc: 0.96 },
  { feature: 'F', precision: 0.89, recall: 0.86, f1: 0.88, auc: 0.91 },
];

const scatterRecords: DatasetRecord[] = [
  { params_m: 12, accuracy: 0.79, latency: 54 },
  { params_m: 18, accuracy: 0.83, latency: 61 },
  { params_m: 24, accuracy: 0.87, latency: 73 },
  { params_m: 31, accuracy: 0.89, latency: 81 },
  { params_m: 38, accuracy: 0.92, latency: 95 },
  { params_m: 43, accuracy: 0.94, latency: 104 },
  { params_m: 49, accuracy: 0.95, latency: 113 },
];

const boxplotRecords: DatasetRecord[] = [
  { run: 'R1', accuracy: 0.82, latency: 121, memory: 8.3 },
  { run: 'R2', accuracy: 0.85, latency: 117, memory: 8.1 },
  { run: 'R3', accuracy: 0.83, latency: 123, memory: 8.8 },
  { run: 'R4', accuracy: 0.88, latency: 115, memory: 7.9 },
  { run: 'R5', accuracy: 0.9, latency: 111, memory: 7.6 },
  { run: 'R6', accuracy: 0.86, latency: 118, memory: 8.4 },
  { run: 'R7', accuracy: 0.91, latency: 109, memory: 7.5 },
];

const radarRecords: DatasetRecord[] = [
  { model: 'baseline', robustness: 0.78, generalization: 0.82, interpretability: 0.69, efficiency: 0.88, scalability: 0.76, fairness: 0.8 },
  { model: 'ours', robustness: 0.9, generalization: 0.93, interpretability: 0.85, efficiency: 0.87, scalability: 0.91, fairness: 0.89 },
];

export const chartPreviewData: Record<string, { records: DatasetRecord[]; xKey?: string; yKey?: string }> = {
  line: { records: lineRecords, xKey: 'epoch', yKey: 'score' },
  bar: { records: barRecords, xKey: 'model', yKey: 'accuracy' },
  heatmap: { records: heatmapRecords },
  scatter: { records: scatterRecords, xKey: 'params_m', yKey: 'latency' },
  boxplot: { records: boxplotRecords, xKey: 'run', yKey: 'accuracy' },
  radar: { records: radarRecords },
};

export function getChartPreviewInput(
  chartId: string,
  dataset: DatasetState,
  meta: DatasetMeta,
  xKey: string,
  yKey: string,
): { records: DatasetRecord[]; meta: DatasetMeta; xKey: string; yKey: string } {
  if (dataset.source === 'upload') {
    return { records: dataset.records, meta, xKey, yKey };
  }

  const sample = chartPreviewData[chartId];
  if (!sample) {
    return { records: dataset.records, meta, xKey, yKey };
  }

  const sampleMeta = getDatasetMeta(sample.records);
  return {
    records: sample.records,
    meta: sampleMeta,
    xKey: sample.xKey ?? sampleMeta.xKey,
    yKey: sample.yKey ?? sampleMeta.yKey,
  };
}
