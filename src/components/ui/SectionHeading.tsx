import type { ReactNode } from 'react';

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description: string;
  action?: ReactNode;
  center?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  center = false,
}: SectionHeadingProps) {
  return (
    <div className={center ? 'text-center' : 'flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between'}>
      <div className={center ? 'mx-auto max-w-2xl' : 'max-w-2xl'}>
        {eyebrow ? <span className="tag">{eyebrow}</span> : null}
        <h2 className="section-title mt-4">{title}</h2>
        <p className="section-copy">{description}</p>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
