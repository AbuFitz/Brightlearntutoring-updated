export interface Faq {
  q: string;
  a: string;
  /** Optional link appended after the plain-text answer in the visible UI (schema.org text stays plain). */
  link?: { label: string; to: string };
}

export interface FaqCategory {
  title: string;
  faqs: Faq[];
}

/** Full, categorised FAQ set for the dedicated /faq page. */
export const faqCategories: FaqCategory[] = [
  {
    title: "Getting started",
    faqs: [
      {
        q: "How do I get started?",
        a: "Fill in our short enquiry form with your child's year group and what they need help with. There's no card details required — we'll get back to you to confirm session times and next steps.",
        link: { label: "Enquire now", to: "/enquire" },
      },
      {
        q: "Do you offer a trial or first lesson?",
        a: "1-on-1 tuition can be booked as a single lesson with no ongoing commitment, which is a good way to try tutoring before deciding on a 4-lesson package. Small-group places run as 4-lesson packages, subject to suitable group availability.",
      },
      {
        q: "What age groups and subjects do you tutor?",
        a: "We tutor maths only, for KS2 (SATs preparation, Years 5–6), KS3 (Years 7–9) and GCSE (Foundation, Higher and resit support, Years 10–11 and beyond) — all following the English curriculum.",
      },
      {
        q: "Do you help with GCSE Maths resits?",
        a: "Yes. GCSE Maths resit tutoring is one of our core programmes, for students retaking the exam in school, sixth form or college. Sessions focus on exactly where marks were lost last time rather than repeating the full syllabus.",
        link: { label: "See our GCSE resit programme", to: "/gcse-maths-resit-tuition" },
      },
    ],
  },
  {
    title: "Pricing & plans",
    faqs: [
      {
        q: "How much does tutoring cost?",
        a: "Small-group tuition (maximum 5 students, 4 x 60-minute lessons) is £40 for KS2, £50 for KS3 and £60 for GCSE. 1-on-1 tuition starts from £25 per lesson, or £80–£120 for a 4-lesson package depending on level.",
        link: { label: "See all pricing options", to: "/enquire" },
      },
      {
        q: "What's the difference between group and 1-on-1 pricing?",
        a: "Group sessions run as a fixed 4-lesson package shared between up to 5 students, subject to suitable group availability. 1-on-1 sessions can be booked as a single lesson or a 4-lesson package, and are scheduled flexibly around your own availability.",
      },
      {
        q: "Are there any contracts or long-term commitments?",
        a: "No. Each package is a one-off booking of 4 lessons (or a single 1-on-1 lesson) — there's no subscription and nothing rolls over automatically.",
      },
      {
        q: "Do I need to enter card details to enquire?",
        a: "No. No card details are required at the point of enquiry — payment instructions are provided once your sessions are confirmed.",
      },
    ],
  },
  {
    title: "Sessions & format",
    faqs: [
      {
        q: "How are sessions delivered?",
        a: "All sessions are currently delivered live online via video call. Every standard lesson — group or 1-on-1, at any level — runs for 60 minutes.",
      },
      {
        q: "How big are group sessions?",
        a: "Small groups are capped at a maximum of 5 students, so a tutor can genuinely notice where each student is stuck rather than teaching to the middle of a large class.",
      },
      {
        q: "What exam boards do you cover?",
        a: "We tutor to the English curriculum and cover both AQA and Pearson Edexcel — the two exam boards most GCSE students in England sit.",
      },
      {
        q: "Is the tutor DBS checked?",
        a: "Yes. Our tutor holds a current Enhanced DBS check and is fully verified to work with children.",
        link: { label: "Read our safeguarding policy", to: "/safeguarding" },
      },
    ],
  },
  {
    title: "1-on-1 tutoring",
    faqs: [
      {
        q: "Do you offer 1-on-1 tutoring?",
        a: "Yes. Alongside small-group sessions, we offer 1-on-1 tutoring from £25 per lesson, or £80 for KS2, £100 for KS3 and £120 for GCSE, each for a 4-lesson package.",
      },
      {
        q: "Can I book a single 1-on-1 lesson without a monthly commitment?",
        a: "Yes — 1-on-1 lessons can be booked individually, which is a good option if you want to try tutoring first or only need occasional, targeted support (for example ahead of a resit or a specific test).",
      },
      {
        q: "How is 1-on-1 scheduled?",
        a: "1-on-1 sessions are arranged flexibly around your own availability rather than a fixed group timetable, so they can fit around school, clubs and other commitments.",
      },
    ],
  },
  {
    title: "Areas we cover",
    faqs: [
      {
        q: "Are you only for families in North London?",
        a: "No. BrightLearn Tutoring is based in North London — Enfield, Edmonton, Tottenham and Haringey — but because every session is delivered live online, we work with families right across the UK.",
        link: { label: "See the areas we cover", to: "/online-maths-tutor" },
      },
      {
        q: "Do you offer in-person tutoring?",
        a: "Not yet — every session is currently delivered live online. In-person tutoring, based out of Enfield, is coming soon.",
      },
      {
        q: "Do I need to be in a specific city to sign up?",
        a: "No — as long as you're in the UK and have a stable internet connection, you can join our online sessions from anywhere.",
      },
    ],
  },
  {
    title: "Safeguarding & trust",
    faqs: [
      {
        q: "What safeguarding measures are in place?",
        a: "Our tutor holds a current Enhanced DBS check, sessions take place in visible, appropriate settings, and may be recorded for safeguarding purposes with prior written consent. Parents are always welcome to be present during sessions.",
        link: { label: "Read our full safeguarding policy", to: "/safeguarding" },
      },
      {
        q: "Who can I contact with a welfare concern?",
        a: "Concerns can be reported directly to us at info@brightlearntutoring.co.uk, or to the NSPCC helpline on 0808 800 5000.",
      },
      {
        q: "How is my child's data handled?",
        a: "Personal data is handled in accordance with our Privacy Policy and UK GDPR, and is never shared with third parties without explicit parental or guardian consent.",
        link: { label: "Read our Privacy Policy", to: "/privacy" },
      },
    ],
  },
  {
    title: "Cancellations & payment",
    faqs: [
      {
        q: "Can I cancel at any time?",
        a: "Yes. Every package is a one-off booking with no ongoing subscription, so there's nothing to cancel beyond simply not booking a further package.",
      },
      {
        q: "What's your cancellation policy for individual sessions?",
        a: "We ask for at least 24 hours' notice to cancel or reschedule a session. Sessions cancelled with less than 24 hours' notice may be charged at the full rate, though we'll always try to reschedule where possible.",
        link: { label: "Read our full Terms & Conditions", to: "/terms" },
      },
      {
        q: "When is payment due?",
        a: "Payment is due when each package is booked, or per lesson for 1-on-1 sessions booked individually. Payment instructions are provided once your sessions are confirmed.",
      },
    ],
  },
];

export const homeFaqs: Faq[] = [
  {
    q: "How much does online maths tutoring cost?",
    a: "BrightLearn small-group tutoring starts from £40 for KS2, £50 for KS3, and £60 for GCSE — each a package of 4 x 60-minute lessons, with no long-term contract.",
  },
  {
    q: "Is the tutor DBS checked?",
    a: "Yes. Our tutor is fully DBS-checked and verified to work with children.",
  },
  {
    q: "What exam boards do you cover for GCSE maths?",
    a: "We tutor to the English curriculum and cover both AQA and Pearson Edexcel — the two exam boards most GCSE students in England sit.",
  },
  {
    q: "Can I cancel at any time?",
    a: "Yes. Every package is a one-off booking with no ongoing subscription, so there's nothing to cancel beyond simply not booking a further package.",
  },
  {
    q: "How are the sessions delivered?",
    a: "All sessions are delivered live online via video call. Group sessions are small — a maximum of 5 students — and every standard lesson, at any level, runs for 60 minutes.",
  },
  {
    q: "Do you offer 1-on-1 tutoring?",
    a: "Yes. Alongside our small-group sessions, we offer 1-on-1 tutoring from £25 per lesson, or £80 for KS2, £100 for KS3 and £120 for GCSE, each for a 4-lesson package. 1-on-1 sessions are scheduled around your own availability rather than a fixed timetable.",
  },
  {
    q: "Are you only for families in North London?",
    a: "No. BrightLearn Tutoring is based in North London — Enfield, Edmonton, Tottenham and Haringey — but because every session is delivered live online, we work with families right across the UK. There's nothing to commute to.",
    link: { label: "See the areas we cover", to: "/online-maths-tutor" },
  },
];
