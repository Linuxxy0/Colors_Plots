import { Link } from 'react-router-dom';
import { ChartPreview } from '@/components/charts';
import { useAppContext } from '@/context/AppContext';
import { chartDefinitions, homeStats } from '@/data/library';
import { t } from '@/utils/i18n';

export function HomePage() {
  const { language, currentTheme, getChartDataset, uploadState } = useAppContext();
  const previewCharts = chartDefinitions.slice(0, 3);

  return (
    <div className="page-shell py-12">
      {/* 标题区域 */}
      <div className="mb-12 max-w-4xl">
        <h1 className="text-5xl font-semibold tracking-tight text-slate-900">
          {language === 'zh' ? 'SciVizLab' : 'SciVizLab'}
        </h1>
        <p className="mt-4 text-xl text-slate-600">
          {language === 'zh' 
            ? '一个为科研工作者设计的可视化工具库'
            : 'A visualization toolkit designed for researchers'}
        </p>
      </div>

      {/* 快速导航与统计 */}
      <div className="mb-12 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <div className="mb-4 text-sm font-medium text-slate-500">
            {language === 'zh' ? '快速开始' : 'Quick start'}
          </div>
          <div className="flex flex-wrap gap-3">
            <Link 
              to="/palettes" 
              className="rounded-2xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              {language === 'zh' ? '配色库' : 'Palettes'}
            </Link>
            <Link 
              to="/charts" 
              className="rounded-2xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            >
              {language === 'zh' ? '图表库' : 'Charts'}
            </Link>
            <Link 
              to="/playground" 
              className="rounded-2xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            >
              {language === 'zh' ? '数据实验' : 'Playground'}
            </Link>
          </div>
        </div>

        <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
          <div className="text-sm text-slate-500">{language === 'zh' ? '当前数据' : 'Current dataset'}</div>
          <div className="mt-2 font-medium text-slate-900">
            {uploadState.source === 'upload' ? uploadState.fileName : language === 'zh' ? '系统内置样例' : 'Built-in samples'}
          </div>
        </div>
      </div>

      {/* 图表预览 */}
      <div className="mb-12">
        <div className="mb-6 text-sm font-medium text-slate-500">
          {language === 'zh' ? '图表示例' : 'Chart examples'}
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {previewCharts.map((chart) => {
            const dataset = getChartDataset(chart.id);
            return (
              <Link 
                key={chart.id}
                to="/charts"
                className="group rounded-[24px] border border-slate-200 bg-white p-5 transition hover:border-slate-300 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex-1">
                    <div className="font-medium text-slate-900">{t(chart.title, language)}</div>
                    <div className="mt-1 text-xs text-slate-500">{t(chart.description, language)}</div>
                  </div>
                  <span className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-500 flex-shrink-0">
                    {t(chart.tag, language)}
                  </span>
                </div>
                <div className="rounded-[16px] border border-slate-200 bg-slate-50 p-3 h-32">
                  <ChartPreview 
                    chartId={chart.id} 
                    records={dataset.records} 
                    xKey={dataset.xKey} 
                    yKey={dataset.yKey} 
                    theme={currentTheme} 
                    mode="card" 
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* 功能介绍 */}
      <div className="border-t border-slate-200 pt-12">
        <div className="mb-6 text-sm font-medium text-slate-500">
          {language === 'zh' ? '功能与特点' : 'Features'}
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="font-medium text-slate-900">
              {language === 'zh' ? '精选配色' : 'Curated Palettes'}
            </div>
            <p className="mt-2 text-sm text-slate-600">
              {language === 'zh'
                ? '为学术出版设计的高质量色板, 适配Nature、Science等顶级期刊'
                : 'High-quality color palettes designed for academic publishing'}
            </p>
          </div>
          <div>
            <div className="font-medium text-slate-900">
              {language === 'zh' ? '丰富图表' : 'Chart Library'}
            </div>
            <p className="mt-2 text-sm text-slate-600">
              {language === 'zh'
                ? '常用的科研可视化图表, 开箱即用的交互体验'
                : 'Common research visualization charts with built-in interaction'}
            </p>
          </div>
          <div>
            <div className="font-medium text-slate-900">
              {language === 'zh' ? '数据实验' : 'Data Playground'}
            </div>
            <p className="mt-2 text-sm text-slate-600">
              {language === 'zh'
                ? '快速上传和预览数据, 无需编码即可生成可视化'
                : 'Upload and visualize data instantly without coding'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
