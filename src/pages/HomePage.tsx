import { routeConfig } from '@/app/routes';
import { EmptyState } from '@/components/common/EmptyState';
import { PageIntro } from '@/components/common/PageIntro';
import { StatPill } from '@/components/common/StatPill';
import { ChartCatalogCard } from '@/components/charts/ChartCatalogCard';
import { PaletteCard } from '@/components/palettes/PaletteCard';
import { chartCatalog } from '@/data/chartCatalog';
import { useAppState } from '@/context/AppStateContext';
import { themes } from '@/themes/themes';
import { routeLabels, t, themeCopy, uiText } from '@/i18n';

export function HomePage() {
  const { locale, theme, themeId, setThemeId, dataset, meta, xKey, yKey } = useAppState();
  const featuredCharts = chartCatalog.slice(0, 3);

  return (
    <div className="space-y-6">
      <PageIntro
        eyebrow={locale === 'zh' ? '资源入口' : 'Resource entry'}
        title={locale === 'zh' ? '科研配色库与图表预览平台' : 'Academic palette and chart preview library'}
        description={locale === 'zh' ? '首页现在只做入口，不再做宣传页。你可以从这里进入真实的配色库、图表库和数据实验台，并且所有页面共享当前主题与当前数据集。' : 'Home is now an entry point rather than a marketing landing page. Jump into the palette library, chart library, and dataset playground while sharing the same theme and dataset state across pages.'}
        actions={
          <>
            <a href={routeConfig.palettes.href} className="button-primary">{t(locale, uiText.openPalettes)}</a>
            <a href={routeConfig.charts.href} className="button-secondary">{t(locale, uiText.openCharts)}</a>
            <a href={routeConfig.playground.href} className="button-secondary">{t(locale, uiText.openPlayground)}</a>
          </>
        }
      />

      <section className="grid gap-4 lg:grid-cols-4">
        <StatPill label={t(locale, uiText.themeLabel)} value={t(locale, themeCopy[theme.id].name)} />
        <StatPill label={locale === 'zh' ? '当前数据集' : 'Current dataset'} value={dataset.fileName} />
        <StatPill label={t(locale, uiText.fields)} value={String(meta.keys.length)} />
        <StatPill label={locale === 'zh' ? '当前映射' : 'Preview mapping'} value={`${xKey} / ${yKey}`} />
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <a href={routeConfig.palettes.href} className="rounded-[28px] border border-slate-200/80 bg-white/88 p-8 shadow-soft transition hover:-translate-y-0.5">
          <span className="tag">{routeLabels.palettes[locale]}</span>
          <h2 className="mt-4 text-2xl font-semibold text-slate-900">{locale === 'zh' ? '按科研场景浏览配色' : 'Browse palettes by research scenario'}</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">{locale === 'zh' ? '按论文风、极简风、深色演示风筛选主题，查看迷你图表预览，并导出 CSS / JSON token。' : 'Filter themes by paper, minimal, or dark presentation styles. Preview charts and export CSS or JSON tokens.'}</p>
        </a>
        <a href={routeConfig.charts.href} className="rounded-[28px] border border-slate-200/80 bg-white/88 p-8 shadow-soft transition hover:-translate-y-0.5">
          <span className="tag">{routeLabels.charts[locale]}</span>
          <h2 className="mt-4 text-2xl font-semibold text-slate-900">{locale === 'zh' ? '按用途浏览图表' : 'Browse charts by use case'}</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">{locale === 'zh' ? '按趋势、对比、分布、相关性、多指标分类查看图表，并直接预览默认数据或上传后的数据。' : 'Filter by trend, comparison, distribution, correlation, and multi-metric use cases, then preview with sample or uploaded data.'}</p>
        </a>
      </section>

      <section className="grid gap-6 2xl:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">{locale === 'zh' ? '推荐主题' : 'Recommended palettes'}</h2>
              <p className="mt-2 text-sm text-slate-600">{locale === 'zh' ? '保留最常用的 3 套科研主题作为入口。' : 'Three frequently used scientific themes remain pinned here.'}</p>
            </div>
            <a href={routeConfig.palettes.href} className="text-sm font-medium text-slate-600 hover:text-slate-900">{t(locale, uiText.viewAll)}</a>
          </div>
          <div className="grid gap-4 xl:grid-cols-2 2xl:grid-cols-3">
            {themes.map((palette) => (
              <PaletteCard key={palette.id} theme={palette} selected={palette.id === themeId} onSelect={setThemeId} dataset={dataset} meta={meta} xKey={xKey} yKey={yKey} />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">{locale === 'zh' ? '热门图表' : 'Popular charts'}</h2>
            <p className="mt-2 text-sm text-slate-600">{locale === 'zh' ? '最常用的三类图表作为入口，默认带动态高亮和 hover 反馈。' : 'Three popular chart types as entry points, now with motion and hover feedback by default.'}</p>
          </div>
          {featuredCharts.map((chart) => (
            <ChartCatalogCard key={chart.id} chart={chart} dataset={dataset} meta={meta} xKey={xKey} yKey={yKey} theme={theme} onOpen={() => { window.location.hash = routeConfig.charts.href; }} />
          ))}
          {!featuredCharts.length ? <EmptyState title={t(locale, uiText.noCharts)} description={t(locale, uiText.noChartsDesc)} /> : null}
        </div>
      </section>
    </div>
  );
}
