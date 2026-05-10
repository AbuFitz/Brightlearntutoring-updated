import { useReveal } from "@/hooks/useReveal";

const pillars = [
  {
    word: "Clarity",
    desc: "We break complex ideas into clear, logical steps. No jargon - just understanding that lasts.",
    num: "01",
  },
  {
    word: "Confidence",
    desc: "Each lesson is designed to remove fear. Students leave knowing they can do it themselves.",
    num: "02",
  },
  {
    word: "Consistency",
    desc: "Weekly structure, regular feedback, and measurable progress every single term.",
    num: "03",
  },
];

export const Values = () => {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="relative py-14 lg:py-32 bg-background-soft">
      <div className="container">
        <div ref={ref} className="reveal text-center max-w-3xl mx-auto mb-10 md:mb-16">
          <span className="text-xs uppercase tracking-[0.18em] text-ink-soft font-semibold">Our philosophy</span>
          <h2 className="mt-3 text-4xl md:text-6xl text-ink font-semibold tracking-tight leading-[1.05]">
            Three words that shape <span className="font-display italic font-normal text-accent">every lesson.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-border-soft rounded-3xl overflow-hidden border border-border-soft">
          {pillars.map((p, i) => (
            <PillarCard key={p.word} p={p} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
};

const PillarCard = ({ p, delay }: { p: { word: string; desc: string; num: string }; delay: number }) => {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className="reveal bg-background p-6 lg:p-12 group hover:bg-surface-cream/40 transition-colors duration-500"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-baseline gap-3 mb-5">
        <span className="text-xs font-semibold text-ink-soft tracking-widest">{p.num}</span>
        <div className="h-px flex-1 bg-border-soft" />
      </div>
      <div className="font-display text-4xl lg:text-6xl text-ink leading-none mb-4 lg:mb-5">
        {p.word}<span className="text-accent">.</span>
      </div>
      <p className="text-ink-soft leading-relaxed text-[15px]">{p.desc}</p>
    </div>
  );
};
