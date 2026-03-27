import { useAppState } from '@/context/AppStateContext';
import { themes } from '@/themes/themes';
import { t, themeCopy, uiText } from '@/i18n';

export function FieldMappingPanel() {
  const { locale, meta, xKey, yKey, setXKey, setYKey, themeId, setThemeId } = useAppState();

  return (
    <section className="rounded-[28px] border border-slate-200/80 bg-white/88 p-6 shadow-soft">
      <div className="text-xs uppercase tracking-[0.22em] text-slate-400">{locale === 'zh' ? '字段映射' : 'Field mapping'}</div>
      <h2 className="mt-2 text-2xl font-semibold text-slate-900">{locale === 'zh' ? '控制当前预览' : 'Control the current preview'}</h2>

      <div className="mt-6 grid gap-4">
        <label className="grid gap-2 text-sm font-medium text-slate-700">
          {t(locale, uiText.xField)}
          <select value={xKey} onChange={(event) => setXKey(event.target.value)} className="rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-400">
            {meta.keys.map((key) => (
              <option key={key} value={key}>{key}</option>
            ))}
          </select>
        </label>

        <label className="grid gap-2 text-sm font-medium text-slate-700">
          {t(locale, uiText.yField)}
          <select value={yKey} onChange={(event) => setYKey(event.target.value)} className="rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-400">
            {meta.numericKeys.map((key) => (
              <option key={key} value={key}>{key}</option>
            ))}
          </select>
        </label>

        <label className="grid gap-2 text-sm font-medium text-slate-700">
          {t(locale, uiText.theme)}
          <select value={themeId} onChange={(event) => setThemeId(event.target.value)} className="rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-400">
            {themes.map((theme) => (
              <option key={theme.id} value={theme.id}>{t(locale, themeCopy[theme.id].name)}</option>
            ))}
          </select>
        </label>
      </div>
    </section>
  );
}
