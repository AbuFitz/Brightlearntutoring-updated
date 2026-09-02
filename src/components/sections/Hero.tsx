import { Button } from "@/components/ui/button";
import { ArrowRight, Star, ShieldCheck } from "lucide-react";
import tutorFemale from "@/assets/tutor-portrait.webp";
import riyanas from "@/assets/riyanas.webp";
import { useGetStarted } from "@/contexts/GetStartedContext";

export const Hero = () => {
  const { openModal } = useGetStarted();

  const handleViewPricing = () => {
    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <section className="relative pt-24 lg:pt-36 pb-12 lg:pb-28 overflow-hidden bg-background">
      {/* Subtle decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-32 left-[8%] w-72 h-72 rounded-full bg-surface-cream blur-3xl opacity-60" />
        <div className="absolute bottom-10 right-[8%] w-96 h-96 rounded-full bg-accent-soft blur-3xl opacity-70" />
      </div>

      <div className="container relative">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* LEFT - copy */}
          <div className="lg:col-span-6 max-w-2xl animate-fade-up">
            {/* Top trust banner pill */}
            <div className="inline-flex items-center gap-2.5 bg-background-soft border border-border-soft rounded-full px-4 py-1.5 mb-6 shadow-soft">
              <span className="text-sm text-ink-soft font-medium">No long-term contract - cancel any time</span>
            </div>

            <h1 className="text-[2.5rem] sm:text-5xl lg:text-[4.25rem] xl:text-[4.75rem] leading-[1.02] tracking-[-0.025em] text-ink font-semibold">
              Helping students <span className="font-display italic font-normal text-accent">understand</span> maths - not just pass exams.
            </h1>

            <p className="mt-6 text-lg text-ink-soft leading-relaxed max-w-xl">
              Personalised Group of 5 tutoring for KS2, KS3 and GCSE students following the English curriculum. Calm, structured lessons that build genuine confidence with numbers.
            </p>

            <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-3">
              <Button variant="default" size="lg" className="group" onClick={openModal}>
                Enquire about tuition
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
              <Button variant="outline" size="lg" onClick={handleViewPricing}>
                View pricing
              </Button>
            </div>

            <div className="mt-7 md:mt-10 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 rounded-full border-2 border-background bg-accent flex items-center justify-center text-[11px] font-bold text-white shrink-0">LM</div>
                  <div className="w-10 h-10 rounded-full border-2 border-background bg-emerald-500 flex items-center justify-center text-[11px] font-bold text-white shrink-0">AK</div>
                  <div className="w-10 h-10 rounded-full border-2 border-background bg-violet-500 flex items-center justify-center text-[11px] font-bold text-white shrink-0">RP</div>
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[...Array(4)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-ink text-ink" />
                    ))}
                    <span className="ml-1.5 text-sm font-semibold text-ink">4.72</span>
                  </div>
                  <div className="text-xs text-ink-soft mt-0.5">Loved by students & parents</div>
                </div>
              </div>
              <div className="h-6 w-px bg-border-soft hidden sm:block" />
              <div className="flex items-center gap-1.5 bg-background-soft border border-border-soft rounded-full px-3 py-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                <span className="text-xs font-semibold text-ink">DBS checked tutor</span>
              </div>
            </div>
          </div>

          {/* RIGHT - single, calm editorial composition */}
          <div className="lg:col-span-6 animate-fade-up" style={{ animationDelay: "0.15s" }}>
            <div className="relative">
              {/* Main image card */}
              <div className="relative rounded-[2rem] overflow-hidden bg-surface-cream border border-border-soft shadow-card aspect-[12/7] max-w-[560px] mx-auto">
                <img
                  src={tutorFemale}
                  alt="A tablet showing worked maths examples - solving equations, straight-line graphs and Pythagoras' theorem - next to a notebook of key formulae, for BrightLearn's KS2, KS3 and GCSE group tutoring"
                  width={1134}
                  height={661}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="eager"
                  // @ts-expect-error React 18 doesn't type fetchpriority yet; lowercase is the correct DOM attribute name.
                  fetchpriority="high"
                />

                {/* Top-right subject chip */}
                <div className="absolute top-5 right-5 bg-background rounded-full pl-2 pr-3.5 py-1.5 flex items-center gap-2 shadow-card border border-border-soft">
                  <span className="w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 14 14" fill="none">
                      <path 
                        d="M3 7l3 3 5-6" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        />
                    </svg>
                  </span>
                  <span className="text-xs font-semibold text-ink">
                      Small group maths sessions
                    </span>
                </div>
              </div>

              {/* Bottom-right tutor card - overlaps */}
              <div className="absolute -bottom-6 -right-2 sm:right-4 bg-background rounded-2xl shadow-soft border border-border-soft p-4 w-[260px] hidden sm:block">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img src={riyanas} alt="Riyana, BrightLearn maths tutor" className="w-11 h-11 rounded-full object-cover" />
                    <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-accent border-2 border-background" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-ink leading-tight truncate">Your tutor · Maths</div>
                    <div className="text-xs text-ink-soft mt-0.5">3+ yrs · KS2 · KS3 · GCSE</div>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-border-soft flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-ink text-ink" />
                    <span className="text-xs font-semibold text-ink">4.72</span>
                    <span className="text-xs text-ink-soft">(78)</span>
                  </div>
                  <span className="text-xs font-semibold text-accent">Available today</span>
                </div>
              </div>

              {/* Top-left stat card - overlaps */}
              <div className="absolute -top-4 -left-2 sm:left-6 bg-background rounded-2xl shadow-soft border border-border-soft px-4 py-3 hidden sm:block">
                <div className="text-[10px] uppercase tracking-widest text-ink-soft font-semibold">Students helped</div>
                <div className="mt-1 flex items-baseline gap-1.5">
                  <span className="font-display text-3xl text-ink leading-none">50+</span>
                  <span className="text-xs text-ink-soft">& growing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
