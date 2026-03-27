import type { ChartDefinition } from '@/data/chartCatalog';
import type { ThemePalette } from '@/themes/themes';
import type { DatasetRecord } from '@/types/dataset';
import { hexToRgba } from '@/utils/colors';

type ChartCatalogCardProps = {
  chart: ChartDefinition;
  records: DatasetRecord[];
  xKey: string;
  yKey: string;
  numericKeys: string[];
  theme: ThemePalette;
  onOpen: (chartId: string) => void;
};

export function ChartCatalogCard({ chart, records, xKey, yKey, numericKeys, theme, onOpen }: ChartCatalogCardProps) {
  const ChartComponent = chart.component;

  return (
    <article
      className="rounded-[28px] border p-5 transition hover:-translate-y-0.5"
      style={{ backgroundColor: theme.panel, borderColor: hexToRgba(theme.foreground, 0.12), boxShadow: `0 18px 40px ${hexToRgba(theme.foreground, 0.06)}` }}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-semibold" style={{ color: theme.foreground }}>{chart.name}</h3>
          <p className="mt-2 text-sm leading-6" style={{ color: theme.muted }}>{chart.shortDescription}</p>
        </div>
        <span className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ backgroundColor: hexToRgba(theme.foreground, 0.05), color: theme.muted }}>
          {chart.category}
        </span>
      </div>

      <div className="mt-5 h-[250px]">
        <ChartComponent compact records={records} xKey={xKey} yKey={yKey} numericKeys={numericKeys} theme={theme} title={chart.name} />
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {chart.recommendedFor.map((item) => (
          <span key={item} className="rounded-full px-3 py-1 text-xs" style={{ backgroundColor: hexToRgba(theme.foreground, 0.05), color: theme.muted }}>
            {item}
          </span>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between gap-3">
        <div className="text-xs uppercase tracking-[0.2em]" style={{ color: theme.muted }}>{chart.supportedFields}</div>
        <button className="button-primary" onClick={() => onOpen(chart.id)}>
          Open detail
        </button>
      </div>
    </article>
  );
}
