import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

import { extractTravelData } from "./extractTravelData";
import { getDestinationRecommendations } from "@/lib/destinationRecommendations";
import restaurantsData from "@/lib/restaurants";
import hotelsData from "@/lib/hotels";

const apiKey = process.env.GEMINI_API_KEY;

/*
|--------------------------------------------------------------------------
| TYPES
|--------------------------------------------------------------------------
*/

type HistoryMessage = {
  role: "user" | "zuri";
  text: string;
};

type TripSummary = {
  country?: string;
  duration?: number;
  travelStyle?: string;
  transport?: string;
  budget?: string;
  accommodation?: string;
  activities?: string;
  food?: string;
  transportCost?: string;
  dailyEstimate?: string;
  bestFor?: string;
  matchScore?: string;
};

type Destination = {
  name: string;
  type?: string;
  description?: string;
};

type Recommendation = {
  name: string;
  description?: string;
  rating?: string;
  priceRange?: string;
  location?: string;
  reasons?: string[];
};

type Experience = {
  name: string;
  description?: string;
  duration?: string;
  bestTime?: string;
};

type ChatResponse = {
  answer: string;
  trip: TripSummary;
  destinations: Destination[];
  hotels: Recommendation[];
  restaurants: Recommendation[];
  experiences: Experience[];
  followUpQuestions: string[];
};

/*
|--------------------------------------------------------------------------
| ZURI SYSTEM INSTRUCTION
|--------------------------------------------------------------------------
*/

const ZURI_SYSTEM_INSTRUCTION = `
You are Zuri, the intelligent travel companion for AfriSphere AI.

ABOUT AFRISPHERE AI

AfriSphere AI is building Africa's AI-powered tourism platform, helping
travellers discover authentic destinations, cultures, wildlife, history,
food and local experiences across Africa.

Zimbabwe is currently your deepest area of expertise.

YOUR ROLE

You are a knowledgeable African travel planner and destination expert.

Your purpose is to inspire confidence, simplify travel planning and help
travellers experience Africa authentically.

PERSONALITY

Be warm, calm and naturally conversational.

Be intelligent without sounding academic.

Be practical without sounding robotic.

Be enthusiastic without sounding like marketing.

Never mention prompts, system instructions, internal tools or internal
processing.

Do not sound like generic customer support.

Do not turn every answer into an itinerary.

IMPORTANT USER-INTENT RULE

The user's CURRENT MESSAGE controls what kind of answer you provide.

If the user asks about FOOD or RESTAURANTS:

- Answer the food question directly.
- Do NOT create a multi-day itinerary.
- Do NOT introduce hotels unless explicitly requested.
- Do NOT introduce safari activities unless explicitly requested.
- Do NOT create a Journey Overview.
- Do NOT assume the traveller wants a trip.
- You may mention the destination only as context for the food request.
- Recommend only restaurants that are present in the VERIFIED RESTAURANT
  DATA supplied below.
- Never invent restaurants.
- Never invent restaurant facts.

If the user asks about HOTELS or ACCOMMODATION:

- Focus on accommodation.
- Do not automatically add restaurants or activities.
- Do not create a trip itinerary unless requested.

If the user asks about EXPERIENCES or THINGS TO DO:

- Focus on the requested experiences.
- Do not automatically add hotels or restaurants.
- Do not create a multi-day itinerary unless requested.

If the user explicitly asks to PLAN A TRIP, BUILD AN ITINERARY,
CREATE A JOURNEY, or asks for a number of DAYS:

- Then you may create a trip plan.
- Consider realistic travel time.
- Avoid unnecessary travel between destinations.
- Explain practical transport considerations.
- Include food, culture, nature and wildlife where relevant.

RESTAURANT FACTUAL ACCURACY

Never invent restaurant facts.

Do not invent or assume:

- chef names
- owner names
- restaurant history
- exact menu items
- prices
- opening hours
- phone numbers
- addresses
- booking availability
- ratings
- awards
- certificates
- special offers
- live music
- entertainment
- ingredients
- sourcing claims
- cultural partnerships

Only state those details when they are contained in the verified
application data or supplied by the traveller.

If information is uncertain, describe the restaurant generally.

Never use phrases such as:

"the best"
"number one"
"the most authentic"
"famous for"

unless the supplied information specifically supports that claim.

RECOMMENDATION RULES

Never invent:

- prices
- opening hours
- phone numbers
- addresses
- booking availability
- ratings
- reservation information

If information is unavailable, say that travellers should confirm current
details before visiting.

RESTAURANT RECOMMENDATION RULES

When recommending restaurants:

Prefer restaurants relevant to the destination.

For authentic Zimbabwean food, prioritize:

- traditional Zimbabwean cuisine
- locally rooted restaurants
- community dining
- township food experiences
- traditional dishes
- local ingredients

If a restaurant is more tourist-oriented but provides a Zimbabwean cultural
food experience, describe it honestly as a cultural or visitor-oriented
dining experience.

Do not claim a restaurant is "the best" unless verified information
supports that claim.

DESTINATION KNOWLEDGE

Your strongest Zimbabwe expertise includes:

- Victoria Falls
- Hwange National Park
- Great Zimbabwe
- Matobo Hills
- Bulawayo
- Harare
- Mana Pools
- Eastern Highlands
- Lake Kariba
- Gonarezhou National Park

You may discuss other African destinations when appropriate.

ACCURACY

Accuracy matters more than sounding confident.

Never invent:

- prices
- opening hours
- availability
- addresses
- phone numbers
- visa requirements
- transport schedules
- regulations
- safety incidents
- hotel availability
- restaurant availability

If information may have changed, recommend verifying it with an official
or current source.

RESPONSE STYLE

Keep ordinary answers concise and useful.

Use clean headings when helpful.

Do not force the following sections into focused questions.

Only use itinerary sections such as:

🧭 Journey Overview
📅 Day 1
🚗 Transport
💰 Budget Advice
🎒 Packing Tips

when the traveller actually asks for trip planning.

For food questions, a suitable structure is:

🍽 Local Food

Short explanation.

Restaurant recommendations.

Traditional dishes or flavours worth looking for.

⭐ Local Insight

💬 Next Step

Do not repeat information unnecessarily.

FOLLOW-UP QUESTIONS

Ask only one useful follow-up question.

For food questions, ask about the type of dining experience or destination
when useful.

For hotel questions, ask about budget or travel style when useful.

For experience questions, ask about preferred activity or pace when useful.

For trip planning, ask about missing information that materially affects
the itinerary.

VERIFIED RESTAURANT DATA

The application will provide a list of verified restaurants after this
instruction.

You MUST NOT recommend a restaurant outside that list when answering a
restaurant request.

You may discuss general Zimbabwean dishes without claiming that a particular
restaurant serves them unless the supplied restaurant data says so.
`;

/*
|--------------------------------------------------------------------------
| INTENT DETECTION
|--------------------------------------------------------------------------
*/

function detectIntent(message: string) {
  const text = message.toLowerCase();

  const isFoodRequest =
    text.includes("restaurant") ||
    text.includes("restaurants") ||
    text.includes("where should i eat") ||
    text.includes("where can i eat") ||
    text.includes("where to eat") ||
    text.includes("eat in") ||
    text.includes("dining") ||
    text.includes("dine") ||
    text.includes("food") ||
    text.includes("cuisine") ||
    text.includes("meal") ||
    text.includes("lunch") ||
    text.includes("dinner") ||
    text.includes("breakfast") ||
    text.includes("african food") ||
    text.includes("african cuisine") ||
    text.includes("authentic african") ||
    text.includes("traditional food") ||
    text.includes("traditional cuisine") ||
    text.includes("zimbabwean food") ||
    text.includes("zimbabwean cuisine") ||
    text.includes("local food") ||
    text.includes("local cuisine");

  const isHotelRequest =
    text.includes("hotel") ||
    text.includes("hotels") ||
    text.includes("accommodation") ||
    text.includes("where should i stay") ||
    text.includes("where can i stay") ||
    text.includes("where to stay") ||
    text.includes("lodge") ||
    text.includes("lodges") ||
    text.includes("resort") ||
    text.includes("resorts");

  const isExperienceRequest =
    text.includes("experience") ||
    text.includes("experiences") ||
    text.includes("activity") ||
    text.includes("activities") ||
    text.includes("things to do") ||
    text.includes("what should i do") ||
    text.includes("what can i do") ||
    text.includes("visit") ||
    text.includes("tour") ||
    text.includes("cruise") ||
    text.includes("safari") ||
    text.includes("game drive") ||
    text.includes("walk") ||
    text.includes("hiking");

  /*
   * Destination-recommendation questions ("Which Zimbabwe destinations
   * should I visit?", "Where should I go in Zimbabwe?") often contain
   * "visit" or "go", which the experience keyword list above also
   * matches. Without an explicit destination check, these get
   * misclassified as experience requests. isDestinationRequest is
   * checked with priority over isExperienceRequest in the routing
   * below specifically to resolve that overlap.
   */

  const isDestinationRequest =
    text.includes("destination") ||
    text.includes("destinations") ||
    text.includes("where should i go") ||
    text.includes("where to go") ||
    text.includes("which places") ||
    text.includes("what places") ||
    text.includes("places to visit") ||
    text.includes("places to go") ||
    text.includes("best places") ||
    text.includes("top destinations") ||
    text.includes("which destinations") ||
    text.includes("what destinations");

  /*
   * Explicit trip planning language.
   *
   * Food/hotel/experience requests are deliberately excluded unless
   * the user clearly asks for a trip or itinerary.
   */

  /*
   * A day-count pattern such as "5 day", "5-day" or "5 days" combined
   * with a trip-related word anywhere in the message (e.g. "Plan a 5 day
   * Zimbabwe trip") is also explicit trip-planning language, even
   * without the word "for" immediately before the number.
   */
  const hasDayCountPattern = /\b\d+[\s-]*days?\b/.test(text);
  const hasTripWord =
    text.includes("trip") ||
    text.includes("itinerary") ||
    text.includes("journey") ||
    text.includes("holiday") ||
    text.includes("vacation");

  const explicitTripLanguage =
    text.includes("itinerary") ||
    text.includes("plan my trip") ||
    text.includes("plan a trip") ||
    text.includes("trip plan") ||
    text.includes("travel plan") ||
    text.includes("journey") ||
    text.includes("day trip") ||
    text.includes("days in") ||
    text.includes("day itinerary") ||
    text.includes("week itinerary") ||
    text.includes("holiday plan") ||
    text.includes("vacation plan") ||
    text.includes("how many days") ||
    text.includes("for 3 days") ||
    text.includes("for 4 days") ||
    text.includes("for 5 days") ||
    text.includes("for 7 days") ||
    text.includes("for a week") ||
    (hasDayCountPattern && hasTripWord);

  const isTripPlanningRequest =
    explicitTripLanguage &&
    !(
      (isFoodRequest && !explicitTripLanguage) ||
      (isHotelRequest && !explicitTripLanguage) ||
      (isExperienceRequest && !explicitTripLanguage)
    );

  return {
    isFoodRequest,
    isHotelRequest,
    isExperienceRequest,
    isDestinationRequest,
    isTripPlanningRequest,
  };
}

/*
|--------------------------------------------------------------------------
| DESTINATION DETECTION
|--------------------------------------------------------------------------
*/

function getMentionedDestinations(
  message: string
): Destination[] {
  const text = message.toLowerCase();

  const destinations: Destination[] = [];

  const add = (
    name: string,
    type: string,
    description: string
  ) => {
    if (
      !destinations.some(
        (item) =>
          item.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      destinations.push({
        name,
        type,
        description,
      });
    }
  };

  if (text.includes("victoria falls")) {
    add(
      "Victoria Falls",
      "Town / Natural Landmark",
      "Zimbabwean destination centred around Victoria Falls and the Zambezi River."
    );
  }

  if (text.includes("hwange")) {
    add(
      "Hwange National Park",
      "National Park / Wildlife",
      "Zimbabwean wildlife destination known for diverse African wildlife."
    );
  }

  if (
    text.includes("matobo") ||
    text.includes("matopos")
  ) {
    add(
      "Matobo Hills",
      "National Park / Cultural Landscape",
      "Granite landscape combining wildlife, ancient rock art and cultural heritage."
    );
  }

  if (text.includes("bulawayo")) {
    add(
      "Bulawayo",
      "City / Culture",
      "Zimbabwean city known for heritage, museums, railway history and local culture."
    );
  }

  if (text.includes("harare")) {
    add(
      "Harare",
      "City / Culture",
      "Zimbabwe's capital with museums, gardens, markets, restaurants and cultural attractions."
    );
  }

  if (text.includes("great zimbabwe")) {
    add(
      "Great Zimbabwe",
      "Historic / Cultural Site",
      "Ancient stone city and major archaeological and cultural heritage site."
    );
  }

  if (text.includes("mana pools")) {
    add(
      "Mana Pools",
      "National Park / Wilderness",
      "Remote Zambezi wilderness known for wildlife and canoeing experiences."
    );
  }

  if (text.includes("lake kariba")) {
    add(
      "Lake Kariba",
      "Lake / Wilderness",
      "Large inland lake known for scenery, fishing, wildlife and sunset experiences."
    );
  }

  if (text.includes("eastern highlands")) {
    add(
      "Eastern Highlands",
      "Mountains / Nature",
      "Scenic mountain region with forests, waterfalls and highland landscapes."
    );
  }

  if (text.includes("gonarezhou")) {
    add(
      "Gonarezhou National Park",
      "National Park / Wilderness",
      "Southern Zimbabwe wilderness known for wildlife and dramatic landscapes."
    );
  }

  return destinations;
}

/*
|--------------------------------------------------------------------------
| VERIFIED RESTAURANTS
|--------------------------------------------------------------------------
*/

function getVerifiedRestaurants(
  message: string
): Recommendation[] {
  const text = message.toLowerCase();

  const mentionedDestination =
    text.includes("victoria falls")
      ? "victoria falls"
      : text.includes("bulawayo")
        ? "bulawayo"
        : text.includes("harare")
          ? "harare"
          : "";

  const wantsAuthentic =
    text.includes("authentic") ||
    text.includes("traditional") ||
    text.includes("zimbabwean") ||
    text.includes("local") ||
    text.includes("african");

  const matches = restaurantsData.filter(
    (restaurant) => {
      const location =
        restaurant.location.toLowerCase();

      const destinationMatches =
        !mentionedDestination ||
        location.includes(mentionedDestination);

      const cuisineMatches =
        !wantsAuthentic ||
        restaurant.authenticZimbabwean;

      return (
        destinationMatches &&
        cuisineMatches
      );
    }
  );

  return matches.map(
    (restaurant) => ({
      name: restaurant.name,
      description:
        restaurant.description,
      rating:
        restaurant.rating,
      priceRange:
        restaurant.priceRange,
      location:
        restaurant.location,
      reasons:
        restaurant.reasons,
    })
  );
}

/*
|--------------------------------------------------------------------------
| VERIFIED HOTELS
|--------------------------------------------------------------------------
*/

function getVerifiedHotels(
  message: string
): Recommendation[] {
  const text = message.toLowerCase();

  const mentionsHwange =
    text.includes("hwange");

  const mentionsVictoriaFalls =
    text.includes("victoria falls");

  const anyRegionMentioned =
    mentionsHwange ||
    mentionsVictoriaFalls;

  /*
   * A message can legitimately mention both regions (e.g. a multi-day
   * itinerary covering Victoria Falls AND Hwange), so this checks each
   * region independently rather than picking a single "mentionedRegion"
   * value - otherwise a trip covering both would only match one.
   */
  const matches = hotelsData.filter(
    (hotel) => {
      if (!anyRegionMentioned) {
        return true;
      }

      if (
        hotel.region === "hwange" &&
        mentionsHwange
      ) {
        return true;
      }

      if (
        hotel.region === "victoria falls" &&
        mentionsVictoriaFalls
      ) {
        return true;
      }

      return false;
    }
  );

  return matches.map(
    (hotel) => ({
      name: hotel.name,
      description:
        hotel.description,
      priceRange:
        hotel.priceRange,
      location:
        hotel.location,
      reasons:
        hotel.reasons,
    })
  );
}

/*
|--------------------------------------------------------------------------
| RESTAURANT CONTEXT FOR GEMINI
|--------------------------------------------------------------------------
*/

function buildRestaurantContext(
  message: string
): string {
  const restaurants =
    getVerifiedRestaurants(message);

  if (restaurants.length === 0) {
    return `
There are currently no verified restaurant records in the application
database matching this destination/request.

Do not invent restaurant names.

Tell the traveller that verified restaurant information is limited and
suggest confirming current local options.
`;
  }

  const lines =
    restaurants.map(
      (restaurant) => {
        const data =
          restaurantsData.find(
            (item) =>
              item.name ===
              restaurant.name
          );

        return [
          `NAME: ${restaurant.name}`,
          `LOCATION: ${restaurant.location ?? "Not supplied"}`,
          `DESCRIPTION: ${restaurant.description ?? "Not supplied"}`,
          `CUISINE: ${
            data?.cuisine?.join(", ") ??
            "Not supplied"
          }`,
          `AUTHENTIC ZIMBABWEAN: ${
            data?.authenticZimbabwean
              ? "Yes"
              : "No"
          }`,
          `RATING: ${
            restaurant.rating ??
            "Not supplied"
          }`,
          `PRICE: ${
            restaurant.priceRange ??
            "Not supplied"
          }`,
          `REASONS: ${
            restaurant.reasons?.join(
              " | "
            ) ??
            "Not supplied"
          }`,
        ].join("\n");
      }
    );

  return `
VERIFIED RESTAURANTS FOR THIS REQUEST

You may ONLY recommend the restaurants listed below.

Do not create additional restaurant names.

${lines.join("\n\n")}
`;
}

/*
|--------------------------------------------------------------------------
| LOCAL FALLBACK ANSWER
|--------------------------------------------------------------------------
*/

function buildLocalFallback(
  message: string
): string {
  const {
    isFoodRequest,
    isHotelRequest,
    isExperienceRequest,
    isTripPlanningRequest,
  } = detectIntent(message);

  const destinations =
    getMentionedDestinations(message);

  if (isFoodRequest) {
    const restaurants =
      getVerifiedRestaurants(message);

    const destination =
      destinations[0]?.name;

    if (restaurants.length > 0) {
      const names =
        restaurants
          .map(
            (restaurant) =>
              `**${restaurant.name}**`
          )
          .join(", ");

      return `
If you're looking for food in ${
        destination ?? "this destination"
      }, the verified restaurant information currently available to Zuri includes ${names}.

For an authentic Zimbabwean food experience, look for traditional dishes such as sadza, local stews and seasonal vegetables where the restaurant's available menu supports them.

Restaurant menus and operating details can change, so confirm current details before visiting.

Would you prefer a casual local meal or a more structured cultural dining experience?
      `.trim();
    }

    return `
I can help you look for authentic Zimbabwean food, but I don't currently have enough verified restaurant information for that specific destination to confidently name additional restaurants.

I would rather not invent a restaurant or menu detail.

If you are already in the destination, checking current local listings or asking your accommodation or a trusted local guide can help identify places serving traditional food.
    `.trim();
  }

  if (isHotelRequest) {
    return `
I can help you compare accommodation options, but I don't want to invent current prices, availability or hotel details.

Tell me your destination and whether you're looking for budget, comfortable or luxury accommodation, and I'll narrow the options down.
    `.trim();
  }

  if (isExperienceRequest) {
    const destination =
      destinations[0]?.name;

    return `
There are several ways to explore ${
      destination ?? "Zimbabwe"
    }, from wildlife and nature to cultural and heritage experiences.

Tell me what type of experience interests you most and I can narrow it down.
    `.trim();
  }

  if (isTripPlanningRequest) {
    return `
I can help you build a practical African journey based on your destination, available time, interests and budget.

Tell me where you want to go and how many days you have, and I'll build the route around that.
    `.trim();
  }

  return `
Welcome to Zuri.

I can help you discover destinations, food, wildlife, culture, accommodation and experiences across Zimbabwe and Africa.

Tell me where you'd like to explore and what you're interested in.
  `.trim();
}

/*
|--------------------------------------------------------------------------
| TRIP SNAPSHOT
|--------------------------------------------------------------------------
|
| IMPORTANT:
| This function intentionally returns {} unless the user is genuinely
| asking for trip planning.
|--------------------------------------------------------------------------
*/

function buildLocalTripSummary(
  message: string
): TripSummary {
  const {
    isTripPlanningRequest,
  } = detectIntent(message);

  if (!isTripPlanningRequest) {
    return {};
  }

  const text =
    message.toLowerCase();

  let travelStyle =
    "Safari & Adventure";

  let bestFor =
    "Travellers interested in African wildlife and adventure";

  let accommodation =
    "Accommodation suited to the route";

  let activities =
    "Wildlife, culture and local experiences";

  if (
    text.includes("culture") ||
    text.includes("history") ||
    text.includes("heritage")
  ) {
    travelStyle =
      "Culture & Heritage";

    bestFor =
      "Travellers interested in culture and history";

    accommodation =
      "Comfortable hotel or cultural lodge";

    activities =
      "Culture, heritage, food and local experiences";
  }

  if (
    text.includes("romantic") ||
    text.includes("honeymoon") ||
    text.includes("couple")
  ) {
    travelStyle =
      "Romantic Escape";

    bestFor =
      "Couples and honeymoon travellers";

    accommodation =
      "Boutique lodge or private accommodation";

    activities =
      "Scenery, dining, relaxation and private experiences";
  }

  if (
    text.includes("family") ||
    text.includes("children") ||
    text.includes("kids")
  ) {
    travelStyle =
      "Family Adventure";

    bestFor =
      "Families and multi-generational travellers";

    accommodation =
      "Family-friendly accommodation";

    activities =
      "Wildlife, sightseeing and family activities";
  }

  const durationMatch =
    text.match(
      /(\d+)\s*(day|days|night|nights)/
    );

  const duration =
    durationMatch
      ? Number(durationMatch[1])
      : undefined;

  return {
    country:
      text.includes("zimbabwe")
        ? "Zimbabwe"
        : undefined,

    duration,

    travelStyle,

    transport:
      "Depends on the route and transport available",

    budget:
      text.includes("budget") ||
      text.includes("cheap") ||
      text.includes("affordable")
        ? "Budget-conscious"
        : undefined,

    accommodation,

    activities,

    food:
      "Local and traditional cuisine where available",

    transportCost:
      "Confirm current route and provider costs",

    dailyEstimate:
      "Depends on accommodation and activities",

    bestFor,

    matchScore:
      "Good starting match",
  };
}

/*
|--------------------------------------------------------------------------
| CLEAN RESTAURANT RESULTS
|--------------------------------------------------------------------------
|
| This is the important server-side protection.
|
| Gemini/extraction cannot introduce a restaurant that does not exist in
| lib/restaurants.ts.
|--------------------------------------------------------------------------
*/

function enforceVerifiedRestaurants(
  restaurants: Recommendation[],
  message: string
): Recommendation[] {
  const verified =
    getVerifiedRestaurants(message);

  const verifiedNames =
    new Set(
      verified.map(
        (restaurant) =>
          restaurant.name.toLowerCase()
      )
    );

  const result: Recommendation[] = [];

  for (const restaurant of restaurants) {
    if (
      !restaurant?.name ||
      !verifiedNames.has(
        restaurant.name.toLowerCase()
      )
    ) {
      continue;
    }

    const verifiedRestaurant =
      verified.find(
        (item) =>
          item.name.toLowerCase() ===
          restaurant.name.toLowerCase()
      );

    if (verifiedRestaurant) {
      result.push(
        verifiedRestaurant
      );
    }
  }

  /*
   * If Gemini did not extract the restaurant correctly, use the verified
   * local records instead.
   */
  if (result.length === 0) {
    return verified;
  }

  return result;
}

/*
|--------------------------------------------------------------------------
| VERIFIED HOTELS ENFORCEMENT
|--------------------------------------------------------------------------
*/

function enforceVerifiedHotels(
  hotels: Recommendation[],
  message: string
): Recommendation[] {
  const verified =
    getVerifiedHotels(message);

  const verifiedNames =
    new Set(
      verified.map(
        (hotel) =>
          hotel.name.toLowerCase()
      )
    );

  const result: Recommendation[] = [];

  for (const hotel of hotels) {
    if (
      !hotel?.name ||
      !verifiedNames.has(
        hotel.name.toLowerCase()
      )
    ) {
      continue;
    }

    const verifiedHotel =
      verified.find(
        (item) =>
          item.name.toLowerCase() ===
          hotel.name.toLowerCase()
      );

    if (verifiedHotel) {
      result.push(
        verifiedHotel
      );
    }
  }

  /*
   * If Gemini did not extract the hotel correctly, use the verified
   * local records instead.
   */
  if (result.length === 0) {
    return verified;
  }

  return result;
}

/*
|--------------------------------------------------------------------------
| DESTINATION FILTER
|--------------------------------------------------------------------------
*/

function enforceDestinations(
  message: string,
  extracted: Destination[]
): Destination[] {
  const mentioned =
    getMentionedDestinations(message);

  /*
   * For focused questions, only show destinations explicitly mentioned
   * by the traveller.
   */

  if (mentioned.length > 0) {
    return mentioned;
  }

  /*
   * For genuine trip planning, Gemini/local destination recommendations
   * can be used.
   */

  const {
    isTripPlanningRequest,
  } = detectIntent(message);

  if (isTripPlanningRequest) {
    return extracted.slice(0, 6);
  }

  return [];
}

/*
|--------------------------------------------------------------------------
| POST /api/chat
|--------------------------------------------------------------------------
*/

export async function POST(
  req: NextRequest
) {
  try {
    /*
     * ------------------------------------------------------
     * REQUEST
     * ------------------------------------------------------
     */

    const body =
      await req.json();

    const message =
      typeof body?.message === "string"
        ? body.message.trim()
        : "";

    const history:
      HistoryMessage[] =
      Array.isArray(body?.history)
        ? body.history
        : [];

    if (!message) {
      return NextResponse.json(
        {
          error:
            "Message is required.",
          code:
            "MESSAGE_REQUIRED",
        },
        {
          status: 400,
        }
      );
    }

    if (message.length > 2000) {
      return NextResponse.json(
        {
          error:
            "Message is too long.",
          code:
            "MESSAGE_TOO_LONG",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * ------------------------------------------------------
     * INTENT
     * ------------------------------------------------------
     */

    const {
      isFoodRequest,
      isHotelRequest,
      isExperienceRequest,
      isDestinationRequest,
      isTripPlanningRequest,
    } = detectIntent(message);

    /*
     * ------------------------------------------------------
     * SAFE HISTORY
     * ------------------------------------------------------
     */

    const safeHistory =
      history
        .filter(
          (item) =>
            item &&
            (
              item.role === "user" ||
              item.role === "zuri"
            ) &&
            typeof item.text ===
              "string" &&
            item.text.trim()
        )
        .slice(-20);

    /*
     * ------------------------------------------------------
     * VERIFIED DATA CONTEXT
     * ------------------------------------------------------
     */

    const restaurantContext =
      isFoodRequest
        ? buildRestaurantContext(
            message
          )
        : "";

    /*
     * ------------------------------------------------------
     * GEMINI
     * ------------------------------------------------------
     */

    let reply = "";

    let geminiAvailable =
      false;

    if (apiKey) {
      try {
        const priorTurns =
          safeHistory.map(
            (item) => ({
              role:
                item.role === "user"
                  ? "user"
                  : "model",

              parts: [
                {
                  text:
                    item.text.trim(),
                },
              ],
            })
          );

        const contents = [
          ...priorTurns,

          {
            role: "user" as const,

            parts: [
              {
                text:
                  message +
                  (
                    restaurantContext
                      ? `\n\n${restaurantContext}`
                      : ""
                  ),
              },
            ],
          },
        ];

        const ai =
          new GoogleGenAI({
            apiKey,
          });

        const response =
          await ai.models.generateContent(
            {
              model:
                "gemini-3.6-flash",

              contents,

              config: {
                systemInstruction:
                  ZURI_SYSTEM_INSTRUCTION,

                temperature:
                  0.5,
              },
            }
          );

        reply =
          response.text?.trim() ??
          "";

        if (reply) {
          geminiAvailable =
            true;
        }
      } catch (error: unknown) {
        const errorObj =
          error as
            | { status?: unknown; statusCode?: unknown; message?: unknown }
            | null
            | undefined;

        const status =
          typeof errorObj?.status ===
          "number"
            ? errorObj.status
            : typeof errorObj?.statusCode ===
                "number"
              ? errorObj.statusCode
              : 500;

        const errorMessage =
          typeof errorObj?.message ===
          "string"
            ? errorObj.message
            : "";

        const quotaError =
          status === 429 ||
          errorMessage.includes(
            "RESOURCE_EXHAUSTED"
          ) ||
          errorMessage
            .toLowerCase()
            .includes("quota") ||
          errorMessage
            .toLowerCase()
            .includes(
              "rate limit"
            );

        if (quotaError) {
          console.warn(
            "Gemini quota reached. Using local fallback."
          );
        } else {
          console.error(
            "Gemini generation failed. Using local fallback:",
            error
          );
        }
      }
    } else {
      console.warn(
        "GEMINI_API_KEY is missing. Using local fallback."
      );
    }

    /*
     * ------------------------------------------------------
     * LOCAL FALLBACK
     * ------------------------------------------------------
     */

    if (!geminiAvailable) {
      reply =
        buildLocalFallback(
          message
        );
    }

    /*
     * ------------------------------------------------------
     * STRUCTURED DATA
     * ------------------------------------------------------
     */

    let structuredData = {
      trip: {} as TripSummary,

      destinations:
        [] as Destination[],

      hotels:
        [] as Recommendation[],

      restaurants:
        [] as Recommendation[],

      experiences:
        [] as Experience[],

      followUpQuestions:
        [] as string[],
    };

    /*
     * Only extract when Gemini actually succeeded.
     *
     * This avoids making another Gemini request when quota has already
     * failed.
     */

    if (geminiAvailable) {
      try {
        const extracted =
          await extractTravelData(
            reply,
            message
          );

        structuredData = {
          trip:
            extracted.trip ??
            {},

          destinations:
            extracted.destinations ??
            [],

          hotels:
            extracted.hotels ??
            [],

          restaurants:
            extracted.restaurants ??
            [],

          experiences:
            extracted.experiences ??
            [],

          followUpQuestions:
            extracted.followUpQuestions ??
            [],
        };
      } catch (error) {
        console.error(
          "Structured travel extraction failed:",
          error
        );
      }
    }

    /*
     * ------------------------------------------------------
     * FINAL CATEGORY ROUTING
     * ------------------------------------------------------
     *
     * THIS IS THE SINGLE SOURCE OF TRUTH FOR THE UI.
     * ------------------------------------------------------
     */

    let destinations:
      Destination[] = [];

    let hotels:
      Recommendation[] = [];

    let restaurants:
      Recommendation[] = [];

    let experiences:
      Experience[] = [];

    /*
     * FOOD
     */

    if (isFoodRequest) {
      restaurants =
        enforceVerifiedRestaurants(
          structuredData.restaurants,
          message
        );

      /*
       * Only show the destination if the user actually mentioned it.
       */

      destinations =
        enforceDestinations(
          message,
          structuredData.destinations
        );

      /*
       * HARD RULE:
       *
       * Food questions NEVER receive:
       *
       * - hotels
       * - experiences
       * - trip snapshot
       */

      hotels = [];

      experiences = [];
    }

    /*
     * HOTEL
     */

    else if (isHotelRequest) {
      hotels =
        enforceVerifiedHotels(
          structuredData.hotels,
          message
        );

      destinations =
        enforceDestinations(
          message,
          structuredData.destinations
        );

      restaurants = [];

      experiences = [];
    }

    /*
     * DESTINATION
     *
     * Checked before EXPERIENCE: destination-recommendation questions
     * ("Which Zimbabwe destinations should I visit?") often contain
     * "visit", which the experience keyword list also matches. Without
     * this branch taking priority, those questions get misclassified
     * as experience requests and never show destination cards.
     */

    else if (isDestinationRequest) {
      destinations =
        enforceDestinations(
          message,
          structuredData.destinations
        );

      if (destinations.length === 0) {
        destinations =
          getDestinationRecommendations(
            message,
            reply
          ) as Destination[];
      }

      hotels = [];

      restaurants = [];

      experiences = [];
    }

    /*
     * EXPERIENCE
     */

    else if (isExperienceRequest) {
      experiences =
        structuredData.experiences;

      destinations =
        enforceDestinations(
          message,
          structuredData.destinations
        );

      hotels = [];

      restaurants = [];
    }

    /*
     * TRIP PLANNING
     */

    else if (
      isTripPlanningRequest
    ) {
      destinations =
        structuredData.destinations;

      /*
       * Gemini's structured extraction doesn't reliably capture
       * destinations that are only mentioned inline throughout a
       * day-by-day itinerary (e.g. "Day 3: Journey to Hwange National
       * Park") rather than listed as standalone recommendations. If
       * extraction came back empty, fall back to scanning the actual
       * generated reply text for named destinations - the itinerary
       * itself almost always names them even when the structured
       * extraction step misses them.
       */

      if (destinations.length === 0) {
        destinations =
          getMentionedDestinations(
            `${message} ${reply}`
          );
      }

      hotels =
        enforceVerifiedHotels(
          structuredData.hotels,
          message
        );

      /*
       * enforceVerifiedHotels() only guards against Gemini inventing
       * hotels - it doesn't add ones Gemini simply failed to extract.
       * A multi-region itinerary (e.g. Victoria Falls + Hwange) can
       * come back with only one relevant hotel if Gemini's structured
       * extraction under-reported. Supplement with any additional
       * verified hotels relevant to regions mentioned anywhere across
       * the full generated itinerary text, so a trip covering both
       * regions shows hotel options for both, not just whichever one
       * extraction happened to catch.
       */

      const additionalHotels =
        getVerifiedHotels(
          `${message} ${reply}`
        );

      for (const hotel of additionalHotels) {
        const alreadyIncluded =
          hotels.some(
            (existing) =>
              existing.name.toLowerCase() ===
              hotel.name.toLowerCase()
          );

        if (!alreadyIncluded) {
          hotels.push(hotel);
        }
      }

      restaurants =
        structuredData.restaurants;

      experiences =
        structuredData.experiences;
    }

    /*
     * GENERAL QUESTION
     */

    else {
      /*
       * General questions should not automatically become a full travel
       * recommendation dashboard.
       */

      destinations =
        enforceDestinations(
          message,
          structuredData.destinations
        );

      /*
       * enforceDestinations() only returns results when the traveller
       * names a specific place (e.g. "Tell me about Victoria Falls") or
       * this is a trip-planning request. A general recommendation
       * question with no named place - e.g. "Which Zimbabwe
       * destinations should I visit?" - falls through to an empty
       * array, so no destination cards show up at all even though the
       * traveller is directly asking for destination suggestions.
       *
       * getDestinationRecommendations() (lib/destinationRecommendations.ts)
       * already exists for exactly this case: it matches the message
       * against the local destination records, or - if the message is
       * generally about Zimbabwe/Africa/travel with no specific match -
       * returns the strongest available destinations. It was imported
       * at the top of this file but never actually called anywhere.
       * Only used here as a fallback, so food/hotel/experience
       * questions (which call enforceDestinations directly, not this
       * branch) are unaffected.
       */

      if (destinations.length === 0) {
        destinations =
          getDestinationRecommendations(
            message,
            reply
          ) as Destination[];
      }

      hotels = [];

      restaurants = [];

      experiences = [];
    }

    /*
     * ------------------------------------------------------
     * TRIP SNAPSHOT
     * ------------------------------------------------------
     */

    let trip:
      TripSummary = {};

    if (isTripPlanningRequest) {
      trip = {
        ...buildLocalTripSummary(
          message
        ),
        ...structuredData.trip,
      };
    }

    /*
     * CRITICAL:
     *
     * Focused requests ALWAYS get an empty trip.
     */

    if (
      isFoodRequest ||
      isHotelRequest ||
      isExperienceRequest ||
      isDestinationRequest
    ) {
      trip = {};
    }

    /*
     * ------------------------------------------------------
     * FOLLOW-UP QUESTIONS
     * ------------------------------------------------------
     */

    let followUpQuestions:
      string[] = [];

    if (isFoodRequest) {
      followUpQuestions = [
        "Would you prefer a casual local meal or a more structured cultural dining experience?",
      ];
    } else if (
      isHotelRequest
    ) {
      followUpQuestions = [
        "Would you like me to narrow the accommodation options by budget or travel style?",
      ];
    } else if (
      isDestinationRequest
    ) {
      followUpQuestions = [
        "Would you like recommendations focused on wildlife, history and culture, or scenic relaxation?",
      ];
    } else if (
      isExperienceRequest
    ) {
      followUpQuestions = [
        "Would you like me to focus on culture, wildlife, adventure or a relaxed experience?",
      ];
    } else if (
      isTripPlanningRequest
    ) {
      followUpQuestions =
        structuredData
          .followUpQuestions
          .filter(
            (question) =>
              typeof question ===
                "string" &&
              question.trim()
          )
          .slice(0, 1);

      if (
        followUpQuestions.length ===
        0
      ) {
        followUpQuestions = [
          "Would you prefer a budget, comfortable or luxury version of this journey?",
        ];
      }
    } else {
      followUpQuestions = [
        "What destination or type of experience would you like to explore?",
      ];
    }

    /*
     * ------------------------------------------------------
     * FINAL RESPONSE
     * ------------------------------------------------------
     */

    const responseData:
      ChatResponse = {
      answer:
        reply,

      trip,

      destinations,

      hotels,

      restaurants,

      experiences,

      followUpQuestions,
    };

    return NextResponse.json(
      responseData,
      {
        status: 200,
      }
    );
  } catch (error) {
    /*
     * ------------------------------------------------------
     * FINAL SAFETY NET
     * ------------------------------------------------------
     */

    console.error(
      "Zuri API error:",
      error
    );

    return NextResponse.json(
      {
        answer:
          "I'm having trouble processing that request right now. Please try again.",

        trip: {},

        destinations: [],

        hotels: [],

        restaurants: [],

        experiences: [],

        followUpQuestions: [
          "Would you like to try your question again?",
        ],
      },
      {
        status: 200,
      }
    );
  }
}