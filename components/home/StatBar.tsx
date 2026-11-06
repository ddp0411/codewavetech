const stats = [
  { value: "14", label: "Service areas" },
  { value: "9", label: "Industries served" },
  { value: "1", label: "Team from design to support" },
  { value: "24/7", label: "Support on maintenance plans" },
];

export function StatBar() {
  return (
    <div className="statbar">
      {stats.map((s) => (
        <div key={s.label}>
          <b>{s.value}</b>
          <span>{s.label}</span>
        </div>
      ))}
    </div>
  );
}
