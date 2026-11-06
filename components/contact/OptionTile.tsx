import type { UseFormRegisterReturn } from "react-hook-form";

/** Larger radio tile with a title and a sub-label. */
export function OptionTile({
  value,
  label,
  sub,
  registration,
  describedBy,
}: {
  value: string;
  label: string;
  sub: string;
  registration: UseFormRegisterReturn;
  describedBy?: string;
}) {
  return (
    <label className="opt tile">
      <input type="radio" value={value} aria-describedby={describedBy} {...registration} />
      <span>
        {label}
        <small>{sub}</small>
      </span>
    </label>
  );
}
