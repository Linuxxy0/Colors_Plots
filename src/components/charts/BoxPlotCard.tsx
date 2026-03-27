import { ChartShell } from './ChartShell';

type Props = {
  title?: string;
  compact?: boolean;
};

export function BoxPlotCard({ title = 'Boxplot', compact }: Props) {
  return (
    <ChartShell title={title} subtitle="Distribution analysis" compact={compact}>
      <svg viewBox="0 0 320 180" className="h-full w-full">
        <line x1="24" y1="150" x2="296" y2="150" stroke="#D9E2EC" strokeWidth="1.5" />
        {[
          { x: 68, top: 46, bottom: 126, boxTop: 72, boxBottom: 112, median: 92 },
          { x: 154, top: 36, bottom: 136, boxTop: 62, boxBottom: 108, median: 84 },
          { x: 240, top: 58, bottom: 132, boxTop: 82, boxBottom: 114, median: 98 },
        ].map((item, index) => (
          <g key={item.x}>
            <line x1={item.x} y1={item.top} x2={item.x} y2={item.bottom} stroke="#1F3A5F" strokeWidth="3" />
            <line x1={item.x - 18} y1={item.top} x2={item.x + 18} y2={item.top} stroke="#1F3A5F" strokeWidth="3" />
            <line x1={item.x - 18} y1={item.bottom} x2={item.x + 18} y2={item.bottom} stroke="#1F3A5F" strokeWidth="3" />
            <rect
              x={item.x - 26}
              y={item.boxTop}
              width="52"
              height={item.boxBottom - item.boxTop}
              rx="12"
              fill={index === 1 ? '#3C8DAD' : '#D9E2EC'}
            />
            <line
              x1={item.x - 26}
              y1={item.median}
              x2={item.x + 26}
              y2={item.median}
              stroke="#183046"
              strokeWidth="3"
            />
          </g>
        ))}
      </svg>
    </ChartShell>
  );
}
