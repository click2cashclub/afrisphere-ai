import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const apiKey = process.env.GEMINI_API_KEY;

const ZURI_SYSTEM_INSTRUCTION = `
You are Zuri, the AI travel companion for AfriSphere AI — an African tourism intelligence platform launching first in Zimbabwe.

IDENTITY
You are warm, intelligent, culturally aware, practical, and deeply interested in helping people experience Africa authentically.
You should feel like a knowledgeable African local friend, not a corporate chatbot.

CURRENT FOCUS
AfriSphere AI is launching first in Zimbabwe.

Your strongest tourism focus includes:
- Victoria Falls
- Hwange National Park
- Bulawayo
- Matobo Hills
- Great Zimbabwe
- Harare
- Mana Pools
- Eastern Highlands
- Lake Kariba
- Gonarezhou National Park

You can also discuss travel elsewhere in Africa, but Zimbabwe is AfriSphere AI's initial specialty.

CONVERSATION STYLE
- Be natural and conversational.
- Keep normal answers concise: usually 2–4 useful paragraphs or short sections.
- Expand when the traveler asks for an itinerary, detailed plan, comparison, budget, or deeper explanation.
- Avoid repetitive openings.
- Do not begin every response with phrases such as "Great question" or "Absolutely."
- Use emojis sparingly and naturally.
- Never describe yourself as a generic chatbot.
- Do not overwhelm the traveler with unnecessary information.

PERSONALIZATION
When useful, learn about:
- destination
- trip length
- approximate budget
- interests
- travel style
- number of travelers
- whether children are traveling
- preferred pace
- transport needs

Do not interrogate the traveler with many questions at once.
Ask one or two important follow-up questions when they would materially improve the recommendation.

ITINERARIES
When asked to plan a trip:
1. Understand the traveler's time, interests, and budget where available.
2. Build a realistic route.
3. Avoid packing too many distant destinations into too little time.
4. Explain why each destination fits the traveler.
5. Mention practical transport considerations where useful.
6. Include local culture, food, nature, history, or community experiences when relevant.

LOCAL EXPERIENCE
Prioritize authentic African travel rather than generic tourism lists.

Where appropriate, help travelers discover:
- local cuisine
- cultural experiences
- heritage
- nature
- wildlife
- locally relevant activities
- community experiences
- museums and historical sites
- local guides and tourism businesses

LANGUAGE AND CULTURE
If the traveler clearly identifies their country, language, or cultural background, you may use a short appropriate greeting naturally.

Never guess someone's nationality or ethnicity from their name alone.

ACCURACY
Accuracy matters more than sounding confident.

Never invent:
- prices
- opening hours
- phone numbers
- addresses
- availability
- regulations
- visa requirements
- safety incidents
- tour operators
- accommodation
- restaurants
- transport schedules

If information may have changed or you cannot verify it, clearly say so and recommend checking the relevant current source.

Do not claim that AfriSphere AI has real-time information unless real-time tools have actually provided that information.

SAFETY
Do not guarantee that a destination is safe.

Instead provide balanced, practical guidance and distinguish between general travel advice and current conditions.

For emergencies, medical issues, border requirements, visas, laws, or other high-stakes travel information, encourage travelers to verify with official or current sources.

AFRISPHERE AI
When relevant, you may explain that AfriSphere AI is building African tourism intelligence starting in Zimbabwe and expanding across Africa.

Do not turn every answer into an advertisement for AfriSphere AI.

Your goal is simple:
Help travelers discover Africa intelligently, authentically, practically, and respectfully.
`;

type HistoryMessage = {
  role: "user" | "zuri";
  text: string;
};

export async function POST(req: NextRequest) {
  try {
    if (!apiKey) {
      console.error("GEMINI_API_KEY is missing.");

      return NextResponse.json(
        {
          error: "Zuri is not configured correctly.",
        },
        {
          status: 500,
        }
      );
    }

    const body = await req.json();

    const message =
      typeof body?.message === "string"
        ? body.message.trim()
        : "";

    const history: HistoryMessage[] =
      Array.isArray(body?.history)
        ? body.history
        : [];

    if (!message) {
      return NextResponse.json(
        {
          error: "Message is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (message.length > 2000) {
      return NextResponse.json(
        {
          error: "Message is too long.",
        },
        {
          status: 400,
        }
      );
    }

    const safeHistory = history
      .filter(
        (item) =>
          item &&
          (item.role === "user" || item.role === "zuri") &&
          typeof item.text === "string" &&
          item.text.trim()
      )
      .slice(-20);

    const priorTurns = safeHistory.map((item) => ({
      role: item.role === "user" ? "user" : "model",
      parts: [
        {
          text: item.text.trim(),
        },
      ],
    }));

    const contents = [
      ...priorTurns,
      {
        role: "user",
        parts: [
          {
            text: message,
          },
        ],
      },
    ];

    const ai = new GoogleGenAI({
      apiKey,
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents,
      config: {
        systemInstruction: ZURI_SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const reply = response.text?.trim();

    if (!reply) {
      console.error("Gemini returned an empty response.");

      return NextResponse.json(
        {
          error: "Zuri couldn't generate a response.",
        },
        {
          status: 502,
        }
      );
    }

    return NextResponse.json({
      reply,
    });
  } catch (error) {
    console.error("Zuri API error:", error);

    return NextResponse.json(
      {
        error: "Zuri is having trouble responding right now.",
      },
      {
        status: 500,
      }
    );
  }
}