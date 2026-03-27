import { useEffect, useMemo, useState } from 'react';
import { themes, type PaletteFamily, type PaletteSource, type ThemePalette } from '@/themes/themes';

const familyOptions: Array<{ label: string; value: PaletteFamily | 'all' }> = [
  { label: '全部类型', value: 'all' },
  { label: '顺序', value: 'sequential' },
  { label: '发散', value: 'diverging' },
  { label: '定性', value: 'qualitative' },
];

const sourceOptions: Array<{ label: string; value: PaletteSource | 'all' }> = [
  { label: '全部来源', value: 'all' },
  { label: 'Scientific', value: 'scientific' },
  { label: 'Classic', value: 'classic' },
  { label: 'Custom', value: 'custom' },
];

type PaletteCardProps = {
  theme: ThemePalette;
  darkMode: boolean;
  onCopyJson: (theme: ThemePalette) => void;
};

function PaletteCard({ theme, darkMode, onCopyJson }: PaletteCardProps) {
  return (
    <article
      className={[
        'overflow-hidden rounded-[28px] border p-5 transition duration-200 hover:-translate-y-1',
        darkMode
          ? 'border-white/10 bg-white/[0.04] shadow-[0_20px_50px_rgba(0,0,0,0.28)]'
          : 'border-slate-200 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.08)]',
      ].join(' ')}
    >
      <div
        className="h-28 rounded-[22px]"
        style={{
          background: `linear-gradient(90deg, ${theme.palette.join(', ')})`,
        }}
      />

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className={darkMode ? 'text-2xl font-semibold text-white' : 'text-2xl font-semibold text-slate-900'}>{theme.name}</h3>
          <p className={darkMode ? 'mt-2 text-sm text-slate-400' : 'mt-2 text-sm text-slate-500'}>
            {theme.palette.length} 色 ·
            {theme.family === 'sequential' ? ' 顺序' : theme.family === 'diverging' ? ' 发散' : ' 定性'}
          </p>
        </div>
        {theme.colorSafe ? (
          <span
            className={[
              'inline-flex shrink-0 items-center rounded-full px-3 py-1 text-xs font-medium',
              darkMode ? 'bg-white/8 text-white' : 'bg-slate-100 text-slate-700',
            ].join(' ')}
          >
            ✓ 色盲安全
          </span>
        ) : null}
      </div>

      <div className="mt-4 flex gap-1 overflow-hidden rounded-2xl">
        {theme.palette.map((color) => (
          <span key={color} className="h-10 flex-1" style={{ backgroundColor: color }} />
        ))}
      </div>

      <p className={darkMode ? 'mt-4 min-h-[48px] text-sm leading-6 text-slate-300' : 'mt-4 min-h-[48px] text-sm leading-6 text-slate-600'}>
        {theme.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {theme.tags.map((tag) => (
          <span
            key={tag}
            className={[
              'rounded-full border px-3 py-1 text-xs',
              darkMode ? 'border-white/10 bg-white/[0.03] text-slate-200' : 'border-slate-200 bg-slate-50 text-slate-700',
            ].join(' ')}
          >
            {tag}
          </span>
        ))}
      </div>

      <div className={darkMode ? 'mt-5 border-t border-white/10 pt-4 text-sm text-slate-400' : 'mt-5 border-t border-slate-200 pt-4 text-sm text-slate-500'}>
        推荐场景：{theme.recommended}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => onCopyJson(theme)}
          className={[
            'rounded-2xl px-4 py-3 text-sm font-semibold transition',
            darkMode ? 'bg-white/6 text-white hover:bg-white/10' : 'bg-slate-100 text-slate-800 hover:bg-slate-200',
          ].join(' ')}
        >
          复制 JSON
        </button>
        <button
          type="button"
          className={[
            'rounded-2xl px-4 py-3 text-sm font-semibold transition',
            darkMode ? 'bg-white text-slate-900 hover:bg-slate-100' : 'bg-slate-900 text-white hover:bg-slate-800',
          ].join(' ')}
        >
          查看详情
        </button>
      </div>
    </article>
  );
}

function ThemeModeToggle({ darkMode, onToggle }: { darkMode: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={[
        'inline-flex items-center gap-3 rounded-full border px-4 py-2 text-sm font-semibold transition',
        darkMode ? 'border-white/10 bg-white/[0.04] text-white hover:bg-white/[0.08]' : 'border-slate-200 bg-white text-slate-800 hover:bg-slate-50',
      ].join(' ')}
      aria-label="切换浅色和深色模式"
    >
      <span>{darkMode ? '夜间' : '白天'}</span>
      <span className={['relative h-6 w-11 rounded-full transition', darkMode ? 'bg-blue-500/70' : 'bg-slate-200'].join(' ')}>
        <span
          className={[
            'absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition',
            darkMode ? 'left-[22px]' : 'left-0.5',
          ].join(' ')}
        />
      </span>
    </button>
  );
}

type Props = {
  records?: unknown[];
  xKey?: string;
  yKey?: string;
  numericKeys?: string[];
};

export function ThemeShowcaseSection(_: Props) {
  const [query, setQuery] = useState('');
  const [family, setFamily] = useState<PaletteFamily | 'all'>('all');
  const [source, setSource] = useState<PaletteSource | 'all'>('all');
  const [onlyColorSafe, setOnlyColorSafe] = useState(false);
  const [maxColors, setMaxColors] = useState(12);
  const [darkMode, setDarkMode] = useState(true);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    setDarkMode(media.matches);
  }, []);

  const filteredThemes = useMemo(() => {
    return themes.filter((theme) => {
      const matchesQuery =
        !query ||
        `${theme.name} ${theme.description} ${theme.tags.join(' ')} ${theme.recommended}`.toLowerCase().includes(query.toLowerCase());
      const matchesFamily = family === 'all' || theme.family === family;
      const matchesSource = source === 'all' || theme.source === source;
      const matchesColorSafe = !onlyColorSafe || theme.colorSafe;
      const matchesColorCount = theme.palette.length <= maxColors;
      return matchesQuery && matchesFamily && matchesSource && matchesColorSafe && matchesColorCount;
    });
  }, [query, family, source, onlyColorSafe, maxColors]);

  const handleCopyJson = async (theme: ThemePalette) => {
    const payload = JSON.stringify(theme, null, 2);
    try {
      await navigator.clipboard.writeText(payload);
      setNotice(`已复制 ${theme.name} 的 JSON 配置`);
      window.setTimeout(() => setNotice(''), 1800);
    } catch {
      setNotice('复制失败，请在支持剪贴板的浏览器中重试');
      window.setTimeout(() => setNotice(''), 1800);
    }
  };

  return (
    <section
      id="themes"
      className={[
        'section-shell pt-24 transition-colors duration-300',
        darkMode ? 'bg-[#020814]' : 'bg-[#f7f9fc]',
      ].join(' ')}
    >
      <div className="mx-auto max-w-[1680px]">
        <div className={darkMode ? 'border-b border-white/10 pb-12' : 'border-b border-slate-200 pb-12'}>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <span className={darkMode ? 'inline-flex rounded-full border border-white/10 bg-white/[0.04] px-4 py-1 text-xs uppercase tracking-[0.22em] text-slate-300' : 'inline-flex rounded-full border border-slate-200 bg-white px-4 py-1 text-xs uppercase tracking-[0.22em] text-slate-500'}>
                Palette Library
              </span>
              <h2 className={darkMode ? 'mt-5 text-5xl font-semibold tracking-tight text-white sm:text-6xl' : 'mt-5 text-5xl font-semibold tracking-tight text-slate-900 sm:text-6xl'}>
                配色方案库
              </h2>
              <p className={darkMode ? 'mt-5 max-w-3xl text-xl leading-9 text-slate-300' : 'mt-5 max-w-3xl text-xl leading-9 text-slate-600'}>
                布局参考配色库界面重做，支持浅色与深色模式。左侧筛选，右侧卡片预览，适合在白天与夜间展示科研配色方案。
              </p>
            </div>
            <div className="flex flex-col items-start gap-4 lg:items-end">
              <ThemeModeToggle darkMode={darkMode} onToggle={() => setDarkMode((value) => !value)} />
              {notice ? <p className={darkMode ? 'text-sm text-slate-300' : 'text-sm text-slate-600'}>{notice}</p> : null}
            </div>
          </div>
        </div>

        <div className="grid gap-8 py-10 lg:grid-cols-[300px_minmax(0,1fr)] xl:grid-cols-[320px_minmax(0,1fr)]">
          <aside
            className={[
              'h-fit rounded-[28px] border p-6',
              darkMode ? 'border-white/10 bg-white/[0.03] text-white' : 'border-slate-200 bg-white text-slate-900',
            ].join(' ')}
          >
            <div className={['flex items-center gap-3 rounded-2xl border px-4 py-3', darkMode ? 'border-white/10 bg-[#06111f]' : 'border-slate-200 bg-slate-50'].join(' ')}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className={darkMode ? 'text-slate-400' : 'text-slate-500'}>
                <path d="M21 21L16.65 16.65M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="搜索配色方案..."
                className={[
                  'w-full border-none bg-transparent text-sm outline-none placeholder:text-inherit',
                  darkMode ? 'text-white placeholder:text-slate-500' : 'text-slate-900 placeholder:text-slate-400',
                ].join(' ')}
              />
            </div>

            <p className={darkMode ? 'mt-5 text-sm text-slate-400' : 'mt-5 text-sm text-slate-500'}>显示 {filteredThemes.length} / {themes.length} 个配色方案</p>

            <div className={['mt-6 rounded-[24px] border p-6', darkMode ? 'border-white/10 bg-black/20' : 'border-slate-200 bg-slate-50'].join(' ')}>
              <h3 className={darkMode ? 'text-3xl font-semibold text-white' : 'text-3xl font-semibold text-slate-900'}>筛选条件</h3>

              <div className="mt-8 space-y-7">
                <label className="block">
                  <span className={darkMode ? 'mb-3 block text-sm font-medium text-slate-300' : 'mb-3 block text-sm font-medium text-slate-600'}>配色类型</span>
                  <select
                    value={family}
                    onChange={(event) => setFamily(event.target.value as PaletteFamily | 'all')}
                    className={[
                      'w-full rounded-2xl border px-4 py-3 text-sm outline-none',
                      darkMode ? 'border-white/10 bg-[#071120] text-white' : 'border-slate-200 bg-white text-slate-900',
                    ].join(' ')}
                  >
                    {familyOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className={darkMode ? 'mb-3 block text-sm font-medium text-slate-300' : 'mb-3 block text-sm font-medium text-slate-600'}>配色来源</span>
                  <select
                    value={source}
                    onChange={(event) => setSource(event.target.value as PaletteSource | 'all')}
                    className={[
                      'w-full rounded-2xl border px-4 py-3 text-sm outline-none',
                      darkMode ? 'border-white/10 bg-[#071120] text-white' : 'border-slate-200 bg-white text-slate-900',
                    ].join(' ')}
                  >
                    {sourceOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>

                <div>
                  <div className="flex items-center justify-between gap-4">
                    <span className={darkMode ? 'text-sm font-medium text-slate-300' : 'text-sm font-medium text-slate-600'}>仅显示色盲安全</span>
                    <button
                      type="button"
                      onClick={() => setOnlyColorSafe((value) => !value)}
                      className={[
                        'relative h-8 w-14 rounded-full transition',
                        onlyColorSafe ? 'bg-blue-500' : darkMode ? 'bg-white/10' : 'bg-slate-200',
                      ].join(' ')}
                    >
                      <span
                        className={[
                          'absolute top-1 h-6 w-6 rounded-full bg-white shadow transition',
                          onlyColorSafe ? 'left-7' : 'left-1',
                        ].join(' ')}
                      />
                    </button>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between gap-4">
                    <span className={darkMode ? 'text-sm font-medium text-slate-300' : 'text-sm font-medium text-slate-600'}>颜色数量</span>
                    <span className={darkMode ? 'text-sm text-slate-400' : 'text-sm text-slate-500'}>1 - {maxColors}</span>
                  </div>
                  <input
                    type="range"
                    min={3}
                    max={12}
                    value={maxColors}
                    onChange={(event) => setMaxColors(Number(event.target.value))}
                    className="mt-4 w-full accent-blue-500"
                  />
                </div>
              </div>
            </div>
          </aside>

          <div className="grid gap-6 md:grid-cols-2 2xl:grid-cols-3">
            {filteredThemes.map((theme) => (
              <PaletteCard key={theme.id} theme={theme} darkMode={darkMode} onCopyJson={handleCopyJson} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
