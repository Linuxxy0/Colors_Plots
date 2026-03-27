import { themes } from '@/themes/themes';
import { getNumericValues, pearson } from '@/utils/dataset';
import type { DatasetChartProps } from './chartTypes';
import { ChartShell } from './ChartShell';
import { hexToRgba } from '@/utils/colors';

function correlationColor(value: number, positive: string, negative: string) {
  const alpha = Math.min(Math.abs(value), 1);
  return value >= 0 ? hexToRgba(positive, 0.18 + alpha * 0.62) : hexToRgba(negative, 0.18 + alpha * 0.62);
}

export function HeatmapCard({ title = 'Correlation Heatmap', compact, records, numericKeys = [], theme = themes[0] }: DatasetChartProps) {
  const keys = numericKeys.slice(0, 4);
  const matrix = keys.map((rowKey) =>
    keys.map((colKey) => {
      if (rowKey === colKey) return 1;
      return pearson(getNumericValues(records, rowKey), getNumericValues(records, colKey));
    }),
  );

  return (
    <ChartShell title={title} subtitle="Numeric feature correlation" compact={compact} badge="auto" theme={theme}>
      <div className="grid h-full grid-cols-4 gap-3">
        {matrix.flatMap((row, rowIndex) =>
          row.map((value, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="rounded-2xl border"
              style={{
                borderColor: hexToRgba(theme.foreground, 0.08),
                backgroundColor: correlationColor(value, theme.palette[1], theme.palette[4] ?? theme.palette[3]),
                minHeight: compact ? '36px' : '52px',
              }}
              title={`${keys[rowIndex]} / ${keys[colIndex]}: ${value.toFixed(2)}`}
            />
          )),
        )}
      </div>
    </ChartShell>
  );
}
