import { getSeries } from '@/utils/dataset';
import type { DatasetChartProps } from './chartTypes';
import { ChartShell } from './ChartShell';

export function LineChartCard({ title = 'Training Trend', compact, records, xKey, yKey }: DatasetChartProps) {
  const points = getSeries(records, xKey, yKey, compact ? 6 : 8);
  const maxY = Math.max(...points.map((point) => point.yValue), 1);
  const minY = Math.min(...points.map((point) => point.yValue), 0);
  const range = maxY - minY || 1;

  const mapped = points.map((point, index) => {
    const x = 28 + (index / Math.max(points.length - 1, 1)) * 264;
    const y = 146 - ((point.yValue - minY) / range) * 108;
    return [x, y] as const;
  });

  const line = mapped.map(([x, y], index) => `${index === 0 ? 'M' : 'L'} ${x} ${y}`).join(' ');
  const area = `${line} L 292 154 L 28 154 Z`;

  return (
    <ChartShell title={title} subtitle={`${xKey} vs ${yKey}`} compact={compact} badge={compact ? 'live' : 'dataset'}>
      <svg viewBox="0 0 320 180" className="h-full w-full">
        <defs>
          <linearGradient id="lineFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2C5F8A" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#2C5F8A" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g stroke="#D9E2EC" strokeWidth="1">
          <line x1="28" y1="22" x2="28" y2="154" />
          <line x1="28" y1="154" x2="292" y2="154" />
          {[44, 76, 108, 140].map((y) => (
            <line key={y} x1="28" y1={y} x2="292" y2={y} strokeDasharray="4 6" />
          ))}
        </g>
        <path d={area} fill="url(#lineFill)" />
        <path d={line} fill="none" stroke="#1F3A5F" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        {mapped.map(([x, y], index) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="4.5" fill="#FFFFFF" stroke="#1F3A5F" strokeWidth="3" />
        ))}
      </svg>
    </ChartShell>
  );
}
