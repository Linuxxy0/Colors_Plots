import type { CategoryMeta } from "../types";
import { iconForKey } from "../icons";

export function PlaceholderCategory({ category }: { category: CategoryMeta }) {
  const Icon = iconForKey(category.iconKey);
  return (
    <div className="panel card placeholder-panel">
      <div className="placeholder-icon-wrap">
        <Icon className="icon-32" />
      </div>
      <h3>{category.name}</h3>
      <p>{category.description}</p>
      <div className="pill-note">这一类还没有挂具体示例，后面可以直接往目录里继续增加。</div>
      <div className="placeholder-grid">
        <div className="mini-card">
          <div className="mini-title">下一步可复刻</div>
          <div className="mini-desc">先补 2 到 4 个代表性图形，再补示例数据与参数说明。</div>
        </div>
        <div className="mini-card">
          <div className="mini-title">推荐组织方式</div>
          <div className="mini-desc">按“类别 - 图示例 - 交互面板”组织，接近复刻库目录结构。</div>
        </div>
        <div className="mini-card">
          <div className="mini-title">推荐交互</div>
          <div className="mini-desc">支持图层开关、主题切换、数据下载和参数标注。</div>
        </div>
      </div>
    </div>
  );
}
