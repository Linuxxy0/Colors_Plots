import { BarChartCard, LineChartCard } from '@/components/charts';
import type { ThemePalette } from '@/themes/themes';
import type { DatasetMeta, DatasetState } from '@/types/dataset';
import { hexToRgba } from '@/utils/colors';
import { useAppState } from '@/context/AppStateContext';
import { t, themeCopy, uiText, chartCopy } from '@/i18n';
import { getChartPreviewInput } from '@/data/chartPreviewData';

type PaletteCardProps = {
  theme: ThemePalette;
  selected: boolean;
  onSelect: (themeId: string) => void;
  dataset: DatasetState;
  meta: DatasetMeta;
  xKey: string;
  yKey: string;
};

export function PaletteCard({ theme, selected, onSelect, dataset, meta, xKey, yKey }: PaletteCardProps) {
  const { locale } = useAppState();
  const themeText = themeCopy[theme.id];
  const linePreview = getChartPreviewInput('line', dataset, meta, xKey, yKey);
  const barPreview = getChartPreviewInput('bar', dataset, meta, xKey, yKey);

  return (
    <article
      className="rounded-[28px] border p-5 transition"
      style={{
        backgroundColor: theme.panel,
        borderColor: selected ? theme.accent : hexToRgba(theme.foreground, 0.12),
        boxShadow: `0 18px 40px ${hexToRgba(theme.foreground, selected ? 0.12 : 0.06)}`,
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold" style={{ color: theme.foreground }}>{t(locale, themeText.name)}</h3>
          <p className="mt-2 text-sm leading-6" style={{ color: theme.muted }}>{t(locale, themeText.description)}</p>
        </div>
        <span
          className="rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]"
          style={{ borderColor: hexToRgba(theme.foreground, 0.16), color: theme.muted }}
        >
          {t(locale, themeText.category)}
        </span>
      </div>

      <div className="mt-5 flex gap-2">
        {theme.palette.map((color) => (
          <div key={color} className="h-10 flex-1 rounded-2xl border border-white/50" style={{ backgroundColor: color }} />
        ))}
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-2">
        <LineChartCard compact records={linePreview.records} xKey={linePreview.xKey} yKey={linePreview.yKey} numericKeys={linePreview.meta.numericKeys} theme={theme} title={t(locale, chartCopy.line.name)} />
        <BarChartCard compact records={barPreview.records} xKey={barPreview.xKey} yKey={barPreview.yKey} numericKeys={barPreview.meta.numericKeys} theme={theme} title={t(locale, chartCopy.bar.name)} />
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {themeText.recommendedFor[locale].map((item) => (
          <span key={item} className="rounded-full px-3 py-1 text-xs" style={{ backgroundColor: hexToRgba(theme.foreground, 0.05), color: theme.muted }}>
            {item}
          </span>
        ))}
      </div>

      <div className="mt-6 flex gap-3">
        <button className="button-primary" onClick={() => onSelect(theme.id)}>
          {selected ? t(locale, uiText.activeThemeButton) : t(locale, uiText.setGlobalTheme)}
        </button>
        <button className="button-secondary" onClick={() => onSelect(theme.id)}>
          {t(locale, uiText.preview)}
        </button>
      </div>
    </article>
  );
}
