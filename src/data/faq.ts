export interface Faq {
  q: string;
  a: string;
  /** Optional link appended after the plain-text answer in the visible UI (schema.org text stays plain). */
  link?: { label: string; to: string };
}

export const homeFaqs: Faq[] = [
  {
    q: "How much does online maths tutoring cost?",
    a: "BrightLearn tutoring starts from £40/month for KS2, £50/month for KS3, and £60/month for GCSE. KS2 includes 4 sessions per month, and KS3/GCSE include 8 sessions per month, with no contracts.",
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
    a: "All sessions are delivered live online in small groups via video call. KS2 sessions are 1 hour, and KS3/GCSE sessions are 1.5 hours.",
  },
  {
    q: "Do you tutor students outside a specific city?",
    a: "Yes. Because every session is delivered live online, we work with families across England, Wales and Northern Ireland — not just in major cities. There's nothing to commute to.",
    link: { label: "See the areas we cover", to: "/online-maths-tutor" },
  },
  {
    q: "Can you help with 11+ or grammar school entrance maths?",
    a: "Our KS2 programme builds the number fluency and problem-solving skills that underpin 11+ and grammar school entrance papers, including Northern Ireland's transfer test (AQE/PPTC), alongside general SATs preparation.",
  },
];
