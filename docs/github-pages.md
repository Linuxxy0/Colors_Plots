# GitHub Pages Deployment Guide

SciVizLab 已经预置了 GitHub Pages 所需的静态站点与自动部署配置，并支持默认数据展示、拖拽上传与示例数据下载。

## 已包含内容

- `vite.config.ts` 使用 `base: './'`，适配 GitHub Pages 的项目路径
- `.github/workflows/deploy.yml`：推送到 `main` 后自动构建并部署
- `public/.nojekyll`：避免 Jekyll 对静态资源的额外处理
- `public/data/scivizlab-sample.csv`
- `public/data/scivizlab-sample.json`
- `package-lock.json`：工作流可直接使用 `npm ci`

## 使用步骤

1. 将整个项目推送到你的 GitHub 仓库
2. 打开仓库设置：`Settings -> Pages`
3. 在 `Build and deployment` 中，将 `Source` 设为 `GitHub Actions`
4. 确保默认分支为 `main`
5. 推送代码后，等待 Actions 执行完成

## 本地构建

```bash
npm install
npm run build
npm run preview
```

## 数据上传说明

这个项目的数据上传完全运行在浏览器端，因此：

- 可以直接部署到 GitHub Pages
- 不需要额外后端服务
- 上传 CSV / JSON 后即可刷新页面中的图表模块
- 刷新页面后会回到默认示例数据，这是静态站点的预期行为

## 上线后的访问地址

- 用户/组织主页仓库：`https://<username>.github.io/`
- 项目仓库页面：`https://<username>.github.io/<repo-name>/`

由于项目使用相对路径资源配置，作为普通项目仓库部署也可以直接工作。
