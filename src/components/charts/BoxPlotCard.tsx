import { ChartShell } from './ChartShell';
import type { DatasetSource } from '@/types/dataset';
import { getBoxGroups } from '@/utils/dataset';

type Props = {
  title?: string;
  compact?: boolean;
  dataset?: DatasetSource;
};

const fallbackGroups = [
  { field: 'A', min: 46, q1: 72, median: 92, q3: 112, max: 126 },
  { field: 'B', min: 36, q1: 62, median: 84, q3: 108, max: 136 },
  { field: 'C', min: 58, q1: 82, median: 98, q3: 114, max: 132 },
];

export function BoxPlotCard({ title = 'Boxplot', compact, dataset }: Props) {
  const groups = dataset ? getBoxGroups(dataset, 3) : [];
  const source = groups.length
    ? groups
    : fallbackGroups.map((group) => ({
        field: group.field,
        min: group.min,
        q1: group.q1,
        median: group.median,
        q3: group.q3,
        max: group.max,
      }));

  const allValues = source.flatMap((group) => [group.min, group.q1, group.median, group.q3, group.max]);
  const minValue = Math.min(...allValues);
  const maxValue = Math.max(...allValues);
  const scale = (value: number) => 140 - ((value - minValue) / (maxValue - minValue || 1)) * 94;
  const subtitle = dataset ? source.map((group) => group.field).join(' · ') : 'Distribution analysis';

  return (
    <ChartShell title={title} subtitle={subtitle} compact={compact} badge={dataset ? 'live' : 'demo'}>
      <svg viewBox="0 0 320 180" className="h-full w-full">
        <line x1="24" y1="150" x2="296" y2="150" stroke="#D9E2EC" strokeWidth="1.5" />
        {source.map((item, index) => {
          const x = 68 + index * 86;
          const top = scale(item.max);
          const bottom = scale(item.min);
          const boxTop = scale(item.q3);
          const boxBottom = scale(item.q1);
          const median = scale(item.median);

          return (
            <g key={item.field}>
              <line x1={x} y1={top} x2={x} y2={bottom} stroke="#1F3A5F" strokeWidth="3" />
              <line x1={x - 18} y1={top} x2={x + 18} y2={top} stroke="#1F3A5F" strokeWidth="3" />
              <line x1={x - 18} y1={bottom} x2={x + 18} y2={bottom} stroke="#1F3A5F" strokeWidth="3" />
              <rect
                x={x - 26}
                y={boxTop}
                width="52"
                height={Math.max(boxBottom - boxTop, 8)}
                rx="12"
                fill={index === 1 ? '#3C8DAD' : '#D9E2EC'}
              />
              <line x1={x - 26} y1={median} x2={x + 26} y2={median} stroke="#183046" strokeWidth="3" />
            </g>
          );
        })}
      </svg>
    </ChartShell>
  );
}
