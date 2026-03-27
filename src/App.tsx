import { useMemo, useState } from 'react';
import { defaultDataset } from '@/data/defaultDataset';
import type { DatasetMeta, DatasetState } from '@/types/dataset';
import { getDatasetMeta, parseCsv, parseJson } from '@/utils/dataset';
import {
  ChartGallerySection,
  DashboardDemoSection,
  DataPlaygroundSection,
  DocsRoadmapSection,
  Footer,
  HeroSection,
  HighlightsSection,
  Navbar,
  QuickStartSection,
  ThemeShowcaseSection,
  UseCasesSection,
} from '@/components/sections';

const defaultState: DatasetState = {
  records: defaultDataset,
  source: 'default',
  fileName: 'scivizlab-sample.csv',
};

export default function App() {
  const [dataset, setDataset] = useState<DatasetState>(defaultState);
  const meta = useMemo<DatasetMeta>(() => getDatasetMeta(dataset.records), [dataset.records]);
  const [xKey, setXKey] = useState(meta.xKey);
  const [yKey, setYKey] = useState(meta.yKey);
  const [error, setError] = useState('');

  const safeXKey = meta.keys.includes(xKey) ? xKey : meta.xKey;
  const safeYKey = meta.numericKeys.includes(yKey) ? yKey : meta.yKey;

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
      if (records.length < 2) {
        throw new Error('上传的数据至少需要 2 行。');
      }
      const nextMeta = getDatasetMeta(records);
      if (!nextMeta.numericKeys.length) {
        throw new Error('上传的数据需要至少 1 个数值字段。');
      }
      applyRecords(records, file.name, 'upload');
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : '上传失败，请检查文件格式。');
    }
  };

  const handleReset = () => {
    applyRecords(defaultState.records, defaultState.fileName, 'default');
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection records={dataset.records} xKey={safeXKey} yKey={safeYKey} numericKeys={meta.numericKeys} />
        <HighlightsSection />
        <ThemeShowcaseSection records={dataset.records} xKey={safeXKey} yKey={safeYKey} numericKeys={meta.numericKeys} />
        <DataPlaygroundSection
          records={dataset.records}
          keys={meta.keys}
          numericKeys={meta.numericKeys}
          xKey={safeXKey}
          yKey={safeYKey}
          source={dataset.source}
          fileName={dataset.fileName}
          error={error}
          onXKeyChange={setXKey}
          onYKeyChange={setYKey}
          onReset={handleReset}
          onFileSelect={handleFileSelect}
        />
        <ChartGallerySection records={dataset.records} xKey={safeXKey} yKey={safeYKey} numericKeys={meta.numericKeys} />
        <DashboardDemoSection records={dataset.records} xKey={safeXKey} yKey={safeYKey} numericKeys={meta.numericKeys} />
        <UseCasesSection />
        <QuickStartSection />
        <DocsRoadmapSection />
      </main>
      <Footer />
    </div>
  );
}
