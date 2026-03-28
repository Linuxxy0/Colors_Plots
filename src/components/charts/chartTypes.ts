import type { ThemePalette } from '@/types/app';
import type { DatasetRecord } from '@/types/dataset';

export type DatasetChartProps = {
  title?: string;
  compact?: boolean;
  records: DatasetRecord[];
  xKey: string;
  yKey: string;
  numericKeys?: string[];
  theme?: ThemePalette;
};
