import { getNumericValues, pearson } from '@/utils/dataset';
import type { DatasetChartProps } from './chartTypes';
import { ChartShell } from './ChartShell';

function correlationColor(value: number) {
  const alpha = Math.min(Math.abs(value), 1);
  const positive = value >= 0;
  return positive ? `rgba(44,95,138,${0.18 + alpha * 0.62})` : `rgba(233,196,106,${0.18 + alpha * 0.62})`;
}

export function HeatmapCard({ title = 'Correlation Heatmap', compact, records, numericKeys = [] }: DatasetChartProps) {
  const keys = numericKeys.slice(0, 4);
  const matrix = keys.map((rowKey) =>
    keys.map((colKey) => {
      if (rowKey === colKey) return 1;
      return pearson(getNumericValues(records, rowKey), getNumericValues(records, colKey));
    }),
  );

  return (
    <ChartShell title={title} subtitle="Numeric feature correlation" compact={compact} badge="auto">
      <div className="grid h-full grid-cols-4 gap-3">
        {matrix.flatMap((row, rowIndex) =>
          row.map((value, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="rounded-2xl border border-white/50"
              style={{ backgroundColor: correlationColor(value), minHeight: compact ? '36px' : '52px' }}
              title={`${keys[rowIndex]} / ${keys[colIndex]}: ${value.toFixed(2)}`}
            />
          )),
        )}
      </div>
    </ChartShell>
  );
}
