import Link from "next/link";

const trustBar = [
  { icon: "🇿🇼", label: "Zimbabwe First" },
  { icon: "🌍", label: "Pan-African Vision" },
  { icon: "🤖", label: "AI Powered" },
  { icon: "🤝", label: "Local Knowledge" },
];

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pb-20 pt-32 text-center">
      {/* Background */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-deepblue via-forest to-slate-950" />

      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_20%,rgba(202,138,4,0.28),transparent_55%)]" />

      <div className="absolute bottom-0 left-0 right-0 -z-10 h-40 bg-gradient-to-t from-slate-950/40 to-transparent" />

      {/* Launch Badge */}
      <span className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
        <span className="h-2 w-2 animate-pulse rounded-full bg-heritage" />
        🇿🇼 Launching first in Zimbabwe
      </span>

      {/* Headline */}
      <h1 className="max-w-5xl font-serif text-5xl leading-[1.05] text-white sm:text-6xl md:text-7xl">
        Africa&apos;s Tourism
        <br />
        Intelligence Platform.
        <br />
        <span className="text-heritage">
          Powered by AI.
        </span>
      </h1>

      {/* Description */}
      <p className="mt-7 max-w-3xl text-lg leading-8 text-gray-200 md:text-xl">
        Meet Zuri, your local African friend powered by AI. Discover authentic
        destinations, personalized itineraries, cultural experiences, and
        trusted local knowledge — starting in Zimbabwe.
      </p>

      {/* CTA Buttons */}
      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
        <Link
          href="/chat"
          className="inline-flex min-w-[180px] items-center justify-center rounded-full bg-sunrise px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:-translate-y-1 hover:bg-orange-600"
        >
          Meet Zuri →
        </Link>

        <Link
          href="/#zimbabwe"
          className="inline-flex min-w-[180px] items-center justify-center rounded-full border border-white/30 bg-white/5 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition hover:-translate-y-1 hover:bg-white/10"
        >
          Explore Zimbabwe
        </Link>

        <Link
          href="/#roadmap"
          className="inline-flex min-w-[180px] items-center justify-center rounded-full border border-white/30 bg-white/5 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition hover:-translate-y-1 hover:bg-white/10"
        >
          See the Roadmap
        </Link>
      </div>

      {/* Trust Bar */}
      <div className="mt-14 flex max-w-4xl flex-wrap justify-center gap-3">
        {trustBar.map((item) => (
          <span
            key={item.label}
            className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur-sm"
          >
            {item.icon} {item.label}
          </span>
        ))}
      </div>

      <p className="mt-10 text-sm tracking-wide text-white/50">
        Ancient cultures · Modern intelligence · One Africa
      </p>
    </section>
  );
}