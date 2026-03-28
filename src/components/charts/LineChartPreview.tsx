import { useMemo, useState } from 'react';
import type { HoverInfo } from '@/types/app';
import { formatMetric, toDisplay, toNumber } from '@/utils/dataset';
import type { ChartPreviewProps } from './types';
import { PreviewShell } from './PreviewShell';

export function LineChartPreview({ records, xKey, yKey, theme, mode = 'card' }: ChartPreviewProps) {
  const points = useMemo(
    () =>
      records.slice(0, mode === 'detail' ? 8 : 7).map((record, index) => ({
        index,
        x: record[xKey] ?? index + 1,
        y: toNumber(record[yKey]) ?? 0,
      })),
    [mode, records, xKey, yKey],
  );

  const initialInfo = useMemo<HoverInfo>(() => {
    const lastPoint = points[points.length - 1];
    return {
      primaryLabel: xKey,
      primaryValue: toDisplay(lastPoint?.x ?? '--'),
      secondaryLabel: yKey,
      secondaryValue: formatMetric(lastPoint?.y ?? 0),
    };
  }, [points, xKey, yKey]);

  const [info, setInfo] = useState<HoverInfo>(initialInfo);
  const width = mode === 'detail' ? 420 : 320;
  const height = mode === 'detail' ? 250 : 180;
  const plotLeft = 46;
  const plotTop = 30;
  const plotWidth = width - 80;
  const plotHeight = height - 60;
  const maxY = Math.max(...points.map((point) => point.y), 1);
  const minY = Math.min(...points.map((point) => point.y), 0);
  const range = maxY - minY || 1;

  const mapped = points.map((point, index) => {
    const x = plotLeft + (index / Math.max(points.length - 1, 1)) * plotWidth;
    const y = plotTop + plotHeight - ((point.y - minY) / range) * plotHeight;
    return { ...point, sx: x, sy: y };
  });

  const line = mapped.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.sx} ${point.sy}`).join(' ');
  const area = `${line} L ${plotLeft + plotWidth} ${plotTop + plotHeight} L ${plotLeft} ${plotTop + plotHeight} Z`;

  return (
    <PreviewShell title="训练趋势" subtitle={`${xKey} × ${yKey}`} badge="hover" theme={theme} mode={mode} info={info}>
      <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full">
        <defs>
          <linearGradient id={`line-fill-${mode}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={theme.accent} stopOpacity="0.24" />
            <stop offset="100%" stopColor={theme.accent} stopOpacity="0.02" />
          </linearGradient>
        </defs>
        {[0, 0.25, 0.5, 0.75, 1].map((tick) => (
          <line
            key={tick}
            x1={plotLeft}
            y1={plotTop + plotHeight * tick}
            x2={plotLeft + plotWidth}
            y2={plotTop + plotHeight * tick}
            stroke={theme.muted}
            strokeOpacity="0.18"
            strokeDasharray="4 8"
          />
        ))}
        <line x1={plotLeft} y1={plotTop} x2={plotLeft} y2={plotTop + plotHeight} stroke={theme.muted} strokeOpacity="0.22" />
        <line x1={plotLeft} y1={plotTop + plotHeight} x2={plotLeft + plotWidth} y2={plotTop + plotHeight} stroke={theme.muted} strokeOpacity="0.22" />
        <path d={area} fill={`url(#line-fill-${mode})`} />
        <path d={line} fill="none" stroke={theme.accent} strokeWidth={mode === 'detail' ? 5 : 4} strokeLinecap="round" strokeLinejoin="round" />
        {mapped.map((point) => {
          const active = info.primaryValue === toDisplay(point.x);
          return (
            <g
              key={`${point.index}-${point.sx}`}
              onMouseEnter={() => setInfo({ primaryLabel: xKey, primaryValue: toDisplay(point.x), secondaryLabel: yKey, secondaryValue: formatMetric(point.y) })}
            >
              <circle cx={point.sx} cy={point.sy} r={active ? 12 : 9} fill={theme.accent} fillOpacity={active ? 0.14 : 0.08} />
              <circle cx={point.sx} cy={point.sy} r={mode === 'detail' ? 6 : 5} fill={theme.panel} stroke={theme.accent} strokeWidth="4" />
            </g>
          );
        })}
      </svg>
    </PreviewShell>
  );
}
