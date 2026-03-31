import { useEffect, useMemo, useState } from "react";
import { Download, MousePointerClick, Shapes } from "lucide-react";
import { categories, exampleCatalog } from "./catalog";
import { CategoryTile } from "./components/CategoryTile";
import { ExampleDirectoryCard } from "./components/ExampleDirectoryCard";
import { PcaPlotCard } from "./components/PcaPlotCard";
import { PlaceholderCategory } from "./components/PlaceholderCategory";
import { StatusChecks } from "./components/StatusChecks";
import { Badge, Button } from "./ui";
import { buildChecks } from "./utils/checks";

export default function App() {
  const [activeCategory, setActiveCategory] = useState("pca");
  const [activeExampleKey, setActiveExampleKey] = useState("pca-basic");

  const activeExamples = useMemo(
    () => exampleCatalog.filter((example) => example.categoryId === activeCategory),
    [activeCategory]
  );

  const currentCategory = categories.find((item) => item.id === activeCategory) || categories[0];
  const currentExample = activeExamples.find((item) => item.key === activeExampleKey) || activeExamples[0] || null;
  const checks = useMemo(() => buildChecks(exampleCatalog, categories), []);

  const exampleCountByCategory = useMemo(() => {
    return categories.reduce<Record<string, number>>((acc, category) => {
      acc[category.id] = exampleCatalog.filter((example) => example.categoryId === category.id).length;
      return acc;
    }, {});
  }, []);

  useEffect(() => {
    if (!activeExamples.some((item) => item.key === activeExampleKey)) {
      setActiveExampleKey(activeExamples[0]?.key || "");
    }
  }, [activeExampleKey, activeExamples]);

  return (
    <div className="app-shell">
      <div className="container stack-24">
        <header className="card hero-card">
          <div className="row-wrap gap-8 mb-12">
            <Badge tone="muted">科研绘图目录库</Badge>
            <Badge tone="outline">支持 GitHub Pages 直接部署</Badge>
          </div>
          <h1 className="hero-title">图形复刻示例库</h1>
          <p className="hero-desc">
            这一版不是代码片段，而是一个完整可部署的 GitHub 项目。现有 PCA 作为第一个已上线分类，后续可以继续往热图、和弦图、桑基图、雷达图、火山图等类别里补具体复刻示例。
          </p>
          <div className="summary-grid">
            <div className="summary-card">
              <div className="summary-label">当前已上线</div>
              <div className="summary-value">1</div>
              <div className="summary-meta">个图形类别</div>
            </div>
            <div className="summary-card">
              <div className="summary-label">当前示例数</div>
              <div className="summary-value">{exampleCatalog.length}</div>
              <div className="summary-meta">个可交互示例</div>
            </div>
            <div className="summary-card">
              <div className="summary-label">目录类别</div>
              <div className="summary-value">{categories.length}</div>
              <div className="summary-meta">个可扩展入口</div>
            </div>
            <div className="summary-card text-card">
              <div className="summary-label">交互能力</div>
              <div className="summary-text">支持切换示例、图层开关、编号标注和数据下载。</div>
            </div>
            <div className="summary-card text-card">
              <div className="summary-label">后续复刻</div>
              <div className="summary-text">后面选定某一类图后，直接挂到对应分类目录里。</div>
            </div>
          </div>
        </header>

        <section className="stack-16">
          <div className="section-row">
            <div>
              <div className="section-kicker">图形分类</div>
              <div className="section-heading">按图形类型浏览</div>
            </div>
            <div className="row-wrap gap-8">
              <Button><MousePointerClick className="icon-16" /> 可交互示例</Button>
              <Button><Shapes className="icon-16" /> 可扩展样式</Button>
              <Button><Download className="icon-16" /> 数据下载</Button>
            </div>
          </div>
          <div className="category-grid">
            {categories.map((category) => (
              <CategoryTile
                key={category.id}
                category={category}
                exampleCount={exampleCountByCategory[category.id] || 0}
                isActive={activeCategory === category.id}
                onClick={() => setActiveCategory(category.id)}
              />
            ))}
          </div>
        </section>

        <section className="content-grid">
          <div className="left-col stack-16">
            <div className="card panel">
              <div className="section-title">当前类别目录</div>
              <div className="section-subtitle">当前选中类别下的图示例会按目录方式列出，后面新增复刻图时直接加在这里。</div>
              <div className="stack-12">
                {activeExamples.length > 0 ? (
                  activeExamples.map((example) => (
                    <ExampleDirectoryCard
                      key={example.key}
                      example={example}
                      isActive={currentExample?.key === example.key}
                      onOpen={() => setActiveExampleKey(example.key)}
                    />
                  ))
                ) : (
                  <div className="empty-note">该分类下还没有具体图示例，后续复刻时可以直接补到这里。</div>
                )}
              </div>
            </div>

            <StatusChecks checks={checks} />
          </div>

          <div className="right-col stack-16">
            <div className="card panel">
              <div className="row-between mb-12">
                <div>
                  <div className="row-wrap gap-8 mb-12">
                    <Badge tone={currentCategory.status === "online" ? "muted" : "outline"}>
                      {currentCategory.status === "online" ? "当前分类" : "待扩展分类"}
                    </Badge>
                    <Badge tone="outline">{exampleCountByCategory[currentCategory.id] || 0} 个示例</Badge>
                  </div>
                  <div className="section-title big">{currentCategory.name}</div>
                  <div className="section-subtitle">{currentCategory.description}</div>
                </div>
                <div className="chip-row">
                  {currentCategory.tags.map((tag) => (
                    <span key={tag} className="chip">{tag}</span>
                  ))}
                </div>
              </div>
            </div>

            {currentExample ? <PcaPlotCard example={currentExample} /> : <PlaceholderCategory category={currentCategory} />}
          </div>
        </section>
      </div>
    </div>
  );
}
