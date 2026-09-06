import thumb1 from "@/assets/tiktok-thumb-1.webp";
import thumb2 from "@/assets/tiktok-thumb-2.webp";
import thumb3 from "@/assets/tiktok-thumb-3.webp";

/**
 * Real BrightLearn YouTube Shorts featured in the homepage hero showcase.
 * IDs/titles/descriptions are pulled from the same source as the /blog
 * page (src/data/videos.ts) — nothing here is invented. Posters reuse the
 * existing TikTok snapshot stills for the same real lessons (also used in
 * TikTokFeed.tsx) since they're local assets that don't depend on a
 * third-party thumbnail request. Reorder this array to change which clip
 * is centred first; no component changes needed.
 */
export interface HeroVideo {
  id: string;
  /** Short label shown on the card */
  topic: string;
  title: string;
  description: string;
  poster: string;
}

export const heroVideos: HeroVideo[] = [
  {
    id: "66N7u6j6g2Q",
    topic: "Simultaneous equations",
    title: "Simultaneous equations",
    description: "A step-by-step example solving simultaneous equations for GCSE Maths.",
    poster: thumb1,
  },
  {
    id: "hz5kv5lpxQI",
    topic: "Decimals to percentages",
    title: "Decimals to percentages",
    description: "A quick method for converting decimals to percentages.",
    poster: thumb3,
  },
  {
    id: "AbqQOT5Ng-Q",
    topic: "Basic trigonometry",
    title: "Basic trigonometry",
    description: "An introduction to basic trigonometry for GCSE Maths.",
    poster: thumb2,
  },
];
