import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Users, Video } from "lucide-react";
import { useGetStarted } from "@/contexts/GetStartedContext";
import { HeroVideoShowcase } from "@/components/sections/HeroVideoShowcase";

const DYNAMIC_WORDS = ["clear.", "simple.", "logical.", "possible."];
const LONGEST_WORD = DYNAMIC_WORDS.reduce((a, b) => (b.length > a.length ? b : a), "");
const TYPE_MS = 65;
const DELETE_MS = 35;
const HOLD_MS = 1600;

const TRUST_ITEMS = [
  { icon: ShieldCheck, label: "DBS-checked" },
  { icon: Users, label: "1 to 1 & small groups" },
  { icon: Video, label: "Live online" },
];

/** Typing/holding/deleting cycle through DYNAMIC_WORDS, pausing on reduced-motion or a hidden tab. */
const useTypewriter = () => {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [display, setDisplay] = useState("");
  const [phase, setPhase] = useState<"typing" | "holding" | "deleting">("typing");
  const [tabVisible, setTabVisible] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const onVisibility = () => setTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setDisplay(DYNAMIC_WORDS[0]);
      return;
    }
    if (!tabVisible) return;

    const word = DYNAMIC_WORDS[wordIndex];
    let delay = TYPE_MS;

    if (phase === "typing") {
      if (display.length < word.length) {
        delay = TYPE_MS;
      } else {
        setPhase("holding");
        return;
      }
    } else if (phase === "holding") {
      delay = HOLD_MS;
    } else {
      delay = DELETE_MS;
    }

    const timer = setTimeout(() => {
      if (phase === "typing") {
        setDisplay(word.slice(0, display.length + 1));
      } else if (phase === "holding") {
        setPhase("deleting");
      } else if (phase === "deleting") {
        if (display.length > 0) {
          setDisplay(word.slice(0, display.length - 1));
        } else {
          setWordIndex((i) => (i + 1) % DYNAMIC_WORDS.length);
          setPhase("typing");
        }
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [display, phase, wordIndex, reducedMotion, tabVisible]);

  return { display: reducedMotion ? DYNAMIC_WORDS[0] : display, reducedMotion };
};

/** Flat icon + text trust row — no heavy icon badges, matches the site's plain contact-strip style. */
const TrustStrip = () => (
  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-1 gap-y-2 text-[13px] sm:text-sm font-medium text-ink-soft">
    {TRUST_ITEMS.map((item, i) => (
      <span key={item.label} className="flex items-center gap-1.5 px-2">
        {i > 0 && <span className="text-border-soft mr-2.5 -ml-1" aria-hidden="true">·</span>}
        <item.icon className="w-4 h-4 text-accent shrink-0" strokeWidth={2.25} />
        {item.label}
      </span>
    ))}
  </div>
);

export const Hero = () => {
  const { openModal } = useGetStarted();
  const { display, reducedMotion } = useTypewriter();

  const handleViewPricing = () => {
    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative pt-20 pb-12 lg:pt-40 lg:pb-28 overflow-hidden bg-background">
      <div className="container relative">
        <div className="grid lg:grid-cols-[48%_52%] gap-6 lg:gap-10 items-center">
          {/* LEFT — copy */}
          <div className="text-center lg:text-left animate-fade-up">
            <div className="inline-flex items-center bg-background-soft border border-border-soft rounded-full px-4 py-1.5 shadow-soft">
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.1em] sm:tracking-[0.16em] text-ink-soft font-semibold">
                Live online maths · KS2 to GCSE
              </span>
            </div>

            <h1
              aria-label="Maths that finally feels clear."
              className="mt-3 lg:mt-5 text-4xl sm:text-6xl lg:text-[3.85rem] xl:text-[4.25rem] leading-[1.08] lg:leading-[1.04] tracking-[-0.02em] text-ink font-semibold"
            >
              <span aria-hidden="true" className="block">Maths that</span>
              <span aria-hidden="true" className="block">finally feels</span>
              <span aria-hidden="true" className="relative inline-grid font-display italic font-normal text-accent">
                <span className="invisible col-start-1 row-start-1">{LONGEST_WORD}</span>
                <span className="col-start-1 row-start-1 whitespace-nowrap">
                  {display}
                  {!reducedMotion && (
                    <span className="inline-block w-[3px] ml-1 h-[0.75em] bg-accent animate-caret-blink" />
                  )}
                </span>
              </span>
            </h1>

            <p className="mt-4 lg:mt-7 text-base lg:text-xl text-ink-soft leading-relaxed max-w-xl mx-auto lg:mx-0">
              Calm, structured online maths tutoring that builds real confidence and progress.
            </p>

            <div className="mt-5 lg:mt-9 flex flex-row gap-2.5 lg:gap-3.5 justify-center lg:justify-start">
              <Button
                variant="default"
                size="default"
                className="flex-1 lg:flex-initial min-w-0 lg:h-14 lg:px-8 lg:text-base group"
                onClick={() => openModal()}
              >
                <span className="lg:hidden">Enquire now</span>
                <span className="hidden lg:inline">Enquire about tuition</span>
                <ArrowRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
              </Button>
              <Button
                variant="outline"
                size="default"
                className="flex-1 lg:flex-initial min-w-0 lg:h-14 lg:px-8 lg:text-base"
                onClick={handleViewPricing}
              >
                View prices
              </Button>
            </div>

            {/* Trust strip — desktop position, right under the CTAs */}
            <div className="hidden lg:flex mt-10">
              <TrustStrip />
            </div>
          </div>

          {/* RIGHT — video showcase */}
          <div className="animate-fade-up" style={{ animationDelay: "0.15s" }}>
            <HeroVideoShowcase />
          </div>

          {/* Trust strip — mobile position, after the video showcase */}
          <div className="lg:hidden mt-1">
            <TrustStrip />
          </div>
        </div>
      </div>
    </section>
  );
};
