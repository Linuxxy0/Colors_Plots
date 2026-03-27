import { getChartById } from '@/data/chartCatalog';
import type { ThemePalette } from '@/themes/themes';
import type { DatasetRecord } from '@/types/dataset';
import { hexToRgba } from '@/utils/colors';

type ChartDetailPanelProps = {
  chartId: string;
  onClose: () => void;
  records: DatasetRecord[];
  xKey: string;
  yKey: string;
  numericKeys: string[];
  theme: ThemePalette;
};

export function ChartDetailPanel({ chartId, onClose, records, xKey, yKey, numericKeys, theme }: ChartDetailPanelProps) {
  const chart = getChartById(chartId);
  const ChartComponent = chart.component;

  return (
    <aside className="rounded-[28px] border p-6 shadow-soft" style={{ backgroundColor: theme.panel, borderColor: hexToRgba(theme.foreground, 0.12) }}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.22em]" style={{ color: theme.muted }}>Chart detail</div>
          <h2 className="mt-2 text-2xl font-semibold" style={{ color: theme.foreground }}>{chart.name}</h2>
        </div>
        <button className="button-secondary" onClick={onClose}>Close</button>
      </div>

      <p className="mt-4 text-sm leading-6" style={{ color: theme.muted }}>{chart.shortDescription}</p>

      <div className="mt-6 h-[320px]">
        <ChartComponent records={records} xKey={xKey} yKey={yKey} numericKeys={numericKeys} theme={theme} title={chart.name} />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border p-4" style={{ borderColor: hexToRgba(theme.foreground, 0.08), backgroundColor: hexToRgba(theme.foreground, 0.03) }}>
          <div className="text-xs uppercase tracking-[0.22em]" style={{ color: theme.muted }}>Best for</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {chart.recommendedFor.map((item) => (
              <span key={item} className="rounded-full px-3 py-1 text-xs" style={{ backgroundColor: theme.panel, color: theme.muted }}>
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border p-4" style={{ borderColor: hexToRgba(theme.foreground, 0.08), backgroundColor: hexToRgba(theme.foreground, 0.03) }}>
          <div className="text-xs uppercase tracking-[0.22em]" style={{ color: theme.muted }}>Field requirement</div>
          <div className="mt-3 text-sm font-medium" style={{ color: theme.foreground }}>{chart.supportedFields}</div>
          <div className="mt-4 text-xs" style={{ color: theme.muted }}>Current preview uses: {xKey} / {yKey}</div>
        </div>
      </div>
    </aside>
  );
}
