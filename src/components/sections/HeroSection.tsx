import type { DatasetRecord } from '@/types/dataset';

type Props = {
  records: DatasetRecord[];
  xKey: string;
  yKey: string;
  numericKeys: string[];
};

// 所有图表组件已删除
export function HeroSection({ records, xKey, yKey, numericKeys }: Props) {
  return (
    <section id="top" className="section-shell pt-10 sm:pt-14 lg:pt-20">
      <div className="section-inner grid items-center gap-10 lg:grid-cols-[1.05fr_1.15fr]">
        <div>
          <span className="tag">Academic Visualization</span>
          <h1 className="mt-6 max-w-xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-6xl">
            图表库已清空
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            所有图表组件已被删除，等待新的实现。
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#dataset-playground" className="button-primary">
              Upload Dataset
            </a>
            <a href="#dashboard-demo" className="button-secondary">
              Live Demo
            </a>
          </div>
          <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-500">
            {['React', 'TypeScript', 'Vite', 'Tailwind', 'Drag & Drop', 'GitHub Pages'].map((item) => (
              <span key={item} className="rounded-full border border-slate-200 bg-white px-3 py-1.5">
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="glass-card p-5 sm:p-6 lg:p-7">
          <p className="text-slate-600">所有图表组件已删除。</p>
        </div>
      </div>
    </section>
  );
}
