import { useState } from "react";
import { Instagram, Youtube, Facebook, Linkedin, Mail, MapPin, Link, UserCircle2 } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";
import { WhatsAppIcon } from "@/components/WhatsAppButton";
import { WhatsAppModal } from "@/components/WhatsAppModal";
import { InPersonModal } from "@/components/InPersonModal";
import { locations } from "@/data/locations";

const PORTAL_URL = "https://lessons.brightlearntutoring.co.uk";
const LINKEDIN_URL = "https://www.linkedin.com/company/brightlearn-tutoring/";

const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.69a8.29 8.29 0 0 0 4.83 1.55v-3.4a4.85 4.85 0 0 1-1.9-.15z" />
  </svg>
);

const linkGroups: {
  title: string;
  links: { label: string; href: string; external?: boolean }[];
}[] = [
  {
    title: "Programmes",
    links: [
      { label: "KS2 Maths & SATs Prep", href: "/ks2-maths-confidence-sats-preparation" },
      { label: "Year 7–9 / KS3 Maths", href: "/year-7-9-maths-support" },
      { label: "GCSE Maths Foundation", href: "/gcse-maths-foundation-tutor" },
      { label: "GCSE Maths Higher", href: "/gcse-maths-higher-tutor" },
      { label: "GCSE Maths Resit", href: "/gcse-maths-resit-tuition" },
      { label: "1-to-1 Online Tutoring", href: "/online-one-to-one-maths-tutoring" },
      { label: "Small-Group GCSE Revision", href: "/small-group-gcse-maths-revision" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Guides", href: "/guides" },
      { label: "Learning Portal", href: PORTAL_URL, external: true },
    ],
  },
  {
    title: "Areas we cover",
    links: [
      ...locations.map((loc) => ({ label: loc.city, href: `/online-maths-tutor/${loc.slug}` })),
      { label: "View all areas", href: "/online-maths-tutor" },
    ],
  },
  {
    title: "Follow Us",
    links: [
      { label: "TikTok", href: "https://www.tiktok.com/@brightlearntutoring", external: true },
      { label: "Instagram", href: "https://www.instagram.com/brightlearn_tutoring/", external: true },
      { label: "Facebook", href: "https://www.facebook.com/p/BrightLearn-Tutoring-61592769766314/", external: true },
      { label: "LinkedIn", href: LINKEDIN_URL, external: true },
      { label: "YouTube", href: "https://www.youtube.com/channel/UCwLfSed7TDecNnVqY5RjuFQ", external: true },
      { label: "Linktree", href: "https://linktr.ee/BrightLearnTutoring", external: true },
    ],
  },
];

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [whatsappOpen, setWhatsappOpen] = useState(false);
  const [inPersonOpen, setInPersonOpen] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubscribed(true);
  };

  return (
    <footer className="relative bg-background-soft border-t border-border-soft pt-20 pb-10">
      <div className="container">
        {/* Top: brand + newsletter */}
        <div className="grid lg:grid-cols-12 gap-12 pb-16 border-b border-border-soft">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-lg bg-ink flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-background" fill="currentColor">
                  <path d="M3 18l6-6-6-6v12zm9-12v12l9-6-9-6z" />
                </svg>
              </div>
              <span className="font-semibold text-ink text-lg tracking-tight">BrightLearn Tutoring</span>
            </div>
            <p className="text-ink-soft text-[15px] leading-relaxed max-w-md">
              Online maths tutoring for KS2, KS3 and GCSE students following the English curriculum. Built on clarity, confidence and consistency.
            </p>

            {subscribed ? (
              <div className="mt-6 flex items-center gap-3 max-w-md h-11 px-5 rounded-full bg-background-soft border border-border-soft">
                <span className="text-sm font-medium text-ink">🚀 Coming soon — we'll let you know!</span>
              </div>
            ) : (
              <form className="mt-6 flex gap-2 max-w-md" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 h-11 px-4 rounded-full bg-background border border-border text-sm text-ink placeholder:text-ink-soft/70 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition"
                />
                <button
                  type="submit"
                  className="h-11 px-5 rounded-full bg-ink text-background text-sm font-semibold hover:bg-ink-soft transition"
                >
                  Subscribe
                </button>
              </form>
            )}
            <p className="text-xs text-ink-soft mt-3">Monthly parenting + maths tips. No spam.</p>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {linkGroups.map((g) => (
              <div key={g.title}>
                <h4 className="text-sm font-semibold text-ink mb-4">{g.title}</h4>
                <ul className="space-y-3">
                  {g.links.map((l) =>
                    l.external ? (
                      <li key={l.label}>
                        <a
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-ink-soft hover:text-ink transition-colors"
                        >
                          {l.label}
                        </a>
                      </li>
                    ) : (
                      <li key={l.label}>
                        <RouterLink to={l.href} className="text-sm text-ink-soft hover:text-ink transition-colors">
                          {l.label}
                        </RouterLink>
                      </li>
                    )
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Middle: contact bar */}
        <div className="py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-border-soft">
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-x-6 gap-y-3">
            <a href="mailto:info@brightlearntutoring.co.uk" className="flex items-center gap-2.5 text-sm text-ink-soft hover:text-ink transition-colors">
              <Mail className="w-4 h-4" />
              info@brightlearntutoring.co.uk
            </a>
            <button
              type="button"
              onClick={() => setWhatsappOpen(true)}
              className="flex items-center gap-2.5 text-sm text-ink-soft hover:text-ink transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
              WhatsApp · 07577 702613
            </button>
            <RouterLink to="/online-maths-tutor" className="flex items-center gap-2.5 text-sm text-ink-soft hover:text-ink transition-colors">
              <MapPin className="w-4 h-4" />
              North London · Online UK-wide
            </RouterLink>
            <button
              type="button"
              onClick={() => setInPersonOpen(true)}
              className="flex items-center gap-2.5 text-sm text-ink-soft hover:text-ink transition-colors"
            >
              <MapPin className="w-4 h-4 text-accent" />
              In-person tutoring · Coming soon
            </button>
          </div>
          <div className="flex items-center gap-2">
            {[
              { Icon: TikTokIcon, label: "TikTok", href: "https://www.tiktok.com/@brightlearntutoring" },
              { Icon: Instagram, label: "Instagram", href: "https://www.instagram.com/brightlearn_tutoring/" },
              { Icon: Facebook, label: "Facebook", href: "https://www.facebook.com/p/BrightLearn-Tutoring-61592769766314/" },
              { Icon: Linkedin, label: "LinkedIn", href: LINKEDIN_URL },
              { Icon: Youtube, label: "YouTube", href: "https://www.youtube.com/channel/UCwLfSed7TDecNnVqY5RjuFQ" },
              { Icon: Link, label: "Linktree", href: "https://linktr.ee/BrightLearnTutoring" },
            ].map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 rounded-full bg-background border border-border-soft flex items-center justify-center text-ink-soft hover:text-ink hover:border-ink/30 hover:-translate-y-0.5 transition-all"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-ink-soft">
          <div>© {new Date().getFullYear()} BrightLearn Tutoring Ltd. All rights reserved.</div>
          <div className="flex gap-6">
            <RouterLink to="/privacy" className="hover:text-ink transition-colors">Privacy</RouterLink>
            <RouterLink to="/terms" className="hover:text-ink transition-colors">Terms</RouterLink>
            <RouterLink to="/safeguarding" className="hover:text-ink transition-colors">Safeguarding</RouterLink>
            <RouterLink to="/cookies" className="hover:text-ink transition-colors">Cookies</RouterLink>
          </div>
        </div>
      </div>
      <WhatsAppModal open={whatsappOpen} onClose={() => setWhatsappOpen(false)} />
      <InPersonModal open={inPersonOpen} onClose={() => setInPersonOpen(false)} />
    </footer>
  );
};
