import { useMemo, useState } from 'react';
import type { HoverInfo } from '@/types/app';
import { formatMetric, toDisplay, toNumber } from '@/utils/dataset';
import type { ChartPreviewProps } from './types';
import { PreviewShell } from './PreviewShell';

export function ScatterPreview({ records, xKey, yKey, theme, mode = 'card' }: ChartPreviewProps) {
  const points = useMemo(
    () =>
      records.slice(0, mode === 'detail' ? 7 : 6).map((record, index) => ({
        index,
        label: toDisplay(record.model ?? record.label ?? index + 1),
        x: toNumber(record[xKey]) ?? index + 1,
        y: toNumber(record[yKey]) ?? 0,
      })),
    [mode, records, xKey, yKey],
  );

  const [info, setInfo] = useState<HoverInfo>({
    primaryLabel: xKey,
    primaryValue: formatMetric(points[0]?.x ?? 0),
    secondaryLabel: yKey,
    secondaryValue: formatMetric(points[0]?.y ?? 0),
  });

  const width = mode === 'detail' ? 420 : 320;
  const height = mode === 'detail' ? 250 : 180;
  const xValues = points.map((point) => point.x);
  const yValues = points.map((point) => point.y);
  const xMin = Math.min(...xValues, 0);
  const xMax = Math.max(...xValues, 1);
  const yMin = Math.min(...yValues, 0);
  const yMax = Math.max(...yValues, 1);
  const plotLeft = 46;
  const plotTop = 26;
  const plotWidth = width - 80;
  const plotHeight = height - 58;

  return (
    <PreviewShell title="变量关系" subtitle={`${xKey} × ${yKey}`} badge="hover" theme={theme} mode={mode} info={info}>
      <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full">
        <line x1={plotLeft} y1={plotTop + plotHeight} x2={plotLeft + plotWidth} y2={plotTop + plotHeight} stroke={theme.muted} strokeOpacity="0.2" />
        <line x1={plotLeft} y1={plotTop} x2={plotLeft} y2={plotTop + plotHeight} stroke={theme.muted} strokeOpacity="0.2" />
        {points.map((point, index) => {
          const cx = plotLeft + ((point.x - xMin) / ((xMax - xMin) || 1)) * plotWidth;
          const cy = plotTop + plotHeight - ((point.y - yMin) / ((yMax - yMin) || 1)) * plotHeight;
          const active = info.primaryValue === formatMetric(point.x) && info.secondaryValue === formatMetric(point.y);

          return (
            <g key={point.label} onMouseEnter={() => setInfo({ primaryLabel: xKey, primaryValue: formatMetric(point.x), secondaryLabel: yKey, secondaryValue: formatMetric(point.y) })}>
              <circle cx={cx} cy={cy} r={active ? 15 : 10} fill={index % 2 === 0 ? theme.accent : theme.warm} fillOpacity={active ? 0.2 : 0.12} />
              <circle cx={cx} cy={cy} r={mode === 'detail' ? 7 : 6} fill={index % 2 === 0 ? theme.accent : theme.warm} />
            </g>
          );
        })}
      </svg>
    </PreviewShell>
  );
}
