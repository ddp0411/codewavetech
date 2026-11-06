import Link from "next/link";
import { type Service, serviceCount, serviceHref } from "@/content/services";
import { NorthEastIcon, PathIcon } from "@/components/ui/Icons";

export function ServiceCard({ service }: { service: Service }) {
  const { count, label } = serviceCount(service);
  return (
    <Link className="svc" href={serviceHref(service)}>
      <div className="top">
        <span className="ic">
          <PathIcon paths={service.icon} />
        </span>
        <span className="go" aria-hidden="true">
          <NorthEastIcon />
        </span>
      </div>
      <h3>{service.title}</h3>
      <p>{service.description}</p>
      <span className="meta">
        {count} {label}
      </span>
    </Link>
  );
}
