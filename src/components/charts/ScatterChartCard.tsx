import { ChartShell } from './ChartShell';

type Props = {
  title?: string;
  compact?: boolean;
};

const points = [
  [36, 128, 5],
  [72, 108, 6],
  [98, 104, 8],
  [148, 84, 7],
  [184, 72, 10],
  [216, 64, 6],
  [252, 56, 9],
  [282, 44, 5],
] as const;

export function ScatterChartCard({ title = 'Scatter Plot', compact }: Props) {
  return (
    <ChartShell title={title} subtitle="Variable relation" compact={compact}>
      <svg viewBox="0 0 320 180" className="h-full w-full">
        <line x1="28" y1="150" x2="292" y2="150" stroke="#D9E2EC" strokeWidth="1.5" />
        <line x1="28" y1="26" x2="28" y2="150" stroke="#D9E2EC" strokeWidth="1.5" />
        {points.map(([x, y, r], index) => (
          <circle
            key={`${x}-${y}`}
            cx={x}
            cy={y}
            r={r}
            fill={index % 2 === 0 ? '#2C5F8A' : '#E9C46A'}
            fillOpacity="0.82"
          />
        ))}
        <path d="M32 134 C88 118, 156 80, 286 46" stroke="#1F3A5F" strokeWidth="3" fill="none" strokeDasharray="10 8" />
      </svg>
    </ChartShell>
  );
}
