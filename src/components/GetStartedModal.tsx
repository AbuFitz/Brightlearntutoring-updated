import { useState, useEffect } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { useGetStarted, Package } from "@/contexts/GetStartedContext";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  CheckCircle2,
  ClipboardCheck,
  GraduationCap,
  Pencil,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ── Types ─────────────────────────────────────────────────────────────────

type UserType = "parent" | "student";
type StepId =
  | "userType"
  | "parentDetails"
  | "studentDetails"
  | "learning"
  | "timings"
  | "review";

const PARENT_FLOW: StepId[] = [
  "userType",
  "parentDetails",
  "studentDetails",
  "learning",
  "timings",
  "review",
];
const STUDENT_FLOW: StepId[] = [
  "userType",
  "studentDetails",
  "parentDetails",
  "learning",
  "timings",
  "review",
];

const CONTACT_METHODS = ["Email", "Phone call", "WhatsApp"];
const YEAR_GROUPS: Record<string, string[]> = {
  "": [],
  KS2: ["Year 5", "Year 6"],
  KS3: ["Year 7", "Year 8", "Year 9"],
  GCSE: ["Year 10", "Year 11"],
};

const TIMINGS_DATA = {
  KS2: [
    { day: "WED", time: "6pm - 7pm" },
  ],
  KS3: [
    { day: "MON", time: "7pm - 8:30pm" },
    { day: "THURS", time: "7pm - 8:30pm" },
  ],
  "GCSE-H": [
    { day: "WED", time: "7pm - 8:30pm" },
    { day: "FRI", time: "7:30pm - 9pm" },
  ],
  "GCSE-F": [
    { day: "TUESDAY", time: "7pm - 8:30pm" },
    { day: "FRI", time: "6pm - 7:30pm" },
  ],
};

interface FormData {
  userType: UserType | null;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  preferredContact: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  studentLevel: Package;
  yearGroup: string;
  helpNeeded: string;
  currentGrade: string;
  targetGrade: string;
  notes: string;
}

const blank = (): FormData => ({
  userType: null,
  parentName: "",
  parentEmail: "",
  parentPhone: "",
  preferredContact: "",
  studentName: "",
  studentEmail: "",
  studentPhone: "",
  studentLevel: "",
  yearGroup: "",
  helpNeeded: "",
  currentGrade: "",
  targetGrade: "",
  notes: "",
});

// ── Validation ─────────────────────────────────────────────────────────────

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateStep = (step: StepId, form: FormData): string[] => {
  const e: string[] = [];
  switch (step) {
    case "userType":
      if (!form.userType) e.push("userType");
      break;
    case "parentDetails":
      if (!form.parentName.trim()) e.push("parentName");
      if (!emailRe.test(form.parentEmail)) e.push("parentEmail");
      if (!form.parentPhone.trim()) e.push("parentPhone");
      if (!form.preferredContact) e.push("preferredContact");
      break;
    case "studentDetails":
      if (!form.studentName.trim()) e.push("studentName");
      if (form.userType === "student") {
        if (!emailRe.test(form.studentEmail)) e.push("studentEmail");
        if (!form.studentPhone.trim()) e.push("studentPhone");
      }
      if (!form.studentLevel) e.push("studentLevel");
      if (!form.yearGroup) e.push("yearGroup");
      break;
    case "learning":
      if (!form.helpNeeded.trim()) e.push("helpNeeded");
      break;
  }
  return e;
};

// ── Payload builder ────────────────────────────────────────────────────────

const buildPayload = (form: FormData) => ({
  "Enquiry type": form.userType === "parent" ? "Parent / Guardian" : "Student",
  "Parent name": form.parentName || "—",
  "Parent email": form.parentEmail || "—",
  "Parent phone": form.parentPhone || "—",
  "Preferred contact": form.preferredContact || "—",
  "Student name": form.studentName || "—",
  ...(form.userType === "student"
    ? { "Student email": form.studentEmail, "Student phone": form.studentPhone }
    : {}),
  Programme: form.studentLevel || "—",
  "Year group": form.yearGroup || "—",
  "Help needed": form.helpNeeded || "—",
  ...(form.currentGrade ? { "Current grade": form.currentGrade } : {}),
  ...(form.targetGrade ? { "Target grade": form.targetGrade } : {}),
  ...(form.notes ? { "Additional notes": form.notes } : {}),
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

// ── Main component ─────────────────────────────────────────────────────────

export const GetStartedModal = () => {
  const { open, preselectedPackage, closeModal } = useGetStarted();
  const [form, setForm] = useState<FormData>(blank());
  const [stepIndex, setStepIndex] = useState(0);
  const [errors, setErrors] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const flow = form.userType === "student" ? STUDENT_FLOW : PARENT_FLOW;
  const currentStep = flow[stepIndex];
  const totalSteps = flow.length;

  // Sync pre-selected package when modal opens
  useEffect(() => {
    if (open && preselectedPackage) {
      setForm((p) => ({ ...p, studentLevel: preselectedPackage }));
    }
  }, [open, preselectedPackage]);

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

  // ── Step titles ────────────────────────────────────────────────────────────
  const stepTitles: Record<StepId, string> = {
    userType: "Who is this enquiry for?",
    parentDetails:
      form.userType === "student"
        ? "Parent / guardian details"
        : "Your details",
    studentDetails:
      form.userType === "student" ? "Your details" : "Student details",
    learning: "Learning needs",
    timings: "Timings",
    review: "Review & submit",
  };

  const stepSubtitles: Record<StepId, string> = {
    userType: "This controls the entire form flow.",
    parentDetails:
      form.userType === "student"
        ? "Required — students cannot submit without a parent or guardian."
        : "We'll use these to get in touch with you.",
    studentDetails:
      form.userType === "student"
        ? "Tell us about yourself."
        : "Tell us about the student we'll be working with.",
    learning: "Help us understand what support is needed.",
    timings: "Here are our available session times.",
    review: "Check everything looks right before sending.",
  };

  const stepVisuals: Record<StepId, { icon: React.ComponentType<{ className?: string }>; chip: string }> = {
    userType: { icon: UserRound, chip: "Who's applying" },
    parentDetails: { icon: UserRound, chip: "Contact details" },
    studentDetails: { icon: GraduationCap, chip: "Student profile" },
    learning: { icon: Sparkles, chip: "Learning goals" },
    timings: { icon: Clock, chip: "Session timings" },
    review: { icon: ClipboardCheck, chip: "Final check" },
  };
  const StepIcon = stepVisuals[currentStep].icon;

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
                    value: "student",
                    label: "I'm a student",
                    sub: "Applying for yourself",
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

      // ─ Step: Parent details ────────────────────────────────────────────────
      case "parentDetails":
        return (
          <div className="space-y-5">
            {form.userType === "student" && (
              <div className="flex items-start gap-2.5 rounded-2xl bg-amber-50 border border-amber-200 px-4 py-3">
                <span className="text-base mt-0.5">⚠️</span>
                <p className="text-xs text-amber-800 leading-relaxed">
                  Students cannot submit an enquiry without a parent or
                  guardian's contact details. This is a safeguarding
                  requirement.
                </p>
              </div>
            )}
            <Field
              label="Full name"
              required
              error={hasErr("parentName")}
            >
              <input
                className={inp(hasErr("parentName"))}
                placeholder="e.g. Sarah Ahmed"
                value={form.parentName}
                onChange={(e) => set("parentName")(e.target.value)}
              />
            </Field>
            <Field
              label="Email address"
              required
              error={hasErr("parentEmail")}
              errorMsg="Please enter a valid email address"
            >
              <input
                type="email"
                className={inp(hasErr("parentEmail"))}
                placeholder="e.g. sarah@example.com"
                value={form.parentEmail}
                onChange={(e) => set("parentEmail")(e.target.value)}
              />
            </Field>
            <Field
              label="Phone number"
              required
              error={hasErr("parentPhone")}
            >
              <input
                type="tel"
                className={inp(hasErr("parentPhone"))}
                placeholder="e.g. 07700 900123"
                value={form.parentPhone}
                onChange={(e) => set("parentPhone")(e.target.value)}
              />
            </Field>
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

      // ─ Step: Student details ───────────────────────────────────────────────
      case "studentDetails": {
        const isStudent = form.userType === "student";
        const years = YEAR_GROUPS[form.studentLevel] ?? [];
        return (
          <div className="space-y-5">
            <Field
              label={isStudent ? "Your full name" : "Student's full name"}
              required
              error={hasErr("studentName")}
            >
              <input
                className={inp(hasErr("studentName"))}
                placeholder="e.g. Omar Khan"
                value={form.studentName}
                onChange={(e) => set("studentName")(e.target.value)}
              />
            </Field>
            {isStudent && (
              <>
                <Field
                  label="Your email address"
                  required
                  error={hasErr("studentEmail")}
                  errorMsg="Please enter a valid email address"
                >
                  <input
                    type="email"
                    className={inp(hasErr("studentEmail"))}
                    placeholder="e.g. omar@example.com"
                    value={form.studentEmail}
                    onChange={(e) => set("studentEmail")(e.target.value)}
                  />
                </Field>
                <Field
                  label="Your phone number"
                  required
                  error={hasErr("studentPhone")}
                >
                  <input
                    type="tel"
                    className={inp(hasErr("studentPhone"))}
                    placeholder="e.g. 07700 900456"
                    value={form.studentPhone}
                    onChange={(e) => set("studentPhone")(e.target.value)}
                  />
                </Field>
              </>
            )}
            <Field
              label="Programme level"
              required
              error={hasErr("studentLevel")}
              errorMsg="Please select a level"
            >
              <div className="flex flex-wrap gap-2 pt-0.5">
                {(["KS2", "KS3", "GCSE"] as Package[]).map((lvl) => (
                  <Pill
                    key={lvl}
                    active={form.studentLevel === lvl}
                    onClick={() => {
                      setForm((p) => ({
                        ...p,
                        studentLevel: lvl,
                        yearGroup: "",
                      }));
                      setErrors((e) =>
                        e.filter((x) => x !== "studentLevel")
                      );
                    }}
                  >
                    {lvl}
                    {lvl === "KS2" && " · Yrs 5–6"}
                    {lvl === "KS3" && " · Yrs 7–9"}
                    {lvl === "GCSE" && " · Yrs 10–11"}
                  </Pill>
                ))}
              </div>
            </Field>
            {form.studentLevel && (
              <Field
                label="Year group"
                required
                error={hasErr("yearGroup")}
                errorMsg="Please select a year group"
              >
                <select
                  className={inp(hasErr("yearGroup"))}
                  value={form.yearGroup}
                  onChange={(e) => set("yearGroup")(e.target.value)}
                >
                  <option value="">Select year group…</option>
                  {years.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </Field>
            )}
          </div>
        );
      }

      // ─ Step: Learning needs ────────────────────────────────────────────────
      case "learning":
        return (
          <div className="space-y-5">
            <Field
              label="What help is needed?"
              required
              error={hasErr("helpNeeded")}
            >
              <textarea
                rows={3}
                className={cn(
                  inp(hasErr("helpNeeded")),
                  "h-auto py-3 resize-none"
                )}
                placeholder="e.g. Struggling with algebra and needs to build confidence before GCSE exams…"
                value={form.helpNeeded}
                onChange={(e) => set("helpNeeded")(e.target.value)}
              />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Current grade / level">
                <input
                  className={inp()}
                  placeholder="e.g. Grade 4"
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
            <Field label="Any other notes">
              <textarea
                rows={2}
                className={cn(inp(), "h-auto py-3 resize-none")}
                placeholder="Anything else we should know…"
                value={form.notes}
                onChange={(e) => set("notes")(e.target.value)}
              />
            </Field>
          </div>
        );

      // ─ Step: Timings ──────────────────────────────────────────────────────
      case "timings": {
        const getTimingsForLevel = (level: string) => {
          if (level === "GCSE") {
            return {
              "GCSE - Higher": TIMINGS_DATA["GCSE-H"],
              "GCSE - Foundation": TIMINGS_DATA["GCSE-F"],
            };
          }
          return { [level]: TIMINGS_DATA[level as keyof typeof TIMINGS_DATA] || [] };
        };

        const timingsToShow = getTimingsForLevel(form.studentLevel);

        return (
          <div className="space-y-5">
            <div className="flex items-start gap-2.5 rounded-2xl bg-amber-50 border border-amber-200 px-4 py-3"> 
              <span className="text-base mt-0.5">⚠️</span>
              <p className="text-sm text-ink leading-relaxed">
                Please only continue if you can commit to the full weekly schedule shown below.
              </p>
            </div>
            {Object.entries(timingsToShow).map(([title, sessions]) => (
              <div key={title} className="space-y-3">
                <h3 className="text-[11px] font-black uppercase tracking-[0.14em] text-ink-soft">
                  {title}
                </h3>
                <div className="space-y-2">
                  {sessions && sessions.length > 0 ? (
                    sessions.map((session, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 p-3 rounded-xl border border-border-soft bg-background-soft"
                      >
                        <div className="w-2 h-2 rounded-full bg-accent" />
                        <span className="text-sm font-medium text-ink">
                          {session.day}: {session.time}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-ink-soft">No sessions available</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        );
      }

      // ─ Step: Review ────────────────────────────────────────────────────────
      case "review": {
        const pIdx = flow.indexOf("parentDetails");
        const sIdx = flow.indexOf("studentDetails");
        const lIdx = flow.indexOf("learning");

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
                form.userType === "parent"
                  ? "Parent / Guardian"
                  : "Student",
              ],
            ],
          },
          {
            title:
              form.userType === "student"
                ? "Parent / Guardian details"
                : "Your details",
            stepIdx: pIdx,
            rows: [
              ["Name", form.parentName],
              ["Email", form.parentEmail],
              ["Phone", form.parentPhone],
              ["Contact via", form.preferredContact],
            ],
          },
          {
            title:
              form.userType === "student"
                ? "Your details"
                : "Student details",
            stepIdx: sIdx,
            rows: [
              ["Name", form.studentName],
              ...(form.userType === "student"
                ? ([
                    ["Email", form.studentEmail],
                    ["Phone", form.studentPhone],
                  ] as [string, string][])
                : []),
              ["Level", form.studentLevel],
              ["Year group", form.yearGroup],
            ],
          },
          {
            title: "Learning needs",
            stepIdx: lIdx,
            rows: [
              ["Help needed", form.helpNeeded],
              ...(form.currentGrade
                ? (([["Current grade", form.currentGrade]] as [
                    string,
                    string,
                  ][]))
                : []),
              ...(form.targetGrade
                ? (([["Target grade", form.targetGrade]] as [
                    string,
                    string,
                  ][]))
                : []),
              ...(form.notes
                ? (([["Notes", form.notes]] as [string, string][]))
                : []),
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
    const firstName = (
      form.userType === "parent" ? form.parentName : form.studentName
    )
      .trim()
      .split(" ")[0];
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
                  Thanks{firstName ? `, ${firstName}` : ""}!
                </h2>
                <p className="text-ink-soft leading-relaxed max-w-sm text-sm mt-2">
                  Your enquiry has been received. We’ll review it and confirm your child’s placement within 24 hours.
                </p>
              </div>
              <div className="w-full rounded-2xl border border-border-soft bg-background-soft/70 px-5 py-4 text-left space-y-3">
                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-ink-soft">What happens next</p>
                {[
                  "You'll receive a confirmation email with your allocated session time and group details.",
                  "Your child can usually begin their first lesson the following week.",
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 text-[10px] font-bold text-accent">{i + 1}</span>
                    <p className="text-xs text-ink-soft leading-relaxed">{step}</p>
                  </div>
                ))}
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
            "bg-background rounded-t-[2rem] shadow-elevated max-h-[96dvh] overflow-hidden",
            "md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2",
            "md:rounded-3xl md:w-full md:max-w-[560px] md:max-h-[92dvh]",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 duration-200"
          )}
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/20 blur-3xl" />
            <div className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-surface-cream blur-3xl" />
          </div>
          {/* Drag handle — mobile only */}
          <div className="relative flex justify-center pt-3.5 md:hidden shrink-0">
            <div className="w-10 h-1 rounded-full bg-ink/10" />
          </div>

          {/* Header */}
          <div className="relative px-5 md:px-8 pt-4 md:pt-6 pb-4 md:pb-5 border-b border-border-soft shrink-0">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-border-soft bg-background px-3 py-1.5 shadow-sm">
                <StepIcon className="w-3.5 h-3.5 text-accent" />
                <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink-soft">
                  {stepVisuals[currentStep].chip}
                </span>
              </div>
              <button
                onClick={handleClose}
                className="w-7 h-7 rounded-full border border-border-soft flex items-center justify-center text-ink-soft hover:text-ink hover:border-ink/30 transition-colors shrink-0"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-ink-soft/80 mb-2">
              Step {stepIndex + 1} of {totalSteps}
            </div>
            <DialogPrimitive.Title className="text-xl md:text-2xl font-semibold text-ink leading-snug">
              {stepTitles[currentStep]}
            </DialogPrimitive.Title>
            <p className="text-sm text-ink-soft mt-1 leading-relaxed">
              {stepSubtitles[currentStep]}
            </p>
            {/* Smooth progress bar */}
            <div className="mt-4 h-1.5 rounded-full bg-border-soft overflow-hidden">
              <div
                className="h-full rounded-full bg-accent transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          {/* Body — scrollable */}
          <div className="relative flex-1 overflow-y-auto px-5 md:px-8 py-5 md:py-6">
            <div
              key={currentStep}
              className="rounded-3xl border border-border-soft bg-background/85 shadow-[0_22px_35px_-30px_hsl(var(--ink)/0.4)] p-4 md:p-5 animate-fade-up"
            >
              {renderStep()}
            </div>
          </div>

          {/* Footer */}
          {submitError && (
            <div className="px-5 md:px-8 pt-3 shrink-0">
              <div className="flex items-center gap-2.5 rounded-xl bg-red-50 border border-red-200 px-4 py-3">
                <span className="text-base shrink-0">⚠️</span>
                <p className="text-xs text-red-700 leading-relaxed">
                  Something went wrong sending your enquiry. Please try again, or email us directly at{" "}
                  <a href="mailto:info@brightlearntutoring.co.uk" className="font-medium underline">info@brightlearntutoring.co.uk</a>.
                </p>
              </div>
            </div>
          )}
          <div className="relative px-5 md:px-8 py-4 md:py-5 border-t border-border-soft shrink-0 flex items-center justify-between gap-3 bg-background/95 backdrop-blur">
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
