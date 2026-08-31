import { useState, useEffect, useMemo } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { useGetStarted, Package } from "@/contexts/GetStartedContext";
import { SessionType, sessionLabel, getTier, fmtPrice } from "@/data/pricing";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  GraduationCap,
  Pencil,
  UserRound,
  Users,
  UserCheck,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ── Types ─────────────────────────────────────────────────────────────────

type UserType = "parent" | "self";
type StepId =
  | "userType"
  | "studentDetails"
  | "support"
  | "sessionType"
  | "level"
  | "notes"
  | "contact"
  | "review";

const BASE_FLOW: StepId[] = [
  "userType",
  "studentDetails",
  "support",
  "sessionType",
  "level",
  "notes",
  "contact",
  "review",
];

const CONTACT_METHODS = ["Email", "Phone call", "WhatsApp"];

const YEAR_GROUP_OPTIONS = [
  "Year 5",
  "Year 6",
  "Year 7",
  "Year 8",
  "Year 9",
  "Year 10",
  "Year 11",
  "Year 12 / Year 13",
  "College or Sixth Form",
  "Adult learner",
];

const SUPPORT_OPTIONS: { value: string; sub: string }[] = [
  { value: "KS2 Maths", sub: "Core primary maths, Years 5–6" },
  { value: "SATs Preparation", sub: "Focused prep for KS2 SATs" },
  { value: "KS3 Maths", sub: "Building foundations, Years 7–9" },
  { value: "GCSE Maths Foundation", sub: "Grades 1–5" },
  { value: "GCSE Maths Higher", sub: "Grades 4–9" },
  { value: "GCSE Maths Resit", sub: "Retaking the exam" },
  { value: "Not sure", sub: "We'll help you work it out" },
];

const EXAM_BOARD_OPTIONS = ["AQA", "Pearson Edexcel", "Not sure"];

const isGcseSupport = (s: string) => s.startsWith("GCSE");

const supportToLevel = (s: string): Package => {
  if (s === "KS2 Maths" || s === "SATs Preparation") return "KS2";
  if (s === "KS3 Maths") return "KS3";
  if (isGcseSupport(s)) return "GCSE";
  return "";
};

interface FormData {
  userType: UserType | null;
  studentName: string;
  yearGroup: string;
  supportType: string;
  sessionType: SessionType | "";
  currentGrade: string;
  targetGrade: string;
  examBoard: string;
  notes: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  preferredContact: string;
}

const blank = (): FormData => ({
  userType: null,
  studentName: "",
  yearGroup: "",
  supportType: "",
  sessionType: "",
  currentGrade: "",
  targetGrade: "",
  examBoard: "",
  notes: "",
  contactName: "",
  contactEmail: "",
  contactPhone: "",
  preferredContact: "",
});

// ── Validation ─────────────────────────────────────────────────────────────

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateStep = (step: StepId, form: FormData): string[] => {
  const e: string[] = [];
  switch (step) {
    case "userType":
      if (!form.userType) e.push("userType");
      break;
    case "studentDetails":
      if (!form.studentName.trim()) e.push("studentName");
      if (!form.yearGroup) e.push("yearGroup");
      break;
    case "support":
      if (!form.supportType) e.push("supportType");
      break;
    case "sessionType":
      if (!form.sessionType) e.push("sessionType");
      break;
    case "level":
      if (isGcseSupport(form.supportType) && !form.examBoard) e.push("examBoard");
      break;
    case "contact":
      if (!form.contactName.trim()) e.push("contactName");
      if (!emailRe.test(form.contactEmail)) e.push("contactEmail");
      if (!form.contactPhone.trim()) e.push("contactPhone");
      if (!form.preferredContact) e.push("preferredContact");
      break;
  }
  return e;
};

// ── Payload builder ────────────────────────────────────────────────────────

const buildPayload = (form: FormData) => ({
  "Enquiry type": form.userType === "parent" ? "Parent / Guardian" : "Enquiring for myself",
  "Student name": form.studentName || "—",
  "Year group": form.yearGroup || "—",
  "Support needed": form.supportType || "—",
  "Session type": form.sessionType ? sessionLabel(form.sessionType) : "—",
  ...(form.currentGrade ? { "Current grade": form.currentGrade } : {}),
  ...(form.targetGrade ? { "Target grade": form.targetGrade } : {}),
  ...(form.examBoard ? { "Exam board": form.examBoard } : {}),
  ...(form.notes ? { "Additional notes": form.notes } : {}),
  "Contact name": form.contactName || "—",
  "Contact email": form.contactEmail || "—",
  "Contact phone": form.contactPhone || "—",
  "Preferred contact": form.preferredContact || "—",
});

// ── Shared UI components ───────────────────────────────────────────────────

const Field = ({
  label,
  required,
  error,
  errorMsg,
  children,
}: {
  label: string;
  required?: boolean;
  error?: boolean;
  errorMsg?: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-1.5">
    <label className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-soft">
      {label}
      {required && <span className="text-accent ml-0.5">*</span>}
    </label>
    {children}
    {error && (
      <p className="mt-1 text-xs text-red-500">
        {errorMsg ?? "This field is required"}
      </p>
    )}
  </div>
);

const inp = (hasErr?: boolean) =>
  cn(
    "w-full h-12 px-4 rounded-2xl bg-background border border-border-soft text-sm text-ink placeholder:text-ink/35 shadow-[0_1px_0_hsl(var(--ink)/0.03)] focus:outline-none focus:ring-4 transition",
    hasErr
      ? "border-red-400 focus:ring-red-100"
      : "focus:ring-accent/15 focus:border-accent hover:border-ink/25"
  );

const Pill = ({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      "h-10 px-4 rounded-full border text-sm font-medium transition-all select-none active:scale-[0.97]",
      active
        ? "bg-ink text-background border-ink shadow-[0_8px_20px_-10px_hsl(var(--ink)/0.55)]"
        : "bg-background border-border-soft text-ink-soft hover:border-ink/30 hover:text-ink hover:bg-background-soft"
    )}
  >
    {children}
  </button>
);

/** Compact selectable card used for support-type and session-type choices — one clear decision per row. */
const ChoiceCard = ({
  active,
  onClick,
  label,
  sub,
}: {
  active: boolean;
  onClick: () => void;
  label: React.ReactNode;
  sub?: React.ReactNode;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      "group relative flex items-start justify-between gap-3 rounded-2xl border p-4 text-left transition-all",
      active
        ? "border-accent bg-accent/5 ring-2 ring-accent/20"
        : "border-border-soft bg-background-soft hover:border-ink/25"
    )}
  >
    <div className="min-w-0">
      <div className="text-sm font-semibold text-ink leading-snug">{label}</div>
      {sub && <div className="text-xs text-ink-soft mt-0.5 leading-snug">{sub}</div>}
    </div>
    {active && <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />}
  </button>
);

// ── Main component ─────────────────────────────────────────────────────────

export const GetStartedModal = () => {
  const { open, preselectedPackage, preselectedSessionType, preselectedSupportType, closeModal } = useGetStarted();
  const [form, setForm] = useState<FormData>(blank());
  const [stepIndex, setStepIndex] = useState(0);
  const [errors, setErrors] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  // "Current level" only applies to GCSE — skipped entirely for everyone else,
  // so the step count and numbering always reflect what a given user actually sees.
  const flow = useMemo(
    () => (isGcseSupport(form.supportType) ? BASE_FLOW : BASE_FLOW.filter((s) => s !== "level")),
    [form.supportType]
  );

  const currentStep = flow[stepIndex];
  const totalSteps = flow.length;

  // Sync pre-selected package when modal opens
  useEffect(() => {
    if (!open) return;
    setForm((p) => ({
      ...p,
      sessionType: preselectedSessionType || p.sessionType,
      supportType:
        preselectedSupportType ||
        (preselectedPackage === "KS2" ? "KS2 Maths" : preselectedPackage === "KS3" ? "KS3 Maths" : p.supportType),
    }));
  }, [open, preselectedPackage, preselectedSessionType, preselectedSupportType]);

  const handleClose = () => {
    closeModal();
    setTimeout(() => {
      setForm(blank());
      setStepIndex(0);
      setErrors([]);
      setSubmitted(false);
      setLoading(false);
      setSubmitError(false);
    }, 300);
  };

  const handleNext = () => {
    const errs = validateStep(currentStep, form);
    if (errs.length) {
      setErrors(errs);
      return;
    }
    setErrors([]);
    setStepIndex((i) => i + 1);
  };

  const handleBack = () => {
    setErrors([]);
    setStepIndex((i) => i - 1);
  };

  const goTo = (idx: number) => {
    setErrors([]);
    setStepIndex(idx);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setSubmitError(false);
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(buildPayload(form)),
      });
      if (!res.ok) {
        setSubmitError(true);
        setLoading(false);
        return;
      }
    } catch {
      setSubmitError(true);
      setLoading(false);
      return;
    }
    setLoading(false);
    setSubmitted(true);
  };

  // Helpers
  const set =
    (field: keyof FormData) =>
    (val: string) => {
      setForm((p) => ({ ...p, [field]: val }));
      setErrors((e) => e.filter((x) => x !== field));
    };

  const hasErr = (f: string) => errors.includes(f);
  const progressPct = ((stepIndex + 1) / totalSteps) * 100;
  const isLastStep = stepIndex === totalSteps - 1;
  const isSelf = form.userType === "self";

  // ── Step titles ────────────────────────────────────────────────────────────
  const stepTitles: Record<StepId, string> = {
    userType: "Who is this enquiry for?",
    studentDetails: isSelf ? "Your details" : "Student details",
    support: "What support are you looking for?",
    sessionType: "How would you like to learn?",
    level: "Current level",
    notes: "Anything else we should know?",
    contact: isSelf ? "Your contact details" : "Parent / guardian contact details",
    review: "Review & submit",
  };

  const stepSubtitles: Record<StepId, string> = {
    userType: "This helps us direct your enquiry to the right place.",
    studentDetails: isSelf ? "Tell us a little about yourself." : "Tell us about the student we'll be working with.",
    support: "Choose whichever matches best — you can always tell us more later.",
    sessionType: "Small-group places are subject to suitable group availability.",
    level: isGcseSupport(form.supportType)
      ? "Optional details that help us prepare — skip anything you're not sure of."
      : "",
    notes: "Optional — anything that helps us understand the situation.",
    contact: "We'll use these details to get in touch and discuss next steps.",
    review: "Check everything looks right before sending.",
  };

  // ── Step content ───────────────────────────────────────────────────────────
  const renderStep = () => {
    switch (currentStep) {
      // ─ Step 1: User type ──────────────────────────────────────────────────
      case "userType":
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(
                [
                  {
                    value: "parent",
                    label: "Parent / Guardian",
                    sub: "Enquiring on behalf of your child",
                    icon: UserRound,
                  },
                  {
                    value: "self",
                    label: "I'm enquiring for myself",
                    sub: "Arranging tuition for yourself",
                    icon: GraduationCap,
                  },
                ] as const
              ).map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    setForm((p) => ({ ...p, userType: opt.value }));
                    setErrors((e) => e.filter((x) => x !== "userType"));
                  }}
                  className={cn(
                    "group relative flex flex-col items-start gap-3 rounded-2xl border p-5 text-left transition-all",
                    form.userType === opt.value
                      ? "border-accent bg-accent/5 ring-2 ring-accent/20 shadow-[0_20px_40px_-30px_hsl(var(--accent)/0.65)]"
                      : "border-border bg-background-soft hover:border-ink/25"
                  )}
                >
                  {form.userType === opt.value && (
                    <CheckCircle2 className="absolute top-4 right-4 w-4 h-4 text-accent" />
                  )}
                  <div
                    className={cn(
                      "w-11 h-11 rounded-xl flex items-center justify-center transition-colors",
                      form.userType === opt.value
                        ? "bg-accent text-white"
                        : "bg-accent-soft text-accent"
                    )}
                  >
                    <opt.icon className="w-5 h-5" strokeWidth={2} />
                  </div>
                  <div>
                    <div className="font-semibold text-ink text-sm leading-snug">
                      {opt.label}
                    </div>
                    <div className="text-xs text-ink-soft mt-1 leading-snug">
                      {opt.sub}
                    </div>
                  </div>
                </button>
              ))}
            </div>
            {hasErr("userType") && (
              <p className="text-xs text-red-500">
                Please select who this enquiry is for.
              </p>
            )}
          </div>
        );

      // ─ Step: Student details ───────────────────────────────────────────────
      case "studentDetails":
        return (
          <div className="grid sm:grid-cols-2 gap-5">
            <Field
              label={isSelf ? "Your first name" : "Student's first name"}
              required
              error={hasErr("studentName")}
            >
              <input
                className={inp(hasErr("studentName"))}
                placeholder="e.g. Omar"
                value={form.studentName}
                onChange={(e) => set("studentName")(e.target.value)}
              />
            </Field>
            <Field
              label="School year / age range"
              required
              error={hasErr("yearGroup")}
              errorMsg="Please select a year group"
            >
              <select
                className={inp(hasErr("yearGroup"))}
                value={form.yearGroup}
                onChange={(e) => set("yearGroup")(e.target.value)}
              >
                <option value="">Select…</option>
                {YEAR_GROUP_OPTIONS.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </Field>
          </div>
        );

      // ─ Step: Support needed ────────────────────────────────────────────────
      case "support":
        return (
          <div className="space-y-2.5">
            <div className="grid sm:grid-cols-2 gap-2.5">
              {SUPPORT_OPTIONS.map((opt) => (
                <ChoiceCard
                  key={opt.value}
                  active={form.supportType === opt.value}
                  label={opt.value}
                  sub={opt.sub}
                  onClick={() => {
                    setForm((p) => ({ ...p, supportType: opt.value }));
                    setErrors((e) => e.filter((x) => x !== "supportType"));
                  }}
                />
              ))}
            </div>
            {hasErr("supportType") && (
              <p className="text-xs text-red-500">Please choose an option.</p>
            )}
          </div>
        );

      // ─ Step: Session type ──────────────────────────────────────────────────
      case "sessionType": {
        const level = supportToLevel(form.supportType);
        const tier = level ? getTier(level) : undefined;
        return (
          <div className="space-y-2.5">
            {(["group", "1on1"] as SessionType[]).map((type) => {
              const price = tier && (type === "group" ? tier.group.price : tier.oneToOne.monthlyPrice);
              const perLesson = tier
                ? fmtPrice((type === "group" ? tier.group.price : tier.oneToOne.monthlyPrice) / 4)
                : null;
              const Icon = type === "group" ? Users : UserCheck;
              const active = form.sessionType === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => {
                    setForm((p) => ({ ...p, sessionType: type }));
                    setErrors((e) => e.filter((x) => x !== "sessionType"));
                  }}
                  className={cn(
                    "w-full flex items-center gap-3.5 rounded-2xl border p-4 text-left transition-all",
                    active
                      ? "border-accent bg-accent/5 ring-2 ring-accent/20"
                      : "border-border-soft bg-background-soft hover:border-ink/25"
                  )}
                >
                  <div
                    className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors",
                      active ? "bg-accent text-white" : "bg-accent-soft text-accent"
                    )}
                  >
                    <Icon className="w-4 h-4" strokeWidth={2} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold text-ink">{sessionLabel(type)}</div>
                    <div className="text-xs text-ink-soft mt-0.5">
                      {type === "group" ? "Maximum 5 students, same weekly time" : "Scheduled around your availability"}
                    </div>
                  </div>
                  {tier && (
                    <div className="text-right shrink-0">
                      <div className="text-sm font-bold text-ink leading-none">£{price}</div>
                      <div className="text-[10px] text-ink-soft mt-1">{perLesson}/lesson · 4 lessons</div>
                    </div>
                  )}
                  {active && <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />}
                </button>
              );
            })}
            {hasErr("sessionType") && (
              <p className="text-xs text-red-500">Please choose group or 1-on-1.</p>
            )}
          </div>
        );
      }

      // ─ Step: Current level ─────────────────────────────────────────────────
      case "level":
        return (
          <div className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Current / estimated grade">
                <input
                  className={inp()}
                  placeholder="e.g. Grade 4 (if known)"
                  value={form.currentGrade}
                  onChange={(e) => set("currentGrade")(e.target.value)}
                />
              </Field>
              <Field label="Target grade">
                <input
                  className={inp()}
                  placeholder="e.g. Grade 7"
                  value={form.targetGrade}
                  onChange={(e) => set("targetGrade")(e.target.value)}
                />
              </Field>
            </div>
            <Field
              label="Exam board"
              required
              error={hasErr("examBoard")}
              errorMsg="Please select an exam board"
            >
              <div className="flex flex-wrap gap-2 pt-0.5">
                {EXAM_BOARD_OPTIONS.map((b) => (
                  <Pill
                    key={b}
                    active={form.examBoard === b}
                    onClick={() => set("examBoard")(b)}
                  >
                    {b}
                  </Pill>
                ))}
              </div>
            </Field>
          </div>
        );

      // ─ Step: Anything else ─────────────────────────────────────────────────
      case "notes":
        return (
          <div className="space-y-5">
            <Field label="Anything else we should know?">
              <textarea
                rows={5}
                className={cn(inp(), "h-auto py-3 resize-none")}
                placeholder="e.g. topics they struggle with, an upcoming exam, confidence issues, a resit situation, learning goals…"
                value={form.notes}
                onChange={(e) => set("notes")(e.target.value)}
              />
            </Field>
          </div>
        );

      // ─ Step: Contact details ───────────────────────────────────────────────
      case "contact":
        return (
          <div className="space-y-5">
            <Field
              label={isSelf ? "Your full name" : "Parent / guardian full name"}
              required
              error={hasErr("contactName")}
            >
              <input
                className={inp(hasErr("contactName"))}
                placeholder="e.g. Sarah Ahmed"
                value={form.contactName}
                onChange={(e) => set("contactName")(e.target.value)}
              />
            </Field>
            <div className="grid sm:grid-cols-2 gap-5">
              <Field
                label="Email address"
                required
                error={hasErr("contactEmail")}
                errorMsg="Please enter a valid email address"
              >
                <input
                  type="email"
                  className={inp(hasErr("contactEmail"))}
                  placeholder="e.g. sarah@example.com"
                  value={form.contactEmail}
                  onChange={(e) => set("contactEmail")(e.target.value)}
                />
              </Field>
              <Field
                label="Phone number"
                required
                error={hasErr("contactPhone")}
              >
                <input
                  type="tel"
                  className={inp(hasErr("contactPhone"))}
                  placeholder="e.g. 07700 900123"
                  value={form.contactPhone}
                  onChange={(e) => set("contactPhone")(e.target.value)}
                />
              </Field>
            </div>
            <Field
              label="Preferred contact method"
              required
              error={hasErr("preferredContact")}
              errorMsg="Please select a contact method"
            >
              <div className="flex flex-wrap gap-2 pt-0.5">
                {CONTACT_METHODS.map((m) => (
                  <Pill
                    key={m}
                    active={form.preferredContact === m}
                    onClick={() => {
                      set("preferredContact")(m);
                    }}
                  >
                    {m}
                  </Pill>
                ))}
              </div>
            </Field>
          </div>
        );

      // ─ Step: Review ────────────────────────────────────────────────────────
      case "review": {
        const studentIdx = flow.indexOf("studentDetails");
        const supportIdx = flow.indexOf("support");
        const sessionTypeIdx = flow.indexOf("sessionType");
        const levelIdx = flow.indexOf("level");
        const notesIdx = flow.indexOf("notes");
        const contactIdx = flow.indexOf("contact");

        type ReviewSection = {
          title: string;
          stepIdx: number;
          rows: [string, string][];
        };

        const sections: ReviewSection[] = [
          {
            title: "Enquiry type",
            stepIdx: 0,
            rows: [
              [
                "Enquiry from",
                form.userType === "parent" ? "Parent / Guardian" : "Enquiring for myself",
              ],
            ],
          },
          {
            title: isSelf ? "Your details" : "Student details",
            stepIdx: studentIdx,
            rows: [
              ["Name", form.studentName],
              ["Year group", form.yearGroup],
            ],
          },
          {
            title: "Support needed",
            stepIdx: supportIdx,
            rows: [["Support", form.supportType]],
          },
          {
            title: "How they'll learn",
            stepIdx: sessionTypeIdx,
            rows: [["Session type", form.sessionType ? sessionLabel(form.sessionType) : ""]],
          },
          ...(levelIdx !== -1
            ? [
                {
                  title: "Current level",
                  stepIdx: levelIdx,
                  rows: [
                    ...(form.currentGrade ? ([["Current grade", form.currentGrade]] as [string, string][]) : []),
                    ...(form.targetGrade ? ([["Target grade", form.targetGrade]] as [string, string][]) : []),
                    ...(form.examBoard ? ([["Exam board", form.examBoard]] as [string, string][]) : []),
                  ],
                },
              ]
            : []),
          {
            title: "Anything else",
            stepIdx: notesIdx,
            rows: [["Notes", form.notes]],
          },
          {
            title: isSelf ? "Contact details" : "Parent / guardian contact",
            stepIdx: contactIdx,
            rows: [
              ["Name", form.contactName],
              ["Email", form.contactEmail],
              ["Phone", form.contactPhone],
              ["Contact via", form.preferredContact],
            ],
          },
        ];

        return (
          <div className="space-y-3">
            {sections.map((s) => (
              <div
                key={s.title}
                className="rounded-2xl border border-border-soft overflow-hidden bg-background"
              >
                <div className="flex items-center justify-between px-4 py-2.5 bg-background-soft/70 border-b border-border-soft">
                  <span className="text-[10px] font-black uppercase tracking-[0.14em] text-ink-soft">
                    {s.title}
                  </span>
                  <button
                    type="button"
                    onClick={() => goTo(s.stepIdx)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border-soft bg-background px-2.5 py-1 text-[10px] font-semibold text-ink-soft hover:border-accent hover:text-accent transition-colors"
                  >
                    <Pencil className="w-3 h-3" />
                    Edit
                  </button>
                </div>
                <div className="divide-y divide-border-soft">
                  {s.rows.map(([label, val]) => (
                    <div key={label} className="grid grid-cols-[7rem_1fr] px-4 py-2.5 gap-3">
                      <span className="text-[11px] text-ink-soft leading-relaxed pt-px">
                        {label}
                      </span>
                      <span className="text-[11px] text-ink font-semibold leading-relaxed break-words min-w-0">
                        {val || <span className="text-ink-soft/50 font-normal">—</span>}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      }

      default:
        return null;
    }
  };

  // ── Success screen ─────────────────────────────────────────────────────────
  if (submitted) {
    const firstName = form.contactName.trim().split(" ")[0] || form.studentName.trim().split(" ")[0];
    return (
      <DialogPrimitive.Root open={open} onOpenChange={(v) => !v && handleClose()}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 duration-200" />
          <DialogPrimitive.Content
            className={cn(
              "fixed bottom-0 left-0 right-0 z-50",
              "bg-background rounded-t-[2rem] shadow-elevated overflow-hidden",
              "md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2",
              "md:rounded-3xl md:w-full md:max-w-[460px]",
              "data-[state=open]:animate-in data-[state=closed]:animate-out",
              "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 duration-200"
            )}
          >
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -top-20 -left-10 h-44 w-44 rounded-full bg-accent/10 blur-3xl" />
              <div className="absolute bottom-0 right-0 h-52 w-52 rounded-full bg-surface-cream/70 blur-3xl" />
            </div>
            <DialogPrimitive.Title className="sr-only">Enquiry submitted</DialogPrimitive.Title>
            <div className="relative flex flex-col items-center text-center px-8 py-10 md:px-10 md:py-12 gap-5">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-accent/20 scale-[1.6] blur-lg" />
                <div className="relative w-16 h-16 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-accent" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-ink">
                  Thank you{firstName ? `, ${firstName}` : ""} — we've received your enquiry.
                </h2>
                <p className="text-ink-soft leading-relaxed max-w-sm text-sm mt-2">
                  A member of BrightLearn Tutoring will review the details and contact you to discuss
                  tuition, current availability and the next steps.
                </p>
              </div>
              <button
                onClick={handleClose}
                className="h-11 px-8 rounded-full bg-ink text-background text-sm font-semibold hover:bg-ink-soft transition-all active:scale-[0.98] shadow-[0_18px_30px_-22px_hsl(var(--ink)/0.95)]"
              >
                Close
              </button>
            </div>
            <div className="md:hidden" style={{ height: "env(safe-area-inset-bottom, 0px)" }} />
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    );
  }

  // ── Main form ──────────────────────────────────────────────────────────────
  return (
    <DialogPrimitive.Root open={open} onOpenChange={(v) => !v && handleClose()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 duration-200" />
        <DialogPrimitive.Content
          className={cn(
            "fixed bottom-0 left-0 right-0 z-50 flex flex-col",
            "bg-background rounded-t-[2rem] shadow-elevated h-[85dvh] overflow-hidden",
            "md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2",
            "md:rounded-3xl md:w-full md:max-w-[560px] md:h-[640px] md:max-h-[85dvh]",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 duration-200"
          )}
        >
          {/* Drag handle — mobile only */}
          <div className="flex justify-center pt-3.5 md:hidden shrink-0">
            <div className="w-10 h-1 rounded-full bg-ink/10" />
          </div>

          {/* Header */}
          <div className="flex items-start justify-between gap-4 px-6 pt-5 pb-4 md:px-8 md:pt-7 shrink-0">
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-soft mb-1.5">
                Step {stepIndex + 1} of {totalSteps}
              </p>
              <DialogPrimitive.Title className="text-[1.6rem] md:text-[1.75rem] font-semibold text-ink tracking-tight leading-tight">
                {stepTitles[currentStep]}
              </DialogPrimitive.Title>
              {stepSubtitles[currentStep] && (
                <p className="text-sm text-ink-soft mt-1.5 leading-relaxed">
                  {stepSubtitles[currentStep]}
                </p>
              )}
            </div>
            <button
              onClick={handleClose}
              className="w-8 h-8 rounded-full border border-border-soft flex items-center justify-center text-ink-soft hover:text-ink hover:border-ink/30 transition-colors shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Progress bar */}
          <div className="px-6 md:px-8 pb-4 shrink-0">
            <div className="h-1.5 rounded-full bg-border-soft overflow-hidden">
              <div
                className="h-full rounded-full bg-accent transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          {/* Body — scrollable */}
          <div className="flex-1 overflow-y-auto px-6 md:px-8 pb-6 md:pb-8">
            <div key={currentStep} className="animate-fade-up">
              {renderStep()}
            </div>
          </div>

          {/* Footer */}
          {submitError && (
            <div className="px-6 md:px-8 pt-3 shrink-0">
              <div className="flex items-center gap-2.5 rounded-xl bg-red-50 border border-red-200 px-4 py-3">
                <span className="text-base shrink-0">⚠️</span>
                <p className="text-xs text-red-700 leading-relaxed">
                  Something went wrong sending your enquiry. Please try again, or email us directly at{" "}
                  <a href="mailto:info@brightlearntutoring.co.uk" className="font-medium underline">info@brightlearntutoring.co.uk</a>.
                </p>
              </div>
            </div>
          )}
          <div className="relative px-6 md:px-8 py-4 md:py-5 border-t border-border-soft shrink-0 flex items-center justify-between gap-3 bg-background/95 backdrop-blur">
            {stepIndex > 0 ? (
              <button
                type="button"
                onClick={handleBack}
                className="flex items-center gap-1.5 h-11 px-5 rounded-full border border-border-soft text-sm font-medium text-ink-soft hover:text-ink hover:border-ink/30 hover:bg-background-soft transition-all active:scale-[0.98]"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
            ) : (
              <div />
            )}

            {isLastStep ? (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="flex items-center gap-2 h-11 px-7 rounded-full bg-ink text-background text-sm font-semibold hover:bg-ink-soft disabled:opacity-60 disabled:cursor-not-allowed transition-all active:scale-[0.98] shadow-[0_18px_30px_-22px_hsl(var(--ink)/0.95)]"
              >
                {loading ? "Sending…" : "Submit enquiry"}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                disabled={currentStep === "userType" && !form.userType}
                className="flex items-center gap-2 h-11 px-7 rounded-full bg-ink text-background text-sm font-semibold hover:bg-ink-soft disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98] shadow-[0_18px_30px_-22px_hsl(var(--ink)/0.95)]"
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="md:hidden shrink-0" style={{ height: "env(safe-area-inset-bottom, 0px)" }} />
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};
