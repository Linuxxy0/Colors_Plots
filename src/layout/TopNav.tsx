import { routeConfig, type AppRoute } from '@/app/routes';
import { useAppState } from '@/context/AppStateContext';
import { themes } from '@/themes/themes';

export function TopNav({ currentRoute }: { currentRoute: AppRoute }) {
  const { themeId, setThemeId } = useAppState();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/85 backdrop-blur">
      <div className="mx-auto flex max-w-content flex-col gap-4 px-6 py-4 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <div className="flex items-center gap-4">
          <a href="#/" className="flex items-center gap-3 text-slate-900">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-sm font-semibold text-white">SV</div>
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">SciVizLab</div>
              <div className="text-sm text-slate-500">Academic palette & chart library</div>
            </div>
          </a>
        </div>

        <nav className="flex flex-wrap items-center gap-2">
          {Object.entries(routeConfig).map(([key, item]) => {
            const active = currentRoute === key;
            return (
              <a
                key={key}
                href={item.href}
                className={`rounded-2xl px-4 py-2 text-sm font-medium transition ${
                  active ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {item.label}
              </a>
            );
          })}
          <a
            href="https://github.com/Linuxxy0/Colors_Plots"
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-400 hover:text-slate-900"
          >
            GitHub
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <label className="text-xs uppercase tracking-[0.22em] text-slate-400">Active Theme</label>
          <select
            value={themeId}
            onChange={(event) => setThemeId(event.target.value)}
            className="rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 outline-none transition focus:border-slate-400"
          >
            {themes.map((theme) => (
              <option key={theme.id} value={theme.id}>
                {theme.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
}
