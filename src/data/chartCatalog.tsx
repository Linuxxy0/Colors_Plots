import type { ComponentType } from 'react';
import { BarChartCard, BoxPlotCard, HeatmapCard, LineChartCard, RadarChartCard, ScatterChartCard } from '@/components/charts';
import type { DatasetChartProps } from '@/components/charts/chartTypes';

export type ChartCategory = 'Trend' | 'Comparison' | 'Distribution' | 'Correlation' | 'Multi-metric';

export type ChartDefinition = {
  id: string;
  name: string;
  category: ChartCategory;
  shortDescription: string;
  recommendedFor: string[];
  supportedFields: string;
  component: ComponentType<DatasetChartProps>;
};

export const chartCatalog: ChartDefinition[] = [
  {
    id: 'line',
    name: 'Line Chart',
    category: 'Trend',
    shortDescription: '适合训练过程、收敛曲线、时间序列实验追踪。',
    recommendedFor: ['训练趋势', '收敛曲线', 'epoch 对比'],
    supportedFields: 'x + numeric y',
    component: LineChartCard,
  },
  {
    id: 'bar',
    name: 'Bar Chart',
    category: 'Comparison',
    shortDescription: '适合不同模型、实验组或方法的横向对比。',
    recommendedFor: ['模型对比', 'benchmark', 'ablation'],
    supportedFields: 'categorical x + numeric y',
    component: BarChartCard,
  },
  {
    id: 'heatmap',
    name: 'Heatmap',
    category: 'Correlation',
    shortDescription: '适合相关矩阵、模块交互、消融实验矩阵。',
    recommendedFor: ['相关性', '实验矩阵', '特征分析'],
    supportedFields: 'multiple numeric fields',
    component: HeatmapCard,
  },
  {
    id: 'scatter',
    name: 'Scatter Plot',
    category: 'Correlation',
    shortDescription: '适合观察变量关系、离群点和聚类趋势。',
    recommendedFor: ['相关性', '离群点', '分布关系'],
    supportedFields: 'numeric x + numeric y',
    component: ScatterChartCard,
  },
  {
    id: 'boxplot',
    name: 'Boxplot',
    category: 'Distribution',
    shortDescription: '适合比较不同数值字段的分布、偏态与异常点。',
    recommendedFor: ['分布比较', '异常点', '方差观察'],
    supportedFields: 'multiple numeric fields',
    component: BoxPlotCard,
  },
  {
    id: 'radar',
    name: 'Radar Chart',
    category: 'Multi-metric',
    shortDescription: '适合多指标综合能力的整体展示。',
    recommendedFor: ['多指标评估', '模型画像', '能力总览'],
    supportedFields: 'multiple numeric fields',
    component: RadarChartCard,
  },
];

export function getChartById(chartId: string) {
  return chartCatalog.find((chart) => chart.id === chartId) ?? chartCatalog[0];
}
