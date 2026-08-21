import type { Package } from "@/contexts/GetStartedContext";

export type SessionType = "group" | "1on1";

export interface GroupPlan {
  price: number;
  sessionLength: string;
  sessionsPerMonth: number;
  features: string[];
}

export interface OneToOnePlan {
  singleLessonPrice: number;
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

export const MAX_GROUP_SIZE = 5;

/**
 * Single source of truth for pricing. Every price shown anywhere on the
 * site (homepage, pricing modal, programme details, forms, structured
 * data) reads from here — nowhere else should hardcode a £ amount.
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
        "Group of 5 lesson (1 hour)",
        "4 sessions per month",
        "Custom learning plan",
        "Parent report",
        "End of term assessment",
      ],
    },
    oneToOne: {
      singleLessonPrice: 25,
      monthlyPrice: 80,
      sessionLength: "1 hour",
      sessionsPerMonth: 4,
      features: [
        "1-on-1 lesson (1 hour)",
        "4 sessions per month",
        "Fully personalised plan",
        "Parent report",
        "End of term assessment",
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
        "Group of 5 lesson (1.5 hours)",
        "8 sessions per month",
        "Custom learning plan",
        "Parent report",
        "End of term assessment",
        "End of topic assessment",
      ],
    },
    oneToOne: {
      singleLessonPrice: 30,
      monthlyPrice: 100,
      sessionLength: "1 hour",
      sessionsPerMonth: 4,
      features: [
        "1-on-1 lesson (1 hour)",
        "4 sessions per month",
        "Fully personalised plan",
        "Parent report",
        "End of topic assessment",
      ],
    },
  },
  {
    name: "GCSE",
    ageTag: "Ages 14–16",
    desc: "Personalised revision strategies designed to improve grades and confidence.",
    group: {
      price: 100,
      sessionLength: "1.5 hours",
      sessionsPerMonth: 8,
      features: [
        "Group of 5 lesson (1.5 hours)",
        "8 sessions per month",
        "Custom learning plan",
        "Parent report",
        "Past paper sessions",
        "Mock exam support",
      ],
    },
    oneToOne: {
      singleLessonPrice: 35,
      monthlyPrice: 120,
      sessionLength: "1 hour",
      sessionsPerMonth: 4,
      features: [
        "1-on-1 lesson (1 hour)",
        "4 sessions per month",
        "Fully personalised plan",
        "Parent report",
        "Past paper sessions",
      ],
    },
  },
];

export const getTier = (name: Package) => pricingTiers.find((t) => t.name === name);

export const sessionLabel = (type: SessionType) => (type === "1on1" ? "1-on-1" : "Group of 5");
