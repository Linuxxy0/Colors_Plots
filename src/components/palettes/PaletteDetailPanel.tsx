import type { ThemePalette } from '@/themes/themes';
import { hexToRgba } from '@/utils/colors';
import { useAppState } from '@/context/AppStateContext';
import { t, themeCopy, uiText } from '@/i18n';

function downloadText(filename: string, content: string) {
  const blob = new Blob([content], { type: 'application/json;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    // ignore clipboard errors in preview environment
  }
}

export function PaletteDetailPanel({ theme }: { theme: ThemePalette }) {
  const { locale } = useAppState();
  const themeText = themeCopy[theme.id];
  const cssTokens = `:root {\n  --background: ${theme.background};\n  --panel: ${theme.panel};\n  --foreground: ${theme.foreground};\n  --muted: ${theme.muted};\n  --accent: ${theme.accent};\n  --palette-1: ${theme.palette[0]};\n  --palette-2: ${theme.palette[1]};\n  --palette-3: ${theme.palette[2]};\n  --palette-4: ${theme.palette[3]};\n  --palette-5: ${theme.palette[4]};\n}`;
  const jsonTokens = JSON.stringify(theme, null, 2);

  return (
    <aside className="rounded-[28px] border p-6 shadow-soft" style={{ backgroundColor: theme.panel, borderColor: hexToRgba(theme.foreground, 0.12) }}>
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.22em]" style={{ color: theme.muted }}>{t(locale, uiText.themeDetail)}</div>
          <h2 className="mt-2 text-2xl font-semibold" style={{ color: theme.foreground }}>{t(locale, themeText.name)}</h2>
        </div>
        <div className="rounded-full px-3 py-1 text-xs font-medium" style={{ backgroundColor: hexToRgba(theme.foreground, 0.06), color: theme.muted }}>
          {t(locale, themeText.accessibility)}
        </div>
      </div>

      <p className="mt-4 text-sm leading-6" style={{ color: theme.muted }}>{t(locale, themeText.description)}</p>

      <div className="mt-6 space-y-3">
        {[[locale === 'zh' ? '背景' : 'Background', theme.background], [locale === 'zh' ? '面板' : 'Panel', theme.panel], [locale === 'zh' ? '文字' : 'Foreground', theme.foreground], [locale === 'zh' ? '强调色' : 'Accent', theme.accent]].map(([label, color]) => (
          <div key={label} className="flex items-center justify-between rounded-2xl border px-4 py-3" style={{ borderColor: hexToRgba(theme.foreground, 0.08) }}>
            <div>
              <div className="text-sm font-medium" style={{ color: theme.foreground }}>{label}</div>
              <div className="text-xs" style={{ color: theme.muted }}>{color}</div>
            </div>
            <div className="h-10 w-10 rounded-xl border border-white/50" style={{ backgroundColor: String(color) }} />
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <button className="button-primary" onClick={() => void copyText(cssTokens)}>{t(locale, uiText.copyTokens)}</button>
        <button className="button-secondary" onClick={() => downloadText(`${theme.id}.json`, jsonTokens)}>{t(locale, uiText.exportJson)}</button>
      </div>

      <div className="mt-6 rounded-3xl border p-4" style={{ borderColor: hexToRgba(theme.foreground, 0.08), backgroundColor: hexToRgba(theme.foreground, 0.03) }}>
        <div className="text-xs uppercase tracking-[0.22em]" style={{ color: theme.muted }}>{t(locale, uiText.recommendedScenes)}</div>
        <div className="mt-3 flex flex-wrap gap-2">
          {themeText.recommendedFor[locale].map((item) => (
            <span key={item} className="rounded-full px-3 py-1 text-xs" style={{ backgroundColor: theme.panel, color: theme.muted }}>
              {item}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
}
