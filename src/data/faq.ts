export interface Faq {
  q: string;
  a: string;
  /** Optional link appended after the plain-text answer in the visible UI (schema.org text stays plain). */
  link?: { label: string; to: string };
}

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
    a: "All sessions are delivered live online in small groups via video call. KS2 sessions are 1 hour, and KS3/GCSE sessions are 1.5 hours.",
  },
  {
    q: "Are you only for families in North London?",
    a: "No. BrightLearn Tutoring is based in North London — Enfield, Edmonton, Tottenham and Haringey — but because every session is delivered live online, we work with families right across the UK. There's nothing to commute to.",
    link: { label: "See the areas we cover", to: "/online-maths-tutor" },
  },
];
