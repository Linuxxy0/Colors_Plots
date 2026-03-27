export type Locale = 'zh' | 'en';
export type LocalizedText = { zh: string; en: string };
export type LocalizedList = { zh: string[]; en: string[] };

export const uiText = {
  appSubtitle: { zh: '科研配色库与图表预览平台', en: 'Academic palette and chart library' },
  themeLabel: { zh: '当前主题', en: 'Active theme' },
  languageLabel: { zh: '语言', en: 'Language' },
  chinese: { zh: '中文', en: '中文' },
  english: { zh: 'English', en: 'English' },
  github: { zh: 'GitHub', en: 'GitHub' },
  openDetail: { zh: '查看详情', en: 'Open detail' },
  close: { zh: '关闭', en: 'Close' },
  preview: { zh: '预览', en: 'Preview' },
  live: { zh: '动态', en: 'Live' },
  auto: { zh: '自动', en: 'Auto' },
  interactive: { zh: '交互', en: 'Interactive' },
  uploadReady: { zh: '可上传', en: 'Upload-ready' },
  datasetBadge: { zh: '数据集', en: 'Dataset' },
  uploadBadge: { zh: '上传', en: 'Upload' },
  defaultDataset: { zh: '默认数据', en: 'Default data' },
  uploadedDataset: { zh: '已上传', en: 'Uploaded' },
  copyTokens: { zh: '复制 CSS 变量', en: 'Copy CSS tokens' },
  exportJson: { zh: '导出 JSON', en: 'Export JSON' },
  recommendedScenes: { zh: '推荐场景', en: 'Recommended scenes' },
  themeDetail: { zh: '主题详情', en: 'Theme detail' },
  chartDetail: { zh: '图表详情', en: 'Chart detail' },
  bestFor: { zh: '适用场景', en: 'Best for' },
  fieldRequirement: { zh: '字段要求', en: 'Field requirement' },
  currentPreviewUses: { zh: '当前预览使用', en: 'Current preview uses' },
  datasetSummary: { zh: '数据概览', en: 'Dataset summary' },
  records: { zh: '记录数', en: 'Records' },
  latest: { zh: '最新值', en: 'Latest' },
  average: { zh: '平均值', en: 'Average' },
  fields: { zh: '字段数', en: 'Fields' },
  xField: { zh: 'X 字段', en: 'X field' },
  yField: { zh: 'Y 字段', en: 'Y field' },
  theme: { zh: '主题', en: 'Theme' },
  selectFile: { zh: '选择文件', en: 'Choose file' },
  resetDataset: { zh: '恢复默认数据', en: 'Reset to sample' },
  downloadSampleCsv: { zh: '下载示例 CSV', en: 'Download sample CSV' },
  downloadSampleJson: { zh: '下载示例 JSON', en: 'Download sample JSON' },
  dragDrop: { zh: '拖拽 CSV / JSON 到这里', en: 'Drop CSV / JSON here' },
  uploadHint: { zh: '上传后会同步刷新图表库、配色预览和数据实验台。', en: 'Uploading refreshes the chart library, palette previews, and playground together.' },
  currentFile: { zh: '当前文件', en: 'Current file' },
  setGlobalTheme: { zh: '设为全局主题', en: 'Set as global theme' },
  activeThemeButton: { zh: '当前主题', en: 'Active theme' },
  openPalettes: { zh: '进入配色库', en: 'Open palettes' },
  openCharts: { zh: '进入图表库', en: 'Open charts' },
  openPlayground: { zh: '进入实验台', en: 'Open playground' },
  viewAll: { zh: '查看全部', en: 'View all' },
  searchCharts: { zh: '搜索图表名称、用途或场景', en: 'Search chart names, use cases, or scenarios' },
  livePreview: { zh: '实时预览', en: 'Live preview' },
  currentChartPreview: { zh: '当前图表预览', en: 'Current chart preview' },
  noCharts: { zh: '暂无图表', en: 'No charts yet' },
  noChartsDesc: { zh: '请先补充图表注册表。', en: 'Add chart definitions to the catalog first.' },
  sampleSourceNote: { zh: '未上传数据时，每类图表会使用更合适的默认样例数据。', en: 'When nothing is uploaded, each chart uses a more suitable default sample dataset.' },
  hoverTip: { zh: '将鼠标悬停到图元上查看动态信息。', en: 'Hover over marks to inspect live values.' },
  paletteFilters: { zh: '主题筛选', en: 'Palette filters' },
} as const;

export const routeLabels = {
  home: { zh: '首页', en: 'Home' },
  palettes: { zh: '配色库', en: 'Palettes' },
  charts: { zh: '图表库', en: 'Charts' },
  playground: { zh: '实验台', en: 'Playground' },
} as const;

export const themeCopy: Record<string, { name: LocalizedText; description: LocalizedText; category: LocalizedText; recommendedFor: LocalizedList; accessibility: LocalizedText }> = {
  'classic-paper': {
    name: { zh: '经典论文蓝', en: 'Classic Paper' },
    description: { zh: '低饱和蓝灰配色，适合论文插图、benchmark 对比和可复现实验图。', en: 'Low-saturation blue-gray palette for papers, benchmark plots, and reproducible figures.' },
    category: { zh: '论文风', en: 'Paper' },
    recommendedFor: { zh: ['论文插图', 'benchmark 对比', '实验报告'], en: ['Paper figures', 'Benchmark comparison', 'Experiment reports'] },
    accessibility: { zh: '标准对比', en: 'Standard contrast' },
  },
  'nature-minimal': {
    name: { zh: '自然极简', en: 'Nature Minimal' },
    description: { zh: '高留白、克制对比与清爽色阶，适合项目主页和研究叙事型展示。', en: 'High whitespace and restrained contrast for elegant scientific storytelling.' },
    category: { zh: '极简风', en: 'Minimal' },
    recommendedFor: { zh: ['项目首页', '图表画廊', '研究叙事'], en: ['Project homepage', 'Chart gallery', 'Research storytelling'] },
    accessibility: { zh: '标准对比', en: 'Standard contrast' },
  },
  'lab-dark': {
    name: { zh: '实验室深色', en: 'Lab Dark' },
    description: { zh: '面向投屏和答辩演示的深色主题，突出重点数据与结构层次。', en: 'Presentation-first dark mode for demos, projector slides, and lab meetings.' },
    category: { zh: '深色风', en: 'Dark' },
    recommendedFor: { zh: ['答辩投屏', 'lab meeting', '深色 dashboard'], en: ['Projected slides', 'Lab meetings', 'Dark dashboards'] },
    accessibility: { zh: '高对比', en: 'High contrast' },
  },
};

export const chartCopy: Record<string, { name: LocalizedText; category: LocalizedText; description: LocalizedText; recommendedFor: LocalizedList; supportedFields: LocalizedText; title?: LocalizedText }> = {
  line: {
    name: { zh: '折线图', en: 'Line Chart' },
    category: { zh: '趋势', en: 'Trend' },
    description: { zh: '适合训练过程、收敛曲线、时间序列实验追踪。', en: 'Best for training curves, convergence, and time-series experiments.' },
    recommendedFor: { zh: ['训练趋势', '收敛曲线', 'epoch 对比'], en: ['Training trend', 'Convergence', 'Epoch comparison'] },
    supportedFields: { zh: '横轴 + 数值纵轴', en: 'x + numeric y' },
    title: { zh: '训练趋势', en: 'Training Trend' },
  },
  bar: {
    name: { zh: '柱状图', en: 'Bar Chart' },
    category: { zh: '对比', en: 'Comparison' },
    description: { zh: '适合不同模型、实验组或方法的横向对比。', en: 'Best for comparing models, experiment groups, and methods.' },
    recommendedFor: { zh: ['模型对比', 'benchmark', 'ablation'], en: ['Model comparison', 'Benchmark', 'Ablation'] },
    supportedFields: { zh: '类别横轴 + 数值纵轴', en: 'categorical x + numeric y' },
    title: { zh: '模型对比', en: 'Model Comparison' },
  },
  heatmap: {
    name: { zh: '热力图', en: 'Heatmap' },
    category: { zh: '相关性', en: 'Correlation' },
    description: { zh: '适合相关矩阵、模块交互与消融实验矩阵。', en: 'Best for correlation matrices, module interactions, and ablation maps.' },
    recommendedFor: { zh: ['相关性', '实验矩阵', '特征分析'], en: ['Correlation', 'Experiment matrix', 'Feature analysis'] },
    supportedFields: { zh: '多个数值字段', en: 'multiple numeric fields' },
    title: { zh: '相关性热力图', en: 'Correlation Heatmap' },
  },
  scatter: {
    name: { zh: '散点图', en: 'Scatter Plot' },
    category: { zh: '相关性', en: 'Correlation' },
    description: { zh: '适合观察变量关系、离群点和聚类趋势。', en: 'Best for variable relationships, outliers, and clustering trends.' },
    recommendedFor: { zh: ['相关性', '离群点', '分布关系'], en: ['Correlation', 'Outliers', 'Distribution relation'] },
    supportedFields: { zh: '数值横轴 + 数值纵轴', en: 'numeric x + numeric y' },
    title: { zh: '变量关系', en: 'Scatter Plot' },
  },
  boxplot: {
    name: { zh: '箱线图', en: 'Boxplot' },
    category: { zh: '分布', en: 'Distribution' },
    description: { zh: '适合比较不同数值字段的分布、偏态与异常点。', en: 'Best for comparing distributions, skewness, and outliers across metrics.' },
    recommendedFor: { zh: ['分布比较', '异常点', '方差观察'], en: ['Distribution comparison', 'Outliers', 'Variance'] },
    supportedFields: { zh: '多个数值字段', en: 'multiple numeric fields' },
    title: { zh: '分布比较', en: 'Boxplot' },
  },
  radar: {
    name: { zh: '雷达图', en: 'Radar Chart' },
    category: { zh: '多指标', en: 'Multi-metric' },
    description: { zh: '适合多指标综合能力的整体展示。', en: 'Best for holistic multi-metric capability overviews.' },
    recommendedFor: { zh: ['多指标评估', '模型画像', '能力总览'], en: ['Multi-metric evaluation', 'Model profile', 'Capability overview'] },
    supportedFields: { zh: '多个数值字段', en: 'multiple numeric fields' },
    title: { zh: '多指标概览', en: 'Radar Chart' },
  },
};

export function t(locale: Locale, text: LocalizedText): string {
  return text[locale];
}

export function tl(locale: Locale, text: LocalizedList): string[] {
  return text[locale];
}
