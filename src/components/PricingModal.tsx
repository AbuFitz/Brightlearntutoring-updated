import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Check, X, ArrowRight } from "lucide-react";
import { useGetStarted, Package } from "@/contexts/GetStartedContext";
import { cn } from "@/lib/utils";

interface PricingModalProps {
  open: boolean;
  onClose: () => void;
}

const tiers: {
  name: Package;
  price: string;
  desc: string;
  badge?: string;
  features: string[];
  featured?: boolean;
}[] = [
  {
    name: "KS2",
    price: "40",
    desc: "Strong foundations and SATs confidence for primary students.",
    features: [
      "Group of 5 lesson (1 hour)",
      "4 sessions per month",
      "Custom learning plan",
      "Parent report",
      "End of term assessment",
    ],
  },
  {
    name: "KS3",
    price: "50",
    badge: "Most chosen",
    featured: true,
    desc: "Core topic mastery building a clear path towards GCSE.",
    features: [
      "Group of 5 lesson (1.5 hours)",
      "2 sessions per week",
      "Custom learning plan",
      "Parent report",
      "End of term assessment",
      "End of topic assessment",
    ],
  },
  {
    name: "GCSE",
    price: "60",
    desc: "Targeted revision and exam technique to boost grades.",
    features: [
      "Group of 5 lesson (1.5 hours)",
      "2 sessions per week",
      "Custom learning plan",
      "Parent report",
      "Past paper sessions",
      "Mock exam support",
    ],
  },
];

export const PricingModal = ({ open, onClose }: PricingModalProps) => {
  const { openModal } = useGetStarted();

  const handleGetStarted = (name: Package) => {
    onClose();
    setTimeout(() => openModal(name), 200);
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          aria-describedby="pricing-desc"
          className={cn(
            "fixed bottom-0 left-0 right-0 z-50 flex flex-col",
            "bg-background rounded-t-[2rem] shadow-elevated max-h-[92dvh]",
            "md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2",
            "md:rounded-3xl md:w-full md:max-w-[500px] md:max-h-[92dvh]",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "duration-200"
          )}
        >
          <DialogPrimitive.Title className="sr-only">Pricing plans</DialogPrimitive.Title>
          <span id="pricing-desc" className="sr-only">Monthly pricing for BrightLearn tutoring</span>

          {/* Drag handle — mobile only */}
          <div className="flex justify-center pt-3.5 md:hidden shrink-0">
            <div className="w-10 h-1 rounded-full bg-ink/10" />
          </div>

          {/* Header */}
          <div className="flex items-start justify-between gap-4 px-6 pt-5 pb-4 md:px-8 md:pt-7 shrink-0">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-soft mb-1.5">Pricing</p>
              <h2 className="text-[1.6rem] md:text-[1.75rem] font-semibold text-ink tracking-tight leading-tight">
                Honest pricing.{" "}
                <span className="font-display italic font-normal text-accent">Real value.</span>
              </h2>
              <p className="text-sm text-ink-soft mt-1.5 leading-relaxed">
                Flat monthly rate — no hidden fees, cancel any time.
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full border border-border-soft flex items-center justify-center text-ink-soft hover:text-ink hover:border-ink/30 transition-colors shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Tier cards */}
          <div className="flex-1 overflow-y-auto px-6 pb-6 md:px-8 md:pb-8 space-y-3">
            {tiers.map((t) => (
              <div
                key={t.name}
                className={cn(
                  "rounded-2xl border overflow-hidden",
                  t.featured ? "bg-ink border-ink" : "bg-background-soft border-border-soft"
                )}
              >
                <div className="px-5 pt-5 pb-4 flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={cn("font-bold text-sm tracking-wide", t.featured ? "text-white" : "text-ink")}>
                        {t.name}
                      </span>
                      {t.badge && (
                        <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-accent/20 text-accent">
                          {t.badge}
                        </span>
                      )}
                    </div>
                    <p className={cn("text-xs leading-relaxed", t.featured ? "text-white/60" : "text-ink-soft")}>
                      {t.desc}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="flex items-baseline gap-0.5 justify-end">
                      <span className={cn("text-sm", t.featured ? "text-white/60" : "text-ink-soft")}>£</span>
                      <span className={cn("text-[2.25rem] font-bold leading-none tracking-tight", t.featured ? "text-white" : "text-ink")}>
                        {t.price}
                      </span>
                    </div>
                    <span className={cn("text-[11px]", t.featured ? "text-white/40" : "text-ink-soft")}>/month</span>
                  </div>
                </div>
                <div className={cn("px-5 pb-5 pt-4 border-t", t.featured ? "border-white/10" : "border-border-soft")}>
                  <ul className="space-y-2 mb-5">
                    {t.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm">
                        <div className={cn("w-5 h-5 rounded-full flex items-center justify-center shrink-0", t.featured ? "bg-accent/25" : "bg-accent/10")}>
                          <Check className="w-2.5 h-2.5 text-accent" strokeWidth={3} />
                        </div>
                        <span className={t.featured ? "text-white/80" : "text-ink/85"}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={() => handleGetStarted(t.name)}
                    className={cn(
                      "w-full h-11 rounded-full text-sm font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98]",
                      t.featured
                        ? "bg-accent text-white hover:bg-accent/90"
                        : "bg-ink text-background hover:bg-ink-soft"
                    )}
                  >
                    Get started with {t.name}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            <p className="text-center text-xs text-ink-soft py-1">
              Cancel any time · No contracts · No card details required to enquire
            </p>
            <div className="md:hidden" style={{ height: "env(safe-area-inset-bottom, 0px)" }} />
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};
