import Link from "next/link";
import type { Industry } from "@/content/industries";
import { getServiceByKey, serviceHref, shortTitle } from "@/content/services";
import { CheckIcon, PathIcon } from "@/components/ui/Icons";

export function IndustryCard({ industry }: { industry: Industry }) {
  return (
    <article className="indcard" id={industry.id}>
      <span className="ii">
        <PathIcon paths={industry.icon} />
      </span>
      <h2>{industry.name}</h2>
      <p>{industry.description}</p>
      <ul>
        {industry.examples.map((x) => (
          <li key={x}>
            <CheckIcon size={13} />
            {x}
          </li>
        ))}
      </ul>
      <ul className="tags" aria-label={`Services for ${industry.name}`}>
        {industry.svc.map((k) => {
          const s = getServiceByKey(k);
          if (!s) return null;
          return (
            <li key={k}>
              <Link href={serviceHref(s)}>{shortTitle(s.title)}</Link>
            </li>
          );
        })}
      </ul>
    </article>
  );
}
