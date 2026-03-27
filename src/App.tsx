import { Navigate, Route, Routes } from 'react-router-dom';
import { TopNav } from '@/components/layout/TopNav';
import { HomePage } from '@/pages/HomePage';
import { PalettesPage } from '@/pages/PalettesPage';
import { ChartsPage } from '@/pages/ChartsPage';
import { PlaygroundPage } from '@/pages/PlaygroundPage';
import { useAppContext } from '@/context/AppContext';

export default function App() {
  const { currentTheme } = useAppContext();

  return (
    <div
      className="min-h-screen"
      style={{
        background: `radial-gradient(circle at top left, ${currentTheme.accent}14, transparent 22%), linear-gradient(180deg, ${currentTheme.background} 0%, #FFFFFF 22%, ${currentTheme.background} 100%)`,
        color: currentTheme.foreground,
      }}
    >
      <TopNav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/palettes" element={<PalettesPage />} />
        <Route path="/charts" element={<ChartsPage />} />
        <Route path="/playground" element={<PlaygroundPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
