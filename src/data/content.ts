import { themes } from '@/themes/themes';

export const navItems = [
  { label: 'Gallery', href: '#gallery' },
  { label: 'Themes', href: '#themes' },
  { label: 'Dataset', href: '#dataset-playground' },
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
    title: '默认数据开箱即用',
    description: '首页直接展示内置科研示例数据，不上传也能完整预览页面效果。',
  },
  {
    title: '拖拽上传与下载示例',
    description: '支持 CSV/JSON 拖拽上传、字段映射和示例文件下载，适合 GitHub Pages 静态托管。',
  },
];

export const chartCards = [];

export const useCases = [];

export const quickStartCode = `// 所有图表组件已被删除
// 等待新的实现`;

export const footerLinks = [
  { label: 'MIT License', href: 'https://opensource.org/license/mit' },
  { label: 'GitHub', href: 'https://github.com' },
  { label: 'Documentation', href: '#quick-start' },
  { label: 'Dataset Playground', href: '#dataset-playground' },
];

export const themeSummary = themes.map(({ name, description, palette }) => ({
  name,
  description,
  palette,
}));
