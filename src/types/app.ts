export type Language = 'zh' | 'en';

export type LocalizedText = {
  zh: string;
  en: string;
};

export type ChartKind = 'line' | 'bar' | 'heatmap' | 'scatter' | 'boxplot' | 'radar';

export type DatasetValue = string | number | null;
export type DatasetRecord = Record<string, DatasetValue>;

export type DatasetSource = 'default' | 'upload';

export type DatasetMeta = {
  keys: string[];
  numericKeys: string[];
  categoricalKeys: string[];
  xKey: string;
  yKey: string;
};

export type ThemePalette = {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  usage: LocalizedText;
  background: string;
  panel: string;
  foreground: string;
  muted: string;
  accent: string;
  success: string;
  warm: string;
  palette: string[];
  tags: LocalizedText[];
};

export type HoverInfo = {
  primaryLabel: string;
  primaryValue: string;
  secondaryLabel?: string;
  secondaryValue?: string;
};

export type ChartDefinition = {
  id: ChartKind;
  title: LocalizedText;
  shortTitle: LocalizedText;
  description: LocalizedText;
  tag: LocalizedText;
  useCases: LocalizedText[];
  fieldRequirement: LocalizedText;
  defaultXKey: string;
  defaultYKey: string;
};
