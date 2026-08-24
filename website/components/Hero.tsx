import Link from "next/link";
import HeroSearch from "@/components/HeroSearch";

const trustBar = [
  {
    icon: "🌍",
    label: "African Travel Intelligence",
  },
  {
    icon: "🧭",
    label: "Personalized Itineraries",
  },
  {
    icon: "✨",
    label: "Authentic Local Experiences",
  },
  {
    icon: "🤝",
    label: "Trusted Local Knowledge",
  },
];

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pb-14 pt-28 text-center sm:px-6 sm:pb-20 sm:pt-32">

      {/* Background */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-deepblue via-forest to-slate-950" />

      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_20%,rgba(202,138,4,0.28),transparent_55%)]" />

      <div className="absolute bottom-0 left-0 right-0 -z-10 h-40 bg-gradient-to-t from-slate-950/40 to-transparent" />

      {/* Launch Badge */}
      <span className="mb-6 inline-flex max-w-full items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-xs font-medium text-white backdrop-blur-md sm:mb-7 sm:px-4 sm:text-sm">
        <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-heritage" />
        <span>
          Built in Zimbabwe • Designed for Africa
        </span>
      </span>

      {/* Headline */}
      <h1 className="max-w-5xl font-serif text-[2.75rem] leading-[1.04] text-white sm:text-6xl md:text-7xl lg:text-8xl">

        Africa&apos;s

        <br />

        <span className="text-heritage">
          Travel Intelligence
        </span>

        <br />

        Platform

      </h1>

      {/* Description */}
      <p className="mt-6 max-w-3xl text-base leading-7 text-gray-200 sm:mt-7 sm:text-lg sm:leading-8 md:text-xl">
        Meet <strong>Zuri</strong>, your intelligent African travel companion.
        Discover extraordinary destinations, authentic local experiences,
        personalized itineraries, and trusted travel insights across Africa—
        launching with Zimbabwe and expanding across the continent.
      </p>

      {/* AI Search */}
      <div className="mt-7 w-full max-w-3xl sm:mt-8">
        <HeroSearch />
      </div>

      {/* CTA Buttons */}
      <div className="mt-8 flex w-full max-w-xl flex-col items-stretch gap-3 sm:mt-10 sm:flex-row sm:items-center sm:justify-center sm:gap-4">

        <Link
          href="/chat"
          className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-sunrise px-7 py-3.5 text-base font-semibold text-white shadow-lg transition hover:-translate-y-1 hover:bg-orange-600 sm:min-w-[180px] sm:px-8 sm:py-4 sm:text-lg"
        >
          Meet Zuri →
        </Link>

        <Link
          href="/#zimbabwe"
          className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-white/30 bg-white/5 px-7 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition hover:-translate-y-1 hover:bg-white/10 sm:min-w-[180px] sm:px-8 sm:py-4 sm:text-lg"
        >
          Explore Africa
        </Link>

        <Link
          href="/#roadmap"
          className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-white/30 bg-white/5 px-7 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition hover:-translate-y-1 hover:bg-white/10 sm:min-w-[180px] sm:px-8 sm:py-4 sm:text-lg"
        >
          Our Vision
        </Link>

      </div>

      {/* Trust Bar */}
      <div className="mt-10 flex w-full max-w-5xl flex-wrap justify-center gap-2 sm:mt-14 sm:gap-3">

        {trustBar.map((item) => (
          <span
            key={item.label}
            className="rounded-full border border-white/15 bg-white/5 px-3 py-2 text-xs text-white/80 backdrop-blur-sm transition hover:border-heritage/30 hover:bg-white/10 sm:px-4 sm:text-sm"
          >
            {item.icon} {item.label}
          </span>
        ))}

      </div>

      {/* Footer Text */}
      <p className="mt-8 px-4 text-xs tracking-wide text-white/50 sm:mt-10 sm:text-sm">
        Ancient cultures • Modern intelligence • One Africa
      </p>

    </section>
  );
}