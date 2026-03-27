import { themes } from '@/themes/themes';
import { getNumericValues, percentile } from '@/utils/dataset';
import { hexToRgba } from '@/utils/colors';
import type { DatasetChartProps } from './chartTypes';
import { ChartShell } from './ChartShell';

export function BoxPlotCard({ title = 'Boxplot', compact, records, numericKeys = [], theme = themes[0] }: DatasetChartProps) {
  const keys = numericKeys.slice(0, 3);
  const stats = keys.map((key) => {
    const values = getNumericValues(records, key);
    const min = Math.min(...values, 0);
    const max = Math.max(...values, 1);
    return {
      key,
      min,
      max,
      q1: percentile(values, 0.25),
      median: percentile(values, 0.5),
      q3: percentile(values, 0.75),
    };
  });

  const globalMin = Math.min(...stats.map((item) => item.min), 0);
  const globalMax = Math.max(...stats.map((item) => item.max), 1);
  const scale = (value: number) => 146 - ((value - globalMin) / (globalMax - globalMin || 1)) * 108;

  return (
    <ChartShell title={title} subtitle="Distribution analysis" compact={compact} badge="dataset" theme={theme}>
      <svg viewBox="0 0 320 180" className="h-full w-full">
        <line x1="24" y1="150" x2="296" y2="150" stroke={hexToRgba(theme.foreground, 0.18)} strokeWidth="1.5" />
        {stats.map((item, index) => {
          const x = 68 + index * 86;
          const top = scale(item.max);
          const bottom = scale(item.min);
          const boxTop = scale(item.q3);
          const boxBottom = scale(item.q1);
          const median = scale(item.median);
          return (
            <g key={item.key}>
              <line x1={x} y1={top} x2={x} y2={bottom} stroke={theme.palette[0]} strokeWidth="3" />
              <line x1={x - 18} y1={top} x2={x + 18} y2={top} stroke={theme.palette[0]} strokeWidth="3" />
              <line x1={x - 18} y1={bottom} x2={x + 18} y2={bottom} stroke={theme.palette[0]} strokeWidth="3" />
              <rect x={x - 26} y={boxTop} width="52" height={Math.max(boxBottom - boxTop, 12)} rx="12" fill={theme.palette[(index + 1) % theme.palette.length]} />
              <line x1={x - 26} y1={median} x2={x + 26} y2={median} stroke={hexToRgba(theme.foreground, 0.9)} strokeWidth="3" />
            </g>
          );
        })}
      </svg>
    </ChartShell>
  );
}
