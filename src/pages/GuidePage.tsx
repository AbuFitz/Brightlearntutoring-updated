import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { SimpleHeader } from "@/components/SimpleHeader";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { GetStartedModal } from "@/components/GetStartedModal";
import NotFound from "@/pages/NotFound";
import { useGetStarted } from "@/contexts/GetStartedContext";
import { findGuide, guides, CATEGORY_LABELS } from "@/data/guides";
import { useSEO } from "@/hooks/useSEO";
import { useBreadcrumbSchema } from "@/hooks/useBreadcrumbSchema";

const SITE_URL = "https://www.brightlearntutoring.co.uk";
const TODAY = "2026-08-31";

const GuidePage = () => {
  const { guideSlug } = useParams<{ guideSlug: string }>();
  const guide = guideSlug ? findGuide(guideSlug) : undefined;
  const { openModal } = useGetStarted();

  useSEO(
    guide
      ? {
          title: guide.metaTitle,
          description: guide.metaDescription,
          path: `/guides/${guide.slug}`,
          ogType: "article",
        }
      : { title: "Page not found", description: "", path: `/guides/${guideSlug ?? ""}`, noindex: true }
  );

  useBreadcrumbSchema(
    guide
      ? [
          { name: "Home", path: "/" },
          { name: "Guides", path: "/guides" },
          { name: guide.navLabel, path: `/guides/${guide.slug}` },
        ]
      : []
  );

  useEffect(() => {
    if (!guide) return;

    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": guide.navLabel,
      "description": guide.metaDescription,
      "url": `${SITE_URL}/guides/${guide.slug}`,
      "datePublished": TODAY,
      "dateModified": TODAY,
      "author": { "@type": "Organization", "name": "BrightLearn Tutoring", "url": SITE_URL },
      "publisher": { "@type": "Organization", "name": "BrightLearn Tutoring", "url": SITE_URL },
    };

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": guide.faqs.map((f) => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": { "@type": "Answer", "text": f.a },
      })),
    };

    const scripts = [articleSchema, faqSchema].map((schema, i) => {
      const el = document.createElement("script");
      el.type = "application/ld+json";
      el.setAttribute("data-guide-ld", String(i));
      el.textContent = JSON.stringify(schema);
      document.head.appendChild(el);
      return el;
    });

    const articleMeta = [
      { property: "article:published_time", content: TODAY },
      { property: "article:modified_time", content: TODAY },
      { property: "article:section", content: CATEGORY_LABELS[guide.category] },
    ].map(({ property, content }) => {
      const el = document.createElement("meta");
      el.setAttribute("property", property);
      el.setAttribute("content", content);
      document.head.appendChild(el);
      return el;
    });

    return () => {
      scripts.forEach((s) => s.remove());
      articleMeta.forEach((m) => m.remove());
    };
  }, [guide]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [guideSlug]);

  if (!guide) return <NotFound />;

  const related = guides.filter((g) => guide.relatedGuideSlugs.includes(g.slug));

  return (
    <div className="min-h-screen bg-background">
      <SimpleHeader backLabel="Guides" backTo="/guides" showCta />

      {/* Hero */}
      <section className="relative pt-14 lg:pt-20 pb-14 lg:pb-16 overflow-hidden bg-background">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-[8%] w-72 h-72 rounded-full bg-surface-cream blur-3xl opacity-60" />
        </div>
        <div className="container relative max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-background-soft border border-border-soft rounded-full px-4 py-1.5 mb-6">
            <span className="text-sm text-ink-soft font-medium">{CATEGORY_LABELS[guide.category]}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.02em] text-ink font-semibold">
            {guide.h1}{" "}
            <span className="font-display italic font-normal text-accent">{guide.h1Accent}</span>
          </h1>
          <p className="mt-6 text-lg text-ink-soft leading-relaxed max-w-2xl">{guide.tagline}</p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-10 lg:py-14 bg-background-soft border-y border-border-soft">
        <div className="container max-w-3xl space-y-4">
          {guide.intro.map((p, i) => (
            <p key={i} className="text-ink-soft leading-relaxed text-[15px]">
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* Sections */}
      <section className="py-14 lg:py-20 bg-background">
        <div className="container max-w-3xl space-y-10">
          {guide.sections.map((s, i) => (
            <div key={i}>
              <h2 className="text-2xl md:text-3xl text-ink font-semibold tracking-tight leading-[1.15]">
                {s.heading}
              </h2>
              <div className="mt-4 space-y-4">
                {s.body.map((p, j) => (
                  <p key={j} className="text-ink-soft leading-relaxed text-[15px]">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Programme link */}
      <section className="py-10 lg:py-14 bg-background-soft border-y border-border-soft">
        <div className="container max-w-3xl">
          <div className="flex items-start gap-4 rounded-2xl border border-border-soft bg-background p-6">
            <div>
              <h2 className="font-semibold text-ink text-lg">Looking for tutoring, not just a guide?</h2>
              <p className="mt-2 text-sm text-ink-soft leading-relaxed">
                This page is informational — if you'd like support putting any of this into practice,
                here's where to look next.
              </p>
              <Link
                to={`/${guide.relatedProgrammeSlug}`}
                className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-accent hover:underline"
              >
                {guide.relatedProgrammeLabel}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-14 lg:py-20 bg-background">
        <div className="container max-w-3xl">
          <span className="text-xs uppercase tracking-[0.18em] text-ink-soft font-semibold">FAQs</span>
          <h2 className="mt-3 text-3xl md:text-4xl text-ink font-semibold tracking-tight leading-[1.1]">
            Questions parents ask
          </h2>
          <div className="mt-8 space-y-4">
            {guide.faqs.map((f, i) => (
              <div key={i} className="rounded-2xl border border-border-soft bg-background-soft p-5">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-accent mt-1 shrink-0" />
                  <div className="min-w-0">
                    <div className="font-semibold text-ink text-[15px]">{f.q}</div>
                    <p className="mt-2 text-sm text-ink-soft leading-relaxed">{f.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related guides */}
      {related.length > 0 && (
        <section className="py-14 lg:py-20 bg-background-soft border-t border-border-soft">
          <div className="container max-w-3xl">
            <span className="text-xs uppercase tracking-[0.18em] text-ink-soft font-semibold">You might also find useful</span>
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to={`/guides/${r.slug}`}
                  className="group block rounded-2xl border border-border-soft bg-background p-5 hover:border-accent/40 hover:shadow-card hover:-translate-y-0.5 transition-all"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="font-semibold text-ink text-sm">{r.navLabel}</div>
                    <ArrowUpRight className="w-4 h-4 text-ink-soft shrink-0 transition-transform group-hover:rotate-45 group-hover:text-accent" />
                  </div>
                  <div className="text-xs text-ink-soft mt-1.5 leading-relaxed">{CATEGORY_LABELS[r.category]}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

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

export default GuidePage;
