import { Link } from "react-router-dom";
import { useReveal } from "@/hooks/useReveal";
import { ArrowRight, ExternalLink, Play } from "lucide-react";
import thumb1 from "@/assets/tiktok-thumb-1.webp";
import thumb2 from "@/assets/tiktok-thumb-2.webp";
import thumb3 from "@/assets/tiktok-thumb-3.webp";

const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.69a8.29 8.29 0 0 0 4.83 1.55v-3.4a4.85 4.85 0 0 1-1.9-.15z" />
  </svg>
);

const thumbs = [thumb1, thumb2, thumb3];

/**
 * Lightweight teaser band, not a full video showcase — the video hub
 * itself lives at /blog. This section's job is just to point people
 * there (and to the TikTok profile for shorter, native-feed clips),
 * without duplicating the same video grid twice on one page.
 */
export const TikTokFeed = () => {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section className="relative py-14 lg:py-20 bg-background">
      <div className="container">
        <div
          ref={ref}
          className="reveal rounded-[2.5rem] border border-border-soft bg-background-soft px-6 py-10 md:px-12 md:py-12 flex flex-col md:flex-row items-center gap-8 md:gap-12"
        >
          {/* Thumbnail collage */}
          <div className="flex -space-x-6 shrink-0">
            {thumbs.map((t, i) => (
              <div
                key={t}
                className="relative w-20 h-28 md:w-24 md:h-32 rounded-2xl overflow-hidden border-4 border-background shadow-soft"
                style={{ zIndex: thumbs.length - i, transform: `rotate(${(i - 1) * 6}deg)` }}
              >
                <img src={t} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                {i === 1 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-ink/20">
                    <div className="w-9 h-9 rounded-full bg-background/90 flex items-center justify-center">
                      <Play className="w-3.5 h-3.5 text-ink fill-ink ml-0.5" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Text + CTAs */}
          <div className="flex-1 text-center md:text-left">
            <span className="text-xs uppercase tracking-[0.18em] text-ink-soft font-semibold">Free video lessons</span>
            <h2 className="mt-2 text-2xl md:text-3xl text-ink font-semibold tracking-tight leading-tight">
              Bite-sized maths tips, <span className="font-display italic font-normal text-accent">on video.</span>
            </h2>
            <p className="text-ink-soft mt-3 leading-relaxed max-w-lg mx-auto md:mx-0">
              Every lesson lives on our blog, plus shorter clips on TikTok.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink text-background text-sm font-semibold hover:bg-ink-soft transition-colors"
              >
                Watch on our blog
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <a
                href="https://www.tiktok.com/@brightlearntutoring"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border-soft text-ink text-sm font-semibold hover:border-ink/30 transition-colors"
              >
                <TikTokIcon className="w-4 h-4" />
                Follow on TikTok
                <ExternalLink className="w-3.5 h-3.5 opacity-60" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
