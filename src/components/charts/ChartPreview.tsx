import type { ChartKind } from '@/types/app';
import { BarChartPreview } from './BarChartPreview';
import { BoxplotPreview } from './BoxplotPreview';
import { HeatmapPreview } from './HeatmapPreview';
import { LineChartPreview } from './LineChartPreview';
import { RadarPreview } from './RadarPreview';
import { ScatterPreview } from './ScatterPreview';
import type { ChartPreviewProps } from './types';

type Props = ChartPreviewProps & { chartId: ChartKind };

export function ChartPreview({ chartId, ...props }: Props) {
  switch (chartId) {
    case 'line':
      return <LineChartPreview {...props} />;
    case 'bar':
      return <BarChartPreview {...props} />;
    case 'heatmap':
      return <HeatmapPreview {...props} />;
    case 'scatter':
      return <ScatterPreview {...props} />;
    case 'boxplot':
      return <BoxplotPreview {...props} />;
    case 'radar':
      return <RadarPreview {...props} />;
    default:
      return null;
  }
}
