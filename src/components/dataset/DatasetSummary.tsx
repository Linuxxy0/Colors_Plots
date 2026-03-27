import { useMemo } from 'react';
import { useAppState } from '@/context/AppStateContext';
import { formatMetric, summarizeDataset, toDisplay } from '@/utils/dataset';
import { StatPill } from '@/components/common/StatPill';

export function DatasetSummary() {
  const { dataset, meta, yKey } = useAppState();
  const summary = useMemo(() => summarizeDataset(dataset.records, yKey), [dataset.records, yKey]);
  const previewRows = dataset.records.slice(0, 5);

  return (
    <section className="rounded-[28px] border border-slate-200/80 bg-white/88 p-6 shadow-soft">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.22em] text-slate-400">Dataset summary</div>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">当前数据概览</h2>
        </div>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <StatPill label="Records" value={String(summary.count)} />
          <StatPill label="Latest" value={formatMetric(summary.latest)} />
          <StatPill label="Average" value={formatMetric(summary.average)} />
          <StatPill label="Fields" value={String(meta.keys.length)} />
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-[24px] border border-slate-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                {meta.keys.slice(0, 5).map((key) => (
                  <th key={key} className="px-4 py-3 font-medium">{key}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white text-slate-700">
              {previewRows.map((record, index) => (
                <tr key={index}>
                  {meta.keys.slice(0, 5).map((key) => (
                    <td key={key} className="px-4 py-3">{toDisplay(record[key] ?? null)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
