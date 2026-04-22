"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  Home,
  Building2,
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  Upload,
  Info,
  ShieldCheck,
  Loader2,
} from "lucide-react";

type Role = "tenant" | "landlord" | null;
type Step = 1 | 2 | 3;

interface FormState {
  role: Role;
  fullName: string;
  email: string;
  phone: string;
  password: string;
  idFile: File | null;
  locations: string[];
}

const INITIAL: FormState = {
  role: null,
  fullName: "",
  email: "",
  phone: "",
  password: "",
  idFile: null,
  locations: [],
};

// ─────────────────────────────────────────────────────────────
// Password strength util
// ─────────────────────────────────────────────────────────────
function passwordStrength(pw: string) {
  if (!pw) return null;
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (score <= 1)
    return { label: "Weak", segments: 1, textCls: "text-red-500", barCls: "bg-red-400" };
  if (score === 2)
    return { label: "Fair", segments: 2, textCls: "text-amber-600", barCls: "bg-amber-400" };
  return { label: "Strong", segments: 3, textCls: "text-emerald-600", barCls: "bg-emerald-500" };
}

// ─────────────────────────────────────────────────────────────
// Step progress bars
// ─────────────────────────────────────────────────────────────
function StepBars({
  current,
  compact = false,
}: {
  current: Step;
  compact?: boolean;
}) {
  return (
    <div className={["flex gap-2", compact ? "max-w-[180px]" : ""].join(" ")}>
      {([1, 2, 3] as const).map((s) => (
        <div
          key={s}
          role="progressbar"
          aria-valuenow={s <= current ? 100 : 0}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Step ${s}`}
          className={[
            "h-1 flex-1 rounded-full transition-colors duration-500",
            s <= current ? "bg-navy" : "bg-gray-200",
          ].join(" ")}
        />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Shared field styles
// ─────────────────────────────────────────────────────────────
const INPUT_CLS =
  "w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-colors";

// ─────────────────────────────────────────────────────────────
// STEP 1 — Choose your path
// ─────────────────────────────────────────────────────────────
function StepChoosePath({
  role,
  onSelect,
  onNext,
}: {
  role: Role;
  onSelect: (r: "tenant" | "landlord") => void;
  onNext: () => void;
}) {
  const cards: Array<{
    value: "tenant" | "landlord";
    label: string;
    Icon: React.ElementType;
    desc: React.ReactNode;
    tags: string[];
  }> = [
    {
      value: "tenant",
      label: "I am a Tenant",
      Icon: Home,
      desc: (
        <>
          I want to discover vetted, high-quality listings and{" "}
          <span className="font-semibold text-gray-800">
            find my next home in Cebu.
          </span>
        </>
      ),
      tags: ["Search Properties", "Verified Listings", "Direct Messaging"],
    },
    {
      value: "landlord",
      label: "I am a Landlord",
      Icon: Building2,
      desc: (
        <>
          I want to list my property, reach professional tenants, and{" "}
          <span className="font-semibold text-gray-800">
            manage my portfolio.
          </span>
        </>
      ),
      tags: ["List Property", "Tenant Vetting", "Dashboard"],
    },
  ];

  return (
    <div className="w-full max-w-[640px] mx-auto flex flex-col items-center px-4">
      {/* Progress */}
      <div className="flex flex-col items-center gap-2.5 mb-8 w-full max-w-xs">
        <p className="text-sm text-gray-500">
          Step <span className="font-semibold text-gray-700">1</span> of 3
        </p>
        <StepBars current={1} />
      </div>

      {/* Heading */}
      <div className="text-center mb-8">
        <h1 className="text-xl font-semibold text-gray-900 tracking-tight">
          Choose your path
        </h1>
        <p className="text-sm text-gray-500 mt-2 leading-relaxed max-w-[360px] mx-auto">
          Welcome to the definitive authority on Cebuano living. To get
          started, please tell us how you&apos;ll be using PuyoTa.
        </p>
      </div>

      {/* Role cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-8">
        {cards.map(({ value, label, Icon, desc, tags }) => {
          const active = role === value;
          return (
            <button
              key={value}
              type="button"
              onClick={() => onSelect(value)}
              aria-pressed={active}
              className={[
                "flex flex-col items-center gap-4 p-7 rounded-2xl border-2 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/30",
                active
                  ? "border-navy bg-white shadow-lg"
                  : "border-gray-200 bg-white hover:border-navy/40 hover:shadow-md shadow-sm",
              ].join(" ")}
            >
              <div
                className={[
                  "w-[60px] h-[60px] rounded-2xl flex items-center justify-center transition-colors",
                  active ? "bg-navy/10" : "bg-gray-100",
                ].join(" ")}
              >
                <Icon
                  className={[
                    "w-6 h-6 transition-colors",
                    active ? "text-navy" : "text-gray-500",
                  ].join(" ")}
                  aria-hidden="true"
                />
              </div>
              <div className="text-center">
                <p className="font-semibold text-gray-900">{label}</p>
                <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">
                  {desc}
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-1.5">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </button>
          );
        })}
      </div>

      {/* CTA */}
      <button
        type="button"
        onClick={onNext}
        disabled={!role}
        className="w-full max-w-[300px] bg-navy text-white font-semibold rounded-xl py-3.5 text-sm hover:bg-navy-dark active:scale-[0.99] transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
      >
        Next Step
      </button>
      <p className="text-xs text-gray-400 mt-3 text-center">
        You can change this later in your profile settings.
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// STEP 2 — Personal information
// ─────────────────────────────────────────────────────────────
type Step2Field = "fullName" | "email" | "phone" | "password";

function StepPersonalInfo({
  data,
  onChange,
  onBack,
  onNext,
}: {
  data: Pick<FormState, Step2Field>;
  onChange: (field: Step2Field, value: string) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const strength = passwordStrength(data.password);

  async function handleNext() {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    onNext();
  }

  return (
    <div className="w-full max-w-[480px] mx-auto px-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Card header */}
        <div className="px-7 sm:px-9 pt-8 pb-5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
              Step 2 of 3
            </span>
            <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
              Personal Information
            </span>
          </div>
          <StepBars current={2} />
          <div className="mt-5">
            <h1 className="text-base font-semibold text-gray-900">
              Secure your account
            </h1>
            <p className="text-sm text-gray-500 mt-1 leading-relaxed">
              Tell us a bit about yourself to begin your professional rental
              journey in Cebu.
            </p>
          </div>
        </div>

        {/* Fields */}
        <div className="px-7 sm:px-9 pb-8 flex flex-col gap-4">
          {/* Full Name */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="su-name"
              className="text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <div className="relative">
              <User
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                aria-hidden="true"
              />
              <input
                id="su-name"
                type="text"
                autoComplete="name"
                placeholder="Juan dela Cruz"
                value={data.fullName}
                onChange={(e) => onChange("fullName", e.target.value)}
                className={INPUT_CLS}
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="su-email"
              className="text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                aria-hidden="true"
              />
              <input
                id="su-email"
                type="email"
                autoComplete="email"
                placeholder="juan.cruz@example.com"
                value={data.email}
                onChange={(e) => onChange("email", e.target.value)}
                className={INPUT_CLS}
              />
            </div>
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="su-phone"
              className="text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <div className="relative">
              <Phone
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                aria-hidden="true"
              />
              <span
                className="absolute left-9 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-medium pointer-events-none select-none"
                aria-hidden="true"
              >
                +63
              </span>
              <input
                id="su-phone"
                type="tel"
                autoComplete="tel"
                placeholder="917 123 4567"
                value={data.phone}
                onChange={(e) => onChange("phone", e.target.value)}
                className={[INPUT_CLS, "pl-[4.75rem]"].join(" ")}
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="su-password"
              className="text-sm font-medium text-gray-700"
            >
              Create Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                aria-hidden="true"
              />
              <input
                id="su-password"
                type={showPw ? "text" : "password"}
                autoComplete="new-password"
                placeholder="••••••••"
                value={data.password}
                onChange={(e) => onChange("password", e.target.value)}
                className={[INPUT_CLS, "pr-11"].join(" ")}
              />
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                aria-label={showPw ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/20 rounded"
              >
                {showPw ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Strength meter */}
            {strength && (
              <div className="flex flex-col gap-1">
                <div className="flex gap-1.5">
                  {[1, 2, 3].map((seg) => (
                    <div
                      key={seg}
                      className={[
                        "h-1 flex-1 rounded-full transition-colors duration-300",
                        seg <= strength.segments
                          ? strength.barCls
                          : "bg-gray-200",
                      ].join(" ")}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-500">
                  Strength:{" "}
                  <span
                    className={["font-semibold", strength.textCls].join(" ")}
                  >
                    {strength.label}
                  </span>
                </p>
              </div>
            )}
            <p className="text-xs text-gray-400">
              Use 8 or more characters with a mix of letters, numbers &amp;
              symbols.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-1">
            <button
              type="button"
              onClick={onBack}
              disabled={loading}
              className="flex-1 border border-gray-200 rounded-xl py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 active:scale-[0.99] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/20 disabled:opacity-60"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={loading}
              className="flex-[2] bg-navy text-white font-semibold rounded-xl py-3 text-sm hover:bg-navy-dark active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 disabled:opacity-70"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              Save and Continue
            </button>
          </div>

          <p className="text-center text-xs text-gray-400">
            Your data is protected by high-level encryption.{" "}
            <Link
              href="/privacy"
              className="text-navy font-semibold hover:underline focus-visible:outline-none focus-visible:underline"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// STEP 3 — Final verification
// ─────────────────────────────────────────────────────────────
const LOCATIONS = [
  "IT Park",
  "SM Seaside / SRP",
  "Cebu Business Park",
  "Mactan / Lapu-Lapu",
  "Banilad / AS Fortuna",
];

function StepVerification({
  idFile,
  locations,
  onFileChange,
  onToggleLocation,
  onComplete,
}: {
  idFile: File | null;
  locations: string[];
  onFileChange: (f: File | null) => void;
  onToggleLocation: (loc: string) => void;
  onBack: () => void;
  onComplete: () => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) onFileChange(file);
  }

  async function handleComplete() {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    onComplete();
  }

  return (
    <div className="w-full max-w-[900px] mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6 items-start">
        {/* Left sidebar */}
        <div className="flex flex-col gap-5">
          <div>
            <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-1">
              Step 3 of 3
            </p>
            <h1 className="text-lg font-semibold text-gray-900 leading-snug mt-1">
              Final Verification
            </h1>
            <p className="text-sm text-gray-500 mt-2 leading-relaxed">
              Complete your profile to unlock verified PuyoTa listings and
              sophisticated rental features.
            </p>
          </div>

          <StepBars current={3} compact />

          {/* Privacy note */}
          <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck
                className="w-4 h-4 text-navy shrink-0"
                aria-hidden="true"
              />
              <p className="text-sm font-semibold text-gray-900">
                Privacy First
              </p>
            </div>
            <p className="text-[12px] text-gray-500 leading-relaxed">
              Your documents are encrypted and only used for identity
              verification. We never share your ID with third parties without
              your explicit consent.
            </p>
          </div>
        </div>

        {/* Right card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-6 sm:p-8 flex flex-col gap-6">
            {/* Government ID */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-gray-900">
                  Government Identity
                </h2>
                {/* <span className="inline-flex items-center gap-1.5 bg-navy px-2.5 py-1 rounded-full">
                  <ShieldCheck
                    className="w-3 h-3 text-white"
                    aria-hidden="true"
                  />
                  <span className="text-[10px] font-bold text-white uppercase tracking-wide">
                    PuyoTa Verified
                  </span>
                </span> */}
              </div>

              {/* Upload zone */}
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                aria-label="Upload government ID"
                className={[
                  "w-full border-2 border-dashed rounded-xl py-10 flex flex-col items-center gap-3 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/30",
                  dragging
                    ? "border-navy bg-navy/5"
                    : idFile
                    ? "border-emerald-400 bg-emerald-50"
                    : "border-gray-200 bg-gray-50/40 hover:border-navy/40",
                ].join(" ")}
              >
                {idFile ? (
                  <>
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                      <ShieldCheck
                        className="w-5 h-5 text-emerald-600"
                        aria-hidden="true"
                      />
                    </div>
                    <p className="text-sm font-medium text-emerald-700 text-center px-4 break-all">
                      {idFile.name}
                    </p>
                    <p className="text-xs text-gray-400">Click to replace</p>
                  </>
                ) : (
                  <>
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <Upload
                        className="w-5 h-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-700">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        UMID, Driver&apos;s License, or Passport. (Max 5MB)
                      </p>
                    </div>
                  </>
                )}
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*,.pdf"
                className="sr-only"
                aria-label="Government ID file"
                onChange={(e) => onFileChange(e.target.files?.[0] ?? null)}
              />
            </div>

            {/* Listing note */}
            <div className="flex gap-3 bg-blue-50/70 border border-blue-100 rounded-xl p-4">
              <Info
                className="w-4 h-4 text-blue-400 shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  Listing a property?
                </p>
                <p className="text-[12px] text-gray-600 mt-0.5 leading-relaxed">
                  You&apos;ll also need to provide Proof of Ownership (Tax
                  Declaration or Title) to get the &quot;Verified
                  Landlord&quot; badge.
                </p>
              </div>
            </div>

            {/* Location preferences */}
            <div>
              <h2 className="text-sm font-semibold text-gray-900">
                Location Preferences
              </h2>
              <p className="text-[12px] text-gray-500 mt-0.5 mb-3 leading-relaxed">
                Select the areas in Cebu you&apos;re most interested in to
                personalize your dashboard.
              </p>
              <div
                className="flex flex-wrap gap-2"
                role="group"
                aria-label="Location preferences"
              >
                {LOCATIONS.map((loc) => {
                  const active = locations.includes(loc);
                  return (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => onToggleLocation(loc)}
                      aria-pressed={active}
                      className={[
                        "px-4 py-2 rounded-full text-sm font-medium border transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/30",
                        active
                          ? "bg-navy text-white border-navy"
                          : "bg-white text-gray-600 border-gray-200 hover:border-navy/40 hover:text-navy",
                      ].join(" ")}
                    >
                      {loc}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Complete */}
            <div className="flex flex-col gap-3 pt-1">
              <button
                type="button"
                onClick={handleComplete}
                disabled={loading}
                className="w-full bg-navy text-white font-semibold rounded-xl py-3.5 text-sm hover:bg-navy-dark active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 disabled:opacity-70"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                Create Account
              </button>
              <p className="text-center text-xs text-gray-400">
                By completing, you agree to PuyoTa&apos;s{" "}
                <Link
                  href="/terms"
                  className="text-navy font-semibold hover:underline focus-visible:outline-none focus-visible:underline"
                >
                  Terms of Service
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Main exported component
// ─────────────────────────────────────────────────────────────
export function SignUpFlow() {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormState>(INITIAL);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function toggleLocation(loc: string) {
    setForm((prev) => ({
      ...prev,
      locations: prev.locations.includes(loc)
        ? prev.locations.filter((l) => l !== loc)
        : [...prev.locations, loc],
    }));
  }

  return (
    <>
      {step === 1 && (
        <StepChoosePath
          role={form.role}
          onSelect={(r) => updateField("role", r)}
          onNext={() => setStep(2)}
        />
      )}

      {step === 2 && (
        <StepPersonalInfo
          data={form}
          onChange={(field, value) =>
            setForm((prev) => ({ ...prev, [field]: value }))
          }
          onBack={() => setStep(1)}
          onNext={() => setStep(3)}
        />
      )}

      {step === 3 && (
        <StepVerification
          idFile={form.idFile}
          locations={form.locations}
          onFileChange={(f) => updateField("idFile", f)}
          onToggleLocation={toggleLocation}
          onBack={() => setStep(2)}
          onComplete={() => {
            /* TODO: submit form data to backend */
          }}
        />
      )}
    </>
  );
}
