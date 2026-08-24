import Image from "next/image";
import Link from "next/link";
import { getHotelImage } from "@/lib/hotelImages";

type Hotel = {
  name: string;
  description?: string;
  rating?: string;
  priceRange?: string;
  location?: string;
  reasons?: string[];
};

type HotelCardsProps = {
  hotels: Hotel[];
};

export default function HotelCards({
  hotels,
}: HotelCardsProps) {
  if (!hotels || hotels.length === 0) {
    return null;
  }

  return (
    <section className="mt-10">
      {/* Header */}
      <div className="mb-6 flex items-start gap-4">
        <div className="text-3xl">🏨</div>

        <div>
          <h3 className="text-2xl font-bold text-white">
            Recommended Hotels
          </h3>

          <p className="mt-1 text-sm text-white/50">
            Carefully selected accommodation for your journey
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {hotels.map((hotel) => (
          <article
            key={hotel.name}
            className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-heritage/40 hover:bg-white/10"
          >
            {/* Hotel Image */}
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={getHotelImage(hotel.name)}
                alt={hotel.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

              {/* Hotel icon */}
              <div className="absolute left-5 top-5 rounded-full bg-black/40 px-3 py-2 text-2xl backdrop-blur">
                🏨
              </div>

              {/* Rating */}
              {hotel.rating && (
                <div className="absolute right-4 top-4 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-sm font-semibold text-yellow-300 backdrop-blur">
                  ★ {hotel.rating}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6">
              <h4 className="text-xl font-bold text-white">
                {hotel.name}
              </h4>

              {/* Location */}
              {hotel.location && (
                <p className="mt-2 text-sm text-heritage">
                  📍 {hotel.location}
                </p>
              )}

              {/* Price */}
              {hotel.priceRange && (
                <div className="mt-4 inline-flex rounded-full bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/70">
                  💰 {hotel.priceRange}
                </div>
              )}

              {/* Description */}
              {hotel.description && (
                <p className="mt-4 text-sm leading-7 text-white/65">
                  {hotel.description}
                </p>
              )}

              {/* Reasons */}
              {hotel.reasons && hotel.reasons.length > 0 && (
                <div className="mt-6">
                  <p className="text-sm font-semibold text-white">
                    Why Zuri recommends it
                  </p>

                  <ul className="mt-3 space-y-2">
                    {hotel.reasons.map((reason) => (
                      <li
                        key={reason}
                        className="flex items-start gap-2 text-sm leading-6 text-white/60"
                      >
                        <span className="mt-1 text-heritage">
                          ✓
                        </span>

                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Button */}
              <Link
                href={`/hotel/${encodeURIComponent(hotel.name)}`}
                className="mt-7 inline-flex items-center rounded-full bg-sunrise px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
              >
                View Hotel →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}