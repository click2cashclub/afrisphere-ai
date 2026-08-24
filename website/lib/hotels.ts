export type Hotel = {
  name: string;
  location: string;
  region: "victoria falls" | "hwange";
  description: string;
  priceRange?: string;
  reasons: string[];
  image: string;
};

export const hotels: Hotel[] = [
  {
    name: "Ilala Lodge Hotel",
    location: "Victoria Falls, Zimbabwe",
    region: "victoria falls",
    description:
      "A luxury, family-run hotel in the centre of Victoria Falls, directly bordering Victoria Falls National Park and about an 8-minute walk from the Falls entrance.",
    priceRange: "$$$$",
    reasons: [
      "About an 8-minute walk from the Victoria Falls entrance",
      "Borders Victoria Falls National Park, with wildlife sometimes visible on the grounds",
      "On-site Cassia Restaurant, two pools, a spa, and a Tours & Activities Desk",
    ],
    image:
      "/images/hotels/ilala-lodge/hero.jpg",
  },

  {
    name: "Somalisa Camp",
    location: "Hwange National Park, Zimbabwe",
    region: "hwange",
    description:
      "A luxury tented safari camp in Hwange National Park, Zimbabwe's largest national park, known for close-up elephant encounters at the camp's Elephant Pool.",
    reasons: [
      "Elephants regularly come to drink at the Elephant Pool near camp",
      "Strong wildlife area for lion, leopard, cheetah and African wild dog",
      "Solar-powered with a water-recycling system",
    ],
    image:
      "/images/hotels/somalisa-camp/hero.jpg",
  },

  {
    name: "The Hide Safari Camp",
    location: "Hwange National Park, Zimbabwe",
    region: "hwange",
    description:
      "A long-established luxury safari camp on a private concession on the eastern boundary of Hwange National Park, overlooking a wildlife-rich waterhole.",
    reasons: [
      "Wildlife viewing directly from camp at the waterhole, including an underground hide",
      "Particularly strong for elephant and buffalo sightings",
      "Dove's Nest treehouse sleep-out overlooking the wilderness",
    ],
    image:
      "/images/hotels/the-hide-safari-camp/hero.jpg",
  },

  {
    name: "The Victoria Falls Hotel",
    location: "Victoria Falls, Zimbabwe",
    region: "victoria falls",
    description:
      "One of Zimbabwe's most historic luxury hotels, built in 1904 with Edwardian character. A five-star property with 149 rooms and suites, some with views toward the Victoria Falls gorge and bridge.",
    priceRange: "$$$$",
    reasons: [
      "Historic five-star hotel, established in 1904",
      "Views toward the Victoria Falls gorge and Victoria Falls Bridge from parts of the property",
      "Exceptional proximity to Victoria Falls itself",
    ],
    image:
      "/images/hotels/victoria-falls-hotel/hero.jpg",
  },

  {
    name: "Victoria Falls Safari Lodge",
    location: "Victoria Falls, Zimbabwe",
    region: "victoria falls",
    description:
      "A luxury safari-style lodge just outside Victoria Falls town, set on a plateau overlooking a wildlife waterhole in Zambezi National Park, with 72 sunset-facing rooms.",
    reasons: [
      "Elevated position overlooking a wildlife waterhole - elephant, buffalo and kudu are regular visitors",
      "Hosts The Boma - Dinner & Drum Show on site",
      "Complimentary shuttle to the Victoria Falls rainforest and town",
    ],
    image:
      "/images/hotels/victoria-falls-safari-lodge/hero.jpg",
  },
];

export default hotels;