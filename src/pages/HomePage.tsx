import { Link } from 'react-router-dom';
import { ChartPreview } from '@/components/charts';
import { useAppContext } from '@/context/AppContext';
import { chartDefinitions, homeStats } from '@/data/library';
import { t } from '@/utils/i18n';

export function HomePage() {
  const { language, currentTheme, getChartDataset, uploadState } = useAppContext();
  const previewCharts = chartDefinitions.slice(0, 3);

  return (
    <div className="page-shell py-8">
      <section className="grid gap-6 xl:grid-cols-[1fr_1.25fr]">
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.05)]">
          <div className="inline-flex rounded-full border border-slate-200 px-3 py-1 text-xs font-medium tracking-[0.18em] text-slate-500">
            {language === 'zh' ? '科研配色库与图表预览' : 'Academic palette & chart library'}
          </div>
          <h1 className="mt-5 text-5xl font-semibold tracking-tight text-slate-900">
            {language === 'zh' ? '真正像资源库的科研可视化站点' : 'A library-style home for research visualization'}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            {language === 'zh'
              ? '首页只做入口；真正的配色浏览、图表预览和数据实验都拆成独立页面。默认中文，可一键切换英文。'
              : 'The home page is only an entry. Palette browsing, chart preview, and dataset playground are split into dedicated pages with instant language switching.'}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/palettes" className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800">{language === 'zh' ? '进入配色库' : 'Open palettes'}</Link>
            <Link to="/charts" className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">{language === 'zh' ? '进入图表库' : 'Open charts'}</Link>
            <Link to="/playground" className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">{language === 'zh' ? '进入实验台' : 'Open playground'}</Link>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {homeStats.map((item) => (
              <div key={item.value} className="rounded-[24px] bg-slate-50 p-4">
                <div className="text-sm text-slate-500">{t(item.title, language)}</div>
                <div className="mt-2 text-2xl font-semibold text-slate-900">{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {previewCharts.map((chart) => {
            const dataset = getChartDataset(chart.id);
            return (
              <div key={chart.id} className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.05)]">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-semibold text-slate-900">{t(chart.title, language)}</div>
                    <div className="mt-1 text-sm text-slate-500">{t(chart.description, language)}</div>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">{t(chart.tag, language)}</span>
                </div>
                <ChartPreview chartId={chart.id} records={dataset.records} xKey={dataset.xKey} yKey={dataset.yKey} theme={currentTheme} mode="card" />
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-8 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[32px] border border-slate-200 bg-white p-7 shadow-[0_20px_60px_rgba(15,23,42,0.05)]">
          <div className="text-sm font-medium text-slate-500">{language === 'zh' ? '当前状态' : 'Current status'}</div>
          <div className="mt-3 text-3xl font-semibold text-slate-900">{uploadState.source === 'upload' ? uploadState.fileName : language === 'zh' ? '当前使用内置默认数据' : 'Using built-in default datasets'}</div>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
            {language === 'zh'
              ? '不同图表会在默认状态下使用更合适的样例数据；上传数据后，图表库与实验台都会同步改用你的数据。'
              : 'Each chart uses a more suitable built-in dataset by default. After upload, the chart library and playground switch to your data together.'}
          </p>
        </div>
        <div className="rounded-[32px] border border-slate-200 bg-white p-7 shadow-[0_20px_60px_rgba(15,23,42,0.05)]">
          <div className="text-sm font-medium text-slate-500">{language === 'zh' ? '项目方式' : 'Project style'}</div>
          <ul className="mt-4 space-y-3 text-base leading-7 text-slate-700">
            <li>{language === 'zh' ? '首页只做入口，不再是宣传页。' : 'Home is only an entry point, not a marketing page.'}</li>
            <li>{language === 'zh' ? '配色页强调真实主题预览，而不是图表动效。' : 'The palettes page focuses on real theme preview, not chart motion.'}</li>
            <li>{language === 'zh' ? '图表交互基于鼠标悬停动态反馈。' : 'Chart interaction is driven by hover-based dynamic feedback.'}</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
