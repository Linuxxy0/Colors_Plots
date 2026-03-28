import { useMemo, useState } from 'react';
import { themes, type ThemePalette } from '@/themes/themes';

function ThemeCard({ theme, active, onSelect }: { theme: ThemePalette; active: boolean; onSelect: () => void }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={[
        'w-full rounded-[28px] border p-5 text-left transition hover:-translate-y-0.5',
        active ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-white text-slate-900',
      ].join(' ')}
    >
      <div className="flex gap-2 overflow-hidden rounded-2xl">
        {theme.palette.map((color) => (
          <span key={color} className="h-12 flex-1" style={{ backgroundColor: color }} />
        ))}
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold">{theme.name.zh}</h3>
          <p className={['mt-2 text-sm leading-6', active ? 'text-slate-200' : 'text-slate-500'].join(' ')}>{theme.description.zh}</p>
        </div>
        <span className={['rounded-full px-3 py-1 text-xs font-medium', active ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-600'].join(' ')}>
          {theme.palette.length} colors
        </span>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {theme.tags.map((tag) => (
          <span key={tag.en} className={['rounded-full px-3 py-1 text-xs', active ? 'bg-white/10 text-slate-100' : 'bg-slate-100 text-slate-600'].join(' ')}>
            {tag.zh}
          </span>
        ))}
      </div>
    </button>
  );
}

export function ThemeShowcaseSection() {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(themes[0]?.id ?? '');

  const filteredThemes = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    if (!keyword) return themes;
    return themes.filter((theme) => {
      const haystack = [
        theme.name.zh,
        theme.name.en,
        theme.description.zh,
        theme.description.en,
        theme.usage.zh,
        theme.usage.en,
        ...theme.tags.flatMap((tag) => [tag.zh, tag.en]),
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(keyword);
    });
  }, [query]);

  const selectedTheme = filteredThemes.find((theme) => theme.id === selectedId) ?? filteredThemes[0] ?? themes[0];

  return (
    <section id="themes" className="section-shell pt-24">
      <div className="section-inner">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-slate-400">Palette Library</div>
            <h2 className="mt-2 text-4xl font-semibold text-slate-900">科研配色方案库</h2>
            <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">浏览主题配色，并查看它们在科研项目界面中的真实层级表现。</p>
          </div>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="搜索配色方案..."
            className="h-12 w-full max-w-xs rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none placeholder:text-slate-400"
          />
        </div>

        <div className="mt-10 grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
          <aside className="space-y-4">
            {filteredThemes.map((theme) => (
              <ThemeCard key={theme.id} theme={theme} active={theme.id === selectedTheme?.id} onSelect={() => setSelectedId(theme.id)} />
            ))}
          </aside>

          {selectedTheme ? (
            <article className="rounded-[32px] border border-slate-200 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.05)]" style={{ backgroundColor: selectedTheme.background }}>
              <div className="rounded-[28px] p-6" style={{ backgroundColor: selectedTheme.panel }}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm" style={{ color: selectedTheme.muted }}>Selected Theme</div>
                    <h3 className="mt-2 text-3xl font-semibold" style={{ color: selectedTheme.foreground }}>{selectedTheme.name.zh}</h3>
                    <p className="mt-3 max-w-2xl text-base leading-7" style={{ color: selectedTheme.muted }}>{selectedTheme.description.zh}</p>
                  </div>
                  <span className="rounded-full px-4 py-2 text-sm font-medium" style={{ backgroundColor: selectedTheme.accent, color: selectedTheme.panel }}>
                    {selectedTheme.usage.zh}
                  </span>
                </div>

                <div className="mt-8 grid gap-4 md:grid-cols-2">
                  <div className="rounded-[24px] p-5" style={{ backgroundColor: selectedTheme.background }}>
                    <div className="text-sm" style={{ color: selectedTheme.muted }}>Foreground</div>
                    <div className="mt-2 text-2xl font-semibold" style={{ color: selectedTheme.foreground }}>Aa Bb Cc</div>
                    <div className="mt-4 rounded-2xl px-4 py-3 text-sm" style={{ backgroundColor: selectedTheme.accent, color: selectedTheme.panel }}>Accent action</div>
                  </div>
                  <div className="rounded-[24px] p-5" style={{ backgroundColor: selectedTheme.background }}>
                    <div className="text-sm" style={{ color: selectedTheme.muted }}>Palette</div>
                    <div className="mt-4 flex overflow-hidden rounded-2xl">
                      {selectedTheme.palette.map((color) => (
                        <span key={color} className="h-16 flex-1" style={{ backgroundColor: color }} />
                      ))}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {selectedTheme.tags.map((tag) => (
                        <span key={tag.en} className="rounded-full px-3 py-1 text-xs" style={{ backgroundColor: selectedTheme.panel, color: selectedTheme.muted }}>
                          {tag.en}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ) : null}
        </div>
      </div>
    </section>
  );
}
