import { useId } from 'react';
import { ChartShell } from './ChartShell';
import type { DatasetSource } from '@/types/dataset';
import { getSeries } from '@/utils/dataset';

type Props = {
  title?: string;
  compact?: boolean;
  dataset?: DatasetSource;
};

function createPath(points: { x: number; y: number }[]) {
  return points
    .map((point, index) => `${index === 0 ? 'M' : 'L'}${point.x.toFixed(1)} ${point.y.toFixed(1)}`)
    .join(' ');
}

export function LineChartCard({ title = 'Training Trend', compact, dataset }: Props) {
  const gradientId = useId().replace(/:/g, '_');
  const baseSeries = dataset ? getSeries(dataset) : [];
  const sourceSeries = baseSeries.length
    ? baseSeries
    : [
        { x: 1, y: 71, label: '1' },
        { x: 2, y: 76, label: '2' },
        { x: 3, y: 82, label: '3' },
        { x: 4, y: 87, label: '4' },
        { x: 5, y: 92, label: '5' },
        { x: 6, y: 95, label: '6' },
      ];

  const yValues = sourceSeries.map((item) => item.y);
  const minY = Math.min(...yValues);
  const maxY = Math.max(...yValues);
  const rangeY = maxY - minY || 1;
  const bottom = 154;
  const top = 28;
  const left = 28;
  const right = 292;

  const points = sourceSeries.map((item, index) => ({
    x: left + (index / Math.max(sourceSeries.length - 1, 1)) * (right - left),
    y: bottom - ((item.y - minY) / rangeY) * (bottom - top),
  }));

  const linePath = createPath(points);
  const areaPath = `${linePath} L ${right} ${bottom} L ${left} ${bottom} Z`;
  const subtitle = dataset ? `${dataset.xField} vs ${dataset.yField}` : 'Epoch vs performance';

  return (
    <ChartShell title={title} subtitle={subtitle} compact={compact} badge={dataset ? 'live' : 'demo'}>
      <svg viewBox="0 0 320 180" className="h-full w-full">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2C5F8A" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#2C5F8A" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g stroke="#D9E2EC" strokeWidth="1">
          <line x1={left} y1={top} x2={left} y2={bottom} />
          <line x1={left} y1={bottom} x2={right} y2={bottom} />
          {[44, 76, 108, 140].map((y) => (
            <line key={y} x1={left} y1={y} x2={right} y2={y} strokeDasharray="4 6" />
          ))}
        </g>
        <path d={areaPath} fill={`url(#${gradientId})`} />
        <path d={linePath} fill="none" stroke="#1F3A5F" strokeWidth="4" strokeLinecap="round" />
        {points.map((point) => (
          <circle key={`${point.x}-${point.y}`} cx={point.x} cy={point.y} r="5" fill="#FFFFFF" stroke="#1F3A5F" strokeWidth="3" />
        ))}
      </svg>
    </ChartShell>
  );
}
