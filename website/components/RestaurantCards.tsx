import Image from "next/image";
import Link from "next/link";
import getRestaurantImage from "@/lib/restaurantImages";

type Restaurant = {
  name: string;
  description?: string;
  cuisine?: string | string[];
  location?: string;
  reasons?: string[];
};

type RestaurantCardsProps = {
  restaurants: Restaurant[];
};

function getRestaurantEmoji(name: string) {
  const restaurant = name.toLowerCase();

  if (restaurant.includes("boma")) return "🥁";
  if (
    restaurant.includes("cafe") ||
    restaurant.includes("café")
  ) {
    return "☕";
  }

  if (restaurant.includes("eatery")) return "🍽️";
  if (restaurant.includes("homely")) return "🍲";

  return "🍴";
}

function formatCuisine(
  cuisine?: string | string[]
) {
  if (!cuisine) return "";

  if (Array.isArray(cuisine)) {
    return cuisine.join(" • ");
  }

  return cuisine;
}

export default function RestaurantCards({
  restaurants,
}: RestaurantCardsProps) {
  if (!restaurants || restaurants.length === 0) {
    return null;
  }

  return (
    <section className="mt-10">
      {/* Header */}
      <div className="mb-6 flex items-start gap-4">
        <div className="text-3xl">
          🍽️
        </div>

        <div>
          <h3 className="text-2xl font-bold text-white">
            Recommended Restaurants
          </h3>

          <p className="mt-1 text-sm text-white/50">
            Dining options relevant to your request
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {restaurants.map((restaurant) => (
          <article
            key={restaurant.name}
            className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-heritage/40 hover:bg-white/10"
          >
            {/* Restaurant Image */}
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={getRestaurantImage(
                  restaurant.name
                )}
                alt={restaurant.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

              {/* Restaurant icon */}
              <div className="absolute left-5 top-5 rounded-full bg-black/40 px-3 py-2 text-2xl backdrop-blur">
                {getRestaurantEmoji(
                  restaurant.name
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Name */}
              <h4 className="text-xl font-bold text-white">
                {restaurant.name}
              </h4>

              {/* Cuisine */}
              {restaurant.cuisine && (
                <p className="mt-2 text-sm text-heritage">
                  🍴 {formatCuisine(
                    restaurant.cuisine
                  )}
                </p>
              )}

              {/* Location */}
              {restaurant.location && (
                <p className="mt-1 text-sm text-white/50">
                  📍 {restaurant.location}
                </p>
              )}

              {/* Description */}
              {restaurant.description && (
                <p className="mt-4 text-sm leading-7 text-white/65">
                  {restaurant.description}
                </p>
              )}

              {/* Reasons */}
              {restaurant.reasons &&
                restaurant.reasons.length > 0 && (
                  <div className="mt-6">
                    <p className="text-sm font-semibold text-white">
                      Why Zuri recommends it
                    </p>

                    <ul className="mt-3 space-y-2">
                      {restaurant.reasons.map(
                        (reason) => (
                          <li
                            key={reason}
                            className="flex items-start gap-2 text-sm leading-6 text-white/60"
                          >
                            <span className="mt-1 text-heritage">
                              ✓
                            </span>

                            <span>
                              {reason}
                            </span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}

              {/* Button */}
              <Link
                href={`/restaurant/${encodeURIComponent(
                  restaurant.name
                )}`}
                className="mt-7 inline-flex items-center rounded-full bg-sunrise px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
              >
                View Restaurant →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}