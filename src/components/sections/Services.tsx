import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import { ArrowUpRight } from "lucide-react";
import charKs2 from "@/assets/char-ks2.png";
import charKs3 from "@/assets/char-ks3.png";
import charGcse from "@/assets/char-gcse.png";
import { ProgrammeModal, Programme } from "@/components/ProgrammeModal";

const services: (Omit<Programme, "name"> & {
  name: Programme["name"];
  img: string;
  anim: string;
})[] = [
  {
    name: "KS2",
    tag: "Ages 7–11",
    price: "40",
    tagline: "Strong foundations and SATs confidence for primary students.",
    description: "Building number confidence, mental maths, and the foundations for SATs success - at a calm pace.",
    whoFor: "Year 5–6 students who want to build genuine confidence with numbers, times tables, and problem solving - and feel prepared for SATs without the pressure.",
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
    whoFor: "Year 10–11 students preparing for mocks, foundation/higher tier students aiming for grade jumps, and exam-anxious students who need structure and confidence under time pressure.",
    sessionStructure: "Every month includes a strategic cycle: diagnosis -> teaching -> retrieval -> exam practice. Sessions include timed questions, mark-scheme analysis, and focused technique coaching.",
    topics: ["Algebra & functions", "Geometry & trigonometry", "Probability", "Statistics", "Exam technique", "Past papers"],
    outcomes: [
      "Sharper exam technique and better use of marks schemes",
      "Targeted work on high-impact weak topics",
      "Greater speed, accuracy and confidence under timed conditions",
      "A realistic pathway towards target grades with clear progress tracking",
    ],
    surface: "bg-surface-lilac",
    img: charGcse,
    anim: "animate-float",
  },
];

export const Services = () => {
  const ref = useReveal<HTMLDivElement>();
  const [active, setActive] = useState<Programme | null>(null);

  return (
    <section id="services" className="py-20 lg:py-24 bg-background">
      <div className="container">
        <div ref={ref} className="reveal">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.18em] text-ink-soft font-semibold">Programmes</span>
            <h2 className="mt-3 text-3xl md:text-4xl text-ink font-semibold tracking-tight">
              Small group maths tuition for every stage
            </h2>
          </div>

          <div className="mt-10 grid md:grid-cols-3 gap-4 lg:gap-5">
            {services.map((s, idx) => (
              <article
                key={s.name}
                className="group relative rounded-3xl border border-border-soft bg-background shadow-card overflow-hidden hover:shadow-soft transition-all duration-300"
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="inline-flex text-[10px] font-semibold tracking-[0.16em] uppercase px-2.5 py-1 rounded-full bg-accent/10 text-accent">
                        {s.tag}
                      </span>
                      <h3 className="mt-3 text-2xl font-semibold text-ink tracking-tight">{s.name}</h3>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-ink leading-none">£{s.price}</div>
                      <div className="text-xs text-ink-soft mt-1">/month</div>
                    </div>
                  </div>

                  <p className="mt-3 text-sm text-ink-soft leading-relaxed">{s.tagline}</p>

                  <button
                    onClick={() => setActive(s)}
                    className="mt-5 w-full h-11 rounded-full border border-border-soft text-sm font-medium text-ink group-hover:border-ink/30 group-hover:bg-background-soft transition-all inline-flex items-center justify-center gap-1.5"
                  >
                    View programme
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <ProgrammeModal programme={active} onClose={() => setActive(null)} />
    </section>
  );
};
