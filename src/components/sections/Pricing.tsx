import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { useGetStarted } from "@/contexts/GetStartedContext";
import { pricingTiers, TierPricing, SessionType, fmtPrice, perLessonPrice } from "@/data/pricing";
import { PricingModal } from "@/components/PricingModal";
import { cn } from "@/lib/utils";

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
            No long-term contract. Pay monthly, cancel any time.
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
                {type === "group" ? "Small group" : "1 to 1"}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-5 max-w-5xl mx-auto items-start">
          {pricingTiers.map((t, i) => (
            <PriceCard key={t.name} t={t} sessionType={sessionType} delay={i * 80} />
          ))}
        </div>

        <div className="mt-10 max-w-2xl mx-auto text-center">
          <p className="text-sm text-ink-soft">
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
  const ctaLabel = sessionType === "group" ? "Register interest" : "Enquire about tuition";
  const isStandout = t.name === "GCSE";

  return (
    <div ref={ref} className="reveal h-full relative" style={{ transitionDelay: `${delay}ms` }}>
      {isStandout && (
        <span className="absolute left-1/2 -translate-x-1/2 -top-3 z-10 inline-flex items-center rounded-full bg-accent px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wide text-accent-foreground shadow-md">
          Most included
        </span>
      )}
      <div
        className={cn(
          "relative h-full flex flex-col rounded-3xl p-7 pt-9 transition-all duration-400",
          isStandout
            ? "bg-ink border border-ink shadow-elevated"
            : "bg-background border border-border-soft shadow-card hover:shadow-soft hover:-translate-y-1"
        )}
      >
        <div className="flex items-center justify-between gap-2">
          <div className={cn("text-lg font-semibold tracking-tight", isStandout ? "text-background" : "text-ink")}>
            {t.name}
          </div>
          <span
            className={cn(
              "text-[11px] font-medium rounded-full px-2.5 py-1 shrink-0 border",
              isStandout
                ? "text-background/80 bg-background/10 border-background/10"
                : "text-ink-soft bg-background-soft border-border-soft"
            )}
          >
            {t.ageTag}
          </span>
        </div>
        <p className={cn("mt-2 text-sm leading-relaxed min-h-[40px]", isStandout ? "text-background/70" : "text-ink-soft")}>
          {t.desc}
        </p>

        <div className="mt-5 flex items-baseline gap-1">
          <span className={cn("text-base", isStandout ? "text-background/70" : "text-ink-soft")}>£</span>
          <span className={cn("text-5xl font-semibold tracking-tight", isStandout ? "text-background" : "text-ink")}>
            {price}
          </span>
          <span className={cn("text-sm", isStandout ? "text-background/60" : "text-ink-soft")}>/ month</span>
        </div>
        <div
          className={cn(
            "mt-2 inline-flex items-center self-start rounded-full px-2.5 py-1 text-xs font-semibold",
            isStandout ? "bg-background/10 text-background/90" : "bg-accent-soft text-accent"
          )}
        >
          {fmtPrice(perLessonPrice(t, sessionType))}/lesson · {plan.sessionsPerMonth} lessons
        </div>

        <Button
          variant={isStandout ? "accent" : "default"}
          size="lg"
          className="w-full mt-6"
          onClick={() => openModal(t.name, sessionType)}
        >
          {ctaLabel}
        </Button>

        <ul className={cn("mt-6 space-y-2.5 border-t pt-6", isStandout ? "border-background/10" : "border-border-soft")}>
          {plan.features.map((f) => (
            <li key={f} className={cn("flex items-center gap-2.5 text-sm", isStandout ? "text-background/90" : "text-ink/85")}>
              <span
                className={cn(
                  "w-5 h-5 rounded-full flex items-center justify-center shrink-0",
                  isStandout ? "bg-accent" : "bg-secondary"
                )}
              >
                <Check className={cn("w-3 h-3", isStandout ? "text-white" : "text-ink")} strokeWidth={3} />
              </span>
              {f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
