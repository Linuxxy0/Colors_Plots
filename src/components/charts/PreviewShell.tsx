import type { ReactNode } from 'react';
import type { HoverInfo, ThemePalette } from '@/types/app';

type Props = {
  title: string;
  subtitle: string;
  badge: string;
  theme: ThemePalette;
  mode?: 'card' | 'detail';
  info: HoverInfo;
  children: ReactNode;
};

export function PreviewShell({ title, subtitle, badge, theme, mode = 'card', info, children }: Props) {
  return (
    <div
      className={`rounded-[28px] border shadow-[0_20px_60px_rgba(15,23,42,0.06)] ${mode === 'detail' ? 'p-6' : 'p-5'}`}
      style={{ backgroundColor: theme.panel, borderColor: `${theme.muted}22` }}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <div className="text-xl font-semibold" style={{ color: theme.foreground }}>{title}</div>
          <div className="mt-1 text-sm" style={{ color: theme.muted }}>{subtitle}</div>
        </div>
        <div className="rounded-full border px-3 py-1 text-xs font-medium" style={{ borderColor: `${theme.muted}33`, color: theme.muted }}>{badge}</div>
      </div>
      <div className={`${mode === 'detail' ? 'min-h-[320px]' : 'min-h-[190px]'}`}>{children}</div>
      <div className="mt-4 grid grid-cols-2 gap-3 rounded-[22px] border p-4 text-sm" style={{ borderColor: `${theme.muted}22`, backgroundColor: `${theme.background}` }}>
        <div>
          <div style={{ color: theme.muted }}>{info.primaryLabel}</div>
          <div className="mt-1 text-lg font-semibold" style={{ color: theme.foreground }}>{info.primaryValue}</div>
        </div>
        <div>
          <div style={{ color: theme.muted }}>{info.secondaryLabel ?? '—'}</div>
          <div className="mt-1 text-lg font-semibold" style={{ color: theme.foreground }}>{info.secondaryValue ?? '—'}</div>
        </div>
      </div>
    </div>
  );
}
