import { useMemo, useState } from "react";
import {
  CartesianGrid,
  ReferenceArea,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";
import type { ExampleMeta, PlotPoint } from "../types";
import { Badge, Button, SwitchRow } from "../ui";
import { COLORS, SYMBOL_LABELS, ellipseBox, formatTick, getBounds, getGroups, getSubtypes, shapeType, t, withLabelIndex } from "../utils/pca";

function downloadJson(filename: string, data: unknown) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

function CustomTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: PlotPoint }> }) {
  if (!active || !payload || payload.length === 0) return null;
  const point = payload[0]?.payload;
  if (!point) return null;

  return (
    <div className="tooltip-card">
      <div className="tooltip-title">{point.id}</div>
      <div className="tooltip-item">分组：{t(point.group)}</div>
      <div className="tooltip-item">子类：{t(point.subtype)}</div>
      <div className="tooltip-item">PC1：{point.x.toFixed(2)}</div>
      <div className="tooltip-item">PC2：{point.y.toFixed(2)}</div>
    </div>
  );
}

function MarkerShape({ cx = 0, cy = 0, subtype, color }: { cx?: number; cy?: number; subtype: string; color: string }) {
  const size = 7;
  const stroke = "#0f172a";

  if (shapeType(subtype) === "triangle") {
    return <polygon points={`${cx},${cy - size} ${cx - size},${cy + size} ${cx + size},${cy + size}`} fill={color} stroke={stroke} strokeWidth={1.1} />;
  }
  if (shapeType(subtype) === "diamond") {
    return <polygon points={`${cx},${cy - size} ${cx - size},${cy} ${cx},${cy + size} ${cx + size},${cy}`} fill={color} stroke={stroke} strokeWidth={1.1} />;
  }
  if (shapeType(subtype) === "square") {
    return <rect x={cx - size} y={cy - size} width={size * 2} height={size * 2} rx={1.5} fill={color} stroke={stroke} strokeWidth={1.1} />;
  }
  return <circle cx={cx} cy={cy} r={size} fill={color} stroke={stroke} strokeWidth={1.1} />;
}

function renderScatterShape(subtype: string, color: string, showBadges: boolean) {
  return function CustomShape(props: unknown) {
    const shapeProps = (props ?? {}) as { payload?: PlotPoint; cx?: number; cy?: number };
    const point = shapeProps.payload;
    const cx = typeof shapeProps.cx === "number" ? shapeProps.cx : 0;
    const cy = typeof shapeProps.cy === "number" ? shapeProps.cy : 0;
    if (!point) return <g />;

    const labelIndex = point.labelIndex;
    const shouldShowBadge = showBadges && point.highlight && labelIndex !== null;
    const badgeDirection = (labelIndex || 1) % 2 === 0 ? -1 : 1;
    const dx = badgeDirection * 18;
    const dy = (labelIndex || 1) % 3 === 0 ? 18 : -18;
    const badgeX = cx + dx;
    const badgeY = cy + dy;

    return (
      <g>
        <MarkerShape cx={cx} cy={cy} subtype={subtype} color={color} />
        {shouldShowBadge ? (
          <g>
            <line x1={cx} y1={cy} x2={badgeX} y2={badgeY} stroke={color} strokeWidth={1.2} strokeDasharray="3 2" />
            <circle cx={badgeX} cy={badgeY} r={9} fill="white" stroke={color} strokeWidth={1.8} />
            <text x={badgeX} y={badgeY + 3} textAnchor="middle" fontSize={10} fontWeight={700} fill="#0f172a">
              {labelIndex}
            </text>
          </g>
        ) : null}
      </g>
    );
  };
}

export function PcaPlotCard({ example }: { example: ExampleMeta }) {
  const [showRegions, setShowRegions] = useState(example.defaultRegions);
  const [showLabels, setShowLabels] = useState(example.defaultLabels);
  const plotPoints = useMemo(() => withLabelIndex(example.points), [example.points]);
  const bounds = useMemo(() => getBounds(plotPoints), [plotPoints]);
  const groups = useMemo(() => getGroups(plotPoints), [plotPoints]);
  const subtypes = useMemo(() => getSubtypes(plotPoints), [plotPoints]);
  const highlighted = useMemo(() => plotPoints.filter((point) => point.labelIndex !== null), [plotPoints]);

  return (
    <div className="card panel">
      <div className="row-wrap gap-8 mb-12">
        <Badge tone="muted">{example.badge}</Badge>
        <Badge tone="outline">样本数 {example.points.length}</Badge>
      </div>
      <h2 className="plot-title">{example.title}</h2>
      <p className="plot-desc">{example.description}</p>

      <div className="meta-grid">
        <div><span className="meta-label">分组：</span>{groups.map((group) => t(group)).join("、")}</div>
        <div><span className="meta-label">子类：</span>{subtypes.map((subtype) => t(subtype)).join("、")}</div>
      </div>

      <div className="toolbar-row">
        <SwitchRow checked={showRegions} onChange={setShowRegions} label="显示分组区域" />
        <SwitchRow checked={showLabels} onChange={setShowLabels} label="显示重点编号" />
        <Button onClick={() => downloadJson(`${example.badge.toLowerCase()}.json`, example.points)}>下载示例数据</Button>
      </div>

      <div className="chart-shell">
        <div className="chart-box">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 28, bottom: 40, left: 24 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.22)" />
              <XAxis
                type="number"
                dataKey="x"
                domain={[bounds.minX, bounds.maxX]}
                tick={{ fontSize: 12, fill: "#0f172a" }}
                tickFormatter={formatTick}
                axisLine={{ stroke: "#0f172a" }}
                tickLine={{ stroke: "#0f172a" }}
                label={{ value: "PC1（41.2%）", position: "insideBottom", offset: -12, fill: "#0f172a" }}
              />
              <YAxis
                type="number"
                dataKey="y"
                domain={[bounds.minY, bounds.maxY]}
                tick={{ fontSize: 12, fill: "#0f172a" }}
                tickFormatter={formatTick}
                axisLine={{ stroke: "#0f172a" }}
                tickLine={{ stroke: "#0f172a" }}
                label={{ value: "PC2（18.7%）", angle: -90, position: "insideLeft", fill: "#0f172a" }}
              />
              <ZAxis type="number" range={[70, 70]} />
              <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: "4 4" }} />

              {showRegions
                ? groups.map((group) => {
                    const subset = plotPoints.filter((point) => point.group === group);
                    const box = ellipseBox(subset);
                    if (!box) return null;
                    return (
                      <ReferenceArea
                        key={`region-${group}`}
                        x1={box.minX}
                        x2={box.maxX}
                        y1={box.minY}
                        y2={box.maxY}
                        fill={COLORS[group] || "#94a3b8"}
                        fillOpacity={0.07}
                        stroke={COLORS[group] || "#94a3b8"}
                        strokeOpacity={0.24}
                        ifOverflow="extendDomain"
                      />
                    );
                  })
                : null}

              {groups.flatMap((group) =>
                subtypes.map((subtype) => {
                  const subset = plotPoints.filter((point) => point.group === group && point.subtype === subtype);
                  if (subset.length === 0) return null;
                  return (
                    <Scatter
                      key={`${group}-${subtype}`}
                      name={`${t(group)} · ${t(subtype)}`}
                      data={subset}
                      shape={renderScatterShape(subtype, COLORS[group] || "#64748b", showLabels)}
                    />
                  );
                })
              )}
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="chip-row mt-16">
        {groups.flatMap((group) =>
          subtypes
            .filter((subtype) => plotPoints.some((point) => point.group === group && point.subtype === subtype))
            .map((subtype) => (
              <div key={`${group}-${subtype}`} className="legend-pill">
                <span className="legend-dot" style={{ backgroundColor: COLORS[group] || "#94a3b8" }} />
                <span>{t(group)} · {t(subtype)}</span>
              </div>
            ))
        )}
      </div>

      {showLabels && highlighted.length > 0 ? (
        <div className="annotation-box">
          <div className="annotation-title">重点样本说明</div>
          <div className="annotation-grid">
            {highlighted.map((point) => (
              <div key={point.id} className="annotation-item">
                <span className="annotation-badge">{point.labelIndex}</span>
                <span className="annotation-name">{point.id}</span>
                <span className="annotation-meta">{t(point.group)} / {t(point.subtype)}</span>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div className="annotation-box mt-16">
        <div className="annotation-title">图形编码说明</div>
        <div className="annotation-grid small-grid">
          {Object.entries(SYMBOL_LABELS).map(([key, label]) => (
            <div key={key} className="annotation-item plain">
              <span className="annotation-name">{t(key)}</span>
              <span className="annotation-meta">对应点形状：{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
