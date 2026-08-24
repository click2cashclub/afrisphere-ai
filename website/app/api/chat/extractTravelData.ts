import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
    })
  : null;

/*
 * -------------------------------------------------------
 * TYPES
 * -------------------------------------------------------
 */

type Recommendation = {
  name: string;
  description?: string;
  rating?: string;
  priceRange?: string;
  location?: string;
  reasons?: string[];
};

type Destination = {
  name: string;
  type?: string;
  description?: string;
};

type Experience = {
  name: string;
  description?: string;
  duration?: string;
  bestTime?: string;
};

type TripSummary = {
  country: string;
  duration: number;
  travelStyle: string;
  transport: string;
  budget: string;
  accommodation: string;
  activities: string;
  food: string;
  transportCost: string;
  dailyEstimate: string;
  bestFor: string;
  matchScore: string;
};

export type ExtractedTravelData = {
  trip: TripSummary;
  destinations: Destination[];
  hotels: Recommendation[];
  restaurants: Recommendation[];
  experiences: Experience[];
  followUpQuestions: string[];
};

/*
 * -------------------------------------------------------
 * CLEANING HELPERS
 * -------------------------------------------------------
 */

function cleanString(value: unknown): string {
  return typeof value === "string"
    ? value.trim()
    : "";
}

function cleanStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter(
      (item): item is string =>
        typeof item === "string"
    )
    .map((item) => item.trim())
    .filter(Boolean);
}

function cleanRecommendations(
  value: unknown
): Recommendation[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter(
      (item): item is Record<string, unknown> =>
        item !== null &&
        typeof item === "object" &&
        typeof (item as Record<string, unknown>).name === "string"
    )
    .map((item) => ({
      name: cleanString(item.name),
      description: cleanString(item.description),
      rating: cleanString(item.rating),
      priceRange: cleanString(item.priceRange),
      location: cleanString(item.location),
      reasons: cleanStringArray(item.reasons),
    }))
    .filter(
      (item) => item.name.length > 0
    );
}

function cleanDestinations(
  value: unknown
): Destination[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter(
      (item): item is Record<string, unknown> =>
        item !== null &&
        typeof item === "object" &&
        typeof (item as Record<string, unknown>).name === "string"
    )
    .map((item) => ({
      name: cleanString(item.name),
      type: cleanString(item.type),
      description: cleanString(item.description),
    }))
    .filter(
      (item) => item.name.length > 0
    );
}

function cleanExperiences(
  value: unknown
): Experience[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter(
      (item): item is Record<string, unknown> =>
        item !== null &&
        typeof item === "object" &&
        typeof (item as Record<string, unknown>).name === "string"
    )
    .map((item) => ({
      name: cleanString(item.name),
      description: cleanString(item.description),
      duration: cleanString(item.duration),
      bestTime: cleanString(item.bestTime),
    }))
    .filter(
      (item) => item.name.length > 0
    );
}

/*
 * -------------------------------------------------------
 * NORMALISATION
 * -------------------------------------------------------
 */

function normalise(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/*
 * -------------------------------------------------------
 * USER INTENT
 * -------------------------------------------------------
 *
 * IMPORTANT:
 *
 * The user's ORIGINAL MESSAGE controls intent.
 *
 * Food comes before destination/experience detection.
 * This prevents:
 *
 * "Where can I eat in Victoria Falls?"
 *
 * from becoming a generic Victoria Falls trip.
 * -------------------------------------------------------
 */

function detectIntent(
  userMessage: string
): string {
  const text = userMessage.toLowerCase().trim();

  /*
   * RESTAURANT / FOOD
   */

  const restaurantPattern =
    /\b(?:restaurant|restaurants|eat|eating|food|dining|dine|dinner|lunch|breakfast|cuisine|meal|meals|where should i eat|where can i eat|where to eat|places to eat|local food|traditional food|zimbabwean food|african food)\b/i;

  if (
    restaurantPattern.test(text)
  ) {
    return "restaurant";
  }

  /*
   * HOTEL / ACCOMMODATION
   */

  const hotelPattern =
    /\b(?:hotel|hotels|lodge|lodges|accommodation|stay|where should i stay)\b/i;

  if (
    hotelPattern.test(text)
  ) {
    return "hotel";
  }

  /*
   * EXPERIENCE / ACTIVITIES
   */

  const experiencePattern =
    /\b(?:experience|experiences|activity|activities|things to do|what can i do|what should i do|tour|tours|safari|game drive|cruise)\b/i;

  if (
    experiencePattern.test(text)
  ) {
    return "experience";
  }

  /*
   * ITINERARY / TRIP PLANNING
   */

  const itineraryPattern =
    /\b(?:itinerary|itineraries|plan my trip|plan a trip|travel plan|journey|days in|day itinerary)\b/i;

  if (
    itineraryPattern.test(text)
  ) {
    return "itinerary";
  }

  /*
   * DESTINATION DISCOVERY
   */

  const destinationPattern =
    /\b(?:destination|destinations|where should i go|places to visit|what should i see)\b/i;

  if (
    destinationPattern.test(text)
  ) {
    return "destination";
  }

  return "general";
}

/*
 * -------------------------------------------------------
 * DURATION DETECTION
 * -------------------------------------------------------
 */

function detectRequestedDuration(
  userMessage: string
): number {
  const text =
    userMessage.toLowerCase();

  const patterns = [
    /\b(\d+)\s*[- ]?\s*day(?:s)?\b/i,
    /\bfor\s+(\d+)\s*[- ]?\s*day(?:s)?\b/i,
    /\b(\d+)\s*[- ]?\s*night(?:s)?\b/i,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);

    if (!match) {
      continue;
    }

    const duration =
      Number(match[1]);

    if (
      Number.isFinite(duration) &&
      duration >= 1 &&
      duration <= 60
    ) {
      return duration;
    }
  }

  return 0;
}

/*
 * -------------------------------------------------------
 * DESTINATION RELEVANCE
 * -------------------------------------------------------
 */

function isRelatedToRequest(
  name: string,
  userMessage: string
): boolean {
  const item =
    normalise(name);

  const request =
    normalise(userMessage);

  const destinationKeywords = [
    "bulawayo",
    "matobo",
    "matobo hills",
    "khami",
    "victoria falls",
    "zambezi",
    "hwange",
    "great zimbabwe",
    "harare",
    "mana pools",
    "lake kariba",
    "gonarezhou",
    "eastern highlands",
  ];

  /*
   * Direct destination match.
   */

  for (
    const keyword of destinationKeywords
  ) {
    const normalisedKeyword =
      normalise(keyword);

    if (
      request.includes(
        normalisedKeyword
      ) &&
      item.includes(
        normalisedKeyword
      )
    ) {
      return true;
    }
  }

  /*
   * If the traveler did not mention
   * a known destination, don't
   * aggressively filter results.
   */

  const containsKnownDestination =
    destinationKeywords.some(
      (keyword) =>
        request.includes(
          normalise(keyword)
        )
    );

  if (
    !containsKnownDestination
  ) {
    return true;
  }

  /*
   * Related Bulawayo destinations.
   */

  if (
    request.includes("bulawayo") &&
    (
      item.includes("bulawayo") ||
      item.includes("matobo") ||
      item.includes("khami")
    )
  ) {
    return true;
  }

  /*
   * Related Victoria Falls destinations.
   */

  if (
    request.includes("victoria falls") &&
    (
      item.includes("victoria falls") ||
      item.includes("zambezi")
    )
  ) {
    return true;
  }

  /*
   * Hwange.
   */

  if (
    request.includes("hwange") &&
    item.includes("hwange")
  ) {
    return true;
  }

  return false;
}

/*
 * -------------------------------------------------------
 * DESTINATION FILTER
 * -------------------------------------------------------
 */

function filterRelevantDestinations(
  destinations: Destination[],
  userMessage: string
): Destination[] {
  if (
    destinations.length === 0
  ) {
    return [];
  }

  const intent =
    detectIntent(userMessage);

  const filtered =
    destinations.filter(
      (destination) =>
        isRelatedToRequest(
          destination.name,
          userMessage
        )
    );

  if (
    filtered.length > 0
  ) {
    return filtered.slice(0, 6);
  }

  /*
   * Focused recommendation requests
   * should never dump many destinations.
   */

  if (
    intent === "restaurant" ||
    intent === "hotel" ||
    intent === "experience"
  ) {
    return destinations.slice(0, 3);
  }

  return destinations.slice(0, 8);
}

/*
 * -------------------------------------------------------
 * RECOMMENDATION FILTER
 * -------------------------------------------------------
 */

function filterRelevantRecommendations(
  recommendations: Recommendation[],
  userMessage: string,
  intent: string
): Recommendation[] {
  if (
    recommendations.length === 0
  ) {
    return [];
  }

  /*
   * Category is already controlled by
   * the caller.
   */

  const filtered =
    recommendations.filter(
      (item) =>
        isRelatedToRequest(
          `${item.name} ${
            item.location ?? ""
          } ${
            item.description ?? ""
          }`,
          userMessage
        )
    );

  /*
   * If destination filtering found
   * nothing, preserve recommendations
   * when no known destination was supplied.
   */

  if (
    filtered.length === 0
  ) {
    const request =
      normalise(userMessage);

    const knownDestination =
      [
        "bulawayo",
        "matobo",
        "khami",
        "victoria falls",
        "hwange",
        "harare",
        "mana pools",
        "lake kariba",
        "gonarezhou",
        "eastern highlands",
      ].some((keyword) =>
        request.includes(
          normalise(keyword)
        )
      );

    if (!knownDestination) {
      return recommendations.slice(
        0,
        6
      );
    }

    return [];
  }

  /*
   * Focused categories should stay
   * compact.
   */

  if (
    intent === "restaurant" ||
    intent === "hotel" ||
    intent === "experience"
  ) {
    return filtered.slice(0, 6);
  }

  return filtered.slice(0, 8);
}

/*
 * -------------------------------------------------------
 * LOCAL HOTEL FALLBACKS
 * -------------------------------------------------------
 *
 * Only controlled information.
 *
 * Do NOT invent:
 * prices, ratings, opening hours,
 * availability, phone numbers or
 * booking information.
 * -------------------------------------------------------
 */

function getZimbabweHotelRecommendations(
  answer: string
): Recommendation[] {
  const text =
    answer.toLowerCase();

  const hotels: Recommendation[] =
    [];

  if (
    text.includes("hwange")
  ) {
    hotels.push(
      {
        name: "Somalisa Camp",
        description:
          "A luxury tented safari camp offering an intimate Hwange wilderness experience.",
        location:
          "Hwange National Park, Zimbabwe",
        reasons: [
          "Safari-focused accommodation",
          "Hwange wilderness setting",
          "Suitable for wildlife-focused travellers",
        ],
      }
    );
  }

  if (
    text.includes("bulawayo")
  ) {
    hotels.push(
      {
        name: "Bulawayo Rainbow Hotel",
        description:
          "A centrally located hotel providing a convenient base for exploring Bulawayo.",
        location:
          "Bulawayo, Zimbabwe",
        reasons: [
          "Central Bulawayo base",
          "Convenient for city exploration",
          "Suitable for travellers visiting Bulawayo",
        ],
      }
    );
  }

  return hotels;
}

/*
 * -------------------------------------------------------
 * LOCAL RESTAURANT FALLBACKS
 * -------------------------------------------------------
 *
 * IMPORTANT:
 *
 * These fallbacks intentionally do NOT
 * manufacture ratings, prices,
 * opening hours or other unverifiable
 * facts.
 * -------------------------------------------------------
 */

function getZimbabweRestaurantRecommendations(
  answer: string
): Recommendation[] {
  const text =
    answer.toLowerCase();

  const restaurants: Recommendation[] =
    [];

  if (
    text.includes("victoria falls")
  ) {
    restaurants.push(
      {
        name:
          "The Boma – Dinner & Drum Show",
        description:
          "A Zimbabwean cultural dining experience associated with traditional cuisine.",
        location:
          "Victoria Falls, Zimbabwe",
        reasons: [
          "Zimbabwean cultural dining experience",
          "Traditional cuisine",
          "Suitable for travellers interested in local food and culture",
        ],
      },
      {
        name:
          "Victoria Falls Eatery",
        description:
          "A local dining option for travellers exploring Victoria Falls.",
        location:
          "Victoria Falls, Zimbabwe",
        reasons: [
          "Local dining option",
          "Located in Victoria Falls",
          "Suitable for exploring local flavours",
        ],
      }
    );
  }

  if (
    text.includes("bulawayo")
  ) {
    restaurants.push(
      {
        name:
          "Homely House Restaurant",
        description:
          "A local-style dining experience focused on traditional Zimbabwean cuisine and familiar local flavours.",
        location:
          "Bulawayo, Zimbabwe",
        reasons: [
          "Traditional Zimbabwean cuisine",
          "Local-style dining",
          "Zimbabwean flavours",
        ],
      }
    );
  }

  return restaurants;
}

/*
 * -------------------------------------------------------
 * DEFAULT TRIP
 * -------------------------------------------------------
 */

function createEmptyTrip(
  duration: number
): TripSummary {
  return {
    country: "",
    duration,
    travelStyle: "",
    transport: "",
    budget: "",
    accommodation: "",
    activities: "",
    food: "",
    transportCost: "",
    dailyEstimate: "",
    bestFor: "",
    matchScore: "",
  };
}

/*
 * -------------------------------------------------------
 * GEMINI PROMPT
 * -------------------------------------------------------
 */

function buildExtractionPrompt(
  answer: string,
  userMessage: string,
  intent: string,
  requestedDuration: number
): string {
  return `
You are the structured travel-data extraction engine for Zuri,
the African travel companion inside AfriSphere AI.

Your task is to extract ONLY information that is actually present
in the travel response.

Return ONLY valid JSON.

Do not return markdown.
Do not return comments.
Do not return explanations.
Do not invent facts.

USER'S ORIGINAL REQUEST:
${userMessage || "(not provided)"}

DETECTED INTENT:
${intent}

REQUESTED DURATION:
${
  requestedDuration > 0
    ? `${requestedDuration} days`
    : "Not explicitly specified"
}

IMPORTANT RULES:

1. The user's original request controls the intent.

2. If the intent is "restaurant":
   - return restaurants only
   - do not create hotels
   - do not create experiences
   - destinations may contain the destination explicitly requested

3. If the intent is "hotel":
   - return hotels only
   - do not create restaurants
   - do not create experiences

4. If the intent is "experience":
   - return experiences only
   - do not create hotels
   - do not create restaurants

5. Preserve the user's requested duration.

6. Never invent:
   - prices
   - ratings
   - addresses
   - phone numbers
   - opening hours
   - availability
   - booking information
   - restaurant facts
   - hotel facts
   - chef names
   - owner names
   - awards
   - certificates
   - menu items
   - sourcing claims

7. If a field is not supported by the response,
   return an empty string or empty array.

8. Do not describe a restaurant as "the best",
   "number one", "most authentic" or similar
   unless the response explicitly supports that claim.

9. Do not turn a focused food question into a full itinerary.

10. Extract only recommendations relevant to the user's request.

Return this exact JSON structure:

{
  "trip": {
    "country": "",
    "duration": 0,
    "travelStyle": "",
    "transport": "",
    "budget": "",
    "accommodation": "",
    "activities": "",
    "food": "",
    "transportCost": "",
    "dailyEstimate": "",
    "bestFor": "",
    "matchScore": ""
  },
  "destinations": [],
  "hotels": [],
  "restaurants": [],
  "experiences": [],
  "followUpQuestions": []
}

TRAVEL RESPONSE:

${answer}
`;
}

/*
 * -------------------------------------------------------
 * JSON EXTRACTION
 * -------------------------------------------------------
 */

// Genuine untyped boundary: this parses arbitrary JSON returned by
// Gemini, whose shape isn't known until validated field-by-field further
// down (see cleanRecommendations/cleanDestinations/cleanExperiences).
function parseJsonResponse(
  value: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): any {
  let text =
    value.trim();

  text = text
    .replace(
      /```json/gi,
      ""
    )
    .replace(
      /```/g,
      ""
    )
    .trim();

  const start =
    text.indexOf("{");

  const end =
    text.lastIndexOf("}");

  if (
    start === -1 ||
    end === -1 ||
    end <= start
  ) {
    return {};
  }

  text =
    text.substring(
      start,
      end + 1
    );

  try {
    return JSON.parse(text);
  } catch {
    return {};
  }
}

/*
 * -------------------------------------------------------
 * DUPLICATE REMOVAL
 * -------------------------------------------------------
 */

function removeDuplicateRecommendations(
  items: Recommendation[]
): Recommendation[] {
  return items.filter(
    (item, index, array) =>
      index ===
      array.findIndex(
        (other) =>
          normalise(
            other.name
          ) ===
          normalise(
            item.name
          )
      )
  );
}

function removeDuplicateDestinations(
  items: Destination[]
): Destination[] {
  return items.filter(
    (item, index, array) =>
      index ===
      array.findIndex(
        (other) =>
          normalise(
            other.name
          ) ===
          normalise(
            item.name
          )
      )
  );
}

function removeDuplicateExperiences(
  items: Experience[]
): Experience[] {
  return items.filter(
    (item, index, array) =>
      index ===
      array.findIndex(
        (other) =>
          normalise(
            other.name
          ) ===
          normalise(
            item.name
          )
      )
  );
}

/*
 * -------------------------------------------------------
 * MAIN EXTRACTION FUNCTION
 * -------------------------------------------------------
 *
 * Compatible with the current route:
 *
 * extractTravelData(reply)
 *
 * It also accepts:
 *
 * extractTravelData(reply, message)
 *
 * The second form is preferred because the user's
 * original request gives us better intent control.
 * -------------------------------------------------------
 */

export async function extractTravelData(
  answer: string,
  userMessage = ""
): Promise<ExtractedTravelData> {
  const safeAnswer =
    typeof answer === "string"
      ? answer.trim()
      : "";

  const safeUserMessage =
    typeof userMessage === "string"
      ? userMessage.trim()
      : "";

  const intent =
    detectIntent(
      safeUserMessage
    );

  const requestedDuration =
    detectRequestedDuration(
      safeUserMessage
    );

  /*
   * Local controlled fallbacks.
   */

  const fallbackHotels =
    getZimbabweHotelRecommendations(
      safeAnswer
    );

  const fallbackRestaurants =
    getZimbabweRestaurantRecommendations(
      safeAnswer
    );

  // Same untyped JSON boundary as parseJsonResponse; the chained
  // optional access below (data?.trip?.duration etc.) relies on this
  // staying loose.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let data: any = {};

  /*
   * -------------------------------------------------------
   * GEMINI EXTRACTION
   * -------------------------------------------------------
   */

  if (
    ai &&
    safeAnswer
  ) {
    try {
      const prompt =
        buildExtractionPrompt(
          safeAnswer,
          safeUserMessage,
          intent,
          requestedDuration
        );

      const result =
        await ai.models.generateContent(
          {
            model:
              "gemini-3.6-flash",

            contents: prompt,

            config: {
              temperature: 0.1,
            },
          }
        );

      const responseText =
        result.text?.trim() ?? "";

      if (
        responseText
      ) {
        data =
          parseJsonResponse(
            responseText
          );
      }
    } catch (error: unknown) {
      const errorObj =
        error as
          | { status?: unknown; statusCode?: unknown }
          | null
          | undefined;

      const status =
        typeof errorObj?.status ===
        "number"
          ? errorObj.status
          : typeof errorObj?.statusCode ===
              "number"
            ? errorObj.statusCode
            : 0;

      if (
        status === 429
      ) {
        console.warn(
          "Gemini extraction quota reached. Using local travel data."
        );
      } else {
        console.error(
          "Travel extraction failed. Using local travel data:",
          error
        );
      }

      data = {};
    }
  }

  /*
   * -------------------------------------------------------
   * TRIP
   * -------------------------------------------------------
   */

  const extractedDuration =
    typeof data?.trip?.duration ===
    "number"
      ? data.trip.duration
      : 0;

  const finalDuration =
    requestedDuration > 0
      ? requestedDuration
      : extractedDuration;

  const trip: TripSummary =
    {
      country:
        cleanString(
          data?.trip?.country
        ),

      duration:
        finalDuration,

      travelStyle:
        cleanString(
          data?.trip?.travelStyle
        ),

      transport:
        cleanString(
          data?.trip?.transport
        ),

      budget:
        cleanString(
          data?.trip?.budget
        ),

      accommodation:
        cleanString(
          data?.trip?.accommodation
        ),

      activities:
        cleanString(
          data?.trip?.activities
        ),

      food:
        cleanString(
          data?.trip?.food
        ),

      transportCost:
        cleanString(
          data?.trip?.transportCost
        ),

      dailyEstimate:
        cleanString(
          data?.trip?.dailyEstimate
        ),

      bestFor:
        cleanString(
          data?.trip?.bestFor
        ),

      matchScore:
        cleanString(
          data?.trip?.matchScore
        ),
    };

  /*
   * -------------------------------------------------------
   * DESTINATIONS
   * -------------------------------------------------------
   */

  let destinations =
    cleanDestinations(
      data?.destinations
    );

  destinations =
    filterRelevantDestinations(
      destinations,
      safeUserMessage
    );

  destinations =
    removeDuplicateDestinations(
      destinations
    );

  /*
   * -------------------------------------------------------
   * EXPERIENCES
   * -------------------------------------------------------
   */

  let experiences =
    cleanExperiences(
      data?.experiences
    );

  if (
    safeUserMessage
  ) {
    experiences =
      experiences.filter(
        (experience) =>
          isRelatedToRequest(
            experience.name,
            safeUserMessage
          )
      );
  }

  experiences =
    removeDuplicateExperiences(
      experiences
    ).slice(0, 6);

  /*
   * -------------------------------------------------------
   * HOTELS
   * -------------------------------------------------------
   */

  let hotels =
    cleanRecommendations(
      data?.hotels
    );

  if (
    hotels.length === 0
  ) {
    hotels =
      fallbackHotels;
  }

  hotels =
    filterRelevantRecommendations(
      hotels,
      safeUserMessage,
      intent
    );

  hotels =
    removeDuplicateRecommendations(
      hotels
    );

  /*
   * -------------------------------------------------------
   * RESTAURANTS
   * -------------------------------------------------------
   */

  let restaurants =
    cleanRecommendations(
      data?.restaurants
    );

  if (
    restaurants.length === 0
  ) {
    restaurants =
      fallbackRestaurants;
  }

  restaurants =
    filterRelevantRecommendations(
      restaurants,
      safeUserMessage,
      intent
    );

  restaurants =
    removeDuplicateRecommendations(
      restaurants
    );

  /*
   * -------------------------------------------------------
   * CATEGORY CONTROL
   * -------------------------------------------------------
   *
   * This is critical.
   *
   * The user request determines which
   * recommendation categories survive.
   * -------------------------------------------------------
   */

  if (
    intent === "restaurant"
  ) {
    hotels = [];
    experiences = [];
  }

  if (
    intent === "hotel"
  ) {
    restaurants = [];
    experiences = [];
  }

  if (
    intent === "experience"
  ) {
    hotels = [];
    restaurants = [];
  }

  /*
   * -------------------------------------------------------
   * FOLLOW-UP QUESTIONS
   * -------------------------------------------------------
   */

  let followUpQuestions =
    cleanStringArray(
      data?.followUpQuestions
    );

  followUpQuestions =
    followUpQuestions
      .slice(0, 3);

  /*
   * -------------------------------------------------------
   * FINAL RESULT
   * -------------------------------------------------------
   */

  return {
    trip,

    destinations,

    hotels,

    restaurants,

    experiences,

    followUpQuestions,
  };
}

export default extractTravelData;