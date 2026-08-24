import { getAllDestinations } from "@/lib/destinationLoader";

type DestinationRecord = {
  id?: string;
  name: string;
  country?: string;
  region?: string;
  type?: string;
  heroImage?: string;
  gallery?: string[];
  summary?: string;
  description?: string;
  bestTime?: {
    from?: string;
    to?: string;
  };
  recommendedStay?: string;
  rating?: number;
  coordinates?: {
    latitude?: number;
    longitude?: number;
  };
  highlights?: string[];
  wildlife?: string[];
  localFoods?: string[];
  travelTips?: string[];
};

function normalise(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function matchesDestination(
  destination: DestinationRecord,
  text: string
): boolean {
  const haystack = normalise(
    [
      destination.id,
      destination.name,
      destination.region,
      destination.type,
      destination.summary,
      destination.description,
    ]
      .filter(Boolean)
      .join(" ")
  );

  const words = normalise(text)
    .split(" ")
    .filter((word) => word.length > 2);

  return words.some((word) =>
    haystack.includes(word)
  );
}

export function getDestinationRecommendations(
  message: string,
  answer: string = ""
) {
  const destinations =
    getAllDestinations() as DestinationRecord[];

  const searchText = `${message} ${answer}`;

  const matches = destinations.filter(
    (destination) =>
      matchesDestination(destination, searchText)
  );

  /*
   * If Zuri mentions specific destinations,
   * return those actual JSON records.
   */
  if (matches.length > 0) {
    return matches.map((destination) => ({
      name: destination.name,
      type: destination.type,
      description:
        destination.summary ||
        destination.description,
    }));
  }

  /*
   * General Zimbabwe request:
   * return the strongest available destination records.
   */
  if (
    normalise(searchText).includes("zimbabwe") ||
    normalise(searchText).includes("africa") ||
    normalise(searchText).includes("travel")
  ) {
    return destinations
      .slice(0, 6)
      .map((destination) => ({
        name: destination.name,
        type: destination.type,
        description:
          destination.summary ||
          destination.description,
      }));
  }

  return [];
}

export function getDestinationRecord(
  name: string
): DestinationRecord | undefined {
  const destinations =
    getAllDestinations() as DestinationRecord[];

  const target = normalise(name);

  return destinations.find(
    (destination) =>
      normalise(destination.name) === target ||
      normalise(destination.id || "") === target
  );
}