import { useMemo, useState } from 'react';
import { PalettePreviewPanel } from '@/components/palettes/PalettePreviewPanel';
import { useAppContext } from '@/context/AppContext';
import { themes } from '@/themes/themes';
import { t } from '@/utils/i18n';

export function PalettesPage() {
  const { language } = useAppContext();
  const [filter, setFilter] = useState<'all' | 'paper' | 'minimal' | 'dark'>('all');
  const [detailedThemeId, setDetailedThemeId] = useState<string | null>(null);

  const filteredThemes = useMemo(() => {
    if (filter === 'all') return themes;
    return themes.filter((theme) =>
      theme.tags.some((tag) => {
        const value = t(tag, 'en').toLowerCase();
        return (filter === 'paper' && value.includes('paper')) || (filter === 'minimal' && value.includes('minimal')) || (filter === 'dark' && value.includes('dark'));
      }),
    );
  }, [filter]);

  const filterItems = [
    ['all', language === 'zh' ? '全部' : 'All'],
    ['paper', language === 'zh' ? '论文风' : 'Paper'],
    ['minimal', language === 'zh' ? '极简' : 'Minimal'],
    ['dark', language === 'zh' ? '深色' : 'Dark'],
  ] as const;

  return (
    <div className="page-shell py-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-sm font-medium text-slate-500">{language === 'zh' ? '配色库' : 'Palette library'}</div>
          <h1 className="mt-2 text-4xl font-semibold text-slate-900">{language === 'zh' ? '发现最适合的科研配色' : 'Find the perfect palette for your research'}</h1>
          <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
            {language === 'zh' ? '点击查看配色在科研界面中的真实层级表现，而不仅仅是颜色条展示。' : 'Click to inspect how colors behave in a real research UI, not just color swatches.'}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {filterItems.map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setFilter(value)}
              className={`rounded-full px-4 py-2 text-sm font-medium ${filter === value ? 'bg-slate-900 text-white' : 'border border-slate-200 bg-white text-slate-600'}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredThemes.map((palette) => (
          <div
            key={palette.id}
            className="group cursor-pointer rounded-[26px] border transition hover:border-slate-300 hover:shadow-md"
            style={{ backgroundColor: palette.panel, borderColor: `${palette.muted}33` }}
            onClick={() => setDetailedThemeId(palette.id)}
          >
            <button
              type="button"
              className="w-full p-5 text-left transition hover:bg-black/5"
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
              <div className="mt-5">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDetailedThemeId(palette.id);
                  }}
                  className="w-full rounded-2xl px-4 py-2 font-semibold transition"
                  style={{ backgroundColor: palette.accent, color: palette.background }}
                >
                  {language === 'zh' ? '查看详情' : 'Details'}
                </button>
              </div>
            </button>
          </div>
        ))}
      </div>

      {detailedThemeId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto" onClick={() => setDetailedThemeId(null)}>
          <div 
            className="w-full max-w-6xl my-auto bg-white rounded-[36px] p-8 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const detailTheme = themes.find(t => t.id === detailedThemeId);
              if (!detailTheme) return null;
              return (
                <>
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="flex-1">
                      <div className="text-sm font-medium text-slate-500">{language === 'zh' ? '配色详情' : 'Palette details'}</div>
                      <h2 className="mt-2 text-4xl font-semibold text-slate-900">{t(detailTheme.name, language)}</h2>
                      <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">{t(detailTheme.description, language)}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setDetailedThemeId(null)}
                      className="text-slate-400 hover:text-slate-600 transition text-2xl flex-shrink-0"
                    >
                      ✕
                    </button>
                  </div>
                  <PalettePreviewPanel theme={detailTheme} />
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
