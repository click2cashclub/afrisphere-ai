export interface Destination {
  id: string;

  name: string;

  country: string;

  region: string;

  type: string;

  heroImage: string;

  gallery: string[];

  summary: string;

  description: string;

  bestTime: {
    from: string;
    to: string;
  };

  recommendedStay: string;

  rating: number;

  coordinates: {
    latitude: number;
    longitude: number;
  };

  highlights: string[];

  wildlife: string[];

  localFoods: string[];

  travelTips: string[];
}