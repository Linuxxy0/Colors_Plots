import { useMemo, useState } from 'react';
import type { HoverInfo } from '@/types/app';
import { formatMetric, percentile, toDisplay, toNumber } from '@/utils/dataset';
import type { ChartPreviewProps } from './types';
import { PreviewShell } from './PreviewShell';

export function BoxplotPreview({ records, xKey, yKey, theme, mode = 'card' }: ChartPreviewProps) {
  const groups = useMemo(() => {
    const buckets = new Map<string, number[]>();
    records.forEach((record) => {
      const key = toDisplay(record[xKey]);
      const value = toNumber(record[yKey]);
      if (value === null) return;
      buckets.set(key, [...(buckets.get(key) ?? []), value]);
    });

    return Array.from(buckets.entries()).slice(0, 3).map(([group, values]) => {
      const sorted = [...values].sort((a, b) => a - b);
      return {
        group,
        min: sorted[0],
        q1: percentile(sorted, 0.25),
        median: percentile(sorted, 0.5),
        q3: percentile(sorted, 0.75),
        max: sorted[sorted.length - 1],
      };
    });
  }, [records, xKey, yKey]);

  const [info, setInfo] = useState<HoverInfo>({
    primaryLabel: xKey,
    primaryValue: groups[0]?.group ?? '--',
    secondaryLabel: yKey,
    secondaryValue: formatMetric(groups[0]?.median ?? 0),
  });

  const globalMin = Math.min(...groups.map((group) => group.min), 0);
  const globalMax = Math.max(...groups.map((group) => group.max), 1);
  const width = mode === 'detail' ? 420 : 320;
  const height = mode === 'detail' ? 250 : 180;
  const scale = (value: number) => 30 + (height - 70) - ((value - globalMin) / ((globalMax - globalMin) || 1)) * (height - 90);

  return (
    <PreviewShell title="分布比较" subtitle={`${xKey} × ${yKey}`} badge="hover" theme={theme} mode={mode} info={info}>
      <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full">
        <line x1="32" y1={height - 30} x2={width - 20} y2={height - 30} stroke={theme.muted} strokeOpacity="0.2" />
        {groups.map((group, index) => {
          const x = 90 + index * (mode === 'detail' ? 110 : 86);
          const active = info.primaryValue === group.group;

          return (
            <g
              key={group.group}
              onMouseEnter={() => setInfo({ primaryLabel: xKey, primaryValue: group.group, secondaryLabel: `${yKey} median`, secondaryValue: formatMetric(group.median) })}
            >
              <line x1={x} y1={scale(group.max)} x2={x} y2={scale(group.min)} stroke={theme.foreground} strokeWidth="3" />
              <rect
                x={x - 24}
                y={scale(group.q3)}
                width="48"
                height={Math.max(scale(group.q1) - scale(group.q3), 16)}
                rx="14"
                fill={active ? theme.success : theme.palette[index % theme.palette.length]}
                opacity="0.82"
              />
              <line x1={x - 24} y1={scale(group.median)} x2={x + 24} y2={scale(group.median)} stroke={theme.foreground} strokeWidth="3" />
              <line x1={x - 16} y1={scale(group.max)} x2={x + 16} y2={scale(group.max)} stroke={theme.foreground} strokeWidth="3" />
              <line x1={x - 16} y1={scale(group.min)} x2={x + 16} y2={scale(group.min)} stroke={theme.foreground} strokeWidth="3" />
            </g>
          );
        })}
      </svg>
    </PreviewShell>
  );
}
