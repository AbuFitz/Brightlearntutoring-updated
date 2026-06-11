import { useReveal } from "@/hooks/useReveal";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useGetStarted, Package } from "@/contexts/GetStartedContext";

const tiers: { name: Package; price: string; desc: string; features: string[]; featured: boolean }[] = [
  {
    name: "KS2 - Years 5 & 6",
    price: "40",
    desc: "Fun, structured maths support building strong foundations for SATs.",
    features: ["Weekly 1-to-1/Group lesson (1 hour)", "4 sessions per month", "Custom learning plan", "Parent report", "End of term assessment"],
    featured: false,
  },
  {
    name: "KS3 - Years 7 to 9",
    price: "50",
    desc: "Targeted support covering core topics, building towards GCSE.",
    features: ["Weekly 1-to-1 lesson/Group (1 hour)", "4 sessions per month", "Custom learning plan", "Parent report", "End of term assessment", "End of topic assessment"],
    featured: true,
  },
  {
    name: "GCSE - Years 10 & 11",
    price: "60",
    desc: "Personalised revision strategies designed to improve grades and confidence.",
    features: ["Weekly 1-to-1/Group lesson (1 hour)", "4 sessions per month", "Custom learning plan", "Parent report", "Past paper sessions", "Mock exam support"],
    featured: false,
  },
];

export const Pricing = () => {
  const ref = useReveal<HTMLDivElement>();
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
          {tiers.map((t, i) => (
            <PriceCard key={t.name} t={t} delay={i * 100} />
          ))}
        </div>

        <p className="text-center text-sm text-ink-soft mt-10">
          No card details required. No contracts. Cancel anytime.
        </p>
      </div>
    </section>
  );
};

const PriceCard = ({ t, delay }: { t: typeof tiers[number]; delay: number }) => {
  const ref = useReveal<HTMLDivElement>();
  const { openModal } = useGetStarted();
  return (
    <div ref={ref} className="reveal" style={{ transitionDelay: `${delay}ms` }}>
      <div
        className={`relative h-full rounded-3xl p-8 transition-all duration-400 hover:-translate-y-1 ${
          t.featured
            ? "bg-ink text-background shadow-elevated"
            : "bg-background border border-border-soft shadow-card hover:shadow-soft"
        }`}
      >
        {t.featured && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-accent text-accent-foreground text-[10px] font-bold tracking-widest uppercase">
            Most chosen
          </div>
        )}

        <div className={`text-sm font-semibold tracking-wide ${t.featured ? "text-background/70" : "text-ink-soft"}`}>{t.name}</div>
        <p className={`mt-2 text-sm min-h-[44px] ${t.featured ? "text-background/80" : "text-ink-soft"}`}>{t.desc}</p>

        <div className="mt-6 flex items-baseline gap-1">
          <span className={`text-base ${t.featured ? "text-background/70" : "text-ink-soft"}`}>£</span>
          <span className={`text-6xl font-semibold tracking-tight ${t.featured ? "text-background" : "text-ink"}`}>{t.price}</span>
          <span className={`text-sm ${t.featured ? "text-background/70" : "text-ink-soft"}`}>/ month</span>
        </div>

        <Button
          variant={t.featured ? "accent" : "default"}
          size="lg"
          className={`w-full mt-7 ${t.featured ? "" : ""}`}
          onClick={() => openModal(t.name)}
        >
          Get started
        </Button>

        <ul className="mt-7 space-y-3 border-t pt-6 border-border-soft" style={t.featured ? { borderColor: "hsl(0 0% 100% / 0.12)" } : undefined}>
          {t.features.map((f: string) => (
            <li key={f} className={`flex items-start gap-3 text-sm ${t.featured ? "text-background/90" : "text-ink/85"}`}>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${t.featured ? "bg-accent text-accent-foreground" : "bg-secondary text-ink"}`}>
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
