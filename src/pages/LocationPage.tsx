import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { MapPin, ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { SimpleHeader } from "@/components/SimpleHeader";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { GetStartedModal } from "@/components/GetStartedModal";
import { PricingModal } from "@/components/PricingModal";
import { useGetStarted } from "@/contexts/GetStartedContext";
import { findLocation, locations } from "@/data/locations";
import { pricingTiers } from "@/data/pricing";
import { useSEO } from "@/hooks/useSEO";
import { useBreadcrumbSchema } from "@/hooks/useBreadcrumbSchema";

const SITE_URL = "https://brightlearntutoring.co.uk";

const fmtPrice = (n: number) => (Number.isInteger(n) ? `£${n}` : `£${n.toFixed(2)}`);

const LocationPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = slug ? findLocation(slug) : undefined;
  const { openModal } = useGetStarted();
  const [pricingOpen, setPricingOpen] = useState(false);

  useSEO(
    location
      ? {
          title: `Online Maths Tutor in ${location.city} | KS2, KS3 & GCSE — BrightLearn Tutoring`,
          description: location.metaDescription,
          path: `/online-maths-tutor/${location.slug}`,
        }
      : { title: "Page not found", description: "", path: "/online-maths-tutor", noindex: true }
  );

  useBreadcrumbSchema(
    location
      ? [
          { name: "Home", path: "/" },
          { name: "Areas we cover", path: "/online-maths-tutor" },
          { name: location.city, path: `/online-maths-tutor/${location.slug}` },
        ]
      : []
  );

  useEffect(() => {
    if (!location) return;

    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": `Online Maths Tutoring in ${location.city}`,
      "serviceType": "Online Maths Tutoring",
      "provider": { "@type": "Organization", "name": "BrightLearn Tutoring", "url": SITE_URL },
      "areaServed": { "@type": "City", "name": location.city },
      "url": `${SITE_URL}/online-maths-tutor/${location.slug}`,
    };

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": location.faqs.map((f) => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": { "@type": "Answer", "text": f.a },
      })),
    };

    const scripts = [serviceSchema, faqSchema].map((schema, i) => {
      const el = document.createElement("script");
      el.type = "application/ld+json";
      el.setAttribute("data-location-ld", String(i));
      el.textContent = JSON.stringify(schema);
      document.head.appendChild(el);
      return el;
    });

    return () => scripts.forEach((s) => s.remove());
  }, [location]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!location) return <Navigate to="/online-maths-tutor" replace />;

  const nearby = locations.filter((l) => l.slug !== location.slug);

  return (
    <div className="min-h-screen bg-background">
      <SimpleHeader backLabel="Areas we cover" backTo="/online-maths-tutor" showCta />

      {/* Hero */}
      <section className="relative pt-14 lg:pt-20 pb-14 lg:pb-20 overflow-hidden bg-background">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-[8%] w-72 h-72 rounded-full bg-surface-cream blur-3xl opacity-60" />
        </div>
        <div className="container relative max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-background-soft border border-border-soft rounded-full px-4 py-1.5 mb-6">
            <MapPin className="w-3.5 h-3.5 text-accent" />
            <span className="text-sm text-ink-soft font-medium">
              {location.region} · {location.nation}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.02em] text-ink font-semibold">
            Online maths tutor in{" "}
            <span className="font-display italic font-normal text-accent">{location.city}</span>
          </h1>
          <p className="mt-6 text-lg text-ink-soft leading-relaxed max-w-2xl">{location.intro}</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button variant="default" size="lg" className="group" onClick={() => openModal()}>
              Get started
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
            <Button variant="outline" size="lg" onClick={() => setPricingOpen(true)}>
              View pricing
            </Button>
          </div>
        </div>
      </section>

      {/* Local context */}
      <section className="py-14 lg:py-20 bg-background-soft border-y border-border-soft">
        <div className="container max-w-3xl">
          <span className="text-xs uppercase tracking-[0.18em] text-ink-soft font-semibold">Local context</span>
          <h2 className="mt-3 text-3xl md:text-4xl text-ink font-semibold tracking-tight leading-[1.1]">
            {location.localContext.heading}
          </h2>
          <div className="mt-6 space-y-4">
            {location.localContext.body.map((p, i) => (
              <p key={i} className="text-ink-soft leading-relaxed text-[15px]">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Exam boards + programmes */}
      <section className="py-14 lg:py-20 bg-background">
        <div className="container max-w-3xl">
          <span className="text-xs uppercase tracking-[0.18em] text-ink-soft font-semibold">Exam boards</span>
          <h2 className="mt-3 text-3xl md:text-4xl text-ink font-semibold tracking-tight leading-[1.1]">
            Aligned to what{" "}
            <span className="font-display italic font-normal text-accent">{location.city} schools</span> teach
          </h2>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {location.examBoards.map((b) => (
              <span
                key={b}
                className="inline-flex items-center h-9 px-4 rounded-full bg-secondary text-sm font-semibold text-ink"
              >
                {b}
              </span>
            ))}
          </div>

          <div className="mt-10 grid sm:grid-cols-3 gap-4">
            {pricingTiers.map((t) => (
              <button
                key={t.name}
                type="button"
                onClick={() => openModal(t.name, "group")}
                className="group block text-left rounded-2xl border border-border-soft bg-background p-5 hover:border-accent/40 hover:shadow-card hover:-translate-y-0.5 transition-all"
              >
                <div className="text-sm font-semibold text-ink-soft">{t.name} Maths</div>
                <div className="mt-1.5 flex items-baseline gap-1">
                  <span className="text-2xl font-semibold text-ink">£{t.group.price}</span>
                  <span className="text-xs text-ink-soft">/month</span>
                </div>
                <div className="mt-1.5 inline-flex items-center rounded-full bg-accent-soft px-2 py-0.5 text-[11px] font-semibold text-accent">
                  {fmtPrice(t.group.price / t.group.sessionsPerMonth)}/lesson · {t.group.sessionsPerMonth} sessions
                </div>
                <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-accent">
                  Get started
                  <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                </div>
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setPricingOpen(true)}
            className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-accent hover:underline"
          >
            1-on-1 tuition also available — see all pricing options
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-14 lg:py-20 bg-background-soft border-t border-border-soft">
        <div className="container max-w-3xl">
          <span className="text-xs uppercase tracking-[0.18em] text-ink-soft font-semibold">FAQs</span>
          <h2 className="mt-3 text-3xl md:text-4xl text-ink font-semibold tracking-tight leading-[1.1]">
            {location.city} families ask us
          </h2>
          <div className="mt-8 space-y-4">
            {location.faqs.map((f, i) => (
              <div key={i} className="rounded-2xl border border-border-soft bg-background p-5">
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

      {/* Nearby areas */}
      {nearby.length > 0 && (
        <section className="py-14 lg:py-20 bg-background">
          <div className="container max-w-3xl">
            <span className="text-xs uppercase tracking-[0.18em] text-ink-soft font-semibold">Also nearby</span>
            <h2 className="mt-3 text-2xl md:text-3xl text-ink font-semibold tracking-tight leading-[1.1]">
              Other North London areas we cover
            </h2>
            <div className="mt-6 grid sm:grid-cols-3 gap-4">
              {nearby.map((n) => (
                <Link
                  key={n.slug}
                  to={`/online-maths-tutor/${n.slug}`}
                  className="group block rounded-2xl border border-border-soft bg-background-soft p-5 hover:border-accent/40 hover:shadow-card hover:-translate-y-0.5 transition-all"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="font-semibold text-ink">{n.city}</div>
                    <ArrowUpRight className="w-4 h-4 text-ink-soft shrink-0 transition-transform group-hover:rotate-45 group-hover:text-accent" />
                  </div>
                  <div className="text-xs text-ink-soft mt-1">{n.region}</div>
                </Link>
              ))}
            </div>
            <Link
              to="/online-maths-tutor"
              className="inline-flex items-center gap-1.5 mt-6 text-sm font-semibold text-accent hover:underline"
            >
              See every area we cover
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
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
                Start tutoring in {location.city}{" "}
                <span className="font-display italic font-normal text-accent">today.</span>
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
      <PricingModal open={pricingOpen} onClose={() => setPricingOpen(false)} />
    </div>
  );
};

export default LocationPage;
