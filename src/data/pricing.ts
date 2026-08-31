import type { Package } from "@/contexts/GetStartedContext";

export type SessionType = "group" | "1on1";

/** Every standard lesson is 60 minutes — group and 1-on-1 alike. */
export const LESSON_LENGTH = "60 minutes";

/** Group and 1-on-1 packages both run as 4-lesson blocks — not a monthly subscription. */
export const PACKAGE_LESSON_COUNT = 4;

export const MAX_GROUP_SIZE = 5;

export interface GroupPlan {
  /** Total price for the 4-lesson package. */
  price: number;
  sessionLength: string;
  sessionsPerMonth: number;
  features: string[];
}

export interface OneToOnePlan {
  /** Pay-as-you-go price for a single lesson. */
  singleLessonPrice: number;
  /** Total price for the 4-lesson package. */
  monthlyPrice: number;
  sessionLength: string;
  sessionsPerMonth: number;
  features: string[];
}

export interface TierPricing {
  name: Exclude<Package, "">;
  ageTag: string;
  desc: string;
  group: GroupPlan;
  oneToOne: OneToOnePlan;
}

/**
 * Single source of truth for pricing. Every price shown anywhere on the
 * site (homepage, pricing modal, programme details, forms, structured
 * data) reads from here — nowhere else should hardcode a £ amount.
 *
 * All lessons are 60 minutes. Packages are 4 lessons, sold as a flat
 * one-off price — not a recurring subscription, so avoid "/month" in
 * any display copy. GCSE pricing covers Foundation, Higher and resit
 * tutoring alike; there are no separate tier prices.
 */
export const pricingTiers: TierPricing[] = [
  {
    name: "KS2",
    ageTag: "Ages 7–11",
    desc: "Fun, structured maths support building strong foundations for SATs.",
    group: {
      price: 40,
      sessionLength: LESSON_LENGTH,
      sessionsPerMonth: 4,
      features: [
        "Group of 5, 60-minute lessons",
        "4 lessons per package",
        "Custom learning plan",
        "Parent report",
        "Progress review after every package",
      ],
    },
    oneToOne: {
      singleLessonPrice: 25,
      monthlyPrice: 80,
      sessionLength: LESSON_LENGTH,
      sessionsPerMonth: 4,
      features: [
        "1-on-1, 60-minute lessons",
        "4 lessons per package",
        "Fully personalised plan",
        "Parent report",
        "Progress review after every package",
      ],
    },
  },
  {
    name: "KS3",
    ageTag: "Ages 11–14",
    desc: "Targeted support covering core topics, building towards GCSE.",
    group: {
      price: 50,
      sessionLength: LESSON_LENGTH,
      sessionsPerMonth: 4,
      features: [
        "Group of 5, 60-minute lessons",
        "4 lessons per package",
        "Custom learning plan",
        "Parent report",
        "Progress review after every package",
      ],
    },
    oneToOne: {
      singleLessonPrice: 30,
      monthlyPrice: 100,
      sessionLength: LESSON_LENGTH,
      sessionsPerMonth: 4,
      features: [
        "1-on-1, 60-minute lessons",
        "4 lessons per package",
        "Fully personalised plan",
        "Parent report",
        "Progress review after every package",
      ],
    },
  },
  {
    name: "GCSE",
    ageTag: "Ages 14–16",
    desc: "Personalised revision strategies for Foundation, Higher and resits — designed to improve grades and confidence.",
    group: {
      price: 60,
      sessionLength: LESSON_LENGTH,
      sessionsPerMonth: 4,
      features: [
        "Group of 5, 60-minute lessons",
        "4 lessons per package",
        "Custom learning plan",
        "Parent report",
        "Past paper practice",
      ],
    },
    oneToOne: {
      singleLessonPrice: 35,
      monthlyPrice: 120,
      sessionLength: LESSON_LENGTH,
      sessionsPerMonth: 4,
      features: [
        "1-on-1, 60-minute lessons",
        "4 lessons per package",
        "Fully personalised plan",
        "Parent report",
        "Past paper practice",
      ],
    },
  },
];

export const getTier = (name: Package) => pricingTiers.find((t) => t.name === name);
export const sessionLabel = (type: SessionType) => (type === "1on1" ? "1-on-1" : "Group of 5");
export const fmtPrice = (n: number) => (Number.isInteger(n) ? `£${n}` : `£${n.toFixed(2)}`);
