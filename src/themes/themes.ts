export type PaletteFamily = 'sequential' | 'diverging' | 'qualitative';
export type PaletteSource = 'scientific' | 'classic' | 'custom';

export type ThemePalette = {
  id: string;
  name: string;
  description: string;
  background: string;
  panel: string;
  foreground: string;
  muted: string;
  palette: string[];
  family: PaletteFamily;
  source: PaletteSource;
  colorSafe: boolean;
  tags: string[];
  recommended: string;
};

export const themes: ThemePalette[] = [
  {
    id: 'viridis',
    name: 'Viridis',
    description: '经典顺序科学配色，亮度均匀，适合热力图、连续变量和论文印刷。',
    background: '#F7FAFC',
    panel: '#FFFFFF',
    foreground: '#102A43',
    muted: '#627D98',
    palette: ['#440154', '#482777', '#3F4A8A', '#31678E', '#26828E', '#1F9E89', '#35B779', '#6CCE59', '#B4DE2C', '#FDE725'],
    family: 'sequential',
    source: 'scientific',
    colorSafe: true,
    tags: ['perceptually-uniform', 'colorblind-safe', 'print-friendly'],
    recommended: '连续变量、密度场、实验梯度',
  },
  {
    id: 'plasma',
    name: 'Plasma',
    description: '高对比的顺序色带，适合强调差异与亮部细节。',
    background: '#FBF8FC',
    panel: '#FFFFFF',
    foreground: '#28123B',
    muted: '#7C6A92',
    palette: ['#0D0887', '#46039F', '#7201A8', '#9C179E', '#BD3786', '#D8576B', '#ED7953', '#FB9F3A', '#FDC926', '#F0F921'],
    family: 'sequential',
    source: 'scientific',
    colorSafe: true,
    tags: ['perceptually-uniform', 'vibrant'],
    recommended: '显著性差异、高亮热点、展示型图表',
  },
  {
    id: 'inferno',
    name: 'Inferno',
    description: '深色背景下对比出色，适合夜间演示与高亮热点区域。',
    background: '#FFF9F8',
    panel: '#FFFFFF',
    foreground: '#2D1B22',
    muted: '#7B5565',
    palette: ['#000004', '#1B0C41', '#4A0C6B', '#781C6D', '#A52C60', '#CF4446', '#ED6925', '#FB9A06', '#F7D13D', '#FCFFA4'],
    family: 'sequential',
    source: 'scientific',
    colorSafe: true,
    tags: ['high-contrast', 'presentation'],
    recommended: '暗色界面、投屏、热点定位',
  },
  {
    id: 'magma',
    name: 'Magma',
    description: '从深紫到暖白的平滑过渡，适合连续强度图和夜间阅读。',
    background: '#FFF8FA',
    panel: '#FFFFFF',
    foreground: '#2A1D28',
    muted: '#7A6474',
    palette: ['#000004', '#180F3D', '#440F76', '#721F81', '#9E2F7F', '#CD4071', '#F1605D', '#FD9668', '#FEC98D', '#FCFDBF'],
    family: 'sequential',
    source: 'scientific',
    colorSafe: true,
    tags: ['perceptually-uniform', 'night-friendly'],
    recommended: '强度分布、医学图像、暗背景图表',
  },
  {
    id: 'cividis',
    name: 'Cividis',
    description: '兼顾色弱可读性与亮度变化，适合严格可访问场景。',
    background: '#F7FAFC',
    panel: '#FFFFFF',
    foreground: '#183046',
    muted: '#5C7287',
    palette: ['#00204C', '#19346F', '#2E4E7E', '#406787', '#557F8A', '#6B9788', '#85AE7E', '#A4C26D', '#CAD45A', '#FDE84D'],
    family: 'sequential',
    source: 'scientific',
    colorSafe: true,
    tags: ['colorblind-safe', 'cvd-optimized'],
    recommended: '公开报告、教育场景、可访问性优先项目',
  },
  {
    id: 'batlow',
    name: 'Batlow',
    description: '地形感很强的科学色图，适合环境数据与空间连续变量。',
    background: '#F7FAFC',
    panel: '#FFFFFF',
    foreground: '#17324B',
    muted: '#61788C',
    palette: ['#011959', '#17317E', '#305792', '#4C7A92', '#67968A', '#84AC7B', '#A7BF6D', '#C9CE61', '#E4DD55', '#FCEB4D'],
    family: 'sequential',
    source: 'scientific',
    colorSafe: true,
    tags: ['scientific', 'terrain-friendly'],
    recommended: '地理栅格、气候变量、空间模拟结果',
  },
  {
    id: 'classic-paper',
    name: 'Classic Paper',
    description: '低饱和蓝灰论文风，适合 benchmark、实验总结和论文插图。',
    background: '#F8FAFC',
    panel: '#FFFFFF',
    foreground: '#183046',
    muted: '#64748B',
    palette: ['#1F3A5F', '#2C5F8A', '#3C8DAD', '#7BB7C9', '#D9E2EC', '#E9C46A'],
    family: 'qualitative',
    source: 'classic',
    colorSafe: false,
    tags: ['paper', 'benchmark', 'minimal'],
    recommended: '柱状图、折线图、论文主图',
  },
  {
    id: 'lab-dark',
    name: 'Lab Dark',
    description: '适合夜间演示与实验室投屏的深色主题配色。',
    background: '#0F172A',
    panel: '#162032',
    foreground: '#E5EEF7',
    muted: '#9FB3C8',
    palette: ['#8FB8FF', '#58D2E0', '#9E7CFF', '#F6AD55', '#F87171', '#334155'],
    family: 'qualitative',
    source: 'custom',
    colorSafe: false,
    tags: ['dark-ui', 'presentation', 'dashboard'],
    recommended: '答辩投屏、夜间演示、仪表盘',
  },
];
