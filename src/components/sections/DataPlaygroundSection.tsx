import type { ChangeEvent, DragEvent } from 'react';
import type { DatasetRecord, DatasetSource } from '@/types/dataset';
import { toDisplay } from '@/utils/dataset';
import { SectionHeading } from '@/components/ui/SectionHeading';

type Props = {
  records: DatasetRecord[];
  keys: string[];
  numericKeys: string[];
  xKey: string;
  yKey: string;
  source: DatasetSource;
  fileName: string;
  error: string;
  onXKeyChange: (key: string) => void;
  onYKeyChange: (key: string) => void;
  onReset: () => void;
  onFileSelect: (file: File) => void;
};

export function DataPlaygroundSection({
  records,
  keys,
  numericKeys,
  xKey,
  yKey,
  source,
  fileName,
  error,
  onXKeyChange,
  onYKeyChange,
  onReset,
  onFileSelect,
}: Props) {
  const sampleCsvUrl = `${import.meta.env.BASE_URL}data/scivizlab-sample.csv`;
  const sampleJsonUrl = `${import.meta.env.BASE_URL}data/scivizlab-sample.json`;

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
      event.target.value = '';
    }
  };

  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) onFileSelect(file);
  };

  const handleDragOver = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
  };

  return (
    <section id="dataset-playground" className="section-shell pt-24">
      <div className="section-inner">
        <SectionHeading
          eyebrow="Dataset Playground"
          title="默认数据展示 + 拖拽上传自定义数据"
          description="页面开箱即用展示内置科研示例数据，也支持用户拖拽上传 CSV 或 JSON。上传后会自动刷新首页预览、图表画廊和 Dashboard。"
        />
        <div className="mt-12 grid gap-5 xl:grid-cols-[0.92fr_1.08fr]">
          <article className="glass-card p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Dataset Summary</p>
                <h3 className="mt-3 text-2xl font-semibold text-ink">{source === 'default' ? 'Built-in sample data' : 'Custom upload'}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">当前数据源：{fileName}</p>
              </div>
              <button type="button" onClick={onReset} className="button-secondary">
                Reset to Default
              </button>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Rows</p>
                <p className="mt-3 text-2xl font-semibold text-ink">{records.length}</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Columns</p>
                <p className="mt-3 text-2xl font-semibold text-ink">{keys.length}</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Numeric Fields</p>
                <p className="mt-3 text-2xl font-semibold text-ink">{numericKeys.length}</p>
              </div>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-600">X Field</span>
                <select value={xKey} onChange={(event) => onXKeyChange(event.target.value)} className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-slate-500">
                  {keys.map((key) => (
                    <option key={key} value={key}>
                      {key}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-600">Y Field</span>
                <select value={yKey} onChange={(event) => onYKeyChange(event.target.value)} className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-slate-500">
                  {numericKeys.map((key) => (
                    <option key={key} value={key}>
                      {key}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200">
              <div className="grid grid-cols-4 gap-px bg-slate-200 text-xs uppercase tracking-[0.16em] text-slate-500">
                {keys.slice(0, 4).map((key) => (
                  <div key={key} className="bg-slate-50 px-3 py-2">
                    {key}
                  </div>
                ))}
              </div>
              {records.slice(0, 4).map((record, index) => (
                <div key={`preview-row-${index}`} className="grid grid-cols-4 gap-px bg-slate-200 text-sm text-slate-600">
                  {keys.slice(0, 4).map((key) => (
                    <div key={`${index}-${key}`} className="bg-white px-3 py-2">
                      {toDisplay(record[key] ?? null)}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </article>

          <div className="grid gap-5">
            <label
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="glass-card flex min-h-[280px] cursor-pointer flex-col items-center justify-center rounded-[28px] border border-dashed border-slate-300 px-6 text-center transition hover:border-slate-400"
            >
              <input type="file" accept=".csv,.json" onChange={handleInputChange} className="hidden" />
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-xl text-slate-500">↥</div>
              <h3 className="mt-6 text-2xl font-semibold text-ink">拖拽上传你的 CSV / JSON</h3>
              <p className="mt-3 max-w-lg text-sm leading-7 text-slate-600">
                上传后会自动解析为对象数组，支持选择 X / Y 字段。这个能力完全运行在前端，适合 GitHub Pages 静态托管。
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <span className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-500">Drag & Drop</span>
                <span className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-500">CSV</span>
                <span className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-500">JSON</span>
              </div>
              <p className="mt-6 text-sm font-medium text-slate-500">{error || `当前文件：${fileName}`}</p>
            </label>

            <div className="grid gap-5 md:grid-cols-2">
              <article className="glass-card p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Sample files</p>
                <h3 className="mt-3 text-xl font-semibold text-ink">下载示例数据</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">方便用户先下载样例再替换成自己的实验数据，也方便你在 README 里做快速演示。</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a href={sampleCsvUrl} download className="button-secondary">Download CSV</a>
                  <a href={sampleJsonUrl} download className="button-secondary">Download JSON</a>
                </div>
              </article>
              <article className="glass-card p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Upload shape</p>
                <h3 className="mt-3 text-xl font-semibold text-ink">推荐字段格式</h3>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                  <li>• 至少包含 2 列，且有 1 列为数值字段。</li>
                  <li>• 建议使用 epoch / step / time 作为横轴字段。</li>
                  <li>• JSON 推荐结构为对象数组，或 {'{'} data: [...] {'}'}。</li>
                </ul>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
