import { useEffect, useMemo, useState } from 'react';
import { useHashRoute } from '@/app/useHashRoute';
import { AppStateProvider } from '@/context/AppStateContext';
import { defaultDataset } from '@/data/defaultDataset';
import { AppShell } from '@/layout/AppShell';
import { ChartsPage } from '@/pages/ChartsPage';
import { HomePage } from '@/pages/HomePage';
import { PalettesPage } from '@/pages/PalettesPage';
import { PlaygroundPage } from '@/pages/PlaygroundPage';
import { getThemeById } from '@/themes/themes';
import type { DatasetMeta, DatasetState } from '@/types/dataset';
import { getDatasetMeta, parseCsv, parseJson, toCsv } from '@/utils/dataset';

const defaultState: DatasetState = {
  records: defaultDataset,
  source: 'default',
  fileName: 'scivizlab-sample.csv',
};

function downloadBlob(filename: string, content: string, type: string) {
  const blob = new Blob([content], { type });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}

export default function App() {
  const route = useHashRoute();
  const [dataset, setDataset] = useState<DatasetState>(defaultState);
  const meta = useMemo<DatasetMeta>(() => getDatasetMeta(dataset.records), [dataset.records]);
  const [xKey, setXKey] = useState(meta.xKey);
  const [yKey, setYKey] = useState(meta.yKey);
  const [error, setError] = useState('');
  const [themeId, setThemeId] = useState(() => localStorage.getItem('scivizlab-theme') ?? 'classic-paper');

  useEffect(() => {
    localStorage.setItem('scivizlab-theme', themeId);
  }, [themeId]);

  const safeXKey = meta.keys.includes(xKey) ? xKey : meta.xKey;
  const safeYKey = meta.numericKeys.includes(yKey) ? yKey : meta.yKey;
  const theme = getThemeById(themeId);

  const applyRecords = (records: DatasetState['records'], fileName: string, source: DatasetState['source']) => {
    const nextMeta = getDatasetMeta(records);
    setDataset({ records, fileName, source });
    setXKey(nextMeta.xKey);
    setYKey(nextMeta.yKey);
    setError('');
  };

  const handleFileSelect = async (file: File) => {
    try {
      const text = await file.text();
      const isJson = file.name.toLowerCase().endsWith('.json');
      const records = isJson ? parseJson(text) : parseCsv(text);
      if (records.length < 2) throw new Error('上传的数据至少需要 2 行。');
      const nextMeta = getDatasetMeta(records);
      if (!nextMeta.numericKeys.length) throw new Error('上传的数据需要至少 1 个数值字段。');
      applyRecords(records, file.name, 'upload');
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : '上传失败，请检查文件格式。');
    }
  };

  const value = {
    theme,
    themeId,
    setThemeId,
    dataset,
    meta,
    xKey: safeXKey,
    yKey: safeYKey,
    setXKey,
    setYKey,
    error,
    onFileSelect: handleFileSelect,
    onResetDataset: () => applyRecords(defaultState.records, defaultState.fileName, 'default'),
    onDownloadSampleCsv: () => downloadBlob('scivizlab-sample.csv', toCsv(defaultDataset), 'text/csv;charset=utf-8'),
    onDownloadSampleJson: () => downloadBlob('scivizlab-sample.json', JSON.stringify(defaultDataset, null, 2), 'application/json;charset=utf-8'),
  };

  const page = (() => {
    switch (route) {
      case 'palettes':
        return <PalettesPage />;
      case 'charts':
        return <ChartsPage />;
      case 'playground':
        return <PlaygroundPage />;
      default:
        return <HomePage />;
    }
  })();

  return (
    <AppStateProvider value={value}>
      <AppShell route={route}>{page}</AppShell>
    </AppStateProvider>
  );
}
