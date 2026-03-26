# SciVizLab

一个面向科研场景的可视化 GitHub 项目模板，强调 **科研配色、结构化首页、多元图表展示、可复用 Dashboard 模块**。

[项目概览](./docs/project-overview.md)

## 项目亮点

- 科研风格首页：适合放在 GitHub 项目仓库或产品演示站
- 三套主题配色：Classic Paper / Nature Minimal / Lab Dark
- 多元图表预览：折线图、柱状图、热力图、散点图、箱线图、雷达图
- 模块化结构：首页、图表画廊、Dashboard Demo、Quick Start、Roadmap
- 适合继续扩展：论文结果页、实验面板、研究报告页

## 技术栈

- React
- TypeScript
- Vite
- Tailwind CSS

## 目录结构

```bash
scivizlab/
├─ docs/
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
│  ├─ App.tsx
│  ├─ index.css
│  └─ main.tsx
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

GitHub Pages 预览：

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
- 课程设计或毕业设计作品展示
- 数据可视化作品集

## 后续可扩展方向

- 接入真实图表库，如 ECharts / Recharts / D3
- 增加导出 PNG / SVG 能力
- 新增论文结果模板页和多语言支持
- 接入 CSV / JSON 数据映射

## License

MIT
