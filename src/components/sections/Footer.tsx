import { footerLinks } from '@/data/content';

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white/70">
      <div className="section-shell py-10">
        <div className="section-inner flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-lg font-semibold text-ink">SciVizLab</p>
            <p className="mt-2 text-sm text-slate-500">Academic visualization toolkit for charts, themes, and research dashboards.</p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-slate-600">
            {footerLinks.map((link) => (
              <a key={link} href="https://github.com" target="_blank" rel="noreferrer" className="transition hover:text-ink">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
