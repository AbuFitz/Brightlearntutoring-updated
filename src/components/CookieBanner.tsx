import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { X, ChevronDown } from "lucide-react";

const CONSENT_KEY = "bl_cookie_consent";
const CONSENT_VERSION = "1";

type ConsentValue = "all" | "essential" | null;

const getStoredConsent = (): ConsentValue => {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { version: string; value: ConsentValue };
    if (parsed.version !== CONSENT_VERSION) return null;
    return parsed.value;
  } catch {
    return null;
  }
};

const storeConsent = (value: "all" | "essential") => {
  localStorage.setItem(CONSENT_KEY, JSON.stringify({ version: CONSENT_VERSION, value }));
};



export const CookieBanner = () => {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const consent = getStoredConsent();
    if (!consent) {
      const t = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = (type: "all" | "essential") => {
    storeConsent(type);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <>
      {/* Mobile backdrop */}
      <div className="fixed inset-0 bg-ink/30 backdrop-blur-sm z-[59] md:hidden" onClick={() => accept("essential")} />

      <div
        role="dialog"
        aria-label="Cookie consent"
        className={[
          /* mobile: full-width bottom sheet */
          "fixed bottom-0 left-0 right-0 z-[60]",
          "rounded-t-[2rem]",
          /* desktop: floating card */
          "md:bottom-6 md:right-6 md:left-auto md:max-w-[400px]",
          "md:rounded-3xl",
          "animate-fade-up",
          "bg-background border border-border-soft shadow-elevated",
        ].join(" ")}
      >
        {/* Mobile drag handle */}
        <div className="flex justify-center pt-3 pb-1 md:hidden">
          <div className="w-10 h-1 rounded-full bg-ink/10" />
        </div>

        <div className="p-6 pt-4 md:p-6">
          {/* Header row */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 shrink-0 flex items-center justify-center text-[2rem] leading-none select-none">
                🍪
              </div>
              <div>
                <h3 className="font-semibold text-ink text-base leading-tight">We use cookies</h3>
                <p className="text-xs text-ink-soft mt-0.5">Your choices, your control.</p>
              </div>
            </div>
            <button
              onClick={() => accept("essential")}
              aria-label="Dismiss and accept essential cookies only"
              className="w-7 h-7 rounded-full bg-background-soft border border-border-soft flex items-center justify-center text-ink-soft hover:text-ink hover:border-ink/30 transition-colors shrink-0 mt-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-sm text-ink-soft leading-relaxed">
            We use essential cookies to keep this site running, and optional analytics to help us improve.{" "}
            <Link to="/cookies" className="text-accent font-medium hover:underline">
              Cookie policy
            </Link>
            .
          </p>

          {/* Expandable details */}
          {expanded && (
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-background-soft border border-border-soft">
                <div>
                  <div className="font-medium text-ink text-sm">Essential cookies</div>
                  <div className="text-xs text-ink-soft mt-0.5">Required for the site to function</div>
                </div>
                <span className="text-[10px] font-bold text-accent uppercase tracking-wide bg-accent/10 rounded-full px-2 py-0.5">Always on</span>
              </div>
              <div className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-background-soft border border-border-soft">
                <div>
                  <div className="font-medium text-ink text-sm">Analytics cookies</div>
                  <div className="text-xs text-ink-soft mt-0.5">Help us understand how visitors use the site</div>
                </div>
                <span className="text-[10px] font-bold text-ink-soft uppercase tracking-wide bg-background rounded-full border border-border-soft px-2 py-0.5">Optional</span>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="mt-4 flex gap-2.5">
            <button
              onClick={() => accept("all")}
              className="flex-1 h-11 rounded-full bg-ink text-background text-sm font-semibold hover:bg-ink-soft transition-colors"
            >
              Accept all
            </button>
            <button
              onClick={() => accept("essential")}
              className="flex-1 h-11 rounded-full border border-border-soft text-ink text-sm font-medium hover:border-ink/30 hover:bg-background-soft transition-colors"
            >
              Essential only
            </button>
          </div>

          <button
            onClick={() => setExpanded((v) => !v)}
            className="w-full mt-3 flex items-center justify-center gap-1 text-xs text-ink-soft hover:text-ink transition-colors"
          >
            {expanded ? "Hide details" : "Manage preferences"}
            <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} />
          </button>

          {/* iOS safe area nudge */}
          <div className="h-safe-area-inset-bottom md:hidden" style={{ height: "env(safe-area-inset-bottom, 0px)" }} />
        </div>
      </div>
    </>
  );
};
