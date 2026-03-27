import { hexToRgba } from '@/utils/colors';
import { themes, type ThemePalette } from '@/themes/themes';
import type { ReactNode } from 'react';

type ChartShellProps = {
  title: string;
  subtitle?: string;
  compact?: boolean;
  badge?: string;
  theme?: ThemePalette;
  children: ReactNode;
};

export function ChartShell({ title, subtitle, compact = false, badge = 'preview', theme = themes[0], children }: ChartShellProps) {
  return (
    <div
      className={`h-full rounded-3xl border shadow-sm ${compact ? 'p-4' : 'p-5'}`}
      style={{
        backgroundColor: theme.panel,
        borderColor: hexToRgba(theme.foreground, 0.12),
        boxShadow: `0 16px 40px ${hexToRgba(theme.foreground, 0.06)}`,
      }}
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: theme.foreground }}>
            {title}
          </h3>
          {subtitle ? (
            <p className="mt-1 text-xs" style={{ color: theme.muted }}>
              {subtitle}
            </p>
          ) : null}
        </div>
        <div
          className="rounded-full border px-2 py-1 text-[10px] font-medium uppercase tracking-[0.2em]"
          style={{
            color: theme.muted,
            borderColor: hexToRgba(theme.foreground, 0.15),
            backgroundColor: hexToRgba(theme.foreground, 0.03),
          }}
        >
          {badge}
        </div>
      </div>
      {children}
    </div>
  );
}
