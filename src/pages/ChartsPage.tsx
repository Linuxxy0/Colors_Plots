import { useMemo, useState } from 'react';
import { ChartPreview } from '@/components/charts';
import { useAppContext } from '@/context/AppContext';
import { chartDefinitions } from '@/data/library';
import type { ChartKind } from '@/types/app';
import { t } from '@/utils/i18n';

export function ChartsPage() {
  const { language, currentTheme, getChartDataset } = useAppContext();
  const [selected, setSelected] = useState<ChartKind>('line');
  const [query, setQuery] = useState('');
  const filteredCharts = useMemo(() => chartDefinitions.filter((chart) => {
    const content = `${t(chart.title, language)} ${t(chart.description, language)} ${t(chart.tag, language)}`.toLowerCase();
    return content.includes(query.toLowerCase());
  }), [language, query]);
  const selectedDefinition = chartDefinitions.find((chart) => chart.id === selected) ?? chartDefinitions[0];
  const detailDataset = getChartDataset(selectedDefinition.id);

  return (
    <div className="page-shell py-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-sm font-medium text-slate-500">{language === 'zh' ? '图表库' : 'Chart library'}</div>
          <h1 className="mt-2 text-4xl font-semibold text-slate-900">{language === 'zh' ? '左侧浏览图表，右侧查看大预览' : 'Browse charts on the left, inspect a larger preview on the right'}</h1>
          <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">{language === 'zh' ? '默认状态下，每种图表会使用更适合的样例数据；交互只在鼠标悬停时动态反馈。' : 'Each chart uses a more suitable default dataset. Dynamic feedback only appears on hover.'}</p>
        </div>
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={language === 'zh' ? '搜索图表...' : 'Search charts...'} className="h-12 w-full max-w-xs rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none ring-0 placeholder:text-slate-400" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.88fr_1.12fr]">
        <section className="grid gap-5 md:grid-cols-2">
          {filteredCharts.map((chart) => {
            const dataset = getChartDataset(chart.id);
            const active = selected === chart.id;
            return (
              <article key={chart.id} className="rounded-[32px] border bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.05)]" style={{ borderColor: active ? currentTheme.foreground : '#E2E8F0' }}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-4xl font-semibold text-slate-900">{t(chart.title, language)}</div>
                    <p className="mt-2 text-base leading-7 text-slate-500">{t(chart.description, language)}</p>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">{t(chart.tag, language)}</span>
                </div>
                <div className="mt-6">
                  <ChartPreview chartId={chart.id} records={dataset.records} xKey={dataset.xKey} yKey={dataset.yKey} theme={currentTheme} mode="card" />
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {chart.useCases.map((item) => (
                    <span key={item.en} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">{t(item, language)}</span>
                  ))}
                </div>
                <div className="mt-5 flex items-center justify-between gap-3 text-sm text-slate-500">
                  <span>{t(chart.fieldRequirement, language)}</span>
                  <button type="button" onClick={() => setSelected(chart.id)} className="rounded-2xl bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-800">
                    {language === 'zh' ? '查看详情' : 'Open detail'}
                  </button>
                </div>
              </article>
            );
          })}
        </section>

        <aside className="xl:sticky xl:top-24 xl:self-start">
          <div className="rounded-[36px] border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.05)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm font-medium text-slate-500">{language === 'zh' ? '图表详情' : 'Chart detail'}</div>
                <h2 className="mt-2 text-4xl font-semibold text-slate-900">{t(selectedDefinition.title, language)}</h2>
                <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">{t(selectedDefinition.description, language)}</p>
              </div>
              <button type="button" className="rounded-2xl border border-slate-200 px-5 py-3 font-semibold text-slate-700">{language === 'zh' ? '当前预览' : 'Now previewing'}</button>
            </div>
            <div className="mt-6 rounded-[24px] border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-500">
              {detailDataset.source === 'upload'
                ? (language === 'zh' ? `当前使用上传数据：${detailDataset.fileName}` : `Using uploaded dataset: ${detailDataset.fileName}`)
                : (language === 'zh' ? '当前使用该图表更合适的默认样例数据。将鼠标悬停到图元上查看动态信息。' : 'Using a more suitable built-in dataset. Hover chart elements to inspect dynamic values.')}
            </div>
            <div className="mt-6">
              <ChartPreview chartId={selectedDefinition.id} records={detailDataset.records} xKey={detailDataset.xKey} yKey={detailDataset.yKey} theme={currentTheme} mode="detail" />
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-[24px] bg-slate-50 p-5">
                <div className="text-sm font-medium text-slate-500">{language === 'zh' ? '适用场景' : 'Use cases'}</div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {selectedDefinition.useCases.map((item) => (
                    <span key={item.en} className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-500">{t(item, language)}</span>
                  ))}
                </div>
              </div>
              <div className="rounded-[24px] bg-slate-50 p-5">
                <div className="text-sm font-medium text-slate-500">{language === 'zh' ? '字段要求' : 'Field requirement'}</div>
                <div className="mt-3 text-xl font-semibold text-slate-900">{t(selectedDefinition.fieldRequirement, language)}</div>
                <div className="mt-3 text-sm text-slate-500">{language === 'zh' ? `当前预览使用: ${detailDataset.xKey} / ${detailDataset.yKey}` : `Current preview uses: ${detailDataset.xKey} / ${detailDataset.yKey}`}</div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
