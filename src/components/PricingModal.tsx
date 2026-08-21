import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ArrowRight, X } from "lucide-react";
import { useGetStarted, Package } from "@/contexts/GetStartedContext";
import { pricingTiers, MAX_GROUP_SIZE, SessionType } from "@/data/pricing";
import { cn } from "@/lib/utils";

interface PricingModalProps {
  open: boolean;
  onClose: () => void;
}

export const PricingModal = ({ open, onClose }: PricingModalProps) => {
  const { openModal } = useGetStarted();

  const handleGetStarted = (name: Package, sessionType: SessionType) => {
    onClose();
    setTimeout(() => openModal(name, sessionType), 200);
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          aria-describedby="pricing-desc"
          className={cn(
            "fixed bottom-0 left-0 right-0 z-50 flex flex-col",
            "bg-background rounded-t-[2rem] shadow-elevated h-[85dvh]",
            "md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2",
            "md:rounded-3xl md:w-full md:max-w-[540px] md:h-[640px] md:max-h-[85dvh]",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "duration-200"
          )}
        >
          {/* Drag handle — mobile only */}
          <div className="flex justify-center pt-3.5 md:hidden shrink-0">
            <div className="w-10 h-1 rounded-full bg-ink/10" />
          </div>

          {/* Header */}
          <div className="flex items-start justify-between gap-4 px-6 pt-5 pb-4 md:px-8 md:pt-7 shrink-0">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-soft mb-1.5">Pricing</p>
              <DialogPrimitive.Title className="text-[1.6rem] md:text-[1.75rem] font-semibold text-ink tracking-tight leading-tight">
                All our pricing{" "}
                <span className="font-display italic font-normal text-accent">options.</span>
              </DialogPrimitive.Title>
              <p id="pricing-desc" className="text-sm text-ink-soft mt-1.5 leading-relaxed">
                Small group or 1-on-1 — flat rate, cancel any time.
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full border border-border-soft flex items-center justify-center text-ink-soft hover:text-ink hover:border-ink/30 transition-colors shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 pb-6 md:px-8 md:pb-8 space-y-8">
            {/* Small group tuition */}
            <div>
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-sm font-bold text-ink uppercase tracking-wide">Small Group Tuition</h3>
                <span className="text-[11px] text-ink-soft">Monthly only</span>
              </div>
              <div className="mt-3 rounded-2xl border border-border-soft bg-background-soft divide-y divide-border-soft overflow-hidden">
                {pricingTiers.map((t) => (
                  <div key={t.name} className="flex items-center justify-between gap-3 px-4 py-3.5">
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-ink">{t.name}</div>
                      <div className="text-xs text-ink-soft mt-0.5">
                        {t.group.sessionsPerMonth} × {t.group.sessionLength} lessons
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right">
                        <div className="text-lg font-bold text-ink leading-none">£{t.group.price}</div>
                        <div className="text-[10px] text-ink-soft mt-0.5">/month</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleGetStarted(t.name, "group")}
                        aria-label={`Get started with ${t.name} group tuition`}
                        className="w-9 h-9 rounded-full bg-ink text-background flex items-center justify-center hover:bg-ink-soft transition-all active:scale-[0.96] shrink-0"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-ink-soft mt-2">Maximum {MAX_GROUP_SIZE} students per group.</p>
            </div>

            {/* 1-to-1 tuition */}
            <div>
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-sm font-bold text-ink uppercase tracking-wide">1-to-1 Tuition</h3>
                <span className="text-[11px] text-ink-soft">Single lesson or monthly</span>
              </div>
              <div className="mt-3 rounded-2xl border border-accent/20 bg-accent-soft/40 divide-y divide-accent/15 overflow-hidden">
                {pricingTiers.map((t) => (
                  <div key={t.name} className="flex items-center justify-between gap-3 px-4 py-3.5">
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-ink">{t.name}</div>
                      <div className="text-xs text-ink-soft mt-0.5">
                        £{t.oneToOne.singleLessonPrice} / lesson · {t.oneToOne.sessionLength}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right">
                        <div className="text-lg font-bold text-ink leading-none">£{t.oneToOne.monthlyPrice}</div>
                        <div className="text-[10px] text-ink-soft mt-0.5">/month</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleGetStarted(t.name, "1on1")}
                        aria-label={`Get started with ${t.name} 1-on-1 tuition`}
                        className="w-9 h-9 rounded-full bg-accent text-white flex items-center justify-center hover:bg-accent/90 transition-all active:scale-[0.96] shrink-0"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-ink-soft mt-2">
                Monthly 1-to-1 = {pricingTiers[0].oneToOne.sessionsPerMonth} × {pricingTiers[0].oneToOne.sessionLength} lessons.
              </p>
            </div>

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
