import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ArrowRight, X } from "lucide-react";
import { useGetStarted, Package } from "@/contexts/GetStartedContext";
import { pricingTiers, MAX_GROUP_SIZE, SessionType, sessionLabel, fmtPrice } from "@/data/pricing";
import { cn } from "@/lib/utils";

interface PricingModalProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Secondary "compare everything at once" surface. The homepage pricing
 * section (with its own group/1-on-1 toggle) is the complete, primary
 * pricing experience on every breakpoint — this modal's distinct job is
 * showing all three stages and both formats side by side simultaneously,
 * which a single on-page toggle can't do at once.
 */
export const PricingModal = ({ open, onClose }: PricingModalProps) => {
  const { openModal } = useGetStarted();

  const handleGetStarted = (name: Package, type: SessionType) => {
    onClose();
    setTimeout(() => openModal(name, type), 200);
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          aria-describedby="pricing-desc"
          className={cn(
            "fixed bottom-0 left-0 right-0 z-50 flex flex-col",
            "bg-background rounded-t-[2rem] shadow-elevated max-h-[85dvh]",
            "md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2",
            "md:rounded-3xl md:w-full md:max-w-[480px] md:max-h-[85dvh]",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "motion-reduce:duration-0",
            "duration-200"
          )}
        >
          {/* Drag handle — mobile only, visual sheet convention (matches every other modal on the site) */}
          <div className="flex justify-center pt-3.5 md:hidden shrink-0">
            <div className="w-10 h-1 rounded-full bg-ink/10" />
          </div>

          {/* Header */}
          <div className="flex items-start justify-between gap-4 px-6 pt-5 pb-4 md:px-8 md:pt-7 shrink-0">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-soft mb-1.5">Pricing</p>
              <DialogPrimitive.Title className="text-2xl md:text-[1.75rem] font-semibold text-ink tracking-tight leading-tight">
                Every option,{" "}
                <span className="font-display italic font-normal text-accent">side by side.</span>
              </DialogPrimitive.Title>
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              className="w-8 h-8 rounded-full border border-border-soft flex items-center justify-center text-ink-soft hover:text-ink hover:border-ink/30 transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div id="pricing-desc" className="flex-1 overflow-y-auto px-6 pb-6 md:px-8 md:pb-8 space-y-3">
            {pricingTiers.map((t) => (
              <div key={t.name} className="rounded-2xl border border-border-soft overflow-hidden">
                <div className="px-4 py-2.5 bg-background-soft border-b border-border-soft flex items-center justify-between">
                  <span className="text-sm font-semibold text-ink">{t.name}</span>
                  <span className="text-xs text-ink-soft">{t.ageTag}</span>
                </div>
                <div className="grid grid-cols-2 divide-x divide-border-soft">
                  {(["group", "1on1"] as SessionType[]).map((type) => {
                    const plan = type === "group" ? t.group : t.oneToOne;
                    const price = type === "group" ? t.group.price : t.oneToOne.monthlyPrice;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => handleGetStarted(t.name, type)}
                        className="p-4 text-left hover:bg-background-soft transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
                      >
                        <div className="text-[11px] font-semibold text-ink-soft uppercase tracking-wide">
                          {sessionLabel(type)}
                        </div>
                        <div className="mt-1.5 text-xl font-bold text-ink leading-none">
                          £{price}
                          <span className="text-xs font-normal text-ink-soft">/mo</span>
                        </div>
                        <div className="text-[11px] text-ink-soft mt-1.5">
                          {plan.sessionsPerMonth} lessons · {plan.sessionLength}
                        </div>
                        <div className="mt-2.5 inline-flex items-center gap-1 text-xs font-semibold text-accent">
                          Enquire
                          <ArrowRight className="w-3 h-3" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            <p className="text-xs text-ink-soft text-center pt-1">
              Small groups (maximum {MAX_GROUP_SIZE} students) are subject to suitable group availability.
              Prefer to pay as you go? Single lessons from {fmtPrice(pricingTiers[0].oneToOne.singleLessonPrice)}{" "}
              — no package needed.
            </p>
            <p className="text-center text-xs text-ink-soft pt-3 border-t border-border-soft">
              No long-term contract · Cancel any time
            </p>
            <div className="md:hidden" style={{ height: "env(safe-area-inset-bottom, 0px)" }} />
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};
