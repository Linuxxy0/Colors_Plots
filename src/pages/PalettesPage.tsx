import { useMemo, useState } from 'react';
import { PageIntro } from '@/components/common/PageIntro';
import { PaletteCard } from '@/components/palettes/PaletteCard';
import { PaletteDetailPanel } from '@/components/palettes/PaletteDetailPanel';
import { useAppState } from '@/context/AppStateContext';
import { getThemeById, themes, type ThemeCategory } from '@/themes/themes';

export function PalettesPage() {
  const { locale, dataset, meta, xKey, yKey, themeId, setThemeId } = useAppState();
  const [category, setCategory] = useState<ThemeCategory | 'all'>('all');
  const categoryOptions: Array<{ label: string; value: ThemeCategory | 'all' }> = locale === 'zh'
    ? [
        { label: '全部', value: 'all' },
        { label: '论文风', value: 'paper' },
        { label: '极简风', value: 'minimal' },
        { label: '深色风', value: 'dark' },
      ]
    : [
        { label: 'All', value: 'all' },
        { label: 'Paper', value: 'paper' },
        { label: 'Minimal', value: 'minimal' },
        { label: 'Dark', value: 'dark' },
      ];
  const filteredThemes = useMemo(() => themes.filter((theme) => category === 'all' || theme.category === category), [category]);
  const activeTheme = getThemeById(themeId);

  return (
    <div className="space-y-6">
      <PageIntro
        eyebrow={locale === 'zh' ? '配色库' : 'Palette library'}
        title={locale === 'zh' ? '真正的科研配色页' : 'A real scientific palette library'}
        description={locale === 'zh' ? '这里不再只是展示几张宣传卡片，而是让你可以按风格筛选、查看色板、用图表迷你预览进行比较，并把某套主题设为全局主题。' : 'This is no longer a promo strip. Filter by style, inspect palettes, compare with chart previews, and set a theme globally.'}
      />

      <section className="rounded-[28px] border border-slate-200/80 bg-white/88 p-6 shadow-soft">
        <div className="flex flex-wrap gap-3">
          {categoryOptions.map((item) => (
            <button
              key={item.value}
              onClick={() => setCategory(item.value)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${category === item.value ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </section>

      <section className="grid gap-6 2xl:grid-cols-[1.4fr_0.6fr]">
        <div className="grid gap-4 xl:grid-cols-2 2xl:grid-cols-2">
          {filteredThemes.map((palette) => (
            <PaletteCard key={palette.id} theme={palette} selected={palette.id === themeId} onSelect={setThemeId} dataset={dataset} meta={meta} xKey={xKey} yKey={yKey} />
          ))}
        </div>
        <div className="2xl:sticky 2xl:top-28 2xl:self-start">
          <PaletteDetailPanel theme={activeTheme} />
        </div>
      </section>
    </div>
  );
}
