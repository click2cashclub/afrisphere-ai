import Image from "next/image";
import Link from "next/link";
import { getAllDestinations } from "@/lib/destinationLoader";

type DestinationPageProps = {
  params: Promise<{
    name: string;
  }>;
};

export default async function DestinationPage({
  params,
}: DestinationPageProps) {
  const { name } = await params;
  const destinationId = decodeURIComponent(name).toLowerCase();

  const destinations = getAllDestinations();

  const destination = destinations.find(
    (item) =>
      item.id.toLowerCase() === destinationId ||
      item.name.toLowerCase() === destinationId
  );

  if (!destination) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <Link
            href="/destinations"
            className="inline-flex items-center text-sm font-semibold text-heritage hover:text-white"
          >
            ← Back to Destinations
          </Link>

          <div className="mt-16 rounded-3xl border border-white/10 bg-white/5 p-10">
            <div className="text-5xl">📍</div>

            <h1 className="mt-6 text-3xl font-bold">
              Destination Not Found
            </h1>

            <p className="mt-3 text-white/60">
              We couldn&apos;t determine which destination you wanted to view.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="relative h-[55vh] min-h-[420px]">
          <Image
            src={
              destination.heroImage ||
              "/images/destinations/default.jpg"
            }
            alt={destination.name}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-black/30 to-black/10" />

          <div className="absolute left-0 right-0 top-0">
            <div className="mx-auto max-w-7xl px-6 py-8 md:px-10">
              <Link
                href="/destinations"
                className="inline-flex items-center rounded-full border border-white/20 bg-black/30 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-black/50"
              >
                ← Back to Destinations
              </Link>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0">
            <div className="mx-auto max-w-7xl px-6 pb-12 md:px-10">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-heritage">
                {destination.type}
              </p>

              <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-6xl">
                {destination.name}
              </h1>

              <p className="mt-3 text-white/70">
                {destination.region}, {destination.country}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-7xl px-6 py-12 md:px-10">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main column */}
          <div className="lg:col-span-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <p className="text-lg leading-8 text-white/75">
                {destination.summary}
              </p>

              <div className="mt-8">
                <h2 className="text-2xl font-bold">
                  About {destination.name}
                </h2>

                <p className="mt-4 text-sm leading-8 text-white/65">
                  {destination.description}
                </p>
              </div>
            </div>

            {/* Highlights */}
            <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-2xl font-bold">
                Highlights
              </h2>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {destination.highlights.map((highlight) => (
                  <div
                    key={highlight}
                    className="rounded-2xl border border-white/10 bg-black/10 p-4"
                  >
                    <span className="mr-2 text-heritage">✓</span>
                    {highlight}
                  </div>
                ))}
              </div>
            </div>

            {/* Wildlife */}
            <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-2xl font-bold">
                Wildlife
              </h2>

              <div className="mt-6 flex flex-wrap gap-3">
                {destination.wildlife.map((animal) => (
                  <span
                    key={animal}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70"
                  >
                    {animal}
                  </span>
                ))}
              </div>
            </div>

            {/* Local Food */}
            <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-2xl font-bold">
                Local Foods
              </h2>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {destination.localFoods.map((food) => (
                  <div
                    key={food}
                    className="rounded-2xl border border-white/10 bg-black/10 p-4"
                  >
                    🍽️ {food}
                  </div>
                ))}
              </div>
            </div>

            {/* Travel Tips */}
            <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-2xl font-bold">
                Travel Tips
              </h2>

              <ul className="mt-6 space-y-4">
                {destination.travelTips.map((tip) => (
                  <li
                    key={tip}
                    className="flex gap-3 text-sm leading-7 text-white/70"
                  >
                    <span className="text-heritage">✓</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Rating */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm text-white/40">
                Rating
              </p>

              <p className="mt-2 text-2xl font-bold text-yellow-300">
                {"★".repeat(destination.rating)}
                <span className="text-white/20">
                  {"★".repeat(5 - destination.rating)}
                </span>
              </p>
            </div>

            {/* Best Time */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm text-white/40">
                Best Time to Visit
              </p>

              <p className="mt-2 font-semibold">
                {destination.bestTime.from} –{" "}
                {destination.bestTime.to}
              </p>
            </div>

            {/* Recommended Stay */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm text-white/40">
                Recommended Stay
              </p>

              <p className="mt-2 font-semibold">
                {destination.recommendedStay}
              </p>
            </div>

            {/* Location */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm text-white/40">
                Location
              </p>

              <p className="mt-2 font-semibold">
                {destination.region},{" "}
                {destination.country}
              </p>

              <p className="mt-3 text-xs text-white/40">
                {destination.coordinates.latitude},{" "}
                {destination.coordinates.longitude}
              </p>
            </div>
          </aside>
        </div>

        {/* Ask Zuri */}
        <div className="mt-12 rounded-3xl border border-heritage/20 bg-gradient-to-r from-heritage/10 to-sunrise/10 p-8 text-center">
          <div className="text-4xl">🤖</div>

          <h2 className="mt-4 text-2xl font-bold">
            Want to explore {destination.name}?
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-white/60">
            Ask Zuri about accommodation, transport, activities,
            food, costs, local culture, or how to add this
            destination to your itinerary.
          </p>

          <Link
            href="/chat"
            className="mt-6 inline-flex items-center rounded-full bg-sunrise px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            Ask Zuri About This Destination →
          </Link>
        </div>
      </section>
    </main>
  );
}