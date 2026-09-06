/**
 * Real BrightLearn YouTube Shorts featured in the homepage hero showcase.
 * IDs/titles/descriptions are pulled from the same source as the /blog
 * page (src/data/videos.ts) — nothing here is invented. Reorder this
 * array to change which clip is centred first; no component changes
 * needed.
 */
export interface HeroVideo {
  id: string;
  /** Short label shown on the card */
  topic: string;
  title: string;
  description: string;
}

export const heroVideos: HeroVideo[] = [
  {
    id: "66N7u6j6g2Q",
    topic: "Simultaneous equations",
    title: "Simultaneous equations",
    description: "A step-by-step example solving simultaneous equations for GCSE Maths.",
  },
  {
    id: "mbrSR5yz8i4",
    topic: "Angles with algebra",
    title: "Angles with algebra",
    description: "A worked example combining angle facts with algebra — a common GCSE Maths question type.",
  },
  {
    id: "AbqQOT5Ng-Q",
    topic: "Basic trigonometry",
    title: "Basic trigonometry",
    description: "An introduction to basic trigonometry for GCSE Maths.",
  },
];

export const heroVideoThumbnail = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
