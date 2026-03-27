import type { ReactNode } from 'react';

type ChartShellProps = {
  title: string;
  subtitle?: string;
  compact?: boolean;
  badge?: string;
  children: ReactNode;
};

export function ChartShell({ title, subtitle, compact = false, badge = 'preview', children }: ChartShellProps) {
  return (
    <div className={`glass-card h-full ${compact ? 'p-4' : 'p-5'}`}>
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-700">{title}</h3>
          {subtitle ? <p className="mt-1 text-xs text-slate-500">{subtitle}</p> : null}
        </div>
        <div className="rounded-full border border-slate-200 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400">
          {badge}
        </div>
      </div>
      {children}
    </div>
  );
}
