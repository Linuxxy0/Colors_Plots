import { defaultRows } from '@/data/defaultDataset';
import type { DatasetRow, DatasetSource, DatasetValue } from '@/types/dataset';

function isNumericLike(value: unknown): boolean {
  if (typeof value === 'number') {
    return Number.isFinite(value);
  }
  if (typeof value !== 'string') {
    return false;
  }
  const trimmed = value.trim();
  if (!trimmed) {
    return false;
  }
  return !Number.isNaN(Number(trimmed));
}

function toDatasetValue(value: unknown): DatasetValue {
  if (value === null || value === undefined || value === '') {
    return null;
  }
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : null;
  }
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed) {
      return null;
    }
    if (isNumericLike(trimmed)) {
      return Number(trimmed);
    }
    return trimmed;
  }
  return String(value);
}

function parseCsvLine(line: string): string[] {
  const cells: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const next = line[index + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        current += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === ',' && !inQuotes) {
      cells.push(current.trim());
      current = '';
      continue;
    }

    current += char;
  }

  cells.push(current.trim());
  return cells;
}

function parseCsvText(text: string): DatasetRow[] {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length < 2) {
    throw new Error('CSV 至少需要一行表头和一行数据。');
  }

  const headers = parseCsvLine(lines[0]).map((header, index) => header || `field_${index + 1}`);

  return lines.slice(1).map((line) => {
    const cells = parseCsvLine(line);
    return headers.reduce<DatasetRow>((row, header, index) => {
      row[header] = toDatasetValue(cells[index] ?? null);
      return row;
    }, {});
  });
}

function parseJsonText(text: string): DatasetRow[] {
  const parsed = JSON.parse(text) as unknown;

  if (!Array.isArray(parsed)) {
    throw new Error('JSON 需要是对象数组，例如 [{"epoch":1,"accuracy":0.9}]。');
  }

  const rows = parsed
    .filter((item): item is Record<string, unknown> => typeof item === 'object' && item !== null && !Array.isArray(item))
    .map((item) =>
      Object.entries(item).reduce<DatasetRow>((row, [key, value]) => {
        row[key] = toDatasetValue(value);
        return row;
      }, {}),
    );

  if (!rows.length) {
    throw new Error('JSON 数组里没有可用对象。');
  }

  return rows;
}

export function createDatasetSource(rows: DatasetRow[], name = 'Uploaded dataset'): DatasetSource {
  if (!rows.length) {
    throw new Error('数据为空，无法生成图表。');
  }

  const fields = Array.from(
    rows.reduce<Set<string>>((set, row) => {
      Object.keys(row).forEach((key) => set.add(key));
      return set;
    }, new Set()),
  );

  const numericFields = fields.filter((field) =>
    rows.some((row) => typeof row[field] === 'number' && Number.isFinite(row[field] as number)),
  );
  if (!numericFields.length) {
    throw new Error('至少需要 1 列数值字段，才能绘制图表。');
  }
  const categoricalFields = fields.filter((field) => !numericFields.includes(field));
  const xField = categoricalFields[0] ?? fields[0] ?? 'index';
  const yField = numericFields[0] ?? fields.find((field) => field !== xField) ?? xField;
  const secondaryYField = numericFields.find((field) => field !== yField);
  const metricFields = numericFields.filter((field) => field !== xField).slice(0, 6);

  return {
    name,
    rows,
    fields,
    numericFields,
    categoricalFields,
    xField,
    yField,
    secondaryYField,
    metricFields: metricFields.length ? metricFields : numericFields.slice(0, 6),
  };
}

export function getDefaultDatasetSource(): DatasetSource {
  return createDatasetSource(defaultRows, 'Built-in demo dataset');
}

export async function parseUploadedFile(file: File): Promise<DatasetSource> {
  const text = await file.text();
  const extension = file.name.split('.').pop()?.toLowerCase();

  const rows = extension === 'json' ? parseJsonText(text) : parseCsvText(text);
  return createDatasetSource(rows, file.name);
}

function getNumericValues(rows: DatasetRow[], field: string): number[] {
  return rows
    .map((row) => row[field])
    .filter((value): value is number => typeof value === 'number' && Number.isFinite(value));
}

export function computeKpis(dataset: DatasetSource): { label: string; value: string; delta: string }[] {
  const yValues = getNumericValues(dataset.rows, dataset.yField);
  const secondaryField = dataset.secondaryYField ?? dataset.metricFields[1] ?? dataset.yField;
  const secondaryValues = getNumericValues(dataset.rows, secondaryField);
  const latest = yValues.at(-1) ?? 0;
  const previous = yValues.at(-2) ?? latest;
  const best = yValues.length ? Math.max(...yValues) : latest;
  const sampleCount = dataset.rows.length;
  const latestSecondary = secondaryValues.at(-1) ?? 0;

  const delta = latest - previous;
  const latestLabel = dataset.yField.replace(/_/g, ' ');
  const secondaryLabel = secondaryField.replace(/_/g, ' ');

  return [
    {
      label: latestLabel,
      value: formatNumeric(latest),
      delta: `${delta >= 0 ? '+' : ''}${formatNumeric(delta)}`,
    },
    {
      label: `Best ${latestLabel}`,
      value: formatNumeric(best),
      delta: `Latest ${secondaryLabel}: ${formatNumeric(latestSecondary)}`,
    },
    {
      label: 'Rows',
      value: sampleCount.toLocaleString('en-US'),
      delta: `${dataset.fields.length} columns`,
    },
  ];
}

export function formatNumeric(value: number): string {
  if (Math.abs(value) >= 1000) {
    return value.toLocaleString('en-US', { maximumFractionDigits: 0 });
  }
  if (Math.abs(value) >= 100) {
    return value.toLocaleString('en-US', { maximumFractionDigits: 1 });
  }
  if (Math.abs(value) >= 1) {
    return value.toLocaleString('en-US', { maximumFractionDigits: 2 });
  }
  return value.toLocaleString('en-US', { maximumFractionDigits: 3 });
}

export function datasetPreviewRows(dataset: DatasetSource, limit = 5): DatasetRow[] {
  return dataset.rows.slice(0, limit);
}

export function describeDataset(dataset: DatasetSource): string {
  return `${dataset.rows.length} rows · ${dataset.fields.length} fields · ${dataset.numericFields.length} numeric columns`;
}

export function getSeries(dataset: DatasetSource, xField = dataset.xField, yField = dataset.yField) {
  return dataset.rows
    .map((row, index) => {
      const rawX = row[xField] ?? index + 1;
      const rawY = row[yField];
      if (typeof rawY !== 'number' || !Number.isFinite(rawY)) {
        return null;
      }
      const numericX = typeof rawX === 'number' && Number.isFinite(rawX) ? rawX : index + 1;
      const label = typeof rawX === 'string' ? rawX : String(rawX);
      return { x: numericX, y: rawY, label };
    })
    .filter((item): item is { x: number; y: number; label: string } => item !== null);
}

export function getScatterSeries(dataset: DatasetSource, xField?: string, yField?: string) {
  const scatterX = xField ?? dataset.numericFields[0];
  const scatterY = yField ?? dataset.numericFields[1] ?? dataset.numericFields[0];
  return dataset.rows
    .map((row) => {
      const x = row[scatterX];
      const y = row[scatterY];
      if (typeof x !== 'number' || typeof y !== 'number') {
        return null;
      }
      return { x, y };
    })
    .filter((item): item is { x: number; y: number } => item !== null);
}

export function getBoxGroups(dataset: DatasetSource, count = 3) {
  return dataset.metricFields.slice(0, count).map((field) => {
    const values = getNumericValues(dataset.rows, field).sort((a, b) => a - b);
    if (!values.length) {
      return null;
    }
    const percentile = (p: number) => {
      const position = (values.length - 1) * p;
      const lower = Math.floor(position);
      const upper = Math.ceil(position);
      if (lower === upper) {
        return values[lower];
      }
      const weight = position - lower;
      return values[lower] * (1 - weight) + values[upper] * weight;
    };

    return {
      field,
      min: values[0],
      q1: percentile(0.25),
      median: percentile(0.5),
      q3: percentile(0.75),
      max: values[values.length - 1],
    };
  }).filter((item): item is { field: string; min: number; q1: number; median: number; q3: number; max: number } => item !== null);
}

function correlation(valuesA: number[], valuesB: number[]): number {
  const pairs = valuesA.map((value, index) => [value, valuesB[index]] as const).filter(([, other]) => Number.isFinite(other));
  const n = pairs.length;
  if (n < 2) {
    return 0;
  }
  const meanA = pairs.reduce((sum, [value]) => sum + value, 0) / n;
  const meanB = pairs.reduce((sum, [, value]) => sum + value, 0) / n;
  const numerator = pairs.reduce((sum, [valueA, valueB]) => sum + (valueA - meanA) * (valueB - meanB), 0);
  const denominatorA = Math.sqrt(pairs.reduce((sum, [value]) => sum + (value - meanA) ** 2, 0));
  const denominatorB = Math.sqrt(pairs.reduce((sum, [, value]) => sum + (value - meanB) ** 2, 0));
  if (!denominatorA || !denominatorB) {
    return 0;
  }
  return numerator / (denominatorA * denominatorB);
}

export function getHeatmapMatrix(dataset: DatasetSource, count = 4) {
  const fields = dataset.metricFields.slice(0, count);
  if (fields.length < 2) {
    return { fields, matrix: [] as number[][] };
  }
  const numericSeries = fields.map((field) => getNumericValues(dataset.rows, field));
  const matrix = fields.map((_, rowIndex) =>
    fields.map((__, colIndex) => correlation(numericSeries[rowIndex], numericSeries[colIndex])),
  );
  return { fields, matrix };
}

export function getRadarSeries(dataset: DatasetSource, count = 5) {
  const fields = dataset.metricFields.slice(0, count);
  const latestRow = dataset.rows.at(-1);
  if (!latestRow) {
    return [] as { field: string; value: number }[];
  }

  return fields.map((field) => {
    const values = getNumericValues(dataset.rows, field);
    const max = values.length ? Math.max(...values) : 1;
    const raw = latestRow[field];
    const value = typeof raw === 'number' && Number.isFinite(raw) && max ? raw / max : 0;
    return { field, value };
  });
}

export function buildInsightBullets(dataset: DatasetSource): string[] {
  const yValues = getNumericValues(dataset.rows, dataset.yField);
  const first = yValues[0] ?? 0;
  const last = yValues.at(-1) ?? first;
  const change = last - first;
  const fieldLabel = dataset.yField.replace(/_/g, ' ');
  const metricSummary = dataset.metricFields.slice(0, 3).join(' / ');

  return [
    `${fieldLabel} 从 ${formatNumeric(first)} 变化到 ${formatNumeric(last)}。`,
    `当前数据集包含 ${dataset.rows.length} 行，适合直接预览趋势与比较图。`,
    metricSummary ? `已自动识别的主要数值字段：${metricSummary}。` : '已回退到默认预览数据。',
    change >= 0 ? '上传数据后会自动替换首页里的示例图表。' : '你也可以切回默认数据继续展示模板效果。',
  ];
}
