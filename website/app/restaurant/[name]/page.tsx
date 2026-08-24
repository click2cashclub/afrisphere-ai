import Image from "next/image";
import Link from "next/link";
import { getRestaurantImage } from "@/lib/restaurantImages";

type RestaurantPageProps = {
  params: Promise<{
    name: string;
  }>;
};

type RestaurantDetails = {
  description: string;
  rating: string;
  cuisine: string;
  location: string;
  type: string;
  whyRecommended: string[];
  highlights: string[];
  bestFor: string;
  practicalInfo: string;
};

function getRestaurantDetails(name: string): RestaurantDetails {
  const restaurant = decodeURIComponent(name)
    .toLowerCase()
    .trim();

  if (
    restaurant.includes("boma") ||
    restaurant.includes("dinner") ||
    restaurant.includes("drum")
  ) {
    return {
      description:
        "A lively Victoria Falls dining experience combining Zimbabwean-inspired cuisine, traditional entertainment and an atmospheric African setting.",
      rating: "★★★★☆",
      cuisine: "African / Zimbabwean",
      location: "Victoria Falls, Zimbabwe",
      type: "Restaurant & Cultural Experience",
      whyRecommended: [
        "Combines dining with traditional entertainment",
        "Good introduction to Zimbabwean culture",
        "Popular option for visitors to Victoria Falls",
      ],
      highlights: [
        "Traditional African-inspired dining",
        "Drumming and cultural entertainment",
        "Suitable for evening experiences",
        "Good option for visitors wanting a cultural experience",
      ],
      bestFor:
        "Travellers looking for an entertaining evening that combines food, culture and traditional Zimbabwean atmosphere.",
      practicalInfo:
        "Dinner schedules, menus and prices may vary. Confirm current availability, menu options and performance times before visiting.",
    };
  }

  if (
    restaurant.includes("victoria falls eatery") ||
    restaurant.includes("victoria falls eater")
  ) {
    return {
      description:
        "A relaxed dining option for travellers exploring Victoria Falls and its surrounding attractions.",
      rating: "★★★★☆",
      cuisine: "Local / International",
      location: "Victoria Falls, Zimbabwe",
      type: "Restaurant",
      whyRecommended: [
        "Convenient for visitors",
        "Relaxed atmosphere",
        "Good option after a day of activities",
      ],
      highlights: [
        "Convenient location",
        "Relaxed dining environment",
        "Suitable after sightseeing",
        "Good for casual meals",
      ],
      bestFor:
        "Travellers looking for a relaxed meal while exploring Victoria Falls.",
      practicalInfo:
        "Menus, opening times and prices may change. Confirm current information before visiting.",
    };
  }

  if (
    restaurant.includes("homely house") ||
    restaurant.includes("homely")
  ) {
    return {
      description:
        "A Zimbabwean restaurant offering traditional local dishes and a welcoming dining experience.",
      rating: "★★★★☆",
      cuisine: "Traditional Zimbabwean",
      location: "Zimbabwe",
      type: "Traditional Restaurant",
      whyRecommended: [
        "Good choice for authentic Zimbabwean food",
        "Traditional local dishes",
        "Welcoming and relaxed dining experience",
      ],
      highlights: [
        "Traditional Zimbabwean cuisine",
        "Local flavours and ingredients",
        "Suitable for cultural food experiences",
        "Good option for travellers wanting authentic local meals",
      ],
      bestFor:
        "Travellers who want to discover authentic Zimbabwean food and traditional flavours.",
      practicalInfo:
        "Menu availability and opening times may change. Confirm current dishes, prices and opening hours before visiting.",
    };
  }

  if (
    restaurant.includes("lookout") ||
    restaurant.includes("café") ||
    restaurant.includes("cafe")
  ) {
    return {
      description:
        "A scenic dining option near Victoria Falls offering travellers an opportunity to enjoy a meal while taking in the surrounding landscape.",
      rating: "★★★★☆",
      cuisine: "International / African",
      location: "Victoria Falls, Zimbabwe",
      type: "Restaurant & Café",
      whyRecommended: [
        "Scenic setting",
        "Convenient for visitors exploring Victoria Falls",
        "Good option for a relaxed meal",
      ],
      highlights: [
        "Scenic views",
        "Relaxed dining atmosphere",
        "Suitable for lunch or casual meals",
        "Convenient for Victoria Falls itineraries",
      ],
      bestFor:
        "Travellers looking for a relaxed meal with scenic surroundings while visiting Victoria Falls.",
      practicalInfo:
        "Menus, opening times and prices may change. Confirm current information and availability before visiting.",
    };
  }

  return {
    description:
      "A recommended dining option selected by Zuri for your African journey.",
    rating: "★★★★☆",
    cuisine: "Local / International",
    location: "Zimbabwe",
    type: "Restaurant",
    whyRecommended: [
      "Suitable for travellers exploring the area",
      "Selected as a useful dining option",
      "Can fit into a wider destination itinerary",
    ],
    highlights: [
      "Convenient dining option",
      "Suitable for exploring the destination",
      "Good option for a local meal",
    ],
    bestFor:
      "Travellers looking for a restaurant that fits their destination itinerary.",
    practicalInfo:
      "Restaurant menus, prices, opening times and availability can change. Confirm current information before visiting.",
  };
}

export default async function RestaurantPage({
  params,
}: RestaurantPageProps) {
  const { name } = await params;

  const restaurantName = decodeURIComponent(name);

  const restaurant = getRestaurantDetails(restaurantName);

  const restaurantImage = getRestaurantImage(restaurantName);

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
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl">

          {/* Hero */}
          <div className="relative aspect-[16/8] overflow-hidden">

            <Image
              src={restaurantImage}
              alt={restaurantName}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1200px"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

            {/* Restaurant Icon */}
            <div className="absolute left-6 top-6 rounded-full border border-white/10 bg-black/40 px-4 py-3 text-2xl backdrop-blur">
              🍽️
            </div>

            {/* Hero Content */}
            <div className="absolute bottom-0 left-0 right-0 p-7 md:p-10">

              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-heritage">
                {restaurant.type}
              </p>

              <h1 className="text-4xl font-black md:text-6xl">
                {restaurantName}
              </h1>

              <div className="mt-5 flex flex-wrap gap-3">

                <span className="rounded-full border border-white/10 bg-black/40 px-4 py-2 text-sm backdrop-blur">
                  📍 {restaurant.location}
                </span>

                <span className="rounded-full border border-white/10 bg-black/40 px-4 py-2 text-sm backdrop-blur">
                  🍴 {restaurant.cuisine}
                </span>

                <span className="rounded-full border border-white/10 bg-black/40 px-4 py-2 text-sm font-semibold text-yellow-300 backdrop-blur">
                  ★ {restaurant.rating}
                </span>

              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 md:p-10">

            {/* Description */}
            <section>
              <p className="max-w-4xl text-lg leading-8 text-white/70 md:text-xl">
                {restaurant.description}
              </p>
            </section>

            {/* Quick Details */}
            <section className="mt-10 grid gap-4 md:grid-cols-3">

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-wide text-white/40">
                  Rating
                </p>

                <p className="mt-2 font-semibold text-yellow-300">
                  {restaurant.rating}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-wide text-white/40">
                  Cuisine
                </p>

                <p className="mt-2 font-semibold text-white">
                  {restaurant.cuisine}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-wide text-white/40">
                  Location
                </p>

                <p className="mt-2 font-semibold text-white">
                  {restaurant.location}
                </p>
              </div>

            </section>

            {/* Why Zuri */}
            <section className="mt-12">

              <div className="flex items-center gap-3">

                <span className="text-3xl">
                  ⭐
                </span>

                <h2 className="text-2xl font-bold">
                  Why Zuri Recommends It
                </h2>

              </div>

              <ul className="mt-6 grid gap-3 md:grid-cols-2">

                {restaurant.whyRecommended.map((reason) => (
                  <li
                    key={reason}
                    className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-white/70"
                  >
                    <span className="mt-0.5 text-heritage">
                      ✓
                    </span>

                    <span>
                      {reason}
                    </span>
                  </li>
                ))}

              </ul>

            </section>

            {/* Dining Highlights */}
            <section className="mt-12">

              <div className="flex items-center gap-3">

                <span className="text-3xl">
                  🍲
                </span>

                <h2 className="text-2xl font-bold">
                  Dining Highlights
                </h2>

              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">

                {restaurant.highlights.map((highlight) => (
                  <div
                    key={highlight}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5"
                  >
                    <p className="font-semibold text-white">
                      {highlight}
                    </p>
                  </div>
                ))}

              </div>

            </section>

            {/* Best For */}
            <section className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-7">

              <div className="flex items-center gap-3">

                <span className="text-3xl">
                  🎯
                </span>

                <h2 className="text-xl font-bold">
                  Best For
                </h2>

              </div>

              <p className="mt-4 leading-7 text-white/65">
                {restaurant.bestFor}
              </p>

            </section>

            {/* Practical Information */}
            <section className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-7">

              <div className="flex items-center gap-3">

                <span className="text-3xl">
                  ℹ️
                </span>

                <h2 className="text-xl font-bold">
                  Practical Information
                </h2>

              </div>

              <p className="mt-4 leading-7 text-white/65">
                {restaurant.practicalInfo}
              </p>

            </section>

            {/* Ask Zuri */}
            <section className="mt-12 rounded-3xl border border-heritage/20 bg-gradient-to-br from-heritage/10 to-transparent p-8">

              <p className="text-sm font-semibold uppercase tracking-widest text-heritage">
                Plan Your Meal
              </p>

              <h2 className="mt-3 text-3xl font-bold">
                Want to explore {restaurantName} with Zuri?
              </h2>

              <p className="mt-4 max-w-2xl leading-7 text-white/60">
                Ask Zuri to help you discover the menu, dining
                experience and nearby attractions that fit your
                journey.
              </p>

              <Link
                href={`/chat?message=${encodeURIComponent(
                  `Tell me more about ${restaurantName} and help me plan a visit there.`
                )}`}
                className="mt-7 inline-flex items-center rounded-full bg-sunrise px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
              >
                Ask Zuri About This Restaurant →
              </Link>

            </section>

          </div>
        </div>
      </div>
    </main>
  );
}