import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SimpleHeader } from "@/components/SimpleHeader";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { GetStartedModal } from "@/components/GetStartedModal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useGetStarted } from "@/contexts/GetStartedContext";
import { faqCategories } from "@/data/faq";
import { useSEO } from "@/hooks/useSEO";
import { useBreadcrumbSchema } from "@/hooks/useBreadcrumbSchema";

const FAQPage = () => {
  const { openModal } = useGetStarted();

  useSEO({
    title: "Frequently Asked Questions — BrightLearn Tutoring",
    description:
      "Answers to common questions about BrightLearn Tutoring's online maths tutoring — pricing, session format, 1-on-1 tuition, areas we cover, safeguarding and cancellations.",
    path: "/faq",
  });

  useBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "FAQs", path: "/faq" },
  ]);

  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqCategories.flatMap((c) =>
        c.faqs.map((f) => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": { "@type": "Answer", "text": f.a },
        }))
      ),
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-faqpage-ld", "true");
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
          <span className="text-xs uppercase tracking-[0.18em] text-ink-soft font-semibold">FAQs</span>
          <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.02em] text-ink font-semibold">
            Questions{" "}
            <span className="font-display italic font-normal text-accent">answered.</span>
          </h1>
          <p className="mt-6 text-lg text-ink-soft leading-relaxed">
            Everything parents usually ask about pricing, sessions, 1-on-1 tuition and how it all works. Can't
            find what you need?{" "}
            <button type="button" onClick={() => openModal()} className="text-accent font-medium hover:underline">
              Get in touch
            </button>{" "}
            and we'll answer directly.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-4 lg:py-8 bg-background">
        <div className="container max-w-2xl space-y-10">
          {faqCategories.map((cat) => (
            <div key={cat.title}>
              <h2 className="text-xl md:text-2xl text-ink font-semibold tracking-tight mb-4">{cat.title}</h2>
              <div className="rounded-3xl border border-border-soft bg-background-soft shadow-card px-5 md:px-8">
                <Accordion type="single" collapsible>
                  {cat.faqs.map((f, i) => (
                    <AccordionItem key={f.q} value={`${cat.title}-${i}`} className="border-border-soft">
                      <AccordionTrigger className="text-left text-[15px] font-semibold text-ink hover:no-underline py-5">
                        {f.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-ink-soft text-sm leading-relaxed">
                        {f.a}
                        {f.link && (
                          <>
                            {" "}
                            <Link to={f.link.to} className="text-accent font-medium hover:underline">
                              {f.link.label}
                            </Link>
                            .
                          </>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 lg:py-20 bg-background">
        <div className="container">
          <div className="relative rounded-[2.5rem] overflow-hidden bg-ink text-background px-6 py-12 md:px-16 md:py-16 text-center max-w-4xl mx-auto">
            <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-accent/20 blur-3xl pointer-events-none" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-[1.1]">
                Still have a question?{" "}
                <span className="font-display italic font-normal text-accent">Ask us.</span>
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

export default FAQPage;
