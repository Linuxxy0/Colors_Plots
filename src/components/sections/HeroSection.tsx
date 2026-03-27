import type { DatasetRecord } from '@/types/dataset';
import { formatMetric, summarizeDataset } from '@/utils/dataset';
import { BarChartCard, HeatmapCard, LineChartCard } from '@/components/charts';

type Props = {
  records: DatasetRecord[];
  xKey: string;
  yKey: string;
  numericKeys: string[];
};

export function HeroSection({ records, xKey, yKey, numericKeys }: Props) {
  const summary = summarizeDataset(records, yKey);
  const latestLabel = yKey.toUpperCase();
  const avgLabel = `Avg ${yKey}`;
  const deltaLabel = `Δ ${yKey}`;

  const kpiCards = [
    { label: latestLabel, value: formatMetric(summary.latest), delta: `${summary.count} rows loaded` },
    { label: avgLabel, value: formatMetric(summary.average), delta: `${numericKeys.length} numeric fields` },
    { label: deltaLabel, value: formatMetric(summary.delta), delta: `${xKey} → ${yKey}` },
  ];

  return (
    <section id="top" className="section-shell pt-10 sm:pt-14 lg:pt-20">
      <div className="section-inner grid items-center gap-10 lg:grid-cols-[1.05fr_1.15fr]">
        <div>
          <span className="tag">Academic Visualization</span>
          <h1 className="mt-6 max-w-xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-6xl">
            科研风可视化项目模板，支持默认数据预览，也支持上传你自己的实验结果。
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            SciVizLab 提供低饱和科研配色、多元图表组件、拖拽上传与可复用页面模板，让你的 GitHub 项目主页像一个成熟的研究产品。
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#dataset-playground" className="button-primary">
              Upload Dataset
            </a>
            <a href="#dashboard-demo" className="button-secondary">
              Live Demo
            </a>
          </div>
          <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-500">
            {['React', 'TypeScript', 'Vite', 'Tailwind', 'Drag & Drop', 'GitHub Pages'].map((item) => (
              <span key={item} className="rounded-full border border-slate-200 bg-white px-3 py-1.5">
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="glass-card p-5 sm:p-6 lg:p-7">
          <div className="grid gap-4 md:grid-cols-3">
            {kpiCards.map((item) => (
              <div key={item.label} className="rounded-3xl border border-slate-200 bg-slate-50/80 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{item.label}</p>
                <p className="mt-3 text-2xl font-semibold text-ink">{item.value}</p>
                <p className="mt-2 text-sm font-medium text-emerald-600">{item.delta}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 grid gap-4 lg:grid-cols-[1.5fr_1fr]">
            <div className="min-h-[280px]">
              <LineChartCard title="Preview Dashboard" records={records} xKey={xKey} yKey={yKey} numericKeys={numericKeys} />
            </div>
            <div className="grid gap-4">
              <div className="min-h-[132px]">
                <BarChartCard title="Comparison" compact records={records} xKey={xKey} yKey={yKey} numericKeys={numericKeys} />
              </div>
              <div className="min-h-[132px]">
                <HeatmapCard title="Correlation" compact records={records} xKey={xKey} yKey={yKey} numericKeys={numericKeys} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
