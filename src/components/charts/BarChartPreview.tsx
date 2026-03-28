import { useMemo, useState } from 'react';
import type { HoverInfo } from '@/types/app';
import { formatMetric, toNumber, toDisplay } from '@/utils/dataset';
import type { ChartPreviewProps } from './types';
import { PreviewShell } from './PreviewShell';

export function BarChartPreview({ records, xKey, yKey, theme, mode = 'card' }: ChartPreviewProps) {
  const items = useMemo(
    () => records.slice(0, mode === 'detail' ? 6 : 5).map((record, index) => ({ index, label: toDisplay(record[xKey]), value: toNumber(record[yKey]) ?? 0 })),
    [mode, records, xKey, yKey],
  );

  const [info, setInfo] = useState<HoverInfo>({
    primaryLabel: xKey,
    primaryValue: items[0]?.label ?? '--',
    secondaryLabel: yKey,
    secondaryValue: formatMetric(items[0]?.value ?? 0),
  });

  const maxY = Math.max(...items.map((item) => item.value), 1);
  const width = mode === 'detail' ? 420 : 320;
  const height = mode === 'detail' ? 250 : 180;
  const baseY = height - 30;
  const colors = [theme.accent, theme.palette[1], theme.success, theme.palette[3], theme.warm, theme.palette[0]];

  return (
    <PreviewShell title="模型对比" subtitle={`${yKey} by ${xKey}`} badge="hover" theme={theme} mode={mode} info={info}>
      <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full">
        <line x1="34" y1={baseY} x2={width - 24} y2={baseY} stroke={theme.muted} strokeOpacity="0.2" />
        {items.map((item, index) => {
          const barWidth = mode === 'detail' ? 42 : 28;
          const gap = mode === 'detail' ? 20 : 14;
          const startX = 56 + index * (barWidth + gap);
          const barHeight = Math.max((item.value / maxY) * (height - 80), 20);
          const y = baseY - barHeight;
          const active = info.primaryValue === item.label;

          return (
            <g key={item.label} onMouseEnter={() => setInfo({ primaryLabel: xKey, primaryValue: item.label, secondaryLabel: yKey, secondaryValue: formatMetric(item.value) })}>
              <rect x={startX - 4} y={y - 4} width={barWidth + 8} height={barHeight + 8} rx="16" fill={theme.foreground} fillOpacity={active ? 0.07 : 0} />
              <rect x={startX} y={y} width={barWidth} height={barHeight} rx="14" fill={colors[index % colors.length]} opacity={active ? 1 : 0.92} />
            </g>
          );
        })}
      </svg>
    </PreviewShell>
  );
}
