import { useMemo, useRef, useState, type ChangeEvent } from 'react';
import { BarChartCard, LineChartCard, ScatterChartCard } from '@/components/charts';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { DatasetSource } from '@/types/dataset';
import { datasetPreviewRows, describeDataset, parseUploadedFile } from '@/utils/dataset';

type Props = {
  dataset: DatasetSource;
  onDatasetChange: (dataset: DatasetSource) => void;
  onReset: () => void;
};

export function DataPlaygroundSection({ dataset, onDatasetChange, onReset }: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const previewRows = useMemo(() => datasetPreviewRows(dataset, 5), [dataset]);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const parsed = await parseUploadedFile(file);
      onDatasetChange(parsed);
    } catch (error) {
      const message = error instanceof Error ? error.message : '上传失败，请检查文件格式。';
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
      event.target.value = '';
    }
  };

  const handleFieldChange = (field: 'xField' | 'yField', value: string) => {
    onDatasetChange({
      ...dataset,
      [field]: value,
    });
  };

  return (
    <section id="uploader" className="section-shell pt-24">
      <div className="section-inner">
        <SectionHeading
          eyebrow="Dataset Playground"
          title="默认示例数据 + 自定义上传"
          description="首页图表默认展示内置科研示例数据。你也可以上传 CSV 或 JSON，对趋势图、对比图、散点图和看板模块进行即时替换。"
          action={
            <div className="flex flex-wrap gap-3">
              <button type="button" className="button-primary" onClick={() => fileInputRef.current?.click()}>
                Upload CSV / JSON
              </button>
              <button type="button" className="button-secondary" onClick={onReset}>
                Reset Demo Data
              </button>
            </div>
          }
        />

        <div className="glass-card mt-12 p-6 sm:p-7">
          <div className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
            <div>
              <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50/80 p-5">
                <input ref={fileInputRef} type="file" accept=".csv,.json" className="hidden" onChange={handleFileChange} />
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Current Dataset</p>
                <h3 className="mt-4 text-2xl font-semibold text-ink">{dataset.name}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{describeDataset(dataset)}</p>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  推荐格式：首行为字段名；至少包含 1 列横轴字段和 1 列数值字段。JSON 请使用对象数组。
                </p>
                {errorMessage ? <p className="mt-4 text-sm font-medium text-rose-600">{errorMessage}</p> : null}
                {isLoading ? <p className="mt-4 text-sm font-medium text-slate-600">正在解析文件...</p> : null}
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <label className="glass-card p-4">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">X Field</span>
                  <select
                    className="mt-3 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none"
                    value={dataset.xField}
                    onChange={(event) => handleFieldChange('xField', event.target.value)}
                  >
                    {dataset.fields.map((field) => (
                      <option key={field} value={field}>
                        {field}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="glass-card p-4">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Y Field</span>
                  <select
                    className="mt-3 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none"
                    value={dataset.yField}
                    onChange={(event) => handleFieldChange('yField', event.target.value)}
                  >
                    {dataset.numericFields.map((field) => (
                      <option key={field} value={field}>
                        {field}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="glass-card mt-5 overflow-hidden p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Preview Rows</p>
                <div className="mt-4 overflow-x-auto">
                  <table className="min-w-full border-separate border-spacing-y-2 text-sm">
                    <thead>
                      <tr>
                        {dataset.fields.slice(0, 6).map((field) => (
                          <th key={field} className="px-3 py-2 text-left font-semibold text-slate-500">
                            {field}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {previewRows.map((row, index) => (
                        <tr key={`row-${index}`} className="rounded-2xl bg-slate-50">
                          {dataset.fields.slice(0, 6).map((field) => (
                            <td key={`${field}-${index}`} className="px-3 py-3 text-slate-700">
                              {String(row[field] ?? '-')}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="min-h-[240px]">
                <LineChartCard title="Uploaded Trend Preview" dataset={dataset} />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="min-h-[220px]">
                  <BarChartCard title="Uploaded Comparison" compact dataset={dataset} />
                </div>
                <div className="min-h-[220px]">
                  <ScatterChartCard title="Uploaded Scatter" compact dataset={dataset} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
