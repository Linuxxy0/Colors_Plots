import { useMemo, useState } from 'react';
import { PageIntro } from '@/components/common/PageIntro';
import { PaletteCard } from '@/components/palettes/PaletteCard';
import { PaletteDetailPanel } from '@/components/palettes/PaletteDetailPanel';
import { useAppState } from '@/context/AppStateContext';
import { getThemeById, themes, type ThemeCategory } from '@/themes/themes';

const categoryOptions: Array<{ label: string; value: ThemeCategory | 'all' }> = [
  { label: 'All', value: 'all' },
  { label: 'Paper', value: 'paper' },
  { label: 'Minimal', value: 'minimal' },
  { label: 'Dark', value: 'dark' },
];

export function PalettesPage() {
  const { dataset, meta, xKey, yKey, themeId, setThemeId } = useAppState();
  const [category, setCategory] = useState<ThemeCategory | 'all'>('all');
  const filteredThemes = useMemo(
    () => themes.filter((theme) => category === 'all' || theme.category === category),
    [category],
  );
  const activeTheme = getThemeById(themeId);

  return (
    <div className="space-y-6">
      <PageIntro
        eyebrow="Palette Library"
        title="真正的科研配色页"
        description="这里不再只是展示几张宣传卡片，而是让你可以按风格筛选、查看色板、用图表迷你预览进行比较，并把某套主题设为全局主题。"
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

      <section className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <div className="space-y-4">
          {filteredThemes.map((palette) => (
            <PaletteCard
              key={palette.id}
              theme={palette}
              selected={palette.id === themeId}
              onSelect={setThemeId}
              records={dataset.records}
              xKey={xKey}
              yKey={yKey}
              numericKeys={meta.numericKeys}
            />
          ))}
        </div>
        <div className="xl:sticky xl:top-28 xl:self-start">
          <PaletteDetailPanel theme={activeTheme} />
        </div>
      </section>
    </div>
  );
}
