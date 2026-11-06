"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { GhostButton } from "@/components/ui/GhostButton";
import { StepProgress } from "./StepProgress";
import { OptionChip } from "./OptionChip";
import { OptionTile } from "./OptionTile";
import { SuccessSummary, type BriefResult } from "./SuccessSummary";
import {
  budgetOptions,
  callTimeOptions,
  channelOptions,
  serviceOptions,
  stageOptions,
  timelineOptions,
} from "@/content/contact";
import { site } from "@/content/site";
import {
  MESSAGE_MAX,
  briefDefaults,
  briefSchema,
  formatPhone,
  stepFields,
  type BriefValues,
} from "@/lib/validation";

const DRAFT_KEY = "cwt-brief";
const DRAFT_FIELDS = [
  "services",
  "stage",
  "budget",
  "timeline",
  "message",
  "link",
  "name",
  "company",
  "email",
  "phone",
  "channel",
  "callTime",
] as const satisfies readonly (keyof BriefValues)[];

type Step = 1 | 2 | 3;

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, opts: { action: string }) => Promise<string>;
    };
  }
}

function getRecaptchaToken(siteKey?: string): Promise<string | undefined> {
  if (!siteKey || typeof window === "undefined" || !window.grecaptcha)
    return Promise.resolve(undefined);
  const g = window.grecaptcha;
  return new Promise((resolve) => {
    g.ready(() => {
      g.execute(siteKey, { action: "contact" }).then(resolve, () => resolve(undefined));
    });
  });
}

export function ProjectBriefForm({ recaptchaSiteKey }: { recaptchaSiteKey?: string }) {
  const [step, setStep] = useState<Step>(1);
  const [saved, setSaved] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [result, setResult] = useState<BriefResult | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const stepHeading = useRef<HTMLHeadingElement>(null);
  const saveTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const movedStep = useRef(false);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    reset,
    setFocus,
    getValues,
    setValue,
    clearErrors,
    getFieldState,
    formState: { errors },
  } = useForm<BriefValues>({
    resolver: zodResolver(briefSchema),
    defaultValues: briefDefaults,
    mode: "onSubmit",
    reValidateMode: "onChange",
    shouldFocusError: false,
  });

  const message = watch("message") ?? "";

  /* ---------- draft autosave ---------- */
  const saveDraft = useCallback(() => {
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      try {
        const v = getValues();
        const draft = Object.fromEntries(DRAFT_FIELDS.map((k) => [k, v[k]]));
        localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
        setSaved("Draft saved");
      } catch {
        /* storage unavailable (private mode etc.) */
      }
    }, 400);
  }, [getValues]);

  useEffect(() => {
    const sub = watch((_v, info) => {
      if (info.type === "change") saveDraft();
    });
    return () => sub.unsubscribe();
  }, [watch, saveDraft]);

  // Restore the draft, then pre-select ?service=<key>.
  useEffect(() => {
    let restored = false;
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      const draft = raw ? (JSON.parse(raw) as Partial<BriefValues>) : null;
      if (draft && typeof draft === "object") {
        const next = { ...briefDefaults } as Record<string, unknown>;
        for (const k of DRAFT_FIELDS) {
          const val = draft[k];
          if (val === undefined || val === null || val === "") continue;
          if (k === "services" ? Array.isArray(val) : typeof val === "string") next[k] = val;
        }
        reset(next as BriefValues);
        restored = true;
        setSaved("Draft restored");
      }
    } catch {
      /* ignore corrupt drafts */
    }

    const key = new URLSearchParams(window.location.search).get("service");
    if (key && serviceOptions.some((o) => o.value === key)) {
      const cur = getValues("services") ?? [];
      if (!cur.includes(key)) {
        setValue("services", [...cur, key]);
        saveDraft();
      }
    }
    if (!restored) setSaved("");
  }, [reset, getValues, setValue, saveDraft]);

  useEffect(() => () => clearTimeout(saveTimer.current), []);

  /* ---------- step navigation ---------- */
  const scrollToCard = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    cardRef.current?.scrollIntoView({ block: "start", behavior: reduce ? "auto" : "smooth" });
  };

  useEffect(() => {
    if (!movedStep.current) return;
    stepHeading.current?.focus({ preventScroll: true });
  }, [step]);

  const focusFirstError = (fields: readonly (keyof BriefValues)[], errs = errors) => {
    const first = fields.find((f) => errs[f]);
    if (first) setFocus(first);
  };

  const onValid = async (values: BriefValues) => {
    setSubmitting(true);
    setServerError(false);
    try {
      const recaptchaToken = await getRecaptchaToken(recaptchaSiteKey);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brief: values, recaptchaToken }),
      });
      const data = (await res.json().catch(() => null)) as
        { ok: true; reference: string } | { ok: false; error: string } | null;
      if (!res.ok || !data || !data.ok) throw new Error(data && !data.ok ? data.error : "failed");
      try {
        localStorage.removeItem(DRAFT_KEY);
      } catch {
        /* ignore */
      }
      clearTimeout(saveTimer.current);
      setResult({ reference: data.reference, values });
      scrollToCard();
    } catch {
      setServerError(true);
    } finally {
      setSubmitting(false);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    if (step < 3) {
      const fields = stepFields[step];
      const ok = await trigger(fields);
      if (!ok) {
        const first = fields.find((f) => getFieldState(f).invalid);
        if (first) setFocus(first);
        return;
      }
      movedStep.current = true;
      setStep((s) => (s + 1) as Step);
      scrollToCard();
      return;
    }
    await handleSubmit(onValid, (errs) => {
      const order = [...stepFields[1], ...stepFields[2], ...stepFields[3]];
      const firstStep = ([1, 2, 3] as const).find((n) => stepFields[n].some((f) => errs[f]));
      if (firstStep && firstStep !== step) setStep(firstStep);
      setTimeout(() => focusFirstError(order, errs), 0);
    })();
  };

  const startAgain = () => {
    reset(briefDefaults);
    clearErrors();
    setResult(null);
    setSaved("");
    setServerError(false);
    movedStep.current = true;
    setStep(1);
  };

  /* ---------- helpers ---------- */
  const err = (name: keyof BriefValues) => errors[name]?.message as string | undefined;
  const fieldCls = (name: keyof BriefValues, extra = "") =>
    ["field", extra, errors[name] ? "bad" : ""].filter(Boolean).join(" ");
  const errorText = (name: keyof BriefValues) =>
    err(name) ? (
      <span className="err" id={`e-${name}`}>
        {err(name)}
      </span>
    ) : null;
  const describedBy = (name: keyof BriefValues) => (errors[name] ? `e-${name}` : undefined);

  const phoneReg = register("phone");

  if (result) {
    return (
      <div className="formcard" ref={cardRef}>
        <SuccessSummary result={result} onReset={startAgain} />
      </div>
    );
  }

  const stepTitle = {
    1: "What can we help you with?",
    2: "Tell us a bit more",
    3: "How do we reach you?",
  }[step];
  const stepLead = {
    1: "Choose everything that applies.",
    2: "Rough answers are fine. They help us come prepared.",
    3: "We'll only use this to reply to your request.",
  }[step];

  return (
    <div className="formcard" ref={cardRef}>
      <StepProgress step={step} />
      <form onSubmit={onSubmit} noValidate aria-labelledby="brief-step-title">
        <div className="fstep">
          <h2 id="brief-step-title" ref={stepHeading} tabIndex={-1} style={{ outline: "none" }}>
            <span className="sr-only">Step {step} of 3: </span>
            {stepTitle}
          </h2>
          <p>{stepLead}</p>

          {step === 1 && (
            <>
              <div className={fieldCls("services")} role="group" aria-labelledby="l-services">
                <span className="lbl" id="l-services">
                  Services <span className="hint">· pick one or more</span>
                </span>
                <div className="opts">
                  {serviceOptions.map((o) => (
                    <OptionChip
                      key={o.value}
                      type="checkbox"
                      value={o.value}
                      label={o.label}
                      registration={register("services")}
                      describedBy={describedBy("services")}
                    />
                  ))}
                </div>
                {errorText("services")}
              </div>
              <div className={fieldCls("stage")} role="radiogroup" aria-labelledby="l-stage">
                <span className="lbl" id="l-stage">
                  Where are you today?
                </span>
                <div className="opts tiles">
                  {stageOptions.map((o) => (
                    <OptionTile
                      key={o.value}
                      value={o.value}
                      label={o.label}
                      sub={o.sub}
                      registration={register("stage")}
                      describedBy={describedBy("stage")}
                    />
                  ))}
                </div>
                {errorText("stage")}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className={fieldCls("budget")} role="radiogroup" aria-labelledby="l-budget">
                <span className="lbl" id="l-budget">
                  Approximate budget
                </span>
                <div className="opts">
                  {budgetOptions.map((b) => (
                    <OptionChip
                      key={b}
                      value={b}
                      label={b}
                      registration={register("budget")}
                      describedBy={describedBy("budget")}
                    />
                  ))}
                </div>
                {errorText("budget")}
              </div>
              <div className="field" role="radiogroup" aria-labelledby="l-timeline">
                <span className="lbl" id="l-timeline">
                  When do you want to launch?
                </span>
                <div className="opts">
                  {timelineOptions.map((t) => (
                    <OptionChip key={t} value={t} label={t} registration={register("timeline")} />
                  ))}
                </div>
              </div>
              <div className={fieldCls("message")}>
                <label htmlFor="msg">
                  Describe your project <span className="hint">· optional</span>
                </label>
                <textarea
                  className="inp"
                  id="msg"
                  maxLength={MESSAGE_MAX}
                  placeholder="For example: a website and online ordering for our 3 bakery outlets in Pune, with Razorpay and delivery tracking."
                  aria-describedby={["msg-count", describedBy("message")].filter(Boolean).join(" ")}
                  aria-invalid={!!errors.message || undefined}
                  {...register("message")}
                />
                <span className="count" id="msg-count" aria-live="polite">
                  {message.length} / {MESSAGE_MAX}
                </span>
                {errorText("message")}
              </div>
              <div className={fieldCls("link")}>
                <label htmlFor="ref-link">
                  Existing website or app link <span className="hint">· optional</span>
                </label>
                <input
                  className="inp"
                  id="ref-link"
                  type="url"
                  inputMode="url"
                  autoComplete="url"
                  placeholder="https://"
                  aria-describedby={describedBy("link")}
                  aria-invalid={!!errors.link || undefined}
                  {...register("link")}
                />
                {errorText("link")}
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div className="row2">
                <div className={fieldCls("name")}>
                  <label htmlFor="name">Full name</label>
                  <input
                    className="inp"
                    id="name"
                    autoComplete="name"
                    aria-required="true"
                    aria-describedby={describedBy("name")}
                    aria-invalid={!!errors.name || undefined}
                    {...register("name")}
                  />
                  {errorText("name")}
                </div>
                <div className="field">
                  <label htmlFor="company">
                    Company or department <span className="hint">· optional</span>
                  </label>
                  <input
                    className="inp"
                    id="company"
                    autoComplete="organization"
                    {...register("company")}
                  />
                </div>
              </div>
              <div className="row2">
                <div className={fieldCls("email")}>
                  <label htmlFor="email">Work email</label>
                  <input
                    className="inp"
                    id="email"
                    type="email"
                    autoComplete="email"
                    aria-required="true"
                    aria-describedby={describedBy("email")}
                    aria-invalid={!!errors.email || undefined}
                    {...register("email")}
                  />
                  {errorText("email")}
                </div>
                <div className={fieldCls("phone")}>
                  <label htmlFor="phone">Mobile / WhatsApp</label>
                  <div className="phone">
                    <span aria-hidden="true">+91</span>
                    <input
                      className="inp"
                      id="phone"
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel-national"
                      maxLength={11}
                      placeholder="98765 43210"
                      aria-required="true"
                      aria-describedby={["phone-prefix", describedBy("phone")]
                        .filter(Boolean)
                        .join(" ")}
                      aria-invalid={!!errors.phone || undefined}
                      {...phoneReg}
                      onChange={(e) => {
                        e.target.value = formatPhone(e.target.value);
                        void phoneReg.onChange(e);
                      }}
                    />
                  </div>
                  <span className="sr-only" id="phone-prefix">
                    Indian number, country code +91
                  </span>
                  {errorText("phone")}
                </div>
              </div>
              <div className="row2">
                <div className="field" role="radiogroup" aria-labelledby="l-channel">
                  <span className="lbl" id="l-channel">
                    Preferred way to reach you
                  </span>
                  <div className="opts">
                    {channelOptions.map((c) => (
                      <OptionChip key={c} value={c} label={c} registration={register("channel")} />
                    ))}
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="when">Best time to call</label>
                  <select className="inp" id="when" {...register("callTime")}>
                    {callTimeOptions.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className={fieldCls("consent")}>
                <label className="check">
                  <input
                    type="checkbox"
                    aria-describedby={describedBy("consent")}
                    aria-invalid={!!errors.consent || undefined}
                    {...register("consent")}
                  />{" "}
                  I agree to be contacted about this request. CodeWaveTech will not share my details
                  with anyone else.
                </label>
                {errorText("consent")}
              </div>
              <div className="hp" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  {...register("website")}
                />
              </div>
            </>
          )}
        </div>

        <div className="factions">
          {step > 1 ? (
            <GhostButton
              onClick={() => {
                movedStep.current = true;
                setStep((s) => (s - 1) as Step);
              }}
            >
              ← Back
            </GhostButton>
          ) : null}
          <span className="saved" aria-live="polite">
            {saved}
          </span>
          <ArrowButton type="submit" disabled={submitting} aria-busy={submitting || undefined}>
            {step === 3 ? (submitting ? "Sending…" : "Send my brief") : "Continue"}
          </ArrowButton>
        </div>

        {serverError && (
          <p className="form-alert" role="alert">
            We couldn&apos;t send your brief just now. Your answers are still here, so please try
            again, or email us at <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        )}
      </form>
    </div>
  );
}
