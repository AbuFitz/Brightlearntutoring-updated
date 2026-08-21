import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { useGetStarted } from "@/contexts/GetStartedContext";
import { pricingTiers, TierPricing } from "@/data/pricing";
import { PricingModal } from "@/components/PricingModal";

export const Pricing = () => {
  const ref = useReveal<HTMLDivElement>();
  const [exploreOpen, setExploreOpen] = useState(false);

  return (
    <section id="pricing" className="relative py-24 lg:py-32 bg-background-soft">
      <div className="container">
        <div ref={ref} className="reveal text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.18em] text-ink-soft font-semibold">Pricing</span>
          <h2 className="mt-3 text-4xl md:text-5xl text-ink font-semibold tracking-tight leading-[1.05]">
            Honest pricing. <span className="font-display italic font-normal text-accent">Real value.</span>
          </h2>
          <p className="text-ink-soft mt-5 text-lg leading-relaxed">
            No subscriptions, no contracts - just expert UK tutoring at a fair, transparent price.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {pricingTiers.map((t, i) => (
            <PriceCard key={t.name} t={t} delay={i * 100} featured={t.name === "GCSE"} />
          ))}
        </div>

        <div className="text-center mt-10 space-y-4">
          <p className="text-sm text-ink-soft">
            No card details required. No contracts. Cancel anytime.
          </p>
          <button
            type="button"
            onClick={() => setExploreOpen(true)}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
          >
            Also offering 1-on-1 tuition — explore all pricing options
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <PricingModal open={exploreOpen} onClose={() => setExploreOpen(false)} />
    </section>
  );
};

const PriceCard = ({ t, delay, featured }: { t: TierPricing; delay: number; featured: boolean }) => {
  const ref = useReveal<HTMLDivElement>();
  const { openModal } = useGetStarted();
  return (
    <div ref={ref} className="reveal" style={{ transitionDelay: `${delay}ms` }}>
      <div
        className={`relative h-full rounded-3xl p-8 transition-all duration-400 hover:-translate-y-1 ${
          featured
            ? "bg-ink text-background shadow-elevated"
            : "bg-background border border-border-soft shadow-card hover:shadow-soft"
        }`}
      >
        {featured && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-accent text-accent-foreground text-[10px] font-bold tracking-widest uppercase">
            Most chosen
          </div>
        )}

        <div className={`text-sm font-semibold tracking-wide ${featured ? "text-background/70" : "text-ink-soft"}`}>{t.name}</div>
        <p className={`mt-2 text-sm min-h-[44px] ${featured ? "text-background/80" : "text-ink-soft"}`}>{t.desc}</p>

        <div className="mt-6 flex items-baseline gap-1">
          <span className={`text-base ${featured ? "text-background/70" : "text-ink-soft"}`}>£</span>
          <span className={`text-6xl font-semibold tracking-tight ${featured ? "text-background" : "text-ink"}`}>{t.group.price}</span>
          <span className={`text-sm ${featured ? "text-background/70" : "text-ink-soft"}`}>/ month</span>
        </div>

        <Button
          variant={featured ? "accent" : "default"}
          size="lg"
          className="w-full mt-7"
          onClick={() => openModal(t.name, "group")}
        >
          Get started
        </Button>

        <ul className="mt-7 space-y-3 border-t pt-6 border-border-soft" style={featured ? { borderColor: "hsl(0 0% 100% / 0.12)" } : undefined}>
          {t.group.features.map((f: string) => (
            <li key={f} className={`flex items-start gap-3 text-sm ${featured ? "text-background/90" : "text-ink/85"}`}>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${featured ? "bg-accent text-accent-foreground" : "bg-secondary text-ink"}`}>
                <Check className="w-3 h-3" strokeWidth={3} />
              </div>
              {f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
