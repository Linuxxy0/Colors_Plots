import { NavLink } from 'react-router-dom';
import { useAppContext } from '@/context/AppContext';

const labels = {
  home: { zh: '首页', en: 'Home' },
  palettes: { zh: '配色库', en: 'Palettes' },
  charts: { zh: '图表库', en: 'Charts' },
  playground: { zh: '实验台', en: 'Playground' },
  github: { zh: '仓库', en: 'GitHub' },
  language: { zh: 'EN', en: '中文' },
};

export function TopNav() {
  const { language, toggleLanguage } = useAppContext();

  const navItems = [
    { to: '/', label: labels.home[language] },
    { to: '/palettes', label: labels.palettes[language] },
    { to: '/charts', label: labels.charts[language] },
    { to: '/playground', label: labels.playground[language] },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl">
      <div className="page-shell flex h-16 items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-sm font-semibold text-white">SV</div>
          <div>
            <div className="text-sm font-semibold text-slate-900">SciVizLab</div>
            <div className="text-xs text-slate-500">Academic palette & chart library</div>
          </div>
        </div>

        <nav className="hidden items-center gap-2 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-2xl px-4 py-2 text-sm font-medium transition ${isActive ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <a
            href="https://github.com/Linuxxy0/Colors_Plots"
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
          >
            {labels.github[language]}
          </a>
        </nav>

        <button
          type="button"
          onClick={toggleLanguage}
          className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
        >
          {labels.language[language]}
        </button>
      </div>
    </header>
  );
}
