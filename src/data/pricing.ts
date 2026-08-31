import type { Package } from "@/contexts/GetStartedContext";

export type SessionType = "group" | "1on1";

export const MAX_GROUP_SIZE = 5;

export interface GroupPlan {
  /** Total monthly price for the package. */
  price: number;
  sessionLength: string;
  sessionsPerMonth: number;
  features: string[];
}

export interface OneToOnePlan {
  /** Pay-as-you-go price for a single lesson. */
  singleLessonPrice: number;
  /** Total monthly price for the package. */
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
 * Pricing is monthly, not a flat one-off package — only the monthly
 * total should be shown in the UI (not a per-lesson breakdown, to avoid
 * confusion). Session length and lesson count per month vary by level.
 * GCSE pricing covers Foundation, Higher and resit tutoring alike;
 * there are no separate tier prices.
 */
export const pricingTiers: TierPricing[] = [
  {
    name: "KS2",
    ageTag: "Ages 7–11",
    desc: "Fun, structured maths support building strong foundations for SATs.",
    group: {
      price: 40,
      sessionLength: "1 hour",
      sessionsPerMonth: 4,
      features: [
        "Group of 5, 1-hour lessons",
        "4 lessons a month",
        "Custom learning plan",
        "Parent report",
        "Monthly progress review",
      ],
    },
    oneToOne: {
      singleLessonPrice: 15,
      monthlyPrice: 60,
      sessionLength: "1 hour",
      sessionsPerMonth: 4,
      features: [
        "1-on-1, 1-hour lessons",
        "4 lessons a month",
        "Fully personalised plan",
        "Parent report",
        "Monthly progress review",
      ],
    },
  },
  {
    name: "KS3",
    ageTag: "Ages 11–14",
    desc: "Targeted support covering core topics, building towards GCSE.",
    group: {
      price: 90,
      sessionLength: "1.5 hours",
      sessionsPerMonth: 8,
      features: [
        "Group of 5, 1.5-hour lessons",
        "8 lessons a month",
        "Custom learning plan",
        "Parent report",
        "Monthly progress review",
      ],
    },
    oneToOne: {
      singleLessonPrice: 15,
      monthlyPrice: 120,
      sessionLength: "1.5 hours",
      sessionsPerMonth: 8,
      features: [
        "1-on-1, 1.5-hour lessons",
        "8 lessons a month",
        "Fully personalised plan",
        "Parent report",
        "Monthly progress review",
      ],
    },
  },
  {
    name: "GCSE",
    ageTag: "Ages 14–16",
    desc: "Personalised revision strategies for Foundation, Higher and resits — designed to improve grades and confidence.",
    group: {
      price: 100,
      sessionLength: "1.5 hours",
      sessionsPerMonth: 8,
      features: [
        "Group of 5, 1.5-hour lessons",
        "8 lessons a month",
        "Custom learning plan",
        "Parent report",
        "Past paper practice",
      ],
    },
    oneToOne: {
      singleLessonPrice: 17.5,
      monthlyPrice: 140,
      sessionLength: "1.5 hours",
      sessionsPerMonth: 8,
      features: [
        "1-on-1, 1.5-hour lessons",
        "8 lessons a month",
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
