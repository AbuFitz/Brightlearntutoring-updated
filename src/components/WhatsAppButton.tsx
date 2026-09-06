import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { CalendarCheck, MessageCircle, Tag } from "lucide-react";
import { cn } from "@/lib/utils";

const WHATSAPP_NUMBER = "447577702613"; // 07577 702613, UK
export const WHATSAPP_DISPLAY_NUMBER = "07577 702613";
const DEFAULT_MESSAGE = "Hi! I'd like to find out more about BrightLearn Tutoring.";

export const whatsappLink = (message: string = DEFAULT_MESSAGE) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884M20.463 3.488A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413" />
  </svg>
);

const QUICK_OPTIONS = [
  {
    icon: Tag,
    label: "Ask about pricing",
    message: "Hi! I'd like to ask about BrightLearn Tutoring's pricing.",
  },
  {
    icon: CalendarCheck,
    label: "Book a free session",
    message: "Hi! I'd like to book a free introductory session with BrightLearn Tutoring.",
  },
  {
    icon: MessageCircle,
    label: "General enquiry",
    message: "Hi! I have a question about BrightLearn Tutoring.",
  },
];

/**
 * Fixed z-40 (below CookieBanner's z-[59]/[60] and any Dialog's z-50 overlay)
 * so it sits under the cookie banner while unresolved and dims naturally
 * behind any open modal's backdrop, instead of floating awkwardly on top.
 * Hides once the page's <footer> scrolls into view so it never sits on top
 * of the footer's contact details.
 */
export const WhatsAppButton = () => {
  const location = useLocation();
  const [nearFooter, setNearFooter] = useState(false);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) {
      setNearFooter(false);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => setNearFooter(entry.isIntersecting), {
      rootMargin: "0px 0px -15% 0px",
    });
    observer.observe(footer);
    return () => observer.disconnect();
  }, [location.pathname]);

  return (
    <PopoverPrimitive.Root>
      <PopoverPrimitive.Trigger asChild>
        <button
          type="button"
          aria-label="Chat with BrightLearn Tutoring on WhatsApp"
          className={cn(
            "fixed z-40 bottom-4 right-4 sm:bottom-6 sm:right-6 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-elevated hover:scale-105 active:scale-95 transition-all duration-300",
            nearFooter ? "opacity-0 translate-y-3 pointer-events-none" : "opacity-100"
          )}
          style={{ marginBottom: "env(safe-area-inset-bottom, 0px)" }}
        >
          <WhatsAppIcon className="w-6 h-6 sm:w-7 sm:h-7" />
        </button>
      </PopoverPrimitive.Trigger>

      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          side="top"
          align="end"
          sideOffset={14}
          collisionPadding={16}
          className={cn(
            "z-40 w-[260px] rounded-2xl border border-border-soft bg-background shadow-elevated overflow-hidden",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            "motion-reduce:duration-0 duration-150"
          )}
        >
          <div className="px-4 py-3.5">
            <div className="font-semibold text-ink text-sm">Chat with BrightLearn Tutoring</div>
            <div className="text-xs text-ink-soft mt-0.5">Opens WhatsApp</div>
          </div>
          <div className="border-t border-border-soft">
            {QUICK_OPTIONS.map((opt, i) => (
              <a
                key={opt.label}
                href={whatsappLink(opt.message)}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "flex items-center gap-3 px-4 py-3 text-sm font-medium text-ink hover:bg-background-soft transition-colors",
                  i < QUICK_OPTIONS.length - 1 && "border-b border-border-soft"
                )}
              >
                <opt.icon className="w-4 h-4 text-ink-soft shrink-0" strokeWidth={2} />
                {opt.label}
              </a>
            ))}
          </div>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
};
