import { getSeries } from '@/utils/dataset';
import type { DatasetChartProps } from './chartTypes';
import { ChartShell } from './ChartShell';

const palette = ['#D9E2EC', '#8CB7D3', '#3C8DAD', '#2C5F8A', '#1F3A5F', '#E9C46A'];

export function BarChartCard({ title = 'Model Comparison', compact, records, xKey, yKey }: DatasetChartProps) {
  const series = getSeries(records, xKey, yKey, compact ? 5 : 6);
  const maxY = Math.max(...series.map((point) => point.yValue), 1);

  return (
    <ChartShell title={title} subtitle={`${yKey} by ${xKey}`} compact={compact} badge={compact ? 'upload' : 'live'}>
      <svg viewBox="0 0 320 180" className="h-full w-full">
        <line x1="26" y1="150" x2="296" y2="150" stroke="#D9E2EC" strokeWidth="1.5" />
        {series.map((point, index) => {
          const x = 36 + index * 44;
          const height = Math.max((point.yValue / maxY) * 108, 8);
          const y = 150 - height;
          return <rect key={`${point.x}-${index}`} x={x} y={y} width="28" height={height} rx="10" fill={palette[index % palette.length]} />;
        })}
      </svg>
    </ChartShell>
  );
}
