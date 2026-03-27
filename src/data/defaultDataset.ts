import type { DatasetRecord } from '@/types/dataset';

export const defaultDataset: DatasetRecord[] = [
  { epoch: 1, accuracy: 0.71, f1: 0.66, precision: 0.68, recall: 0.64, loss: 1.24, samples: 1180, latency: 142 },
  { epoch: 2, accuracy: 0.76, f1: 0.72, precision: 0.73, recall: 0.7, loss: 1.02, samples: 1210, latency: 136 },
  { epoch: 3, accuracy: 0.8, f1: 0.77, precision: 0.79, recall: 0.75, loss: 0.88, samples: 1240, latency: 132 },
  { epoch: 4, accuracy: 0.84, f1: 0.81, precision: 0.83, recall: 0.8, loss: 0.73, samples: 1260, latency: 127 },
  { epoch: 5, accuracy: 0.87, f1: 0.84, precision: 0.86, recall: 0.83, loss: 0.61, samples: 1280, latency: 123 },
  { epoch: 6, accuracy: 0.9, f1: 0.88, precision: 0.89, recall: 0.87, loss: 0.53, samples: 1310, latency: 118 },
  { epoch: 7, accuracy: 0.926, f1: 0.901, precision: 0.91, recall: 0.892, loss: 0.45, samples: 1330, latency: 114 },
  { epoch: 8, accuracy: 0.948, f1: 0.912, precision: 0.921, recall: 0.905, loss: 0.39, samples: 1360, latency: 109 },
];
