import type { DatasetRecord } from '@/types/dataset';
import { SectionHeading } from '@/components/ui/SectionHeading';

type Props = {
  records: DatasetRecord[];
  xKey: string;
  yKey: string;
  numericKeys: string[];
};

// 所有图表组件已删除
export function ChartGallerySection({ records, xKey, yKey, numericKeys }: Props) {
  return (
    <section id="gallery" className="section-shell pt-24">
      <div className="section-inner">
        <SectionHeading
          eyebrow="Chart Gallery"
          title="图表库已清空"
          description="所有图表组件已被删除。"
        />
        <div className="mt-12">
          <p className="text-slate-600">图表库已清空，等待新的实现。</p>
        </div>
      </div>
    </section>
  );
}
