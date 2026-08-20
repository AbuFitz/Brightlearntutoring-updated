import { Link } from "react-router-dom";
import { useReveal } from "@/hooks/useReveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { homeFaqs } from "@/data/faq";

// Renders the exact same Q&A the FAQPage JSON-LD describes, so the
// structured data always matches what's actually visible on the page.
export const FAQ = () => {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="relative py-14 lg:py-32 bg-background-soft">
      <div className="container">
        <div ref={ref} className="reveal max-w-2xl mx-auto text-center mb-10 md:mb-14">
          <span className="text-xs uppercase tracking-[0.18em] text-ink-soft font-semibold">FAQs</span>
          <h2 className="mt-3 text-4xl md:text-5xl text-ink font-semibold tracking-tight leading-[1.05]">
            Questions parents <span className="font-display italic font-normal text-accent">ask us.</span>
          </h2>
        </div>

        <div className="max-w-2xl mx-auto rounded-3xl border border-border-soft bg-background shadow-card px-5 md:px-8">
          <Accordion type="single" collapsible>
            {homeFaqs.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`} className="border-border-soft">
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
    </section>
  );
};
