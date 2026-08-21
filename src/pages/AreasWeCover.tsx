import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import { SimpleHeader } from "@/components/SimpleHeader";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { GetStartedModal } from "@/components/GetStartedModal";
import { useGetStarted } from "@/contexts/GetStartedContext";
import { locations } from "@/data/locations";
import { useSEO } from "@/hooks/useSEO";
import { useBreadcrumbSchema } from "@/hooks/useBreadcrumbSchema";

const SITE_URL = "https://brightlearntutoring.co.uk";

const AreasWeCover = () => {
  const { openModal } = useGetStarted();

  useSEO({
    title: "Areas We Cover — North London Maths Tutor, Online UK-Wide",
    description:
      "BrightLearn Tutoring is based in North London, covering Enfield, Edmonton, Tottenham and Haringey, and delivers live online maths tutoring to families across the UK.",
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
            North London based,{" "}
            <span className="font-display italic font-normal text-accent">UK wide online.</span>
          </h1>
          <p className="mt-6 text-lg text-ink-soft leading-relaxed">
            BrightLearn Tutoring is based in North London, and every session is delivered live online — so while
            we know Enfield, Edmonton, Tottenham and Haringey best, there's no local branch to find and no
            commute either way, which means we work with families anywhere in the UK too. Pick your area below,
            or{" "}
            <button type="button" onClick={() => openModal()} className="text-accent font-medium hover:underline">
              get started
            </button>{" "}
            straight away.
          </p>
        </div>
      </section>

      {/* Local areas grid */}
      <section className="py-10 lg:py-14 border-t border-border-soft bg-background-soft">
        <div className="container max-w-5xl">
          <div className="flex items-baseline justify-between gap-4 mb-6">
            <h2 className="text-2xl md:text-3xl text-ink font-semibold tracking-tight">Our North London base</h2>
            <span className="text-sm text-ink-soft hidden sm:block">
              Small-group and 1-on-1 tutoring for SATs, KS3 and GCSE maths.
            </span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {locations.map((loc) => (
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

      {/* Map */}
      <section className="py-14 lg:py-16 bg-background">
        <div className="container max-w-4xl">
          <span className="text-xs uppercase tracking-[0.18em] text-ink-soft font-semibold">Where we're based</span>
          <h2 className="mt-3 text-2xl md:text-3xl text-ink font-semibold tracking-tight">
            Enfield, Edmonton, Tottenham &amp; Haringey
          </h2>
          <div className="mt-6 rounded-3xl overflow-hidden border border-border-soft shadow-card">
            <iframe
              title="BrightLearn Tutoring's North London coverage area — Enfield, Edmonton, Tottenham and Haringey"
              src="https://maps.google.com/maps?q=Haringey,London&z=12&output=embed"
              className="w-full h-[360px] md:h-[420px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <p className="mt-3 text-sm text-ink-soft">
            Based across these four North London areas — and reachable online anywhere else in the UK.
          </p>
        </div>
      </section>

      {/* Beyond North London */}
      <section className="py-14 lg:py-16 border-t border-border-soft bg-background">
        <div className="container max-w-3xl">
          <div className="flex items-start gap-4 rounded-2xl border border-border-soft bg-background-soft p-6">
            <div className="w-10 h-10 rounded-full bg-accent-soft flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h2 className="font-semibold text-ink text-lg">Not in North London? We still tutor you.</h2>
              <p className="mt-2 text-sm text-ink-soft leading-relaxed">
                Every BrightLearn session is delivered live online, so families anywhere in the UK can join a
                group or book 1-on-1 sessions — you're not limited to our home boroughs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 lg:py-20 bg-background">
        <div className="container">
          <div className="relative rounded-[2.5rem] overflow-hidden bg-ink text-background px-6 py-12 md:px-16 md:py-16 text-center max-w-4xl mx-auto">
            <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-accent/20 blur-3xl pointer-events-none" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-[1.1]">
                Ready to get started? <span className="font-display italic font-normal text-accent">Let's talk.</span>
              </h2>
              <p className="mt-4 text-background/75 max-w-xl mx-auto">
                No card details required. Cancel any time.
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
