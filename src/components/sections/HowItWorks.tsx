import { useReveal } from "@/hooks/useReveal";
import { PhoneCall, ClipboardList, LineChart } from "lucide-react";
import stepCall from "@/assets/step-call.webp";
import stepPlan from "@/assets/step-plan.webp";
import stepProgress from "@/assets/step-progress.webp";

const steps = [
  {
    n: "01",
    icon: PhoneCall,
    title: "Get in touch",
    desc: "Tell us about your child - their year group, their goals, and where they'd like to improve. We'll follow up with a free introductory session to see how we can help.",
    image: stepCall,
    surface: "bg-surface-cream",
  },
  {
    n: "02",
    icon: ClipboardList,
    title: "Personalised plan",
    desc: "After the introductory session, a custom learning plan is built around your child's exam board, school and pace.",
    image: stepPlan,
    surface: "bg-surface-mint",
  },
  {
    n: "03",
    icon: LineChart,
    title: "Weekly progress",
    desc: "Consistent lessons, regular parent reports, and measurable improvement you can actually see.",
    image: stepProgress,
    surface: "bg-surface-sky",
  },
];

export const HowItWorks = () => {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="how" className="relative py-24 lg:py-32 bg-background">
      <div className="container">
        <div ref={ref} className="reveal max-w-2xl">
          <span className="text-xs uppercase tracking-[0.18em] text-ink-soft font-semibold">How it works</span>
          <h2 className="mt-3 text-4xl md:text-5xl text-ink font-semibold tracking-tight leading-[1.05]">
            From first call to first A*, in three <span className="font-display italic font-normal text-accent">calm steps.</span>
          </h2>
          <p className="text-ink-soft mt-5 leading-relaxed text-[17px]">
            Our process is designed to feel structured and supportive - for both you and your child. No surprises, just steady progress.
          </p>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((s, i) => (
            <StepCard key={s.n} s={s} delay={i * 120} isLast={i === steps.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
};

const StepCard = ({ s, delay, isLast }: { s: any; delay: number; isLast: boolean }) => {
  const ref = useReveal<HTMLDivElement>();
  const Icon = s.icon;
  return (
    <div ref={ref} className="reveal relative" style={{ transitionDelay: `${delay}ms` }}>
      {/* Connector line between cards (desktop) */}
      {!isLast && (
        <div className="hidden md:block absolute top-[110px] -right-4 lg:-right-5 w-8 lg:w-10 h-px bg-border z-10">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-ink" />
        </div>
      )}

      <div className="group rounded-3xl bg-background-soft border border-border-soft overflow-hidden hover:shadow-card hover:-translate-y-1 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] h-full flex flex-col">
        {/* Visual */}
        <div className={`relative ${s.surface} aspect-[4/3] overflow-hidden`}>
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: "radial-gradient(hsl(var(--ink) / 0.12) 1px, transparent 1px)",
              backgroundSize: "14px 14px",
            }}
          />
          <img
            src={s.image}
            alt={s.title}
            width={768}
            height={768}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-contain p-6 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
          />
          <div className="absolute top-4 left-4 bg-background/90 backdrop-blur rounded-full px-2.5 py-1 border border-border-soft">
            <span className="text-[11px] font-semibold tracking-widest text-ink-soft">{s.n}</span>
          </div>
        </div>

        {/* Copy */}
        <div className="p-6 lg:p-7 flex-1 flex flex-col">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-lg bg-background border border-border-soft flex items-center justify-center text-ink">
              <Icon className="w-4 h-4" strokeWidth={1.75} />
            </div>
            <h3 className="text-xl text-ink font-semibold tracking-tight">{s.title}</h3>
          </div>
          <p className="text-ink-soft leading-relaxed text-[15px]">{s.desc}</p>
        </div>
      </div>
    </div>
  );
};
