import { themes } from '@/themes/themes';
import { getNumericValues } from '@/utils/dataset';
import { hexToRgba } from '@/utils/colors';
import type { DatasetChartProps } from './chartTypes';
import { ChartShell } from './ChartShell';

function pointAt(index: number, total: number, radius: number) {
  const angle = (-Math.PI / 2) + (Math.PI * 2 * index) / total;
  return [Math.cos(angle) * radius, Math.sin(angle) * radius] as const;
}

export function RadarChartCard({ title = 'Radar Chart', compact, records, numericKeys = [], theme = themes[0] }: DatasetChartProps) {
  const keys = numericKeys.filter((key) => !['samples', 'row_id'].includes(key)).slice(0, 6);
  const latestRecord = records.length ? records[records.length - 1] : {};
  const values = keys.map((key) => {
    const series = getNumericValues(records, key);
    const max = Math.max(...series, 1);
    const lastSeriesValue = series.length ? series[series.length - 1] : 0;
    const current = typeof latestRecord[key] === 'number' ? Number(latestRecord[key]) : lastSeriesValue;
    return max ? current / max : 0;
  });

  const polygon = values
    .map((value, index) => {
      const [x, y] = pointAt(index, keys.length || 1, value * 52);
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <ChartShell title={title} subtitle="Multi-metric overview" compact={compact} badge="upload-ready" theme={theme}>
      <svg viewBox="0 0 240 180" className="h-full w-full">
        <g transform="translate(120 90)">
          {[60, 45, 30].map((radius) => (
            <polygon
              key={radius}
              points={keys.map((_, index) => pointAt(index, keys.length || 1, radius).join(',')).join(' ')}
              fill="none"
              stroke={hexToRgba(theme.foreground, 0.16)}
              strokeWidth="1.2"
            />
          ))}
          {keys.map((_, index) => {
            const [x, y] = pointAt(index, keys.length || 1, 60);
            return <line key={`${x}-${y}`} x1="0" y1="0" x2={x} y2={y} stroke={hexToRgba(theme.foreground, 0.16)} strokeWidth="1.2" />;
          })}
          <polygon points={polygon} fill={hexToRgba(theme.palette[1], 0.22)} stroke={theme.palette[0]} strokeWidth="3" />
        </g>
      </svg>
    </ChartShell>
  );
}
