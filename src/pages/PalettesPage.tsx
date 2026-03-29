import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '@/context/AppContext';
import { themes } from '@/themes/themes';
import { t } from '@/utils/i18n';

export function PalettesPage() {
  const { language } = useAppContext();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'all' | 'paper' | 'minimal' | 'dark'>('all');

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
          <button
            key={palette.id}
            type="button"
            onClick={() => navigate(`/palettes/${palette.id}`)}
            className="group rounded-[28px] border border-slate-200 bg-white overflow-hidden transition hover:border-slate-300 hover:shadow-md text-left"
          >
            {/* 颜色条纹 */}
            <div className="flex h-20 overflow-hidden">
              {palette.palette.map((color) => (
                <div key={color} className="flex-1" style={{ backgroundColor: color }} />
              ))}
            </div>

            {/* 内容 */}
            <div className="p-5">
              <div>
                <div className="text-lg font-semibold text-slate-900">{t(palette.name, language)}</div>
                <div className="mt-1 text-xs text-slate-500">
                  {palette.palette.length} {language === 'zh' ? '种颜色' : 'colors'} • {palette.tags.length} {language === 'zh' ? '个标签' : 'tags'}
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {palette.tags.map((tag) => (
                  <span key={tag.en} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                    {t(tag, language)}
                  </span>
                ))}
              </div>

              <div className="mt-4 text-sm text-slate-700">
                {t(palette.usage, language)}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
