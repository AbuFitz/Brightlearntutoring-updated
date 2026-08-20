import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Trust } from "@/components/sections/Trust";
import { Services } from "@/components/sections/Services";
import { Values } from "@/components/sections/Values";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Pricing } from "@/components/sections/Pricing";
import { TikTokFeed } from "@/components/sections/TikTokFeed";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";
import { GetStartedModal } from "@/components/GetStartedModal";
import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetStarted } from "@/contexts/GetStartedContext";
import { useSEO } from "@/hooks/useSEO";
import { homeFaqs } from "@/data/faq";

const JSON_LD_LOCAL_BUSINESS = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://brightlearntutoring.co.uk/#business",
  "name": "BrightLearn Tutoring",
  "alternateName": ["BrightLearn Tutoring UK", "BrightLearn Maths Tutoring"],
  "legalName": "BrightLearn Tutoring Ltd",
  "description": "Expert online group maths tutoring for KS2, KS3 and GCSE students, delivered across England, Wales and Northern Ireland. DBS-checked tutor with personalised lesson plans.",
  "url": "https://brightlearntutoring.co.uk",
  "logo": "https://brightlearntutoring.co.uk/favicon.png",
  "image": "https://brightlearntutoring.co.uk/og-image.png",
  "email": "info@brightlearntutoring.co.uk",
  "areaServed": [
    { "@type": "AdministrativeArea", "name": "England" },
    { "@type": "AdministrativeArea", "name": "Wales" },
    { "@type": "AdministrativeArea", "name": "Northern Ireland" }
  ],
  "serviceType": "Online Maths Tutoring",
  "priceRange": "££",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Maths Tutoring Programmes",
    "itemListElement": [
      {
        "@type": "Offer",
        "name": "KS2 Maths Tutoring",
        "description": "Online group maths tutoring for Year 5–6 students. Covers times tables, fractions, problem solving and SATs preparation.",
        "price": "40",
        "priceCurrency": "GBP",
        "priceSpecification": { "@type": "UnitPriceSpecification", "price": "40", "priceCurrency": "GBP", "unitText": "month" }
      },
      {
        "@type": "Offer",
        "name": "KS3 Maths Tutoring",
        "description": "Online group maths tutoring for Year 7–9 students. Algebra, geometry, ratios and building towards GCSE.",
        "price": "50",
        "priceCurrency": "GBP",
        "priceSpecification": { "@type": "UnitPriceSpecification", "price": "50", "priceCurrency": "GBP", "unitText": "month" }
      },
      {
        "@type": "Offer",
        "name": "GCSE Maths Tutoring",
        "description": "Online group GCSE maths tutoring for Year 10–11. Aligned to AQA, Edexcel, OCR and WJEC/Eduqas. Past paper practice and exam technique.",
        "price": "60",
        "priceCurrency": "GBP",
        "priceSpecification": { "@type": "UnitPriceSpecification", "price": "60", "priceCurrency": "GBP", "unitText": "month" }
      }
    ]
  },
  "sameAs": [
    "https://www.tiktok.com/@brightlearntutoring",
    "https://www.instagram.com/brightlearn_tutoring/",
    "https://www.youtube.com/channel/UCwLfSed7TDecNnVqY5RjuFQ",
    "https://linktr.ee/BrightLearnTutoring"
  ]
};

const buildFaqSchema = () => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": homeFaqs.map((f) => ({
    "@type": "Question",
    "name": f.q,
    "acceptedAnswer": { "@type": "Answer", "text": f.a },
  })),
});

const Index = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { open, openModal } = useGetStarted();
  const isEnquireRoute = location.pathname === "/enquire";
  const wasOpen = useRef(open);

  useEffect(() => {
    // Inject JSON-LD structured data
    const existingScripts = document.querySelectorAll('script[data-brightlearn-ld]');
    existingScripts.forEach(s => s.remove());

    [JSON_LD_LOCAL_BUSINESS, buildFaqSchema()].forEach((schema, i) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-brightlearn-ld", String(i));
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    return () => {
      document.querySelectorAll('script[data-brightlearn-ld]').forEach(s => s.remove());
    };
  }, []);

  // Cross-page links (e.g. footer "KS2 Maths" from a location page) land here
  // as /#services — scroll to the section once the homepage has mounted.
  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.slice(1);
    const raf = requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    });
    return () => cancelAnimationFrame(raf);
  }, [location.hash]);

  // /enquire is a direct, shareable link to the enquiry form
  useEffect(() => {
    if (isEnquireRoute && !open) {
      openModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEnquireRoute]);

  // Closing the modal while on /enquire returns to the homepage
  useEffect(() => {
    if (wasOpen.current && !open && isEnquireRoute) {
      navigate("/", { replace: true });
    }
    wasOpen.current = open;
  }, [open, isEnquireRoute, navigate]);

  useSEO(
    isEnquireRoute
      ? {
          title: "Enquire Now — Book a Free Maths Tutoring Consultation | BrightLearn Tutoring",
          description:
            "Start your child's maths tutoring journey today. Tell us about your KS2, KS3 or GCSE student and we'll match them with a live, DBS-checked small-group session — no card details required.",
          path: "/enquire",
        }
      : {
          title: "BrightLearn Tutoring | Online Maths Tutor for KS2, KS3 & GCSE — England, Wales & NI",
          description:
            "Expert online group maths tutoring for KS2, KS3 and GCSE students, available across England, Wales and Northern Ireland. DBS-checked tutor. Personalised lessons. Cancel any time. Enquire today.",
          path: "/",
        }
  );

  return (
    <main className="min-h-screen bg-background text-foreground" aria-label="BrightLearn Tutoring — Nationwide Online Maths Tutor UK">
      <Navbar />
      <Hero />
      <Trust />
      <Services />
      <Values />
      <div className="hidden md:block"><HowItWorks /></div>
      <div className="hidden lg:block"><Pricing /></div>
      <TikTokFeed />
      <FAQ />
      <FinalCTA />
      <Footer />
      <GetStartedModal />
    </main>
  );
};

export default Index;
