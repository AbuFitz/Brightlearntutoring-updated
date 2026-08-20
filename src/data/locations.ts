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
  /** 2-3 sentence intro unique to this city, used as the page's opening copy */
  intro: string;
  /** Genuine, city-specific education-system context — not filler */
  localContext: {
    heading: string;
    body: string[];
  };
  examBoards: string[];
  faqs: LocationFaq[];
}

export const locations: LocationInfo[] = [
  {
    slug: "london",
    city: "London",
    nation: "England",
    region: "Greater London",
    tagline: "11+ prep and GCSE support for families across every London borough",
    metaDescription:
      "Online group maths tutoring for KS2, KS3 and GCSE students in London. Builds the number fluency 11+ entrance exams demand, without the commute or premium in-person rates.",
    intro:
      "London's school admissions are some of the most competitive in the country, and for a lot of families that pressure shows up in maths first. We run live, small-group online lessons for London students working towards 11+ entry, SATs or GCSEs — the same exam-focused teaching a private tutor offers, minus the £60-an-hour rate and the trip across town.",
    localContext: {
      heading: "11+ pressure across London's boroughs",
      body: [
        "Barnet, Bexley, Redbridge and Kingston all run grammar or partially selective schools, and plenty of London families get pulled into Kent's or Buckinghamshire's 11+ circuit as well. Formal, timed maths papers land on Year 6 desks here years earlier than in most of the country.",
        "Our KS2 group works on the number fluency, ratio and problem-solving that 11+ papers actually test, alongside normal SATs prep. Whatever's next — a grammar school test, an independent school exam, or just a smooth start to Year 7 — the groundwork is the same.",
      ],
    },
    examBoards: ["AQA", "Edexcel", "OCR"],
    faqs: [
      {
        q: "Can online tutoring really prepare my child for London's 11+ exams?",
        a: "Yes. 11+ papers test arithmetic fluency, ratio, algebraic reasoning and multi-step word problems — that's exactly what our KS2 sessions cover. Live video still lets the tutor watch a student's working in real time.",
      },
      {
        q: "Is online tutoring cheaper than a private London tutor?",
        a: "Considerably. In-person private maths tutoring in London commonly runs £45–£90 an hour. Our KS2 plan is £40 a month for four sessions, because splitting the tutor's time across a small group keeps the cost down without losing the one-to-one attention.",
      },
    ],
  },
  {
    slug: "manchester",
    city: "Manchester",
    nation: "England",
    region: "Greater Manchester",
    tagline: "Supporting Trafford's 11+ system and Greater Manchester's GCSE students",
    metaDescription:
      "Online group maths tutoring for KS2, KS3 and GCSE students in Manchester and Trafford. Structured lessons that build the fluency Trafford's 11+ test and Manchester Grammar School's entrance exam require.",
    intro:
      "Greater Manchester sits next to one of the few fully selective school systems left in England, so maths prep here tends to start early. Our live online groups give Manchester families the same structured, exam-focused tutoring as an in-person specialist, at a fraction of the price.",
    localContext: {
      heading: "Trafford's selective system and independent entrance exams",
      body: [
        "Trafford is one of a handful of local authorities that's still fully selective at 11, so nearly every Year 6 pupil in the borough sits a formal test — plus plenty from the wider Manchester area. Manchester Grammar School runs its own entrance exam on top of that, with maths a core paper in both.",
        "Our KS2 programme covers the mental arithmetic, ratio and non-routine problem solving these papers lean on. If a child isn't sitting a selective exam, the same groundwork just makes the move into secondary maths a lot smoother.",
      ],
    },
    examBoards: ["AQA", "Edexcel", "OCR"],
    faqs: [
      {
        q: "Do you prepare students for the Trafford 11+ specifically?",
        a: "Not for one specific paper, but our KS2 curriculum builds the arithmetic and reasoning skills the Trafford test — and similar independent entrance exams — are based on. The same foundations carry through to SATs.",
      },
      {
        q: "My child is at a comprehensive in Manchester, not a grammar school — is this still useful?",
        a: "Yes, and that's most of our Manchester families. Most are working towards steady KS3 confidence or GCSE grades on AQA, Edexcel or OCR, which is what the majority of Greater Manchester's secondaries teach.",
      },
    ],
  },
  {
    slug: "birmingham",
    city: "Birmingham",
    nation: "England",
    region: "West Midlands",
    tagline: "Preparing students for Birmingham's grammar school entrance tests and GCSEs",
    metaDescription:
      "Online group maths tutoring for KS2, KS3 and GCSE students in Birmingham. Supports preparation for the King Edward VI grammar schools' entrance exams alongside standard SATs and GCSE tuition.",
    intro:
      "Birmingham has one of the largest groups of state grammar schools in the country, so a good number of the city's Year 6 pupils sit a formal, competitive maths paper every autumn. Our small-group online lessons give Birmingham families that same structured preparation, without having to find and pay for an individual private tutor.",
    localContext: {
      heading: "The King Edward VI grammar schools and their entrance tests",
      body: [
        "The King Edward VI Foundation runs several grammar schools across Birmingham, and each sets its own entrance test with maths at the centre of it — arithmetic speed, reasoning, multi-step problems, well beyond the standard Year 6 syllabus.",
        "We build those skills over a full term rather than a last-minute crash course, so by exam day a student has actually practised the reasoning style these papers use. It sharpens SATs performance either way.",
      ],
    },
    examBoards: ["AQA", "Edexcel", "OCR"],
    faqs: [
      {
        q: "Do you specifically prepare students for King Edward VI grammar school entrance exams?",
        a: "Our KS2 curriculum covers the arithmetic fluency and non-routine problem solving these tests assess, taught over a full term of small-group sessions rather than a rushed crash course.",
      },
      {
        q: "What if my child isn't applying to a grammar school?",
        a: "Most of our Birmingham families aren't. The same KS2 groundwork supports strong SATs results, and our KS3/GCSE groups follow the AQA, Edexcel and OCR specifications used across Birmingham's comprehensives.",
      },
    ],
  },
  {
    slug: "leeds",
    city: "Leeds",
    nation: "England",
    region: "West Yorkshire",
    tagline: "Steady, structured GCSE and KS3 support for Leeds families",
    metaDescription:
      "Online group maths tutoring for KS2, KS3 and GCSE students in Leeds. Small-group live lessons that build consistent progress without the cost of individual private tuition.",
    intro:
      "Leeds' schools are almost entirely comprehensive, so the challenge here isn't one big entrance exam — it's steady progress from KS2 through to GCSE. Our small-group lessons are built for exactly that: a consistent weekly structure, clear tracking by topic, and a pace that actually builds understanding.",
    localContext: {
      heading: "A comprehensive city, and a curriculum that rewards consistency",
      body: [
        "With no local grammar school system, most Leeds families are focused on staying ahead of the curriculum rather than cramming for one exam — which is exactly where students quietly slip. A KS3 gap in algebra or ratio can go unnoticed until GCSE revision brings it back up.",
        "Our topic-by-topic learning log catches those gaps every term, so nothing carries forward silently into Year 10 and 11. Same approach whether a Leeds family is starting KS2 or aiming for a grade 7–9 at GCSE.",
      ],
    },
    examBoards: ["AQA", "Edexcel", "OCR"],
    faqs: [
      {
        q: "Are the sessions matched to what Leeds secondary schools actually teach?",
        a: "Yes — our KS3 and GCSE programmes follow the AQA, Edexcel and OCR specifications used by most Leeds secondaries, so what we cover lines up with classroom teaching and homework.",
      },
      {
        q: "My child is doing fine in maths but I want them to stay ahead — is this for them?",
        a: "Definitely. A lot of our Leeds students aren't struggling at all — parents use the sessions to keep momentum going and stop small gaps turning into big ones.",
      },
    ],
  },
  {
    slug: "bristol",
    city: "Bristol",
    nation: "England",
    region: "South West England",
    tagline: "Independent-school-standard maths preparation for Bristol families",
    metaDescription:
      "Online group maths tutoring for KS2, KS3 and GCSE students in Bristol. Structured support for entrance exam preparation and GCSE grades across AQA, Edexcel and OCR.",
    intro:
      "Bristol mixes strong comprehensives with a well-established independent sector, and both put real weight on maths early on. Our live online groups give Bristol families a structured alternative to one-to-one private tuition, without losing the personal attention that makes tutoring actually work.",
    localContext: {
      heading: "Independent school entrance exams and comprehensive GCSE demand",
      body: [
        "Schools like Bristol Grammar School set their own competitive entrance tests, with reasoning and problem solving at the core of the paper — on top of a strong comprehensive sector where GCSE results carry just as much weight for sixth form choices.",
        "Our KS2 group builds the fluency entrance papers test, and KS3/GCSE sessions track progress topic by topic — so it doesn't matter which route a family is on, the teaching is equally rigorous.",
      ],
    },
    examBoards: ["AQA", "Edexcel", "OCR"],
    faqs: [
      {
        q: "Can you help with independent school entrance exam preparation in Bristol?",
        a: "Yes. Our KS2 sessions build the arithmetic fluency and multi-step reasoning that entrance papers, including Bristol Grammar School's, are designed to test.",
      },
      {
        q: "What exam boards do Bristol's GCSE students typically sit?",
        a: "Mostly AQA, Edexcel or OCR. All three are what our KS3 and GCSE programmes are built around, including full past paper practice under timed conditions.",
      },
    ],
  },
  {
    slug: "liverpool",
    city: "Liverpool",
    nation: "England",
    region: "Merseyside",
    tagline: "Live, structured maths tutoring for Liverpool students without the travel",
    metaDescription:
      "Online group maths tutoring for KS2, KS3 and GCSE students in Liverpool and Merseyside. Small-group live sessions building genuine confidence, delivered from home.",
    intro:
      "Every classroom in Liverpool's comprehensive schools covers a huge range of maths ability, and that's usually where students lose confidence — not from lacking ability, but from not getting enough one-to-one attention to close a specific gap. Our small live online groups exist for exactly that, without a family having to find, vet and travel to an in-person tutor.",
    localContext: {
      heading: "Closing gaps early across Merseyside's comprehensive system",
      body: [
        "There's no selective exam to prepare for in the city itself, so the real risk for Liverpool students is a small KS3 gap — fractions, negative numbers, an early algebra concept — sitting unaddressed until GCSE revision brings it back up.",
        "Every session ends with a short recap, and parents get progress notes afterwards, so you always know where your child stands rather than finding out at the end of term.",
      ],
    },
    examBoards: ["AQA", "Edexcel", "OCR"],
    faqs: [
      {
        q: "Is online tutoring as effective as finding a local Liverpool tutor?",
        a: "For live, face-to-face teaching, yes — the tutor watches a student's working in real time just like an in-person session. The difference is you're not limited to whoever happens to tutor nearby, and there's no travel time either side.",
      },
      {
        q: "How quickly will I know if it's working?",
        a: "You'll get progress notes after every session and a full assessment at the end of term — specific, topic-level feedback well before any school report lands.",
      },
    ],
  },
  {
    slug: "newcastle",
    city: "Newcastle",
    nation: "England",
    region: "North East England",
    tagline: "Entrance exam and GCSE maths tutoring for Newcastle families",
    metaDescription:
      "Online group maths tutoring for KS2, KS3 and GCSE students in Newcastle. Supports entrance exam preparation for schools such as the Royal Grammar School alongside standard GCSE tuition.",
    intro:
      "Newcastle's strongest schools — state and independent — set their own competitive entrance exams, and maths reasoning sits at the centre of most of them. Our live small-group lessons give Newcastle families a structured way to prepare, for a fraction of the cost of individual tutoring.",
    localContext: {
      heading: "Competitive entrance exams and a strong comprehensive sector",
      body: [
        "The Royal Grammar School, Newcastle sets a demanding entrance paper that leans on mathematical reasoning over rote recall, and it sits alongside a comprehensive sector where GCSE results matter just as much for sixth form and college.",
        "Our KS2 sessions build that same reasoning and problem-solving, while KS3/GCSE groups follow what Newcastle's comprehensives actually teach from — so the preparation fits whichever route a family's child is on.",
      ],
    },
    examBoards: ["AQA", "Edexcel", "OCR"],
    faqs: [
      {
        q: "Can you help prepare for the Royal Grammar School entrance exam?",
        a: "Our KS2 curriculum builds the mathematical reasoning that competitive entrance papers like the RGS's are designed to test, taught over a full term rather than a short-notice crash course.",
      },
      {
        q: "Do you follow what Newcastle's comprehensive schools actually teach?",
        a: "Yes — our KS3 and GCSE programmes are built around the AQA, Edexcel and OCR specifications used across most of Newcastle's secondary schools.",
      },
    ],
  },
  {
    slug: "nottingham",
    city: "Nottingham",
    nation: "England",
    region: "East Midlands",
    tagline: "Structured KS2 to GCSE maths tutoring for Nottingham families",
    metaDescription:
      "Online group maths tutoring for KS2, KS3 and GCSE students in Nottingham. Small live groups building steady progress and independent school entrance exam readiness.",
    intro:
      "Nottingham has a comprehensive state sector alongside well-regarded independent schools like Nottingham High School, and both lean on solid, well-practised maths fundamentals. Our live online groups give Nottingham families structured, exam-aware tutoring without the cost of one-to-one private lessons.",
    localContext: {
      heading: "Independent school entrance tests and comprehensive GCSE progress",
      body: [
        "Independent schools in and around Nottingham set their own entrance assessments, with arithmetic fluency and reasoning at the core, while the city's comprehensives focus on steady progress through to strong GCSE results.",
        "Our KS2 group builds the fluency those entrance papers test, and KS3/GCSE sessions track each student topic by topic — so gaps get caught early instead of showing up at exam time, whichever route a family is on.",
      ],
    },
    examBoards: ["AQA", "Edexcel", "OCR"],
    faqs: [
      {
        q: "Do you help with independent school entrance exams in Nottingham?",
        a: "Yes. Our KS2 sessions build the arithmetic fluency and reasoning skills that independent school entrance papers, including Nottingham High School's, typically test.",
      },
      {
        q: "What if my child just needs steady GCSE support?",
        a: "That's most of our Nottingham families. Our GCSE programme follows the AQA, Edexcel and OCR specifications, with regular past paper practice and a topic-by-topic learning log so nothing gets left behind before exams.",
      },
    ],
  },
  {
    slug: "cardiff",
    city: "Cardiff",
    nation: "Wales",
    region: "South Wales",
    tagline: "WJEC-aligned GCSE tutoring, home to the exam board itself",
    metaDescription:
      "Online group maths tutoring for KS2, KS3 and GCSE students in Cardiff and South Wales. Lessons aligned to WJEC/Eduqas, the exam board headquartered in the city.",
    intro:
      "Cardiff is home to WJEC itself — the board that sets the GCSE maths papers most Welsh students sit — so getting the specification right isn't an afterthought here, it's the whole point. We run live, small-group lessons built specifically around WJEC's GCSE structure, plus KS2 and KS3 foundations aligned to the Curriculum for Wales.",
    localContext: {
      heading: "WJEC/Eduqas and the Curriculum for Wales",
      body: [
        "Most Cardiff secondaries sit WJEC (or its England-facing arm, Eduqas) for GCSE maths, which has a noticeably different question style and grading approach to AQA, Edexcel or OCR — a distinction that generic, England-focused tutoring often misses entirely.",
        "Our GCSE programme is built directly around the WJEC spec: the topics it prioritises, how its papers are structured, and its particular mark scheme conventions — plus past paper practice under timed conditions, so Cardiff students know what to expect.",
      ],
    },
    examBoards: ["WJEC", "Eduqas"],
    faqs: [
      {
        q: "Do you actually teach to the WJEC specification, or just adapt the English boards?",
        a: "We teach WJEC/Eduqas directly for our Cardiff and Wales-based students. The specification, question style and past papers are specific to WJEC — not adapted from an AQA or Edexcel course.",
      },
      {
        q: "Do you cover the Welsh Baccalaureate as well as GCSE maths?",
        a: "Our programme focuses on GCSE maths itself rather than the wider Welsh Baccalaureate, but the reasoning and problem-solving we build directly supports the numeracy elements a lot of students meet alongside it.",
      },
    ],
  },
  {
    slug: "belfast",
    city: "Belfast",
    nation: "Northern Ireland",
    region: "Northern Ireland",
    tagline: "Transfer test (AQE/PPTC) and GCSE preparation for Belfast families",
    metaDescription:
      "Online group maths tutoring for KS2, KS3 and GCSE students in Belfast and Northern Ireland. Supports transfer test (AQE/PPTC) preparation and CCEA-aligned GCSE tuition.",
    intro:
      "Northern Ireland is the only part of the UK where most Year 7 pupils still sit a formal transfer test for grammar school entry, which means maths preparation here starts earlier and matters more than almost anywhere else. We run live, small-group lessons built around exactly that: the transfer test, and CCEA-aligned GCSEs after it.",
    localContext: {
      heading: "The transfer test — AQE and PPTC — and CCEA GCSEs",
      body: [
        "Most grammar schools across Belfast and Northern Ireland select using one of two unregulated tests, AQE or PPTC, both with a substantial maths paper — arithmetic speed, reasoning, problem solving, well ahead of the standard curriculum timeline. For a lot of NI families that means formal exam prep starts in P6, a year earlier than SATs elsewhere in the UK.",
        "Our KS2 programme builds that same fluency and reasoning, and once students reach secondary school, our GCSE sessions follow the CCEA specification most NI grammar and secondary schools use, alongside AQA and Edexcel content for schools that sit English boards instead.",
      ],
    },
    examBoards: ["CCEA", "AQA", "Edexcel"],
    faqs: [
      {
        q: "Do you prepare students specifically for the AQE and PPTC transfer tests?",
        a: "Yes. Our KS2 sessions are built around the arithmetic fluency, reasoning and problem solving both papers test, taught over a full academic year rather than a short-notice crash course.",
      },
      {
        q: "Do you teach to CCEA, or only the English exam boards?",
        a: "We teach CCEA directly for GCSE maths, since that's what most Northern Ireland schools use, and we also support AQA and Edexcel for the schools that sit English boards instead.",
      },
    ],
  },
];

export const findLocation = (slug: string) => locations.find((l) => l.slug === slug);
