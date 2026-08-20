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
      "London has some of the most competitive school admissions in the country, and maths is usually where families feel the pressure first. BrightLearn runs live, small-group online lessons for London students preparing for 11+ entry, SATs, or GCSEs — so your child gets the same structured, exam-focused teaching a private London tutor offers, without the £60-plus hourly rate or the commute across town.",
    localContext: {
      heading: "11+ pressure across London's boroughs",
      body: [
        "Boroughs including Barnet, Bexley, Redbridge and Kingston run grammar or partially selective schools, and neighbouring Kent and Buckinghamshire draw many London families into the wider 11+ circuit. That means London's KS2 students are often sitting formal, timed maths papers years before their peers elsewhere in the country.",
        "Our KS2 group builds the underlying number fluency, ratio and problem-solving skills that 11+ papers test, alongside standard SATs preparation — so students are ready whether their next step is a grammar school test, an independent school entrance exam, or simply a smooth transition to secondary maths.",
      ],
    },
    examBoards: ["AQA", "Edexcel", "OCR"],
    faqs: [
      {
        q: "Can online tutoring really prepare my child for London's 11+ exams?",
        a: "Yes. The maths tested in 11+ papers — arithmetic fluency, ratio, algebraic reasoning and multi-step word problems — is exactly what our KS2 group sessions are built around. Live, face-to-face online teaching lets the tutor watch a student's working in real time, the same as an in-person session.",
      },
      {
        q: "Is online tutoring cheaper than a private London tutor?",
        a: "Considerably. In-person private maths tutoring in London commonly runs £45–£90 per hour. Our KS2 plan is £40 per month for four sessions, because a small group shares the cost of the tutor's time without losing the personalised attention.",
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
      "Greater Manchester sits alongside one of England's few fully selective school systems, so maths preparation here starts earlier and matters more than in most cities. BrightLearn's live online group sessions give Manchester families the same structured, exam-focused tutoring you'd get from a specialist in-person tutor, at a fraction of the cost.",
    localContext: {
      heading: "Trafford's selective system and independent entrance exams",
      body: [
        "Trafford is one of only a handful of local authorities in England that remains fully selective at 11, so almost every Year 6 pupil in the borough — and many from surrounding Manchester areas — sits an 11+ style test. Independent schools such as Manchester Grammar School run their own competitive entrance exams on top of this, with maths a core paper in both.",
        "Our KS2 programme is built around exactly the skills these papers test: mental arithmetic, ratio and proportion, and non-routine problem solving delivered at pace. For students not sitting a selective exam, the same structured approach builds the confidence and fluency that carries straight into secondary school maths.",
      ],
    },
    examBoards: ["AQA", "Edexcel", "OCR"],
    faqs: [
      {
        q: "Do you prepare students for the Trafford 11+ specifically?",
        a: "We don't teach to one specific paper, but our KS2 curriculum covers the arithmetic fluency, reasoning and problem-solving skills that the Trafford test and similar independent entrance exams are built on — the same foundations that also carry students through SATs.",
      },
      {
        q: "My child is at a comprehensive in Manchester, not a grammar school — is this still useful?",
        a: "Yes. Most of our Manchester families aren't preparing for a selective exam at all — they're building steady confidence in KS3 or working towards GCSE grades with AQA, Edexcel or OCR exam boards, which is what the majority of Greater Manchester's secondary schools use.",
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
      "Birmingham is home to one of the country's largest groups of state grammar schools, which means a significant number of the city's Year 6 pupils sit formal, competitive maths papers each autumn. BrightLearn's small-group online lessons give Birmingham families structured, exam-focused preparation without needing to find and fund an individual private tutor.",
    localContext: {
      heading: "The King Edward VI grammar schools and their entrance tests",
      body: [
        "The King Edward VI Foundation runs several grammar schools across Birmingham, each setting its own entrance assessment with maths as a core component — testing arithmetic speed, reasoning and multi-step problem solving well beyond the standard Year 6 curriculum.",
        "Our KS2 group sessions build these exact skills over a full term rather than a last-minute crash course, so students walk into the exam room having genuinely practised the reasoning style these papers use — and everything they've learned also strengthens their SATs performance regardless of the outcome.",
      ],
    },
    examBoards: ["AQA", "Edexcel", "OCR"],
    faqs: [
      {
        q: "Do you specifically prepare students for King Edward VI grammar school entrance exams?",
        a: "Our KS2 curriculum is built around the arithmetic fluency and non-routine problem solving these entrance tests assess, taught over a full term of structured small-group sessions rather than short-notice cramming.",
      },
      {
        q: "What if my child isn't applying to a grammar school?",
        a: "Most students in our Birmingham groups aren't. The same KS2 foundations support strong SATs results, and our KS3/GCSE programmes follow the AQA, Edexcel and OCR specifications used across Birmingham's comprehensive secondaries.",
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
      "Leeds' schools are almost entirely comprehensive, so the maths challenge here usually isn't a single high-stakes entrance exam — it's steady, cumulative progress from KS2 through to GCSE. BrightLearn's small-group online lessons are built for exactly that: consistent weekly structure, clear topic-by-topic tracking, and a calm pace that builds real understanding.",
    localContext: {
      heading: "A comprehensive city, and a curriculum that rewards consistency",
      body: [
        "With no local grammar school system, most Leeds families are focused on getting the fundamentals right early and staying ahead of the curriculum rather than cramming for one exam. That's where a lot of students quietly fall behind — gaps in KS3 algebra or ratio work go unnoticed until GCSE revision exposes them.",
        "Our topic-by-topic learning log flags exactly where a student's gaps are, term by term, so nothing carries forward silently into Year 10 and 11. It's the same structured approach whether a Leeds family is building early confidence in KS2 or pushing for a Grade 7–9 at GCSE.",
      ],
    },
    examBoards: ["AQA", "Edexcel", "OCR"],
    faqs: [
      {
        q: "Are the sessions matched to what Leeds secondary schools actually teach?",
        a: "Yes. Our KS3 and GCSE programmes follow the AQA, Edexcel and OCR specifications used by the large majority of Leeds secondary schools, so what's covered in sessions lines up with classroom teaching and homework.",
      },
      {
        q: "My child is doing fine in maths but I want them to stay ahead — is this for them?",
        a: "Definitely. A good number of our Leeds students aren't struggling at all — parents use the group sessions to keep momentum going, extend topics beyond the classroom pace, and stop small gaps from ever becoming big ones.",
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
      "Bristol's school landscape mixes strong comprehensives with a well-established independent sector, and both routes put real weight on maths from an early age. BrightLearn's live online group sessions give Bristol families a structured, tutor-led alternative to expensive one-to-one tuition, without losing the personal attention that makes tutoring work.",
    localContext: {
      heading: "Independent school entrance exams and comprehensive GCSE demand",
      body: [
        "Schools such as Bristol Grammar School set their own competitive entrance assessments, with maths reasoning and problem-solving a central part of the paper — on top of the city's academically strong comprehensive sector, where GCSE maths outcomes matter just as much for sixth form options.",
        "Our KS2 group builds the number fluency and reasoning skills entrance papers test, while KS3 and GCSE sessions track progress topic by topic so students preparing for either a private school application or a strong set of GCSE results get the same rigorous, structured teaching.",
      ],
    },
    examBoards: ["AQA", "Edexcel", "OCR"],
    faqs: [
      {
        q: "Can you help with independent school entrance exam preparation in Bristol?",
        a: "Yes. Our KS2 sessions build the arithmetic fluency and multi-step reasoning that independent school entrance papers, including Bristol Grammar School's, are designed to test.",
      },
      {
        q: "What exam boards do Bristol's GCSE students typically sit?",
        a: "Bristol's secondary schools mostly use AQA, Edexcel or OCR for GCSE maths, all of which our KS3 and GCSE programmes are built around, including full past paper practice under timed conditions.",
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
      "Liverpool's comprehensive schools cover a huge range of maths ability in every classroom, which is exactly where a lot of students quietly lose confidence — not from lacking ability, but from not getting enough individual attention to close a specific gap. BrightLearn's small live online groups exist to fix that, without a family needing to find, vet and travel to an in-person tutor.",
    localContext: {
      heading: "Closing gaps early across Merseyside's comprehensive system",
      body: [
        "With no selective exam to prepare for in the city itself, the real risk for Liverpool students is a small KS3 gap — fractions, negative numbers, an early algebra concept — going unaddressed until it resurfaces as a bigger problem in GCSE revision.",
        "Every BrightLearn session ends with a short recap and parents receive progress notes after each one, so a Liverpool parent always knows exactly where their child stands rather than finding out from a end-of-term report.",
      ],
    },
    examBoards: ["AQA", "Edexcel", "OCR"],
    faqs: [
      {
        q: "Is online tutoring as effective as finding a local Liverpool tutor?",
        a: "For live, face-to-face group teaching, yes — the tutor sees the student's working in real time just as they would in person. The difference is you're not limited to whoever happens to tutor near you, and there's no travel time either side of the session.",
      },
      {
        q: "How quickly will I know if it's working?",
        a: "Parents get progress notes after every session and a full assessment at the end of each term, so you'll see specific, topic-level feedback well before any school report.",
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
      "Newcastle's strongest state and independent schools set their own competitive entrance exams, and maths reasoning is central to nearly all of them. BrightLearn's live small-group online lessons give Newcastle families a structured way to prepare, at a fraction of the cost of individual private tuition.",
    localContext: {
      heading: "Competitive entrance exams and a strong comprehensive sector",
      body: [
        "Schools such as the Royal Grammar School, Newcastle set demanding entrance papers with a strong emphasis on mathematical reasoning rather than rote recall, sitting alongside a comprehensive sector where GCSE outcomes carry just as much weight for sixth form and college options.",
        "Our KS2 sessions build exactly the reasoning and problem-solving skills these entrance papers reward, while KS3 and GCSE groups follow the specifications Newcastle's comprehensives actually teach from — so families get the right kind of preparation whichever route their child is on.",
      ],
    },
    examBoards: ["AQA", "Edexcel", "OCR"],
    faqs: [
      {
        q: "Can you help prepare for the Royal Grammar School entrance exam?",
        a: "Our KS2 curriculum builds the mathematical reasoning and problem-solving skills that competitive entrance papers like the RGS's are designed to test, taught over a full term rather than a short-notice crash course.",
      },
      {
        q: "Do you follow what Newcastle's comprehensive schools actually teach?",
        a: "Yes — our KS3 and GCSE programmes are built around the AQA, Edexcel and OCR specifications used across the large majority of Newcastle's secondary schools.",
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
      "Nottingham combines a comprehensive state sector with well-regarded independent schools such as Nottingham High School, both of which put real weight on solid, well-practised maths fundamentals. BrightLearn's live online group sessions give Nottingham families structured, exam-aware tutoring without the cost of one-to-one private lessons.",
    localContext: {
      heading: "Independent school entrance tests and comprehensive GCSE progress",
      body: [
        "Independent schools in and around Nottingham set their own entrance assessments, with maths reasoning and arithmetic fluency a core part of the paper, while the city's comprehensive schools focus on steady progress through to strong GCSE results.",
        "Our KS2 group builds the fluency and problem-solving skills entrance papers test, and our KS3/GCSE programmes track each student topic by topic — so whichever route a Nottingham family is on, gaps get caught early instead of showing up at exam time.",
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
        a: "That's the majority of our Nottingham families. Our GCSE programme follows the AQA, Edexcel and OCR specifications with regular past paper practice and a topic-by-topic learning log so nothing gets left behind before exams.",
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
      "Cardiff is home to WJEC itself, the exam board that sets the GCSE maths papers most Welsh students sit — so getting the specification right isn't an afterthought here, it's the whole point. BrightLearn runs live, small-group online lessons built specifically around WJEC's GCSE maths structure, alongside KS2 and KS3 foundations aligned to the Curriculum for Wales.",
    localContext: {
      heading: "WJEC/Eduqas and the Curriculum for Wales",
      body: [
        "Most Cardiff secondary schools sit WJEC (or its England-facing arm, Eduqas) for GCSE maths, which has its own distinct question style and grading approach compared with AQA, Edexcel or OCR — a difference that generic, England-focused tutoring resources often miss entirely.",
        "Our GCSE programme is built around the WJEC specification directly: the topics it prioritises, the way its papers are structured, and the mark scheme conventions specific to it — alongside past paper practice under timed conditions so Cardiff students walk in knowing exactly what to expect.",
      ],
    },
    examBoards: ["WJEC", "Eduqas"],
    faqs: [
      {
        q: "Do you actually teach to the WJEC specification, or just the English exam boards?",
        a: "We teach WJEC/Eduqas directly for our Cardiff and Wales-based students — the specification, question style and past papers are specific to WJEC, not adapted from an AQA or Edexcel course.",
      },
      {
        q: "Do you cover the Welsh Baccalaureate as well as GCSE maths?",
        a: "Our programme is focused on GCSE maths itself rather than the wider Welsh Baccalaureate, but the mathematical reasoning and problem-solving skills we build directly support the numeracy elements many students encounter alongside it.",
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
      "Northern Ireland is the only part of the UK where the vast majority of Year 7 pupils still sit a formal transfer test for grammar school entry — which makes maths preparation here start earlier and matter more than almost anywhere else. BrightLearn runs live, small-group online lessons built around exactly what Belfast families are preparing for: the transfer test, and CCEA-aligned GCSEs after it.",
    localContext: {
      heading: "The transfer test — AQE and PPTC — and CCEA GCSEs",
      body: [
        "Most grammar schools across Belfast and Northern Ireland select using one of two unregulated transfer tests, AQE or PPTC, both of which include a substantial maths paper testing arithmetic speed, reasoning and problem solving well beyond the standard curriculum timeline. For many NI families, this means formal exam preparation starts in P6, a year earlier than SATs elsewhere in the UK.",
        "Our KS2 programme builds precisely the fluency and reasoning skills these papers demand, and once students reach secondary school, our GCSE sessions follow the CCEA specification used by most NI grammar and secondary schools, alongside AQA and Edexcel content for schools that offer English exam boards instead.",
      ],
    },
    examBoards: ["CCEA", "AQA", "Edexcel"],
    faqs: [
      {
        q: "Do you prepare students specifically for the AQE and PPTC transfer tests?",
        a: "Yes. Our KS2 group sessions are built around the arithmetic fluency, reasoning and problem-solving skills both the AQE and PPTC maths papers test, taught over a full academic year rather than a short-notice crash course.",
      },
      {
        q: "Do you teach to CCEA, or only the English exam boards?",
        a: "We teach CCEA directly for GCSE maths, which is what most Northern Ireland schools use, and we also support AQA and Edexcel for the minority of NI schools that sit English boards instead.",
      },
    ],
  },
];

export const findLocation = (slug: string) => locations.find((l) => l.slug === slug);
