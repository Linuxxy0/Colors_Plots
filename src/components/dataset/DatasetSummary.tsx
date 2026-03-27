import { useMemo } from 'react';
import { useAppState } from '@/context/AppStateContext';
import { formatMetric, getDatasetMeta, summarizeDataset, toDisplay } from '@/utils/dataset';
import { StatPill } from '@/components/common/StatPill';
import type { DatasetMeta, DatasetRecord } from '@/types/dataset';
import { t, uiText } from '@/i18n';

type DatasetSummaryProps = {
  records?: DatasetRecord[];
  meta?: DatasetMeta;
  yKey?: string;
  fileName?: string;
};

export function DatasetSummary({ records, meta, yKey, fileName }: DatasetSummaryProps) {
  const state = useAppState();
  const resolvedRecords = records ?? state.dataset.records;
  const resolvedMeta = meta ?? state.meta;
  const resolvedYKey = yKey ?? state.yKey;
  const resolvedFileName = fileName ?? state.dataset.fileName;
  const summary = useMemo(() => summarizeDataset(resolvedRecords, resolvedYKey), [resolvedRecords, resolvedYKey]);
  const previewRows = resolvedRecords.slice(0, 5);
  const actualMeta = resolvedMeta ?? getDatasetMeta(resolvedRecords);
  const { locale } = state;

  return (
    <section className="rounded-[28px] border border-slate-200/80 bg-white/88 p-6 shadow-soft">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.22em] text-slate-400">{t(locale, uiText.datasetSummary)}</div>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">{locale === 'zh' ? '当前数据概览' : 'Current dataset overview'}</h2>
          <div className="mt-2 text-sm text-slate-500">{resolvedFileName}</div>
        </div>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <StatPill label={t(locale, uiText.records)} value={String(summary.count)} />
          <StatPill label={t(locale, uiText.latest)} value={formatMetric(summary.latest)} />
          <StatPill label={t(locale, uiText.average)} value={formatMetric(summary.average)} />
          <StatPill label={t(locale, uiText.fields)} value={String(actualMeta.keys.length)} />
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-[24px] border border-slate-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                {actualMeta.keys.slice(0, 5).map((key) => (
                  <th key={key} className="px-4 py-3 font-medium">{key}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white text-slate-700">
              {previewRows.map((record, index) => (
                <tr key={index}>
                  {actualMeta.keys.slice(0, 5).map((key) => (
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
