import { useMemo, useState } from 'react';
import { PageIntro } from '@/components/common/PageIntro';
import { DatasetSummary } from '@/components/dataset/DatasetSummary';
import { FieldMappingPanel } from '@/components/dataset/FieldMappingPanel';
import { UploadPanel } from '@/components/dataset/UploadPanel';
import { chartCatalog } from '@/data/chartCatalog';
import { useAppState } from '@/context/AppStateContext';

export function PlaygroundPage() {
  const { dataset, meta, xKey, yKey, theme } = useAppState();
  const [chartId, setChartId] = useState(chartCatalog[0]?.id ?? 'line');
  const activeChart = useMemo(() => chartCatalog.find((item) => item.id === chartId) ?? chartCatalog[0], [chartId]);
  const ChartComponent = activeChart.component;

  return (
    <div className="space-y-6">
      <PageIntro
        eyebrow="Dataset Playground"
        title="默认数据 + 自己上传的实时实验台"
        description="这里是整个项目的操作中心：拖拽上传 CSV / JSON，切换 X / Y 字段、切换主题与图表类型，并立即看到结果。"
      />

      <section className="grid gap-6 xl:grid-cols-[0.42fr_0.58fr]">
        <div className="space-y-6">
          <UploadPanel />
          <FieldMappingPanel />
        </div>

        <div className="space-y-6">
          <section className="rounded-[28px] border border-slate-200/80 bg-white/88 p-6 shadow-soft">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="text-xs uppercase tracking-[0.22em] text-slate-400">Live preview</div>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">当前图表预览</h2>
              </div>
              <select
                value={chartId}
                onChange={(event) => setChartId(event.target.value)}
                className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-slate-400"
              >
                {chartCatalog.map((chart) => (
                  <option key={chart.id} value={chart.id}>{chart.name}</option>
                ))}
              </select>
            </div>

            <div className="mt-6 h-[420px]">
              <ChartComponent records={dataset.records} xKey={xKey} yKey={yKey} numericKeys={meta.numericKeys} theme={theme} title={activeChart.name} />
            </div>
          </section>

          <DatasetSummary />
        </div>
      </section>
    </div>
  );
}
