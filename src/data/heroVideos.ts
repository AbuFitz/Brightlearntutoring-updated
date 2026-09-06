import thumb1 from "@/assets/tiktok-thumb-1.webp";
import thumb2 from "@/assets/tiktok-thumb-2.webp";
import thumb3 from "@/assets/tiktok-thumb-3.webp";

export interface HeroVideo {
  id: string;
  /** Short uppercase label shown on the card */
  topic: string;
  /** Full sentence used for accessible labels (aria-label, alt text) */
  title: string;
  poster: string;
  /**
   * Local video sources, ordered webm-first so browsers that support it use
   * the smaller file. These paths don't exist yet — see the hero video
   * README note for the exact files to add.
   */
  sources: { src: string; type: string }[];
}

/**
 * Data-driven hero video config. Reorder this array to change which clip
 * plays first/centred — no component changes needed. Real local video
 * files are not yet present in the repo (see report); `poster` currently
 * reuses the existing TikTok thumbnail stills as placeholders.
 */
export const heroVideos: HeroVideo[] = [
  {
    id: "solving-equations",
    topic: "Solving equations",
    title: "Solving equations, explained step by step",
    poster: thumb3,
    sources: [
      { src: "/videos/hero/solving-equations.webm", type: "video/webm" },
      { src: "/videos/hero/solving-equations.mp4", type: "video/mp4" },
    ],
  },
  {
    id: "simultaneous-equations",
    topic: "Simultaneous equations",
    title: "Simultaneous equations made easy",
    poster: thumb1,
    sources: [
      { src: "/videos/hero/simultaneous-equations.webm", type: "video/webm" },
      { src: "/videos/hero/simultaneous-equations.mp4", type: "video/mp4" },
    ],
  },
  {
    id: "angles-made-simple",
    topic: "Angles made simple",
    title: "Angles made simple",
    poster: thumb2,
    sources: [
      { src: "/videos/hero/angles-made-simple.webm", type: "video/webm" },
      { src: "/videos/hero/angles-made-simple.mp4", type: "video/mp4" },
    ],
  },
];
