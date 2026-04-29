import { useReveal } from "@/hooks/useReveal";
import { ShieldCheck, Users, GraduationCap, Sparkles } from "lucide-react";

const items = [
  { icon: ShieldCheck, label: "DBS-checked tutor", sub: "Verified and fully vetted" },
  { icon: Users, label: "KS2 · KS3 · GCSE", sub: "All stages of school maths" },
  { icon: GraduationCap, label: "Aligned to UK curriculum", sub: "AQA · Edexcel · OCR · WJEC" },
  { icon: Sparkles, label: "Growing on TikTok", sub: "Free lessons loved by students" },
];

export const Trust = () => {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="relative py-10 lg:py-24 bg-background-soft border-y border-border-soft">
      <div className="container">
        <div ref={ref} className="reveal">
          <div className="text-center mb-7 md:mb-12">
            <span className="text-xs uppercase tracking-[0.18em] text-ink-soft font-semibold">Why parents trust us</span>
            <h2 className="mt-3 text-3xl md:text-4xl text-ink font-semibold tracking-tight">
              A foundation parents can <span className="font-display italic font-normal text-accent">rely on</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
            {items.map((it, i) => (
              <div
                key={i}
                className="bg-background rounded-2xl p-4 md:p-6 border border-border-soft shadow-card hover:shadow-soft hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="w-9 h-9 md:w-11 md:h-11 rounded-xl bg-accent-soft flex items-center justify-center mb-3 md:mb-4">
                  <it.icon className="w-5 h-5 text-accent" strokeWidth={2} />
                </div>
                <div className="font-semibold text-ink text-[15px] leading-snug">{it.label}</div>
                <div className="text-sm text-ink-soft mt-1 leading-snug">{it.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
