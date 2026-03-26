import { navItems } from '@/data/content';

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
      <div className="section-shell">
        <div className="section-inner flex h-16 items-center justify-between gap-6">
          <a href="#top" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-ink text-sm font-bold text-white">SV</div>
            <div>
              <p className="text-base font-semibold text-ink">SciVizLab</p>
              <p className="text-xs text-slate-500">Academic chart system</p>
            </div>
          </a>
          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className="text-sm font-medium text-slate-600 transition hover:text-ink">
                {item.label}
              </a>
            ))}
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400"
            >
              GitHub
            </a>
            <button
              type="button"
              aria-label="Toggle theme"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-600"
            >
              ○
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
