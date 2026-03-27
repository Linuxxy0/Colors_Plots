import { themes } from '@/themes/themes';
import { getSeries, toDisplay } from '@/utils/dataset';
import { hexToRgba } from '@/utils/colors';
import type { DatasetChartProps } from './chartTypes';
import { ChartShell } from './ChartShell';
import { useChartInteraction } from './useChartInteraction';
import { chartCopy, t, uiText } from '@/i18n';
import { useAppState } from '@/context/AppStateContext';

export function ScatterChartCard({ title, compact, records, xKey, yKey, theme = themes[0] }: DatasetChartProps) {
  const { locale } = useAppState();
  const points = getSeries(records, xKey, yKey, compact ? 7 : 8);
  const xValues = points.map((point) => point.xValue);
  const yValues = points.map((point) => point.yValue);
  const xMin = Math.min(...xValues, 0);
  const xMax = Math.max(...xValues, 1);
  const yMin = Math.min(...yValues, 0);
  const yMax = Math.max(...yValues, 1);
  const xRange = xMax - xMin || 1;
  const yRange = yMax - yMin || 1;
  const { activeIndex, setHoveredIndex } = useChartInteraction(points.length);

  const mapped = points.map((point, index) => {
    const x = 36 + ((point.xValue - xMin) / xRange) * 244;
    const y = 142 - ((point.yValue - yMin) / yRange) * 96;
    const r = compact ? 5 : 6 + (index % 3);
    return { ...point, x, y, r };
  });
  const activePoint = mapped[Math.max(activeIndex, 0)] ?? mapped[0];

  return (
    <ChartShell
      title={title ?? t(locale, chartCopy.scatter.title ?? chartCopy.scatter.name)}
      subtitle={`${xKey} × ${yKey}`}
      compact={compact}
      badge={t(locale, uiText.interactive)}
      theme={theme}
      info={
        activePoint ? (
          <div className="grid grid-cols-2 gap-2 rounded-2xl border px-3 py-3 text-xs chart-fade-up" style={{ borderColor: hexToRgba(theme.foreground, 0.08), backgroundColor: hexToRgba(theme.foreground, 0.03) }}>
            <div style={{ color: theme.muted }}>{xKey}</div>
            <div className="text-right font-semibold" style={{ color: theme.foreground }}>{toDisplay(activePoint.xValue)}</div>
            <div style={{ color: theme.muted }}>{yKey}</div>
            <div className="text-right font-semibold" style={{ color: theme.foreground }}>{toDisplay(activePoint.yValue)}</div>
          </div>
        ) : null
      }
    >
      <svg viewBox="0 0 320 180" className="h-full w-full" onMouseLeave={() => setHoveredIndex(null)}>
        <line x1="28" y1="150" x2="292" y2="150" stroke={hexToRgba(theme.foreground, 0.18)} strokeWidth="1.5" />
        <line x1="28" y1="26" x2="28" y2="150" stroke={hexToRgba(theme.foreground, 0.18)} strokeWidth="1.5" />
        {mapped.length > 1 ? (
          <path
            d={`M ${mapped[0].x} ${mapped[0].y} L ${mapped[mapped.length - 1].x} ${mapped[mapped.length - 1].y}`}
            stroke={theme.palette[0]}
            strokeWidth="3"
            fill="none"
            strokeDasharray="10 8"
            className="chart-fade-up"
          />
        ) : null}
        {mapped.map((point, index) => {
          const active = index === activeIndex;
          return (
            <g key={`${point.x}-${point.y}`} onMouseEnter={() => setHoveredIndex(index)}>
              <circle cx={point.x} cy={point.y} r={active ? point.r + 4 : point.r + 1} fill={hexToRgba(theme.palette[index % theme.palette.length], active ? 0.18 : 0.08)} />
              <circle
                className={active ? 'chart-point' : ''}
                cx={point.x}
                cy={point.y}
                r={active ? point.r + 1 : point.r}
                fill={theme.palette[index % theme.palette.length]}
                fillOpacity={active ? 0.96 : 0.82}
              />
            </g>
          );
        })}
      </svg>
    </ChartShell>
  );
}
