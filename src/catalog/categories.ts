import type { CategoryMeta } from "../types";
import { pcaCategory } from "./pca/info";
import { tsne_umapCategory } from "./tsne-umap/info";
import { heatmapCategory } from "./heatmap/info";
import { sankey_alluvialCategory } from "./sankey-alluvial/info";
import { radar_polarCategory } from "./radar-polar/info";
import { volcano_diffCategory } from "./volcano-diff/info";
import { chord_networkCategory } from "./chord-network/info";
import { bar_line_comboCategory } from "./bar-line-combo/info";
import { compositionCategory } from "./composition/info";

export const categories: CategoryMeta[] = [
  pcaCategory,
  tsne_umapCategory,
  heatmapCategory,
  sankey_alluvialCategory,
  radar_polarCategory,
  volcano_diffCategory,
  chord_networkCategory,
  bar_line_comboCategory,
  compositionCategory,
];
