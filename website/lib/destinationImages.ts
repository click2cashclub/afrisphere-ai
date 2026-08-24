const destinationImages: Record<string, string> = {
  "Victoria Falls":
    "/images/destinations/zimbabwe/victoria-falls/hero.jpg",

  "Hwange National Park":
    "/images/destinations/zimbabwe/hwange-national-park/hero.jpg",

  "Zambezi River":
    "/images/destinations/zimbabwe/zambezi-river/hero.jpg",

  "Great Zimbabwe":
    "/images/destinations/zimbabwe/great-zimbabwe/hero.jpg",

  "Matobo Hills":
    "/images/destinations/zimbabwe/matobo-hills/hero.jpg",

  "Lake Kariba":
    "/images/destinations/zimbabwe/lake-kariba/hero.jpg",

  "Mana Pools":
    "/images/destinations/zimbabwe/mana-pools/hero.jpg",

  "Bulawayo":
    "/images/destinations/zimbabwe/bulawayo/hero.jpg",

  "Harare":
    "/images/destinations/zimbabwe/harare/hero.jpg",

  "Eastern Highlands":
    "/images/destinations/zimbabwe/eastern-highlands/hero.jpg",
};

export function getDestinationImage(name: string): string {
  return (
    destinationImages[name] ||
    "/images/destinations/default.jpg"
  );
}

export default destinationImages;