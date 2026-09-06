import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { heroVideos } from "@/data/heroVideos";
import { cn } from "@/lib/utils";

const ROTATION_MS = 9000;

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
  const count = heroVideos.length;
  const [centerIndex, setCenterIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [inView, setInView] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);

  const reducedMotion = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const rotationTimer = useRef<ReturnType<typeof setTimeout>>();

  const leftIndex = (centerIndex + count - 1) % count;
  const rightIndex = (centerIndex + 1) % count;

  const shouldAutoplay = autoRotate && inView && tabVisible && !reducedMotion;

  // Attempt to play the centre video whenever it should be playing; fall back
  // to the poster (manual play control) if autoplay is blocked or the source
  // hasn't been supplied yet.
  useEffect(() => {
    const activeVideo = videoRefs.current[heroVideos[centerIndex].id];
    if (!activeVideo) return;

    if (shouldAutoplay) {
      const playPromise = activeVideo.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    } else if (reducedMotion) {
      activeVideo.pause();
      setIsPlaying(false);
    }
  }, [centerIndex, shouldAutoplay, reducedMotion]);

  // Auto-rotation timer — advances to the next clip after ROTATION_MS, or
  // sooner if the clip ends first (handled by onEnded below).
  useEffect(() => {
    clearTimeout(rotationTimer.current);
    if (!shouldAutoplay) return;
    rotationTimer.current = setTimeout(() => {
      setCenterIndex((i) => (i + 1) % count);
    }, ROTATION_MS);
    return () => clearTimeout(rotationTimer.current);
  }, [centerIndex, shouldAutoplay, count]);

  // Pause rotation and playback when the hero scrolls out of view.
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Pause when the browser tab itself is hidden.
  useEffect(() => {
    const onVisibility = () => setTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  // Keep non-active videos paused and reset to their poster frame.
  useEffect(() => {
    heroVideos.forEach((v, i) => {
      if (i === centerIndex) return;
      const el = videoRefs.current[v.id];
      if (el && !el.paused) el.pause();
    });
  }, [centerIndex]);

  const goTo = useCallback(
    (index: number) => {
      clearTimeout(rotationTimer.current);
      setCenterIndex(index);
    },
    []
  );

  const toggleMute = () => {
    setIsMuted((m) => !m);
    setAutoRotate(false);
  };

  const toggleActivePlayback = () => {
    const activeVideo = videoRefs.current[heroVideos[centerIndex].id];
    setAutoRotate(false);
    if (!activeVideo) {
      setIsPlaying((p) => !p);
      return;
    }
    if (activeVideo.paused) {
      activeVideo.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      activeVideo.pause();
      setIsPlaying(false);
    }
  };

  const positions = useMemo(
    () => ({ left: leftIndex, center: centerIndex, right: rightIndex }),
    [leftIndex, centerIndex, rightIndex]
  );

  return (
    <div ref={containerRef} className="relative">
      {/* Pale-blue ambient glow behind the stack */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 mx-auto h-[90%] w-[90%] rounded-full bg-surface-sky blur-3xl opacity-90" />
      </div>

      <div className="text-center lg:text-left mb-6">
        <span className="text-xs uppercase tracking-[0.18em] text-ink-soft font-semibold">See how we teach</span>
        <h2 className="mt-1.5 text-xl md:text-2xl text-ink font-semibold tracking-tight">
          Quick explanations from BrightLearn
        </h2>
      </div>

      <div className="relative h-[340px] sm:h-[400px] md:h-[460px] flex items-center justify-center overflow-hidden px-2">
        {(["left", "right", "center"] as const).map((slot) => {
          const index = positions[slot];
          const video = heroVideos[index];
          const isCenter = slot === "center";
          const active = isCenter && isPlaying;
          const slotTransform =
            slot === "left"
              ? "-translate-x-[46%] sm:-translate-x-[56%] md:-translate-x-[62%] -rotate-6 scale-[0.8]"
              : slot === "right"
              ? "translate-x-[46%] sm:translate-x-[56%] md:translate-x-[62%] rotate-6 scale-[0.8]"
              : "translate-x-0 rotate-0 scale-100";

          return (
            <button
              key={video.id}
              type="button"
              onClick={() => (isCenter ? toggleActivePlayback() : goTo(index))}
              aria-label={
                isCenter
                  ? `${video.title}. ${isPlaying ? "Pause video" : "Play video"}`
                  : `Show and play: ${video.title}`
              }
              style={{ zIndex: isCenter ? 30 : 10 }}
              className={cn(
                "absolute w-[150px] sm:w-[180px] md:w-[210px] aspect-[9/16] rounded-[1.75rem] overflow-hidden",
                "border-[5px] border-background shadow-soft transition-all duration-500 ease-out",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
                slotTransform,
                isCenter ? "shadow-elevated" : "opacity-90 hover:opacity-100"
              )}
            >
              <video
                ref={(el) => (videoRefs.current[video.id] = el)}
                className="absolute inset-0 w-full h-full object-cover bg-ink"
                poster={video.poster}
                muted={isMuted}
                loop={false}
                playsInline
                preload="metadata"
                aria-hidden="true"
                tabIndex={-1}
                onEnded={() => isCenter && setCenterIndex((i) => (i + 1) % count)}
                onPlay={() => isCenter && setIsPlaying(true)}
                onPause={() => isCenter && setIsPlaying(false)}
              >
                {video.sources.map((s) => (
                  <source key={s.src} src={s.src} type={s.type} />
                ))}
              </video>

              {/* Topic label */}
              <span
                className={cn(
                  "absolute left-2.5 right-2.5 bottom-2.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-center truncate",
                  "bg-ink/60 text-white backdrop-blur-sm",
                  !isCenter && "opacity-90"
                )}
              >
                {video.topic}
              </span>

              {/* Play affordance shown only when the centre video isn't playing */}
              {isCenter && !active && (
                <span className="absolute inset-0 flex items-center justify-center bg-ink/10">
                  <span className="w-11 h-11 rounded-full bg-background/90 flex items-center justify-center shadow-soft">
                    <Play className="w-4 h-4 text-ink fill-ink ml-0.5" />
                  </span>
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Rotation progress + controls */}
      <div className="mt-5 flex items-center justify-center lg:justify-start gap-3">
        <button
          type="button"
          onClick={toggleMute}
          aria-pressed={!isMuted}
          aria-label={isMuted ? "Unmute video" : "Mute video"}
          className="w-8 h-8 rounded-full border border-border-soft bg-background flex items-center justify-center text-ink-soft hover:text-ink hover:border-ink/30 transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
        </button>

        <div className="flex items-center gap-1.5">
          {heroVideos.map((v, i) => (
            <button
              key={v.id}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show video ${i + 1} of ${count}: ${v.title}`}
              aria-current={i === centerIndex}
              className="relative h-1.5 rounded-full bg-border-soft overflow-hidden transition-all"
              style={{ width: i === centerIndex ? "28px" : "8px" }}
            >
              {i === centerIndex && shouldAutoplay && (
                <span
                  key={centerIndex}
                  className="absolute inset-y-0 left-0 bg-accent rounded-full animate-hero-rotation-progress"
                />
              )}
              {i === centerIndex && !shouldAutoplay && (
                <span className="absolute inset-0 bg-accent rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
