import Image from "next/image";
import Link from "next/link";
import { getExperienceImage } from "@/lib/experienceImages";

type Experience = {
  name: string;
  description?: string;
  duration?: string;
  bestTime?: string;
};

type ExperienceCardsProps = {
  experiences: Experience[];
};

function getExperienceEmoji(name: string) {
  const activity = name.toLowerCase();

  if (activity.includes("cruise")) return "🌅";
  if (activity.includes("safari")) return "🦁";
  if (activity.includes("helicopter")) return "🚁";
  if (activity.includes("walk")) return "🥾";
  if (activity.includes("market")) return "🎨";
  if (activity.includes("museum")) return "🏛️";
  if (activity.includes("food")) return "🍽️";
  if (activity.includes("hike")) return "⛰️";
  if (activity.includes("canoe")) return "🛶";

  return "✨";
}

export default function ExperienceCards({
  experiences,
}: ExperienceCardsProps) {
  if (!experiences || experiences.length === 0) {
    return null;
  }

  return (
    <section className="mt-10">
      {/* Header */}
      <div className="mb-6 flex items-start gap-4">
        <div className="text-3xl">🌍</div>

        <div>
          <h3 className="text-2xl font-bold text-white">
            Recommended Experiences
          </h3>

          <p className="text-sm text-white/50">
            Curated activities selected by Zuri
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {experiences.map((experience) => (
          <article
            key={experience.name}
            className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-heritage/40 hover:bg-white/10"
          >
            {/* Experience Image */}
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={getExperienceImage(experience.name)}
                alt={experience.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

              <div className="absolute left-5 top-5 rounded-full bg-black/40 px-3 py-2 text-2xl backdrop-blur">
                {getExperienceEmoji(experience.name)}
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h4 className="text-2xl font-bold text-white">
                {experience.name}
              </h4>

              <p className="mt-4 text-sm leading-7 text-white/70">
                {experience.description ||
                  "An unforgettable experience recommended for your journey."}
              </p>

              {/* Details */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white/5 p-3">
                  <p className="text-xs uppercase text-white/40">
                    Duration
                  </p>

                  <p className="mt-1 font-semibold text-white">
                    {experience.duration || "Flexible"}
                  </p>
                </div>

                <div className="rounded-2xl bg-white/5 p-3">
                  <p className="text-xs uppercase text-white/40">
                    Best Time
                  </p>

                  <p className="mt-1 font-semibold text-white">
                    {experience.bestTime || "Anytime"}
                  </p>
                </div>
              </div>

              {/* View Experience */}
              <Link
                href={`/experience/${encodeURIComponent(
                  experience.name
                )}`}
                className="mt-6 inline-flex items-center font-semibold text-heritage transition hover:text-white"
              >
                View Experience →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}