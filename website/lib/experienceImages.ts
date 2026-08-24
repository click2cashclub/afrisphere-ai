const experienceImages: Record<string, string> = {
  // Zambezi / Victoria Falls
  "Zambezi River Sunset Cruise":
    "/images/experiences/zambezi-sunset-cruise/hero.jpg",

  "Upper Zambezi Sunset Cruise":
    "/images/experiences/zambezi-sunset-cruise/hero.jpg",

  "Zambezi Sunset Experience":
    "/images/experiences/zambezi-sunset-cruise/hero.jpg",

  // Victoria Falls walking
  "Victoria Falls Guided Walking Tour":
    "/images/experiences/victoria-falls-guided-walking-tour/hero.jpg",

  "Victoria Falls Rainforest Guided Walk":
    "/images/experiences/victoria-falls-guided-walking-tour/hero.jpg",

  "Victoria Falls Rainforest Tour":
    "/images/experiences/victoria-falls-guided-walking-tour/hero.jpg",

  "Victoria Falls Rainforest Walking Tour":
    "/images/experiences/victoria-falls-guided-walking-tour/hero.jpg",

  // Local culture / markets
  "Elephant's Walk Shopping & Artist Village":
    "/images/experiences/local-artisan-market-visit/hero.jpg",

  "Local Artisan Market Visit":
    "/images/experiences/local-artisan-market-visit/hero.jpg",

  // Hwange game drives
  "Hwange Open-Vehicle Game Drive":
    "/images/experiences/hwange-open-4x4-game-drives/hero.jpg",

  "Hwange Open-Vehicle Game Drives":
    "/images/experiences/hwange-open-4x4-game-drives/hero.jpg",

  "Hwange Wildlife Game Drives & Hide Viewing":
    "/images/experiences/hwange-open-4x4-game-drives/hero.jpg",

  "Hwange 4x4 Game Drives":
    "/images/experiences/hwange-open-4x4-game-drives/hero.jpg",

  // Walking safari
  "Guided Walking Safari":
    "/images/experiences/guided-walking-safari/hero.jpg",

  "Guided Bush Walking Safari":
    "/images/experiences/guided-walking-safari/hero.jpg",
};

export function getExperienceImage(name: string): string {
  const exactMatch = experienceImages[name];

  if (exactMatch) {
    return exactMatch;
  }

  const normalized = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

  /*
   * Same ordering principle as getExperienceDetails: check specific
   * activity words before broad geographic ones like "zambezi" or
   * "victoria falls", which appear in the names of many unrelated
   * experience types.
   */

  if (
    normalized.includes("artisan") ||
    normalized.includes("market") ||
    normalized.includes("elephant walk")
  ) {
    return "/images/experiences/local-artisan-market-visit/hero.jpg";
  }

  if (
    normalized.includes("hwange") &&
    (normalized.includes("game drive") ||
      normalized.includes("4x4") ||
      normalized.includes("wildlife"))
  ) {
    return "/images/experiences/hwange-open-4x4-game-drives/hero.jpg";
  }

  if (
    normalized.includes("walking safari") ||
    normalized.includes("bush walking")
  ) {
    return "/images/experiences/guided-walking-safari/hero.jpg";
  }

  if (
    normalized.includes("zambezi") &&
    (normalized.includes("sunset") ||
      normalized.includes("cruise"))
  ) {
    return "/images/experiences/zambezi-sunset-cruise/hero.jpg";
  }

  if (
    normalized.includes("victoria falls") &&
    (normalized.includes("rainforest") ||
      normalized.includes("walking") ||
      normalized.includes("walk"))
  ) {
    return "/images/experiences/victoria-falls-guided-walking-tour/hero.jpg";
  }

  /*
   * NO REAL PHOTO EXISTS for these experience types as of this build:
   * bridge crossings, gorge swing/zipline/bungee/canopy tour, rafting,
   * helicopter flights, canoeing, hiking, and food/cuisine experiences.
   * getExperienceDetails() (app/experience/[name]/page.tsx) now
   * recognizes all of these as distinct experience types with accurate
   * text content, but there is no matching photo asset in
   * public/images/experiences/ for any of them. Until real photos are
   * added for those categories, this falls back to an existing photo
   * rather than a 404. This is a known gap, not a bug to "fix" further
   * in code - it needs real image assets.
   */
  return "/images/experiences/guided-walking-safari/hero.jpg";
}

export default experienceImages;