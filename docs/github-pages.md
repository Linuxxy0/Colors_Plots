# GitHub Pages Deployment Guide

SciVizLab 已经包含 GitHub Pages 所需的构建和部署配置，可以直接使用 GitHub Actions 自动发布。

## 已包含的配置

- `vite.config.ts` 使用 `base: './'`，适配仓库路径部署
- `.github/workflows/deploy.yml` 在推送到 `main` 时自动构建和发布
- `public/.nojekyll` 防止静态资源被 Jekyll 额外处理
- `package-lock.json` 可直接配合 `npm ci`

## 部署步骤

1. 将项目推送到 GitHub 仓库
2. 打开 `Settings -> Pages`
3. 在 `Build and deployment` 中将 `Source` 设置为 `GitHub Actions`
4. 确保默认分支为 `main`
5. 再次推送代码，等待 Actions 执行完成

## 本地构建验证

```bash
npm install
npm run build
npm run preview
```

## 关于数据上传

这个项目的数据上传完全在浏览器端执行，因此：

- 可以直接部署到 GitHub Pages
- 不需要额外后端服务
- 上传 CSV / JSON 后会立即刷新全站图表预览
- 刷新页面后会回到默认样例数据，这属于静态站点的预期行为

## 发布后访问地址

- 用户或组织主页仓库：`https://<username>.github.io/`
- 普通项目仓库：`https://<username>.github.io/<repo-name>/`
