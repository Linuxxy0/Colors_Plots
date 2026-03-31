import type { CategoryMeta } from "../types";
import { Badge } from "../ui";
import { iconForKey } from "../icons";

type Props = {
  category: CategoryMeta;
  exampleCount: number;
  isActive: boolean;
  onClick: () => void;
};

export function CategoryTile({ category, exampleCount, isActive, onClick }: Props) {
  const Icon = iconForKey(category.iconKey);
  return (
    <button
      type="button"
      onClick={onClick}
      className={`category-tile ${isActive ? "is-active" : ""}`}
    >
      <div className="tile-top">
        <div className={`tile-icon ${isActive ? "active" : ""}`}>
          <Icon className="icon-18" />
        </div>
        <Badge tone={category.status === "online" ? "muted" : "outline"}>
          {category.status === "online" ? "已上线" : "待扩展"}
        </Badge>
      </div>
      <div className="tile-title-row">
        <div className="tile-title">{category.name}</div>
        <span className="tile-shortname">{category.shortName}</span>
      </div>
      <p className="tile-desc">{category.description}</p>
      <div className="chip-row">
        {category.tags.map((tag) => (
          <span className="chip" key={tag}>{tag}</span>
        ))}
      </div>
      <div className="tile-count">{exampleCount} 个图示例</div>
    </button>
  );
}
