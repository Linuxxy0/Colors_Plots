import { ChartShell } from './ChartShell';

type Props = {
  title?: string;
  compact?: boolean;
};

const cells = [
  ['#E7EEF5', '#D6E4EF', '#94B5CF', '#4A7BA8'],
  ['#D9E2EC', '#BFD1E0', '#6896BC', '#2C5F8A'],
  ['#EEF4F7', '#CBD9E6', '#82AAC8', '#365D7C'],
  ['#F6F8FA', '#DBE7F0', '#AFC6DA', '#5B84A4'],
];

export function HeatmapCard({ title = 'Correlation Heatmap', compact }: Props) {
  return (
    <ChartShell title={title} subtitle="Feature correlation" compact={compact}>
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
