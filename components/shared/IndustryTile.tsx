import Link from "next/link";
import type { Industry } from "@/content/industries";
import { PathIcon } from "@/components/ui/Icons";

/** Compact tile: icon, name and sub-label. Links to the industry on /industries. */
export function IndustryTile({ industry }: { industry: Industry }) {
  return (
    <Link href={`/industries#${industry.id}`}>
      <span className="ii">
        <PathIcon paths={industry.icon} size={20} />
      </span>
      <span>
        <b>{industry.name}</b>
        <small>{industry.sub}</small>
      </span>
    </Link>
  );
}

export function IndustryTiles({ list, auto = false }: { list: Industry[]; auto?: boolean }) {
  return (
    <ul className={auto ? "ind auto" : "ind"}>
      {list.map((i) => (
        <li key={i.id}>
          <IndustryTile industry={i} />
        </li>
      ))}
    </ul>
  );
}
