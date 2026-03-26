export type ThemePalette = {
  id: string;
  name: string;
  description: string;
  background: string;
  panel: string;
  foreground: string;
  muted: string;
  palette: string[];
};

export const themes: ThemePalette[] = [
  {
    id: 'classic-paper',
    name: 'Classic Paper',
    description: 'Low-saturation blue-gray palette for papers, benchmark plots, and reproducible research figures.',
    background: '#F8FAFC',
    panel: '#FFFFFF',
    foreground: '#183046',
    muted: '#64748B',
    palette: ['#1F3A5F', '#2C5F8A', '#3C8DAD', '#D9E2EC', '#E9C46A'],
  },
  {
    id: 'nature-minimal',
    name: 'Nature Minimal',
    description: 'High whitespace, restrained contrast, and clean tones for elegant scientific stories.',
    background: '#FBFCF8',
    panel: '#FFFFFF',
    foreground: '#22313F',
    muted: '#7B8794',
    palette: ['#2B4C7E', '#5B8FB9', '#86A8CF', '#D8E3E7', '#E5C07B'],
  },
  {
    id: 'lab-dark',
    name: 'Lab Dark',
    description: 'Presentation-first dark mode for demos, projector slides, and lab meeting dashboards.',
    background: '#0F172A',
    panel: '#162032',
    foreground: '#E5EEF7',
    muted: '#9FB3C8',
    palette: ['#8FB8FF', '#58D2E0', '#9E7CFF', '#F6AD55', '#334155'],
  },
];
