import { ChartShell } from './ChartShell';
import type { DatasetSource } from '@/types/dataset';
import { getHeatmapMatrix } from '@/utils/dataset';

type Props = {
  title?: string;
  compact?: boolean;
  dataset?: DatasetSource;
};

const fallbackCells = [
  ['#E7EEF5', '#D6E4EF', '#94B5CF', '#4A7BA8'],
  ['#D9E2EC', '#BFD1E0', '#6896BC', '#2C5F8A'],
  ['#EEF4F7', '#CBD9E6', '#82AAC8', '#365D7C'],
  ['#F6F8FA', '#DBE7F0', '#AFC6DA', '#5B84A4'],
];

function colorFromCorrelation(value: number): string {
  const intensity = Math.round(((value + 1) / 2) * 255);
  const alpha = 0.18 + ((value + 1) / 2) * 0.68;
  return `rgba(${26 + Math.round(intensity * 0.2)}, ${72 + Math.round(intensity * 0.3)}, ${110 + Math.round(intensity * 0.45)}, ${alpha.toFixed(2)})`;
}

export function HeatmapCard({ title = 'Correlation Heatmap', compact, dataset }: Props) {
  const heatmap = dataset ? getHeatmapMatrix(dataset) : { fields: [], matrix: [] as number[][] };
  const cells = heatmap.matrix.length ? heatmap.matrix.map((row) => row.map(colorFromCorrelation)) : fallbackCells;
  const subtitle = dataset && heatmap.fields.length ? heatmap.fields.join(' · ') : 'Feature correlation';

  return (
    <ChartShell title={title} subtitle={subtitle} compact={compact} badge={dataset ? 'live' : 'demo'}>
      <div className="grid h-full grid-cols-4 gap-3">
        {cells.flatMap((row, rowIndex) =>
          row.map((color, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="rounded-2xl"
              style={{ backgroundColor: color, minHeight: compact ? '36px' : '52px' }}
            />
          )),
        )}
      </div>
    </ChartShell>
  );
}
