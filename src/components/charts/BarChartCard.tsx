import { ChartShell } from './ChartShell';

type Props = {
  title?: string;
  compact?: boolean;
};

const bars = [58, 96, 74, 118, 86];

export function BarChartCard({ title = 'Model Comparison', compact }: Props) {
  return (
    <ChartShell title={title} subtitle="Benchmark scores" compact={compact}>
      <svg viewBox="0 0 320 180" className="h-full w-full">
        <line x1="26" y1="150" x2="296" y2="150" stroke="#D9E2EC" strokeWidth="1.5" />
        {bars.map((height, index) => {
          const x = 36 + index * 52;
          const y = 150 - height;
          const fill = ['#D9E2EC', '#3C8DAD', '#2C5F8A', '#1F3A5F', '#E9C46A'][index];
          return <rect key={height} x={x} y={y} width="30" height={height} rx="10" fill={fill} />;
        })}
      </svg>
    </ChartShell>
  );
}
