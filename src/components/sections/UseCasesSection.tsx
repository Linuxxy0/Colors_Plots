import { SectionHeading } from '@/components/ui/SectionHeading';

export function UseCasesSection() {
  return (
    <section className="section-shell pt-24">
      <div className="section-inner">
        <SectionHeading
          eyebrow="Use Cases"
          title="使用场景已清空"
          description="图表库已删除，项目功能更新中。"
        />
        <div className="mt-12">
          <p className="text-slate-600">使用场景内容已清空，等待新的实现。</p>
        </div>
      </div>
    </section>
  );
}
