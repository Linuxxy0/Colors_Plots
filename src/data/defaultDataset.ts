import type { DatasetRow } from '@/types/dataset';

export const defaultRows: DatasetRow[] = [
  { epoch: 1, accuracy: 71.2, f1: 68.4, precision: 70.1, recall: 66.8, loss: 0.92, latency: 142, samples: 2200 },
  { epoch: 2, accuracy: 76.8, f1: 74.2, precision: 75.6, recall: 72.9, loss: 0.76, latency: 138, samples: 3800 },
  { epoch: 3, accuracy: 82.1, f1: 79.6, precision: 80.4, recall: 78.7, loss: 0.58, latency: 133, samples: 5600 },
  { epoch: 4, accuracy: 87.4, f1: 84.3, precision: 85.8, recall: 83.1, loss: 0.42, latency: 128, samples: 7900 },
  { epoch: 5, accuracy: 91.6, f1: 89.1, precision: 90.2, recall: 88.4, loss: 0.29, latency: 123, samples: 10100 },
  { epoch: 6, accuracy: 94.8, f1: 91.2, precision: 92.6, recall: 90.3, loss: 0.18, latency: 118, samples: 12480 },
];
