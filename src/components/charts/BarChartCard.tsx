import { ChartShell } from './ChartShell';
import type { DatasetSource } from '@/types/dataset';
import { getSeries } from '@/utils/dataset';

type Props = {
  title?: string;
  compact?: boolean;
  dataset?: DatasetSource;
};

const fallbackBars = [58, 96, 74, 118, 86];
const palette = ['#D9E2EC', '#3C8DAD', '#2C5F8A', '#1F3A5F', '#E9C46A'];

export function BarChartCard({ title = 'Model Comparison', compact, dataset }: Props) {
  const series = dataset ? getSeries(dataset, dataset.xField, dataset.yField).slice(-5) : [];
  const values = series.length ? series.map((item) => item.y) : fallbackBars;
  const maxValue = Math.max(...values, 1);
  const subtitle = dataset ? `${dataset.yField} across selected rows` : 'Benchmark scores';

  return (
    <ChartShell title={title} subtitle={subtitle} compact={compact} badge={dataset ? 'live' : 'demo'}>
      <svg viewBox="0 0 320 180" className="h-full w-full">
        <line x1="26" y1="150" x2="296" y2="150" stroke="#D9E2EC" strokeWidth="1.5" />
        {values.map((value, index) => {
          const x = 36 + index * 52;
          const height = (value / maxValue) * 118;
          const y = 150 - height;
          return <rect key={`${value}-${index}`} x={x} y={y} width="30" height={height} rx="10" fill={palette[index % palette.length]} />;
        })}
      </svg>
    </ChartShell>
  );
}
