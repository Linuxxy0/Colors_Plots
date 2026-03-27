# SciVizLab

一个面向科研场景的可视化 GitHub 项目模板，强调 **科研配色、结构化首页、多元图表展示、可复用 Dashboard 模块**，并且已经支持 **默认示例数据展示 + 用户上传 CSV / JSON 即时替换图表**。

[项目概览](./docs/project-overview.md)

## 项目亮点

- 科研风格首页：适合放在 GitHub 项目仓库或产品演示站
- 三套主题配色：Classic Paper / Nature Minimal / Lab Dark
- 多元图表预览：折线图、柱状图、热力图、散点图、箱线图、雷达图
- 默认内置科研示例数据，开箱即用
- 支持上传 CSV / JSON，首页图表和 Dashboard 自动切换到用户数据
- 模块化结构：首页、上传区、图表画廊、Dashboard Demo、Quick Start、Roadmap
- 适合继续扩展：论文结果页、实验面板、研究报告页

## 技术栈

- React
- TypeScript
- Vite
- Tailwind CSS

## 当前已支持的图表能力

- Line Chart
- Bar Chart
- Heatmap
- Scatter Plot
- Boxplot
- Radar Chart

## 数据上传说明

首页新增了 `Dataset Playground` 模块：

- 默认显示内置 demo 数据
- 支持上传 `.csv` 和 `.json`
- 上传后可切换 `X Field` 和 `Y Field`
- Hero、Chart Gallery、Dashboard Demo 会同步显示新数据
- 可一键恢复默认数据

推荐上传格式：

### CSV

```csv
epoch,accuracy,f1,precision,recall,loss
1,71.2,68.4,70.1,66.8,0.92
2,76.8,74.2,75.6,72.9,0.76
3,82.1,79.6,80.4,78.7,0.58
```

### JSON

```json
[
  { "epoch": 1, "accuracy": 71.2, "f1": 68.4 },
  { "epoch": 2, "accuracy": 76.8, "f1": 74.2 },
  { "epoch": 3, "accuracy": 82.1, "f1": 79.6 }
]
```

## 目录结构

```bash
scivizlab/
├─ docs/
│  ├─ github-pages.md
│  ├─ project-overview.md
│  └─ wireframe.md
├─ public/
├─ src/
│  ├─ components/
│  │  ├─ charts/
│  │  ├─ sections/
│  │  └─ ui/
│  ├─ data/
│  ├─ themes/
│  ├─ types/
│  ├─ utils/
│  ├─ App.tsx
│  ├─ index.css
│  └─ main.tsx
├─ .github/workflows/
├─ index.html
├─ package.json
├─ postcss.config.cjs
├─ tailwind.config.cjs
├─ tsconfig.app.json
├─ tsconfig.json
├─ tsconfig.node.json
└─ vite.config.ts
```

## 快速开始

```bash
npm install
npm run dev
```

构建生产版本：

```bash
npm run build
```

GitHub Pages 本地预览：

```bash
npm run preview
```

## GitHub Pages 部署

项目已内置 GitHub Pages 自动部署配置：

- `vite.config.ts` 已设置相对路径 `base: './'`
- `.github/workflows/deploy.yml` 已支持推送到 `main` 自动部署
- `public/.nojekyll` 已添加

使用方式：

1. 将项目推送到 GitHub 仓库
2. 进入 `Settings -> Pages`
3. 将 `Source` 设置为 `GitHub Actions`
4. 推送到 `main` 后自动上线

详细说明见：[GitHub Pages 部署文档](./docs/github-pages.md)

## 首页模块

- Navbar
- HeroSection
- HighlightsSection
- DataPlaygroundSection
- ThemeShowcaseSection
- ChartGallerySection
- DashboardDemoSection
- UseCasesSection
- QuickStartSection
- DocsRoadmapSection
- Footer

## 适用场景

- GitHub 项目展示页
- 科研项目主页
- 实验结果可视化首页
- 可上传数据的演示站
- 课程设计或毕业设计作品展示
- 数据可视化作品集

## 后续可扩展方向

- 接入真实图表库，如 ECharts / Recharts / D3
- 增加导出 PNG / SVG 能力
- 支持更多上传格式和字段映射规则
- 新增论文结果模板页和多语言支持

## License

MIT
