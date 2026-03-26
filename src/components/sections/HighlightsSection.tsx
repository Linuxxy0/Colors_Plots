import { highlights } from '@/data/content';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function HighlightsSection() {
  return (
    <section className="section-shell pt-24">
      <div className="section-inner">
        <SectionHeading
          eyebrow="Why SciVizLab"
          title="一个以科研审美为核心的数据可视化起点"
          description="从色彩、图表到页面结构，全部围绕研究展示场景进行组织，既适合 GitHub 首页，也适合实验结果页和论文配图。"
          center
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {highlights.map((item, index) => (
            <article key={item.title} className="glass-card p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-sm font-semibold text-ink">
                0{index + 1}
              </div>
              <h3 className="mt-6 text-xl font-semibold text-ink">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
