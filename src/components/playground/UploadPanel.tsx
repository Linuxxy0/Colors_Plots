import { useRef } from 'react';
import { useAppContext } from '@/context/AppContext';

export function UploadPanel() {
  const { language, applyUpload, resetUpload, uploadState, error, clearError } = useAppContext();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onFiles = async (files: FileList | null) => {
    const file = files?.[0];
    if (!file) return;
    await applyUpload(file).catch(() => undefined);
  };

  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.05)]">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-lg font-semibold text-slate-900">{language === 'zh' ? '数据上传' : 'Dataset Upload'}</div>
          <div className="mt-1 text-sm text-slate-500">{language === 'zh' ? '支持 CSV / JSON，上传后全站图表会同步预览。' : 'Supports CSV / JSON. Uploaded data will refresh previews site-wide.'}</div>
        </div>
        <button type="button" onClick={resetUpload} className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">
          {language === 'zh' ? '恢复默认' : 'Reset'}
        </button>
      </div>

      <div
        className="mt-5 rounded-[24px] border border-dashed border-slate-300 bg-slate-50/80 p-6 text-center"
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault();
          void onFiles(event.dataTransfer.files);
        }}
      >
        <div className="text-sm text-slate-500">{language === 'zh' ? '将文件拖拽到这里，或点击按钮选择文件。' : 'Drop files here, or choose a file below.'}</div>
        <div className="mt-4 flex justify-center gap-3">
          <button type="button" onClick={() => inputRef.current?.click()} className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800">
            {language === 'zh' ? '选择文件' : 'Choose file'}
          </button>
          <a href="./data/sample.csv" download className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            {language === 'zh' ? '下载示例 CSV' : 'Sample CSV'}
          </a>
          <a href="./data/sample.json" download className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            {language === 'zh' ? '下载示例 JSON' : 'Sample JSON'}
          </a>
        </div>
        <input ref={inputRef} type="file" accept=".csv,.json,application/json,text/csv" className="hidden" onChange={(event) => void onFiles(event.target.files)} />
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div className="rounded-[22px] bg-slate-50 px-4 py-4">
          <div className="text-sm text-slate-500">{language === 'zh' ? '当前数据源' : 'Current source'}</div>
          <div className="mt-2 text-lg font-semibold text-slate-900">{uploadState.source === 'upload' ? uploadState.fileName : language === 'zh' ? '默认样例数据' : 'Built-in default datasets'}</div>
        </div>
        <div className="rounded-[22px] bg-slate-50 px-4 py-4">
          <div className="text-sm text-slate-500">{language === 'zh' ? '字段摘要' : 'Field summary'}</div>
          <div className="mt-2 text-lg font-semibold text-slate-900">{uploadState.meta.keys.length} {language === 'zh' ? '个字段' : 'fields'} / {uploadState.meta.numericKeys.length} {language === 'zh' ? '个数值字段' : 'numeric'}</div>
        </div>
      </div>

      {error ? (
        <div className="mt-4 flex items-center justify-between rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          <span>{error}</span>
          <button type="button" onClick={clearError} className="font-semibold">{language === 'zh' ? '关闭' : 'Dismiss'}</button>
        </div>
      ) : null}
    </div>
  );
}
