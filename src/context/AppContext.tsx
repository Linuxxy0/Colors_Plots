import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { defaultDatasets } from '@/data/library';
import { defaultThemeId, themes } from '@/themes/themes';
import type { ChartKind, DatasetMeta, DatasetRecord, DatasetSource, Language } from '@/types/app';
import { getDatasetMeta, parseCsv, parseJson } from '@/utils/dataset';

type UploadState = {
  records: DatasetRecord[];
  fileName: string;
  source: DatasetSource;
  meta: DatasetMeta;
};

type AppContextValue = {
  language: Language;
  toggleLanguage: () => void;
  themeId: string;
  setThemeId: (id: string) => void;
  currentTheme: (typeof themes)[number];
  uploadState: UploadState;
  applyUpload: (file: File) => Promise<void>;
  resetUpload: () => void;
  getChartDataset: (chartId: ChartKind) => { records: DatasetRecord[]; xKey: string; yKey: string; source: DatasetSource; fileName: string };
  error: string;
  clearError: () => void;
};

const emptyMeta = getDatasetMeta(defaultDatasets.line);
const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('zh');
  const [themeId, setThemeId] = useState(defaultThemeId);
  const [records, setRecords] = useState<DatasetRecord[]>([]);
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');

  const currentTheme = themes.find((theme) => theme.id === themeId) ?? themes[0];
  const uploadMeta = useMemo(() => (records.length ? getDatasetMeta(records) : emptyMeta), [records]);

  const uploadState: UploadState = {
    records,
    fileName,
    source: records.length ? 'upload' : 'default',
    meta: uploadMeta,
  };

  const applyUpload = async (file: File) => {
    const text = await file.text();

    try {
      const isJson = file.name.toLowerCase().endsWith('.json');
      const nextRecords = isJson ? parseJson(text) : parseCsv(text);
      const meta = getDatasetMeta(nextRecords);

      if (!meta.numericKeys.length) {
        throw new Error(language === 'zh' ? '至少需要一个数值字段。' : 'At least one numeric field is required.');
      }

      setRecords(nextRecords);
      setFileName(file.name);
      setError('');
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : language === 'zh' ? '上传失败。' : 'Upload failed.');
      throw uploadError;
    }
  };

  const resetUpload = () => {
    setRecords([]);
    setFileName('');
    setError('');
  };

  const getChartDataset = (chartId: ChartKind) => {
    if (records.length) {
      return {
        records,
        xKey: uploadMeta.xKey,
        yKey: uploadMeta.yKey,
        source: 'upload' as DatasetSource,
        fileName,
      };
    }

    const definitionMap: Record<ChartKind, { xKey: string; yKey: string }> = {
      line: { xKey: 'epoch', yKey: 'score' },
      bar: { xKey: 'model', yKey: 'accuracy' },
      heatmap: { xKey: 'robustness', yKey: 'efficiency' },
      scatter: { xKey: 'params_m', yKey: 'latency' },
      boxplot: { xKey: 'group', yKey: 'score' },
      radar: { xKey: 'accuracy', yKey: 'f1' },
    };

    return {
      records: defaultDatasets[chartId],
      xKey: definitionMap[chartId].xKey,
      yKey: definitionMap[chartId].yKey,
      source: 'default' as DatasetSource,
      fileName: `${chartId}.csv`,
    };
  };

  const value = {
    language,
    toggleLanguage: () => setLanguage((prev) => (prev === 'zh' ? 'en' : 'zh')),
    themeId,
    setThemeId,
    currentTheme,
    uploadState,
    applyUpload,
    resetUpload,
    getChartDataset,
    error,
    clearError: () => setError(''),
  } satisfies AppContextValue;

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
}
