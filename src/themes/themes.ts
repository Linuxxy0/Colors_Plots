export type { ThemePalette } from '@/types/app';
import type { ThemePalette } from '@/types/app';

export const themes: ThemePalette[] = [
  {
    id: 'classic-paper',
    name: { zh: '经典论文蓝', en: 'Classic Paper' },
    description: {
      zh: '低饱和蓝灰研究主题，适合论文插图、结果展示和实验汇报。',
      en: 'Low-saturation blue-gray theme for papers, result figures, and research reporting.',
    },
    usage: { zh: '论文插图 / Benchmark 结果', en: 'Paper figures / benchmark results' },
    background: '#F7FAFC',
    panel: '#FFFFFF',
    foreground: '#17324A',
    muted: '#6C7D90',
    accent: '#2B517E',
    success: '#4B8F8C',
    warm: '#D4B15A',
    palette: ['#1F3A5F', '#2C5F8A', '#4F82A8', '#C8D5E1', '#E3C56B'],
    tags: [
      { zh: '论文风', en: 'Paper style' },
      { zh: '低饱和', en: 'Low saturation' },
      { zh: '浅色背景', en: 'Light background' },
    ],
  },
  {
    id: 'nature-minimal',
    name: { zh: '自然极简', en: 'Nature Minimal' },
    description: {
      zh: '高留白、克制对比的配色，适合项目主页、图表画廊和叙事型展示。',
      en: 'High whitespace and restrained contrast for palette libraries, chart galleries, and narrative research.',
    },
    usage: { zh: '图表库 / 项目主页', en: 'Chart library / project home' },
    background: '#FAFBF7',
    panel: '#FFFFFF',
    foreground: '#243340',
    muted: '#7D8B97',
    accent: '#446C96',
    success: '#6C9A9B',
    warm: '#D7B771',
    palette: ['#2A4A77', '#5D83A9', '#8EAFCC', '#D9E3E7', '#E3C27D'],
    tags: [
      { zh: '极简', en: 'Minimal' },
      { zh: '高留白', en: 'High whitespace' },
      { zh: '画廊感', en: 'Gallery' },
    ],
  },
  {
    id: 'elegant-serif',
    name: { zh: '雅致衬线', en: 'Elegant Serif' },
    description: {
      zh: '经典期刊风格，柔和的浅色系配合深色文字，适合高端学术报告和期刊投稿。',
      en: 'Classic journal style with soft pastels for academic presentations and publications.',
    },
    usage: { zh: '期刊投稿 / 学术报告', en: 'Journal submission / academic talk' },
    background: '#FDFBF7',
    panel: '#FEFDFB',
    foreground: '#2D2620',
    muted: '#8B8680',
    accent: '#A85A3A',
    success: '#5D8B6A',
    warm: '#C89858',
    palette: ['#9B7563', '#D4A574', '#E8C4B0', '#F8EEE4', '#F5F0EB'],
    tags: [
      { zh: '期刊风', en: 'Journal' },
      { zh: '柔和', en: 'Soft' },
      { zh: '高级', en: 'Elegant' },
    ],
  },
];

export const defaultThemeId = themes[0].id;
