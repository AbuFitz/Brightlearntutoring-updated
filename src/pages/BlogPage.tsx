import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Play, ArrowRight } from "lucide-react";
import { SimpleHeader } from "@/components/SimpleHeader";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { GetStartedModal } from "@/components/GetStartedModal";
import { useGetStarted } from "@/contexts/GetStartedContext";
import { videos } from "@/data/videos";
import { useSEO } from "@/hooks/useSEO";
import { useBreadcrumbSchema } from "@/hooks/useBreadcrumbSchema";

const SITE_URL = "https://www.brightlearntutoring.co.uk";

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

const BlogPage = () => {
  const { openModal } = useGetStarted();
  const [playingId, setPlayingId] = useState<string | null>(null);

  useSEO({
    title: "Blog & Maths Tips | BrightLearn Tutoring",
    description:
      "Short, free GCSE Maths explainers and worked examples from BrightLearn Tutoring's YouTube channel — quick tips on algebra, graphs, trigonometry and exam-style questions.",
    path: "/blog",
  });

  useBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
  ]);

  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": videos.map((v, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "item": {
          "@type": "VideoObject",
          "name": v.title,
          "description": v.description,
          "uploadDate": v.publishedDate,
          "thumbnailUrl": `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`,
          "contentUrl": `https://www.youtube.com/shorts/${v.id}`,
          "embedUrl": `https://www.youtube.com/embed/${v.id}`,
          "publisher": { "@type": "Organization", "name": "BrightLearn Tutoring", "url": SITE_URL },
        },
      })),
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-blog-ld", "true");
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
          <span className="text-xs uppercase tracking-[0.18em] text-ink-soft font-semibold">Blog</span>
          <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.02em] text-ink font-semibold">
            Maths made clear,{" "}
            <span className="font-display italic font-normal text-accent">one short video at a time.</span>
          </h1>
          <p className="mt-6 text-lg text-ink-soft leading-relaxed">
            Free, bite-sized GCSE Maths explainers from BrightLearn Tutoring's YouTube channel — quick
            walkthroughs of the topics students actually get stuck on. Prefer something more in-depth?{" "}
            <Link to="/guides" className="text-accent font-medium hover:underline">
              Read our guides
            </Link>{" "}
            instead.
          </p>
        </div>
      </section>

      {/* Video grid */}
      <section className="py-10 lg:py-14 border-t border-border-soft bg-background-soft">
        <div className="container">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
            {videos.map((v) => {
              const isPlaying = playingId === v.id;
              return (
                <div
                  key={v.id}
                  className="rounded-2xl overflow-hidden border border-border-soft bg-background shadow-card"
                >
                  <div className="relative aspect-[9/16] bg-ink">
                    {isPlaying ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${v.id}?autoplay=1`}
                        title={v.title}
                        className="absolute inset-0 w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <button
                        type="button"
                        onClick={() => setPlayingId(v.id)}
                        aria-label={`Play ${v.title}`}
                        className="group absolute inset-0 w-full h-full"
                      >
                        <img
                          src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
                          alt={v.title}
                          loading="lazy"
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-ink/20 group-hover:bg-ink/30 transition-colors" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-background/90 backdrop-blur flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Play className="w-5 h-5 text-ink fill-ink ml-0.5" />
                          </div>
                        </div>
                      </button>
                    )}
                  </div>
                  <div className="p-3">
                    <div className="font-semibold text-ink text-sm leading-snug">{v.title}</div>
                    <p className="text-xs text-ink-soft mt-1 leading-relaxed line-clamp-2">{v.description}</p>
                    <div className="text-[11px] text-ink-soft/70 mt-2">{fmtDate(v.publishedDate)}</div>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-center text-sm text-ink-soft mt-8">
            More on{" "}
            <a
              href="https://www.youtube.com/channel/UCwLfSed7TDecNnVqY5RjuFQ"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent font-medium hover:underline"
            >
              YouTube
            </a>{" "}
            and{" "}
            <a
              href="https://www.tiktok.com/@brightlearntutoring"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent font-medium hover:underline"
            >
              TikTok
            </a>
            .
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 lg:py-20 bg-background">
        <div className="container">
          <div className="relative rounded-[2.5rem] overflow-hidden bg-ink text-background px-6 py-12 md:px-16 md:py-16 text-center max-w-4xl mx-auto">
            <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-accent/20 blur-3xl pointer-events-none" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-[1.1]">
                Want this kind of support, tailored to your child?{" "}
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

export default BlogPage;
