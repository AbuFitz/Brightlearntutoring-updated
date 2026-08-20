import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";
import { useBreadcrumbSchema } from "@/hooks/useBreadcrumbSchema";

const Terms = () => {
  useSEO({
    title: "Terms & Conditions — BrightLearn Tutoring",
    description:
      "The terms and conditions covering BrightLearn Tutoring's online KS2, KS3 and GCSE maths tutoring services, fees, cancellations and safeguarding commitments.",
    path: "/terms",
  });
  useBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Terms & Conditions", path: "/terms" },
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
        <h1 className="text-4xl font-semibold text-ink tracking-tight mb-2">Terms &amp; Conditions</h1>
        <p className="text-ink-soft text-sm mb-10">Last updated: April 2026</p>

        <div className="prose prose-sm max-w-none space-y-8 text-ink-soft leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-ink mb-3">1. About these terms</h2>
            <p>
              These terms and conditions apply to all tutoring services provided by BrightLearn Tutoring. By
              booking a session, you agree to these terms. If you have any questions, please contact us at{" "}
              <a href="mailto:info@brightlearntutoring.co.uk" className="text-accent hover:underline">
                info@brightlearntutoring.co.uk
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink mb-3">2. Services</h2>
            <p>
              BrightLearn Tutoring provides online small-group maths tutoring for KS2, KS3 and GCSE students. All
              sessions are delivered online via a video platform. Session schedules and topics are agreed between
              the tutor and the parent/guardian.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink mb-3">3. Fees and payment</h2>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>KS2 Maths — £40 per month (4 sessions)</li>
              <li>KS3 Maths — £50 per month (8 sessions)</li>
              <li>GCSE Maths — £60 per month (8 sessions)</li>
            </ul>
            <p className="mt-3">
              Payment is due at the start of each monthly billing period. No card details are required at the
              point of enquiry. Payment instructions will be provided upon confirmation.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink mb-3">4. Cancellation and rescheduling</h2>
            <p>
              We ask for at least 24 hours' notice if you need to cancel or reschedule a session. Sessions
              cancelled with less than 24 hours' notice may be charged at the full rate. We will always
              endeavour to reschedule cancelled sessions where possible.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink mb-3">5. Student conduct and safeguarding</h2>
            <p>
              All sessions are conducted in a safe, respectful and professional environment. BrightLearn
              Tutoring is committed to safeguarding the welfare of all students. The tutor holds a current
              Enhanced DBS check. Sessions are conducted online and may be recorded for safeguarding purposes
              with prior consent.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink mb-3">6. Intellectual property</h2>
            <p>
              All materials, worksheets, notes and resources provided by BrightLearn Tutoring are for the
              personal use of the student only and may not be shared, reproduced or distributed without
              permission.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink mb-3">7. Limitation of liability</h2>
            <p>
              BrightLearn Tutoring does not guarantee specific academic results. We are committed to providing
              high-quality, personalised tutoring, but outcomes depend on factors including the student's effort
              and engagement. Our liability is limited to the fees paid for the relevant sessions.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink mb-3">8. Governing law</h2>
            <p>
              These terms are governed by the laws of England and Wales. Any disputes shall be subject to the
              jurisdiction of the courts of England and Wales.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink mb-3">9. Contact</h2>
            <p>
              For any questions about these terms, please contact:{" "}
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

export default Terms;
