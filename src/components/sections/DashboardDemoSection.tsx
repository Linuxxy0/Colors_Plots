import { kpiCards } from '@/data/content';
import { BarChartCard, BoxPlotCard, HeatmapCard, LineChartCard, RadarChartCard } from '@/components/charts';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function DashboardDemoSection() {
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
                <p className="mt-2 text-sm font-medium text-emerald-600">{item.delta} from previous run</p>
              </div>
            ))}
          </div>
          <div className="mt-4 grid gap-4 xl:grid-cols-2">
            <div className="min-h-[300px]">
              <LineChartCard title="Training Trend" />
            </div>
            <div className="min-h-[300px]">
              <BarChartCard title="Model Comparison" />
            </div>
          </div>
          <div className="mt-4 grid gap-4 xl:grid-cols-[1fr_1fr_1.1fr]">
            <div className="min-h-[250px]">
              <HeatmapCard title="Correlation" />
            </div>
            <div className="min-h-[250px]">
              <BoxPlotCard title="Distribution" />
            </div>
            <div className="grid gap-4">
              <div className="min-h-[170px]">
                <RadarChartCard title="Multi-metric" compact />
              </div>
              <div className="glass-card p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Notes</p>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                  <li>• 主模型在 Accuracy 和 F1 上同时领先。</li>
                  <li>• 热力图揭示特征组合具有稳定正相关。</li>
                  <li>• 箱线图显示改进方案降低了结果波动。</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
