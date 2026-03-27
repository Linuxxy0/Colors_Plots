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

export type DatasetState = {
  records: DatasetRecord[];
  source: DatasetSource;
  fileName: string;
};
