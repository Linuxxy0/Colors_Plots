import { themes } from '@/themes/themes';
import { getSeries } from '@/utils/dataset';
import { hexToRgba } from '@/utils/colors';
import type { DatasetChartProps } from './chartTypes';
import { ChartShell } from './ChartShell';

export function BarChartCard({ title = 'Model Comparison', compact, records, xKey, yKey, theme = themes[0] }: DatasetChartProps) {
  const series = getSeries(records, xKey, yKey, compact ? 5 : 6);
  const maxY = Math.max(...series.map((point) => point.yValue), 1);

  return (
    <ChartShell title={title} subtitle={`${yKey} by ${xKey}`} compact={compact} badge={compact ? 'upload' : 'live'} theme={theme}>
      <svg viewBox="0 0 320 180" className="h-full w-full">
        <line x1="26" y1="150" x2="296" y2="150" stroke={hexToRgba(theme.foreground, 0.18)} strokeWidth="1.5" />
        {series.map((point, index) => {
          const x = 36 + index * 44;
          const height = Math.max((point.yValue / maxY) * 108, 8);
          const y = 150 - height;
          return (
            <rect
              key={`${point.x}-${index}`}
              x={x}
              y={y}
              width="28"
              height={height}
              rx="10"
              fill={theme.palette[index % theme.palette.length]}
            />
          );
        })}
      </svg>
    </ChartShell>
  );
}
