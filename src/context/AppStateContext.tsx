import { createContext, useContext } from 'react';
import type { ThemePalette } from '@/themes/themes';
import type { DatasetMeta, DatasetState } from '@/types/dataset';

export type AppStateValue = {
  theme: ThemePalette;
  themeId: string;
  setThemeId: (themeId: string) => void;
  dataset: DatasetState;
  meta: DatasetMeta;
  xKey: string;
  yKey: string;
  setXKey: (key: string) => void;
  setYKey: (key: string) => void;
  error: string;
  onFileSelect: (file: File) => Promise<void>;
  onResetDataset: () => void;
  onDownloadSampleCsv: () => void;
  onDownloadSampleJson: () => void;
};

const AppStateContext = createContext<AppStateValue | null>(null);

export function AppStateProvider({ value, children }: { value: AppStateValue; children: React.ReactNode }) {
  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within AppStateProvider');
  }
  return context;
}
