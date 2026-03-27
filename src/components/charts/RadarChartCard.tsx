import { ChartShell } from './ChartShell';

type Props = {
  title?: string;
  compact?: boolean;
};

export function RadarChartCard({ title = 'Radar Chart', compact }: Props) {
  return (
    <ChartShell title={title} subtitle="Multi-metric overview" compact={compact}>
      <svg viewBox="0 0 240 180" className="h-full w-full">
        <g transform="translate(120 90)">
          {[60, 45, 30].map((radius) => (
            <polygon
              key={radius}
              points={`0,-${radius} ${radius * 0.86},-${radius * 0.5} ${radius * 0.86},${radius * 0.5} 0,${radius} -${radius * 0.86},${radius * 0.5} -${radius * 0.86},-${radius * 0.5}`}
              fill="none"
              stroke="#D9E2EC"
              strokeWidth="1.2"
            />
          ))}
          {[
            [0, -60],
            [52, -30],
            [52, 30],
            [0, 60],
            [-52, 30],
            [-52, -30],
          ].map(([x, y]) => (
            <line key={`${x}-${y}`} x1="0" y1="0" x2={x} y2={y} stroke="#D9E2EC" strokeWidth="1.2" />
          ))}
          <polygon
            points="0,-48 42,-20 38,26 0,44 -40,20 -34,-14"
            fill="#2C5F8A"
            fillOpacity="0.24"
            stroke="#1F3A5F"
            strokeWidth="3"
          />
          <polygon
            points="0,-38 28,-12 24,16 0,30 -26,16 -22,-10"
            fill="#E9C46A"
            fillOpacity="0.28"
            stroke="#C4962A"
            strokeWidth="2.5"
          />
        </g>
      </svg>
    </ChartShell>
  );
}
