import { useEffect } from "react";
import { Link } from "react-router-dom";

const CookiesPolicy = () => {
  useEffect(() => {
    document.title = "Cookie Policy — BrightLearn Tutoring";
    window.scrollTo(0, 0);
  }, []);

  const handleRevoke = () => {
    localStorage.removeItem("bl_cookie_consent");
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border-soft py-5 px-6">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-ink flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-background" fill="currentColor">
                <path d="M3 18l6-6-6-6v12zm9-12v12l9-6-9-6z" />
              </svg>
            </div>
            <span className="font-semibold text-ink tracking-tight">BrightLearn Tutoring</span>
          </Link>
          <Link to="/" className="text-sm text-ink-soft hover:text-ink transition-colors">
            ← Back to home
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-semibold text-ink tracking-tight mb-2">Cookie Policy</h1>
        <p className="text-ink-soft text-sm mb-10">Last updated: April 2026</p>

        <div className="space-y-8 text-ink-soft leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-ink mb-3">1. What are cookies?</h2>
            <p>
              Cookies are small text files placed on your device when you visit a website. They help websites
              work properly, remember your preferences, and provide information to the site owner about how
              visitors use the site.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink mb-3">2. Cookies we use</h2>

            <div className="mt-4 space-y-4">
              <div className="rounded-2xl border border-border-soft p-5 bg-background-soft">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-ink text-[15px]">Essential cookies</h3>
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                    Always active
                  </span>
                </div>
                <p className="text-sm">
                  These cookies are necessary for the website to function and cannot be disabled. They include:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                  <li>
                    <code className="text-xs bg-border/40 px-1.5 py-0.5 rounded font-mono">bl_cookie_consent</code>{" "}
                    — Stores your cookie consent preference so we don't ask again on every visit. Expires after
                    365 days.
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-border-soft p-5 bg-background-soft">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-ink text-[15px]">Analytics cookies</h3>
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-ink-soft bg-border/40 px-2 py-0.5 rounded-full">
                    Optional
                  </span>
                </div>
                <p className="text-sm">
                  We may use analytics tools (such as Google Analytics) to understand how visitors use our site.
                  This helps us improve content and user experience. These cookies collect anonymised data only
                  and are only set if you accept all cookies.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink mb-3">3. Managing your preferences</h2>
            <p>
              You can manage your cookie preferences at any time. You can also control cookies through your
              browser settings — most browsers allow you to block or delete cookies. Note that blocking all
              cookies may affect how some parts of the site work.
            </p>
            <button
              onClick={handleRevoke}
              className="mt-4 inline-flex items-center h-10 px-5 rounded-full border border-border text-sm font-medium text-ink-soft hover:text-ink hover:border-ink/40 transition-colors"
            >
              Revoke my consent and reset preferences
            </button>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink mb-3">4. Third-party cookies</h2>
            <p>
              Our website links to third-party platforms including TikTok, Instagram and YouTube. If you follow
              those links, those platforms may set their own cookies. We have no control over third-party
              cookies. Please refer to the privacy and cookie policies of those platforms directly.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink mb-3">5. Contact</h2>
            <p>
              For questions about how we use cookies, contact us at:{" "}
              <a href="mailto:info@brightlearntutoring.co.uk" className="text-accent hover:underline">
                info@brightlearntutoring.co.uk
              </a>
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default CookiesPolicy;
