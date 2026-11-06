import type { FaqItem } from "@/content/faq";
import { JsonLd } from "@/components/ui/JsonLd";
import { faqJsonLd } from "@/lib/seo";

/** Accordion of <details> cards. First item open. Emits FAQPage JSON-LD. */
export function FAQ({ items }: { items: FaqItem[] }) {
  return (
    <div className="faq">
      <JsonLd data={faqJsonLd(items)} />
      {items.map((f, i) => (
        <details key={f.q} open={i === 0}>
          <summary>
            {f.q}
            <i aria-hidden="true">+</i>
          </summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  );
}
