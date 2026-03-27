import { useMemo, useState } from 'react';
import { PageIntro } from '@/components/common/PageIntro';
import { ChartCatalogCard } from '@/components/charts/ChartCatalogCard';
import { ChartDetailPanel } from '@/components/charts/ChartDetailPanel';
import { chartCatalog, type ChartCategory } from '@/data/chartCatalog';
import { useAppState } from '@/context/AppStateContext';

const categoryOptions: Array<ChartCategory | 'All'> = ['All', 'Trend', 'Comparison', 'Distribution', 'Correlation', 'Multi-metric'];

export function ChartsPage() {
  const { dataset, meta, theme, xKey, yKey } = useAppState();
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
        eyebrow="Chart Library"
        title="真正的图表预览页"
        description="这里按用途浏览图表，而不是在首页堆一整屏组件。你可以按分类筛选、搜索、打开详情，并使用当前全局主题与数据集来实时预览。"
      />

      <section className="rounded-[28px] border border-slate-200/80 bg-white/88 p-6 shadow-soft">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="搜索图表名称、用途或场景"
            className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-slate-400"
          />
          <div className="flex flex-wrap gap-3">
            {categoryOptions.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${category === item ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="grid gap-5 lg:grid-cols-2">
          {filteredCharts.map((chart) => (
            <ChartCatalogCard
              key={chart.id}
              chart={chart}
              records={dataset.records}
              xKey={xKey}
              yKey={yKey}
              numericKeys={meta.numericKeys}
              theme={theme}
              onOpen={setActiveChartId}
            />
          ))}
        </div>
        <div className="xl:sticky xl:top-28 xl:self-start">
          <ChartDetailPanel
            chartId={activeChartId}
            onClose={() => setActiveChartId(filteredCharts[0]?.id ?? activeChartId)}
            records={dataset.records}
            xKey={xKey}
            yKey={yKey}
            numericKeys={meta.numericKeys}
            theme={theme}
          />
        </div>
      </section>
    </div>
  );
}
