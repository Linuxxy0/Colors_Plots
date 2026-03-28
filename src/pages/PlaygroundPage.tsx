import { useState } from 'react';
import { ChartPreview } from '@/components/charts';
import { UploadPanel } from '@/components/playground/UploadPanel';
import { useAppContext } from '@/context/AppContext';
import { chartDefinitions } from '@/data/library';
import type { ChartKind } from '@/types/app';
import { t } from '@/utils/i18n';

export function PlaygroundPage() {
  const { language, currentTheme, getChartDataset } = useAppContext();
  const [chartId, setChartId] = useState<ChartKind>('line');
  const dataset = getChartDataset(chartId);
  const selectedChart = chartDefinitions.find((item) => item.id === chartId)!;

  return (
    <div className="page-shell py-8">
      <div className="mb-6">
        <div className="text-sm font-medium text-slate-500">{language === 'zh' ? '数据实验台' : 'Dataset playground'}</div>
        <h1 className="mt-2 text-4xl font-semibold text-slate-900">{language === 'zh' ? '上传数据后，全站图表即时刷新' : 'Upload data and refresh the whole library instantly'}</h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
          {language === 'zh'
            ? '默认情况下，不同图表会使用各自的样例数据。上传后，图表库与预览面板都会切换到你的数据。'
            : 'Every chart has its own default dataset. After upload, previews switch to your data across the site.'}
        </p>
      </div>
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          <UploadPanel />
          <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.05)]">
            <div className="text-lg font-semibold text-slate-900">{language === 'zh' ? '选择图表类型' : 'Choose chart type'}</div>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {chartDefinitions.map((chart) => (
                <button
                  key={chart.id}
                  type="button"
                  onClick={() => setChartId(chart.id)}
                  className={`rounded-[22px] border px-4 py-4 text-left transition ${chartId === chart.id ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'}`}
                >
                  <div className="text-lg font-semibold">{t(chart.title, language)}</div>
                  <div className={`mt-2 text-sm ${chartId === chart.id ? 'text-slate-200' : 'text-slate-500'}`}>{t(chart.description, language)}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="rounded-[32px] border border-slate-200 bg-white p-7 shadow-[0_20px_60px_rgba(15,23,42,0.05)]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-sm font-medium text-slate-500">{language === 'zh' ? '当前预览' : 'Current preview'}</div>
              <div className="mt-2 text-3xl font-semibold text-slate-900">{t(selectedChart.title, language)}</div>
              <div className="mt-3 text-base text-slate-600">
                {dataset.source === 'upload'
                  ? language === 'zh'
                    ? '已切换到上传数据'
                    : 'Switched to uploaded data'
                  : language === 'zh'
                    ? '当前仍在使用内置默认数据'
                    : 'Still using built-in defaults'}
              </div>
            </div>
          </div>
          <div className="mt-6">
            <ChartPreview chartId={chartId} records={dataset.records} xKey={dataset.xKey} yKey={dataset.yKey} theme={currentTheme} mode="detail" />
          </div>
        </div>
      </div>
    </div>
  );
}
