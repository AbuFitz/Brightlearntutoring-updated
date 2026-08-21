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
        link: { label: "Get started now", to: "/enquire" },
      },
      {
        q: "Do you offer a trial or first lesson?",
        a: "1-on-1 tuition can be booked as a single lesson with no ongoing commitment, which is a good way to try tutoring before deciding on a monthly plan. Group places run on a monthly basis.",
      },
      {
        q: "What age groups and subjects do you tutor?",
        a: "We tutor maths only, for KS2 (SATs preparation, Years 5–6), KS3 (Years 7–9) and GCSE (Foundation and Higher tier, Years 10–11).",
      },
    ],
  },
  {
    title: "Pricing & plans",
    faqs: [
      {
        q: "How much does tutoring cost?",
        a: "Small-group tuition (maximum 5 students) is £40/month for KS2 (4 sessions), £90/month for KS3 (8 sessions) and £100/month for GCSE (8 sessions). 1-on-1 tuition starts from £25 per lesson, or £80–£120/month depending on level.",
        link: { label: "See all pricing options", to: "/enquire" },
      },
      {
        q: "What's the difference between group and 1-on-1 pricing?",
        a: "Group sessions run on a fixed monthly plan with a set timetable, shared between up to 5 students. 1-on-1 sessions can be booked as a single lesson or a monthly plan, and are scheduled flexibly around your own availability.",
      },
      {
        q: "Are there any contracts or long-term commitments?",
        a: "No. All plans are monthly, and you can cancel at any time with no long-term contract.",
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
        a: "All sessions are currently delivered live online via video call. KS2 group sessions run 1 hour, and KS3/GCSE group sessions run 1.5 hours. 1-on-1 sessions run 1 hour.",
      },
      {
        q: "How big are group sessions?",
        a: "Small groups are capped at a maximum of 5 students, so a tutor can genuinely notice where each student is stuck rather than teaching to the middle of a large class.",
      },
      {
        q: "What exam boards do you cover?",
        a: "We cover all major exam boards used across England, Wales and Northern Ireland, including AQA, Edexcel (Pearson), OCR and WJEC/Eduqas.",
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
        a: "Yes. Alongside small-group sessions, we offer 1-on-1 tutoring from £25 per lesson, or £80/month for KS2, £100/month for KS3 and £120/month for GCSE (4 lessons a month).",
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
        a: "Yes. There are no contracts or long-term commitments — you can cancel your tutoring plan at any time.",
      },
      {
        q: "What's your cancellation policy for individual sessions?",
        a: "We ask for at least 24 hours' notice to cancel or reschedule a session. Sessions cancelled with less than 24 hours' notice may be charged at the full rate, though we'll always try to reschedule where possible.",
        link: { label: "Read our full Terms & Conditions", to: "/terms" },
      },
      {
        q: "When is payment due?",
        a: "Payment is due at the start of each monthly billing period, or per lesson for 1-on-1 sessions booked individually. Payment instructions are provided once your sessions are confirmed.",
      },
    ],
  },
];

export const homeFaqs: Faq[] = [
  {
    q: "How much does online maths tutoring cost?",
    a: "BrightLearn tutoring starts from £40/month for KS2, £90/month for KS3, and £100/month for GCSE. KS2 includes 4 sessions per month, and KS3/GCSE include 8 sessions per month, with no contracts.",
  },
  {
    q: "Is the tutor DBS checked?",
    a: "Yes. Our tutor is fully DBS-checked and verified to work with children.",
  },
  {
    q: "What exam boards do you cover for GCSE maths?",
    a: "We cover all major exam boards used in England, Wales and Northern Ireland, including AQA, Edexcel (Pearson), OCR and WJEC/Eduqas.",
  },
  {
    q: "Can I cancel at any time?",
    a: "Yes. There are no contracts or long-term commitments. You can cancel your tutoring plan at any time.",
  },
  {
    q: "How are the sessions delivered?",
    a: "All sessions are delivered live online via video call. Group sessions are small — a maximum of 5 students — with KS2 sessions running 1 hour and KS3/GCSE sessions 1.5 hours.",
  },
  {
    q: "Do you offer 1-on-1 tutoring?",
    a: "Yes. Alongside our small-group sessions, we offer 1-on-1 tutoring from £25 per lesson, or £80/month for KS2, £100/month for KS3 and £120/month for GCSE (4 lessons a month). 1-on-1 sessions are scheduled around your own availability rather than a fixed timetable.",
  },
  {
    q: "Are you only for families in North London?",
    a: "No. BrightLearn Tutoring is based in North London — Enfield, Edmonton, Tottenham and Haringey — but because every session is delivered live online, we work with families right across the UK. There's nothing to commute to.",
    link: { label: "See the areas we cover", to: "/online-maths-tutor" },
  },
];
