import { useMemo, useState } from 'react';
import { ChartPreview } from '@/components/charts';
import { useAppContext } from '@/context/AppContext';
import { chartDefinitions } from '@/data/library';
import type { ChartKind } from '@/types/app';
import { t } from '@/utils/i18n';

export function ChartsPage() {
  const { language, currentTheme, getChartDataset } = useAppContext();
  const [query, setQuery] = useState('');
  const [detailId, setDetailId] = useState<ChartKind | null>(null);

  const filteredCharts = useMemo(
    () =>
      chartDefinitions.filter((chart) => {
        const content = `${t(chart.title, language)} ${t(chart.description, language)} ${t(chart.tag, language)}`.toLowerCase();
        return content.includes(query.toLowerCase());
      }),
    [language, query],
  );

  return (
    <div className="page-shell py-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-sm font-medium text-slate-500">{language === 'zh' ? '图表库' : 'Chart library'}</div>
          <h1 className="mt-2 text-4xl font-semibold text-slate-900">
            {language === 'zh' ? '浏览所有图表类型' : 'Browse all chart types'}
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
            {language === 'zh'
              ? '点击查看详情。每种图表都有单独准备的样例数据，把鼠标悬停到图元上查看实时数据。'
              : 'Click to view details. Each chart has a dedicated sample dataset. Hover chart marks to inspect real-time data.'}
          </p>
        </div>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={language === 'zh' ? '搜索图表...' : 'Search charts...'}
          className="h-12 w-full max-w-xs rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none ring-0 placeholder:text-slate-400"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCharts.map((chart) => {
          const dataset = getChartDataset(chart.id);

          return (
            <article
              key={chart.id}
              className="group rounded-[30px] border border-slate-200 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.05)] transition hover:border-slate-300 hover:shadow-[0_20px_70px_rgba(15,23,42,0.1)]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="text-2xl font-semibold text-slate-900">{t(chart.title, language)}</div>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{t(chart.description, language)}</p>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">{t(chart.tag, language)}</span>
              </div>
              <div className="mt-4 h-40 rounded-[20px] border border-slate-200 bg-slate-50 overflow-hidden">
                <ChartPreview chartId={chart.id} records={dataset.records} xKey={dataset.xKey} yKey={dataset.yKey} theme={currentTheme} mode="card" />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {chart.useCases.map((item) => (
                  <span key={item.en} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500">
                    {t(item, language)}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex items-center justify-between gap-3 text-sm">
                <span className="text-slate-500">{t(chart.fieldRequirement, language)}</span>
                <button 
                  type="button" 
                  onClick={() => setDetailId(chart.id)}
                  className="rounded-2xl bg-slate-900 px-4 py-2 font-semibold text-white transition hover:bg-slate-800"
                >
                  {language === 'zh' ? '查看详情' : 'Details'}
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {detailId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setDetailId(null)}>
          <div 
            className="w-full max-w-4xl max-h-[90vh] bg-white rounded-[36px] p-8 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const detail = chartDefinitions.find(c => c.id === detailId);
              if (!detail) return null;
              const detailDataset = getChartDataset(detail.id);
              return (
                <>
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="flex-1">
                      <div className="text-sm font-medium text-slate-500">{language === 'zh' ? '图表详情' : 'Chart details'}</div>
                      <h2 className="mt-2 text-4xl font-semibold text-slate-900">{t(detail.title, language)}</h2>
                      <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">{t(detail.description, language)}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setDetailId(null)}
                      className="text-slate-400 hover:text-slate-600 transition text-2xl"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="mt-6 grid gap-3 md:grid-cols-3 mb-6">
                    <div className="rounded-[24px] bg-slate-50 p-5">
                      <div className="text-sm font-medium text-slate-500">{language === 'zh' ? '数据来源' : 'Data source'}</div>
                      <div className="mt-3 text-lg font-semibold text-slate-900">
                        {detailDataset.source === 'upload' ? (language === 'zh' ? '上传数据' : 'Uploaded dataset') : language === 'zh' ? '默认样例' : 'Built-in sample'}
                      </div>
                      <div className="mt-2 text-sm text-slate-500">
                        {detailDataset.source === 'upload' ? detailDataset.fileName : language === 'zh' ? '为当前图表单独准备' : 'Prepared specifically for this chart'}
                      </div>
                    </div>
                    <div className="rounded-[24px] bg-slate-50 p-5">
                      <div className="text-sm font-medium text-slate-500">{language === 'zh' ? '字段组合' : 'Field mapping'}</div>
                      <div className="mt-3 text-lg font-semibold text-slate-900">
                        {detailDataset.xKey} / {detailDataset.yKey}
                      </div>
                      <div className="mt-2 text-sm text-slate-500">{t(detail.fieldRequirement, language)}</div>
                    </div>
                    <div className="rounded-[24px] bg-slate-50 p-5">
                      <div className="text-sm font-medium text-slate-500">{language === 'zh' ? '适用场景' : 'Use cases'}</div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {detail.useCases.map((item) => (
                          <span key={item.en} className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-500">
                            {t(item, language)}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 rounded-[24px] border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-500">
                    {detailDataset.source === 'upload'
                      ? language === 'zh'
                        ? `当前正在使用你上传的数据：${detailDataset.fileName}`
                        : `Currently using your uploaded dataset: ${detailDataset.fileName}`
                      : language === 'zh'
                        ? '当前使用的是为该图表单独准备的默认样例数据。把鼠标放到图元上，下面的数值会立即变化。'
                        : 'Currently using a built-in sample dataset for this chart. Hover the chart marks to update the values below.'}
                  </div>

                  <div className="mt-6 rounded-[24px] border border-slate-200 bg-white p-6 min-h-[400px]">
                    <ChartPreview
                      chartId={detail.id}
                      records={detailDataset.records}
                      xKey={detailDataset.xKey}
                      yKey={detailDataset.yKey}
                      theme={currentTheme}
                      mode="detail"
                    />
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
