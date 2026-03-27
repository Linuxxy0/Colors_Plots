import { themes } from '@/themes/themes';
import { getNumericValues, percentile, toDisplay } from '@/utils/dataset';
import { hexToRgba } from '@/utils/colors';
import type { DatasetChartProps } from './chartTypes';
import { ChartShell } from './ChartShell';
import { useChartInteraction } from './useChartInteraction';
import { chartCopy, t, uiText } from '@/i18n';
import { useAppState } from '@/context/AppStateContext';

export function BoxPlotCard({ title, compact, records, numericKeys = [], theme = themes[0] }: DatasetChartProps) {
  const { locale } = useAppState();
  const keys = numericKeys.slice(0, 3);
  const stats = keys.map((key) => {
    const values = getNumericValues(records, key);
    const min = Math.min(...values, 0);
    const max = Math.max(...values, 1);
    return {
      key,
      min,
      max,
      q1: percentile(values, 0.25),
      median: percentile(values, 0.5),
      q3: percentile(values, 0.75),
    };
  });

  const globalMin = Math.min(...stats.map((item) => item.min), 0);
  const globalMax = Math.max(...stats.map((item) => item.max), 1);
  const scale = (value: number) => 146 - ((value - globalMin) / (globalMax - globalMin || 1)) * 108;
  const { activeIndex, setHoveredIndex } = useChartInteraction(stats.length);
  const active = stats[Math.max(activeIndex, 0)] ?? stats[0];

  return (
    <ChartShell
      title={title ?? t(locale, chartCopy.boxplot.title ?? chartCopy.boxplot.name)}
      subtitle={locale === 'zh' ? '分布统计' : 'Distribution analysis'}
      compact={compact}
      badge={t(locale, uiText.datasetBadge)}
      theme={theme}
      info={
        active ? (
          <div className="grid grid-cols-2 gap-2 rounded-2xl border px-3 py-3 text-xs chart-fade-up" style={{ borderColor: hexToRgba(theme.foreground, 0.08), backgroundColor: hexToRgba(theme.foreground, 0.03) }}>
            <div style={{ color: theme.muted }}>{locale === 'zh' ? '字段' : 'Field'}</div>
            <div className="text-right font-semibold" style={{ color: theme.foreground }}>{active.key}</div>
            <div style={{ color: theme.muted }}>Median</div>
            <div className="text-right font-semibold" style={{ color: theme.foreground }}>{toDisplay(active.median)}</div>
            <div style={{ color: theme.muted }}>IQR</div>
            <div className="text-right font-semibold" style={{ color: theme.foreground }}>{toDisplay(active.q3 - active.q1)}</div>
          </div>
        ) : null
      }
    >
      <svg viewBox="0 0 320 180" className="h-full w-full" onMouseLeave={() => setHoveredIndex(null)}>
        <line x1="24" y1="150" x2="296" y2="150" stroke={hexToRgba(theme.foreground, 0.18)} strokeWidth="1.5" />
        {stats.map((item, index) => {
          const x = 68 + index * 86;
          const top = scale(item.max);
          const bottom = scale(item.min);
          const boxTop = scale(item.q3);
          const boxBottom = scale(item.q1);
          const median = scale(item.median);
          const activeItem = index === activeIndex;
          return (
            <g key={item.key} onMouseEnter={() => setHoveredIndex(index)} className="chart-fade-up">
              <line x1={x} y1={top} x2={x} y2={bottom} stroke={theme.palette[0]} strokeWidth={activeItem ? 4 : 3} />
              <line x1={x - 18} y1={top} x2={x + 18} y2={top} stroke={theme.palette[0]} strokeWidth={activeItem ? 4 : 3} />
              <line x1={x - 18} y1={bottom} x2={x + 18} y2={bottom} stroke={theme.palette[0]} strokeWidth={activeItem ? 4 : 3} />
              <rect x={x - 26} y={boxTop} width="52" height={Math.max(boxBottom - boxTop, 12)} rx="12" fill={theme.palette[(index + 1) % theme.palette.length]} opacity={activeItem ? 1 : 0.82} />
              <line x1={x - 26} y1={median} x2={x + 26} y2={median} stroke={hexToRgba(theme.foreground, 0.9)} strokeWidth={activeItem ? 4 : 3} />
            </g>
          );
        })}
      </svg>
    </ChartShell>
  );
}
