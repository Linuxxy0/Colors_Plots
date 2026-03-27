import { useMemo, useState } from 'react';
import { PaletteCard } from '@/components/palettes/PaletteCard';
import { PalettePreviewPanel } from '@/components/palettes/PalettePreviewPanel';
import { useAppContext } from '@/context/AppContext';
import { themes } from '@/themes/themes';
import { t } from '@/utils/i18n';

export function PalettesPage() {
  const { language, themeId, setThemeId } = useAppContext();
  const [filter, setFilter] = useState<'all' | 'paper' | 'minimal' | 'dark'>('all');
  const filteredThemes = useMemo(() => {
    if (filter === 'all') return themes;
    return themes.filter((theme) => theme.tags.some((tag) => {
      const value = t(tag, 'en').toLowerCase();
      return (filter === 'paper' && value.includes('paper')) || (filter === 'minimal' && value.includes('minimal')) || (filter === 'dark' && value.includes('dark'));
    }));
  }, [filter]);
  const currentTheme = themes.find((theme) => theme.id === themeId) ?? themes[0];

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
          <h1 className="mt-2 text-4xl font-semibold text-slate-900">{language === 'zh' ? '真实主题预览，而不是动态图表' : 'Real theme preview, not chart animation'}</h1>
          <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">{language === 'zh' ? '左侧浏览主题，右侧查看主题在科研界面中的真实层级表现。' : 'Browse themes on the left and inspect real UI hierarchy on the right.'}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {filterItems.map(([value, label]) => (
            <button key={value} type="button" onClick={() => setFilter(value)} className={`rounded-full px-4 py-2 text-sm font-medium ${filter === value ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border border-slate-200'}`}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.82fr_1.18fr]">
        <aside className="space-y-4">
          {filteredThemes.map((palette) => (
            <PaletteCard key={palette.id} palette={palette} active={palette.id === themeId} onSelect={() => setThemeId(palette.id)} />
          ))}
        </aside>
        <PalettePreviewPanel theme={currentTheme} />
      </div>
    </div>
  );
}
