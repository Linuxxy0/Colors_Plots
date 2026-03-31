import type { DatasetRecord } from '@/types/dataset';

type Props = {
  chartId: string;
  records: DatasetRecord[];
  xKey: string;
  yKey: string;
  theme?: string;
  mode?: 'card' | 'detail';
  compact?: boolean;
  title?: string;
  numericKeys?: string[];
};

// 所有图表组件已删除 - 占位符
export function ChartPreview({
  chartId,
  records,
  xKey,
  yKey,
  theme,
  mode = 'detail',
  compact = false,
  title,
  numericKeys,
}: Props) {
  const height = mode === 'card' ? 'h-40' : 'min-h-[400px]';
  
  return (
    <div className={`flex items-center justify-center bg-slate-50 rounded-lg p-6 ${height}`}>
      <div className="text-center">
        <p className="text-slate-400 text-sm font-medium">
          {title || `Chart: ${chartId}`}
        </p>
        <p className="text-slate-300 text-xs mt-2">
          数据: {records.length} rows | X: {xKey} | Y: {yKey}
        </p>
        <p className="text-slate-300 text-xs mt-1">
          (所有图表组件已删除，此为占位符)
        </p>
      </div>
    </div>
  );
}
