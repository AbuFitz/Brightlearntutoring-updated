import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ArrowUpRight, Copy, X } from "lucide-react";
import { useState } from "react";
import { WhatsAppIcon, WHATSAPP_DISPLAY_NUMBER, whatsappLink } from "@/components/WhatsAppButton";
import { cn } from "@/lib/utils";

interface WhatsAppModalProps {
  open: boolean;
  onClose: () => void;
}

export const WhatsAppModal = ({ open, onClose }: WhatsAppModalProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(WHATSAPP_DISPLAY_NUMBER).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 duration-200" />
        <DialogPrimitive.Content
          aria-describedby="whatsapp-desc"
          className={cn(
            "fixed bottom-0 left-0 right-0 z-50 flex flex-col",
            "bg-background rounded-t-[2rem] shadow-elevated",
            "md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2",
            "md:rounded-3xl md:w-full md:max-w-[400px]",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 duration-200"
          )}
        >
          <div className="flex justify-center pt-3.5 md:hidden shrink-0">
            <div className="w-10 h-1 rounded-full bg-ink/10" />
          </div>

          <div className="flex items-start justify-between gap-4 px-6 pt-5 pb-2 md:px-8 md:pt-7">
            <div className="w-11 h-11 rounded-full bg-[#25D366]/10 flex items-center justify-center shrink-0">
              <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full border border-border-soft flex items-center justify-center text-ink-soft hover:text-ink hover:border-ink/30 transition-colors shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="px-6 pb-6 md:px-8 md:pb-8">
            <DialogPrimitive.Title className="text-xl font-semibold text-ink tracking-tight">
              Chat with us on WhatsApp
            </DialogPrimitive.Title>
            <p id="whatsapp-desc" className="text-sm text-ink-soft mt-1.5 leading-relaxed">
              Message BrightLearn Tutoring directly — we usually reply within a few hours.
            </p>

            <div className="mt-5 flex items-center justify-between gap-3 rounded-2xl border border-border-soft bg-background-soft px-4 py-3">
              <span className="text-sm font-semibold text-ink tracking-wide">{WHATSAPP_DISPLAY_NUMBER}</span>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-soft hover:text-ink transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
                {copied ? "Copied" : "Copy"}
              </button>
            </div>

            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="mt-4 flex items-center justify-center gap-2 h-12 rounded-full bg-[#25D366] text-white text-sm font-semibold hover:bg-[#25D366]/90 transition-all active:scale-[0.98]"
            >
              Open WhatsApp
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
          <div className="md:hidden" style={{ height: "env(safe-area-inset-bottom, 0px)" }} />
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};
