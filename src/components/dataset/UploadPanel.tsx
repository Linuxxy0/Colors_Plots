import { useRef, useState } from 'react';
import { useAppState } from '@/context/AppStateContext';

export function UploadPanel() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [dragging, setDragging] = useState(false);
  const { dataset, error, onFileSelect, onResetDataset, onDownloadSampleCsv, onDownloadSampleJson } = useAppState();

  const handleFiles = async (files: FileList | null) => {
    const file = files?.[0];
    if (!file) return;
    await onFileSelect(file);
  };

  return (
    <section className="rounded-[28px] border border-slate-200/80 bg-white/88 p-6 shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.22em] text-slate-400">Dataset</div>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">上传数据或使用默认样例</h2>
        </div>
        <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">{dataset.source === 'default' ? 'Default' : 'Uploaded'}</div>
      </div>

      <div
        className={`mt-6 rounded-[24px] border-2 border-dashed p-6 text-center transition ${dragging ? 'border-slate-500 bg-slate-50' : 'border-slate-300 bg-slate-50/80'}`}
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);
          void handleFiles(event.dataTransfer.files);
        }}
      >
        <div className="text-sm font-medium text-slate-800">拖拽 CSV / JSON 到这里</div>
        <p className="mt-2 text-sm leading-6 text-slate-500">上传后会同步刷新图表库、配色预览和数据实验台。</p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <button className="button-primary" onClick={() => inputRef.current?.click()}>选择文件</button>
          <button className="button-secondary" onClick={onResetDataset}>恢复默认数据</button>
        </div>
        <input ref={inputRef} hidden type="file" accept=".csv,.json,application/json,text/csv" onChange={(event) => void handleFiles(event.target.files)} />
      </div>

      <div className="mt-5 text-sm text-slate-500">
        当前文件：<span className="font-medium text-slate-800">{dataset.fileName}</span>
      </div>
      {error ? <div className="mt-3 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div> : null}

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <button className="button-secondary" onClick={onDownloadSampleCsv}>下载示例 CSV</button>
        <button className="button-secondary" onClick={onDownloadSampleJson}>下载示例 JSON</button>
      </div>
    </section>
  );
}
