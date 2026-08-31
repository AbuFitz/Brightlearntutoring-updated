import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, ArrowUpRight, CheckCircle2, AlertCircle } from "lucide-react";
import { SimpleHeader } from "@/components/SimpleHeader";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { GetStartedModal } from "@/components/GetStartedModal";
import { PricingModal } from "@/components/PricingModal";
import NotFound from "@/pages/NotFound";
import { useGetStarted } from "@/contexts/GetStartedContext";
import { findTopic, topics } from "@/data/topics";
import { pricingTiers, fmtPrice } from "@/data/pricing";
import { useSEO } from "@/hooks/useSEO";
import { useBreadcrumbSchema } from "@/hooks/useBreadcrumbSchema";

const SITE_URL = "https://www.brightlearntutoring.co.uk";

const TopicPage = () => {
  const { topicSlug } = useParams<{ topicSlug: string }>();
  const topic = topicSlug ? findTopic(topicSlug) : undefined;
  const { openModal } = useGetStarted();
  const [pricingOpen, setPricingOpen] = useState(false);

  useSEO(
    topic
      ? {
          title: topic.metaTitle,
          description: topic.metaDescription,
          path: `/${topic.slug}`,
        }
      : { title: "Page not found", description: "", path: `/${topicSlug ?? ""}`, noindex: true }
  );

  useBreadcrumbSchema(
    topic
      ? [
          { name: "Home", path: "/" },
          { name: topic.navLabel, path: `/${topic.slug}` },
        ]
      : []
  );

  useEffect(() => {
    if (!topic) return;

    const tiers = pricingTiers.filter((t) => topic.relevantTiers.includes(t.name));

    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": topic.navLabel,
      "serviceType": "Online Maths Tutoring",
      "provider": { "@type": "Organization", "name": "BrightLearn Tutoring", "url": SITE_URL },
      "areaServed": { "@type": "Country", "name": "United Kingdom" },
      "url": `${SITE_URL}/${topic.slug}`,
      "description": topic.metaDescription,
      "offers": tiers.map((t) => ({
        "@type": "Offer",
        "name": `${t.name} — ${topic.navLabel}`,
        "price": String(topic.defaultSessionType === "1on1" ? t.oneToOne.monthlyPrice : t.group.price),
        "priceCurrency": "GBP",
      })),
    };

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": topic.faqs.map((f) => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": { "@type": "Answer", "text": f.a },
      })),
    };

    const scripts = [serviceSchema, faqSchema].map((schema, i) => {
      const el = document.createElement("script");
      el.type = "application/ld+json";
      el.setAttribute("data-topic-ld", String(i));
      el.textContent = JSON.stringify(schema);
      document.head.appendChild(el);
      return el;
    });

    return () => scripts.forEach((s) => s.remove());
  }, [topic]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [topicSlug]);

  if (!topic) return <NotFound />;

  const tiers = pricingTiers.filter((t) => topic.relevantTiers.includes(t.name));
  const related = topics.filter((t) => topic.relatedSlugs.includes(t.slug));
  const ctaLabel = topic.defaultSessionType === "group" ? "Register interest" : "Enquire about tuition";

  return (
    <div className="min-h-screen bg-background">
      <SimpleHeader backLabel="Home" backTo="/" showCta />

      {/* Hero */}
      <section className="relative pt-14 lg:pt-20 pb-14 lg:pb-16 overflow-hidden bg-background">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-[8%] w-72 h-72 rounded-full bg-surface-cream blur-3xl opacity-60" />
        </div>
        <div className="container relative max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-background-soft border border-border-soft rounded-full px-4 py-1.5 mb-6">
            <span className="text-sm text-ink-soft font-medium">{topic.eyebrow}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.02em] text-ink font-semibold">
            {topic.h1}{" "}
            <span className="font-display italic font-normal text-accent">{topic.h1Accent}</span>
          </h1>
          <p className="mt-6 text-lg text-ink-soft leading-relaxed max-w-2xl">{topic.tagline}</p>

          <div className="mt-8 space-y-2.5">
            {topic.painPoints.map((p, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-accent mt-1 shrink-0" />
                <p className="text-sm text-ink-soft italic leading-relaxed">{p}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button
              variant="default"
              size="lg"
              className="group"
              onClick={() => openModal(tiers[0]?.name, topic.defaultSessionType, topic.defaultSupportType)}
            >
              {ctaLabel}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
            <Button variant="outline" size="lg" onClick={() => setPricingOpen(true)}>
              View pricing
            </Button>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-14 lg:py-20 bg-background-soft border-y border-border-soft">
        <div className="container max-w-3xl">
          <div className="space-y-4">
            {topic.intro.map((p, i) => (
              <p key={i} className="text-ink-soft leading-relaxed text-[15px]">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Who it's for + what we cover */}
      <section className="py-14 lg:py-20 bg-background">
        <div className="container max-w-3xl grid md:grid-cols-2 gap-10">
          <div>
            <span className="text-xs uppercase tracking-[0.18em] text-ink-soft font-semibold">Who this is for</span>
            <div className="mt-4 space-y-3">
              {topic.whoFor.map((w, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                  <p className="text-sm text-ink-soft leading-relaxed">{w}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <span className="text-xs uppercase tracking-[0.18em] text-ink-soft font-semibold">What we cover</span>
            <div className="mt-4 space-y-3">
              {topic.whatWeCover.map((w, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                  <p className="text-sm text-ink-soft leading-relaxed">{w}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-14 lg:py-20 bg-background-soft border-t border-border-soft">
        <div className="container max-w-3xl">
          <span className="text-xs uppercase tracking-[0.18em] text-ink-soft font-semibold">Pricing</span>
          <h2 className="mt-3 text-3xl md:text-4xl text-ink font-semibold tracking-tight leading-[1.1]">
            Straightforward pricing,{" "}
            <span className="font-display italic font-normal text-accent">no contracts.</span>
          </h2>
          <div className="mt-8 grid sm:grid-cols-2 gap-4" style={{ gridTemplateColumns: tiers.length === 1 ? "1fr" : undefined }}>
            {tiers.map((t) => (
              <div key={t.name} className="rounded-2xl border border-border-soft bg-background p-5">
                <div className="text-sm font-semibold text-ink-soft">{t.name} Maths</div>
                <div className="mt-2 flex items-baseline gap-3">
                  <div>
                    <span className="text-2xl font-semibold text-ink">£{t.group.price}</span>
                    <span className="text-xs text-ink-soft">/month · group</span>
                  </div>
                </div>
                <div className="mt-1.5 inline-flex items-center rounded-full bg-accent-soft px-2 py-0.5 text-[11px] font-semibold text-accent">
                  {t.group.sessionsPerMonth} lessons · {t.group.sessionLength} each
                </div>
                <div className="mt-1 text-xs text-ink-soft">
                  or from {fmtPrice(t.oneToOne.singleLessonPrice)}/lesson 1-on-1
                </div>
                <button
                  type="button"
                  onClick={() => openModal(t.name, topic.defaultSessionType, topic.defaultSupportType)}
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline"
                >
                  {ctaLabel}
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
          <p className="text-xs text-ink-soft mt-4">
            Small-group places are subject to suitable group availability.
          </p>
          <button
            type="button"
            onClick={() => setPricingOpen(true)}
            className="inline-flex items-center gap-1.5 mt-3 text-sm font-semibold text-accent hover:underline"
          >
            See all pricing options
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-14 lg:py-20 bg-background">
        <div className="container max-w-3xl">
          <span className="text-xs uppercase tracking-[0.18em] text-ink-soft font-semibold">FAQs</span>
          <h2 className="mt-3 text-3xl md:text-4xl text-ink font-semibold tracking-tight leading-[1.1]">
            Parents ask us
          </h2>
          <div className="mt-8 space-y-4">
            {topic.faqs.map((f, i) => (
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

      {/* Related topics */}
      {related.length > 0 && (
        <section className="py-14 lg:py-20 bg-background-soft border-t border-border-soft">
          <div className="container max-w-3xl">
            <span className="text-xs uppercase tracking-[0.18em] text-ink-soft font-semibold">You might also need</span>
            <div className="mt-6 grid sm:grid-cols-3 gap-4">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to={`/${r.slug}`}
                  className="group block rounded-2xl border border-border-soft bg-background p-5 hover:border-accent/40 hover:shadow-card hover:-translate-y-0.5 transition-all"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="font-semibold text-ink text-sm">{r.navLabel}</div>
                    <ArrowUpRight className="w-4 h-4 text-ink-soft shrink-0 transition-transform group-hover:rotate-45 group-hover:text-accent" />
                  </div>
                  <div className="text-xs text-ink-soft mt-1.5 leading-relaxed">{r.eyebrow}</div>
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
              <Button
                variant="accent"
                size="xl"
                className="mt-8 group"
                onClick={() => openModal(tiers[0]?.name, topic.defaultSessionType, topic.defaultSupportType)}
              >
                {ctaLabel}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <GetStartedModal />
      <PricingModal open={pricingOpen} onClose={() => setPricingOpen(false)} />
    </div>
  );
};

export default TopicPage;
