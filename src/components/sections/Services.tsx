import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import { ArrowUpRight } from "lucide-react";
import charKs2 from "@/assets/char-ks2.png";
import charKs3 from "@/assets/char-ks3.png";
import charGcse from "@/assets/char-gcse.png";
import { ProgrammeModal, Programme } from "@/components/ProgrammeModal";

const services: (Programme & {
  anim: string;
})[] = [
  {
    name: "KS2",
    tag: "Ages 7–11",
    price: "40",
    tagline: "Strong foundations and SATs confidence for primary students.",
    description: "Building number confidence, mental maths, and the foundations for SATs success - at a calm pace.",
    whoFor: "Year 3–6 students who want to build genuine confidence with numbers, times tables, and problem solving - and feel prepared for SATs without the pressure.",
    sessionStructure: "Each 1-hour session starts with a short warm-up activity, followed by a focused topic block, and ends with a quick recap to cement understanding. After every session, parents receive brief progress notes.",
    topics: ["Times tables", "Fractions & decimals", "Mental maths", "Problem solving", "SATs technique", "Number fluency"],
    outcomes: [
      "A solid grasp of number facts and mental maths strategies",
      "Growing confidence when tackling word problems and SATs questions",
      "Regular parent updates so you always know how progress is going",
      "A calm, unhurried pace that builds real understanding - not just memorisation",
    ],
    surface: "bg-surface-cream",
    img: charKs2,
    anim: "animate-bounce-soft",
  },
  {
    name: "KS3",
    tag: "Ages 11–14",
    price: "50",
    tagline: "Core topic mastery building a clear path towards GCSE.",
    description: "Bridging the gap between primary and GCSE with structured lessons that develop algebraic thinking.",
    whoFor: "Year 7–9 students adjusting to secondary maths, struggling with specific topics, or those who want to get ahead before GCSE begins. Also great for students whose confidence dipped in Year 7.",
    sessionStructure: "Sessions follow a structured lesson plan based on each student's individual gaps. We track progress topic-by-topic using a personalised learning log, revisiting weak areas and extending strong ones.",
    topics: ["Algebra foundations", "Geometry & angles", "Ratios & proportion", "Negative numbers", "Graphs & functions", "Statistics"],
    outcomes: [
      "Strong algebraic thinking that prepares students for the demands of GCSE",
      "A topic-by-topic learning log so nothing gets left behind",
      "Clear progress assessments at the end of each term",
      "Renewed confidence heading into Year 10 - far ahead of their peers",
    ],
    surface: "bg-surface-mint",
    img: charKs3,
    anim: "animate-sway",
  },
  {
    name: "GCSE",
    tag: "Ages 14–16",
    price: "60",
    tagline: "Targeted revision and exam technique to boost grades.",
    description: "Targeted exam preparation across all UK boards. We turn understanding into grades - confidently.",
    whoFor: "Year 10–11 students preparing for AQA, Edexcel, or OCR exams who want to hit their target grade - whether that's a Grade 4 pass or pushing for Grade 7–9.",
    sessionStructure: "Sessions combine topic mastery with real exam practice. We work through past paper questions under timed conditions, dissect mark schemes, and build the exam technique that turns understanding into marks.",
    topics: ["All GCSE topics", "Past paper practice", "Mark scheme technique", "Grade 7–9 extension", "Mock exam prep", "AQA · Edexcel · OCR"],
    outcomes: [
      "Clear understanding of the exact style of questions that appear on your exam board",
      "Exam technique that maximises marks - not just correct answers",
      "Regular mock sessions to build confidence under exam conditions",
      "Measurable grade improvements, typically within the first two terms",
    ],
    surface: "bg-accent-soft",
    img: charGcse,
    anim: "animate-float-slow",
  },
];

export const Services = () => {
  const ref = useReveal<HTMLDivElement>();
  const [selected, setSelected] = useState<Programme | null>(null);
  return (
    <section id="services" className="relative py-14 lg:py-32 bg-background">
      <div className="container">
        <div ref={ref} className="reveal max-w-2xl mb-10 md:mb-14">
          <span className="text-xs uppercase tracking-[0.18em] text-ink-soft font-semibold">Programmes</span>
          <h2 className="mt-3 text-4xl md:text-5xl text-ink font-semibold tracking-tight leading-[1.05]">
            One tutor. One student. One curriculum, <span className="font-display italic font-normal text-accent">tailored.</span>
          </h2>
          <p className="text-ink-soft mt-5 text-lg leading-relaxed">
            Every programme is shaped around your child - their pace, their gaps, their goals.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <ServiceCard key={s.name} s={s} delay={i * 80} onExplore={() => setSelected(s)} />
          ))}
        </div>
      </div>

      <ProgrammeModal programme={selected} onClose={() => setSelected(null)} />
    </section>
  );
};

const ServiceCard = ({ s, delay, onExplore }: { s: typeof services[number]; delay: number; onExplore: () => void }) => {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className="reveal" style={{ transitionDelay: `${delay}ms` }}>
      <div
        className="group cursor-pointer block h-full rounded-3xl bg-background border border-border-soft shadow-card hover:shadow-soft hover:-translate-y-1 transition-all duration-400 overflow-hidden"
        onClick={onExplore}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && onExplore()}
      >
        {/* Character zone */}
        <div className={`relative h-44 md:h-56 ${s.surface} overflow-hidden`}>
          <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(hsl(var(--ink) / 0.18) 1px, transparent 1px)", backgroundSize: "16px 16px" }} />
          <img
            src={s.img}
            alt={`${s.name} illustrated character`}
            width={896}
            height={1024}
            loading="lazy"
            className={`absolute left-1/2 -translate-x-1/2 bottom-0 h-[110%] w-auto object-contain ${s.anim} group-hover:scale-105 transition-transform duration-500`}
          />
          <span className="absolute top-4 left-4 text-[10px] tracking-[0.18em] uppercase text-ink/70 font-semibold bg-background/80 backdrop-blur rounded-full px-2.5 py-1">
            {s.tag}
          </span>
        </div>

        <div className="p-5 md:p-7">
          <h3 className="text-2xl text-ink font-semibold tracking-tight">{s.name} Maths</h3>
          <p className="text-ink-soft mt-3 text-[15px] leading-relaxed min-h-[80px]">{s.description}</p>

          <ul className="mt-5 space-y-2.5 border-t border-border-soft pt-5">
            {s.topics.slice(0, 4).map((t) => (
              <li key={t} className="text-sm text-ink/85 flex items-center gap-2.5">
                <svg className="w-3.5 h-3.5 text-accent shrink-0" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-center justify-between">
            <span className="text-sm font-semibold text-ink group-hover:text-accent transition-colors">Explore programme</span>
            <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center group-hover:bg-ink group-hover:text-background transition-all duration-400">
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
