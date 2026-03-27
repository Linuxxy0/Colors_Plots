import { routeConfig } from '@/app/routes';
import { EmptyState } from '@/components/common/EmptyState';
import { PageIntro } from '@/components/common/PageIntro';
import { StatPill } from '@/components/common/StatPill';
import { ChartCatalogCard } from '@/components/charts/ChartCatalogCard';
import { PaletteCard } from '@/components/palettes/PaletteCard';
import { chartCatalog } from '@/data/chartCatalog';
import { useAppState } from '@/context/AppStateContext';
import { themes } from '@/themes/themes';

export function HomePage() {
  const { theme, themeId, setThemeId, dataset, meta, xKey, yKey } = useAppState();
  const featuredCharts = chartCatalog.slice(0, 3);

  return (
    <div className="space-y-6">
      <PageIntro
        eyebrow="Resource Entry"
        title="科研配色库与图表预览平台"
        description="首页现在只做入口，不再做宣传页。你可以从这里进入真实的配色库、图表库和数据实验台，并且所有页面共享当前主题与当前数据集。"
        actions={
          <>
            <a href={routeConfig.palettes.href} className="button-primary">Open Palettes</a>
            <a href={routeConfig.charts.href} className="button-secondary">Open Charts</a>
            <a href={routeConfig.playground.href} className="button-secondary">Open Playground</a>
          </>
        }
      />

      <section className="grid gap-4 lg:grid-cols-4">
        <StatPill label="Active Theme" value={theme.name} />
        <StatPill label="Current Dataset" value={dataset.fileName} />
        <StatPill label="Fields" value={String(meta.keys.length)} />
        <StatPill label="Preview Mapping" value={`${xKey} / ${yKey}`} />
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <a href={routeConfig.palettes.href} className="rounded-[28px] border border-slate-200/80 bg-white/88 p-8 shadow-soft transition hover:-translate-y-0.5">
          <span className="tag">Palette Library</span>
          <h2 className="mt-4 text-2xl font-semibold text-slate-900">按科研场景浏览配色</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">按论文风、极简风、深色演示风筛选主题，查看迷你图表预览，并导出 CSS / JSON token。</p>
        </a>
        <a href={routeConfig.charts.href} className="rounded-[28px] border border-slate-200/80 bg-white/88 p-8 shadow-soft transition hover:-translate-y-0.5">
          <span className="tag">Chart Library</span>
          <h2 className="mt-4 text-2xl font-semibold text-slate-900">按用途浏览图表</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">按趋势、对比、分布、相关性、多指标分类查看图表，并直接预览默认数据或上传后的数据。</p>
        </a>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="space-y-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Recommended Palettes</h2>
              <p className="mt-2 text-sm text-slate-600">保留最常用的 3 套科研主题作为入口。</p>
            </div>
            <a href={routeConfig.palettes.href} className="text-sm font-medium text-slate-600 hover:text-slate-900">View all</a>
          </div>
          <div className="grid gap-4">
            {themes.map((palette) => (
              <PaletteCard
                key={palette.id}
                theme={palette}
                selected={palette.id === themeId}
                onSelect={setThemeId}
                records={dataset.records}
                xKey={xKey}
                yKey={yKey}
                numericKeys={meta.numericKeys}
              />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Popular Charts</h2>
            <p className="mt-2 text-sm text-slate-600">最常用的三类图表作为入口。</p>
          </div>
          {featuredCharts.map((chart) => (
            <ChartCatalogCard
              key={chart.id}
              chart={chart}
              records={dataset.records}
              xKey={xKey}
              yKey={yKey}
              numericKeys={meta.numericKeys}
              theme={theme}
              onOpen={() => {
                window.location.hash = routeConfig.charts.href;
              }}
            />
          ))}
          {!featuredCharts.length ? <EmptyState title="No charts yet" description="请先补充图表注册表。" /> : null}
        </div>
      </section>
    </div>
  );
}
