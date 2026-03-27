import { useMemo, useState } from 'react';
import { PageIntro } from '@/components/common/PageIntro';
import { DatasetSummary } from '@/components/dataset/DatasetSummary';
import { FieldMappingPanel } from '@/components/dataset/FieldMappingPanel';
import { UploadPanel } from '@/components/dataset/UploadPanel';
import { chartCatalog } from '@/data/chartCatalog';
import { useAppState } from '@/context/AppStateContext';
import { chartCopy, t, uiText } from '@/i18n';
import { getChartPreviewInput } from '@/data/chartPreviewData';

export function PlaygroundPage() {
  const { locale, dataset, meta, xKey, yKey, theme } = useAppState();
  const [chartId, setChartId] = useState(chartCatalog[0]?.id ?? 'line');
  const activeChart = useMemo(() => chartCatalog.find((item) => item.id === chartId) ?? chartCatalog[0], [chartId]);
  const preview = useMemo(() => getChartPreviewInput(chartId, dataset, meta, xKey, yKey), [chartId, dataset, meta, xKey, yKey]);
  const ChartComponent = activeChart.component;

  return (
    <div className="space-y-6">
      <PageIntro
        eyebrow={locale === 'zh' ? '数据实验台' : 'Dataset playground'}
        title={locale === 'zh' ? '默认数据 + 自己上传的实时实验台' : 'Live playground for sample and uploaded data'}
        description={locale === 'zh' ? '这里是整个项目的操作中心：拖拽上传 CSV / JSON，切换 X / Y 字段、切换主题与图表类型，并立即看到结果。未上传数据时，图表类型切换会联动到更适合的默认样例。' : 'This is the control room for the project: upload CSV / JSON, switch X and Y fields, themes, and chart types, and see results immediately. When no file is uploaded, changing chart type swaps to a more suitable built-in sample.'}
      />

      <section className="grid gap-6 2xl:grid-cols-[0.34fr_0.66fr]">
        <div className="space-y-6">
          <UploadPanel />
          <FieldMappingPanel />
        </div>

        <div className="space-y-6">
          <section className="rounded-[28px] border border-slate-200/80 bg-white/88 p-6 shadow-soft">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="text-xs uppercase tracking-[0.22em] text-slate-400">{t(locale, uiText.livePreview)}</div>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">{t(locale, uiText.currentChartPreview)}</h2>
              </div>
              <select
                value={chartId}
                onChange={(event) => setChartId(event.target.value)}
                className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-slate-400"
              >
                {chartCatalog.map((chart) => (
                  <option key={chart.id} value={chart.id}>{t(locale, chartCopy[chart.id].name)}</option>
                ))}
              </select>
            </div>

            <div className="mt-6 h-[520px]">
              <ChartComponent records={preview.records} xKey={preview.xKey} yKey={preview.yKey} numericKeys={preview.meta.numericKeys} theme={theme} title={t(locale, chartCopy[activeChart.id].title ?? chartCopy[activeChart.id].name)} />
            </div>
          </section>

          <DatasetSummary records={preview.records} meta={preview.meta} yKey={preview.yKey} fileName={dataset.source === 'upload' ? dataset.fileName : `${chartId}-sample`} />
        </div>
      </section>
    </div>
  );
}
