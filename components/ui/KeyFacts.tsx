/** White card of label/value rows divided by hairlines. */
export function KeyFacts({ facts }: { facts: [label: string, value: string][] }) {
  return (
    <dl className="facts">
      {facts.map(([label, value]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}
