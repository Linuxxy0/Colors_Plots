import { BarChart3, Boxes, Flame, GitBranch, LayoutGrid, LineChart, Radar, ScanSearch, Waves } from "lucide-react";
import type { CategoryMeta } from "./types";

export function iconForKey(key: CategoryMeta["iconKey"]) {
  switch (key) {
    case "barChart":
      return BarChart3;
    case "scan":
      return ScanSearch;
    case "grid":
      return LayoutGrid;
    case "waves":
      return Waves;
    case "radar":
      return Radar;
    case "flame":
      return Flame;
    case "branch":
      return GitBranch;
    case "line":
      return LineChart;
    case "boxes":
      return Boxes;
    default:
      return BarChart3;
  }
}
