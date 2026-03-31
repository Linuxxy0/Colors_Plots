// 所有图表已删除

export type ChartCategory = 'Trend' | 'Comparison' | 'Distribution' | 'Correlation' | 'Multi-metric';

export type ChartDefinition = {
  id: string;
  name: string;
  category: ChartCategory;
  shortDescription: string;
  recommendedFor: string[];
  supportedFields: string;
  component: any;
};

export const chartCatalog: ChartDefinition[] = [];

export function getChartById(chartId: string) {
  return chartCatalog[0];
}
