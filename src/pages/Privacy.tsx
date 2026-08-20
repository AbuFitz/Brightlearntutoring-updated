import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";
import { useBreadcrumbSchema } from "@/hooks/useBreadcrumbSchema";

const PrivacyPolicy = () => {
  useSEO({
    title: "Privacy Policy — BrightLearn Tutoring",
    description:
      "How BrightLearn Tutoring collects, uses and protects your personal data under UK GDPR, including your rights as a parent, guardian or student.",
    path: "/privacy",
  });
  useBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Privacy Policy", path: "/privacy" },
  ]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Simple header */}
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
        <h1 className="text-4xl font-semibold text-ink tracking-tight mb-2">Privacy Policy</h1>
        <p className="text-ink-soft text-sm mb-10">Last updated: April 2026</p>

        <div className="prose prose-sm max-w-none space-y-8 text-ink-soft leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-ink mb-3">1. Who we are</h2>
            <p>
              BrightLearn Tutoring is an online maths tutoring service based in the United Kingdom. We provide
              personalised small-group tutoring for KS2, KS3 and GCSE students. You can contact us at{" "}
              <a href="mailto:info@brightlearntutoring.co.uk" className="text-accent hover:underline">
                info@brightlearntutoring.co.uk
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink mb-3">2. What data we collect</h2>
            <p>When you use our website or contact us, we may collect:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Your name and email address (when you submit an enquiry or sign up for updates)</li>
              <li>Information about your child's year group or learning needs (if provided)</li>
              <li>General usage data (pages visited, browser type) via standard web analytics</li>
            </ul>
            <p className="mt-3">
              We do not collect payment card details. We do not collect special category personal data about
              children without explicit parental consent.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink mb-3">3. How we use your data</h2>
            <p>We use the information you provide solely to:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Respond to your enquiries and arrange tutoring sessions</li>
              <li>Send you updates about our services (only where you've opted in)</li>
              <li>Improve our website and the quality of our service</li>
            </ul>
            <p className="mt-3">
              We will never sell, rent or share your personal data with third parties for marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink mb-3">4. Legal basis for processing</h2>
            <p>
              Under UK GDPR, we process your personal data on the basis of your consent (when you submit an
              enquiry or opt in to updates) and our legitimate interests in operating and improving our tutoring
              service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink mb-3">5. How long we keep your data</h2>
            <p>
              We retain enquiry and contact data for up to 2 years. If a tutoring relationship is established, we
              retain relevant records for the duration of that relationship plus 2 years thereafter. You may
              request deletion of your data at any time.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink mb-3">6. Your rights</h2>
            <p>Under UK data protection law, you have the right to:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data ("right to be forgotten")</li>
              <li>Withdraw consent at any time (where processing is based on consent)</li>
              <li>Lodge a complaint with the ICO (ico.org.uk)</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, please email{" "}
              <a href="mailto:info@brightlearntutoring.co.uk" className="text-accent hover:underline">
                info@brightlearntutoring.co.uk
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink mb-3">7. Cookies</h2>
            <p>
              Our website may use essential cookies to function correctly. We may also use analytics cookies
              (such as Google Analytics) to understand how visitors use the site. You can control cookies through
              your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink mb-3">8. Third-party services</h2>
            <p>
              We use FormSubmit to process contact form submissions. Your enquiry data is transmitted securely.
              We may also link to third-party platforms (TikTok, Instagram, YouTube) — those platforms operate
              under their own privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink mb-3">9. Contact</h2>
            <p>
              If you have any questions about this policy or how we handle your data, please contact us at:{" "}
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

export default PrivacyPolicy;
