import { useMemo, useState } from 'react';
import { PageIntro } from '@/components/common/PageIntro';
import { ChartCatalogCard } from '@/components/charts/ChartCatalogCard';
import { ChartDetailPanel } from '@/components/charts/ChartDetailPanel';
import { chartCatalog, type ChartCategory } from '@/data/chartCatalog';
import { useAppState } from '@/context/AppStateContext';
import { t, uiText } from '@/i18n';

export function ChartsPage() {
  const { locale, dataset, meta, theme, xKey, yKey } = useAppState();
  const categoryOptions: Array<ChartCategory | 'All'> = ['All', 'Trend', 'Comparison', 'Distribution', 'Correlation', 'Multi-metric'];
  const categoryLabel = (value: ChartCategory | 'All') => {
    if (locale === 'en') return value;
    return ({ All: '全部', Trend: '趋势', Comparison: '对比', Distribution: '分布', Correlation: '相关性', 'Multi-metric': '多指标' } as const)[value];
  };
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<ChartCategory | 'All'>('All');
  const [activeChartId, setActiveChartId] = useState(chartCatalog[0]?.id ?? 'line');

  const filteredCharts = useMemo(
    () => chartCatalog.filter((chart) => {
      const matchesCategory = category === 'All' || chart.category === category;
      const matchesSearch = !search || `${chart.name} ${chart.shortDescription} ${chart.recommendedFor.join(' ')}`.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    }),
    [category, search],
  );

  return (
    <div className="space-y-6">
      <PageIntro
        eyebrow={locale === 'zh' ? '图表库' : 'Chart library'}
        title={locale === 'zh' ? '真正的图表预览页' : 'A real chart preview library'}
        description={locale === 'zh' ? '这里按用途浏览图表，而不是在首页堆一整屏组件。你可以按分类筛选、搜索、打开详情，并使用当前全局主题与数据集来实时预览。未上传数据时，每类图表会自动切到更合适的默认样例。' : 'Browse charts by use case instead of stacking all components on home. Filter, search, open details, and preview with the active theme and dataset. Without uploads, each chart falls back to a better suited sample dataset.'}
      />

      <section className="rounded-[28px] border border-slate-200/80 bg-white/88 p-6 shadow-soft">
        <div className="grid gap-4 xl:grid-cols-[1fr_auto]">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={t(locale, uiText.searchCharts)}
            className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-slate-400"
          />
          <div className="flex flex-wrap gap-3">
            {categoryOptions.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${category === item ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                {categoryLabel(item)}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 2xl:grid-cols-[1.2fr_0.8fr]">
        <div className="grid gap-5 xl:grid-cols-2 2xl:grid-cols-2">
          {filteredCharts.map((chart) => (
            <ChartCatalogCard key={chart.id} chart={chart} dataset={dataset} meta={meta} xKey={xKey} yKey={yKey} theme={theme} onOpen={setActiveChartId} />
          ))}
        </div>
        <div className="2xl:sticky 2xl:top-28 2xl:self-start">
          <ChartDetailPanel chartId={activeChartId} onClose={() => setActiveChartId(filteredCharts[0]?.id ?? activeChartId)} dataset={dataset} meta={meta} xKey={xKey} yKey={yKey} theme={theme} />
        </div>
      </section>
    </div>
  );
}
