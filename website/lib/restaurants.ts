export type Restaurant = {
  name: string;
  location: string;
  description: string;
  cuisine: string[];
  authenticZimbabwean: boolean;
  rating?: string;
  priceRange?: string;
  reasons: string[];
  image: string;
};

export const restaurants: Restaurant[] = [
  {
    name: "The Boma – Dinner & Drum Show",
    location: "Victoria Falls, Zimbabwe",
    description:
      "A Zimbabwean cultural dining experience combining traditional food, music and live drumming.",
    cuisine: [
      "Zimbabwean",
      "African",
      "Traditional",
    ],
    authenticZimbabwean: true,
    rating: "★★★★★",
    priceRange: "$$$",
    reasons: [
      "Strong introduction to Zimbabwean cuisine",
      "Traditional cultural atmosphere",
      "Live music and drumming",
    ],
    image:
      "/images/restaurants/the-boma/hero.jpg",
  },

  {
    name: "Victoria Falls Eatery",
    location: "Victoria Falls, Zimbabwe",
    description:
      "A relaxed local dining option for travellers exploring Victoria Falls.",
    cuisine: [
      "Zimbabwean",
      "African",
      "Local",
    ],
    authenticZimbabwean: true,
    rating: "★★★★☆",
    reasons: [
      "Relaxed local dining option",
      "Convenient for visitors",
      "Suitable for trying local flavours",
    ],
    image:
      "/images/restaurants/victoria-falls-eater/hero.jpg",
  },

  {
    name: "Homely House Restaurant",
    location: "Bulawayo, Zimbabwe",
    description:
      "A local-style dining experience focused on traditional Zimbabwean cuisine and familiar local flavours.",
    cuisine: [
      "Zimbabwean",
      "Traditional",
      "Local",
    ],
    authenticZimbabwean: true,
    rating: "★★★★☆",
    priceRange: "$$",
    reasons: [
      "Traditional Zimbabwean food",
      "Local dining atmosphere",
      "Everyday Zimbabwean flavours",
    ],
    image:
      "/images/restaurants/homely-house-restaurant/hero.jpg",
  },

  {
    name: "The Lookout Cafe",
    location: "Victoria Falls, Zimbabwe",
    description:
      "A scenic Victoria Falls dining option with views over the surrounding landscape.",
    cuisine: [
      "African",
      "International",
    ],
    authenticZimbabwean: false,
    priceRange: "$$$",
    reasons: [
      "Scenic location",
      "Good for visitors",
      "Views over the surrounding landscape",
    ],
    image:
      "/images/restaurants/the-lookout-cafe/hero.jpg",
  },
];

export default restaurants;