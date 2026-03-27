export function PageIntro({ eyebrow, title, description, actions }: { eyebrow: string; title: string; description: string; actions?: React.ReactNode }) {
  return (
    <section className="rounded-[28px] border border-slate-200/80 bg-white/88 p-8 shadow-soft backdrop-blur sm:p-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <span className="tag">{eyebrow}</span>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{title}</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">{description}</p>
        </div>
        {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
      </div>
    </section>
  );
}
