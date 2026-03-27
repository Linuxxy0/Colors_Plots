import { docsColumns } from '@/data/content';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function DocsRoadmapSection() {
  return (
    <section className="section-shell py-24">
      <div className="section-inner">
        <SectionHeading
          eyebrow="Explore More"
          title="文档、贡献方式与 Roadmap"
          description="把项目做成真正可维护的开源仓库，除了首页视觉，还要兼顾 README、上传能力、构建流程和可迭代路线。"
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {docsColumns.map((column) => (
            <article key={column.title} className="glass-card p-6">
              <h3 className="text-xl font-semibold text-ink">{column.title}</h3>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-600">
                {column.items.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
              <button className="button-secondary mt-6 w-full">{column.button}</button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
