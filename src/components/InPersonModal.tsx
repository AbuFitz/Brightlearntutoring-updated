import * as DialogPrimitive from "@radix-ui/react-dialog";
import { MapPin, Mail, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface InPersonModalProps {
  open: boolean;
  onClose: () => void;
}

export const InPersonModal = ({ open, onClose }: InPersonModalProps) => {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 duration-200" />
        <DialogPrimitive.Content
          aria-describedby="in-person-desc"
          className={cn(
            "fixed bottom-0 left-0 right-0 z-50 flex flex-col",
            "bg-background rounded-t-[2rem] shadow-elevated",
            "md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2",
            "md:rounded-3xl md:w-full md:max-w-[420px]",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 duration-200"
          )}
        >
          <div className="flex justify-center pt-3.5 md:hidden shrink-0">
            <div className="w-10 h-1 rounded-full bg-ink/10" />
          </div>

          <div className="flex items-start justify-between gap-4 px-6 pt-5 pb-2 md:px-8 md:pt-7">
            <div className="w-11 h-11 rounded-full bg-accent-soft flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-accent" />
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full border border-border-soft flex items-center justify-center text-ink-soft hover:text-ink hover:border-ink/30 transition-colors shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="px-6 pb-6 md:px-8 md:pb-8">
            <div className="inline-flex items-center h-6 px-2.5 rounded-full bg-accent-soft text-[11px] font-semibold text-accent uppercase tracking-wide mb-3">
              Coming soon
            </div>
            <DialogPrimitive.Title className="text-xl font-semibold text-ink tracking-tight">
              In-person tutoring
            </DialogPrimitive.Title>
            <p id="in-person-desc" className="text-sm text-ink-soft mt-1.5 leading-relaxed">
              We're currently online-only — every session is delivered live over video, so there's nothing to
              commute to. We're planning to introduce in-person tutoring, based out of Enfield, in the future.
            </p>
            <p className="text-sm text-ink-soft mt-3 leading-relaxed">
              Want us to let you know as soon as it's available? Send us a message and we'll keep you posted.
            </p>

            <a
              href="mailto:info@brightlearntutoring.co.uk?subject=In-person%20tutoring%20interest"
              onClick={onClose}
              className="mt-5 flex items-center justify-center gap-2 h-12 rounded-full bg-ink text-background text-sm font-semibold hover:bg-ink-soft transition-all active:scale-[0.98]"
            >
              <Mail className="w-4 h-4" />
              Register your interest
            </a>
          </div>
          <div className="md:hidden" style={{ height: "env(safe-area-inset-bottom, 0px)" }} />
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};
