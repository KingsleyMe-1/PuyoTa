"use client";

import { useState } from "react";
import { ArrowRight, ChevronDown, ChevronUp, Check } from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────────

type StepStatus = "verified" | "processing" | "required";

interface Step {
  id: string;
  index: number;
  title: string;
  description: string;
  status: StepStatus;
  completedDate?: string;
  processingNote?: string;
  actionLabel?: string;
}

// ── Data ───────────────────────────────────────────────────────────────────────

const INITIAL_STEPS: Step[] = [
  {
    id: "email",
    index: 1,
    title: "Email Address",
    description: "Confirmed for account alerts and landlord communication.",
    status: "verified",
    completedDate: "Mar 15, 2026",
  },
  {
    id: "phone",
    index: 2,
    title: "Mobile Number",
    description: "Used for two-factor authentication and urgent notifications.",
    status: "verified",
    completedDate: "Mar 15, 2026",
  },
  {
    id: "photo",
    index: 3,
    title: "Profile Photo",
    description: "A clear face photo so landlords can identify and trust you.",
    status: "verified",
    completedDate: "Mar 20, 2026",
  },
  {
    id: "gov-id",
    index: 4,
    title: "Government ID",
    description: "A valid government-issued ID confirms your legal identity.",
    status: "processing",
    processingNote: "Submitted · under review, usually 1–2 business days",
  },
  {
    id: "income",
    index: 5,
    title: "Proof of Income",
    description: "Payslip, COE, or 3-month bank statement showing your income.",
    status: "required",
    actionLabel: "Upload Document",
  },
  {
    id: "emergency",
    index: 6,
    title: "Emergency Contact",
    description: "A trusted contact for emergencies during your lease term.",
    status: "required",
    actionLabel: "Add Contact",
  },
];

const PERKS = [
  { label: "Priority ranking in landlord searches", unlocked: true },
  { label: "Verified badge on your profile", unlocked: true },
  { label: "Access to exclusive premium listings", unlocked: true },
  { label: "Faster application approvals", unlocked: false },
  { label: "Reduced security deposit offers", unlocked: false },
];

// ── Helpers ────────────────────────────────────────────────────────────────────

function countByStatus(steps: Step[], s: StepStatus) {
  return steps.filter((st) => st.status === s).length;
}

// ── Step index indicator ───────────────────────────────────────────────────────

function StepIndicator({ step }: { step: Step }) {
  if (step.status === "verified") {
    return (
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
        style={{ background: "#1B2B6B" }}
        aria-hidden="true"
      >
        <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
      </div>
    );
  }
  if (step.status === "processing") {
    return (
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 relative"
        style={{ border: "2px solid #1B2B6B" }}
        aria-hidden="true"
      >
        <span
          className="w-2 h-2 rounded-full animate-pulse"
          style={{ background: "#1B2B6B", opacity: 0.5 }}
        />
      </div>
    );
  }
  // required
  return (
    <div
      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
      style={{ background: "#1B2B6B" }}
      aria-hidden="true"
    >
      <span className="text-[11px] font-black text-white leading-none tabular-nums">
        {String(step.index).padStart(2, "0")}
      </span>
    </div>
  );
}

// ── Required step card ─────────────────────────────────────────────────────────

function RequiredCard({
  step,
  onAction,
}: {
  step: Step;
  onAction: (id: string) => void;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200/70 overflow-hidden shadow-sm">
      <div className="p-4 sm:p-5">
        <div className="flex items-start gap-3.5 sm:gap-4">
          <StepIndicator step={step} />
          <div className="flex-1 min-w-0">
            <p className="text-[13.5px] font-bold text-gray-900 leading-snug">
              {step.title}
            </p>
            <p className="text-[12px] text-gray-500 mt-1 leading-relaxed">
              {step.description}
            </p>
          </div>
        </div>
        <div className="mt-4 pt-4" style={{ borderTop: "1px solid #f3f4f6" }}>
          <button
            onClick={() => onAction(step.id)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-[12.5px] font-bold text-white transition-all duration-200 hover:opacity-90 active:scale-[0.98] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2B6B]/30"
            style={{ background: "#1B2B6B" }}
            aria-label={`${step.actionLabel} for ${step.title}`}
          >
            {step.actionLabel}
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Processing step card ───────────────────────────────────────────────────────

function ProcessingCard({ step }: { step: Step }) {
  return (
    <div
      className="bg-white rounded-xl overflow-hidden shadow-sm"
      style={{ border: "1px solid #e5e7eb" }}
    >
      <div className="p-4 sm:p-5 flex items-start gap-3.5 sm:gap-4">
        <StepIndicator step={step} />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <p className="text-[13.5px] font-bold text-gray-800 leading-snug">
                {step.title}
              </p>
              <p className="text-[12px] text-gray-500 mt-1 leading-relaxed">
                {step.description}
              </p>
            </div>
            <span
              className="shrink-0 text-[10px] font-semibold tracking-wide whitespace-nowrap rounded-full px-3 py-1"
              style={{ background: "#f5f6fa", color: "#6b7280" }}
            >
              Under review
            </span>
          </div>
          {step.processingNote && (
            <p className="text-[11px] text-gray-400 mt-2 italic">
              {step.processingNote}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Completed row (compact) ────────────────────────────────────────────────────

function CompletedRow({
  step,
  isLast,
}: {
  step: Step;
  isLast: boolean;
}) {
  return (
    <div
      className={[
        "flex items-center gap-3.5 py-3",
        !isLast ? "border-b border-gray-100" : "",
      ].join(" ")}
    >
      <div
        className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
        style={{ background: "#EEF0F8" }}
        aria-hidden="true"
      >
        <Check className="w-3 h-3" style={{ color: "#1B2B6B" }} strokeWidth={2.5} />
      </div>
      <p className="flex-1 text-[12.5px] font-medium text-gray-400 leading-snug">
        {step.title}
      </p>
      {step.completedDate && (
        <span className="text-[10.5px] text-gray-300 shrink-0 tabular-nums">
          {step.completedDate}
        </span>
      )}
    </div>
  );
}

// ── Segmented progress bar ─────────────────────────────────────────────────────

function SegmentBar({ steps }: { steps: Step[] }) {
  return (
    <div
      className="flex items-center gap-1"
      role="presentation"
      aria-hidden="true"
    >
      {steps.map((s) => {
        let bg = "#E5E7EB"; // required
        let opacity = 1;
        if (s.status === "verified") bg = "#1B2B6B";
        else if (s.status === "processing") { bg = "#1B2B6B"; opacity = 0.3; }
        return (
          <div
            key={s.id}
            className="flex-1 h-[4px] rounded-full transition-all duration-500"
            style={{ background: bg, opacity }}
          />
        );
      })}
    </div>
  );
}

// ── Arc progress SVG ──────────────────────────────────────────────────────────

function ArcProgress({ value, max }: { value: number; max: number }) {
  const pct = value / max;
  const size = 72;
  const r = 28;
  const cx = size / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - pct);

  return (
    <div className="relative w-[72px] h-[72px] shrink-0">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
        aria-hidden="true"
      >
        <circle cx={cx} cy={cx} r={r} fill="none" stroke="#EEF0F8" strokeWidth="7" />
        <circle
          cx={cx}
          cy={cx}
          r={r}
          fill="none"
          stroke="#1B2B6B"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.7s cubic-bezier(0.4,0,0.2,1)" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[17px] font-black text-gray-900 leading-none tabular-nums">
          {Math.round(pct * 100)}
          <span className="text-[9px] font-medium text-gray-400">%</span>
        </span>
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────

export default function VerificationView() {
  const [steps, setSteps] = useState<Step[]>(INITIAL_STEPS);
  const [completedOpen, setCompletedOpen] = useState(false);

  const verifiedCount = countByStatus(steps, "verified");
  const processingCount = countByStatus(steps, "processing");
  const requiredCount = countByStatus(steps, "required");
  const total = steps.length;

  const requiredSteps = steps.filter((s) => s.status === "required");
  const processingSteps = steps.filter((s) => s.status === "processing");
  const verifiedSteps = steps.filter((s) => s.status === "verified");

  const handleAction = (id: string) => {
    setSteps((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              status: "processing" as StepStatus,
              processingNote: "Submitted · under review, usually 1–2 business days",
              actionLabel: undefined,
            }
          : s
      )
    );
  };

  const nextRequired = requiredSteps[0];

  return (
    <div className="max-w-4xl mx-auto w-full pb-4">

      {/* ── Page header ──────────────────────────────────── */}
      <div className="mb-5">
        <h1 className="text-[22px] font-black text-gray-900 leading-tight tracking-tight">
          Identity Verification
        </h1>
        <p className="text-[12.5px] text-gray-500 mt-0.5">
          Complete all steps to unlock priority access and build trust with landlords.
        </p>
      </div>

      {/* ── Progress strip ───────────────────────────────── */}
      <div
        className="bg-white rounded-2xl p-4 sm:p-5 mb-5 shadow-sm"
        style={{ border: "1px solid #e5e7eb" }}
      >
        <div className="flex items-center justify-between gap-4 mb-3">
          <p className="text-[12px] font-semibold text-gray-700">
            {verifiedCount === total ? (
              "All steps complete — you're fully verified!"
            ) : (
              <>
                <span className="text-[#1B2B6B] font-black">{verifiedCount}</span>
                <span className="text-gray-400 font-normal"> of {total} steps verified</span>
              </>
            )}
          </p>
          {requiredCount > 0 && (
            <span
              className="text-[10.5px] font-bold shrink-0 rounded-full px-2.5 py-[4px]"
              style={{ background: "#EEF0F8", color: "#1B2B6B" }}
            >
              {requiredCount} action{requiredCount !== 1 ? "s" : ""} needed
            </span>
          )}
        </div>
        <SegmentBar steps={steps} />
        <div className="flex items-center justify-between mt-2">
          {steps.map((s, i) => (
            <span
              key={s.id}
              className={[
                "flex-1 text-center text-[8.5px] font-medium truncate",
                s.status === "required" ? "text-[#1B2B6B]" : "text-gray-300",
              ].join(" ")}
            >
              {i === 0 ? "Start" : i === steps.length - 1 ? "Done" : ""}
            </span>
          ))}
        </div>
      </div>

      {/* ── Content grid ─────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-5 items-start">

        {/* ── LEFT: Steps ──────────────────────────────────── */}
        <div className="flex flex-col gap-5">

          {/* Action required */}
          {requiredSteps.length > 0 && (
            <section aria-labelledby="required-heading">
              <div className="flex items-center gap-2 mb-3">
                <p
                  id="required-heading"
                  className="text-[11px] font-bold uppercase tracking-[0.16em]"
                  style={{ color: "#1B2B6B" }}
                >
                  Action Required
                </p>
                <span
                  className="text-[9.5px] font-bold rounded-full px-1.5 py-[2px]"
                  style={{ background: "#1B2B6B", color: "white" }}
                >
                  {requiredSteps.length}
                </span>
              </div>
              <div className="flex flex-col gap-3">
                {requiredSteps.map((step) => (
                  <RequiredCard key={step.id} step={step} onAction={handleAction} />
                ))}
              </div>
            </section>
          )}

          {/* Under review */}
          {processingSteps.length > 0 && (
            <section aria-labelledby="processing-heading">
              <p
                id="processing-heading"
                className="text-[11px] font-bold uppercase tracking-[0.16em] text-gray-400 mb-3"
              >
                Under Review
              </p>
              <div className="flex flex-col gap-3">
                {processingSteps.map((step) => (
                  <ProcessingCard key={step.id} step={step} />
                ))}
              </div>
            </section>
          )}

          {/* Completed — collapsible */}
          {verifiedSteps.length > 0 && (
            <section aria-label="Completed verification steps">
              <button
                onClick={() => setCompletedOpen((v) => !v)}
                aria-expanded={completedOpen}
                aria-controls="completed-list"
                className="flex items-center gap-2 mb-3 cursor-pointer group focus-visible:outline-none"
              >
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-gray-400 group-hover:text-gray-500 transition-colors">
                  Completed
                </p>
                <span className="text-[9.5px] font-bold text-gray-400 bg-gray-100 rounded-full px-1.5 py-[2px]">
                  {verifiedSteps.length}
                </span>
                {completedOpen ? (
                  <ChevronUp className="w-3 h-3 text-gray-300 ml-0.5" aria-hidden="true" />
                ) : (
                  <ChevronDown className="w-3 h-3 text-gray-300 ml-0.5" aria-hidden="true" />
                )}
              </button>

              {completedOpen && (
                <div
                  id="completed-list"
                  className="bg-white rounded-xl border border-gray-100 shadow-sm px-4"
                >
                  {verifiedSteps.map((step, i) => (
                    <CompletedRow
                      key={step.id}
                      step={step}
                      isLast={i === verifiedSteps.length - 1}
                    />
                  ))}
                </div>
              )}
            </section>
          )}
        </div>

        {/* ── RIGHT: Sidebar ───────────────────────────────── */}
        <div className="flex flex-col gap-3">

          {/* Status card */}
          <div
            className="bg-white rounded-2xl p-5 shadow-sm"
            style={{ border: "1px solid #e5e7eb" }}
          >
            <p className="text-[9.5px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">
              Verification Status
            </p>
            <div className="flex items-center gap-4 mb-5">
              <ArcProgress value={verifiedCount} max={total} />
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <span
                    className="w-[6px] h-[6px] rounded-full shrink-0"
                    style={{ background: "#1B2B6B" }}
                    aria-hidden="true"
                  />
                  <span className="text-[11px] text-gray-500">
                    <span className="font-semibold text-gray-700">{verifiedCount}</span> verified
                  </span>
                </div>
                {processingCount > 0 && (
                  <div className="flex items-center gap-2">
                    <span
                      className="w-[6px] h-[6px] rounded-full shrink-0"
                      style={{ background: "#1B2B6B", opacity: 0.3 }}
                      aria-hidden="true"
                    />
                    <span className="text-[11px] text-gray-500">
                      <span className="font-semibold text-gray-700">{processingCount}</span> reviewing
                    </span>
                  </div>
                )}
                {requiredCount > 0 && (
                  <div className="flex items-center gap-2">
                    <span
                      className="w-[6px] h-[6px] rounded-full border shrink-0"
                      style={{ borderColor: "#d1d5db" }}
                      aria-hidden="true"
                    />
                    <span className="text-[11px] text-gray-500">
                      <span className="font-semibold" style={{ color: "#1B2B6B" }}>{requiredCount}</span> needed
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Next action nudge */}
            {nextRequired && (
              <div
                className="rounded-xl p-3.5"
                style={{ background: "#EEF0F8" }}
              >
                <p className="text-[9.5px] font-bold uppercase tracking-[0.16em] text-gray-400 mb-1.5">
                  Up next
                </p>
                <p className="text-[12px] font-semibold text-gray-800 leading-snug mb-2.5">
                  {nextRequired.title}
                </p>
                <button
                  onClick={() => handleAction(nextRequired.id)}
                  className="w-full flex items-center justify-center gap-1.5 rounded-lg py-2 text-[11.5px] font-bold text-white transition-all duration-200 hover:opacity-90 active:scale-[0.98] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2B6B]/30"
                  style={{ background: "#1B2B6B" }}
                  aria-label={`${nextRequired.actionLabel} for ${nextRequired.title}`}
                >
                  {nextRequired.actionLabel}
                  <ArrowRight className="w-3 h-3" aria-hidden="true" />
                </button>
              </div>
            )}

            {verifiedCount === total && (
              <div
                className="rounded-xl p-3.5 text-center"
                style={{ background: "#EEF0F8" }}
              >
                <Check className="w-5 h-5 mx-auto mb-1.5" style={{ color: "#1B2B6B" }} />
                <p className="text-[12px] font-bold text-gray-800">Fully verified</p>
                <p className="text-[11px] text-gray-500 mt-0.5">All steps complete.</p>
              </div>
            )}
          </div>

          {/* Perks */}
          <div
            className="bg-white rounded-2xl p-5 shadow-sm"
            style={{ border: "1px solid #e5e7eb" }}
          >
            <p className="text-[9.5px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-3.5">
              Benefits Unlocked
            </p>
            <ul className="flex flex-col gap-2.5" role="list">
              {PERKS.map((perk, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span
                    className="w-[5px] h-[5px] rounded-full shrink-0 mt-[5.5px]"
                    style={{ background: perk.unlocked ? "#1B2B6B" : "#e5e7eb" }}
                    aria-hidden="true"
                  />
                  <span
                    className={[
                      "text-[12px] leading-snug",
                      perk.unlocked ? "text-gray-700" : "text-gray-300",
                    ].join(" ")}
                  >
                    {perk.label}
                  </span>
                </li>
              ))}
            </ul>
            {requiredCount > 0 && (
              <p className="text-[10.5px] text-gray-400 mt-4 pt-3.5 leading-relaxed" style={{ borderTop: "1px solid #f3f4f6" }}>
                Complete{" "}
                <span className="font-semibold" style={{ color: "#1B2B6B" }}>
                  {requiredCount} more step{requiredCount !== 1 ? "s" : ""}
                </span>{" "}
                to unlock all benefits.
              </p>
            )}
          </div>

          <p className="text-[10.5px] text-gray-400 text-center leading-relaxed px-1">
            All data is encrypted and used only for identity verification.{" "}
            <button className="text-[#1B2B6B] hover:underline underline-offset-2 cursor-pointer transition-colors duration-150 focus-visible:outline-none">
              Privacy Policy
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
