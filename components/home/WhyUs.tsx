import { ArrowButton } from "@/components/ui/ArrowButton";
import { Eyebrow } from "@/components/ui/Eyebrow";

const rows = [
  {
    bad: [
      "Freelancers disappear",
      "The developer who built your site stopped replying, and nobody else knows the code.",
    ],
    good: [
      "A team that stays",
      "Documented code, shared access and an AMC, so support never depends on one person.",
    ],
  },
  {
    bad: [
      "Too many disconnected tools",
      "Billing, inventory and CRM sit in separate apps that never sync.",
    ],
    good: [
      "One connected system",
      "POS, store, CRM and accounts linked through APIs, with one dashboard on top.",
    ],
  },
  {
    bad: [
      "Security you keep postponing",
      "No backups, an expired SSL and a site that got hacked once already.",
    ],
    good: [
      "Secure by default",
      "Daily backups, SSL, monitoring and security hardening included in every plan.",
    ],
  },
] as const;

export function WhyUs() {
  return (
    <section className="tight" aria-labelledby="why-title">
      <div className="wrap">
        <div className="why">
          <div className="sticky">
            <Eyebrow>Why CodeWaveTech</Eyebrow>
            <h2 className="h2" id="why-title">
              Managing your tech wasn&apos;t supposed to be your second job.
            </h2>
            <p className="lead">
              Between customers, staff and sales, software problems keep pulling you away from
              growth. Here&apos;s how we take them off your plate.
            </p>
            <ArrowButton href="/contact">Book free 30-min consultation</ArrowButton>
          </div>
          <div className="cmp">
            {rows.map((r) => (
              <article key={r.good[0]}>
                <div className="bad">
                  <small>The usual problem</small>
                  <h3>{r.bad[0]}</h3>
                  <p>{r.bad[1]}</p>
                </div>
                <div className="good">
                  <small>With us</small>
                  <h3>{r.good[0]}</h3>
                  <p>{r.good[1]}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
