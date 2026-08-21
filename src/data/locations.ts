export type Nation = "England" | "Wales" | "Northern Ireland";

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
      "Affordable, personalised online maths tutoring for Enfield students — SATs & KS2 preparation, KS3 mathematics and GCSE Foundation & Higher tier, in small groups or 1-on-1.",
    intro:
      "BrightLearn Tutoring is based right here in Enfield, running small-group and 1-on-1 online maths lessons for local primary and secondary students. Sessions are tailored to how each child actually learns, so a student gets the same personal attention as private tuition without the cost of an individual tutor.",
    localContext: {
      heading: "Supporting Enfield's schools, SATs through to GCSE",
      body: [
        "Enfield's schools are almost entirely comprehensive, so the maths that matters here is steady, well-taught progress rather than prepping for a single entrance exam — solid number skills through KS2, a firm grip on algebra and ratio by KS3, and exam-ready technique for GCSE Foundation or Higher tier.",
        "Our groups stay small on purpose, so a tutor can actually see where a student is stuck and adjust the pace, rather than moving on regardless. For students who need more focused support, we also offer 1-on-1 sessions.",
      ],
    },
    examBoards: ["AQA", "Edexcel", "OCR"],
    faqs: [
      {
        q: "Do you tutor students in Enfield in person or online?",
        a: "All BrightLearn sessions are delivered live online, though we're based locally in Enfield. That keeps the personal, small-group feel of in-person tutoring without the travel time for you or your child.",
      },
      {
        q: "What age groups do you cover?",
        a: "We tutor primary students preparing for SATs and KS2 maths, KS3 students building core mathematical fluency, and GCSE students working towards Foundation or Higher tier, across AQA, Edexcel and OCR.",
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
      "Personalised online maths tutoring for Edmonton students — SATs & KS2 preparation, KS3 mathematics and GCSE Foundation & Higher tier maths, small-group or 1-on-1.",
    intro:
      "Families in Edmonton use BrightLearn for straightforward, affordable maths support — SATs preparation, KS3 fundamentals, and GCSE revision — delivered live online in small groups or 1-on-1, built around each student's own pace rather than a one-size-fits-all class.",
    localContext: {
      heading: "Steady maths progress for Edmonton's students",
      body: [
        "Like the rest of the borough, Edmonton's secondary schools are comprehensive, so what helps most isn't cramming for a selective exam — it's catching gaps early and building genuine confidence with numbers over time.",
        "Every session ends with a quick recap and parents get progress notes afterwards, so an Edmonton parent always has a clear, current picture of where their child stands — not just a grade at the end of term.",
      ],
    },
    examBoards: ["AQA", "Edexcel", "OCR"],
    faqs: [
      {
        q: "Is tutoring in Edmonton done in person?",
        a: "No — every session is live online, though BrightLearn is based locally in the Enfield/Edmonton area. You get the same personal, face-to-face teaching as an in-person tutor without needing to travel anywhere.",
      },
      {
        q: "Can I choose between group and 1-on-1 sessions?",
        a: "Yes. We offer both small-group and 1-on-1 tutoring, so you can pick whichever fits your child's needs and confidence level best.",
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
      "Affordable online maths tutoring for Tottenham students — SATs & KS2 preparation, KS3 mathematics and GCSE Foundation & Higher tier, small-group or 1-on-1 sessions.",
    intro:
      "BrightLearn Tutoring supports primary and secondary students across Tottenham with live online maths lessons — SATs and KS2 preparation, KS3 mathematics, and GCSE Foundation and Higher tier — in small groups or 1-on-1, at a price built for real families.",
    localContext: {
      heading: "Maths support built around Tottenham's comprehensive schools",
      body: [
        "Tottenham's secondary schools are comprehensive, drawing from one of London's most diverse communities, and our approach reflects that: no assumptions about where a student is starting from, just a clear plan based on where they actually are.",
        "We track progress topic by topic rather than waiting for an end-of-term grade, so a gap in fractions or negative numbers gets caught and fixed while it's still small — well before it turns into a GCSE problem.",
      ],
    },
    examBoards: ["AQA", "Edexcel", "OCR"],
    faqs: [
      {
        q: "Do you offer in-person tutoring in Tottenham?",
        a: "Our sessions are all delivered live online rather than in person, which keeps costs down and means there's no commute — but BrightLearn is based locally, so we understand the schools and curriculum Tottenham families are working with.",
      },
      {
        q: "How is the tutoring personalised for each student?",
        a: "Every student gets a learning plan tailored to their own goals and learning style, whether that's building basic confidence, closing a specific gap, or pushing for a higher GCSE grade.",
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
      "Affordable, personalised online maths tutoring for Haringey students — SATs & KS2 preparation, KS3 mathematics and GCSE Foundation & Higher tier, small-group or 1-on-1.",
    intro:
      "BrightLearn Tutoring works with primary and secondary students across Haringey — from Wood Green to Muswell Hill to Tottenham — offering small-group and 1-on-1 online maths lessons built around each student's own pace, covering SATs, KS3 and GCSE.",
    localContext: {
      heading: "Consistent maths support across a large, diverse borough",
      body: [
        "Haringey covers a wide mix of schools and communities, and one thing that's consistent across all of them is that maths confidence usually comes from steady, well-structured practice rather than any one quick fix.",
        "Our small-group format means a tutor can genuinely get to know how each Haringey student thinks through a problem, not just whether they got the right answer — which is what actually moves a student from Foundation-level uncertainty to Higher-tier confidence.",
      ],
    },
    examBoards: ["AQA", "Edexcel", "OCR"],
    faqs: [
      {
        q: "What areas of Haringey do you cover?",
        a: "Because every session is delivered live online, we support students right across the borough — Tottenham, Wood Green, Muswell Hill, Crouch End and everywhere in between.",
      },
      {
        q: "What does a typical GCSE session cover?",
        a: "GCSE sessions combine topic teaching with real past paper practice under timed conditions, covering both Foundation and Higher tier across AQA, Edexcel and OCR.",
      },
    ],
  },
];

export const findLocation = (slug: string) => locations.find((l) => l.slug === slug);
