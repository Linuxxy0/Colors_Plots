import { ChartShell } from './ChartShell';
import type { DatasetSource } from '@/types/dataset';
import { getScatterSeries } from '@/utils/dataset';

type Props = {
  title?: string;
  compact?: boolean;
  dataset?: DatasetSource;
};

const fallbackPoints = [
  { x: 36, y: 128, r: 5 },
  { x: 72, y: 108, r: 6 },
  { x: 98, y: 104, r: 8 },
  { x: 148, y: 84, r: 7 },
  { x: 184, y: 72, r: 10 },
  { x: 216, y: 64, r: 6 },
  { x: 252, y: 56, r: 9 },
  { x: 282, y: 44, r: 5 },
] as const;

export function ScatterChartCard({ title = 'Scatter Plot', compact, dataset }: Props) {
  const rawSeries = dataset ? getScatterSeries(dataset) : [];
  const subtitle = dataset && dataset.numericFields.length >= 2 ? `${dataset.numericFields[0]} vs ${dataset.numericFields[1]}` : 'Variable relation';

  const points = rawSeries.length
    ? (() => {
        const xs = rawSeries.map((point) => point.x);
        const ys = rawSeries.map((point) => point.y);
        const minX = Math.min(...xs);
        const maxX = Math.max(...xs);
        const minY = Math.min(...ys);
        const maxY = Math.max(...ys);
        return rawSeries.map((point, index) => ({
          x: 36 + ((point.x - minX) / (maxX - minX || 1)) * 246,
          y: 140 - ((point.y - minY) / (maxY - minY || 1)) * 96,
          r: 5 + (index % 4),
        }));
      })()
    : fallbackPoints;

  return (
    <ChartShell title={title} subtitle={subtitle} compact={compact} badge={dataset ? 'live' : 'demo'}>
      <svg viewBox="0 0 320 180" className="h-full w-full">
        <line x1="28" y1="150" x2="292" y2="150" stroke="#D9E2EC" strokeWidth="1.5" />
        <line x1="28" y1="26" x2="28" y2="150" stroke="#D9E2EC" strokeWidth="1.5" />
        {points.map((point, index) => (
          <circle
            key={`${point.x}-${point.y}`}
            cx={point.x}
            cy={point.y}
            r={point.r}
            fill={index % 2 === 0 ? '#2C5F8A' : '#E9C46A'}
            fillOpacity="0.82"
          />
        ))}
        <path d="M32 134 C88 118, 156 80, 286 46" stroke="#1F3A5F" strokeWidth="3" fill="none" strokeDasharray="10 8" />
      </svg>
    </ChartShell>
  );
}
