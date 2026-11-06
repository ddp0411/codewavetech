import { progressLabels } from "@/content/contact";

/** 3-segment progress bar. The step is also announced in text by the form. */
export function StepProgress({ step }: { step: number }) {
  return (
    <ol className="prog" aria-hidden="true">
      {progressLabels.map((label, i) => (
        <li key={label} className={i + 1 < step ? "done" : i + 1 === step ? "cur" : undefined}>
          <i />
          <span>{label}</span>
        </li>
      ))}
    </ol>
  );
}
