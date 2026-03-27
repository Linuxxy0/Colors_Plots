import type { ThemePalette } from '@/types/app';
import { useAppContext } from '@/context/AppContext';
import { t } from '@/utils/i18n';

type Props = {
  palette: ThemePalette;
  active: boolean;
  onSelect: () => void;
};

export function PaletteCard({ palette, active, onSelect }: Props) {
  const { language } = useAppContext();
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full rounded-[26px] border p-5 text-left transition hover:-translate-y-0.5 ${active ? 'shadow-[0_24px_70px_rgba(15,23,42,0.08)]' : ''}`}
      style={{ backgroundColor: palette.panel, borderColor: active ? palette.foreground : `${palette.muted}33` }}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-lg font-semibold" style={{ color: palette.foreground }}>{t(palette.name, language)}</div>
          <div className="mt-2 text-sm leading-6" style={{ color: palette.muted }}>{t(palette.description, language)}</div>
        </div>
        <div className="rounded-full border px-3 py-1 text-xs font-medium" style={{ borderColor: `${palette.muted}33`, color: palette.muted }}>{t(palette.usage, language)}</div>
      </div>
      <div className="mt-5 flex gap-2">
        {palette.palette.map((color) => (
          <div key={color} className="h-12 flex-1 rounded-2xl" style={{ backgroundColor: color }} />
        ))}
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {palette.tags.map((tag) => (
          <span key={tag.en} className="rounded-full border px-3 py-1 text-xs" style={{ borderColor: `${palette.muted}25`, color: palette.muted }}>
            {t(tag, language)}
          </span>
        ))}
      </div>
    </button>
  );
}
