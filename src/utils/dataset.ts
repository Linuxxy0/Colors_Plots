import type { DatasetMeta, DatasetRecord, DatasetValue } from '@/types/app';

const AUTO_X_PREFERRED = ['epoch', 'step', 'time', 'date', 'model', 'group', 'round', 'iteration'];
const AUTO_Y_PREFERRED = ['accuracy', 'score', 'f1', 'auc', 'precision', 'recall', 'loss', 'latency'];
const EMPTY_DISPLAY = '--';

export type SeriesPoint = {
  x: string;
  xValue: number;
  yValue: number;
  rawX: string | number;
  rawY: DatasetValue;
};

export type DatasetSummary = {
  count: number;
  latest: number;
  average: number;
  delta: number;
};

export function toNumber(value: DatasetValue): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed) return null;
    const parsed = Number(trimmed);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

export function toDisplay(value: DatasetValue): string {
  if (value === null || value === undefined) return EMPTY_DISPLAY;
  if (typeof value === 'number') {
    if (Math.abs(value) >= 1000) return value.toLocaleString();
    if (Math.abs(value) <= 1 && !Number.isInteger(value)) return value.toFixed(2).replace(/0+$/, '').replace(/\.$/, '');
    return value.toFixed(Number.isInteger(value) ? 0 : 2).replace(/0+$/, '').replace(/\.$/, '');
  }
  return String(value);
}

export function formatMetric(value: number) {
  if (Math.abs(value) <= 1) return value.toFixed(2).replace(/0+$/, '').replace(/\.$/, '');
  if (Math.abs(value) >= 1000) return value.toLocaleString();
  return value.toFixed(1).replace(/0+$/, '').replace(/\.$/, '');
}

function cleanKey(input: string, fallback: string) {
  const normalized = input
    .trim()
    .replace(/^"|"$/g, '')
    .replace(/\s+/g, '_')
    .replace(/[^a-zA-Z0-9_]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_+|_+$/g, '')
    .toLowerCase();
  return normalized || fallback;
}

function normalizeCell(value: unknown): DatasetValue {
  if (value === null || value === undefined || value === '') return null;
  if (typeof value === 'number') return Number.isFinite(value) ? value : null;
  const text = String(value).trim();
  if (!text) return null;
  const numeric = Number(text);
  return Number.isFinite(numeric) ? numeric : text;
}

export function normalizeRecords(rows: Record<string, unknown>[]): DatasetRecord[] {
  return rows
    .map((row, rowIndex) => {
      const record: DatasetRecord = {};
      Object.entries(row).forEach(([key, value], index) => {
        record[cleanKey(key, `field_${index + 1}`)] = normalizeCell(value);
      });
      if (!Object.keys(record).length) return null;
      record.row_id = rowIndex + 1;
      return record;
    })
    .filter((item): item is DatasetRecord => item !== null);
}

function splitCsvLine(line: string): string[] {
  const cells: string[] = [];
  let current = '';
  let insideQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    const next = line[i + 1];

    if (char === '"') {
      if (insideQuotes && next === '"') {
        current += '"';
        i += 1;
      } else {
        insideQuotes = !insideQuotes;
      }
      continue;
    }

    if (char === ',' && !insideQuotes) {
      cells.push(current.trim());
      current = '';
      continue;
    }

    current += char;
  }

  cells.push(current.trim());
  return cells;
}

export function parseCsv(text: string): DatasetRecord[] {
  const lines = text
    .replace(/^\uFEFF/, '')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length < 2) {
    throw new Error('CSV 至少需要表头和一行数据。');
  }

  const headers = splitCsvLine(lines[0]).map((header, index) => cleanKey(header, `field_${index + 1}`));
  const rows = lines.slice(1).map((line) => {
    const cells = splitCsvLine(line);
    const record: Record<string, unknown> = {};
    headers.forEach((header, index) => {
      record[header] = cells[index] ?? null;
    });
    return record;
  });

  return normalizeRecords(rows);
}

export function parseJson(text: string): DatasetRecord[] {
  let parsed: unknown;

  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error('JSON 解析失败，请确认文件内容为合法 JSON。');
  }

  let rows: Record<string, unknown>[] = [];

  if (Array.isArray(parsed)) {
    rows = parsed.filter((item): item is Record<string, unknown> => typeof item === 'object' && item !== null);
  } else if (parsed && typeof parsed === 'object' && Array.isArray((parsed as { data?: unknown }).data)) {
    rows = (parsed as { data: unknown[] }).data.filter((item): item is Record<string, unknown> => typeof item === 'object' && item !== null);
  }

  if (!rows.length) {
    throw new Error('JSON 需要是对象数组，或包含 data 字段的对象数组。');
  }

  return normalizeRecords(rows);
}

export function getDatasetMeta(records: DatasetRecord[]): DatasetMeta {
  const keys = Array.from(new Set(records.flatMap((record) => Object.keys(record)).filter((key) => key !== 'row_id')));
  const numericKeys = keys.filter((key) => records.some((record) => toNumber(record[key]) !== null));
  const categoricalKeys = keys.filter((key) => !numericKeys.includes(key));

  const xKey =
    AUTO_X_PREFERRED.find((key) => keys.includes(key)) ??
    categoricalKeys[0] ??
    numericKeys[0] ??
    keys[0] ??
    'row_id';

  const yKey =
    AUTO_Y_PREFERRED.find((key) => numericKeys.includes(key)) ??
    numericKeys.find((key) => key !== xKey) ??
    numericKeys[0] ??
    xKey;

  return { keys, numericKeys, categoricalKeys, xKey, yKey };
}

export function getNumericValues(records: DatasetRecord[], key: string) {
  return records.map((record) => toNumber(record[key])).filter((value): value is number => value !== null);
}

export function getSeries(records: DatasetRecord[], xKey: string, yKey: string, limit = records.length): SeriesPoint[] {
  return records
    .map((record, index) => {
      const rawX = record[xKey] ?? index + 1;
      const rawY = record[yKey];
      const yValue = toNumber(rawY);
      if (yValue === null) return null;
      return {
        x: toDisplay(rawX),
        xValue: toNumber(rawX) ?? index + 1,
        yValue,
        rawX,
        rawY,
      } satisfies SeriesPoint;
    })
    .filter((item): item is SeriesPoint => item !== null)
    .slice(0, Math.max(limit, 0));
}

export function summarizeDataset(records: DatasetRecord[], yKey: string): DatasetSummary {
  const values = getNumericValues(records, yKey);
  if (!values.length) {
    return { count: records.length, latest: 0, average: 0, delta: 0 };
  }

  const latest = values[values.length - 1];
  const previous = values.length > 1 ? values[values.length - 2] : latest;
  const average = values.reduce((sum, value) => sum + value, 0) / values.length;

  return {
    count: records.length,
    latest,
    average,
    delta: latest - previous,
  };
}

export function percentile(values: number[], p: number) {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const pos = (sorted.length - 1) * p;
  const base = Math.floor(pos);
  const rest = pos - base;
  return sorted[base + 1] !== undefined ? sorted[base] + rest * (sorted[base + 1] - sorted[base]) : sorted[base];
}

export function pearson(valuesA: number[], valuesB: number[]) {
  const size = Math.min(valuesA.length, valuesB.length);
  if (size < 2) return 0;

  const a = valuesA.slice(0, size);
  const b = valuesB.slice(0, size);
  const meanA = a.reduce((sum, value) => sum + value, 0) / size;
  const meanB = b.reduce((sum, value) => sum + value, 0) / size;

  let numerator = 0;
  let sumA = 0;
  let sumB = 0;

  for (let index = 0; index < size; index += 1) {
    const diffA = a[index] - meanA;
    const diffB = b[index] - meanB;
    numerator += diffA * diffB;
    sumA += diffA ** 2;
    sumB += diffB ** 2;
  }

  const denominator = Math.sqrt(sumA * sumB);
  return denominator ? numerator / denominator : 0;
}

export function toCsv(records: DatasetRecord[]) {
  const keys = Array.from(new Set(records.flatMap((record) => Object.keys(record)).filter((key) => key !== 'row_id')));
  const escape = (value: DatasetValue) => {
    if (value === null || value === undefined) return '';
    const text = String(value);
    return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
  };

  return [keys.join(','), ...records.map((record) => keys.map((key) => escape(record[key])).join(','))].join('\n');
}
