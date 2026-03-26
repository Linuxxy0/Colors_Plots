import {
  ChartGallerySection,
  DashboardDemoSection,
  DocsRoadmapSection,
  Footer,
  HeroSection,
  HighlightsSection,
  Navbar,
  QuickStartSection,
  ThemeShowcaseSection,
  UseCasesSection,
} from '@/components/sections';

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <HighlightsSection />
        <ThemeShowcaseSection />
        <ChartGallerySection />
        <DashboardDemoSection />
        <UseCasesSection />
        <QuickStartSection />
        <DocsRoadmapSection />
      </main>
      <Footer />
    </div>
  );
}
