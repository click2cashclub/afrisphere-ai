import Link from "next/link";

const trustBar = [
  { label: "Zimbabwe First" },
  { label: "🌍 Pan-African Vision" },
  { label: "🤖 AI Powered" },
  { label: "🤝 Local Knowledge" },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pb-16 pt-28 text-center"
    >
      {/* Brand Gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-deepblue via-forest to-slate-950" />

      {/* Heritage Gold Glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_20%,rgba(202,138,4,0.25),transparent_60%)]" />

      {/* Launch Badge */}
      <span className="mb-7 flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
        <span className="h-2 w-2 animate-pulse rounded-full bg-heritage" />
       Launching first in Zimbabwe
      </span>

      {/* Main Headline */}
      <h1 className="max-w-5xl font-serif text-5xl leading-[1.08] text-white md:text-7xl">
        Africa&apos;s Tourism
        <br />
        Intelligence Platform.
        <br />
        <span className="text-heritage">Powered by AI.</span>
      </h1>

      {/* Zuri */}
      <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-gray-200 md:text-xl">
        Meet Zuri, your local African friend powered by AI. Discover authentic
        destinations, personalized itineraries, cultural experiences, and
        trusted local knowledge — starting in Zimbabwe.
      </p>

      {/* CTAs */}
      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <Link
          href="/#zuri"
          className="rounded-full bg-sunrise px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-orange-600"
        >
          Meet Zuri →
        </Link>

        <Link
          href="/#launch"
          className="rounded-full border border-white/30 bg-white/5 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
        >
          Explore Zimbabwe
        </Link>

        <Link
          href="/#roadmap"
          className="rounded-full border border-white/30 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-white/10"
        >
          See the Roadmap
        </Link>
      </div>

      {/* Trust Bar */}
      <div className="mt-14 flex flex-wrap justify-center gap-3">
        {trustBar.map((item) => (
          <span
            key={item.label}
            className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur-sm"
          >
            {item.label}
          </span>
        ))}
      </div>

      {/* Positioning */}
      <p className="mt-10 text-xs font-medium uppercase tracking-[0.25em] text-white/40">
        Ancient cultures · Modern intelligence · One Africa
      </p>
    </section>
  );
}