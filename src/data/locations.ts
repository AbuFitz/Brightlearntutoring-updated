export type Nation = "England";

export interface LocationFaq {
  q: string;
  a: string;
}

export interface LocationInfo {
  slug: string;
  city: string;
  nation: Nation;
  region: string;
  /** Short line used on the hub page card and breadcrumbs */
  tagline: string;
  metaDescription: string;
  /** 2-3 sentence intro unique to this area, used as the page's opening copy */
  intro: string;
  /** Genuine, area-specific context — not filler */
  localContext: {
    heading: string;
    body: string[];
  };
  examBoards: string[];
  faqs: LocationFaq[];
}

export const locations: LocationInfo[] = [
  {
    slug: "enfield",
    city: "Enfield",
    nation: "England",
    region: "London Borough of Enfield",
    tagline: "SATs, KS3 and GCSE maths tutoring for Enfield families",
    metaDescription:
      "Affordable, personalised online maths tutoring for Enfield students — SATs, KS2, KS3 and GCSE Foundation & Higher tier, in small groups or 1-on-1.",
    intro:
      "We're based in Enfield, and most of our small-group and 1-on-1 online maths lessons go to families right here in the borough. Sessions are built around how a particular child learns, so a student gets the individual attention of private tuition without the cost of hiring an individual tutor.",
    localContext: {
      heading: "Supporting Enfield's schools, SATs through to GCSE",
      body: [
        "Enfield's secondary schools are comprehensive. What tends to help most here isn't cramming for one entrance exam, but building steadily: solid number skills through KS2, a firm grip on algebra and ratio by KS3, then exam-ready technique for GCSE Foundation or Higher tier.",
        "Groups are kept small on purpose. A tutor working with five students, not thirty, can actually notice who's stuck and slow down for them rather than moving on regardless. Students who need more focused attention can book 1-on-1 sessions instead.",
      ],
    },
    examBoards: ["AQA", "Pearson Edexcel"],
    faqs: [
      {
        q: "Do you tutor students in Enfield in person or online?",
        a: "All BrightLearn sessions are delivered live online, though we're based locally in Enfield. That keeps the personal, small-group feel of in-person tutoring without the travel time for you or your child.",
      },
      {
        q: "What age groups do you cover?",
        a: "We tutor primary students preparing for SATs and KS2 maths, KS3 students building core mathematical fluency, and GCSE students working towards Foundation or Higher tier, across AQA and Pearson Edexcel.",
      },
      {
        q: "Do you offer GCSE maths tutoring in Enfield?",
        a: "Yes — GCSE Maths Foundation and Higher tuition is one of our core programmes for Enfield families, whether your child needs steady support building up to their exams or focused resit preparation, all delivered live online.",
      },
    ],
  },
  {
    slug: "edmonton",
    city: "Edmonton",
    nation: "England",
    region: "London Borough of Enfield",
    tagline: "Small-group and 1-on-1 maths tutoring for Edmonton students",
    metaDescription:
      "Personalised online maths tutoring for Edmonton students — SATs, KS2, KS3 and GCSE Foundation & Higher tier maths, small-group or 1-on-1.",
    intro:
      "Edmonton families come to BrightLearn for maths support that's straightforward and doesn't cost a fortune: SATs preparation, KS3 fundamentals and GCSE revision, all live online in a small group or 1-on-1, built around how a particular child learns rather than a fixed class syllabus.",
    localContext: {
      heading: "Steady maths progress for Edmonton's students",
      body: [
        "Edmonton's secondary schools are comprehensive, same as the rest of the borough. The real work isn't cramming for a selective exam. It's catching gaps early and letting confidence with numbers build over months rather than weeks.",
        "Parents get a short progress note after every session, so an Edmonton parent has an up-to-date picture of where their child actually stands, rather than finding out at the end of term.",
      ],
    },
    examBoards: ["AQA", "Pearson Edexcel"],
    faqs: [
      {
        q: "Is tutoring in Edmonton done in person?",
        a: "No — every session is live online, though BrightLearn is based locally in the Enfield/Edmonton area. You get the same personal, face-to-face teaching as an in-person tutor without needing to travel anywhere.",
      },
      {
        q: "Can I choose between group and 1-on-1 sessions?",
        a: "Yes. We offer both small-group and 1-on-1 tutoring, so you can pick whichever fits your child's needs and confidence level best.",
      },
      {
        q: "Is there an affordable maths tutor near Edmonton?",
        a: "Yes — our small-group sessions are built to be an affordable alternative to individual private tuition for Edmonton families, while keeping groups small enough (maximum 5 students) for real, personal attention.",
      },
    ],
  },
  {
    slug: "tottenham",
    city: "Tottenham",
    nation: "England",
    region: "London Borough of Haringey",
    tagline: "GCSE, KS3 and SATs maths tutoring for Tottenham families",
    metaDescription:
      "Affordable online maths tutoring for Tottenham students — SATs, KS2, KS3 and GCSE Foundation & Higher tier, small-group or 1-on-1 sessions.",
    intro:
      "Tottenham has one of London's most diverse school communities, and BrightLearn works with primary and secondary students right across it — SATs and KS2 preparation, KS3 mathematics, and GCSE Foundation and Higher tier — in small groups or 1-on-1, at a price built for real families.",
    localContext: {
      heading: "Maths support built around Tottenham's comprehensive schools",
      body: [
        "We don't assume where a Tottenham student is starting from. A tutor builds the plan from an honest read of where a child actually is, not from what a year group is supposed to already know.",
        "Progress gets tracked topic by topic rather than saved for an end-of-term grade, so a gap in fractions or negative numbers gets caught and fixed while it's still small, long before it turns into a GCSE problem.",
      ],
    },
    examBoards: ["AQA", "Pearson Edexcel"],
    faqs: [
      {
        q: "Do you offer in-person tutoring in Tottenham?",
        a: "Our sessions are all delivered live online rather than in person, which keeps costs down and means there's no commute — but BrightLearn is based locally, so we understand the schools and curriculum Tottenham families are working with.",
      },
      {
        q: "How is the tutoring personalised for each student?",
        a: "Every student gets a learning plan tailored to their own goals and learning style, whether that's building basic confidence, closing a specific gap, or pushing for a higher GCSE grade.",
      },
      {
        q: "Do you offer private 1-on-1 maths tutoring in Tottenham?",
        a: "Yes — alongside small-group sessions, we offer fully private 1-on-1 maths tutoring for Tottenham students who want individual attention focused on their own pace and specific gaps.",
      },
    ],
  },
  {
    slug: "haringey",
    city: "Haringey",
    nation: "England",
    region: "London Borough of Haringey",
    tagline: "Personalised online maths tutoring across Haringey",
    metaDescription:
      "Affordable, personalised online maths tutoring for Haringey students — SATs, KS2, KS3 and GCSE Foundation & Higher tier, small-group or 1-on-1.",
    intro:
      "Haringey is a big, varied borough, stretching from Wood Green to Muswell Hill to Tottenham, and BrightLearn's small-group and 1-on-1 online lessons reach students right across it, covering SATs, KS3 and GCSE at each student's own pace.",
    localContext: {
      heading: "Consistent maths support across a large, diverse borough",
      body: [
        "Schools and communities vary a lot across Haringey, but one thing holds true everywhere: maths confidence comes from steady, well-structured practice, not a single quick fix right before an exam.",
        "Small groups let a tutor see how a student actually thinks through a problem, not just whether the final answer was right. That's usually what moves someone from Foundation-level doubt towards Higher-tier confidence.",
      ],
    },
    examBoards: ["AQA", "Pearson Edexcel"],
    faqs: [
      {
        q: "What areas of Haringey do you cover?",
        a: "Because every session is delivered live online, we support students right across the borough — Tottenham, Wood Green, Muswell Hill, Crouch End and everywhere in between.",
      },
      {
        q: "What does a typical GCSE session cover?",
        a: "GCSE sessions combine topic teaching with real past paper practice under timed conditions, covering both Foundation and Higher tier across AQA and Pearson Edexcel.",
      },
      {
        q: "Is there a maths tutor for GCSE resits near Haringey?",
        a: "Yes — GCSE Maths resit tutoring is one of our core programmes for Haringey students retaking the exam in school, sixth form or college, with sessions focused on exactly where marks were lost last time rather than repeating the full syllabus.",
      },
    ],
  },
];

export const findLocation = (slug: string) => locations.find((l) => l.slug === slug);
