import { BarChartCard, BoxPlotCard, HeatmapCard, LineChartCard, RadarChartCard } from '@/components/charts';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { DatasetSource } from '@/types/dataset';
import { buildInsightBullets, computeKpis } from '@/utils/dataset';

type Props = {
  dataset: DatasetSource;
};

export function DashboardDemoSection({ dataset }: Props) {
  const kpiCards = computeKpis(dataset);
  const insights = buildInsightBullets(dataset);

  return (
    <section id="dashboard-demo" className="section-shell pt-24">
      <div className="section-inner">
        <SectionHeading
          eyebrow="Dashboard Demo"
          title="可复用的研究型 Dashboard 首页模块"
          description="现在这个看板也会跟随上传的数据同步变化。你既可以用默认示例数据展示模板效果，也可以直接上传自己的实验数据给导师或面试官看。"
        />
        <div className="glass-card mt-12 p-6 sm:p-7">
          <div className="grid gap-4 md:grid-cols-3">
            {kpiCards.map((item) => (
              <div key={item.label} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{item.label}</p>
                <p className="mt-3 text-3xl font-semibold text-ink">{item.value}</p>
                <p className="mt-2 text-sm font-medium text-emerald-600">{item.delta}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 grid gap-4 xl:grid-cols-2">
            <div className="min-h-[300px]">
              <LineChartCard title="Training Trend" dataset={dataset} />
            </div>
            <div className="min-h-[300px]">
              <BarChartCard title="Model Comparison" dataset={dataset} />
            </div>
          </div>
          <div className="mt-4 grid gap-4 xl:grid-cols-[1fr_1fr_1.1fr]">
            <div className="min-h-[250px]">
              <HeatmapCard title="Correlation" dataset={dataset} />
            </div>
            <div className="min-h-[250px]">
              <BoxPlotCard title="Distribution" dataset={dataset} />
            </div>
            <div className="grid gap-4">
              <div className="min-h-[170px]">
                <RadarChartCard title="Multi-metric" compact dataset={dataset} />
              </div>
              <div className="glass-card p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Notes</p>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                  {insights.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
