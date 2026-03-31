import type { PropsWithChildren } from "react";

type BadgeProps = PropsWithChildren<{ tone?: "muted" | "outline" }>;

export function Badge({ children, tone = "outline" }: BadgeProps) {
  return <span className={`badge ${tone}`}>{children}</span>;
}

export function Button({ children, onClick }: PropsWithChildren<{ onClick?: () => void }>) {
  return (
    <button type="button" className="btn" onClick={onClick}>
      {children}
    </button>
  );
}

export function SwitchRow({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}) {
  return (
    <label className="switch-row">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        className={`switch ${checked ? "checked" : ""}`}
        onClick={() => onChange(!checked)}
      >
        <span className="switch-knob" />
      </button>
      <span>{label}</span>
    </label>
  );
}
