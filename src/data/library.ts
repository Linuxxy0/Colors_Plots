import type { ChartDefinition, ChartKind, DatasetRecord, LocalizedText } from '@/types/app';

export const chartDefinitions: ChartDefinition[] = [
  {
    id: 'line',
    title: { zh: '折线图', en: 'Line Chart' },
    shortTitle: { zh: '趋势', en: 'Trend' },
    description: {
      zh: '适合训练过程、收敛曲线、时间序列实验追踪。',
      en: 'Best for training curves, convergence, and time-series experiment tracking.',
    },
    tag: { zh: '趋势', en: 'Trend' },
    useCases: [
      { zh: '训练趋势', en: 'Training trend' },
      { zh: '收敛曲线', en: 'Convergence' },
      { zh: 'epoch 对比', en: 'Epoch comparison' },
    ],
    fieldRequirement: { zh: '横轴 + 数值纵轴', en: 'X axis + numeric Y axis' },
    defaultXKey: 'epoch',
    defaultYKey: 'score',
  },
  {
    id: 'bar',
    title: { zh: '柱状图', en: 'Bar Chart' },
    shortTitle: { zh: '对比', en: 'Comparison' },
    description: {
      zh: '适合不同模型、实验组或方法的横向对比。',
      en: 'Best for comparing models, ablations, and experimental groups.',
    },
    tag: { zh: '对比', en: 'Compare' },
    useCases: [
      { zh: '模型对比', en: 'Model comparison' },
      { zh: 'benchmark', en: 'Benchmark' },
      { zh: 'ablation', en: 'Ablation' },
    ],
    fieldRequirement: { zh: '类别横轴 + 数值纵轴', en: 'Categorical X + numeric Y' },
    defaultXKey: 'model',
    defaultYKey: 'accuracy',
  },
  {
    id: 'heatmap',
    title: { zh: '热力图', en: 'Heatmap' },
    shortTitle: { zh: '相关性', en: 'Correlation' },
    description: {
      zh: '适合相关矩阵、模块交互与消融实验矩阵。',
      en: 'Best for correlation matrices, module interactions, and ablation grids.',
    },
    tag: { zh: '相关性', en: 'Correlation' },
    useCases: [
      { zh: '相关矩阵', en: 'Correlation matrix' },
      { zh: '模块影响', en: 'Module impact' },
      { zh: '消融矩阵', en: 'Ablation matrix' },
    ],
    fieldRequirement: { zh: '多列数值字段', en: 'Multiple numeric fields' },
    defaultXKey: 'robustness',
    defaultYKey: 'efficiency',
  },
  {
    id: 'scatter',
    title: { zh: '散点图', en: 'Scatter Plot' },
    shortTitle: { zh: '关系', en: 'Relation' },
    description: {
      zh: '适合观察变量关系、离群点和聚类趋势。',
      en: 'Best for variable relationships, clusters, and outlier spotting.',
    },
    tag: { zh: '关系', en: 'Relation' },
    useCases: [
      { zh: '变量关系', en: 'Variable relation' },
      { zh: '离群点', en: 'Outliers' },
      { zh: '聚类趋势', en: 'Cluster trend' },
    ],
    fieldRequirement: { zh: '数值横轴 + 数值纵轴', en: 'Numeric X + numeric Y' },
    defaultXKey: 'params_m',
    defaultYKey: 'latency',
  },
  {
    id: 'boxplot',
    title: { zh: '箱线图', en: 'Boxplot' },
    shortTitle: { zh: '分布', en: 'Distribution' },
    description: {
      zh: '适合比较不同实验组的分布、波动与异常值。',
      en: 'Best for distributions, variance, and outliers across groups.',
    },
    tag: { zh: '分布', en: 'Distribution' },
    useCases: [
      { zh: '组间分布', en: 'Group distribution' },
      { zh: '稳定性', en: 'Stability' },
      { zh: '异常值', en: 'Outliers' },
    ],
    fieldRequirement: { zh: '类别字段 + 数值字段', en: 'Category field + numeric field' },
    defaultXKey: 'group',
    defaultYKey: 'score',
  },
  {
    id: 'radar',
    title: { zh: '雷达图', en: 'Radar Chart' },
    shortTitle: { zh: '多指标', en: 'Multi-metric' },
    description: {
      zh: '适合展示单个模型或配置的多维指标轮廓。',
      en: 'Best for showing multi-metric profiles of one model or configuration.',
    },
    tag: { zh: '多指标', en: 'Multi-metric' },
    useCases: [
      { zh: '综合能力', en: 'Overall ability' },
      { zh: '多维指标', en: 'Multi metrics' },
      { zh: '模型画像', en: 'Model profile' },
    ],
    fieldRequirement: { zh: '多列数值字段', en: 'Multiple numeric fields' },
    defaultXKey: 'accuracy',
    defaultYKey: 'f1',
  },
];

export const paletteFilters = {
  style: [
    { zh: '全部', en: 'All', value: 'all' },
    { zh: '论文风', en: 'Paper', value: 'paper' },
    { zh: '极简', en: 'Minimal', value: 'minimal' },
    { zh: '深色', en: 'Dark', value: 'dark' },
  ],
};

export const defaultDatasets: Record<ChartKind, DatasetRecord[]> = {
  line: [
    { epoch: 2, score: 0.46, loss: 1.24 },
    { epoch: 6, score: 0.49, loss: 1.12 },
    { epoch: 10, score: 0.53, loss: 0.98 },
    { epoch: 14, score: 0.57, loss: 0.86 },
    { epoch: 18, score: 0.6, loss: 0.74 },
    { epoch: 22, score: 0.62, loss: 0.66 },
    { epoch: 28, score: 0.64, loss: 0.61 },
  ],
  bar: [
    { model: 'CNN', accuracy: 0.86 },
    { model: 'ViT', accuracy: 0.89 },
    { model: 'GNN', accuracy: 0.84 },
    { model: 'RF', accuracy: 0.78 },
    { model: 'MLP', accuracy: 0.82 },
  ],
  heatmap: [
    { robustness: 0.86, efficiency: 0.72, interpretability: 0.67, generalization: 0.81 },
    { robustness: 0.78, efficiency: 0.68, interpretability: 0.74, generalization: 0.75 },
    { robustness: 0.91, efficiency: 0.77, interpretability: 0.62, generalization: 0.85 },
    { robustness: 0.83, efficiency: 0.71, interpretability: 0.7, generalization: 0.8 },
  ],
  scatter: [
    { model: 'A', params_m: 22, latency: 64, accuracy: 0.84 },
    { model: 'B', params_m: 30, latency: 73, accuracy: 0.87 },
    { model: 'C', params_m: 38, latency: 79, accuracy: 0.89 },
    { model: 'D', params_m: 44, latency: 91, accuracy: 0.9 },
    { model: 'E', params_m: 54, latency: 99, accuracy: 0.92 },
    { model: 'F', params_m: 62, latency: 112, accuracy: 0.94 },
  ],
  boxplot: [
    { group: 'Baseline', score: 0.64 },
    { group: 'Baseline', score: 0.67 },
    { group: 'Baseline', score: 0.62 },
    { group: 'Baseline', score: 0.69 },
    { group: 'Ours', score: 0.74 },
    { group: 'Ours', score: 0.79 },
    { group: 'Ours', score: 0.76 },
    { group: 'Ours', score: 0.81 },
    { group: 'Ensemble', score: 0.72 },
    { group: 'Ensemble', score: 0.75 },
    { group: 'Ensemble', score: 0.77 },
    { group: 'Ensemble', score: 0.8 },
  ],
  radar: [
    { accuracy: 0.91, f1: 0.88, precision: 0.9, recall: 0.86, robustness: 0.79, efficiency: 0.83 },
    { accuracy: 0.93, f1: 0.9, precision: 0.91, recall: 0.89, robustness: 0.82, efficiency: 0.85 },
  ],
};

export const homeStats: { title: LocalizedText; value: string }[] = [
  { title: { zh: '科研主题', en: 'Research themes' }, value: '3' },
  { title: { zh: '图表类型', en: 'Chart types' }, value: '6' },
  { title: { zh: '上传格式', en: 'Upload formats' }, value: 'CSV / JSON' },
];
