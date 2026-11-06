/**
 * Re-mounts on every navigation, so the reference's `.page` fade-in replays on
 * each route change. Pure CSS (no JS cost); disabled under prefers-reduced-motion.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page">{children}</div>;
}
