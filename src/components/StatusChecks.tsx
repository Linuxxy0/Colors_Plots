import type { CheckItem } from "../utils/checks";

export function StatusChecks({ checks }: { checks: CheckItem[] }) {
  return (
    <div className="card panel">
      <div className="section-title">状态检查</div>
      <div className="section-subtitle">用于校验目录结构、示例索引和当前示例数据是否可正常扩展。</div>
      <div className="stack-12">
        {checks.map((check) => (
          <div className="check-card" key={check.name}>
            <div className="check-title">{check.name}</div>
            <div className={`check-status ${check.passed ? "pass" : "fail"}`}>{check.passed ? "检查通过" : "检查失败"}</div>
            <div className="check-meta">{check.count} 项记录</div>
          </div>
        ))}
      </div>
    </div>
  );
}
