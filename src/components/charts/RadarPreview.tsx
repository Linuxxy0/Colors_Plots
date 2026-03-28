import { useMemo, useState } from 'react';
import type { HoverInfo } from '@/types/app';
import { formatMetric, toNumber } from '@/utils/dataset';
import type { ChartPreviewProps } from './types';
import { PreviewShell } from './PreviewShell';

function polar(index: number, total: number, radius: number) {
  const angle = -Math.PI / 2 + (Math.PI * 2 * index) / total;
  return [Math.cos(angle) * radius, Math.sin(angle) * radius] as const;
}

export function RadarPreview({ records, theme, mode = 'card' }: ChartPreviewProps) {
  const latest = records[records.length - 1] ?? {};
  const keys = Object.keys(latest).filter((key) => key !== 'row_id').slice(0, 6);
  const values = useMemo(() => keys.map((key) => toNumber(latest[key]) ?? 0), [keys, latest]);
  const maxValue = Math.max(...values, 1);

  const [info, setInfo] = useState<HoverInfo>({
    primaryLabel: 'metric',
    primaryValue: keys[0] ?? '--',
    secondaryLabel: 'score',
    secondaryValue: formatMetric(values[0] ?? 0),
  });

  const radius = mode === 'detail' ? 88 : 62;
  const centerX = mode === 'detail' ? 210 : 160;
  const centerY = mode === 'detail' ? 120 : 92;
  const width = mode === 'detail' ? 420 : 320;
  const height = mode === 'detail' ? 260 : 190;

  const polygon = values
    .map((value, index) => {
      const [x, y] = polar(index, keys.length || 1, (value / maxValue) * radius);
      return `${centerX + x},${centerY + y}`;
    })
    .join(' ');

  return (
    <PreviewShell title="多指标画像" subtitle="latest profile" badge="hover" theme={theme} mode={mode} info={info}>
      <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full">
        {[radius, radius * 0.7, radius * 0.4].map((ring) => (
          <polygon
            key={ring}
            points={keys
              .map((_, index) => {
                const [x, y] = polar(index, keys.length || 1, ring);
                return `${centerX + x},${centerY + y}`;
              })
              .join(' ')}
            fill="none"
            stroke={theme.muted}
            strokeOpacity="0.2"
          />
        ))}
        {keys.map((key, index) => {
          const [x, y] = polar(index, keys.length || 1, radius);
          const [px, py] = polar(index, keys.length || 1, (values[index] / maxValue) * radius);
          const active = info.primaryValue === key;

          return (
            <g key={key} onMouseEnter={() => setInfo({ primaryLabel: 'metric', primaryValue: key, secondaryLabel: 'score', secondaryValue: formatMetric(values[index]) })}>
              <line x1={centerX} y1={centerY} x2={centerX + x} y2={centerY + y} stroke={theme.muted} strokeOpacity="0.18" />
              <circle cx={centerX + px} cy={centerY + py} r={active ? 10 : 6} fill={theme.accent} fillOpacity={active ? 0.18 : 0.12} />
              <circle cx={centerX + px} cy={centerY + py} r="4" fill={theme.accent} />
            </g>
          );
        })}
        <polygon points={polygon} fill={theme.accent} fillOpacity="0.18" stroke={theme.accent} strokeWidth="3" />
      </svg>
    </PreviewShell>
  );
}
