export type ThemeCategory = 'paper' | 'minimal' | 'dark';

export type ThemePalette = {
  id: string;
  name: string;
  description: string;
  category: ThemeCategory;
  recommendedFor: string[];
  accessibility: 'standard' | 'high-contrast';
  background: string;
  panel: string;
  foreground: string;
  muted: string;
  border: string;
  accent: string;
  palette: string[];
};

export const themes: ThemePalette[] = [
  {
    id: 'classic-paper',
    name: 'Classic Paper',
    description: 'Low-saturation blue-gray palette for papers, benchmark plots, and reproducible research figures.',
    category: 'paper',
    recommendedFor: ['论文插图', 'benchmark 对比', '实验报告'],
    accessibility: 'standard',
    background: '#F8FAFC',
    panel: '#FFFFFF',
    foreground: '#183046',
    muted: '#64748B',
    border: '#D9E2EC',
    accent: '#1F3A5F',
    palette: ['#1F3A5F', '#2C5F8A', '#3C8DAD', '#D9E2EC', '#E9C46A'],
  },
  {
    id: 'nature-minimal',
    name: 'Nature Minimal',
    description: 'High whitespace, restrained contrast, and clean tones for elegant scientific stories.',
    category: 'minimal',
    recommendedFor: ['项目首页', '图表画廊', '研究叙事'],
    accessibility: 'standard',
    background: '#FBFCF8',
    panel: '#FFFFFF',
    foreground: '#22313F',
    muted: '#7B8794',
    border: '#D8E3E7',
    accent: '#2B4C7E',
    palette: ['#2B4C7E', '#5B8FB9', '#86A8CF', '#D8E3E7', '#E5C07B'],
  },
  {
    id: 'lab-dark',
    name: 'Lab Dark',
    description: 'Presentation-first dark mode for demos, projector slides, and lab meeting dashboards.',
    category: 'dark',
    recommendedFor: ['答辩投屏', 'lab meeting', '深色 dashboard'],
    accessibility: 'high-contrast',
    background: '#0F172A',
    panel: '#162032',
    foreground: '#E5EEF7',
    muted: '#9FB3C8',
    border: '#334155',
    accent: '#8FB8FF',
    palette: ['#8FB8FF', '#58D2E0', '#9E7CFF', '#F6AD55', '#334155'],
  },
];

export function getThemeById(themeId: string) {
  return themes.find((theme) => theme.id === themeId) ?? themes[0];
}
