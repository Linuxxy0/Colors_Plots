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

  const filteredCharts = useMemo(
    () =>
      chartDefinitions.filter((chart) => {
        const content = `${t(chart.title, language)} ${t(chart.description, language)} ${t(chart.tag, language)}`.toLowerCase();
        return content.includes(query.toLowerCase());
      }),
    [language, query],
  );

  const selectedDefinition = chartDefinitions.find((chart) => chart.id === selected) ?? chartDefinitions[0];
  const previewDataset = getChartDataset(selectedDefinition.id);

  return (
    <div className="page-shell py-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-sm font-medium text-slate-500">{language === 'zh' ? '图表库' : 'Chart library'}</div>
          <h1 className="mt-2 text-4xl font-semibold text-slate-900">
            {language === 'zh' ? '左侧选图表，右侧看预览' : 'Select charts on the left, preview them on the right'}
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
            {language === 'zh'
              ? '默认使用各图表更合适的样例数据。鼠标悬停到图元时，底部信息会实时变化。'
              : 'Each chart uses a more suitable sample dataset. Hover chart marks to update the info panel in real time.'}
          </p>
        </div>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={language === 'zh' ? '搜索图表...' : 'Search charts...'}
          className="h-12 w-full max-w-xs rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none ring-0 placeholder:text-slate-400"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.72fr_1.28fr]">
        <section className="space-y-4">
          {filteredCharts.map((chart) => {
            const dataset = getChartDataset(chart.id);
            const active = selected === chart.id;
            return (
              <article
                key={chart.id}
                className="rounded-[30px] border bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.05)] transition"
                style={{ borderColor: active ? currentTheme.foreground : '#E2E8F0' }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-3xl font-semibold text-slate-900">{t(chart.title, language)}</div>
                    <p className="mt-2 text-base leading-7 text-slate-500">{t(chart.description, language)}</p>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
                    {t(chart.tag, language)}
                  </span>
                </div>
                <div className="mt-5">
                  <ChartPreview
                    chartId={chart.id}
                    records={dataset.records}
                    xKey={dataset.xKey}
                    yKey={dataset.yKey}
                    theme={currentTheme}
                    mode="card"
                  />
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {chart.useCases.map((item) => (
                    <span key={item.en} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
                      {t(item, language)}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex items-center justify-between gap-3 text-sm text-slate-500">
                  <span>{t(chart.fieldRequirement, language)}</span>
                  <button
                    type="button"
                    onClick={() => setSelected(chart.id)}
                    className="rounded-2xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-800"
                  >
                    {language === 'zh' ? '切换预览' : 'Preview'}
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
                <div className="text-sm font-medium text-slate-500">{language === 'zh' ? '当前预览' : 'Current preview'}</div>
                <h2 className="mt-2 text-4xl font-semibold text-slate-900">{t(selectedDefinition.title, language)}</h2>
                <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">{t(selectedDefinition.description, language)}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 px-5 py-3 font-semibold text-slate-700">
                {language === 'zh' ? '悬停查看变化' : 'Hover to inspect'}
              </div>
            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-3">
              <div className="rounded-[24px] bg-slate-50 p-5">
                <div className="text-sm font-medium text-slate-500">{language === 'zh' ? '数据来源' : 'Data source'}</div>
                <div className="mt-3 text-lg font-semibold text-slate-900">
                  {previewDataset.source === 'upload'
                    ? language === 'zh'
                      ? '上传数据'
                      : 'Uploaded dataset'
                    : language === 'zh'
                      ? '默认样例'
                      : 'Built-in sample'}
                </div>
                <div className="mt-2 text-sm text-slate-500">
                  {previewDataset.source === 'upload'
                    ? previewDataset.fileName
                    : language === 'zh'
                      ? '为当前图表单独准备'
                      : 'Prepared specifically for this chart'}
                </div>
              </div>
              <div className="rounded-[24px] bg-slate-50 p-5">
                <div className="text-sm font-medium text-slate-500">{language === 'zh' ? '字段组合' : 'Field mapping'}</div>
                <div className="mt-3 text-lg font-semibold text-slate-900">{previewDataset.xKey} / {previewDataset.yKey}</div>
                <div className="mt-2 text-sm text-slate-500">{t(selectedDefinition.fieldRequirement, language)}</div>
              </div>
              <div className="rounded-[24px] bg-slate-50 p-5">
                <div className="text-sm font-medium text-slate-500">{language === 'zh' ? '适用场景' : 'Use cases'}</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedDefinition.useCases.map((item) => (
                    <span key={item.en} className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-500">
                      {t(item, language)}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-[24px] border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-500">
              {previewDataset.source === 'upload'
                ? language === 'zh'
                  ? `当前正在使用你上传的数据：${previewDataset.fileName}`
                  : `Currently using your uploaded dataset: ${previewDataset.fileName}`
                : language === 'zh'
                  ? '当前使用为该图表单独准备的默认样例数据。把鼠标放到图元上，下面数值会立即变化。'
                  : 'Currently using a built-in sample dataset for this chart. Hover the chart marks to update the values below.'}
            </div>

            <div className="mt-6">
              <ChartPreview
                chartId={selectedDefinition.id}
                records={previewDataset.records}
                xKey={previewDataset.xKey}
                yKey={previewDataset.yKey}
                theme={currentTheme}
                mode="detail"
              />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
