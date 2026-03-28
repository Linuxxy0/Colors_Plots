import type { ThemePalette } from '@/types/app';
import { useAppContext } from '@/context/AppContext';
import { t } from '@/utils/i18n';

type Props = {
  theme: ThemePalette;
};

export function PalettePreviewPanel({ theme }: Props) {
  const { language } = useAppContext();

  return (
    <section className="rounded-[32px] border p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)]" style={{ backgroundColor: theme.background, borderColor: `${theme.muted}24` }}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm font-medium" style={{ color: theme.muted }}>{language === 'zh' ? '主题预览' : 'Theme Preview'}</div>
          <h2 className="mt-2 text-3xl font-semibold" style={{ color: theme.foreground }}>{t(theme.name, language)}</h2>
          <p className="mt-3 max-w-2xl text-base leading-7" style={{ color: theme.muted }}>{t(theme.description, language)}</p>
        </div>
        <div className="rounded-full border px-4 py-2 text-sm" style={{ borderColor: `${theme.muted}30`, color: theme.muted }}>{t(theme.usage, language)}</div>
      </div>

      <div className="mt-8 grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[28px] border p-5" style={{ backgroundColor: theme.panel, borderColor: `${theme.muted}22` }}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xl font-semibold" style={{ color: theme.foreground }}>{language === 'zh' ? '界面预览' : 'Interface preview'}</div>
              <div className="mt-1 text-sm" style={{ color: theme.muted }}>{language === 'zh' ? '这里展示主题在真实科研界面里的视觉层级。' : 'See how the palette behaves in a real research UI.'}</div>
            </div>
            <div className="rounded-full px-3 py-1 text-xs font-medium" style={{ backgroundColor: `${theme.accent}12`, color: theme.accent }}>
              {language === 'zh' ? '配色预览' : 'Palette preview'}
            </div>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[24px] border p-4" style={{ backgroundColor: theme.background, borderColor: `${theme.muted}18` }}>
              <div className="text-sm font-medium" style={{ color: theme.muted }}>{language === 'zh' ? '主色与强调色' : 'Primary & accents'}</div>
              <div className="mt-4 space-y-3">
                {[
                  ['Foreground', theme.foreground],
                  ['Accent', theme.accent],
                  ['Success', theme.success],
                  ['Warm', theme.warm],
                ].map(([label, color]) => (
                  <div key={label} className="flex items-center justify-between rounded-2xl border px-4 py-3" style={{ borderColor: `${theme.muted}18`, backgroundColor: theme.panel }}>
                    <span className="text-sm" style={{ color: theme.muted }}>{label}</span>
                    <div className="flex items-center gap-3">
                      <span className="h-7 w-7 rounded-full" style={{ backgroundColor: color }} />
                      <span className="text-sm font-medium" style={{ color: theme.foreground }}>{color}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[24px] border p-5" style={{ borderColor: `${theme.muted}18`, backgroundColor: theme.panel }}>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-[22px] p-4" style={{ backgroundColor: theme.background }}>
                  <div className="text-sm" style={{ color: theme.muted }}>{language === 'zh' ? '标题层级' : 'Headline hierarchy'}</div>
                  <div className="mt-2 text-2xl font-semibold" style={{ color: theme.foreground }}>{language === 'zh' ? '科研图表预览库' : 'Research chart preview'}</div>
                  <div className="mt-3 text-sm leading-6" style={{ color: theme.muted }}>
                    {language === 'zh' ? '这里强调的不是图表动效，而是主题在真实界面中的阅读层次。' : 'Not chart animation, but a real UI hierarchy preview for the theme.'}
                  </div>
                </div>

                <div className="rounded-[22px] border p-4" style={{ borderColor: `${theme.muted}18` }}>
                  <div className="text-sm" style={{ color: theme.muted }}>{language === 'zh' ? '推荐搭配' : 'Recommended pairings'}</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {theme.tags.map((tag) => (
                      <span key={tag.en} className="rounded-full px-3 py-1 text-xs font-medium" style={{ backgroundColor: `${theme.accent}10`, color: theme.accent }}>
                        {t(tag, language)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-[24px] p-4" style={{ backgroundColor: theme.background }}>
                <div className="grid gap-3 md:grid-cols-3">
                  {theme.palette.map((color, index) => (
                    <div key={color} className="rounded-[18px] p-4" style={{ backgroundColor: color, color: index < 2 ? '#F8FAFC' : theme.foreground }}>
                      <div className="text-xs font-medium opacity-80">Color {index + 1}</div>
                      <div className="mt-2 text-sm font-semibold">{color}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-[28px] border p-5" style={{ backgroundColor: theme.panel, borderColor: `${theme.muted}22` }}>
            <div className="text-sm font-medium" style={{ color: theme.muted }}>{language === 'zh' ? '背景 / 面板 / 文字' : 'Background / panel / text'}</div>
            <div className="mt-4 space-y-3">
              {[
                [language === 'zh' ? '背景色' : 'Background', theme.background],
                [language === 'zh' ? '面板色' : 'Panel', theme.panel],
                [language === 'zh' ? '正文色' : 'Text', theme.foreground],
                [language === 'zh' ? '辅助文字' : 'Muted', theme.muted],
              ].map(([label, color]) => (
                <div key={String(label)} className="flex items-center justify-between rounded-2xl border px-4 py-3" style={{ borderColor: `${theme.muted}18` }}>
                  <span style={{ color: theme.muted }}>{label}</span>
                  <div className="flex items-center gap-3">
                    <span className="h-6 w-6 rounded-full border" style={{ backgroundColor: String(color), borderColor: `${theme.muted}20` }} />
                    <span className="font-medium" style={{ color: theme.foreground }}>{String(color)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border p-5" style={{ backgroundColor: theme.panel, borderColor: `${theme.muted}22` }}>
            <div className="text-sm font-medium" style={{ color: theme.muted }}>{language === 'zh' ? '导出建议' : 'Export hints'}</div>
            <ul className="mt-4 space-y-3 text-sm leading-7" style={{ color: theme.foreground }}>
              <li>{language === 'zh' ? '论文插图建议保留低饱和主色和较高留白。' : 'Keep low-saturation primaries and whitespace for paper figures.'}</li>
              <li>{language === 'zh' ? '投屏场景建议提高文字和背景的对比度。' : 'Increase text/background contrast for projected screens.'}</li>
              <li>{language === 'zh' ? '导出时优先选择 SVG 或高分辨率 PNG。' : 'Prefer SVG or high-resolution PNG when exporting.'}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
