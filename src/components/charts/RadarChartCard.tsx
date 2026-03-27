import { themes } from '@/themes/themes';
import { getNumericValues, toDisplay } from '@/utils/dataset';
import { hexToRgba } from '@/utils/colors';
import type { DatasetChartProps } from './chartTypes';
import { ChartShell } from './ChartShell';
import { useChartInteraction } from './useChartInteraction';
import { chartCopy, t, uiText } from '@/i18n';
import { useAppState } from '@/context/AppStateContext';

function pointAt(index: number, total: number, radius: number) {
  const angle = (-Math.PI / 2) + (Math.PI * 2 * index) / total;
  return [Math.cos(angle) * radius, Math.sin(angle) * radius] as const;
}

export function RadarChartCard({ title, compact, records, numericKeys = [], theme = themes[0] }: DatasetChartProps) {
  const { locale } = useAppState();
  const keys = numericKeys.filter((key) => !['samples', 'row_id'].includes(key)).slice(0, 6);
  const latestRecord = records.length ? records[records.length - 1] : {};
  const values = keys.map((key) => {
    const series = getNumericValues(records, key);
    const max = Math.max(...series, 1);
    const lastSeriesValue = series.length ? series[series.length - 1] : 0;
    const current = typeof latestRecord[key] === 'number' ? Number(latestRecord[key]) : lastSeriesValue;
    return max ? current / max : 0;
  });
  const { activeIndex, setHoveredIndex } = useChartInteraction(keys.length);

  const polygon = values
    .map((value, index) => {
      const [x, y] = pointAt(index, keys.length || 1, value * 52);
      return `${x},${y}`;
    })
    .join(' ');
  const activeLabel = keys[Math.max(activeIndex, 0)] ?? keys[0];
  const activeValue = values[Math.max(activeIndex, 0)] ?? 0;

  return (
    <ChartShell
      title={title ?? t(locale, chartCopy.radar.title ?? chartCopy.radar.name)}
      subtitle={locale === 'zh' ? '多指标概览' : 'Multi-metric overview'}
      compact={compact}
      badge={t(locale, uiText.uploadReady)}
      theme={theme}
      info={
        activeLabel ? (
          <div className="grid grid-cols-2 gap-2 rounded-2xl border px-3 py-3 text-xs chart-fade-up" style={{ borderColor: hexToRgba(theme.foreground, 0.08), backgroundColor: hexToRgba(theme.foreground, 0.03) }}>
            <div style={{ color: theme.muted }}>{locale === 'zh' ? '指标' : 'Metric'}</div>
            <div className="text-right font-semibold" style={{ color: theme.foreground }}>{activeLabel}</div>
            <div style={{ color: theme.muted }}>{locale === 'zh' ? '归一化值' : 'Normalized value'}</div>
            <div className="text-right font-semibold" style={{ color: theme.foreground }}>{toDisplay(activeValue)}</div>
          </div>
        ) : null
      }
    >
      <svg viewBox="0 0 240 180" className="h-full w-full" onMouseLeave={() => setHoveredIndex(null)}>
        <g transform="translate(120 90)">
          {[60, 45, 30].map((radius) => (
            <polygon
              key={radius}
              points={keys.map((_, index) => pointAt(index, keys.length || 1, radius).join(',')).join(' ')}
              fill="none"
              stroke={hexToRgba(theme.foreground, 0.16)}
              strokeWidth="1.2"
            />
          ))}
          {keys.map((_, index) => {
            const [x, y] = pointAt(index, keys.length || 1, 60);
            return <line key={`${x}-${y}`} x1="0" y1="0" x2={x} y2={y} stroke={hexToRgba(theme.foreground, 0.16)} strokeWidth="1.2" />;
          })}
          <polygon points={polygon} fill={hexToRgba(theme.palette[1], 0.22)} stroke={theme.palette[0]} strokeWidth="3" className="chart-fade-up" />
          {values.map((value, index) => {
            const [x, y] = pointAt(index, keys.length || 1, value * 52);
            const active = index === activeIndex;
            return (
              <g key={keys[index]} onMouseEnter={() => setHoveredIndex(index)}>
                <circle cx={x} cy={y} r={active ? 8 : 5} fill={hexToRgba(theme.palette[0], active ? 0.24 : 0.14)} />
                <circle className={active ? 'chart-point' : ''} cx={x} cy={y} r={active ? 4.5 : 3.5} fill={theme.palette[0]} />
              </g>
            );
          })}
        </g>
      </svg>
    </ChartShell>
  );
}
