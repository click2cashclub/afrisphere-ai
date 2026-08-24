import Image from "next/image";
import Link from "next/link";
import { getHotelImage } from "@/lib/hotelImages";

type HotelPageProps = {
  params: Promise<{
    name: string;
  }>;
};

type HotelDetails = {
  description: string;
  rating: string;
  priceRange: string;
  location: string;
  type: string;
  whyRecommended: string[];
  highlights: string[];
  bestFor: string;
  practicalInfo: string;
};

function getHotelDetails(name: string): HotelDetails {
  const hotel = name.toLowerCase();

  if (hotel.includes("victoria falls safari lodge")) {
    return {
      description:
        "A safari-style lodge overlooking a wildlife-rich waterhole near Victoria Falls, offering a memorable combination of comfort and wilderness.",
      rating: "★★★★★",
      priceRange: "$$$",
      location: "Victoria Falls, Zimbabwe",
      type: "Safari Lodge",
      whyRecommended: [
        "Excellent base for exploring Victoria Falls",
        "Safari atmosphere close to town",
        "Wildlife and waterhole views",
      ],
      highlights: [
        "Close to Victoria Falls attractions",
        "Safari-inspired atmosphere",
        "Wildlife viewing opportunities",
        "Suitable for adventure-focused travellers",
      ],
      bestFor:
        "Travellers looking for a comfortable safari-style stay while exploring Victoria Falls.",
      practicalInfo:
        "Accommodation and activity prices can vary by season. Confirm current rates, availability and inclusions before booking.",
    };
  }

  if (hotel.includes("ilala lodge")) {
    return {
      description:
        "An elegant lodge in Victoria Falls offering convenient access to the Falls and surrounding attractions.",
      rating: "★★★★☆",
      priceRange: "$$$",
      location: "Victoria Falls, Zimbabwe",
      type: "Lodge",
      whyRecommended: [
        "Very convenient location",
        "Easy access to Victoria Falls",
        "Comfortable option for shorter stays",
      ],
      highlights: [
        "Convenient location",
        "Easy access to town",
        "Suitable for Victoria Falls itineraries",
        "Comfortable lodge environment",
      ],
      bestFor:
        "Travellers who want convenient access to Victoria Falls and nearby activities.",
      practicalInfo:
        "Confirm current room rates, availability, meal plans and activity arrangements directly before booking.",
    };
  }

  if (hotel.includes("hide safari camp")) {
    return {
      description:
        "An intimate safari camp designed around immersive wildlife experiences in Hwange National Park.",
      rating: "★★★★★",
      priceRange: "$$$$",
      location: "Hwange National Park, Zimbabwe",
      type: "Safari Camp",
      whyRecommended: [
        "Immersive safari experience",
        "Excellent wildlife opportunities",
        "Strong choice for safari enthusiasts",
      ],
      highlights: [
        "Wildlife-focused accommodation",
        "Tented safari atmosphere",
        "Close connection with the surrounding wilderness",
        "Ideal for safari experiences",
      ],
      bestFor:
        "Wildlife enthusiasts and travellers seeking an immersive Hwange safari.",
      practicalInfo:
        "Safari packages can vary significantly. Confirm accommodation, transfers, park fees and activities before booking.",
    };
  }

  if (hotel.includes("somalisa camp")) {
    return {
      description:
        "A luxury tented safari camp offering an intimate wilderness experience in Hwange National Park.",
      rating: "★★★★★",
      priceRange: "$$$$",
      location: "Hwange National Park, Zimbabwe",
      type: "Luxury Safari Camp",
      whyRecommended: [
        "Strong safari atmosphere",
        "Excellent for wildlife enthusiasts",
        "Luxury tented accommodation",
      ],
      highlights: [
        "Luxury safari setting",
        "Immersive wilderness experience",
        "Wildlife-focused activities",
        "Suitable for special safari trips",
      ],
      bestFor:
        "Travellers looking for a premium and immersive Hwange safari experience.",
      practicalInfo:
        "Rates and safari inclusions vary. Confirm current availability, transfers, meals and activities before booking.",
    };
  }

  if (hotel.includes("the victoria falls hotel")) {
    return {
      description:
        "A historic hotel in Victoria Falls offering classic accommodation close to one of Africa's most famous natural attractions.",
      rating: "★★★★☆",
      priceRange: "$$$$",
      location: "Victoria Falls, Zimbabwe",
      type: "Historic Hotel",
      whyRecommended: [
        "Historic character",
        "Excellent Victoria Falls location",
        "Classic accommodation experience",
      ],
      highlights: [
        "Historic hotel atmosphere",
        "Convenient location",
        "Close to Victoria Falls",
        "Suitable for classic luxury stays",
      ],
      bestFor:
        "Travellers looking for a historic and memorable stay in Victoria Falls.",
      practicalInfo:
        "Room rates, availability and services can vary by season. Confirm current information before booking.",
    };
  }

  return {
    description:
      "A recommended accommodation option selected by Zuri for your African journey.",
    rating: "★★★★☆",
    priceRange: "$$",
    location: "Zimbabwe",
    type: "Accommodation",
    whyRecommended: [
      "Suitable for travellers exploring the area",
      "Selected as a useful accommodation option",
      "Can serve as a base for local experiences",
    ],
    highlights: [
      "Convenient accommodation option",
      "Suitable for exploring the destination",
      "Useful base for local activities",
    ],
    bestFor:
      "Travellers looking for accommodation that fits their destination itinerary.",
    practicalInfo:
      "Hotel prices, availability and services can change. Confirm current information directly before booking.",
  };
}

export default async function HotelPage({
  params,
}: HotelPageProps) {
  const { name } = await params;

  const hotelName = decodeURIComponent(name);
  const hotel = getHotelDetails(hotelName);
  const hotelImage = getHotelImage(hotelName);

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

        {/* Hotel Card */}
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">

          {/* Hero */}
          <div className="relative h-[420px] w-full">
            <Image
              src={hotelImage}
              alt={hotelName}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1200px"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-heritage">
                {hotel.type}
              </p>

              <h1 className="mt-3 text-4xl font-bold md:text-5xl">
                {hotelName}
              </h1>

              <p className="mt-3 text-white/70">
                📍 {hotel.location}
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 md:p-10">

            {/* Description */}
            <section>
              <p className="max-w-4xl text-lg leading-8 text-white/70 md:text-xl">
                {hotel.description}
              </p>
            </section>

            {/* Quick Details */}
            <section className="mt-10 grid gap-4 md:grid-cols-3">

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-wide text-white/40">
                  Rating
                </p>

                <p className="mt-2 font-semibold text-yellow-300">
                  {hotel.rating}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-wide text-white/40">
                  Price Range
                </p>

                <p className="mt-2 font-semibold text-white">
                  {hotel.priceRange}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-wide text-white/40">
                  Location
                </p>

                <p className="mt-2 font-semibold text-white">
                  {hotel.location}
                </p>
              </div>

            </section>

            {/* Why Zuri Recommends */}
            <section className="mt-12">
              <div className="flex items-center gap-3">
                <span className="text-3xl">⭐</span>

                <h2 className="text-2xl font-bold">
                  Why Zuri Recommends It
                </h2>
              </div>

              <div className="mt-6 grid gap-3 md:grid-cols-3">
                {hotel.whyRecommended.map((reason) => (
                  <div
                    key={reason}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5"
                  >
                    <span className="text-heritage">✓</span>

                    <p className="mt-3 text-sm leading-6 text-white/65">
                      {reason}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Highlights */}
            <section className="mt-12">
              <h2 className="text-2xl font-bold">
                Hotel Highlights
              </h2>

              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {hotel.highlights.map((highlight) => (
                  <div
                    key={highlight}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5"
                  >
                    <span className="mr-2 text-heritage">
                      ✓
                    </span>

                    <span className="text-sm text-white/70">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Best For */}
            <section className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-heritage">
                Best For
              </p>

              <p className="mt-4 text-lg leading-8 text-white/70">
                {hotel.bestFor}
              </p>
            </section>

            {/* Practical Information */}
            <section className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-7">
              <h2 className="text-xl font-bold">
                Practical Information
              </h2>

              <p className="mt-4 leading-7 text-white/65">
                {hotel.practicalInfo}
              </p>
            </section>

            {/* Ask Zuri */}
            <section className="mt-12 rounded-3xl border border-heritage/20 bg-gradient-to-br from-heritage/10 to-transparent p-8">

              <p className="text-sm font-semibold uppercase tracking-wide text-heritage">
                Plan Your Stay
              </p>

              <h2 className="mt-3 text-3xl font-bold">
                Want to explore {hotelName} with Zuri?
              </h2>

              <p className="mt-4 max-w-2xl leading-7 text-white/60">
                Ask Zuri to help you plan your stay, compare
                accommodation options, and build an itinerary
                around your interests and budget.
              </p>

              <Link
                href={`/chat?message=${encodeURIComponent(
                  `Tell me more about ${hotelName} and help me plan my stay there.`
                )}`}
                className="mt-7 inline-flex items-center rounded-full bg-sunrise px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
              >
                Ask Zuri About This Hotel →
              </Link>

            </section>

          </div>
        </div>
      </div>
    </main>
  );
}