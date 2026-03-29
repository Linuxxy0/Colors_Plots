import { useNavigate, useParams } from 'react-router-dom';
import React from 'react';
import { useAppContext } from '@/context/AppContext';
import { themes } from '@/themes/themes';
import { t } from '@/utils/i18n';

export function PaletteDetailPage() {
  const { language } = useAppContext();
  const navigate = useNavigate();
  const { paletteId } = useParams<{ paletteId: string }>();
  const [copied, setCopied] = React.useState<string | null>(null);

  const palette = themes.find((p) => p.id === paletteId);

  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color);
    setCopied(color);
    setTimeout(() => setCopied(null), 2000);
  };

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
      <button
        onClick={() => navigate('/palettes')}
        className="mb-6 text-sm font-medium text-slate-500 transition hover:text-slate-900"
      >
        ← {language === 'zh' ? '返回配色库' : 'Back to palettes'}
      </button>

      <div className="rounded-[32px] bg-white overflow-hidden border border-slate-200 shadow-[0_20px_60px_rgba(15,23,42,0.05)]">
        {/* 颜色条纹顶部 */}
        <div className="flex h-32 overflow-hidden rounded-t-[32px]">
          {palette.palette.map((color) => (
            <div key={color} className="flex-1" style={{ backgroundColor: color }} />
          ))}
        </div>

        <div className="p-8">
          {/* 标题和描述 */}
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-slate-900">{t(palette.name, language)}</h1>
            <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
              {t(palette.description, language)}
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* 用途 */}
            <div>
              <div className="text-sm font-medium text-slate-500">{language === 'zh' ? '用途' : 'Usage'}</div>
              <div className="mt-3 text-base font-medium text-slate-900">{t(palette.usage, language)}</div>
            </div>

            {/* 颜色数量 */}
            <div>
              <div className="text-sm font-medium text-slate-500">{language === 'zh' ? '颜色数' : 'Colors'}</div>
              <div className="mt-3 text-base font-medium text-slate-900">{palette.palette.length}</div>
            </div>

            {/* 标签 */}
            <div>
              <div className="text-sm font-medium text-slate-500">{language === 'zh' ? '标签' : 'Tags'}</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {palette.tags.map((tag) => (
                  <span
                    key={tag.en}
                    className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600"
                  >
                    {t(tag, language)}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 颜色代码列表 */}
          <div className="mt-8 border-t border-slate-200 pt-8">
            <div className="mb-4 text-sm font-medium text-slate-500">
              {language === 'zh' ? '颜色代码 (点击复制)' : 'Color codes (click to copy)'}
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {palette.palette.map((color) => (
                <button
                  key={color}
                  onClick={() => copyToClipboard(color)}
                  className="group flex items-center gap-3 rounded-[16px] border border-slate-200 p-3 transition hover:bg-slate-50"
                >
                  <div
                    className="h-10 w-10 flex-shrink-0 rounded border border-slate-200"
                    style={{ backgroundColor: color }}
                  />
                  <code className="flex-1 text-left text-sm font-mono text-slate-600 group-hover:text-slate-900">
                    {color}
                  </code>
                  {copied === color && (
                    <span className="text-xs text-emerald-600 font-medium">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
