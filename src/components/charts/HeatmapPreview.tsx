import { useMemo, useState } from 'react';
import type { HoverInfo } from '@/types/app';
import { formatMetric, getNumericValues, pearson } from '@/utils/dataset';
import type { ChartPreviewProps } from './types';
import { PreviewShell } from './PreviewShell';

function colorByValue(value: number, accent: string, warm: string) {
  const alpha = 0.12 + Math.abs(value) * 0.72;
  return value >= 0 ? `${accent}${Math.round(alpha * 255).toString(16).padStart(2, '0')}` : `${warm}${Math.round(alpha * 255).toString(16).padStart(2, '0')}`;
}

export function HeatmapPreview({ records, theme, mode = 'card' }: ChartPreviewProps) {
  const keys = useMemo(() => Object.keys(records[0] ?? {}).filter((key) => key !== 'row_id').slice(0, 4), [records]);
  const cells = useMemo(
    () =>
      keys.flatMap((rowKey, rowIndex) =>
        keys.map((colKey, colIndex) => ({
          rowIndex,
          colIndex,
          rowKey,
          colKey,
          value: rowKey === colKey ? 1 : pearson(getNumericValues(records, rowKey), getNumericValues(records, colKey)),
        })),
      ),
    [keys, records],
  );
  const [info, setInfo] = useState<HoverInfo>({ primaryLabel: 'pair', primaryValue: `${cells[0]?.rowKey ?? ''} / ${cells[0]?.colKey ?? ''}`, secondaryLabel: 'corr', secondaryValue: formatMetric(cells[0]?.value ?? 0) });
  const size = mode === 'detail' ? 72 : 56;

  return (
    <PreviewShell title="相关性热力图" subtitle="numeric feature matrix" badge="hover" theme={theme} mode={mode} info={info}>
      <div className="grid justify-center gap-3" style={{ gridTemplateColumns: `repeat(${keys.length}, minmax(0, ${size}px))` }}>
        {cells.map((cell) => {
          const active = info.primaryValue === `${cell.rowKey} / ${cell.colKey}`;
          return (
            <button
              key={`${cell.rowKey}-${cell.colKey}`}
              type="button"
              onMouseEnter={() => setInfo({ primaryLabel: 'pair', primaryValue: `${cell.rowKey} / ${cell.colKey}`, secondaryLabel: 'corr', secondaryValue: formatMetric(cell.value) })}
              className="rounded-[20px] border transition"
              style={{
                height: size,
                backgroundColor: colorByValue(cell.value, theme.accent.replace('#', '#'), theme.warm.replace('#', '#')),
                borderColor: active ? theme.foreground : `${theme.muted}22`,
                boxShadow: active ? `0 0 0 2px ${theme.foreground}12 inset` : 'none',
              }}
            />
          );
        })}
      </div>
    </PreviewShell>
  );
}
