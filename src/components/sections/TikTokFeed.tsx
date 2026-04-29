import { useRef, useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import { ExternalLink, Play } from "lucide-react";
import thumb1 from "@/assets/tiktok-thumb-1.jpg";
import thumb2 from "@/assets/tiktok-thumb-2.jpg";
import thumb3 from "@/assets/tiktok-thumb-3.jpg";

const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.69a8.29 8.29 0 0 0 4.83 1.55v-3.4a4.85 4.85 0 0 1-1.9-.15z" />
  </svg>
);

type Topic = {
  title: string;
  desc: string;
  url: string;
  thumb: string | null;
  gradient: string;
};

const desktopTopics: Topic[] = [
  {
    title: "Simultaneous equations made EASY",
    desc: "Grade 8/9 GCSE maths — save this for revision.",
    url: "https://www.tiktok.com/@brightlearntutoring/video/7627986502479318274",
    thumb: thumb1,
    gradient: "",
  },
  {
    title: "Basic Trig example",
    desc: "A clear walkthrough of trigonometry for GCSE students.",
    url: "https://www.tiktok.com/@brightlearntutoring/video/7631676960132828438",
    thumb: thumb2,
    gradient: "",
  },
  {
    title: "Decimals to Percentages",
    desc: "Converting decimals to percentages — quick and simple.",
    url: "https://www.tiktok.com/@brightlearntutoring/video/7629757799156780310",
    thumb: thumb3,
    gradient: "",
  },
];

const mobileExtraTopics: Topic[] = [
  {
    title: "BrightLearn Maths",
    desc: "More free maths tips from BrightLearn Tutoring.",
    url: "https://www.tiktok.com/@brightlearntutoring/video/7629026072146824470",
    thumb: null,
    gradient: "from-slate-800 to-blue-900",
  },
  {
    title: "BrightLearn Maths",
    desc: "More free maths tips from BrightLearn Tutoring.",
    url: "https://www.tiktok.com/@brightlearntutoring/video/7628477148734426390",
    thumb: null,
    gradient: "from-slate-800 to-emerald-900",
  },
  {
    title: "BrightLearn Maths",
    desc: "More free maths tips from BrightLearn Tutoring.",
    url: "https://www.tiktok.com/@brightlearntutoring/video/7628357985139461378",
    thumb: null,
    gradient: "from-slate-800 to-purple-900",
  },
];

const allTopics = [...desktopTopics, ...mobileExtraTopics];

export const TikTokFeed = () => {
  const ref = useReveal<HTMLDivElement>();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll === 0) return;
    setActiveIndex(Math.round((scrollLeft / maxScroll) * (allTopics.length - 1)));
  };

  return (
    <section className="relative py-14 lg:py-32 bg-background-soft">
      <div className="container">
        <div ref={ref} className="reveal text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <span className="text-xs uppercase tracking-[0.18em] text-ink-soft font-semibold">On TikTok</span>
          <h2 className="mt-3 text-4xl md:text-5xl text-ink font-semibold tracking-tight leading-[1.05]">
            Maths made clear — <span className="font-display italic font-normal text-accent">on your feed.</span>
          </h2>
          <p className="text-ink-soft mt-5 text-lg leading-relaxed">
            Free bite-sized maths lessons on TikTok, loved by students and parents across the UK.
          </p>
        </div>

        {/* Desktop grid — original 3 videos */}
        <div className="hidden md:grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {desktopTopics.map((t, i) => (
            <TopicCard key={t.url} topic={t} delay={i * 100} />
          ))}
        </div>

        {/* Mobile swipe carousel — all 6 videos */}
        <div className="md:hidden">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory gap-4 -mx-4 px-4 pb-4 scrollbar-hide"
          >
            {allTopics.map((t) => (
              <div key={t.url} className="snap-center flex-shrink-0 w-[75vw]">
                <TopicCard topic={t} delay={0} />
              </div>
            ))}
          </div>
          {/* Dot indicators */}
          <div className="flex items-center justify-center gap-1.5 mt-3">
            {allTopics.map((_, i) => (
              <div
                key={i}
                className={`rounded-full transition-all duration-300 ${
                  i === activeIndex ? "w-5 h-2 bg-accent" : "w-2 h-2 bg-ink/20"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="mt-10 text-center">
          <a
            href="https://www.tiktok.com/@brightlearntutoring"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-ink text-background text-sm font-semibold hover:bg-ink-soft transition-colors"
          >
            <TikTokIcon className="w-4 h-4" />
            Watch on TikTok — @brightlearntutoring
            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
          </a>
        </div>
      </div>
    </section>
  );
};

const TopicCard = ({ topic, delay }: { topic: Topic; delay: number }) => {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className="reveal rounded-3xl overflow-hidden border border-border-soft shadow-card bg-background hover:-translate-y-1 hover:shadow-soft transition-all duration-400"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="relative aspect-[9/10] overflow-hidden bg-ink">
        {topic.thumb ? (
          <img
            src={topic.thumb}
            alt={topic.title}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${topic.gradient}`} />
        )}
        <div className="absolute inset-0 bg-ink/20" />
        <a
          href={topic.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Watch ${topic.title} on TikTok`}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-16 h-16 rounded-full bg-background/90 backdrop-blur flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-soft">
            <Play className="w-6 h-6 text-ink fill-ink ml-1" />
          </div>
        </a>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="inline-flex items-center gap-1.5 bg-background/90 backdrop-blur rounded-full px-3 py-1.5 border border-border-soft">
            <TikTokIcon className="w-3.5 h-3.5 text-ink" />
            <span className="text-[11px] font-semibold text-ink tracking-wide">@brightlearntutoring</span>
          </div>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-ink text-base leading-snug">{topic.title}</h3>
        <p className="text-sm text-ink-soft mt-1.5 leading-relaxed">{topic.desc}</p>
      </div>
    </div>
  );
};
