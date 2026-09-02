export interface VideoPost {
  id: string;
  title: string;
  description: string;
  publishedDate: string;
}

/**
 * Real posts from BrightLearn Tutoring's YouTube channel (Shorts), pulled
 * from the channel's own RSS feed. Titles are lightly cleaned of trailing
 * hashtags for readability; descriptions are written in-house to summarise
 * each video honestly — nothing here is invented.
 */
export const videos: VideoPost[] = [
  {
    id: "mxobqcM4aM8",
    title: "DM me or comment!",
    description: "A quick invite to ask maths questions directly — DM or comment for help.",
    publishedDate: "2026-08-13",
  },
  {
    id: "mbrSR5yz8i4",
    title: "Angles with algebra",
    description: "A worked example combining angle facts with algebra — a common GCSE Maths question type.",
    publishedDate: "2026-05-04",
  },
  {
    id: "ex01GkTHmAk",
    title: "Division",
    description: "A quick walkthrough of a division method for GCSE Maths.",
    publishedDate: "2026-05-04",
  },
  {
    id: "66N7u6j6g2Q",
    title: "Simultaneous equations",
    description: "A step-by-step example solving simultaneous equations for GCSE Maths.",
    publishedDate: "2026-05-04",
  },
  {
    id: "AbqQOT5Ng-Q",
    title: "Basic trigonometry",
    description: "An introduction to basic trigonometry for GCSE Maths.",
    publishedDate: "2026-05-02",
  },
  {
    id: "MG9jMKojkVE",
    title: "Unit conversion mnemonic",
    description: "A memorable way to keep unit conversions straight in GCSE Maths.",
    publishedDate: "2026-05-02",
  },
  {
    id: "NwEzjrF6NGE",
    title: "Foundation worded problem",
    description: "A worked GCSE Maths Foundation-tier worded problem, step by step.",
    publishedDate: "2026-04-18",
  },
  {
    id: "9xeNeHBc0Qc",
    title: "Percentages to fractions",
    description: "A quick method for converting percentages to fractions.",
    publishedDate: "2026-04-17",
  },
  {
    id: "qmuQ0Xv6wNA",
    title: "Percentages to decimals",
    description: "A quick method for converting percentages to decimals.",
    publishedDate: "2026-04-17",
  },
  {
    id: "hz5kv5lpxQI",
    title: "Decimals to percentages",
    description: "A quick method for converting decimals to percentages.",
    publishedDate: "2026-04-17",
  },
  {
    id: "xle66r3HbIY",
    title: "Straight-line graphs",
    description: "A closer look at straight-line graphs for GCSE Maths.",
    publishedDate: "2026-04-16",
  },
  {
    id: "jamp-Nb2fb0",
    title: "Did you get these correct?",
    description: "A set of GCSE Maths practice questions to test yourself against.",
    publishedDate: "2026-04-16",
  },
  {
    id: "CqcheTXfFj4",
    title: "Rearranging formulae, part 2",
    description: "Part two of a walkthrough on rearranging formulae for GCSE Maths.",
    publishedDate: "2026-04-16",
  },
  {
    id: "2owdJxg3rbE",
    title: "More examples coming up",
    description: "More GCSE Maths worked examples on the way from BrightLearn Tutoring.",
    publishedDate: "2026-04-16",
  },
  {
    id: "-tfn0VaxV20",
    title: "Follow for simple maths explanations",
    description: "An introduction to the channel — simple GCSE Maths explanations and support, including Pythagoras' theorem for Year 11 students.",
    publishedDate: "2026-04-15",
  },
];

export const findVideo = (id: string) => videos.find((v) => v.id === id);
