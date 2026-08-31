import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ArrowRight, X } from "lucide-react";
import { useState } from "react";
import { useGetStarted, Package } from "@/contexts/GetStartedContext";
import { pricingTiers, MAX_GROUP_SIZE, SessionType, fmtPrice } from "@/data/pricing";
import { cn } from "@/lib/utils";

interface PricingModalProps {
  open: boolean;
  onClose: () => void;
}

export const PricingModal = ({ open, onClose }: PricingModalProps) => {
  const { openModal } = useGetStarted();
  const [sessionType, setSessionType] = useState<SessionType>("group");

  const handleGetStarted = (name: Package) => {
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
            "md:rounded-3xl md:w-full md:max-w-[440px] md:h-auto md:max-h-[85dvh]",
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
                Simple,{" "}
                <span className="font-display italic font-normal text-accent">transparent pricing.</span>
              </DialogPrimitive.Title>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full border border-border-soft flex items-center justify-center text-ink-soft hover:text-ink hover:border-ink/30 transition-colors shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 pb-6 md:px-8 md:pb-8">
            {/* Toggle */}
            <div id="pricing-desc" className="grid grid-cols-2 gap-1.5 p-1.5 rounded-full bg-background-soft border border-border-soft">
              {(["group", "1on1"] as SessionType[]).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSessionType(type)}
                  className={cn(
                    "h-10 rounded-full text-sm font-semibold transition-all",
                    sessionType === type ? "bg-ink text-background shadow-sm" : "text-ink-soft hover:text-ink"
                  )}
                >
                  {type === "group" ? "Small group" : "1-on-1"}
                </button>
              ))}
            </div>

            {/* Pricing rows */}
            <div className="mt-5 rounded-2xl border border-border-soft bg-background-soft divide-y divide-border-soft overflow-hidden">
              {pricingTiers.map((t) => {
                const sessions = sessionType === "group" ? t.group.sessionsPerMonth : t.oneToOne.sessionsPerMonth;
                const price = sessionType === "group" ? t.group.price : t.oneToOne.monthlyPrice;
                const perLesson = fmtPrice(price / sessions);

                return (
                  <div key={t.name} className="flex items-center justify-between gap-3 px-4 py-3.5">
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-ink">{t.name}</div>
                      <div className="text-xs mt-0.5">
                        <span className="text-ink-soft">{sessions} lessons · </span>
                        <span className="font-semibold text-accent">
                          {sessionType === "1on1" ? "from " : ""}
                          {perLesson}/lesson
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right">
                        <div className="text-lg font-bold text-ink leading-none">£{price}</div>
                        <div className="text-[10px] text-ink-soft mt-0.5">4 lessons</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleGetStarted(t.name)}
                        aria-label={`Enquire about ${t.name} ${sessionType === "group" ? "group" : "1-on-1"} tuition`}
                        className="w-9 h-9 rounded-full bg-ink text-background flex items-center justify-center hover:bg-ink-soft transition-all active:scale-[0.96] shrink-0"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="text-xs text-ink-soft mt-3 text-center">
              {sessionType === "group"
                ? `Maximum ${MAX_GROUP_SIZE} students per group. Small-group places are subject to suitable group availability.`
                : `Prefer to pay as you go? Single lessons from £${pricingTiers[0].oneToOne.singleLessonPrice} — no package needed.`}
            </p>
            <p className="text-center text-xs text-ink-soft mt-4 pt-4 border-t border-border-soft">
              No long-term contract · 60 minutes per lesson
            </p>
            <div className="md:hidden" style={{ height: "env(safe-area-inset-bottom, 0px)" }} />
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};
