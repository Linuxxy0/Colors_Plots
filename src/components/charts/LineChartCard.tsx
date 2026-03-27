import { useId } from 'react';
import { themes } from '@/themes/themes';
import { getSeries, toDisplay } from '@/utils/dataset';
import { hexToRgba } from '@/utils/colors';
import type { DatasetChartProps } from './chartTypes';
import { ChartShell } from './ChartShell';
import { useChartInteraction } from './useChartInteraction';
import { useAppState } from '@/context/AppStateContext';
import { chartCopy, t, uiText } from '@/i18n';

export function LineChartCard({ title, compact, records, xKey, yKey, theme = themes[0] }: DatasetChartProps) {
  const gradientId = useId();
  const { locale } = useAppState();
  const points = getSeries(records, xKey, yKey, compact ? 6 : 8);
  const maxY = Math.max(...points.map((point) => point.yValue), 1);
  const minY = Math.min(...points.map((point) => point.yValue), 0);
  const range = maxY - minY || 1;
  const { activeIndex, setHoveredIndex } = useChartInteraction(points.length);

  const mapped = points.map((point, index) => {
    const x = 28 + (index / Math.max(points.length - 1, 1)) * 264;
    const y = 146 - ((point.yValue - minY) / range) * 108;
    return { ...point, x, y };
  });

  const line = mapped.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ');
  const area = `${line} L 292 154 L 28 154 Z`;
  const activePoint = mapped[Math.max(activeIndex, 0)] ?? mapped[0];

  return (
    <ChartShell
      title={title ?? t(locale, chartCopy.line.title ?? chartCopy.line.name)}
      subtitle={`${xKey} × ${yKey}`}
      compact={compact}
      badge={t(locale, uiText.live)}
      theme={theme}
      info={
        activePoint ? (
          <div className="grid grid-cols-2 gap-2 rounded-2xl border px-3 py-3 text-xs chart-fade-up" style={{ borderColor: hexToRgba(theme.foreground, 0.08), backgroundColor: hexToRgba(theme.foreground, 0.03) }}>
            <div style={{ color: theme.muted }}>{xKey}</div>
            <div className="text-right font-semibold" style={{ color: theme.foreground }}>{activePoint.x}</div>
            <div style={{ color: theme.muted }}>{yKey}</div>
            <div className="text-right font-semibold" style={{ color: theme.foreground }}>{toDisplay(activePoint.yValue)}</div>
          </div>
        ) : null
      }
    >
      <svg viewBox="0 0 320 180" className="h-full w-full" onMouseLeave={() => setHoveredIndex(null)}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={theme.palette[1]} stopOpacity="0.3" />
            <stop offset="100%" stopColor={theme.palette[1]} stopOpacity="0" />
          </linearGradient>
        </defs>
        <g stroke={hexToRgba(theme.foreground, 0.15)} strokeWidth="1">
          <line x1="28" y1="22" x2="28" y2="154" />
          <line x1="28" y1="154" x2="292" y2="154" />
          {[44, 76, 108, 140].map((y) => (
            <line key={y} x1="28" y1={y} x2="292" y2={y} strokeDasharray="4 6" />
          ))}
        </g>
        <path d={area} fill={`url(#${gradientId})`} className="chart-fade-up" />
        <path d={line} fill="none" stroke={theme.palette[0]} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="chart-draw" />
        {mapped.map((point, index) => {
          const active = index === activeIndex;
          return (
            <g key={`${point.x}-${point.y}`} onMouseEnter={() => setHoveredIndex(index)}>
              <circle cx={point.x} cy={point.y} r={active ? 10 : 7.5} fill={hexToRgba(theme.palette[0], active ? 0.18 : 0.08)} />
              <circle
                className={active ? 'chart-point' : ''}
                cx={point.x}
                cy={point.y}
                r={active ? 5.5 : 4.5}
                fill={theme.panel}
                stroke={theme.palette[0]}
                strokeWidth={active ? 4 : 3}
              />
            </g>
          );
        })}
      </svg>
    </ChartShell>
  );
}
