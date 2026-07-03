import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Trust } from "@/components/sections/Trust";
import { Services } from "@/components/sections/Services";
import { Values } from "@/components/sections/Values";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Pricing } from "@/components/sections/Pricing";
import { TikTokFeed } from "@/components/sections/TikTokFeed";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";
import { GetStartedModal } from "@/components/GetStartedModal";
import { useEffect } from "react";

const JSON_LD_LOCAL_BUSINESS = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://brightlearntutoring.co.uk/#business",
  "name": "BrightLearn Tutoring",
  "description": "Expert online group maths tutoring for KS2, KS3 and GCSE students across the UK. DBS-checked tutor with personalised lesson plans.",
  "url": "https://brightlearntutoring.co.uk",
  "logo": "https://brightlearntutoring.co.uk/favicon.png",
  "image": "https://brightlearntutoring.co.uk/og-image.png",
  "email": "info@brightlearntutoring.co.uk",
  "areaServed": {
    "@type": "Country",
    "name": "United Kingdom"
  },
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
        "description": "Online group GCSE maths tutoring for Year 10–11. AQA, Edexcel and OCR aligned. Past paper practice and exam technique.",
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

const JSON_LD_FAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does online maths tutoring cost?",
      "acceptedAnswer": { "@type": "Answer", "text": "BrightLearn tutoring starts from £40/month for KS2, £50/month for KS3, and £60/month for GCSE. KS2 includes 4 sessions per month, and KS3/GCSE include 8 sessions per month, with no contracts." }
    },
    {
      "@type": "Question",
      "name": "Is the tutor DBS checked?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. Our tutor is fully DBS-checked and verified to work with children." }
    },
    {
      "@type": "Question",
      "name": "What exam boards do you cover for GCSE maths?",
      "acceptedAnswer": { "@type": "Answer", "text": "We cover all major UK exam boards including AQA, Edexcel (Pearson) and OCR." }
    },
    {
      "@type": "Question",
      "name": "Can I cancel at any time?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. There are no contracts or long-term commitments. You can cancel your tutoring plan at any time." }
    },
    {
      "@type": "Question",
      "name": "How are the sessions delivered?",
      "acceptedAnswer": { "@type": "Answer", "text": "All sessions are delivered live online in small groups via video call. KS2 sessions are 1 hour, and KS3/GCSE sessions are 1.5 hours." }
    }
  ]
};

const Index = () => {
  useEffect(() => {
    // Inject JSON-LD structured data
    const existingScripts = document.querySelectorAll('script[data-brightlearn-ld]');
    existingScripts.forEach(s => s.remove());

    [JSON_LD_LOCAL_BUSINESS, JSON_LD_FAQ].forEach((schema, i) => {
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

  return (
    <main className="min-h-screen bg-background text-foreground" aria-label="BrightLearn Tutoring — Online Maths Tutor UK">
      <Navbar />
      <Hero />
      <Trust />
      <Services />
      <Values />
      <div className="hidden md:block"><HowItWorks /></div>
      <div className="hidden lg:block"><Pricing /></div>
      <TikTokFeed />
      <FinalCTA />
      <Footer />
      <GetStartedModal />
    </main>
  );
};

export default Index;
