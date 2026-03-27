import { routeConfig, type AppRoute } from '@/app/routes';
import { useAppState } from '@/context/AppStateContext';
import { routeLabels, t, themeCopy, uiText } from '@/i18n';
import { themes } from '@/themes/themes';

export function TopNav({ currentRoute }: { currentRoute: AppRoute }) {
  const { locale, setLocale, themeId, setThemeId } = useAppState();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/85 backdrop-blur">
      <div className="flex w-full flex-col gap-4 px-4 py-4 sm:px-6 xl:px-8 2xl:px-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <a href="#/" className="flex items-center gap-3 text-slate-900">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-sm font-semibold text-white">SV</div>
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">SciVizLab</div>
              <div className="text-sm text-slate-500">{t(locale, uiText.appSubtitle)}</div>
            </div>
          </a>
        </div>

        <nav className="flex flex-wrap items-center gap-2">
          {Object.entries(routeConfig).map(([key, item]) => {
            const active = currentRoute === key;
            const label = routeLabels[key as keyof typeof routeLabels][locale];
            return (
              <a
                key={key}
                href={item.href}
                className={`rounded-2xl px-4 py-2 text-sm font-medium transition ${
                  active ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {label}
              </a>
            );
          })}
          <a
            href="https://github.com/Linuxxy0/Colors_Plots"
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-400 hover:text-slate-900"
          >
            {t(locale, uiText.github)}
          </a>
        </nav>

        <div className="flex flex-wrap items-center gap-3 lg:justify-end">
          <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-2 py-2">
            <span className="px-2 text-xs uppercase tracking-[0.22em] text-slate-400">{t(locale, uiText.languageLabel)}</span>
            <button
              onClick={() => setLocale('zh')}
              className={`rounded-xl px-3 py-2 text-sm font-medium ${locale === 'zh' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              {t(locale, uiText.chinese)}
            </button>
            <button
              onClick={() => setLocale('en')}
              className={`rounded-xl px-3 py-2 text-sm font-medium ${locale === 'en' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              {t(locale, uiText.english)}
            </button>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2">
            <label className="text-xs uppercase tracking-[0.22em] text-slate-400">{t(locale, uiText.themeLabel)}</label>
            <select
              value={themeId}
              onChange={(event) => setThemeId(event.target.value)}
              className="rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 outline-none transition focus:border-slate-400"
            >
              {themes.map((theme) => (
                <option key={theme.id} value={theme.id}>
                  {t(locale, themeCopy[theme.id].name)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </header>
  );
}
