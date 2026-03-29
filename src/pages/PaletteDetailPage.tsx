import { useNavigate, useParams } from 'react-router-dom';
import { PalettePreviewPanel } from '@/components/palettes/PalettePreviewPanel';
import { useAppContext } from '@/context/AppContext';
import { themes } from '@/themes/themes';
import { t } from '@/utils/i18n';

export function PaletteDetailPage() {
  const { language } = useAppContext();
  const navigate = useNavigate();
  const { paletteId } = useParams<{ paletteId: string }>();

  const palette = themes.find((p) => p.id === paletteId);

  if (!palette) {
    return (
      <div className="page-shell py-8">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-slate-900">{language === 'zh' ? '配色未找到' : 'Palette not found'}</h1>
          <button
            onClick={() => navigate('/palettes')}
            className="mt-4 rounded-2xl bg-slate-900 px-6 py-2 font-semibold text-white transition hover:bg-slate-800"
          >
            {language === 'zh' ? '返回配色库' : 'Back to palettes'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <button
            onClick={() => navigate('/palettes')}
            className="text-sm text-slate-500 transition hover:text-slate-900"
          >
            ← {language === 'zh' ? '返回配色库' : 'Back to palettes'}
          </button>
          <h1 className="mt-4 text-4xl font-semibold text-slate-900">{t(palette.name, language)}</h1>
          <p className="mt-2 max-w-3xl text-base leading-7 text-slate-600">{t(palette.description, language)}</p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
        <div className="rounded-[36px] border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.05)]">
          <PalettePreviewPanel theme={palette} />
        </div>

        <div className="space-y-4">
          <div className="rounded-[24px] border border-slate-200 bg-white p-5">
            <div className="text-sm font-medium text-slate-500">{language === 'zh' ? '用途' : 'Usage'}</div>
            <div className="mt-3 text-lg font-semibold text-slate-900">{t(palette.usage, language)}</div>
          </div>

          <div className="rounded-[24px] border border-slate-200 bg-white p-5">
            <div className="text-sm font-medium text-slate-500">{language === 'zh' ? '标签' : 'Tags'}</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {palette.tags.map((tag) => (
                <span
                  key={tag.en}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600"
                >
                  {t(tag, language)}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[24px] border border-slate-200 bg-white p-5">
            <div className="text-sm font-medium text-slate-500">{language === 'zh' ? '调色板' : 'Palette'}</div>
            <div className="mt-3 flex flex-col gap-2">
              {palette.palette.map((color, index) => (
                <div key={color} className="flex items-center gap-3">
                  <div className="h-8 w-12 flex-shrink-0 rounded" style={{ backgroundColor: color }} />
                  <code className="text-xs font-mono text-slate-600">{color}</code>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
