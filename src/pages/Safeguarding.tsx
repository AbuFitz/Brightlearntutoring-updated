import { useEffect } from "react";
import { Link } from "react-router-dom";

const Safeguarding = () => {
  useEffect(() => {
    document.title = "Safeguarding Policy — BrightLearn Tutoring";
    window.scrollTo(0, 0);
  }, []);

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
        <h1 className="text-4xl font-semibold text-ink tracking-tight mb-2">Safeguarding Policy</h1>
        <p className="text-ink-soft text-sm mb-10">Last updated: April 2026</p>

        <div className="space-y-8 text-ink-soft leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-ink mb-3">1. Our commitment</h2>
            <p>
              BrightLearn Tutoring is committed to safeguarding and promoting the welfare of all children and
              young people who use our tutoring services. We believe that every student has the right to learn
              in a safe, supportive and respectful environment. The welfare of the child is our paramount
              concern.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink mb-3">2. DBS checks</h2>
            <p>
              All tutors working with BrightLearn Tutoring hold a current Enhanced Disclosure and Barring
              Service (DBS) check, issued through the UK Disclosure and Barring Service. This covers work with
              children and is renewed in accordance with current guidance.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink mb-3">3. Online session safety</h2>
            <p>
              All tutoring sessions are conducted online via a secure video platform. To maintain a safe
              environment:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Sessions take place in visible, appropriate settings</li>
              <li>
                Parents and guardians of students under 18 are informed of session times and are welcome to be
                present at home during sessions
              </li>
              <li>Sessions may be recorded for safeguarding purposes with prior written consent</li>
              <li>
                No direct communication with students takes place outside of the agreed session platform
                without parental knowledge
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink mb-3">4. Reporting concerns</h2>
            <p>
              If a tutor has any concern about the welfare of a student — including signs of abuse, neglect or
              risk of harm — they are required to:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Document the concern clearly and promptly</li>
              <li>
                Report it to the relevant local authority children's services or contact the NSPCC helpline
                (0808 800 5000)
              </li>
              <li>Not attempt to investigate the concern themselves</li>
            </ul>
            <p className="mt-3">
              Concerns can also be reported directly to us at{" "}
              <a href="mailto:info@brightlearntutoring.co.uk" className="text-accent hover:underline">
                info@brightlearntutoring.co.uk
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink mb-3">5. Data and privacy</h2>
            <p>
              Personal data relating to students is handled strictly in accordance with our{" "}
              <Link to="/privacy" className="text-accent hover:underline">
                Privacy Policy
              </Link>{" "}
              and UK GDPR. Student data is not shared with any third party without explicit parental or
              guardian consent.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink mb-3">6. Parental responsibility</h2>
            <p>
              Parents and guardians are responsible for ensuring their child has a safe space to attend online
              sessions and for notifying BrightLearn Tutoring of any circumstances that may affect the
              student's welfare or wellbeing.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink mb-3">7. Review</h2>
            <p>
              This policy is reviewed annually and updated as required to reflect changes in legislation and
              best practice guidance.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink mb-3">8. Contact</h2>
            <p>
              For any safeguarding concerns or questions about this policy, contact us at:{" "}
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

export default Safeguarding;
