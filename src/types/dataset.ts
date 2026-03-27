export type DatasetValue = string | number | null;
export type DatasetRow = Record<string, DatasetValue>;

export type DatasetSource = {
  name: string;
  rows: DatasetRow[];
  fields: string[];
  numericFields: string[];
  categoricalFields: string[];
  xField: string;
  yField: string;
  secondaryYField?: string;
  metricFields: string[];
};
