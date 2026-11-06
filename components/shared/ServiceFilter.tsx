"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { allServices } from "@/content/services";
import { ServiceGrid } from "./ServiceGrid";

export const filters = [
  { key: "all", label: "All", cat: null },
  { key: "core", label: "Core", cat: "core" },
  { key: "specialist", label: "Specialist", cat: "more" },
  { key: "government", label: "Government & industries", cat: "gov" },
] as const;

type FilterKey = (typeof filters)[number]["key"];

const toKey = (v: string | null): FilterKey =>
  (filters.find((f) => f.key === v)?.key ?? "all") as FilterKey;

/** Pure view, also used as the Suspense fallback during static rendering. */
export function ServiceFilterView({
  active,
  onChange,
}: {
  active: FilterKey;
  onChange?: (k: FilterKey) => void;
}) {
  const cat = filters.find((f) => f.key === active)?.cat;
  const list = cat ? allServices.filter((s) => s.category === cat) : allServices;
  return (
    <>
      <div className="tabs" role="group" aria-label="Filter services">
        {filters.map((f) => (
          <button
            key={f.key}
            type="button"
            aria-pressed={f.key === active}
            onClick={() => onChange?.(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {list.length} {list.length === 1 ? "service" : "services"}
      </p>
      <ServiceGrid services={list} id="svc-grid" style={{ marginTop: 24 }} />
    </>
  );
}

/** Segmented filter synced to `?filter=` so a filtered view can be shared. */
export function ServiceFilter() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const active = toKey(params.get("filter"));

  const onChange = (k: FilterKey) => {
    const next = new URLSearchParams(params.toString());
    if (k === "all") next.delete("filter");
    else next.set("filter", k);
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  return <ServiceFilterView active={active} onChange={onChange} />;
}
