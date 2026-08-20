import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SimpleHeader } from "@/components/SimpleHeader";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { GetStartedModal } from "@/components/GetStartedModal";
import { useGetStarted } from "@/contexts/GetStartedContext";
import { locations, Nation } from "@/data/locations";
import { useSEO } from "@/hooks/useSEO";
import { useBreadcrumbSchema } from "@/hooks/useBreadcrumbSchema";

const SITE_URL = "https://brightlearntutoring.co.uk";

const NATION_ORDER: Nation[] = ["England", "Wales", "Northern Ireland"];
const NATION_BLURB: Record<Nation, string> = {
  England: "Live small-group tutoring aligned to AQA, Edexcel and OCR GCSE specifications.",
  Wales: "Tutoring built around the WJEC/Eduqas specification, headquartered in Cardiff.",
  "Northern Ireland": "Transfer test (AQE/PPTC) preparation and CCEA-aligned GCSE tutoring.",
};

const AreasWeCover = () => {
  const { openModal } = useGetStarted();

  useSEO({
    title: "Areas We Cover — Online Maths Tutor Across England, Wales & Northern Ireland",
    description:
      "BrightLearn Tutoring delivers live online group maths tutoring to families across England, Wales and Northern Ireland. See exam-board-aligned tutoring for your city.",
    path: "/online-maths-tutor",
  });

  useBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Areas we cover", path: "/online-maths-tutor" },
  ]);

  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": locations.map((loc, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "name": `Online Maths Tutor in ${loc.city}`,
        "url": `${SITE_URL}/online-maths-tutor/${loc.slug}`,
      })),
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-areas-ld", "true");
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => script.remove();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SimpleHeader showCta />

      {/* Hero */}
      <section className="relative pt-14 lg:pt-20 pb-12 lg:pb-16 overflow-hidden bg-background">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-[8%] w-72 h-72 rounded-full bg-surface-cream blur-3xl opacity-60" />
        </div>
        <div className="container relative max-w-2xl">
          <span className="text-xs uppercase tracking-[0.18em] text-ink-soft font-semibold">Areas we cover</span>
          <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.02em] text-ink font-semibold">
            One online tutor,{" "}
            <span className="font-display italic font-normal text-accent">every city.</span>
          </h1>
          <p className="mt-6 text-lg text-ink-soft leading-relaxed">
            Every BrightLearn session is delivered live online, so there's no local branch to find and no commute
            either side of a lesson — just structured, small-group tutoring wherever a family happens to live
            across England, Wales and Northern Ireland. Pick your city below for exam-board-specific detail, or{" "}
            <button type="button" onClick={() => openModal()} className="text-accent font-medium hover:underline">
              get started
            </button>{" "}
            straight away.
          </p>
        </div>
      </section>

      {/* Grouped location grid */}
      {NATION_ORDER.map((nation) => {
        const cities = locations.filter((l) => l.nation === nation);
        return (
          <section key={nation} className="py-10 lg:py-14 border-t border-border-soft bg-background-soft">
            <div className="container max-w-5xl">
              <div className="flex items-baseline justify-between gap-4 mb-6">
                <h2 className="text-2xl md:text-3xl text-ink font-semibold tracking-tight">{nation}</h2>
                <span className="text-sm text-ink-soft hidden sm:block">{NATION_BLURB[nation]}</span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cities.map((loc) => (
                  <Link
                    key={loc.slug}
                    to={`/online-maths-tutor/${loc.slug}`}
                    className="group block rounded-2xl border border-border-soft bg-background p-5 hover:border-accent/40 hover:shadow-card hover:-translate-y-0.5 transition-all"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="font-semibold text-ink text-lg">{loc.city}</div>
                      <ArrowUpRight className="w-4 h-4 text-ink-soft shrink-0 transition-transform group-hover:rotate-45 group-hover:text-accent" />
                    </div>
                    <div className="text-xs text-ink-soft mt-1">{loc.region}</div>
                    <p className="mt-3 text-sm text-ink-soft leading-relaxed">{loc.tagline}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <section className="py-14 lg:py-20 bg-background">
        <div className="container">
          <div className="relative rounded-[2.5rem] overflow-hidden bg-ink text-background px-6 py-12 md:px-16 md:py-16 text-center max-w-4xl mx-auto">
            <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-accent/20 blur-3xl pointer-events-none" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-[1.1]">
                Don't see your city? <span className="font-display italic font-normal text-accent">We still cover it.</span>
              </h2>
              <p className="mt-4 text-background/75 max-w-xl mx-auto">
                These are just our most-asked-about areas — every session is online, so we work with families
                anywhere in England, Wales or Northern Ireland.
              </p>
              <Button variant="accent" size="xl" className="mt-8 group" onClick={() => openModal()}>
                Get started
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <GetStartedModal />
    </div>
  );
};

export default AreasWeCover;
