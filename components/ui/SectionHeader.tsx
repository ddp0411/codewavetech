import type { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";

/**
 * Two-column header aligned to the bottom: eyebrow + H2 on the left, lead and
 * optional link/actions on the right. Stacks under 1100px.
 */
export function SectionHeader({
  eyebrow,
  title,
  lead,
  actions,
  id,
  stacked = false,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  actions?: ReactNode;
  id?: string;
  stacked?: boolean;
}) {
  return (
    <div className={stacked ? "shead stack-1" : "shead"}>
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="h2" id={id}>
          {title}
        </h2>
      </div>
      {(lead || actions) && (
        <div className="r">
          {lead && <p className="lead">{lead}</p>}
          {actions}
        </div>
      )}
    </div>
  );
}
