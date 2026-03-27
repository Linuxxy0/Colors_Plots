import { themes } from '@/themes/themes';

export const navItems = [
  { label: 'Gallery', href: '#gallery' },
  { label: 'Themes', href: '#themes' },
  { label: 'Examples', href: '#dashboard-demo' },
  { label: 'Docs', href: '#quick-start' },
];

export const highlights = [
  {
    title: '科研配色系统',
    description: '低饱和、高对比、统一语义色，适合论文、海报、答辩与项目主页。',
  },
  {
    title: '多元图表组件',
    description: '覆盖趋势、对比、相关性、分布和多指标分析等核心科研场景。',
  },
  {
    title: '模板化布局',
    description: '提供首页、图表画廊、实验看板和研究报告页的模块化结构。',
  },
  {
    title: '导出与复用',
    description: '便于截图进 PPT、复用到 Dashboard、扩展成实验结果展示系统。',
  },
];

export const chartCards = [
  {
    key: 'line',
    title: 'Line Chart',
    tag: 'Trend',
    description: '训练过程、收敛曲线、时间序列指标变化。',
  },
  {
    key: 'bar',
    title: 'Bar Chart',
    tag: 'Comparison',
    description: '不同模型、方法或实验组横向表现对比。',
  },
  {
    key: 'heatmap',
    title: 'Heatmap',
    tag: 'Correlation',
    description: '相关矩阵、消融实验和模块贡献分析。',
  },
  {
    key: 'scatter',
    title: 'Scatter Plot',
    tag: 'Relation',
    description: '变量间关系、聚类趋势和异常点识别。',
  },
  {
    key: 'boxplot',
    title: 'Boxplot',
    tag: 'Distribution',
    description: '比较不同数据组的分布、偏态和异常值。',
  },
  {
    key: 'radar',
    title: 'Radar Chart',
    tag: 'Multi-metric',
    description: '展示多个模型在多指标上的综合能力。',
  },
];

export const kpiCards = [
  { label: 'Accuracy', value: '94.8%', delta: '+2.3%' },
  { label: 'F1 Score', value: '0.912', delta: '+0.08' },
  { label: 'Samples', value: '12,480', delta: '+1.1k' },
];

export const useCases = [
  {
    title: '实验结果对比',
    description: '快速比较不同模型、参数和数据集表现。',
  },
  {
    title: '消融实验分析',
    description: '拆解模块贡献，直观看到性能波动与提升。',
  },
  {
    title: '统计分布展示',
    description: '使用箱线图、小提琴图和散点图展示样本特性。',
  },
  {
    title: '相关性研究',
    description: '用热力图和矩阵图呈现变量之间的联系。',
  },
  {
    title: '时序实验追踪',
    description: '适合训练日志、迭代版本和长期实验监测。',
  },
  {
    title: '科研报告页面',
    description: '将图表组合为结构化的研究结果展示页面。',
  },
];

export const docsColumns = [
  {
    title: 'Docs',
    button: 'Open Docs',
    items: ['Installation', 'Theme System', 'Chart API', 'Layout Templates'],
  },
  {
    title: 'Contribution',
    button: 'Contribute',
    items: ['Code Style', 'Pull Request Guide', 'Issue Templates', 'Design Tokens'],
  },
  {
    title: 'Roadmap',
    button: 'See Plan',
    items: ['More Chart Types', 'PNG/SVG Export', 'Report Template', 'Dataset Loader'],
  },
];

export const quickStartCode = `import { LineChartCard } from '@/components/charts';

const data = [{ epoch: 1, acc: 0.71 }, { epoch: 2, acc: 0.8 }];

export default function Demo() {
  return (
    <section className="glass-card p-6">
      <LineChartCard compact title="Training Accuracy" />
    </section>
  );
}`;

export const footerLinks = ['MIT License', 'GitHub', 'Documentation', 'Contact'];

export const themeSummary = themes.map(({ name, description, palette }) => ({
  name,
  description,
  palette,
}));
