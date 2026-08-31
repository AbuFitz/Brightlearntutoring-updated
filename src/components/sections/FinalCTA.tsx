import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useGetStarted } from "@/contexts/GetStartedContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { PricingModal } from "@/components/PricingModal";

export const FinalCTA = () => {
  const ref = useReveal<HTMLDivElement>();
  const { openModal } = useGetStarted();
  const isMobile = useIsMobile();
  const [pricingOpen, setPricingOpen] = useState(false);

  const handleViewPricing = () => {
    if (isMobile) {
      setPricingOpen(true);
    } else {
      document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <section className="relative py-12 lg:py-32 bg-background">
      <div className="container">
        <div
          ref={ref}
          className="reveal relative rounded-[2.5rem] overflow-hidden bg-ink text-background px-6 py-12 md:px-16 md:py-24 text-center"
        >
          {/* Soft accent shapes */}
          <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-accent/20 blur-3xl" />
          <div className="absolute -bottom-32 -right-10 w-96 h-96 rounded-full bg-accent/15 blur-3xl" />

          <div className="relative max-w-3xl mx-auto">
            <span className="text-xs uppercase tracking-[0.25em] text-background/60 font-semibold">Begin today</span>
            <h2 className="mt-4 text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
              Ready to help your child feel more confident in <span className="font-display italic font-normal text-accent">maths?</span>
            </h2>
            <p className="text-background/75 mt-6 text-lg max-w-xl mx-auto leading-relaxed">
              Tell us what support you're looking for and we'll get back to you to discuss the next steps.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="accent" size="xl" className="group" onClick={openModal}>
                Enquire about tuition
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
              <Button
                variant="outline"
                size="xl"
                className="bg-transparent border-background/20 text-background hover:bg-background/10 hover:border-background/40"
                onClick={handleViewPricing}
              >
                View pricing
              </Button>
            </div>
          </div>
        </div>
      </div>
      <PricingModal open={pricingOpen} onClose={() => setPricingOpen(false)} />
    </section>
  );
};
