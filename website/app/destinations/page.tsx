import Image from "next/image";
import Link from "next/link";
import { getAllDestinations } from "@/lib/destinationLoader";

export default function DestinationsPage() {
  const destinations = getAllDestinations();

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-white/60 transition hover:text-white"
          >
            ← Back to AfriSphere
          </Link>

          <div className="mt-8 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-heritage">
              Explore Zimbabwe
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">
              Discover Zimbabwe
            </h1>

            <p className="mt-5 text-lg leading-8 text-white/60 md:text-xl">
              Explore Zimbabwe&apos;s most remarkable destinations, from
              Victoria Falls and Hwange to ancient heritage sites,
              mountain landscapes and vibrant cities.
            </p>
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section className="mx-auto max-w-7xl px-6 py-12 md:px-10">
        {destinations.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
            <h2 className="text-2xl font-bold">
              No destinations available
            </h2>

            <p className="mt-3 text-white/50">
              Zuri couldn&apos;t find any destination data yet.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {destinations.map((destination) => (
              <Link
                key={destination.id}
                href={`/destinations/${encodeURIComponent(
                  destination.id
                )}`}
                className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition-all duration-300 hover:-translate-y-1 hover:border-heritage/40 hover:bg-white/10"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={
                      destination.heroImage ||
                      "/images/destinations/default.jpg"
                    }
                    alt={destination.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  <div className="absolute bottom-4 left-5 right-5">
                    <p className="text-sm font-medium text-heritage">
                      {destination.type}
                    </p>

                    <h2 className="mt-1 text-2xl font-bold text-white">
                      {destination.name}
                    </h2>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-sm leading-7 text-white/65">
                    {destination.summary}
                  </p>

                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-sm text-white/40">
                      {destination.country}
                    </span>

                    <span className="text-sm font-semibold text-heritage transition group-hover:text-white">
                      Explore →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}