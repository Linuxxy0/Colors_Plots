import { chartCards } from '@/data/content';
import { BarChartCard, BoxPlotCard, HeatmapCard, LineChartCard, RadarChartCard, ScatterChartCard } from '@/components/charts';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { DatasetSource } from '@/types/dataset';

type Props = {
  dataset: DatasetSource;
};

export function ChartGallerySection({ dataset }: Props) {
  const chartMap = {
    line: <LineChartCard title="Line Chart" compact dataset={dataset} />,
    bar: <BarChartCard title="Bar Chart" compact dataset={dataset} />,
    heatmap: <HeatmapCard title="Heatmap" compact dataset={dataset} />,
    scatter: <ScatterChartCard title="Scatter Plot" compact dataset={dataset} />,
    boxplot: <BoxPlotCard title="Boxplot" compact dataset={dataset} />,
    radar: <RadarChartCard title="Radar Chart" compact dataset={dataset} />,
  };

  return (
    <section id="gallery" className="section-shell pt-24">
      <div className="section-inner">
        <SectionHeading
          eyebrow="Chart Gallery"
          title="多元图表展示画廊"
          description="默认加载内置科研数据；上传自己的 CSV / JSON 后，这里的折线图、柱状图、热力图、散点图、箱线图和雷达图都会基于新数据重绘。"
          action={<a href="#uploader" className="button-secondary">Go To Uploader</a>}
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
