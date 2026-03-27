import { themes } from '@/themes/themes';
import { getNumericValues, pearson, toDisplay } from '@/utils/dataset';
import type { DatasetChartProps } from './chartTypes';
import { ChartShell } from './ChartShell';
import { hexToRgba } from '@/utils/colors';
import { useChartInteraction } from './useChartInteraction';
import { chartCopy, t, uiText } from '@/i18n';
import { useAppState } from '@/context/AppStateContext';

function correlationColor(value: number, positive: string, negative: string) {
  const alpha = Math.min(Math.abs(value), 1);
  return value >= 0 ? hexToRgba(positive, 0.18 + alpha * 0.62) : hexToRgba(negative, 0.18 + alpha * 0.62);
}

export function HeatmapCard({ title, compact, records, numericKeys = [], theme = themes[0] }: DatasetChartProps) {
  const { locale } = useAppState();
  const keys = numericKeys.slice(0, 4);
  const matrix = keys.map((rowKey) =>
    keys.map((colKey) => {
      if (rowKey === colKey) return 1;
      return pearson(getNumericValues(records, rowKey), getNumericValues(records, colKey));
    }),
  );
  const flat = matrix.flatMap((row, rowIndex) => row.map((value, colIndex) => ({ rowKey: keys[rowIndex], colKey: keys[colIndex], value })));
  const { activeIndex, setHoveredIndex } = useChartInteraction(flat.length);
  const active = flat[Math.max(activeIndex, 0)] ?? flat[0];

  return (
    <ChartShell
      title={title ?? t(locale, chartCopy.heatmap.title ?? chartCopy.heatmap.name)}
      subtitle={locale === 'zh' ? '数值字段相关矩阵' : 'Numeric feature correlation'}
      compact={compact}
      badge={t(locale, uiText.auto)}
      theme={theme}
      info={
        active ? (
          <div className="grid grid-cols-2 gap-2 rounded-2xl border px-3 py-3 text-xs chart-fade-up" style={{ borderColor: hexToRgba(theme.foreground, 0.08), backgroundColor: hexToRgba(theme.foreground, 0.03) }}>
            <div style={{ color: theme.muted }}>{locale === 'zh' ? '行字段' : 'Row field'}</div>
            <div className="text-right font-semibold" style={{ color: theme.foreground }}>{active.rowKey}</div>
            <div style={{ color: theme.muted }}>{locale === 'zh' ? '列字段' : 'Column field'}</div>
            <div className="text-right font-semibold" style={{ color: theme.foreground }}>{active.colKey}</div>
            <div style={{ color: theme.muted }}>{locale === 'zh' ? '相关系数' : 'Correlation'}</div>
            <div className="text-right font-semibold" style={{ color: theme.foreground }}>{toDisplay(Number(active.value.toFixed(3)))}</div>
          </div>
        ) : null
      }
    >
      <div className="grid h-full grid-cols-4 gap-3" onMouseLeave={() => setHoveredIndex(null)}>
        {flat.map((item, index) => {
          const selected = index === activeIndex;
          return (
            <div
              key={`${item.rowKey}-${item.colKey}`}
              className="chart-fade-up rounded-2xl border transition"
              style={{
                borderColor: selected ? hexToRgba(theme.foreground, 0.28) : hexToRgba(theme.foreground, 0.08),
                backgroundColor: correlationColor(item.value, theme.palette[1], theme.palette[4] ?? theme.palette[3]),
                minHeight: compact ? '36px' : '52px',
                transform: selected ? 'translateY(-2px)' : 'none',
              }}
              title={`${item.rowKey} / ${item.colKey}: ${item.value.toFixed(2)}`}
              onMouseEnter={() => setHoveredIndex(index)}
            />
          );
        })}
      </div>
    </ChartShell>
  );
}
