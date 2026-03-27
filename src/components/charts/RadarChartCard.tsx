import { ChartShell } from './ChartShell';
import type { DatasetSource } from '@/types/dataset';
import { getRadarSeries } from '@/utils/dataset';

type Props = {
  title?: string;
  compact?: boolean;
  dataset?: DatasetSource;
};

function polarPoints(values: number[]) {
  const count = values.length;
  return values
    .map((value, index) => {
      const angle = (-Math.PI / 2) + (index * Math.PI * 2) / count;
      const radius = 50 * value;
      return `${(Math.cos(angle) * radius).toFixed(1)},${(Math.sin(angle) * radius).toFixed(1)}`;
    })
    .join(' ');
}

export function RadarChartCard({ title = 'Radar Chart', compact, dataset }: Props) {
  const radarSeries = dataset ? getRadarSeries(dataset, 6) : [];
  const values = radarSeries.length ? radarSeries.map((item) => item.value) : [0.8, 0.7, 0.63, 0.74, 0.67, 0.58];
  const benchmarkValues = values.map((value, index) => Math.max(0.28, value - 0.18 + index * 0.01));
  const polygon = polarPoints(values);
  const benchmarkPolygon = polarPoints(benchmarkValues);
  const subtitle = dataset && radarSeries.length ? radarSeries.map((item) => item.field).join(' · ') : 'Multi-metric overview';

  return (
    <ChartShell title={title} subtitle={subtitle} compact={compact} badge={dataset ? 'live' : 'demo'}>
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
          <polygon points={polygon} fill="#2C5F8A" fillOpacity="0.24" stroke="#1F3A5F" strokeWidth="3" />
          <polygon points={benchmarkPolygon} fill="#E9C46A" fillOpacity="0.28" stroke="#C4962A" strokeWidth="2.5" />
        </g>
      </svg>
    </ChartShell>
  );
}
