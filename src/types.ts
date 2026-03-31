export type Point = {
  id: string;
  group: string;
  subtype: string;
  x: number;
  y: number;
  highlight: boolean;
};

export type PlotPoint = Point & {
  labelIndex: number | null;
};

export type Bounds = {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
};

export type CategoryStatus = "online" | "coming";

export type CategoryMeta = {
  id: string;
  name: string;
  shortName: string;
  description: string;
  status: CategoryStatus;
  iconKey:
    | "barChart"
    | "scan"
    | "grid"
    | "waves"
    | "radar"
    | "flame"
    | "branch"
    | "line"
    | "boxes";
  tags: string[];
};

export type ExampleMeta = {
  key: string;
  categoryId: string;
  title: string;
  badge: string;
  description: string;
  styleTags: string[];
  chartType: "pca";
  points: Point[];
  defaultRegions: boolean;
  defaultLabels: boolean;
};
