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
        a: "Yes — every new student starts with a free introductory session, so we can understand their current level and how best to help before anything is booked or paid for. After that, 1-on-1 tuition can be booked as a single lesson with no ongoing commitment, or as a monthly plan, and small-group places run as a monthly plan, subject to suitable group availability.",
      },
      {
        q: "What happens in the free introductory session?",
        a: "It's a relaxed, no-pressure session used to get to know your child, understand what they find difficult, and go through some questions to see their current strengths and gaps. Afterwards, we'll recommend the right level and session type for them.",
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
        a: "Small-group tuition (maximum 5 students) is £40/month for KS2 (4 x 1-hour lessons), £90/month for KS3 (8 x 1.5-hour lessons), and £100/month for GCSE (8 x 1.5-hour lessons). 1-on-1 tuition starts from £15 per lesson, or £60–£140/month depending on level.",
        link: { label: "See all pricing options", to: "/enquire" },
      },
      {
        q: "What's the difference between group and 1-on-1 pricing?",
        a: "Group sessions run as a fixed monthly plan shared between up to 5 students, subject to suitable group availability. 1-on-1 sessions can be booked as a single lesson or a monthly plan, and are scheduled flexibly around your own availability.",
      },
      {
        q: "Are there any contracts or long-term commitments?",
        a: "No fixed-term contract. Tuition runs month to month — or as single 1-on-1 lessons with no commitment at all — and you can stop at any time by simply not booking the following month.",
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
        a: "All sessions are currently delivered live online via video call. Lessons run for 1 hour at KS2, and 1.5 hours at KS3 and GCSE, for both group and 1-on-1.",
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
      {
        q: "What does my child need for an online lesson?",
        a: "Just a pen, paper and a calculator, plus a quiet space with a stable internet connection. Cameras stay on throughout the lesson unless agreed otherwise, and phones are best kept out of the room to avoid distractions.",
      },
    ],
  },
  {
    title: "1-on-1 tutoring",
    faqs: [
      {
        q: "Do you offer 1-on-1 tutoring?",
        a: "Yes. Alongside small-group sessions, we offer 1-on-1 tutoring from £15 per lesson, or £60/month for KS2, £120/month for KS3 and £140/month for GCSE.",
      },
      {
        q: "Can I book a single 1-on-1 lesson without committing to a package?",
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
    title: "Understanding the curriculum",
    faqs: [
      {
        q: "What's the difference between GCSE Maths Foundation and Higher tier?",
        a: "Foundation tier covers grades 1–5 and focuses on core number, ratio, algebra, geometry and statistics content. Higher tier covers grades 4–9, includes most of Foundation's content plus more advanced material, and is generally faster-paced. Schools decide tier based on ongoing assessment.",
        link: { label: "Read our Foundation vs Higher guide", to: "/guides/gcse-maths-foundation-vs-higher" },
      },
      {
        q: "How do GCSE Maths resits work?",
        a: "GCSE Maths is offered twice a year in England — the main Summer series and a November resit series for students who didn't reach a grade 4 the first time. A resit uses the same grading and the same genuine Foundation or Higher tier papers, marked to the same standard.",
        link: { label: "Read our full resit guide", to: "/guides/gcse-maths-resit-guide" },
      },
      {
        q: "When should my child start maths tutoring?",
        a: "There's no single right time — some families start as soon as they notice a topic causing real difficulty, others begin a term or two ahead of SATs or GCSE exams for more structured preparation. Get in touch and we'll give you an honest read on what's realistic for your child's situation.",
      },
    ],
  },
  {
    title: "Cancellations & payment",
    faqs: [
      {
        q: "Can I cancel at any time?",
        a: "Yes. Tuition runs month to month with no fixed-term contract, so you can stop at any time by simply not booking the following month.",
      },
      {
        q: "What's your cancellation policy for individual sessions?",
        a: "We ask for at least 24 hours' notice to cancel or reschedule a session. Sessions cancelled with less than 24 hours' notice may be charged at the full rate, though we'll always try to reschedule where possible.",
        link: { label: "Read our full Terms & Conditions", to: "/terms" },
      },
      {
        q: "When is payment due?",
        a: "Payment is due monthly for group and 1-on-1 plans, or per lesson for 1-on-1 sessions booked individually. Payment instructions are provided once your sessions are confirmed.",
      },
    ],
  },
];

export const homeFaqs: Faq[] = [
  {
    q: "Do you offer a trial or first lesson?",
    a: "Yes — every new student starts with a free introductory session, so we can understand their current level and how best to help before anything is booked or paid for.",
  },
  {
    q: "How much does online maths tutoring cost?",
    a: "BrightLearn small-group tutoring starts from £40/month for KS2, £90/month for KS3, and £100/month for GCSE, with no long-term contract.",
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
    a: "Yes. Tuition runs month to month with no fixed-term contract, so you can stop at any time by simply not booking the following month.",
  },
  {
    q: "How are the sessions delivered?",
    a: "All sessions are delivered live online via video call. Group sessions are small — a maximum of 5 students — and lessons run for 1 hour at KS2, and 1.5 hours at KS3 and GCSE.",
  },
  {
    q: "Do you offer 1-on-1 tutoring?",
    a: "Yes. Alongside our small-group sessions, we offer 1-on-1 tutoring from £15 per lesson, or £60/month for KS2, £120/month for KS3 and £140/month for GCSE. 1-on-1 sessions are scheduled around your own availability rather than a fixed timetable.",
  },
  {
    q: "Are you only for families in North London?",
    a: "No. BrightLearn Tutoring is based in North London — Enfield, Edmonton, Tottenham and Haringey — but because every session is delivered live online, we work with families right across the UK. There's nothing to commute to.",
    link: { label: "See the areas we cover", to: "/online-maths-tutor" },
  },
];
