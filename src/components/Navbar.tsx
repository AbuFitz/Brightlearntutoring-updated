import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, UserCircle2 } from "lucide-react";
import { useGetStarted } from "@/contexts/GetStartedContext";
import { PricingModal } from "@/components/PricingModal";

const PORTAL_URL = "https://lessons.brightlearntutoring.co.uk";

const navLinks = [
  { label: "Programmes", href: "#services" },
  { label: "How it works", href: "#how" },
  { label: "Pricing", href: "#pricing" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [pricingOpen, setPricingOpen] = useState(false);
  const { openModal } = useGetStarted();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Nav is "visible" (opaque) when scrolled OR when mobile menu is open
  const solid = scrolled || open;

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          solid
            ? "bg-background/95 backdrop-blur-xl border-b border-border-soft shadow-soft"
            : "bg-transparent"
        }`}
      >
        <div className="container">
          <nav className="flex items-center justify-between h-16 lg:h-[72px]">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-ink flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-background" fill="currentColor">
                  <path d="M3 18l6-6-6-6v12zm9-12v12l9-6-9-6z" />
                </svg>
              </div>
              <span className="font-semibold text-ink tracking-tight">BrightLearn Tutoring</span>
            </a>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="px-4 py-2 text-sm text-ink-soft hover:text-ink transition-colors font-medium"
                >
                  {l.label}
                </a>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2">
              <a
                href={PORTAL_URL}
                className="hidden lg:inline-flex items-center gap-1.5 px-3 py-2 text-sm text-ink-soft hover:text-ink transition-colors font-medium"
              >
                <UserCircle2 className="w-4 h-4" />
                Portal Login
              </a>
              <Button variant="default" size="sm" className="hidden sm:inline-flex" onClick={openModal}>
                Enquire now
              </Button>

              {/* Mobile pricing pill */}
              <button
                onClick={() => setPricingOpen(true)}
                className="lg:hidden flex items-center gap-1.5 h-8 px-3 rounded-full border border-border bg-background-soft text-xs font-semibold text-ink hover:border-ink/30 transition-colors"
              >
                Pricing
              </button>

              {/* Hamburger */}
              <button
                onClick={() => setOpen(!open)}
                className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-secondary transition-colors"
                aria-label={open ? "Close menu" : "Open menu"}
              >
                {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </nav>

          {/* Mobile menu */}
          {open && (
            <div className="lg:hidden pb-6 pt-2 border-t border-border-soft animate-fade-up">
              <div className="flex flex-col gap-1">
                {navLinks.filter((l) => l.href !== "#pricing").map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="px-4 py-3 text-ink hover:bg-secondary rounded-xl transition-colors"
                  >
                    {l.label}
                  </a>
                ))}
                <button
                  onClick={() => { setOpen(false); setPricingOpen(true); }}
                  className="px-4 py-3 text-left text-ink hover:bg-secondary rounded-xl transition-colors"
                >
                  Pricing
                </button>
                <a
                  href={PORTAL_URL}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 text-ink hover:bg-secondary rounded-xl transition-colors"
                >
                  <UserCircle2 className="w-4 h-4 text-ink-soft" />
                  Learning Portal Login
                </a>
                <div className="flex gap-2 mt-3 px-2">
                  <Button
                    variant="default"
                    size="default"
                    className="flex-1"
                    onClick={() => { setOpen(false); openModal(); }}
                  >
                    Enquire about tuition
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      <PricingModal open={pricingOpen} onClose={() => setPricingOpen(false)} />
    </>
  );
};
