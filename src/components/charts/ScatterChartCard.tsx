import { themes } from '@/themes/themes';
import { getSeries } from '@/utils/dataset';
import { hexToRgba } from '@/utils/colors';
import type { DatasetChartProps } from './chartTypes';
import { ChartShell } from './ChartShell';

export function ScatterChartCard({ title = 'Scatter Plot', compact, records, xKey, yKey, theme = themes[0] }: DatasetChartProps) {
  const points = getSeries(records, xKey, yKey, compact ? 7 : 8);
  const xValues = points.map((point) => point.xValue);
  const yValues = points.map((point) => point.yValue);
  const xMin = Math.min(...xValues, 0);
  const xMax = Math.max(...xValues, 1);
  const yMin = Math.min(...yValues, 0);
  const yMax = Math.max(...yValues, 1);
  const xRange = xMax - xMin || 1;
  const yRange = yMax - yMin || 1;

  const mapped = points.map((point, index) => {
    const x = 36 + ((point.xValue - xMin) / xRange) * 244;
    const y = 142 - ((point.yValue - yMin) / yRange) * 96;
    const r = compact ? 5 : 6 + (index % 3);
    return { x, y, r };
  });

  return (
    <ChartShell title={title} subtitle={`${xKey} vs ${yKey}`} compact={compact} badge="interactive" theme={theme}>
      <svg viewBox="0 0 320 180" className="h-full w-full">
        <line x1="28" y1="150" x2="292" y2="150" stroke={hexToRgba(theme.foreground, 0.18)} strokeWidth="1.5" />
        <line x1="28" y1="26" x2="28" y2="150" stroke={hexToRgba(theme.foreground, 0.18)} strokeWidth="1.5" />
        {mapped.map((point, index) => (
          <circle
            key={`${point.x}-${point.y}`}
            cx={point.x}
            cy={point.y}
            r={point.r}
            fill={theme.palette[index % theme.palette.length]}
            fillOpacity="0.82"
          />
        ))}
        {mapped.length > 1 ? (
          <path
            d={`M ${mapped[0].x} ${mapped[0].y} L ${mapped[mapped.length - 1].x} ${mapped[mapped.length - 1].y}`}
            stroke={theme.palette[0]}
            strokeWidth="3"
            fill="none"
            strokeDasharray="10 8"
          />
        ) : null}
      </svg>
    </ChartShell>
  );
}
