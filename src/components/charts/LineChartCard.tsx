import { ChartShell } from './ChartShell';

type Props = {
  title?: string;
  compact?: boolean;
};

export function LineChartCard({ title = 'Training Trend', compact }: Props) {
  return (
    <ChartShell title={title} subtitle="Epoch vs performance" compact={compact}>
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
        <path
          d="M28 132 C60 126, 70 122, 90 118 S130 95, 150 98 S195 72, 214 70 S258 43, 292 38 L292 154 L28 154 Z"
          fill="url(#lineFill)"
        />
        <path
          d="M28 132 C60 126, 70 122, 90 118 S130 95, 150 98 S195 72, 214 70 S258 43, 292 38"
          fill="none"
          stroke="#1F3A5F"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {[
          [28, 132],
          [90, 118],
          [150, 98],
          [214, 70],
          [292, 38],
        ].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="5" fill="#FFFFFF" stroke="#1F3A5F" strokeWidth="3" />
        ))}
      </svg>
    </ChartShell>
  );
}
