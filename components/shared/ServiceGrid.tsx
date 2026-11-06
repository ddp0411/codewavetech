import type { CSSProperties } from "react";
import type { Service } from "@/content/services";
import { ServiceCard } from "./ServiceCard";

export function ServiceGrid({
  services,
  id,
  style,
}: {
  services: Service[];
  id?: string;
  style?: CSSProperties;
}) {
  return (
    <ul className="svc-grid" id={id} style={style}>
      {services.map((s) => (
        <li key={s.key}>
          <ServiceCard service={s} />
        </li>
      ))}
    </ul>
  );
}
