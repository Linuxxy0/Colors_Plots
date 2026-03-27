import { BarChartCard, LineChartCard } from '@/components/charts';
import type { ThemePalette } from '@/themes/themes';
import type { DatasetRecord } from '@/types/dataset';
import { hexToRgba } from '@/utils/colors';

type PaletteCardProps = {
  theme: ThemePalette;
  selected: boolean;
  onSelect: (themeId: string) => void;
  records: DatasetRecord[];
  xKey: string;
  yKey: string;
  numericKeys: string[];
};

export function PaletteCard({ theme, selected, onSelect, records, xKey, yKey, numericKeys }: PaletteCardProps) {
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
          <h3 className="text-xl font-semibold" style={{ color: theme.foreground }}>{theme.name}</h3>
          <p className="mt-2 text-sm leading-6" style={{ color: theme.muted }}>{theme.description}</p>
        </div>
        <span
          className="rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]"
          style={{ borderColor: hexToRgba(theme.foreground, 0.16), color: theme.muted }}
        >
          {theme.category}
        </span>
      </div>

      <div className="mt-5 flex gap-2">
        {theme.palette.map((color) => (
          <div key={color} className="h-10 flex-1 rounded-2xl border border-white/50" style={{ backgroundColor: color }} />
        ))}
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-2">
        <LineChartCard compact records={records} xKey={xKey} yKey={yKey} numericKeys={numericKeys} theme={theme} title="Line Preview" />
        <BarChartCard compact records={records} xKey={xKey} yKey={yKey} numericKeys={numericKeys} theme={theme} title="Bar Preview" />
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {theme.recommendedFor.map((item) => (
          <span key={item} className="rounded-full px-3 py-1 text-xs" style={{ backgroundColor: hexToRgba(theme.foreground, 0.05), color: theme.muted }}>
            {item}
          </span>
        ))}
      </div>

      <div className="mt-6 flex gap-3">
        <button className="button-primary" onClick={() => onSelect(theme.id)}>
          {selected ? '当前主题' : '设为全局主题'}
        </button>
        <button className="button-secondary" onClick={() => onSelect(theme.id)}>
          Preview
        </button>
      </div>
    </article>
  );
}
