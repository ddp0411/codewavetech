import type { UseFormRegisterReturn } from "react-hook-form";

/** Tap-to-select chip backed by a real checkbox or radio input. */
export function OptionChip({
  type = "radio",
  value,
  label,
  registration,
  describedBy,
}: {
  type?: "radio" | "checkbox";
  value: string;
  label: string;
  registration: UseFormRegisterReturn;
  describedBy?: string;
}) {
  return (
    <label className="opt">
      <input type={type} value={value} aria-describedby={describedBy} {...registration} />
      <span>{label}</span>
    </label>
  );
}
