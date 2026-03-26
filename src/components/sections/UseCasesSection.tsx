import { useCases } from '@/data/content';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function UseCasesSection() {
  return (
    <section className="section-shell pt-24">
      <div className="section-inner">
        <SectionHeading
          eyebrow="Use Cases"
          title="典型科研使用场景"
          description="这些模块适合从课程作业、实验室项目到正式论文补图的不同强度需求，先做漂亮首页，再逐步扩展完整系统。"
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {useCases.map((item) => (
            <article key={item.title} className="glass-card p-6">
              <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
