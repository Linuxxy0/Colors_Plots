import type { DatasetRecord } from '@/types/dataset';
import { chartCards } from '@/data/content';
import { BarChartCard, BoxPlotCard, HeatmapCard, LineChartCard, RadarChartCard, ScatterChartCard } from '@/components/charts';
import { SectionHeading } from '@/components/ui/SectionHeading';

type Props = {
  records: DatasetRecord[];
  xKey: string;
  yKey: string;
  numericKeys: string[];
};

export function ChartGallerySection({ records, xKey, yKey, numericKeys }: Props) {
  const chartMap = {
    line: <LineChartCard title="Line Chart" compact records={records} xKey={xKey} yKey={yKey} numericKeys={numericKeys} />,
    bar: <BarChartCard title="Bar Chart" compact records={records} xKey={xKey} yKey={yKey} numericKeys={numericKeys} />,
    heatmap: <HeatmapCard title="Heatmap" compact records={records} xKey={xKey} yKey={yKey} numericKeys={numericKeys} />,
    scatter: <ScatterChartCard title="Scatter Plot" compact records={records} xKey={xKey} yKey={yKey} numericKeys={numericKeys} />,
    boxplot: <BoxPlotCard title="Boxplot" compact records={records} xKey={xKey} yKey={yKey} numericKeys={numericKeys} />,
    radar: <RadarChartCard title="Radar Chart" compact records={records} xKey={xKey} yKey={yKey} numericKeys={numericKeys} />,
  };

  return (
    <section id="gallery" className="section-shell pt-24">
      <div className="section-inner">
        <SectionHeading
          eyebrow="Chart Gallery"
          title="多元图表展示画廊"
          description="所有图表默认读取内置示例数据，也会随着你上传的数据即时刷新。适合首页演示，也适合后续扩展成真正的科研图表库。"
          action={<a href="#dataset-playground" className="button-secondary">Try Your Data</a>}
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {chartCards.map((item) => (
            <article key={item.key} className="glass-card overflow-hidden p-5">
              <div className="min-h-[210px]">{chartMap[item.key as keyof typeof chartMap]}</div>
              <div className="mt-5">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-500">
                    {item.tag}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
