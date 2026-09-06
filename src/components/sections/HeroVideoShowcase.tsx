import { useCallback, useEffect, useRef, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetStarted } from "@/contexts/GetStartedContext";
import { heroVideos } from "@/data/heroVideos";
import { cn } from "@/lib/utils";

const ROTATION_MS = 4500;

const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
};

export const HeroVideoShowcase = () => {
  const { openModal } = useGetStarted();
  const count = heroVideos.length;
  const [centerIndex, setCenterIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [inView, setInView] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);

  const reducedMotion = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const rotationTimer = useRef<ReturnType<typeof setTimeout>>();

  const leftIndex = (centerIndex + count - 1) % count;
  const rightIndex = (centerIndex + 1) % count;
  const positions = { left: leftIndex, center: centerIndex, right: rightIndex };

  const autoRotate = lightboxIndex === null && inView && tabVisible && !reducedMotion;

  useEffect(() => {
    clearTimeout(rotationTimer.current);
    if (!autoRotate) return;
    rotationTimer.current = setTimeout(() => setCenterIndex((i) => (i + 1) % count), ROTATION_MS);
    return () => clearTimeout(rotationTimer.current);
  }, [centerIndex, autoRotate, count]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.25 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onVisibility = () => setTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const goTo = useCallback((index: number) => {
    clearTimeout(rotationTimer.current);
    setCenterIndex(index);
  }, []);

  const closeLightbox = () => setLightboxIndex(null);
  const showPrev = useCallback(() => setLightboxIndex((i) => (i === null ? null : (i - 1 + count) % count)), [count]);
  const showNext = useCallback(() => setLightboxIndex((i) => (i === null ? null : (i + 1) % count)), [count]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, showPrev, showNext]);

  const active = lightboxIndex !== null ? heroVideos[lightboxIndex] : null;

  return (
    <div ref={containerRef} className="relative">
      {/* Pale-blue ambient glow behind the stack */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 mx-auto h-[95%] w-[95%] rounded-full bg-surface-sky blur-3xl opacity-90" />
      </div>

      <div className="text-center lg:text-left mb-7">
        <span className="text-xs uppercase tracking-[0.18em] text-ink-soft font-semibold">Free maths topics</span>
        <h2 className="mt-2 text-2xl md:text-3xl text-ink font-semibold tracking-tight">
          Quick explainers, <span className="text-accent">one topic at a time.</span>
        </h2>
      </div>

      <div className="relative h-[400px] sm:h-[460px] md:h-[520px] flex items-center justify-center overflow-hidden px-2">
        {(["left", "right", "center"] as const).map((slot) => {
          const index = positions[slot];
          const video = heroVideos[index];
          const isCenter = slot === "center";
          const slotTransform =
            slot === "left"
              ? "-translate-x-[48%] sm:-translate-x-[58%] md:-translate-x-[64%] -rotate-6 scale-[0.82]"
              : slot === "right"
              ? "translate-x-[48%] sm:translate-x-[58%] md:translate-x-[64%] rotate-6 scale-[0.82]"
              : "translate-x-0 rotate-0 scale-100";

          return (
            <button
              key={video.id}
              type="button"
              onClick={() => (isCenter ? setLightboxIndex(index) : goTo(index))}
              aria-label={isCenter ? `Play: ${video.title}` : `Show and play: ${video.title}`}
              style={{ zIndex: isCenter ? 30 : 10 }}
              className={cn(
                "absolute w-[190px] sm:w-[220px] md:w-[250px] aspect-[9/16] rounded-[2rem] overflow-hidden",
                "border-[6px] border-background shadow-soft transition-all duration-500 ease-out",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
                slotTransform,
                isCenter ? "shadow-elevated hover:scale-[1.02]" : "opacity-90 hover:opacity-100"
              )}
            >
              <img
                src={video.poster}
                alt={video.title}
                loading="eager"
                className="absolute inset-0 w-full h-full object-cover bg-ink"
              />
              <div className="absolute inset-0 bg-ink/15" />

              {isCenter && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="w-14 h-14 rounded-full bg-background/90 flex items-center justify-center shadow-soft transition-transform group-hover:scale-110">
                    <Play className="w-5 h-5 text-ink fill-ink ml-0.5" />
                  </span>
                </span>
              )}

              <span
                className={cn(
                  "absolute left-3 right-3 bottom-3 rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-center truncate",
                  "bg-ink/60 text-white backdrop-blur-sm",
                  !isCenter && "opacity-90"
                )}
              >
                {video.topic}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex items-center justify-center lg:justify-start gap-1.5">
        {heroVideos.map((v, i) => (
          <button
            key={v.id}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Show video ${i + 1} of ${count}: ${v.title}`}
            aria-current={i === centerIndex}
            className={cn(
              "h-1.5 rounded-full transition-all",
              i === centerIndex ? "w-7 bg-accent" : "w-2 bg-border-soft"
            )}
          />
        ))}
      </div>

      {/* Video lightbox — same pattern as the /blog page */}
      <DialogPrimitive.Root open={active !== null} onOpenChange={(v) => !v && closeLightbox()}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-ink/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <DialogPrimitive.Content
            className={cn(
              "fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
              "w-[92vw] sm:w-auto max-w-[92vw] max-h-[90dvh] flex flex-col sm:flex-row",
              "bg-background rounded-3xl shadow-elevated overflow-hidden",
              "data-[state=open]:animate-in data-[state=closed]:animate-out",
              "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
              "motion-reduce:duration-0 duration-200"
            )}
          >
            {active && (
              <>
                <DialogPrimitive.Title className="sr-only">{active.title}</DialogPrimitive.Title>

                <div className="relative bg-ink aspect-[9/16] h-[42vh] sm:h-[min(80dvh,720px)] shrink-0 mx-auto sm:mx-0">
                  <iframe
                    key={active.id}
                    src={`https://www.youtube.com/embed/${active.id}?autoplay=1`}
                    title={active.title}
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  <button
                    type="button"
                    onClick={showPrev}
                    aria-label="Previous video"
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-ink/50 hover:bg-ink/70 backdrop-blur flex items-center justify-center text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={showNext}
                    aria-label="Next video"
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-ink/50 hover:bg-ink/70 backdrop-blur flex items-center justify-center text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-4 sm:p-5 sm:w-64 flex flex-col flex-1 min-h-0 overflow-y-auto sm:shrink-0 sm:overflow-visible">
                  <button
                    type="button"
                    onClick={closeLightbox}
                    aria-label="Close"
                    className="self-end -mt-1 -mr-1 w-8 h-8 rounded-full border border-border-soft flex items-center justify-center text-ink-soft hover:text-ink hover:border-ink/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="mt-1.5 sm:mt-2">
                    <div className="font-semibold text-ink text-base leading-snug">{active.title}</div>
                    <DialogPrimitive.Description asChild>
                      <p className="text-sm text-ink-soft mt-1.5 sm:mt-2 leading-relaxed">{active.description}</p>
                    </DialogPrimitive.Description>
                  </div>
                  <Button
                    variant="default"
                    size="sm"
                    className="mt-3 sm:mt-5 w-full sm:w-auto shrink-0"
                    onClick={() => {
                      closeLightbox();
                      openModal();
                    }}
                  >
                    Enquire about tuition
                  </Button>
                </div>
              </>
            )}
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </div>
  );
};
