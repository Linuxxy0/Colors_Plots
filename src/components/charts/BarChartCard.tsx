import { themes } from '@/themes/themes';
import { getSeries, toDisplay } from '@/utils/dataset';
import { hexToRgba } from '@/utils/colors';
import type { DatasetChartProps } from './chartTypes';
import { ChartShell } from './ChartShell';
import { useChartInteraction } from './useChartInteraction';
import { chartCopy, t, uiText } from '@/i18n';
import { useAppState } from '@/context/AppStateContext';

export function BarChartCard({ title, compact, records, xKey, yKey, theme = themes[0] }: DatasetChartProps) {
  const { locale } = useAppState();
  const series = getSeries(records, xKey, yKey, compact ? 5 : 6);
  const maxY = Math.max(...series.map((point) => point.yValue), 1);
  const { activeIndex, setHoveredIndex } = useChartInteraction(series.length);
  const activePoint = series[Math.max(activeIndex, 0)] ?? series[0];

  return (
    <ChartShell
      title={title ?? t(locale, chartCopy.bar.title ?? chartCopy.bar.name)}
      subtitle={`${yKey} by ${xKey}`}
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
        <line x1="26" y1="150" x2="296" y2="150" stroke={hexToRgba(theme.foreground, 0.18)} strokeWidth="1.5" />
        {series.map((point, index) => {
          const x = 36 + index * 44;
          const height = Math.max((point.yValue / maxY) * 108, 8);
          const y = 150 - height;
          const active = index === activeIndex;
          return (
            <g key={`${point.x}-${index}`} onMouseEnter={() => setHoveredIndex(index)}>
              <rect
                className="chart-bar"
                style={{ animationDelay: `${index * 90}ms` }}
                x={x}
                y={y}
                width="28"
                height={height}
                rx="10"
                fill={theme.palette[index % theme.palette.length]}
                opacity={active ? 1 : 0.78}
              />
              {active ? <rect x={x - 4} y={y - 4} width="36" height={height + 4} rx="14" fill="none" stroke={theme.foreground} strokeOpacity="0.18" strokeWidth="2" /> : null}
            </g>
          );
        })}
      </svg>
    </ChartShell>
  );
}
