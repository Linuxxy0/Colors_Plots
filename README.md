# SciVizLab

[![React](https://img.shields.io/badge/React-18-20232A?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![GitHub Pages Ready](https://img.shields.io/badge/GitHub_Pages-ready-222222?style=for-the-badge&logo=githubpages&logoColor=white)](./docs/github-pages.md)

面向科研展示场景的轻量前端模板，聚焦于配色方案、图表预览和本地数据实验。项目可以直接部署到 GitHub Pages，不依赖后端服务。

[项目概览](./docs/project-overview.md)

## 功能概览

- 4 个核心页面：首页、配色库、图表库、数据实验台
- 3 套科研主题：Classic Paper / Nature Minimal / Lab Dark
- 6 类常见科研图表：折线图、柱状图、热力图、散点图、箱线图、雷达图
- 支持本地上传 CSV / JSON
- 上传后全站图表预览同步切换到你的数据
- 默认内置样例数据，开箱即看
- 内置 GitHub Pages 自动部署工作流

## 技术栈

- React 18
- TypeScript 5
- Vite 5
- Tailwind CSS 3
- React Router DOM 6

## 当前目录结构

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
│     ├─ sample.csv
│     ├─ sample.json
│     ├─ scivizlab-sample.csv
│     └─ scivizlab-sample.json
├─ src/
│  ├─ components/
│  │  ├─ charts/
│  │  ├─ layout/
│  │  ├─ palettes/
│  │  └─ playground/
│  ├─ context/
│  ├─ data/
│  ├─ pages/
│  ├─ themes/
│  ├─ types/
│  ├─ utils/
│  ├─ App.tsx
│  ├─ index.css
│  └─ main.tsx
├─ index.html
├─ package.json
├─ package-lock.json
└─ vite.config.ts
```

## 本地开发

```bash
npm install
npm run dev
```

生产构建：

```bash
npm run build
```

本地预览：

```bash
npm run preview
```

## GitHub Pages 部署

项目已经内置 GitHub Pages 自动部署配置：

- `vite.config.ts` 使用 `base: './'`
- `.github/workflows/deploy.yml` 会在推送到 `main` 后自动构建并部署
- `public/.nojekyll` 已包含
- `package-lock.json` 已包含，可直接使用 `npm ci`

部署步骤：

1. 将仓库推送到 GitHub
2. 进入 `Settings -> Pages`
3. 将 `Source` 设置为 `GitHub Actions`
4. 推送到 `main` 分支
5. 等待 Actions 完成部署

详细说明见：[GitHub Pages 部署文档](./docs/github-pages.md)

## 适用场景

- GitHub 项目展示页
- 科研项目主页
- 课程作业或实验结果展示
- 轻量数据可视化作品集

## 后续扩展建议

- 接入真实图表库，例如 ECharts / Recharts / D3
- 增加 PNG / SVG 导出能力
- 增强字段映射和数据校验
- 增加更多图表类型和多系列支持

## License

MIT
