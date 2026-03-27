import type { ChartDefinition } from '@/data/chartCatalog';
import type { ThemePalette } from '@/themes/themes';
import type { DatasetMeta, DatasetState } from '@/types/dataset';
import { hexToRgba } from '@/utils/colors';
import { useAppState } from '@/context/AppStateContext';
import { chartCopy, t, tl, uiText } from '@/i18n';
import { getChartPreviewInput } from '@/data/chartPreviewData';

type ChartCatalogCardProps = {
  chart: ChartDefinition;
  dataset: DatasetState;
  meta: DatasetMeta;
  xKey: string;
  yKey: string;
  theme: ThemePalette;
  onOpen: (chartId: string) => void;
};

export function ChartCatalogCard({ chart, dataset, meta, xKey, yKey, theme, onOpen }: ChartCatalogCardProps) {
  const { locale } = useAppState();
  const ChartComponent = chart.component;
  const preview = getChartPreviewInput(chart.id, dataset, meta, xKey, yKey);
  const content = chartCopy[chart.id];

  return (
    <article
      className="rounded-[28px] border p-5 transition hover:-translate-y-0.5"
      style={{ backgroundColor: theme.panel, borderColor: hexToRgba(theme.foreground, 0.12), boxShadow: `0 18px 40px ${hexToRgba(theme.foreground, 0.06)}` }}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-semibold" style={{ color: theme.foreground }}>{t(locale, content.name)}</h3>
          <p className="mt-2 text-sm leading-6" style={{ color: theme.muted }}>{t(locale, content.description)}</p>
        </div>
        <span className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ backgroundColor: hexToRgba(theme.foreground, 0.05), color: theme.muted }}>
          {t(locale, content.category)}
        </span>
      </div>

      <div className="mt-5 h-[320px]">
        <ChartComponent compact records={preview.records} xKey={preview.xKey} yKey={preview.yKey} numericKeys={preview.meta.numericKeys} theme={theme} title={t(locale, content.title ?? content.name)} />
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {tl(locale, content.recommendedFor).map((item) => (
          <span key={item} className="rounded-full px-3 py-1 text-xs" style={{ backgroundColor: hexToRgba(theme.foreground, 0.05), color: theme.muted }}>
            {item}
          </span>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between gap-3">
        <div className="text-xs uppercase tracking-[0.2em]" style={{ color: theme.muted }}>{t(locale, content.supportedFields)}</div>
        <button className="button-primary" onClick={() => onOpen(chart.id)}>
          {t(locale, uiText.openDetail)}
        </button>
      </div>
    </article>
  );
}
