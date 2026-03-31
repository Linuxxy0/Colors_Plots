import type { DatasetRecord } from '@/types/dataset';
import { SectionHeading } from '@/components/ui/SectionHeading';

type Props = {
  records: DatasetRecord[];
  xKey: string;
  yKey: string;
  numericKeys: string[];
};

// 所有图表组件已删除
export function DashboardDemoSection({ records, xKey, yKey, numericKeys }: Props) {
  return (
    <section id="dashboard-demo" className="section-shell pt-24">
      <div className="section-inner">
        <SectionHeading
          eyebrow="Dashboard Demo"
          title="图表库已清空"
          description="所有图表组件已被删除。"
        />
        <div className="glass-card mt-12 p-6 sm:p-7">
          <p className="text-slate-600">所有图表组件已删除，等待新的实现。</p>
        </div>
      </div>
    </section>
  );
}
