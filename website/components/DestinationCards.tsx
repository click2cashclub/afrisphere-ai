import Link from "next/link";
import DestinationImage from "./DestinationImage";

type Destination = {
  name?: string;
  description?: string;
  type?: string;
  image?: string;
};

type DestinationCardsProps = {
  destinations: Destination[];
};

export default function DestinationCards({
  destinations,
}: DestinationCardsProps) {
  if (!destinations || destinations.length === 0) {
    return null;
  }

  return (
    <section className="mt-8">
      {/* Section Header */}
      <div className="mb-6 flex items-center gap-3">
        <span className="text-3xl">📍</span>

        <div>
          <h3 className="text-2xl font-bold text-white">
            Recommended Destinations
          </h3>

          <p className="text-sm text-white/50">
            Handpicked by Zuri for your journey
          </p>
        </div>
      </div>

      {/* Destination Cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {destinations.map((destination, index) => {
          const destinationName = destination.name?.trim();

          // Ignore malformed destinations returned by the API
          if (!destinationName) {
            return null;
          }

          const destinationUrl = `/destinations/${encodeURIComponent(
            destinationName
          )}`;

          return (
            <div
              key={`${destinationName}-${index}`}
              className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-heritage/40 hover:bg-white/10"
            >
              {/* Destination Image */}
              <DestinationImage name={destinationName} />

              {/* Content */}
              <div className="p-6">
                {/* Type */}
                <span className="rounded-full bg-heritage/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-heritage">
                  {destination.type || "Destination"}
                </span>

                {/* Name */}
                <h4 className="mt-4 text-2xl font-bold text-white">
                  {destinationName}
                </h4>

                {/* Rating */}
                <div className="mt-2 text-yellow-400">
                  ★★★★★
                </div>

                {/* Description */}
                <p className="mt-4 text-sm leading-7 text-white/70">
                  {destination.description ||
                    "Discover one of Africa's unforgettable destinations."}
                </p>

                {/* View Destination */}
                <Link
                  href={destinationUrl}
                  className="mt-6 inline-flex items-center font-semibold text-heritage transition hover:text-white"
                >
                  View Destination →
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}