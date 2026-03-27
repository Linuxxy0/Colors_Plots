import { TopNav } from './TopNav';
import type { AppRoute } from '@/app/routes';
import { useAppState } from '@/context/AppStateContext';
import { hexToRgba } from '@/utils/colors';

export function AppShell({ route, children }: { route: AppRoute; children: React.ReactNode }) {
  const { theme } = useAppState();

  return (
    <div
      className="min-h-screen"
      style={{
        background: `radial-gradient(circle at top left, ${hexToRgba(theme.palette[1], 0.15)}, transparent 22%), radial-gradient(circle at top right, ${hexToRgba(theme.palette[0], 0.08)}, transparent 18%), linear-gradient(180deg, ${theme.background} 0%, #ffffff 100%)`,
        color: theme.foreground,
      }}
    >
      <TopNav currentRoute={route} />
      <main className="section-shell py-6 sm:py-8 lg:py-10">
        <div className="section-inner space-y-6 sm:space-y-8">{children}</div>
      </main>
    </div>
  );
}
