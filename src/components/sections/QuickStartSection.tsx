import { quickStartCode } from '@/data/content';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function QuickStartSection() {
  return (
    <section id="quick-start" className="section-shell pt-24">
      <div className="section-inner">
        <SectionHeading
          eyebrow="Quick Start"
          title="快速开始与最小接入方式"
          description="仓库使用 React + TypeScript + Vite + Tailwind，支持默认数据、拖拽上传、示例数据下载和 GitHub Pages 一键部署。"
        />
        <div className="mt-12 grid gap-5 xl:grid-cols-[0.8fr_1.2fr]">
          <div className="glass-card p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Install</p>
            <div className="mt-5 rounded-3xl bg-slate-900 p-5 text-sm text-slate-100">
              <p>npm install</p>
              <p className="mt-2">npm run dev</p>
              <p className="mt-2">npm run build</p>
            </div>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="button-secondary mt-6 w-full">
              Read Docs
            </a>
          </div>
          <div className="glass-card p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Minimal Example</p>
            <pre className="mt-5 overflow-x-auto rounded-3xl bg-slate-950 p-5 text-sm leading-7 text-slate-100">
              <code>{quickStartCode}</code>
            </pre>
            <a href="#dataset-playground" className="button-secondary mt-6 w-full">
              View Upload Playground
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
