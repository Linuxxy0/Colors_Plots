import { useMemo, useState } from 'react';
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
import type { DatasetSource } from '@/types/dataset';
import { getDefaultDatasetSource } from '@/utils/dataset';

export default function App() {
  const defaultDataset = useMemo(() => getDefaultDatasetSource(), []);
  const [dataset, setDataset] = useState<DatasetSource>(defaultDataset);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection dataset={dataset} />
        <HighlightsSection />
        <DataPlaygroundSection dataset={dataset} onDatasetChange={setDataset} onReset={() => setDataset(defaultDataset)} />
        <ThemeShowcaseSection />
        <ChartGallerySection dataset={dataset} />
        <DashboardDemoSection dataset={dataset} />
        <UseCasesSection />
        <QuickStartSection />
        <DocsRoadmapSection />
      </main>
      <Footer />
    </div>
  );
}
