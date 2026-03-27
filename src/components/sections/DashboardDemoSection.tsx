import type { DatasetRecord } from '@/types/dataset';
import { formatMetric, summarizeDataset } from '@/utils/dataset';
import { BarChartCard, BoxPlotCard, HeatmapCard, LineChartCard, RadarChartCard } from '@/components/charts';
import { SectionHeading } from '@/components/ui/SectionHeading';

type Props = {
  records: DatasetRecord[];
  xKey: string;
  yKey: string;
  numericKeys: string[];
};

export function DashboardDemoSection({ records, xKey, yKey, numericKeys }: Props) {
  const summary = summarizeDataset(records, yKey);
  const kpiCards = [
    { label: yKey, value: formatMetric(summary.latest), delta: `${formatMetric(summary.delta)} vs previous` },
    { label: `Avg ${yKey}`, value: formatMetric(summary.average), delta: `${records.length} rows in dataset` },
    { label: 'Numeric Keys', value: String(numericKeys.length), delta: `${xKey} selected on X` },
  ];

  return (
    <section id="dashboard-demo" className="section-shell pt-24">
      <div className="section-inner">
        <SectionHeading
          eyebrow="Dashboard Demo"
          title="可复用的研究型 Dashboard 首页模块"
          description="把 KPI、趋势图、对比图、相关性图和摘要说明放进统一容器里，既能做展示页面，也能直接扩展为实验报告工作台。"
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
              <LineChartCard title="Training Trend" records={records} xKey={xKey} yKey={yKey} numericKeys={numericKeys} />
            </div>
            <div className="min-h-[300px]">
              <BarChartCard title="Model Comparison" records={records} xKey={xKey} yKey={yKey} numericKeys={numericKeys} />
            </div>
          </div>
          <div className="mt-4 grid gap-4 xl:grid-cols-[1fr_1fr_1.1fr]">
            <div className="min-h-[250px]">
              <HeatmapCard title="Correlation" records={records} xKey={xKey} yKey={yKey} numericKeys={numericKeys} />
            </div>
            <div className="min-h-[250px]">
              <BoxPlotCard title="Distribution" records={records} xKey={xKey} yKey={yKey} numericKeys={numericKeys} />
            </div>
            <div className="grid gap-4">
              <div className="min-h-[170px]">
                <RadarChartCard title="Multi-metric" compact records={records} xKey={xKey} yKey={yKey} numericKeys={numericKeys} />
              </div>
              <div className="glass-card p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Notes</p>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                  <li>• 当前横轴字段为 {xKey}，纵轴核心字段为 {yKey}。</li>
                  <li>• 上传后图表会自动重算相关性和分布，不需要刷新页面。</li>
                  <li>• 默认示例数据适合展示训练曲线、性能指标和实验摘要。</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
