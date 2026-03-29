import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '@/context/AppContext';
import { ChartPreview } from '@/components/charts';
import { chartDefinitions } from '@/data/library';
import { t } from '@/utils/i18n';
import type { ChartKind } from '@/types/app';

export function ChartDetailPage() {
  const { chartId } = useParams<{ chartId: ChartKind }>();
  const navigate = useNavigate();
  const { language, currentTheme, getChartDataset } = useAppContext();

  if (!chartId) {
    return (
      <div className="page-shell py-8">
        <div className="text-center">
          <div className="text-slate-500">{language === 'zh' ? '找不到图表' : 'Chart not found'}</div>
          <button
            onClick={() => navigate('/charts')}
            className="mt-4 rounded-2xl bg-slate-900 px-4 py-2 font-semibold text-white transition hover:bg-slate-800"
          >
            {language === 'zh' ? '返回图表库' : 'Back to charts'}
          </button>
        </div>
      </div>
    );
  }

  const chart = chartDefinitions.find((c) => c.id === chartId);
  
  if (!chart) {
    return (
      <div className="page-shell py-8">
        <div className="text-center">
          <div className="text-slate-500">{language === 'zh' ? '找不到图表' : 'Chart not found'}</div>
          <button
            onClick={() => navigate('/charts')}
            className="mt-4 rounded-2xl bg-slate-900 px-4 py-2 font-semibold text-white transition hover:bg-slate-800"
          >
            {language === 'zh' ? '返回图表库' : 'Back to charts'}
          </button>
        </div>
      </div>
    );
  }

  const dataset = getChartDataset(chart.id);

  return (
    <div className="page-shell py-8">
      <div className="mb-8">
        <button
          onClick={() => navigate('/charts')}
          className="mb-6 text-sm font-medium text-slate-500 transition hover:text-slate-700"
        >
          ← {language === 'zh' ? '返回图表库' : 'Back to charts'}
        </button>
        
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex-1">
            <div className="text-sm font-medium text-slate-500">{language === 'zh' ? '图表详情' : 'Chart details'}</div>
            <h1 className="mt-2 text-4xl font-semibold text-slate-900">{t(chart.title, language)}</h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">{t(chart.description, language)}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-3 mb-6">
          <div className="rounded-[24px] bg-slate-50 p-5">
            <div className="text-sm font-medium text-slate-500">{language === 'zh' ? '数据来源' : 'Data source'}</div>
            <div className="mt-3 text-lg font-semibold text-slate-900">
              {dataset.source === 'upload' ? (language === 'zh' ? '上传数据' : 'Uploaded dataset') : language === 'zh' ? '默认样例' : 'Built-in sample'}
            </div>
            <div className="mt-2 text-sm text-slate-500">
              {dataset.source === 'upload' ? dataset.fileName : language === 'zh' ? '为当前图表单独准备' : 'Prepared specifically for this chart'}
            </div>
          </div>
          <div className="rounded-[24px] bg-slate-50 p-5">
            <div className="text-sm font-medium text-slate-500">{language === 'zh' ? '字段组合' : 'Field mapping'}</div>
            <div className="mt-3 text-lg font-semibold text-slate-900">
              {dataset.xKey} / {dataset.yKey}
            </div>
            <div className="mt-2 text-sm text-slate-500">{t(chart.fieldRequirement, language)}</div>
          </div>
          <div className="rounded-[24px] bg-slate-50 p-5">
            <div className="text-sm font-medium text-slate-500">{language === 'zh' ? '适用场景' : 'Use cases'}</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {chart.useCases.map((item) => (
                <span key={item.en} className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-500">
                  {t(item, language)}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-[24px] border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-500">
          {dataset.source === 'upload'
            ? language === 'zh'
              ? `当前正在使用你上传的数据：${dataset.fileName}`
              : `Currently using your uploaded dataset: ${dataset.fileName}`
            : language === 'zh'
              ? '当前使用的是为该图表单独准备的默认样例数据。把鼠标放到图元上，下面的数值会立即变化。'
              : 'Currently using a built-in sample dataset for this chart. Hover the chart marks to update the values below.'}
        </div>

        <div className="mt-6 rounded-[24px] border border-slate-200 bg-white p-6 min-h-[400px]">
          <ChartPreview
            chartId={chart.id}
            records={dataset.records}
            xKey={dataset.xKey}
            yKey={dataset.yKey}
            theme={currentTheme}
            mode="detail"
          />
        </div>
      </div>
    </div>
  );
}
