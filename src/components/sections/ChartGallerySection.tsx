import { chartCards } from '@/data/content';
import { BarChartCard, BoxPlotCard, HeatmapCard, LineChartCard, RadarChartCard, ScatterChartCard } from '@/components/charts';
import { SectionHeading } from '@/components/ui/SectionHeading';

const chartMap = {
  line: <LineChartCard title="Line Chart" compact />,
  bar: <BarChartCard title="Bar Chart" compact />,
  heatmap: <HeatmapCard title="Heatmap" compact />,
  scatter: <ScatterChartCard title="Scatter Plot" compact />,
  boxplot: <BoxPlotCard title="Boxplot" compact />,
  radar: <RadarChartCard title="Radar Chart" compact />,
};

export function ChartGallerySection() {
  return (
    <section id="gallery" className="section-shell pt-24">
      <div className="section-inner">
        <SectionHeading
          eyebrow="Chart Gallery"
          title="多元图表展示画廊"
          description="首页预览覆盖趋势、比较、相关性、分布与多指标分析，后续可继续扩展桑基图、网络图、小提琴图等科研常用图。"
          action={<a href="#quick-start" className="button-secondary">View All Charts</a>}
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
