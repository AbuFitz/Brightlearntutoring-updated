import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface SimpleHeaderProps {
  backLabel?: string;
  backTo?: string;
  showCta?: boolean;
}

/**
 * Lightweight header for non-homepage routes (legal pages, location pages).
 * Deliberately avoids the full Navbar: its anchor links (#services etc.) and
 * "Get started" button only work because GetStartedModal is mounted on Index —
 * on any other route they'd silently do nothing.
 */
export const SimpleHeader = ({ backLabel = "Back to home", backTo = "/", showCta = false }: SimpleHeaderProps) => (
  <header className="border-b border-border-soft py-5">
    <div className="container flex items-center justify-between gap-4">
      <Link to="/" className="flex items-center gap-2.5 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-ink flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-background" fill="currentColor">
            <path d="M3 18l6-6-6-6v12zm9-12v12l9-6-9-6z" />
          </svg>
        </div>
        <span className="font-semibold text-ink tracking-tight">BrightLearn Tutoring</span>
      </Link>
      <div className="flex items-center gap-4">
        {showCta && (
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link to="/enquire">Get started</Link>
          </Button>
        )}
        <Link to={backTo} className="text-sm text-ink-soft hover:text-ink transition-colors whitespace-nowrap">
          ← {backLabel}
        </Link>
      </div>
    </div>
  </header>
);
