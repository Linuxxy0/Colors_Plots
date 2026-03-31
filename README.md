# 图形复刻示例库

一个可直接部署到 GitHub Pages 的前端项目，用来按类别组织科研绘图示例，并逐步复刻不同图形。

## 当前包含

- PCA 图（4 个交互式示例）
- 其他类别的目录入口：
  - t-SNE / UMAP
  - 热图 / 聚类图
  - 桑基图 / 冲积图
  - 雷达图 / 极坐标图
  - 火山图 / 差异分析
  - 和弦图 / 网络图
  - 柱线组合图
  - 组成图 / 比例图

## 本地运行

```bash
npm install
npm run dev
```

## 测试

```bash
npm run test
```

## 构建

```bash
npm run build
```

## GitHub Pages 部署

1. 把整个项目推到 GitHub 仓库。
2. 打开仓库的 **Settings -> Pages**。
3. Source 选择 **GitHub Actions**。
4. 推送到 `main` 分支后会自动构建并部署。

## 目录结构

```text
src/
  catalog/
    pca/
      data.ts
      examples.ts
      info.ts
    heatmap/
      info.ts
    sankey-alluvial/
      info.ts
    radar-polar/
      info.ts
    volcano-diff/
      info.ts
    chord-network/
      info.ts
    bar-line-combo/
      info.ts
    composition/
      info.ts
    tsne-umap/
      info.ts
    categories.ts
    index.ts
  components/
    CategoryTile.tsx
    ExampleDirectoryCard.tsx
    PcaPlotCard.tsx
    PlaceholderCategory.tsx
    StatusChecks.tsx
  utils/
    checks.ts
    pca.ts
```
