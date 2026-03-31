import type { ExampleMeta } from "../types";
import { ArrowRight } from "lucide-react";
import { Badge } from "../ui";

type Props = {
  example: ExampleMeta;
  isActive: boolean;
  onOpen: () => void;
};

export function ExampleDirectoryCard({ example, isActive, onOpen }: Props) {
  return (
    <button type="button" onClick={onOpen} className={`example-card ${isActive ? "is-active" : ""}`}>
      <div className="example-top">
        <Badge tone={isActive ? "muted" : "outline"}>{example.badge}</Badge>
        <ArrowRight className="icon-16" />
      </div>
      <div className="example-title">{example.title}</div>
      <p className="example-desc">{example.description}</p>
      <div className="chip-row">
        {example.styleTags.map((tag) => (
          <span className="chip" key={tag}>{tag}</span>
        ))}
      </div>
    </button>
  );
}
