import Image from "next/image";
import Link from "next/link";
import { getExperienceImage } from "@/lib/experienceImages";

type ExperiencePageProps = {
  params: Promise<{
    name: string;
  }>;
};

type ExperienceDetails = {
  description: string;
  type: string;
  duration: string;
  bestTime: string;
  location: string;
  localInsight: string;
  whatToBring: string;
  budget: string;
  howToGetThere: string;
};

function getExperienceDetails(name: string): ExperienceDetails {
  const activity = name.toLowerCase();

  /*
   * IMPORTANT: order matters here.
   *
   * "victoria falls" and "zambezi" appear in the names of almost every
   * experience in this app (bridge crossings, game drives, helicopter
   * flights, high-wire activities, etc.), since nearly everything is set
   * in that region. If those broad geographic checks run first, they
   * silently hijack experiences that actually belong to a more specific,
   * correct branch further down (e.g. "Zambezi National Park Game Drive"
   * would incorrectly match the cruise branch's "zambezi" check before
   * ever reaching the game-drive branch that actually describes it).
   *
   * Specific activity types are checked first; the broad "victoria
   * falls" / "zambezi" catch-alls run last, right before the generic
   * fallback.
   */

  if (
    activity.includes("bridge") ||
    activity.includes("border crossing")
  ) {
    return {
      description:
        "Walk across the historic 1905 Victoria Falls Bridge spanning the Batoka Gorge, connecting Zimbabwe and Zambia with dramatic views of the river below.",
      type: "Landmark / Walking Experience",
      duration: "Flexible",
      bestTime: "Anytime",
      location: "Victoria Falls, Zimbabwe / Zambia border",
      localInsight:
        "The bridge is also where several adrenaline activities (bungee jump, gorge swing, zipline) are based, so it's worth combining with those if you're interested.",
      whatToBring:
        "Comfortable walking shoes, a camera, sun protection, and identification if you plan to cross fully into Zambia.",
      budget:
        "Walking the bridge itself is generally low-cost; adrenaline activities based there are priced separately by the operator.",
      howToGetThere:
        "The bridge is a short walk from Victoria Falls town and most hotels in the area.",
    };
  }

  if (
    activity.includes("gorge swing") ||
    activity.includes("zipline") ||
    activity.includes("zip-line") ||
    activity.includes("bungee") ||
    activity.includes("high wire") ||
    activity.includes("high-wire") ||
    activity.includes("canopy tour")
  ) {
    return {
      description:
        "Adrenaline activities across the cliffs of the Batoka Gorge, including options like the gorge swing, zipline, canopy tour, and bungee jump.",
      type: "Adventure / Adrenaline",
      duration: "Flexible",
      bestTime: "Anytime",
      location: "Batoka Gorge, Victoria Falls, Zimbabwe",
      localInsight:
        "Operators typically weigh participants and have safety briefings before these activities. Booking ahead is recommended in peak season.",
      whatToBring:
        "Secure footwear, a change of clothes, and a valid ID. Leave loose items and electronics in secure storage unless the operator provides a mount for cameras.",
      budget:
        "Prices vary by activity and operator, and are often cheaper when several activities are combined into a package.",
      howToGetThere:
        "Most gorge-activity operators are based right at the bridge and offer hotel transfers.",
    };
  }

  if (activity.includes("rafting") || activity.includes("white-water") || activity.includes("white water")) {
    return {
      description:
        "Navigate the famed rapids of the Batoka Gorge below Victoria Falls on a white-water rafting trip, seasonal depending on water levels.",
      type: "Water / Adventure",
      duration: "Half day",
      bestTime: "Morning",
      location: "Batoka Gorge, Victoria Falls, Zimbabwe",
      localInsight:
        "Rafting availability and rapid intensity depend heavily on the season and river level, so confirm current conditions with your operator before booking.",
      whatToBring:
        "Swimwear, secure footwear, sun protection, and a change of clothes for afterward.",
      budget:
        "Prices vary by operator, season, and trip length. Confirm current rates before booking.",
      howToGetThere:
        "Rafting operators typically arrange transfers from Victoria Falls town and nearby hotels.",
    };
  }

  if (
    activity.includes("game drive") ||
    activity.includes("game-drive") ||
    activity.includes("hwange")
  ) {
    return {
      description:
        "Explore Zimbabwe's wilderness in an open safari vehicle while looking for elephants, lions, wild dogs, and other wildlife.",
      type: "Safari / Wildlife",
      duration: "Half day",
      bestTime: "Early Morning & Late Afternoon",
      location: "Hwange National Park, Zimbabwe",
      localInsight:
        "Wildlife is often most active during the cooler hours of the morning and late afternoon. Patience is part of the safari experience.",
      whatToBring:
        "Neutral-coloured clothing, binoculars, sunscreen, a hat, water, a camera, and a warm layer for early morning drives.",
      budget:
        "Safari costs vary considerably depending on park fees, accommodation, vehicle, guide, and package. Confirm current rates with your operator.",
      howToGetThere:
        "Hwange can be reached by road from Victoria Falls or other Zimbabwean cities. Safari lodges can often arrange transfers and game drives.",
    };
  }

  if (
    activity.includes("walking safari") ||
    activity.includes("waterhole") ||
    activity.includes("safari")
  ) {
    return {
      description:
        "Walk through the African bush with an experienced guide while learning about tracking, wildlife signs, plants, and the surrounding ecosystem.",
      type: "Safari / Walking Experience",
      duration: "Morning",
      bestTime: "Early Morning",
      location: "Zimbabwe",
      localInsight:
        "A walking safari offers a very different perspective from a vehicle safari. Your guide can help you notice tracks, insects, plants, birds, and other details that are easy to miss from a vehicle.",
      whatToBring:
        "Sturdy walking shoes, neutral clothing, sunscreen, a hat, water, binoculars, and a camera.",
      budget:
        "Prices depend on the safari operator, location, guide, and length of the experience.",
      howToGetThere:
        "Walking safaris are normally organised through safari lodges, camps, or licensed guides operating in suitable wildlife areas.",
    };
  }

  if (activity.includes("helicopter")) {
    return {
      description:
        "Take to the skies for an unforgettable aerial view of Victoria Falls, the surrounding landscape, and the Zambezi River.",
      type: "Aerial Adventure",
      duration: "Morning",
      bestTime: "Morning",
      location: "Victoria Falls, Zimbabwe",
      localInsight:
        "Morning flights can offer excellent visibility and softer light for photography. Weather conditions can affect flight schedules.",
      whatToBring:
        "Comfortable clothing, sunglasses, a camera, and a light jacket.",
      budget:
        "Helicopter flight prices vary by operator, flight duration, and season. Confirm current prices before booking.",
      howToGetThere:
        "Most helicopter operators provide transfers from hotels and lodges in the Victoria Falls area.",
    };
  }

  if (activity.includes("food") || activity.includes("cuisine")) {
    return {
      description:
        "Discover Zimbabwe through its food, from traditional dishes and local ingredients to authentic flavours and cooking traditions.",
      type: "Food / Cultural Experience",
      duration: "Flexible",
      bestTime: "Lunch or Evening",
      location: "Zimbabwe",
      localInsight:
        "Food is one of the best ways to connect with local culture. Ask about traditional ingredients and how dishes are prepared.",
      whatToBring:
        "An appetite, comfortable clothing, water, and a camera if you want to document the experience.",
      budget:
        "Costs vary depending on the restaurant, food experience, menu, and location.",
      howToGetThere:
        "Food experiences are generally available through local restaurants, guides, hotels, and organised cultural tours.",
    };
  }

  if (
    activity.includes("market") ||
    activity.includes("artisan") ||
    activity.includes("craft") ||
    activity.includes("cultural")
  ) {
    return {
      description:
        "Meet local artists and discover Zimbabwean stone sculptures, woodcarvings, paintings, traditional crafts, and local culture.",
      type: "Culture / Local Experience",
      duration: "Afternoon",
      bestTime: "Afternoon",
      location: "Victoria Falls Region, Zimbabwe",
      localInsight:
        "Take time to speak with the artists and learn the story behind the pieces. Buying directly from local makers can make your visit more meaningful.",
      whatToBring:
        "Comfortable clothing, water, sunscreen, and some cash for locally made crafts and souvenirs.",
      budget:
        "Entry may be free or vary by attraction. Craft prices depend on the item and artist.",
      howToGetThere:
        "Most cultural and artisan experiences around Victoria Falls can be reached by taxi, hotel transfer, or an organised local tour.",
    };
  }

  if (activity.includes("canoe")) {
    return {
      description:
        "Explore Zimbabwe's waterways by canoe while experiencing wildlife, scenery, and the peaceful rhythm of the African wilderness.",
      type: "Water / Adventure",
      duration: "Half day",
      bestTime: "Morning",
      location: "Zimbabwe",
      localInsight:
        "Canoeing provides a quieter way to experience the wilderness, but always follow your professional guide's safety instructions around wildlife.",
      whatToBring:
        "Light clothing, sunscreen, hat, water, waterproof bags, and a camera.",
      budget:
        "Prices vary according to location, operator, duration, and safari package.",
      howToGetThere:
        "Canoe experiences are normally arranged through safari camps and licensed operators in suitable waterways.",
    };
  }

  if (activity.includes("hike") || activity.includes("hiking")) {
    return {
      description:
        "Explore Zimbabwe's landscapes on foot through scenic trails, viewpoints, mountains, and natural surroundings.",
      type: "Hiking / Nature",
      duration: "Half day",
      bestTime: "Early Morning",
      location: "Zimbabwe",
      localInsight:
        "Starting early helps avoid the hottest part of the day and gives you more comfortable conditions for walking and photography.",
      whatToBring:
        "Sturdy walking shoes, water, sunscreen, a hat, comfortable clothing, and a small backpack.",
      budget:
        "Costs vary depending on the trail, guide, park access, and transport requirements.",
      howToGetThere:
        "Transport depends on the specific hiking destination. Local guides and tour operators can arrange transfers where available.",
    };
  }

  /*
   * Broad geographic catch-alls, checked last among the specific
   * branches since "cruise"/"zambezi" and "victoria falls"/"rainforest"
   * appear in the names of many unrelated experience types above.
   */

  if (activity.includes("cruise") || activity.includes("zambezi")) {
    return {
      description:
        "Relax along the Zambezi River while watching hippos, elephants, birds, and the African sunset.",
      type: "River Experience",
      duration: "Evening",
      bestTime: "Sunset",
      location: "Zambezi River, Zimbabwe",
      localInsight:
        "Sunset cruises are one of the most relaxing ways to experience the Zambezi. Keep your camera ready as wildlife often appears along the riverbanks.",
      whatToBring:
        "Light clothing, sunscreen, sunglasses, a camera, and a light jacket for the evening.",
      budget:
        "Prices vary by operator and cruise package. Check with your selected local operator for current rates.",
      howToGetThere:
        "Most cruises depart from lodges and river activity points around Victoria Falls. Your accommodation can usually arrange transport and booking.",
    };
  }

  if (
    activity.includes("victoria falls") ||
    activity.includes("rainforest") ||
    activity.includes("walking tour")
  ) {
    return {
      description:
        "Explore the rainforest trails around Victoria Falls and experience the mist and power of Mosi-oa-Tunya, the Smoke That Thunders.",
      type: "Nature / Walking Experience",
      duration: "Morning",
      bestTime: "Early Morning",
      location: "Victoria Falls, Zimbabwe",
      localInsight:
        "The spray around the Falls can be surprisingly heavy. During wetter periods, expect to get wet and protect cameras and phones with waterproof covers.",
      whatToBring:
        "Comfortable walking shoes, waterproof protection, a camera or phone cover, sunscreen, and drinking water.",
      budget:
        "Entry fees and guided-tour prices vary by season and operator. Confirm current rates before visiting.",
      howToGetThere:
        "Victoria Falls is easily accessible from the town and surrounding hotels. Local taxis, transfers, and guided tours can take you to the rainforest entrance.",
    };
  }

  return {
    description:
      "Discover an unforgettable African experience carefully selected by Zuri for your journey.",
    type: "African Experience",
    duration: "Flexible",
    bestTime: "Anytime",
    location: "Zimbabwe",
    localInsight:
      "Ask Zuri for local recommendations and practical tips before planning your experience.",
    whatToBring:
      "Comfortable clothing, drinking water, sunscreen, and anything specific to the activity.",
    budget:
      "Prices vary depending on the experience and local operator.",
    howToGetThere:
      "Ask Zuri for directions and transport options based on your chosen destination.",
  };
}

function getExperienceEmoji(name: string) {
  const activity = name.toLowerCase();

  if (activity.includes("cruise")) return "🌅";
  if (activity.includes("safari")) return "🦁";
  if (activity.includes("game drive")) return "🦁";
  if (activity.includes("helicopter")) return "🚁";
  if (activity.includes("walk")) return "🥾";
  if (activity.includes("market")) return "🎨";
  if (activity.includes("museum")) return "🏛️";
  if (activity.includes("food")) return "🍽️";
  if (activity.includes("hike")) return "⛰️";
  if (activity.includes("canoe")) return "🛶";

  return "✨";
}

export default async function ExperiencePage({
  params,
}: ExperiencePageProps) {
  const { name } = await params;

  const experienceName = decodeURIComponent(name);

  const experience = getExperienceDetails(experienceName);

  const image = getExperienceImage(experienceName);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-10">

        {/* Back */}
        <Link
          href="/chat"
          className="mb-8 inline-flex items-center text-sm font-semibold text-heritage transition hover:text-white"
        >
          ← Back to Zuri
        </Link>

        {/* Main Card */}
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur">

          {/* Hero */}
          <div className="relative aspect-[16/8] overflow-hidden">

            <Image
              src={image}
              alt={experienceName}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1152px"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-black/20 to-transparent" />

            {/* Experience Icon */}
            <div className="absolute left-6 top-6 rounded-full border border-white/10 bg-black/40 px-4 py-3 text-3xl backdrop-blur">
              {getExperienceEmoji(experienceName)}
            </div>

            {/* Hero Content */}
            <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10">

              <div className="flex flex-wrap items-center gap-3">

                <span className="inline-flex rounded-full bg-heritage/20 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-heritage backdrop-blur">
                  {experience.type}
                </span>

                <span className="rounded-full border border-white/10 bg-black/30 px-4 py-2 text-xs font-semibold text-white/80 backdrop-blur">
                  ✨ Zuri Recommended
                </span>

              </div>

              <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">
                {experienceName}
              </h1>

              <p className="mt-3 text-white/70">
                📍 {experience.location}
              </p>

            </div>
          </div>

          {/* Content */}
          <div className="p-8 md:p-10">

            {/* Description */}
            <section>
              <p className="max-w-4xl text-lg leading-8 text-white/70 md:text-xl">
                {experience.description}
              </p>
            </section>

            {/* Quick Details */}
            <section className="mt-10 grid gap-4 md:grid-cols-3">

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-wide text-white/40">
                  Duration
                </p>

                <p className="mt-2 font-semibold text-white">
                  {experience.duration}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-wide text-white/40">
                  Best Time
                </p>

                <p className="mt-2 font-semibold text-white">
                  {experience.bestTime}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-wide text-white/40">
                  Location
                </p>

                <p className="mt-2 font-semibold text-white">
                  {experience.location}
                </p>
              </div>

            </section>

            {/* Local Insight */}
            <section className="mt-12">

              <div className="flex items-center gap-3">
                <span className="text-3xl">⭐</span>

                <h2 className="text-2xl font-bold">
                  Local Insight
                </h2>
              </div>

              <div className="mt-5 rounded-2xl border border-heritage/20 bg-heritage/5 p-6">
                <p className="leading-8 text-white/75">
                  {experience.localInsight}
                </p>
              </div>

            </section>

            {/* What To Bring */}
            <section className="mt-12">

              <div className="flex items-center gap-3">
                <span className="text-3xl">🎒</span>

                <h2 className="text-2xl font-bold">
                  What To Bring
                </h2>
              </div>

              <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-6">
                <p className="leading-8 text-white/70">
                  {experience.whatToBring}
                </p>
              </div>

            </section>

            {/* Budget + Transport */}
            <section className="mt-12 grid gap-6 md:grid-cols-2">

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">

                <div className="flex items-center gap-3">
                  <span className="text-3xl">💰</span>

                  <h2 className="text-xl font-bold">
                    Typical Budget
                  </h2>
                </div>

                <p className="mt-4 leading-7 text-white/65">
                  {experience.budget}
                </p>

              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">

                <div className="flex items-center gap-3">
                  <span className="text-3xl">🚗</span>

                  <h2 className="text-xl font-bold">
                    How To Get There
                  </h2>
                </div>

                <p className="mt-4 leading-7 text-white/65">
                  {experience.howToGetThere}
                </p>

              </div>

            </section>

            {/* Plan Your Experience */}
            <section className="mt-12 rounded-3xl border border-heritage/20 bg-gradient-to-br from-heritage/10 to-transparent p-8">

              <div className="max-w-2xl">

                <p className="text-sm font-semibold uppercase tracking-wide text-heritage">
                  Plan Your Experience
                </p>

                <h2 className="mt-3 text-3xl font-bold">
                  Want to experience {experienceName} with Zuri?
                </h2>

                <p className="mt-4 leading-7 text-white/60">
                  Ask Zuri to help you plan this experience around your
                  interests, budget and available travel time.
                </p>

                <Link
                  href={`/chat?message=${encodeURIComponent(
                    `Tell me more about ${experienceName} and help me plan this experience.`
                  )}`}
                  className="mt-7 inline-flex items-center rounded-full bg-sunrise px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
                >
                  Ask Zuri About This Experience →
                </Link>

              </div>

            </section>

          </div>
        </div>
      </div>
    </main>
  );
}