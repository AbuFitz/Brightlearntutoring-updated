import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SimpleHeader } from "@/components/SimpleHeader";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { GetStartedModal } from "@/components/GetStartedModal";
import { useGetStarted } from "@/contexts/GetStartedContext";
import { guides, CATEGORY_LABELS, type GuideCategory } from "@/data/guides";
import { useSEO } from "@/hooks/useSEO";
import { useBreadcrumbSchema } from "@/hooks/useBreadcrumbSchema";

const SITE_URL = "https://www.brightlearntutoring.co.uk";

const CATEGORY_ORDER: GuideCategory[] = ["GCSE", "KS3", "KS2"];

const GuidesHub = () => {
  const { openModal } = useGetStarted();

  useSEO({
    title: "Maths Guides for Parents & Students | BrightLearn",
    description:
      "Practical guides on GCSE resits, revision techniques, KS3 foundations and SATs preparation, written for parents and students following the English curriculum.",
    path: "/guides",
  });

  useBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Guides", path: "/guides" },
  ]);

  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": guides.map((g, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "name": g.navLabel,
        "url": `${SITE_URL}/guides/${g.slug}`,
      })),
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-guides-hub-ld", "true");
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
          <span className="text-xs uppercase tracking-[0.18em] text-ink-soft font-semibold">Guides</span>
          <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.02em] text-ink font-semibold">
            Practical maths guides,{" "}
            <span className="font-display italic font-normal text-accent">not just marketing.</span>
          </h1>
          <p className="mt-6 text-lg text-ink-soft leading-relaxed">
            Clear, honest guides on GCSE resits, revision and KS2/KS3 foundations — written for parents and
            students following the English curriculum. If you'd rather talk to someone directly,{" "}
            <button type="button" onClick={() => openModal()} className="text-accent font-medium hover:underline">
              enquire about tuition
            </button>{" "}
            any time.
          </p>
        </div>
      </section>

      {/* Categories */}
      {CATEGORY_ORDER.map((category) => {
        const items = guides.filter((g) => g.category === category);
        if (items.length === 0) return null;
        return (
          <section key={category} className="py-10 lg:py-14 border-t border-border-soft bg-background-soft">
            <div className="container max-w-5xl">
              <h2 className="text-2xl md:text-3xl text-ink font-semibold tracking-tight mb-6">
                {CATEGORY_LABELS[category]}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((g) => (
                  <Link
                    key={g.slug}
                    to={`/guides/${g.slug}`}
                    className="group block rounded-2xl border border-border-soft bg-background p-5 hover:border-accent/40 hover:shadow-card hover:-translate-y-0.5 transition-all"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="font-semibold text-ink text-[15px] leading-snug">{g.navLabel}</div>
                      <ArrowUpRight className="w-4 h-4 text-ink-soft shrink-0 transition-transform group-hover:rotate-45 group-hover:text-accent" />
                    </div>
                    <p className="mt-3 text-sm text-ink-soft leading-relaxed">{g.tagline}</p>
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
                Ready to help your child feel more confident in maths?{" "}
                <span className="font-display italic font-normal text-accent">Let's talk.</span>
              </h2>
              <p className="mt-4 text-background/75 max-w-xl mx-auto">
                Tell us what support you're looking for and we'll get back to you to discuss the next steps.
              </p>
              <Button variant="accent" size="xl" className="mt-8 group" onClick={() => openModal()}>
                Enquire about tuition
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

export default GuidesHub;
