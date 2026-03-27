# SciVizLab

[![React](https://img.shields.io/badge/React-18-20232A?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![GitHub Pages Ready](https://img.shields.io/badge/GitHub_Pages-ready-222222?style=for-the-badge&logo=githubpages&logoColor=white)](#github-pages-部署)

一个面向科研场景的可视化 GitHub 项目模板，强调 **科研配色、结构化首页、多元图表展示、可复用 Dashboard 模块**，并且支持 **默认数据展示、拖拽上传 CSV/JSON、示例数据下载**。

[项目概览](./docs/project-overview.md)

## 项目亮点

- 科研风格首页：适合 GitHub 项目仓库或产品演示站
- 三套主题配色：Classic Paper / Nature Minimal / Lab Dark
- 多元图表预览：折线图、柱状图、热力图、散点图、箱线图、雷达图
- 默认数据即开即看：不上传也能完整展示页面效果
- 拖拽上传：支持 CSV / JSON，本地解析，无需后端
- 示例数据下载：内置 `public/data/scivizlab-sample.csv` 和 `.json`
- GitHub Pages 自动部署：推送到 `main` 后自动构建并发布

## Demo 能力

### 默认数据
首页打开后直接使用内置科研示例数据，适合展示：
- 训练过程趋势
- 模型性能对比
- 特征相关性
- 多指标综合能力

### 自定义上传
用户可以在 Dataset Playground 中：
- 拖拽上传 CSV / JSON
- 选择 X Field / Y Field
- 下载示例数据模板
- 一键恢复默认数据

上传后会同步刷新：
- Hero 预览图
- Chart Gallery
- Dashboard Demo

## 技术栈

- React
- TypeScript
- Vite
- Tailwind CSS

## 目录结构

```bash
scivizlab/
├─ .github/
│  └─ workflows/
│     └─ deploy.yml
├─ docs/
│  ├─ github-pages.md
│  ├─ project-overview.md
│  └─ wireframe.md
├─ public/
│  ├─ .nojekyll
│  └─ data/
│     ├─ scivizlab-sample.csv
│     └─ scivizlab-sample.json
├─ src/
│  ├─ components/
│  │  ├─ charts/
│  │  ├─ sections/
│  │  └─ ui/
│  ├─ data/
│  │  └─ defaultDataset.ts
│  ├─ themes/
│  ├─ types/
│  ├─ utils/
│  ├─ App.tsx
│  ├─ index.css
│  ├─ main.tsx
│  └─ vite-env.d.ts
├─ index.html
├─ package.json
├─ package-lock.json
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

本地预览：

```bash
npm run preview
```

## GitHub Pages 部署

项目已内置 GitHub Pages 自动部署配置：

- `vite.config.ts` 使用相对路径 `base: './'`
- `.github/workflows/deploy.yml` 支持推送到 `main` 自动部署
- `public/.nojekyll` 已添加
- `package-lock.json` 已包含，可直接使用 `npm ci`

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
- DataPlaygroundSection
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
- 增加 PNG / SVG 导出能力
- 新增论文结果模板页和多语言支持
- 增强字段映射、数据校验和图表编辑能力

## License

MIT
