const heights = [38, 52, 44, 66, 58, 74, 92];

/** 7-bar chart that grows in on load (CSS); the last bar uses the accent colour. */
export function ChartBars() {
  return (
    <div className="bars">
      {heights.map((h) => (
        <i key={h} style={{ height: `${h}%` }} />
      ))}
    </div>
  );
}
