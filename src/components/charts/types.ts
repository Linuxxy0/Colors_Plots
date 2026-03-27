import type { DatasetRecord, HoverInfo, ThemePalette } from '@/types/app';

export type PreviewMode = 'card' | 'detail';

export type ChartPreviewProps = {
  records: DatasetRecord[];
  xKey: string;
  yKey: string;
  theme: ThemePalette;
  mode?: PreviewMode;
  className?: string;
};

export type HoverStateHook = {
  info: HoverInfo;
  setInfo: (next: HoverInfo) => void;
};
