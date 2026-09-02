import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { useGetStarted } from "@/contexts/GetStartedContext";
import { pricingTiers, TierPricing, SessionType } from "@/data/pricing";
import { PricingModal } from "@/components/PricingModal";
import { cn } from "@/lib/utils";

/** Same stage → tint mapping used in Services.tsx, reused here for visual identity (not hierarchy). */
const STAGE_SURFACE: Record<string, string> = {
  KS2: "bg-surface-cream",
  KS3: "bg-surface-mint",
  GCSE: "bg-accent-soft",
};

/** Feature lines identical across all three stages for a given format — shown once, not repeated per card. */
const SHARED_FEATURES: Record<SessionType, string[]> = {
  group: ["Custom learning plan", "Parent report"],
  "1on1": ["Fully personalised plan", "Parent report"],
};

export const Pricing = () => {
  const ref = useReveal<HTMLDivElement>();
  const [sessionType, setSessionType] = useState<SessionType>("group");
  const [compareOpen, setCompareOpen] = useState(false);

  return (
    <section id="pricing" className="relative py-20 lg:py-28 bg-background-soft">
      <div className="container">
        <div ref={ref} className="reveal text-center max-w-2xl mx-auto mb-9">
          <span className="text-xs uppercase tracking-[0.18em] text-ink-soft font-semibold">Pricing</span>
          <h2 className="mt-3 text-4xl md:text-5xl text-ink font-semibold tracking-tight leading-[1.05]">
            Honest pricing. <span className="font-display italic font-normal text-accent">Real value.</span>
          </h2>
          <p className="text-ink-soft mt-5 text-lg leading-relaxed">
            No long-term contract — pay monthly, cancel any time.
          </p>
        </div>

        {/* Format toggle — controls all three cards below */}
        <div className="flex justify-center mb-9">
          <div
            role="tablist"
            aria-label="Tuition format"
            className="inline-grid grid-cols-2 gap-1.5 p-1.5 rounded-full bg-background border border-border-soft shadow-card"
          >
            {(["group", "1on1"] as SessionType[]).map((type) => (
              <button
                key={type}
                type="button"
                role="tab"
                aria-selected={sessionType === type}
                onClick={() => setSessionType(type)}
                className={cn(
                  "h-11 px-6 rounded-full text-sm font-semibold transition-all",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  sessionType === type ? "bg-ink text-background shadow-sm" : "text-ink-soft hover:text-ink"
                )}
              >
                {type === "group" ? "Small group" : "1-on-1"}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {pricingTiers.map((t, i) => (
            <PriceCard key={t.name} t={t} sessionType={sessionType} delay={i * 80} />
          ))}
        </div>

        {/* Shared inclusions + conditions — stated once, not repeated per card */}
        <div className="mt-10 max-w-2xl mx-auto text-center">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {SHARED_FEATURES[sessionType].map((f) => (
              <span key={f} className="inline-flex items-center gap-1.5 text-sm text-ink-soft">
                <Check className="w-3.5 h-3.5 text-accent shrink-0" strokeWidth={3} />
                {f}
              </span>
            ))}
          </div>
          <p className="text-sm text-ink-soft mt-4">
            KS2 lessons run weekly (4 a month); KS3 and GCSE run twice a week (8 a month). Small-group places
            are subject to suitable group availability.
          </p>
          <button
            type="button"
            onClick={() => setCompareOpen(true)}
            className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
          >
            Compare every option side by side
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <PricingModal open={compareOpen} onClose={() => setCompareOpen(false)} />
    </section>
  );
};

const PriceCard = ({
  t,
  sessionType,
  delay,
}: {
  t: TierPricing;
  sessionType: SessionType;
  delay: number;
}) => {
  const ref = useReveal<HTMLDivElement>();
  const { openModal } = useGetStarted();
  const plan = sessionType === "group" ? t.group : t.oneToOne;
  const price = sessionType === "group" ? t.group.price : t.oneToOne.monthlyPrice;
  const shared = SHARED_FEATURES[sessionType];
  const differentiator = plan.features.find((f) => !shared.includes(f) && !f.toLowerCase().includes("lesson"));
  const ctaLabel = sessionType === "group" ? "Register interest" : "Enquire about tuition";

  return (
    <div ref={ref} className="reveal h-full" style={{ transitionDelay: `${delay}ms` }}>
      <div className="relative h-full flex flex-col rounded-3xl p-7 bg-background border border-border-soft shadow-card hover:shadow-soft hover:-translate-y-1 transition-all duration-400">
        <div
          className={cn(
            "absolute top-0 left-7 right-7 h-1 rounded-b-full",
            STAGE_SURFACE[t.name] ?? "bg-accent-soft"
          )}
        />

        <div className="flex items-center justify-between gap-2">
          <div className="text-lg font-semibold text-ink tracking-tight">{t.name}</div>
          <span className="text-[11px] font-medium text-ink-soft bg-background-soft border border-border-soft rounded-full px-2.5 py-1 shrink-0">
            {t.ageTag}
          </span>
        </div>
        <p className="mt-2 text-sm text-ink-soft leading-relaxed min-h-[40px]">{t.desc}</p>

        <div className="mt-5 flex items-baseline gap-1">
          <span className="text-base text-ink-soft">£</span>
          <span className="text-5xl font-semibold tracking-tight text-ink">{price}</span>
          <span className="text-sm text-ink-soft">/month</span>
        </div>
        <div className="mt-2 inline-flex items-center self-start rounded-full bg-accent-soft px-2.5 py-1 text-xs font-semibold text-accent">
          {plan.sessionsPerMonth} lessons · {plan.sessionLength} each
        </div>

        {differentiator && (
          <div className="mt-4 flex items-center gap-2 text-sm text-ink/85">
            <div className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center shrink-0">
              <Check className="w-3 h-3 text-ink" strokeWidth={3} />
            </div>
            {differentiator}
          </div>
        )}

        <Button variant="default" size="lg" className="w-full mt-6" onClick={() => openModal(t.name, sessionType)}>
          {ctaLabel}
        </Button>
      </div>
    </div>
  );
};
