import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChartPreview } from '@/components/charts';
import { useAppContext } from '@/context/AppContext';
import { chartDefinitions } from '@/data/library';
import { t } from '@/utils/i18n';

export function ChartsPage() {
  const { language, currentTheme, getChartDataset } = useAppContext();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

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
                  onClick={() => navigate(`/charts/${chart.id}`)}
                  className="rounded-2xl bg-slate-900 px-4 py-2 font-semibold text-white transition hover:bg-slate-800"
                >
                  {language === 'zh' ? '查看详情' : 'Details'}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
