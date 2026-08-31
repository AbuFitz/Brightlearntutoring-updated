export interface GuideSection {
  heading: string;
  body: string[];
}

export interface GuideFaq {
  q: string;
  a: string;
}

export type GuideCategory = "GCSE" | "KS3" | "KS2";

export interface GuideInfo {
  slug: string;
  category: GuideCategory;
  navLabel: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  h1Accent: string;
  tagline: string;
  intro: string[];
  sections: GuideSection[];
  faqs: GuideFaq[];
  relatedGuideSlugs: string[];
  relatedProgrammeSlug: string;
  relatedProgrammeLabel: string;
}

export const guides: GuideInfo[] = [
  {
    slug: "gcse-maths-resit-guide",
    category: "GCSE",
    navLabel: "GCSE Maths Resit Guide",
    metaTitle: "GCSE Maths Resit Guide — What to Know | BrightLearn",
    metaDescription:
      "A clear guide to GCSE Maths resits in England — when you can resit, who has to, how grading works, and how to prepare properly.",
    h1: "GCSE Maths resit guide",
    h1Accent: "what you actually need to know.",
    tagline: "For students and parents figuring out what a resit involves.",
    intro: [
      "If your GCSE Maths result wasn't what you needed, a resit is a normal, well-trodden path — not a sign anything has gone badly wrong. Thousands of students retake GCSE Maths every year, many while studying A-levels, a BTEC, or an apprenticeship alongside it.",
      "This guide covers the practical basics: when you can sit the exam again, who is required to, and how the grading works — so you know exactly what you're dealing with before you start preparing.",
    ],
    sections: [
      {
        heading: "When can you resit GCSE Maths?",
        body: [
          "GCSE Maths is offered in two exam series each year: the main Summer series (results in August) and a November resit series aimed specifically at students who didn't get a grade 4 the first time. Some students choose to wait and resit the following Summer instead, particularly if they want a full academic year to prepare.",
          "Your school, sixth form or college will usually tell you which series you're entered for — this is worth confirming early, since November resits come round faster than most people expect.",
        ],
      },
      {
        heading: "Who has to resit GCSE Maths?",
        body: [
          "In England, students who don't achieve at least a grade 4 in GCSE Maths by age 16 are generally required to keep studying towards it as a condition of their post-16 funding — whether that's at school, sixth form or college. This applies whether you're doing A-levels, a vocational course, or an apprenticeship.",
          "It's worth checking your own situation with your school, sixth form or college directly, since exact requirements can vary depending on your course and circumstances.",
        ],
      },
      {
        heading: "How does resit grading work?",
        body: [
          "A GCSE Maths resit uses exactly the same grading system as the first sitting — grades 1 to 9, with grade 4 counted as a standard pass and grade 5 as a strong pass. There's no separate, easier version of the exam for resit students; you're sitting genuine GCSE Foundation or Higher tier papers, marked to the same standard.",
          "This is actually good news in one sense: everything you learn now is exactly what will be tested, with nothing extra or different because it's a resit.",
        ],
      },
      {
        heading: "How to prepare for a resit properly",
        body: [
          "The biggest mistake with resits is treating them like round two of the same lessons that didn't work the first time. What actually helps is starting from an honest look at where marks were lost last time, then focusing tightly on those specific gaps and on exam technique — rather than re-covering the whole syllabus from scratch.",
          "Regular, focused practice with real past papers under timed conditions makes a bigger difference than long revision sessions covering everything at once.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can I resit GCSE Maths more than once?",
        a: "Yes — there's no formal limit on how many times you can sit GCSE Maths, though most students aim to secure a grade 4 or higher within one or two additional attempts, given the time and exam pressure involved.",
      },
      {
        q: "Do I need to resit through my school, or can I do it independently?",
        a: "Most 16-18 year olds resit through their school, sixth form or college as part of their study programme. Adults resitting independently can usually register as a private candidate through a local exam centre — it's worth checking availability well in advance.",
      },
      {
        q: "Is the November resit harder than the Summer exam?",
        a: "No — November and Summer series test the same specification to the same standard. The November series simply gives students who narrowly missed a grade 4 a chance to resit sooner, without waiting a full year.",
      },
    ],
    relatedGuideSlugs: ["what-happens-if-you-fail-gcse-maths", "grade-3-to-grade-4-gcse-maths"],
    relatedProgrammeSlug: "gcse-maths-resit-tuition",
    relatedProgrammeLabel: "See our GCSE Maths resit tuition",
  },
  {
    slug: "what-happens-if-you-fail-gcse-maths",
    category: "GCSE",
    navLabel: "What Happens If You Fail GCSE Maths?",
    metaTitle: "What Happens If You Fail GCSE Maths? | BrightLearn",
    metaDescription:
      "What a grade below 4 in GCSE Maths actually means for your options — sixth form, college, apprenticeships — and the realistic ways forward.",
    h1: "What happens if you",
    h1Accent: "fail GCSE Maths?",
    tagline: "A calm, practical look at what a low grade actually means.",
    intro: [
      "Not getting the grade you needed in GCSE Maths feels bigger in the moment than it usually turns out to be in practice. It's a genuinely common situation, and there are clear, well-established next steps — this isn't a dead end, just a detour that plenty of students take.",
      "Here's what a grade below 4 actually means in practical terms, and what the realistic options are from here.",
    ],
    sections: [
      {
        heading: "What counts as \"failing\" GCSE Maths?",
        body: [
          "GCSE grades run from 1 to 9. Grade 4 is treated as a \"standard pass\" and grade 5 as a \"strong pass\" — anything below grade 4 is generally what people mean by not passing. It's worth remembering this is a specific funding and progression threshold, not a judgement on someone's actual ability in maths.",
        ],
      },
      {
        heading: "What it means for sixth form, college and apprenticeships",
        body: [
          "In England, students without a grade 4 in GCSE Maths by 16 are usually required to keep working towards it as part of their post-16 study, whatever course they're on. Most sixth forms and colleges build this in automatically alongside A-levels, BTECs or apprenticeships, so it rarely stops someone from starting the course they wanted.",
          "Specific entry requirements can vary by course and institution, so it's always worth checking directly with the sixth form, college or employer in question.",
        ],
      },
      {
        heading: "The realistic options from here",
        body: [
          "The most common path is a straightforward resit — either in the November series or the following Summer — aimed specifically at closing the gap that caused the result, rather than repeating a whole year of lessons. Some students also study towards Functional Skills Maths as an alternative qualification, depending on their course requirements.",
          "Whichever route applies, targeted preparation focused on exactly where marks were lost tends to work far better than generic revision.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does a low GCSE Maths grade affect university applications?",
        a: "Most universities ask for at least a grade 4 in GCSE Maths (or an equivalent) alongside A-level or other results, so resitting is usually the most straightforward route if you're planning to apply. Requirements vary by course and institution, so it's worth checking directly.",
      },
      {
        q: "How long does it realistically take to go from a low grade to a pass?",
        a: "It depends on where the gaps are, but many students see real progress within a few months of focused, consistent preparation — particularly when it targets their specific weak topics rather than covering everything from scratch.",
      },
      {
        q: "Is it normal to feel discouraged after not passing?",
        a: "Completely — and it's worth naming that rather than pushing past it. Most students who resit go on to pass, and starting again with a clear, focused plan (rather than dread about repeating the whole thing) makes a real difference to how it goes.",
      },
    ],
    relatedGuideSlugs: ["gcse-maths-resit-guide", "gcse-maths-foundation-vs-higher"],
    relatedProgrammeSlug: "gcse-maths-resit-tuition",
    relatedProgrammeLabel: "See our GCSE Maths resit tuition",
  },
  {
    slug: "gcse-maths-foundation-vs-higher",
    category: "GCSE",
    navLabel: "GCSE Maths Foundation vs Higher",
    metaTitle: "GCSE Maths Foundation vs Higher — The Difference | BrightLearn",
    metaDescription:
      "The real differences between GCSE Maths Foundation and Higher tier — grade ranges, content, and how to work out which is right for your child.",
    h1: "GCSE Maths Foundation",
    h1Accent: "vs Higher — what's the difference?",
    tagline: "For parents unsure whether Foundation or Higher is the right fit.",
    intro: [
      "GCSE Maths is split into two tiers — Foundation and Higher — and which one a student sits has a real effect on both the exam content and the grades available. Understanding the difference makes it much easier to have a useful conversation with the school about which tier is right.",
    ],
    sections: [
      {
        heading: "What's actually different between the tiers",
        body: [
          "Foundation tier covers grades 1 to 5 and focuses on core number, ratio, algebra, geometry and statistics content, without the more advanced topics. Higher tier covers grades 4 to 9, includes everything in Foundation plus more advanced material (like more complex algebra, trigonometry and functions), and is generally a faster-paced, more demanding exam.",
          "A common misconception is that Foundation is \"easier\" in a general sense — it's more accurate to say it covers a narrower band of content, capped at a grade 5, while Higher covers more ground with a higher ceiling but also a higher floor (a grade 3 on Higher tier is ungraded).",
        ],
      },
      {
        heading: "How schools decide which tier to enter a student for",
        body: [
          "Schools base tier decisions on ongoing assessment throughout Years 10 and 11 — mock exam results, classwork, and how a student is tracking against the two grade boundaries. It's a professional judgement aimed at giving each student the best realistic outcome, not a fixed decision made years in advance.",
        ],
      },
      {
        heading: "Can a student switch tiers?",
        body: [
          "In most cases, yes — particularly earlier in Year 11, tier decisions can still be adjusted based on how a student is progressing. It becomes harder closer to exam entry deadlines, since exam boards need tier confirmed in advance, so it's worth raising the conversation with the school as soon as there's a question about it.",
        ],
      },
      {
        heading: "Which tier is \"right\"?",
        body: [
          "The honest answer is: whichever tier gives a realistic route to the best achievable grade for that particular student. A confident, well-prepared grade 5 on Foundation is a stronger outcome than a stretched, anxious attempt at Higher tier that ends in an ungraded result — and vice versa for a student who's comfortably working at Higher-tier standard.",
        ],
      },
    ],
    faqs: [
      {
        q: "What's the highest grade possible on Foundation tier?",
        a: "Grade 5 — a \"strong pass.\" Foundation tier doesn't offer grades 6 to 9, so a student capable of those grades would need to be entered for Higher tier instead.",
      },
      {
        q: "What happens if a Higher tier student doesn't reach a grade 4?",
        a: "Higher tier only awards grades 4 to 9 — a mark below the grade 4 boundary on Higher tier is recorded as ungraded (U), rather than a lower number grade. This is one reason schools are cautious about entering borderline students for Higher tier.",
      },
      {
        q: "Can tutoring help work out which tier is realistic?",
        a: "Yes — an honest read on recent test results and mock papers usually makes it clear which tier gives the best realistic outcome, alongside whatever the school is already saying.",
      },
    ],
    relatedGuideSlugs: ["grade-3-to-grade-4-gcse-maths", "gcse-maths-revision-techniques"],
    relatedProgrammeSlug: "gcse-maths-foundation-tutor",
    relatedProgrammeLabel: "See our GCSE Maths Foundation tutoring",
  },
  {
    slug: "grade-3-to-grade-4-gcse-maths",
    category: "GCSE",
    navLabel: "Grade 3 to Grade 4 in GCSE Maths",
    metaTitle: "Grade 3 to Grade 4 in GCSE Maths — How To | BrightLearn",
    metaDescription:
      "Practical steps to move from a grade 3 to a grade 4 in GCSE Maths — where students usually lose marks, and how to close the gap.",
    h1: "How to move from",
    h1Accent: "Grade 3 to Grade 4 in GCSE Maths.",
    tagline: "The pass boundary is closer than it looks — here's what actually helps.",
    intro: [
      "The jump from a grade 3 to a grade 4 is one of the most common goals in GCSE Maths, and it's usually a smaller gap than it feels like. A grade 3 typically means a student has a genuine grasp of a good chunk of the syllabus already — the difference is often a handful of specific topics and a bit of exam technique, not a lack of ability.",
    ],
    sections: [
      {
        heading: "Why this particular jump matters",
        body: [
          "Grade 4 is the \"standard pass\" boundary that most post-16 courses, colleges and employers look for. Because of that, it's often the single most consequential grade boundary in the entire GCSE Maths grade range — which is exactly why it's worth a focused, deliberate push rather than generic revision.",
        ],
      },
      {
        heading: "Where students usually lose the marks",
        body: [
          "At grade 3, the gap to grade 4 is rarely about not understanding maths broadly — it's usually a mix of specific weak topics (commonly ratio, percentages, and basic algebra manipulation), careless errors under exam pressure, and running out of time on longer questions. Identifying exactly which of these applies to a specific student changes what's worth spending time on.",
        ],
      },
      {
        heading: "What actually helps close the gap",
        body: [
          "Targeted topic revision beats broad revision at this stage — working through past paper questions by topic, rather than full papers, makes it much easier to spot and fix specific weak areas. Alongside that, practising exam technique (reading questions carefully, showing working for method marks, managing time across a paper) recovers marks that have nothing to do with maths ability at all.",
          "A realistic timeline matters too: most students see meaningful movement with a few months of consistent, focused work — rushed, last-minute cramming tends to help far less than steady practice.",
        ],
      },
    ],
    faqs: [
      {
        q: "How many marks is the difference between a grade 3 and a grade 4?",
        a: "It varies slightly by exam board and series, but it's typically a relatively small number of marks across all three papers combined — which is why targeted revision on a handful of weak topics can make a real, measurable difference.",
      },
      {
        q: "Should a grade 3 student focus on Foundation or Higher tier content?",
        a: "Almost always Foundation tier, since that's where grade 4 sits within reach without also needing the extra Higher-tier content. The school's tier decision will usually reflect this already.",
      },
      {
        q: "What's the fastest way to know which topics are the real gaps?",
        a: "A recent mock paper or past paper attempt, marked and reviewed topic by topic, is usually the clearest way to see exactly where marks were lost — far more useful than guessing based on how a topic \"feels.\"",
      },
    ],
    relatedGuideSlugs: ["gcse-maths-foundation-vs-higher", "gcse-maths-revision-techniques", "common-gcse-maths-mistakes"],
    relatedProgrammeSlug: "gcse-maths-resit-tuition",
    relatedProgrammeLabel: "See our GCSE Maths resit tuition",
  },
  {
    slug: "gcse-maths-revision-techniques",
    category: "GCSE",
    navLabel: "GCSE Maths Revision Techniques",
    metaTitle: "GCSE Maths Revision Techniques That Work | BrightLearn",
    metaDescription:
      "Revision techniques for GCSE Maths that actually improve results — active recall, past papers, spaced practice, and common revision mistakes to avoid.",
    h1: "GCSE Maths revision techniques",
    h1Accent: "that actually work.",
    tagline: "Not all revision is equally useful — here's what moves the needle.",
    intro: [
      "A lot of GCSE Maths revision time gets spent on methods that feel productive but don't move the needle much — re-reading notes, watching videos passively, or working through easy questions that are already understood. Here's what tends to actually improve results.",
    ],
    sections: [
      {
        heading: "Active recall over passive review",
        body: [
          "Trying to solve a problem from memory — then checking the answer — builds understanding far more effectively than reading through worked examples or notes. For maths specifically, this means doing questions without looking at the method first, not just reading through how a topic works.",
        ],
      },
      {
        heading: "Past papers, done properly",
        body: [
          "Past papers are the single most useful GCSE Maths revision resource, but only when used well: under timed conditions, marked honestly against the real mark scheme, and followed by an actual review of what went wrong — not just a score. Doing a past paper and moving straight on to the next one without reviewing mistakes wastes most of its value.",
        ],
      },
      {
        heading: "Spaced practice over cramming",
        body: [
          "Coming back to a topic a few days or a week after first learning it — rather than trying to master it in one long session — helps it actually stick. A revision schedule that revisits topics repeatedly over weeks beats a single intense session the night before, even if the total time spent is similar.",
        ],
      },
      {
        heading: "Mixed topic practice, closer to the exam",
        body: [
          "Early revision benefits from focusing on one topic at a time, but as the exam gets closer, mixed practice (questions drawn from multiple topics, as they appear on a real paper) matters more — because part of the real exam challenge is recognising which method a question needs without being told the topic in advance.",
        ],
      },
    ],
    faqs: [
      {
        q: "How many past papers should a student do before the exam?",
        a: "There's no fixed number — what matters more is reviewing each one properly. A handful of past papers, each thoroughly marked and reviewed, is usually more valuable than doing many papers superficially.",
      },
      {
        q: "Is it better to revise weak topics or strong topics?",
        a: "Weak topics generally deserve more time, since that's where the most marks are recoverable — but strong topics still need occasional practice to stay sharp, particularly ones that come up often on papers.",
      },
      {
        q: "How long should a single GCSE Maths revision session be?",
        a: "Shorter, focused sessions (45–60 minutes) with a clear goal tend to work better than long, unfocused ones — it's easier to stay genuinely engaged, and easier to fit revision around school and other commitments.",
      },
    ],
    relatedGuideSlugs: ["gcse-maths-revision-timetable", "common-gcse-maths-mistakes"],
    relatedProgrammeSlug: "small-group-gcse-maths-revision",
    relatedProgrammeLabel: "See our small-group GCSE revision sessions",
  },
  {
    slug: "gcse-maths-revision-timetable",
    category: "GCSE",
    navLabel: "GCSE Maths Revision Timetable",
    metaTitle: "How to Build a GCSE Maths Revision Timetable | BrightLearn",
    metaDescription:
      "How to build a realistic GCSE Maths revision timetable — how far out to start, how to structure the weeks, and a sample plan to adapt.",
    h1: "How to build a GCSE Maths",
    h1Accent: "revision timetable.",
    tagline: "A structure to adapt, not a rigid schedule to follow perfectly.",
    intro: [
      "A revision timetable works best as a loose structure that keeps revision moving in the right direction — not a rigid schedule that causes stress the moment it's not followed exactly. Here's a practical way to build one for GCSE Maths.",
    ],
    sections: [
      {
        heading: "How far out to start",
        body: [
          "Ideally, focused GCSE Maths revision starts a few months before the exam — enough time for topics to be revisited more than once, without the whole thing being crammed into the final weeks. That said, it's genuinely never too late to start something more focused; even a few structured weeks are better than none.",
        ],
      },
      {
        heading: "Structuring the weeks",
        body: [
          "A useful weekly structure alternates between topic-focused sessions (working through one weak area properly) and mixed-practice sessions (a timed set of exam-style questions across several topics). Building in one lighter or rest day each week also makes the plan realistic to actually stick to.",
        ],
      },
      {
        heading: "Weighting time towards weak topics",
        body: [
          "A simple, effective approach: after an initial past paper or mock, list out topics by how many marks were lost on each, and weight revision time roughly in proportion — spending more sessions on the weakest 3–4 topics, with lighter, occasional review of stronger ones.",
        ],
      },
      {
        heading: "A sample structure to adapt",
        body: [
          "Weeks 1–4: topic-by-topic revision of the weakest areas, one or two topics per session. Weeks 5–8: alternate topic revision with full timed past papers, reviewed properly afterwards. Final 2 weeks: mostly timed past papers and exam technique, with brief, targeted review of anything still shaky.",
        ],
      },
    ],
    faqs: [
      {
        q: "Should revision time be split evenly across all topics?",
        a: "No — weighting time towards weaker topics, based on where marks are actually being lost, is far more effective than splitting time evenly regardless of strength.",
      },
      {
        q: "What if the timetable slips?",
        a: "That's normal and doesn't undo the plan — the point of a timetable is direction, not perfection. Adjusting and continuing matters far more than trying to catch up on everything missed.",
      },
      {
        q: "How do mock exams fit into a revision timetable?",
        a: "Mock exams are useful checkpoints — they show where things stand and help re-weight the remaining revision time towards whatever the mock revealed as weak.",
      },
    ],
    relatedGuideSlugs: ["gcse-maths-revision-techniques", "grade-3-to-grade-4-gcse-maths"],
    relatedProgrammeSlug: "gcse-maths-higher-tutor",
    relatedProgrammeLabel: "See our GCSE Maths tutoring",
  },
  {
    slug: "common-gcse-maths-mistakes",
    category: "GCSE",
    navLabel: "Common GCSE Maths Mistakes",
    metaTitle: "Common GCSE Maths Mistakes (and Fixes) | BrightLearn",
    metaDescription:
      "The most common mistakes GCSE Maths students make in exams — misreading questions, rounding errors, calculator mistakes — and how to avoid each one.",
    h1: "Common GCSE Maths mistakes",
    h1Accent: "and how to avoid them.",
    tagline: "A lot of lost marks have nothing to do with not knowing the maths.",
    intro: [
      "A meaningful chunk of marks lost in GCSE Maths exams come from avoidable mistakes, not gaps in understanding. Recognising these patterns is often a faster win than more revision — here are the ones that come up again and again.",
    ],
    sections: [
      {
        heading: "Misreading the question",
        body: [
          "Under exam pressure, it's easy to answer the question a student expected rather than the one actually asked — for example, finding a value rather than proving a statement, or missing a specific unit the question asks for. Reading the question twice, and underlining exactly what's being asked, catches most of these before they happen.",
        ],
      },
      {
        heading: "Not showing working",
        body: [
          "GCSE Maths papers award method marks for correct working, even when the final answer is wrong. Students who jump straight to an answer — especially on calculator questions — often lose marks that clear working would have earned, even with an arithmetic slip along the way.",
        ],
      },
      {
        heading: "Calculator and rounding errors",
        body: [
          "Rounding too early in a multi-step calculation is one of the most common ways students lose marks on otherwise correct working — small rounding errors compound across steps. The fix is simple: carry exact values (or extra decimal places) through the working, and only round the final answer, to the accuracy the question asks for.",
        ],
      },
      {
        heading: "Running out of time",
        body: [
          "Spending too long on one difficult question, at the cost of not attempting easier questions later in the paper, is a common and avoidable source of lost marks. A rough rule of thumb — roughly a minute per mark — helps students notice when to move on and come back later if time allows.",
        ],
      },
      {
        heading: "Not checking answers",
        body: [
          "A quick sanity check — does this answer make sense given the question? — catches a surprising number of errors, like a percentage above 100% or a negative length. Building in a few minutes at the end of a paper specifically for this kind of check is time well spent.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do method marks really matter if the final answer is right?",
        a: "If the final answer is fully correct, method marks are usually less critical — but if there's any error anywhere in the working, clearly shown method is often the only way to still pick up partial credit.",
      },
      {
        q: "How much time should be spent on each question in a GCSE Maths exam?",
        a: "A common guide is roughly one minute per mark — so a 4-mark question is worth around 4 minutes. It's a rough guide, not a strict rule, but it helps flag when a question is taking longer than it should.",
      },
      {
        q: "Is it worth attempting a question even if unsure how to start?",
        a: "Yes — writing down any relevant formula, partial working, or a sensible estimate can still pick up marks, and it's almost always better than leaving a question blank.",
      },
    ],
    relatedGuideSlugs: ["gcse-maths-revision-techniques", "grade-3-to-grade-4-gcse-maths"],
    relatedProgrammeSlug: "gcse-maths-foundation-tutor",
    relatedProgrammeLabel: "See our GCSE Maths tutoring",
  },
  {
    slug: "preparing-for-gcse-maths-in-year-9",
    category: "KS3",
    navLabel: "Preparing for GCSE Maths in Year 9",
    metaTitle: "Preparing for GCSE Maths in Year 9 | BrightLearn",
    metaDescription:
      "Why Year 9 is a key year for GCSE Maths preparation, and what to focus on to build a strong foundation before the GCSE course begins.",
    h1: "Preparing for GCSE Maths",
    h1Accent: "in Year 9.",
    tagline: "The year before GCSE courses start is often the most overlooked.",
    intro: [
      "Year 9 doesn't feel exam-focused the way Year 10 and 11 do, which is exactly why it's such a useful year to get right — the maths foundations built here directly shape how manageable GCSE Maths feels once the course properly begins.",
    ],
    sections: [
      {
        heading: "Why Year 9 matters more than it seems",
        body: [
          "Many schools begin teaching GCSE content — or content that GCSE builds directly on — during Year 9, even before the course is formally badged as \"GCSE.\" A student who's shaky on Year 9 topics often finds Year 10 harder than it needs to be, not because GCSE maths is especially difficult, but because the gaps compound.",
        ],
      },
      {
        heading: "Bridging KS3 to GCSE content",
        body: [
          "The jump from KS3 to GCSE maths is really a jump in depth, not an entirely new subject — algebra, ratio, geometry and statistics from KS3 all reappear at GCSE, just with more steps and more application. Solidifying these topics in Year 9, rather than assuming they'll \"click\" once GCSE starts, makes the transition far smoother.",
        ],
      },
      {
        heading: "Early signals about Foundation or Higher tier",
        body: [
          "While formal tier decisions come later, Year 9 performance often gives an early, honest signal of which tier a student is likely to be working towards — useful information for deciding where extra support might help most, well before it becomes exam-critical.",
        ],
      },
      {
        heading: "What to actually focus on",
        body: [
          "Algebraic manipulation, ratio and proportion, and basic geometry are worth particular attention in Year 9, since they underpin a large share of GCSE content across both tiers. Building genuine fluency here — not just familiarity — pays off across the whole GCSE course.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is Year 9 too early to start thinking about GCSE Maths?",
        a: "No — it's actually a good time, since there's less exam pressure but the content is already closely related to GCSE. Building strong foundations now tends to make Years 10 and 11 noticeably less stressful.",
      },
      {
        q: "What if a Year 9 student is already behind?",
        a: "Year 9 is a good time to catch up precisely because there's less time pressure than in Years 10 and 11 — closing gaps now is usually far more manageable than trying to do it alongside GCSE exam preparation later.",
      },
      {
        q: "Does every school teach the same content in Year 9?",
        a: "Schools vary in exactly when they start GCSE-linked content, but the core KS3 topics — algebra, ratio, geometry, negative numbers — are broadly consistent, and are exactly what's worth being confident in regardless of a school's specific sequencing.",
      },
    ],
    relatedGuideSlugs: ["important-year-7-9-maths-topics", "gcse-maths-foundation-vs-higher"],
    relatedProgrammeSlug: "year-7-9-maths-support",
    relatedProgrammeLabel: "See our KS3 maths tutoring",
  },
  {
    slug: "important-year-7-9-maths-topics",
    category: "KS3",
    navLabel: "Important Year 7–9 Maths Topics",
    metaTitle: "Important Year 7–9 Maths Topics | BrightLearn",
    metaDescription:
      "The Year 7–9 maths topics that matter most for a strong foundation and a smoother move into GCSE — algebra, ratio, geometry and more.",
    h1: "Important Year 7–9",
    h1Accent: "maths topics.",
    tagline: "The KS3 topics that quietly shape how GCSE feels later.",
    intro: [
      "Not every Year 7–9 maths topic carries equal weight for what comes later — some are genuinely foundational, reappearing constantly at GCSE, while others are more self-contained. Here are the ones worth prioritising if a student's time or confidence is limited.",
    ],
    sections: [
      {
        heading: "Algebra foundations",
        body: [
          "Expanding brackets, factorising, and solving simple equations are used constantly across GCSE Maths, well beyond the topics explicitly labelled \"algebra.\" A shaky grasp here makes a wide range of later topics — from geometry problems to graph questions — harder than they need to be.",
        ],
      },
      {
        heading: "Ratio and proportion",
        body: [
          "Ratio, proportion and percentages appear throughout GCSE Maths in disguised forms — scale drawings, speed/distance/time, compound interest, similar shapes — even when a question doesn't explicitly say \"ratio.\" Genuine fluency here, rather than just knowing the formula, pays off repeatedly.",
        ],
      },
      {
        heading: "Geometry and angle facts",
        body: [
          "Angle rules, properties of shapes, and basic geometric reasoning form the base that GCSE topics like trigonometry, circle theorems and geometric proof are built on. Students who are secure in KS3 geometry generally find these later topics far more approachable.",
        ],
      },
      {
        heading: "Negative numbers, fractions and standard form",
        body: [
          "These come up as small steps inside much bigger GCSE questions, so a slip here can derail an otherwise correct method. Because they're rarely the headline topic of a question, gaps in this area are easy to miss until they start costing marks in unrelated-seeming questions.",
        ],
      },
    ],
    faqs: [
      {
        q: "Which Year 7–9 topic causes the most problems later at GCSE?",
        a: "Algebra tends to cause the widest-reaching problems, since it underpins so much other content — a student uncomfortable with basic algebraic manipulation will find that gap resurfacing across many unrelated GCSE topics.",
      },
      {
        q: "How can a parent check if their child has genuinely understood a KS3 topic?",
        a: "Asking them to explain it back in their own words, or to solve a similar problem without help, is usually more revealing than checking whether homework was completed — genuine understanding shows up in explanation, not just correct answers.",
      },
      {
        q: "Should Year 7–9 students already be doing exam-style questions?",
        a: "Not necessarily formal GCSE-style papers, but working on multi-step problems that combine more than one topic is good preparation for the kind of joined-up thinking GCSE questions require later.",
      },
    ],
    relatedGuideSlugs: ["preparing-for-gcse-maths-in-year-9"],
    relatedProgrammeSlug: "year-7-9-maths-support",
    relatedProgrammeLabel: "See our KS3 maths tutoring",
  },
  {
    slug: "sats-maths-revision",
    category: "KS2",
    navLabel: "SATs Maths Revision Guide",
    metaTitle: "SATs Maths Revision Guide | BrightLearn",
    metaDescription:
      "How to approach SATs Maths revision for Year 6 — what the papers cover, when they happen, and how to revise without adding to exam stress.",
    h1: "SATs Maths",
    h1Accent: "revision guide.",
    tagline: "A calm, practical approach to Year 6 SATs preparation.",
    intro: [
      "SATs are often a child's first real experience of formal exams, which makes how they're approached at home just as important as the revision content itself. Here's what the maths papers actually cover, and how to prepare without adding unnecessary pressure.",
    ],
    sections: [
      {
        heading: "What the KS2 Maths SATs cover",
        body: [
          "Year 6 SATs Maths is split into an arithmetic paper (calculation-based, testing core number skills directly) and two reasoning papers (word problems and multi-step questions that require applying those skills). Strong performance needs both solid calculation fluency and the ability to work out what a worded question is actually asking.",
        ],
      },
      {
        heading: "When SATs happen",
        body: [
          "KS2 SATs take place in mid-May of Year 6, with schools generally beginning more focused preparation from the spring term — though the groundwork (times tables fluency, core number skills) really builds over the whole of Year 5 and 6.",
        ],
      },
      {
        heading: "How to revise effectively",
        body: [
          "Short, regular practice — a bit of arithmetic practice and a couple of reasoning questions a few times a week — tends to work better for this age group than long, infrequent revision sessions. Times tables fluency in particular is worth prioritising, since it underpins speed and confidence across both papers.",
        ],
      },
      {
        heading: "Reducing exam stress",
        body: [
          "For most Year 6 children, managing nerves matters as much as the maths itself. Keeping the tone at home calm and matter-of-fact, doing a few practice papers under relaxed, low-pressure conditions, and avoiding language that makes SATs sound unusually high-stakes all help keep a child's confidence intact.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do SATs results affect secondary school placement?",
        a: "SATs results are generally used by schools to understand a child's starting point, but they don't determine which secondary school a child attends in most areas — that's typically based on separate admissions processes. It's worth checking your specific local authority's approach if unsure.",
      },
      {
        q: "How much revision is appropriate for a Year 6 child?",
        a: "Short, regular sessions — perhaps 20–30 minutes, a few times a week — are usually more effective and sustainable than long sessions, and far less likely to cause SATs-related stress or burnout.",
      },
      {
        q: "What if a child is anxious about SATs?",
        a: "Keeping the framing low-key at home, focusing conversations on effort and progress rather than the test itself, and doing some relaxed practice under exam-style conditions in advance all help reduce anxiety when the real thing arrives.",
      },
    ],
    relatedGuideSlugs: ["supporting-your-child-with-ks2-maths"],
    relatedProgrammeSlug: "ks2-maths-confidence-sats-preparation",
    relatedProgrammeLabel: "See our KS2 maths & SATs tutoring",
  },
  {
    slug: "supporting-your-child-with-ks2-maths",
    category: "KS2",
    navLabel: "Supporting Your Child with KS2 Maths",
    metaTitle: "Supporting Your Child with KS2 Maths | BrightLearn",
    metaDescription:
      "Practical ways to support a Year 3–6 child with maths at home — building confidence, times tables, and knowing when extra help might be useful.",
    h1: "Supporting your child",
    h1Accent: "with KS2 maths.",
    tagline: "Small, consistent support at home makes a real difference.",
    intro: [
      "You don't need to be confident with maths yourself to genuinely help a KS2 child with it — often the most useful thing a parent can do is build confidence and consistency, rather than reteach the exact method a school uses.",
    ],
    sections: [
      {
        heading: "Confidence matters as much as correct answers",
        body: [
          "A child who believes they're \"just not a maths person\" often disengages long before the maths itself becomes genuinely difficult. Praising effort and problem-solving attempts — not just correct answers — helps keep a child willing to try, which matters more than getting every question right.",
        ],
      },
      {
        heading: "Times tables and mental maths",
        body: [
          "Fluency with times tables and basic mental maths makes almost everything else in KS2 maths easier, since it frees up attention for the actual problem rather than the arithmetic underneath it. Short, regular practice — a few minutes most days — beats occasional longer sessions.",
        ],
      },
      {
        heading: "Making maths part of daily life",
        body: [
          "Everyday moments — splitting a bill, doubling a recipe, working out change, reading a bus timetable — are genuine, low-pressure maths practice that don't feel like \"homework.\" This kind of informal exposure builds number sense in a way that worksheets alone don't.",
        ],
      },
      {
        heading: "Knowing when to get extra support",
        body: [
          "If a child consistently avoids maths homework, seems to \"just guess\" rather than reason through problems, or has fallen noticeably behind classmates, it's usually worth a conversation with the school and, if needed, some focused extra support — catching a gap early is far easier than closing it later.",
        ],
      },
      {
        heading: "Working with the school, not around it",
        body: [
          "Asking the teacher what methods the school currently uses (for example, for column addition or division) avoids confusing a child with a different approach at home. Most schools are happy to share this, and it makes any extra help at home line up with what's taught in class.",
        ],
      },
    ],
    faqs: [
      {
        q: "How much should a parent help with maths homework?",
        a: "Enough to unblock genuine confusion, without doing the thinking for them — asking guiding questions (\"what do you know already?\", \"what's the first step?\") tends to build more understanding than giving the answer directly.",
      },
      {
        q: "What if a parent isn't confident with maths themselves?",
        a: "That's genuinely fine — the most valuable support is often encouragement, consistency, and creating low-pressure opportunities to practise, rather than personally being able to explain every method. Extra tutoring can fill in the maths-specific teaching where needed.",
      },
      {
        q: "Is it normal for KS2 maths confidence to dip around Year 4 or 5?",
        a: "Yes — this is a common point where content gets noticeably more abstract (fractions, decimals, more complex problem solving), and a temporary confidence dip is common. Steady, encouraging support through this stage usually resolves it.",
      },
    ],
    relatedGuideSlugs: ["sats-maths-revision"],
    relatedProgrammeSlug: "ks2-maths-confidence-sats-preparation",
    relatedProgrammeLabel: "See our KS2 maths & SATs tutoring",
  },
];

export const findGuide = (slug: string) => guides.find((g) => g.slug === slug);

export const CATEGORY_LABELS: Record<GuideCategory, string> = {
  GCSE: "GCSE Maths",
  KS3: "KS3 Maths (Years 7–9)",
  KS2: "KS2 Maths (Years 3–6)",
};
