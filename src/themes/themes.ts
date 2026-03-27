import type { ThemePalette } from '@/types/app';

export const themes: ThemePalette[] = [
  {
    id: 'classic-paper',
    name: { zh: '经典论文蓝', en: 'Classic Paper' },
    description: {
      zh: '低饱和蓝灰科研主题，适合论文插图、结果图与实验汇报。',
      en: 'Low-saturation blue-gray theme for papers, result figures, and research reporting.',
    },
    usage: { zh: '论文插图 / benchmark 结果', en: 'Paper figures / benchmark results' },
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
      { zh: '白底', en: 'Light background' },
    ],
  },
  {
    id: 'nature-minimal',
    name: { zh: '极简自然白', en: 'Nature Minimal' },
    description: {
      zh: '留白更多、对比克制，适合配色库、图表画廊与叙事化研究展示。',
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
      { zh: '画廊', en: 'Gallery' },
    ],
  },
  {
    id: 'lab-dark',
    name: { zh: '实验室深色', en: 'Lab Dark' },
    description: {
      zh: '适合答辩投屏与深色工作台，强调亮色线条和科技感分层。',
      en: 'Presentation-first dark theme with bright accents for lab meetings and dark dashboards.',
    },
    usage: { zh: '演示投屏 / 深色面板', en: 'Presentation / dark dashboard' },
    background: '#101826',
    panel: '#182335',
    foreground: '#EAF1F8',
    muted: '#95A9BE',
    accent: '#76A8FF',
    success: '#5BD3C8',
    warm: '#F0B66B',
    palette: ['#7DAAF9', '#5ED4DD', '#A287FF', '#F2BE72', '#344154'],
    tags: [
      { zh: '深色', en: 'Dark' },
      { zh: '投屏', en: 'Projection' },
      { zh: '高对比', en: 'High contrast' },
    ],
  },
];

export const defaultThemeId = themes[0].id;
