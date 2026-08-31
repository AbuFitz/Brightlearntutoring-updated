import type { Package } from "@/contexts/GetStartedContext";
import type { SessionType } from "@/data/pricing";

export interface TopicFaq {
  q: string;
  a: string;
}

export interface TopicInfo {
  slug: string;
  /** Short label used in nav/footer links */
  navLabel: string;
  /** SEO <title> — kept short, unique and search-intent focused. */
  metaTitle: string;
  eyebrow: string;
  h1: string;
  h1Accent: string;
  metaDescription: string;
  /** One-line search-intent framing shown under the H1 */
  tagline: string;
  /** The parent problem/concern this page speaks to, shown as a short list */
  painPoints: string[];
  /** 2-3 intro paragraphs */
  intro: string[];
  whoFor: string[];
  whatWeCover: string[];
  /** Which pricing tier(s) this topic maps to */
  relevantTiers: Exclude<Package, "">[];
  defaultSessionType: SessionType;
  /** Pre-selects the matching answer on the enquiry form's "what support" step, where unambiguous. */
  defaultSupportType?: string;
  faqs: TopicFaq[];
  relatedSlugs: string[];
}

export const topics: TopicInfo[] = [
  {
    slug: "ks2-maths-confidence-sats-preparation",
    navLabel: "KS2 Maths & SATs Prep",
    metaTitle: "Online KS2 Maths Tutor & SATs Prep | BrightLearn",
    eyebrow: "KS2 · Ages 7–11",
    h1: "KS2 maths confidence",
    h1Accent: "and SATs preparation.",
    metaDescription:
      "Build real KS2 maths confidence and get SATs-ready with small-group or 1-on-1 online tutoring. Structured, encouraging 1-hour lessons for Year 5–6 students, from £40/month.",
    tagline: "For parents whose child has gone quiet about maths, or is anxious about SATs.",
    painPoints: [
      "\"They used to enjoy maths, now they say they're bad at it\"",
      "\"SATs are coming up and I don't know what they actually need to know\"",
      "\"Homework turns into a battle every time\"",
    ],
    intro: [
      "Most KS2 maths struggles aren't really about maths — they're about confidence. A child who's fallen a little behind on times tables or fractions starts to believe they're \"just not a maths person,\" and it snowballs from there.",
      "Our KS2 sessions are built to break that cycle: small, encouraging groups (or 1-on-1 if your child needs more individual attention), clear explanations with no assumed knowledge, and steady SATs preparation that builds up gradually rather than cramming at the last minute.",
    ],
    whoFor: [
      "Year 5 or Year 6 students preparing for SATs",
      "Children who've lost confidence in maths, even if they're not \"behind\"",
      "Families who want structured, regular support rather than one-off cramming",
    ],
    whatWeCover: [
      "Times tables fluency and mental maths",
      "Fractions, decimals and percentages",
      "Arithmetic and reasoning paper technique",
      "Word problems and multi-step reasoning",
      "Full SATs-style practice under timed conditions",
    ],
    relevantTiers: ["KS2"],
    defaultSessionType: "group",
    defaultSupportType: "SATs Preparation",
    faqs: [
      {
        q: "My child says they're \"just bad at maths\" — can tutoring actually help with confidence, not just grades?",
        a: "Yes — this is exactly what our KS2 sessions are built around. We keep groups small (maximum 5 students) specifically so a tutor can notice where a child is quietly stuck and build them back up gradually, rather than just moving through a syllabus. Most of the SATs improvement follows once the confidence comes back.",
      },
      {
        q: "When should we start SATs preparation?",
        a: "Ideally by the start of Year 6, but it's rarely too late — steady, regular sessions in the months before SATs make a bigger difference than last-minute cramming. Get in touch and we'll tell you honestly what's realistic for your timeline.",
      },
      {
        q: "Is KS2 tutoring 1-on-1 or group?",
        a: "Both are available. Most families choose small-group (maximum 5 students, £40/month) for the social, confidence-building environment, and switch to 1-on-1 (from £15 per lesson) if their child needs more individual attention on specific gaps.",
      },
    ],
    relatedSlugs: ["year-7-9-maths-support", "online-one-to-one-maths-tutoring"],
  },
  {
    slug: "year-7-9-maths-support",
    navLabel: "Year 7–9 Maths Support",
    metaTitle: "Online KS3 Maths Tutor | Years 7-9 | BrightLearn",
    eyebrow: "KS3 · Ages 11–14",
    h1: "Year 7–9 maths support",
    h1Accent: "that builds towards GCSE.",
    metaDescription:
      "Targeted KS3 maths tutoring for Year 7, 8 and 9 students — closing gaps in algebra, ratio and geometry before they turn into GCSE problems. Small-group or 1-on-1, from £90/month.",
    tagline: "For parents who can see the gap widening before GCSE even starts.",
    painPoints: [
      "\"They coasted through Year 7 and now Year 9 maths feels like a different language\"",
      "\"I don't know if they're actually on track for GCSE\"",
      "\"School moves on to the next topic whether or not they've understood the last one\"",
    ],
    intro: [
      "KS3 is where small gaps quietly become big ones. A shaky grasp of negative numbers or fractions in Year 7 makes algebra harder in Year 8, which makes GCSE topics harder still — but because none of it is exam-stakes yet, it's easy for a struggling student to fly under the radar until Year 10.",
      "Our Year 7–9 sessions are built to catch that early: identifying exactly where the gaps are, working through them properly rather than rushing to the next topic, and building the algebra, ratio and geometry foundations that GCSE maths is built on.",
    ],
    whoFor: [
      "Year 7, 8 or 9 students who feel like they're falling behind",
      "Students who are \"fine\" at school but not confident enough to be independent",
      "Parents who want an honest read on whether their child is on track for GCSE",
    ],
    whatWeCover: [
      "Algebra — expanding, factorising, solving equations",
      "Ratio, proportion and percentages",
      "Geometry and angle facts",
      "Negative numbers, fractions and standard form",
      "Building the study habits GCSE maths will demand",
    ],
    relevantTiers: ["KS3"],
    defaultSessionType: "group",
    defaultSupportType: "KS3 Maths",
    faqs: [
      {
        q: "How do I know if my child needs KS3 tutoring or if they're just finding it hard like everyone else?",
        a: "A quick, honest way to check: can they explain what they're currently learning back to you in their own words? If not, it's usually worth a session or two to see where the actual gap is — we're happy to have that conversation before you commit to anything.",
      },
      {
        q: "Does KS3 tutoring follow the school curriculum?",
        a: "We work around what your child's school is currently teaching where possible, while also making sure genuine gaps from earlier years get closed — because those are usually what's actually holding a student back, not the current topic.",
      },
      {
        q: "What exam boards does this prepare them for at GCSE?",
        a: "KS3 maths builds the foundation for both major GCSE boards — AQA and Pearson Edexcel — so nothing here is board-specific yet. Once your child starts their GCSE course we tailor sessions to their exact board.",
      },
    ],
    relatedSlugs: ["gcse-maths-foundation-tutor", "gcse-maths-higher-tutor"],
  },
  {
    slug: "gcse-maths-foundation-tutor",
    navLabel: "GCSE Maths Foundation",
    metaTitle: "GCSE Foundation Maths Tutor Online | BrightLearn",
    eyebrow: "GCSE · Foundation Tier",
    h1: "GCSE Maths Foundation",
    h1Accent: "tutoring that builds real grades.",
    metaDescription:
      "Online GCSE Maths Foundation tuition covering AQA and Pearson Edexcel — built to secure a genuine, confident grade 4 or 5, not just cram past papers. Small-group or 1-on-1.",
    tagline: "For parents whose child is on Foundation tier and needs it to actually click.",
    painPoints: [
      "\"They're on Foundation and I don't know if that's the right call or how to help\"",
      "\"Past papers alone aren't helping — they need it explained differently\"",
      "\"We want a solid pass, not just to scrape through\"",
    ],
    intro: [
      "Foundation tier GCSE maths caps at a grade 5, but that doesn't mean it's a lesser exam to prepare for — a confident, well-taught Foundation grade opens doors that a scraped-through attempt doesn't. Our Foundation sessions focus on genuinely understanding the core topics, not just memorising past-paper answers.",
      "We work across AQA and Pearson Edexcel, matching lessons to your child's actual exam board and the topics they'll be tested on, with regular past paper practice under timed conditions as the exam gets closer.",
    ],
    whoFor: [
      "Students sitting GCSE Maths Foundation tier",
      "Students aiming for a confident grade 4 or 5, not just a pass",
      "Anyone who's tried past papers alone and found it isn't enough",
    ],
    whatWeCover: [
      "Number, ratio and percentages",
      "Algebra fundamentals and graphs",
      "Geometry, measures and probability",
      "Exam technique and common mistake patterns",
      "Timed past paper practice, marked and reviewed",
    ],
    relevantTiers: ["GCSE"],
    defaultSessionType: "group",
    defaultSupportType: "GCSE Maths Foundation",
    faqs: [
      {
        q: "How do we know if Foundation or Higher tier is right for my child?",
        a: "This is ultimately a decision made with the school, based on ongoing assessment — but if you're unsure or want a second opinion, we're happy to look at recent test results with you and give an honest read on which tier gives your child the best realistic outcome.",
      },
      {
        q: "What exam boards do you cover for GCSE Foundation?",
        a: "AQA and Pearson Edexcel — the two exam boards we cover. Let us know your child's board when you enquire and we'll tailor sessions accordingly.",
      },
      {
        q: "How close to the exam should we start?",
        a: "The earlier the better, but we work with students at every stage — from a full academic year out to focused last-months revision. Regular sessions over time generally beat late cramming, but we'll be honest about what's realistic for your timeframe.",
      },
    ],
    relatedSlugs: ["gcse-maths-higher-tutor", "gcse-maths-resit-tuition", "small-group-gcse-maths-revision"],
  },
  {
    slug: "gcse-maths-higher-tutor",
    navLabel: "GCSE Maths Higher",
    metaTitle: "GCSE Higher Maths Tutor Online | BrightLearn",
    eyebrow: "GCSE · Higher Tier",
    h1: "GCSE Maths Higher",
    h1Accent: "tuition for a genuine top grade.",
    metaDescription:
      "Online GCSE Maths Higher tuition covering AQA and Pearson Edexcel — targeted at grades 6–9, with past paper practice and exam technique. Small-group or 1-on-1 from £100/month.",
    tagline: "For parents whose child is capable of a top grade but needs it pushed further.",
    painPoints: [
      "\"They're capable of a 7, 8 or 9 but school alone isn't getting them there\"",
      "\"They understand the topics but lose marks on exam technique\"",
      "\"We need someone who can actually stretch them, not just repeat the lesson\"",
    ],
    intro: [
      "Higher tier GCSE maths rewards depth, not just coverage — students who can genuinely reason through a problem, not just recognise a pattern from a past paper. Our Higher tier sessions push into that depth, working on the harder algebra, trigonometry and problem-solving questions that separate a grade 6 from a grade 8 or 9.",
      "We work across AQA and Pearson Edexcel, with a strong focus on exam technique — because a huge number of marks lost at Higher tier come from misreading a question or rushing working, not from not knowing the maths.",
    ],
    whoFor: [
      "Students sitting GCSE Maths Higher tier",
      "Students targeting grades 6–9",
      "Students who understand topics individually but drop marks under exam conditions",
    ],
    whatWeCover: [
      "Advanced algebra, functions and graphs",
      "Trigonometry and geometric proof",
      "Multi-step problem solving and reasoning questions",
      "Statistics and probability at Higher tier depth",
      "Full past paper practice with detailed mark-scheme review",
    ],
    relevantTiers: ["GCSE"],
    defaultSessionType: "group",
    defaultSupportType: "GCSE Maths Higher",
    faqs: [
      {
        q: "My child understands the topics but still loses marks — can tutoring help with that?",
        a: "Yes — this is one of the most common things we see at Higher tier. It's usually exam technique, not maths ability: misreading what a question is actually asking, rushing working, or running out of time. We spend real session time on this, not just re-teaching content they already know.",
      },
      {
        q: "Can sessions target specific weak topics rather than starting from the beginning?",
        a: "Yes. For Higher tier students especially, we usually start with a quick diagnostic conversation about recent test results or mock papers, then focus sessions on the specific topics costing the most marks.",
      },
      {
        q: "Do you offer past papers and mock exam support?",
        a: "Yes — timed past paper practice under exam conditions, followed by detailed mark-scheme review, is a core part of Higher tier sessions as the exam approaches.",
      },
    ],
    relatedSlugs: ["gcse-maths-foundation-tutor", "small-group-gcse-maths-revision", "online-one-to-one-maths-tutoring"],
  },
  {
    slug: "gcse-maths-resit-tuition",
    navLabel: "GCSE Maths Resit",
    metaTitle: "GCSE Maths Resit Tutor Online | BrightLearn",
    eyebrow: "GCSE Resit",
    h1: "GCSE Maths resit tuition",
    h1Accent: "without repeating the same lessons.",
    metaDescription:
      "Focused GCSE Maths resit tuition for students retaking the exam — targeting exactly what went wrong last time, not repeating a full year of lessons. Small-group or 1-on-1.",
    tagline: "For students (and often sixth-form or college students) retaking GCSE Maths.",
    painPoints: [
      "\"They already sat through a full year of this once — going through it all again isn't going to work\"",
      "\"They're demoralised after not getting the grade\"",
      "\"They need this grade for college/sixth form and time is tight\"",
    ],
    intro: [
      "Resitting GCSE Maths is a different situation from sitting it the first time — the student has already covered the syllabus, often knows more than they think, and doesn't need to be taught from scratch. What actually helps is identifying exactly what went wrong last time and fixing it directly.",
      "Our resit sessions start with an honest look at where marks were lost, then focus tightly on those gaps and on exam technique, with plenty of past paper practice to rebuild confidence under timed conditions before the next sitting.",
    ],
    whoFor: [
      "Students retaking GCSE Maths, including in sixth form or college",
      "Students who need the grade for a course, apprenticeship or job requirement",
      "Anyone who found the standard classroom approach didn't work for them the first time",
    ],
    whatWeCover: [
      "Diagnosing exactly where marks were lost last time",
      "Targeted revision of weak topics, not the full syllabus",
      "Exam technique and time management under pressure",
      "Confidence rebuilding after a difficult result",
      "Regular timed past paper practice",
    ],
    relevantTiers: ["GCSE"],
    defaultSessionType: "1on1",
    defaultSupportType: "GCSE Maths Resit",
    faqs: [
      {
        q: "Will resit tutoring just repeat everything we already did at school?",
        a: "No — that's specifically what we avoid. Resit sessions start by looking at where marks were actually lost, then focus tightly on those gaps and on exam technique, rather than re-teaching the whole syllabus from the start.",
      },
      {
        q: "Is resit tutoring 1-on-1 or group?",
        a: "We usually recommend 1-on-1 for resits, since every student's gaps are different and the timeline is often tighter — but small-group sessions are available too if that suits your child better.",
      },
      {
        q: "My child needs this grade for college or an apprenticeship — how quickly can we start?",
        a: "Get in touch and tell us your resit date — we'll be straightforward about what's realistically achievable in the time available and build a focused plan around it.",
      },
    ],
    relatedSlugs: ["online-one-to-one-maths-tutoring", "gcse-maths-foundation-tutor", "gcse-maths-higher-tutor"],
  },
  {
    slug: "online-one-to-one-maths-tutoring",
    navLabel: "Online 1-on-1 Tutoring",
    metaTitle: "1-to-1 Online Maths Tutoring | BrightLearn",
    eyebrow: "1-on-1 · KS2, KS3 & GCSE",
    h1: "Online one-to-one",
    h1Accent: "maths tutoring.",
    metaDescription:
      "Fully personalised 1-on-1 online maths tutoring for KS2, KS3 and GCSE students. Single lessons from £15, or monthly plans from £60. Flexible scheduling.",
    tagline: "For families who want fully individual attention, not a shared timetable.",
    painPoints: [
      "\"They need more individual attention than a group can give\"",
      "\"Group timetables never fit around our schedule\"",
      "\"We want to try one lesson before committing to anything ongoing\"",
    ],
    intro: [
      "Some students learn best with someone's full attention — no waiting their turn, no pace set by the rest of a group, and lessons that can go exactly where they're needed that week. That's what 1-on-1 tutoring is built for.",
      "1-on-1 sessions are scheduled around your own availability rather than a fixed group timetable, and you can start with a single lesson to see if it's the right fit before committing to a monthly plan.",
    ],
    whoFor: [
      "Students who need more individual attention than group sessions give",
      "Families whose schedule doesn't fit fixed group time slots",
      "Anyone who wants to try a single lesson before committing further",
    ],
    whatWeCover: [
      "A fully personalised plan built around your child's specific gaps",
      "KS2 SATs preparation, KS3 fundamentals, or GCSE Foundation/Higher",
      "Flexible scheduling around your family's availability",
      "Single lessons from £15, or monthly plans from £60",
      "Parent progress reports after every block of sessions",
    ],
    relevantTiers: ["KS2", "KS3", "GCSE"],
    defaultSessionType: "1on1",
    faqs: [
      {
        q: "Can we book a single 1-on-1 lesson without committing to a monthly plan?",
        a: "Yes. Single lessons are available from £15 (KS2 and KS3) or £17.50 (GCSE), so you can try tutoring before committing to a monthly plan.",
      },
      {
        q: "How is 1-on-1 pricing different from group pricing?",
        a: "Group sessions run as a fixed monthly plan with a set timetable (maximum 5 students), subject to suitable group availability. 1-on-1 sessions can be booked as a single lesson or a monthly plan, and are scheduled flexibly around your own availability rather than a fixed group slot.",
      },
      {
        q: "Is 1-on-1 available for all age groups?",
        a: "Yes — 1-on-1 tutoring is available for KS2 SATs preparation, KS3 maths, and GCSE Foundation or Higher tier.",
      },
    ],
    relatedSlugs: ["gcse-maths-resit-tuition", "ks2-maths-confidence-sats-preparation", "year-7-9-maths-support"],
  },
  {
    slug: "small-group-gcse-maths-revision",
    navLabel: "Small-Group GCSE Revision",
    metaTitle: "Small Group GCSE Maths Revision | BrightLearn",
    eyebrow: "GCSE · Small Group",
    h1: "Small-group GCSE",
    h1Accent: "maths revision.",
    metaDescription:
      "Small-group GCSE Maths revision sessions, maximum 5 students, covering AQA and Pearson Edexcel with past paper practice. From £100/month.",
    tagline: "For students who focus better — and learn from each other — in a small group.",
    painPoints: [
      "\"1-on-1 feels intense — they'd rather learn alongside other students\"",
      "\"They need structure and a routine, not just occasional help\"",
      "\"We want a group that's actually small enough to get noticed in\"",
    ],
    intro: [
      "Not every student wants — or needs — 1-on-1 attention. A lot of students actually focus better and learn more in a small group, hearing other students' questions and mistakes as well as their own, and benefiting from the routine of a regular, structured session.",
      "Our GCSE revision groups are capped at 5 students specifically so it never turns into a lecture — a tutor can still see where each individual student is stuck, while the group format keeps sessions structured, social and consistent.",
    ],
    whoFor: [
      "GCSE students who focus and learn well alongside others",
      "Students who benefit from routine and a fixed weekly structure",
      "Families who want a genuinely small group, not a large revision class",
    ],
    whatWeCover: [
      "Core GCSE topics across AQA and Pearson Edexcel",
      "Foundation and Higher tier content, grouped by level",
      "Regular past paper sessions under timed conditions",
      "Mock exam support in the run-up to exams",
      "End-of-topic and end-of-term assessments with parent reports",
    ],
    relevantTiers: ["GCSE"],
    defaultSessionType: "group",
    faqs: [
      {
        q: "How small is \"small group\" actually?",
        a: "A maximum of 5 students per group — small enough that a tutor genuinely knows where each student is stuck, not just a smaller version of a school class.",
      },
      {
        q: "Are groups split by tier (Foundation/Higher) or ability?",
        a: "Yes, groups are organised so students are working at a similar level, so sessions can go at a pace that actually suits everyone in the group rather than a lowest-common-denominator pace.",
      },
      {
        q: "What's included in a small-group GCSE plan?",
        a: "£100/month covers 8 x 1.5-hour sessions, including a custom learning plan, parent reports and past paper practice as exams approach.",
      },
    ],
    relatedSlugs: ["gcse-maths-foundation-tutor", "gcse-maths-higher-tutor", "gcse-maths-resit-tuition"],
  },
];

export const findTopic = (slug: string) => topics.find((t) => t.slug === slug);
