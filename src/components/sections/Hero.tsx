import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Users, Video } from "lucide-react";
import { useGetStarted } from "@/contexts/GetStartedContext";
import { HeroVideoShowcase } from "@/components/sections/HeroVideoShowcase";

const DYNAMIC_WORDS = ["clear.", "manageable.", "achievable.", "rewarding."];
const LONGEST_WORD = DYNAMIC_WORDS.reduce((a, b) => (b.length > a.length ? b : a), "");
const TYPE_MS = 65;
const DELETE_MS = 35;
const HOLD_MS = 1600;

const TRUST_ITEMS = [
  { icon: ShieldCheck, label: "DBS-checked tutors" },
  { icon: Users, label: "1 to 1 & small groups" },
  { icon: Video, label: "Live online lessons" },
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

export const Hero = () => {
  const { openModal } = useGetStarted();
  const { display, reducedMotion } = useTypewriter();

  const handleViewPricing = () => {
    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative pt-28 lg:pt-36 pb-16 lg:pb-24 overflow-hidden bg-background">
      <div className="container relative">
        <div className="grid lg:grid-cols-[48%_52%] gap-12 lg:gap-8 items-center">
          {/* LEFT — copy */}
          <div className="text-center lg:text-left animate-fade-up">
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.1em] sm:tracking-[0.18em] text-ink-soft font-semibold">
              Live online maths tutoring · KS2 to GCSE
            </span>

            <h1
              aria-label="Maths that finally feels clear."
              className="mt-4 text-[2.5rem] sm:text-5xl lg:text-[3.4rem] xl:text-[3.75rem] leading-[1.05] tracking-[-0.02em] text-ink font-semibold"
            >
              <span aria-hidden="true" className="block">Maths that</span>
              <span aria-hidden="true" className="block">finally feels</span>
              <span aria-hidden="true" className="relative inline-grid font-display italic font-normal text-accent">
                <span className="invisible col-start-1 row-start-1">{LONGEST_WORD}</span>
                <span className="col-start-1 row-start-1 whitespace-nowrap">
                  {display}
                  {!reducedMotion && (
                    <span className="inline-block w-[2px] ml-1 h-[0.75em] bg-accent animate-caret-blink" />
                  )}
                </span>
              </span>
            </h1>

            <p className="mt-6 text-lg text-ink-soft leading-relaxed max-w-xl mx-auto lg:mx-0">
              Calm, structured online maths tutoring that builds real confidence and progress.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Button variant="default" size="lg" className="group" onClick={() => openModal()}>
                Enquire about tuition
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
              <Button variant="outline" size="lg" onClick={handleViewPricing}>
                View prices
              </Button>
            </div>

            <div className="mt-9 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-3">
              {TRUST_ITEMS.map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-accent-soft flex items-center justify-center shrink-0">
                    <item.icon className="w-3.5 h-3.5 text-accent" strokeWidth={2.25} />
                  </span>
                  <span className="text-sm font-medium text-ink-soft">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — video showcase */}
          <div className="animate-fade-up" style={{ animationDelay: "0.15s" }}>
            <HeroVideoShowcase />
          </div>
        </div>
      </div>
    </section>
  );
};
