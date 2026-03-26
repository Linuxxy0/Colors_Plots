import { themes } from '@/themes/themes';
import { LineChartCard, ScatterChartCard } from '@/components/charts';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function ThemeShowcaseSection() {
  return (
    <section id="themes" className="section-shell pt-24">
      <div className="section-inner">
        <SectionHeading
          eyebrow="Research Themes"
          title="三套科研主题配色"
          description="从传统论文图、极简研究页面到答辩演示暗色主题，首页内置完整的视觉气质切换思路。"
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {themes.map((theme, index) => (
            <article key={theme.id} className="glass-card overflow-hidden p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-ink">{theme.name}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{theme.description}</p>
                </div>
                <span className="rounded-full border border-slate-200 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-400">
                  0{index + 1}
                </span>
              </div>
              <div className="mt-6 flex gap-2">
                {theme.palette.map((color) => (
                  <span key={color} className="h-10 flex-1 rounded-2xl" style={{ backgroundColor: color }} />
                ))}
              </div>
              <div className="mt-6 min-h-[180px]">
                {index === 1 ? <ScatterChartCard title="Theme Preview" compact /> : <LineChartCard title="Theme Preview" compact />}
              </div>
              <button className="mt-6 button-secondary w-full">Preview Theme</button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
