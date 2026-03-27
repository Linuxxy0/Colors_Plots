import { getChartById } from '@/data/chartCatalog';
import { getChartPreviewInput } from '@/data/chartPreviewData';
import { useAppState } from '@/context/AppStateContext';
import type { DatasetMeta, DatasetState } from '@/types/dataset';
import type { ThemePalette } from '@/themes/themes';
import { hexToRgba } from '@/utils/colors';
import { chartCopy, t, tl, uiText } from '@/i18n';

type ChartDetailPanelProps = {
  chartId: string;
  onClose: () => void;
  dataset: DatasetState;
  meta: DatasetMeta;
  xKey: string;
  yKey: string;
  theme: ThemePalette;
};

export function ChartDetailPanel({ chartId, onClose, dataset, meta, xKey, yKey, theme }: ChartDetailPanelProps) {
  const { locale } = useAppState();
  const chart = getChartById(chartId);
  const content = chartCopy[chart.id];
  const ChartComponent = chart.component;
  const preview = getChartPreviewInput(chart.id, dataset, meta, xKey, yKey);

  return (
    <aside className="rounded-[28px] border p-6 shadow-soft" style={{ backgroundColor: theme.panel, borderColor: hexToRgba(theme.foreground, 0.12) }}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.22em]" style={{ color: theme.muted }}>{t(locale, uiText.chartDetail)}</div>
          <h2 className="mt-2 text-2xl font-semibold" style={{ color: theme.foreground }}>{t(locale, content.name)}</h2>
        </div>
        <button className="button-secondary" onClick={onClose}>{t(locale, uiText.close)}</button>
      </div>

      <p className="mt-4 text-sm leading-6" style={{ color: theme.muted }}>{t(locale, content.description)}</p>

      <div className="mt-4 rounded-2xl border px-4 py-3 text-sm" style={{ borderColor: hexToRgba(theme.foreground, 0.08), backgroundColor: hexToRgba(theme.foreground, 0.03), color: theme.muted }}>
        {t(locale, uiText.sampleSourceNote)} {t(locale, uiText.hoverTip)}
      </div>

      <div className="mt-6 h-[420px]">
        <ChartComponent records={preview.records} xKey={preview.xKey} yKey={preview.yKey} numericKeys={preview.meta.numericKeys} theme={theme} title={t(locale, content.title ?? content.name)} />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border p-4" style={{ borderColor: hexToRgba(theme.foreground, 0.08), backgroundColor: hexToRgba(theme.foreground, 0.03) }}>
          <div className="text-xs uppercase tracking-[0.22em]" style={{ color: theme.muted }}>{t(locale, uiText.bestFor)}</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {tl(locale, content.recommendedFor).map((item) => (
              <span key={item} className="rounded-full px-3 py-1 text-xs" style={{ backgroundColor: theme.panel, color: theme.muted }}>
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border p-4" style={{ borderColor: hexToRgba(theme.foreground, 0.08), backgroundColor: hexToRgba(theme.foreground, 0.03) }}>
          <div className="text-xs uppercase tracking-[0.22em]" style={{ color: theme.muted }}>{t(locale, uiText.fieldRequirement)}</div>
          <div className="mt-3 text-sm font-medium" style={{ color: theme.foreground }}>{t(locale, content.supportedFields)}</div>
          <div className="mt-4 text-xs" style={{ color: theme.muted }}>{t(locale, uiText.currentPreviewUses)}: {preview.xKey} / {preview.yKey}</div>
        </div>
      </div>
    </aside>
  );
}
