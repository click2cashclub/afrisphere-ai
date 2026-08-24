import Link from "next/link";

const highlights = [
  {
    name: "Victoria Falls",
    emoji: "🌊",
    text: "One of the world's great natural wonders, famous for breathtaking waterfalls and adventure experiences.",
  },
  {
    name: "Hwange National Park",
    emoji: "🦁",
    text: "Zimbabwe's largest national park, known for elephants, predators, and unforgettable safari experiences.",
  },
  {
    name: "Great Zimbabwe",
    emoji: "🏛️",
    text: "The ancient stone city that inspired the nation's name and showcases an extraordinary chapter of African history.",
  },
  {
    name: "Matobo Hills",
    emoji: "🪨",
    text: "A UNESCO World Heritage landscape known for balancing rocks, ancient rock art, and wildlife experiences.",
  },
  {
    name: "Bulawayo",
    emoji: "🏙️",
    text: "Zimbabwe's cultural hub, with museums, heritage sites, local cuisine, arts, and access to Matobo.",
  },
  {
    name: "Eastern Highlands",
    emoji: "🌿",
    text: "Mountains, forests, waterfalls, scenic drives, hiking trails, and some of Zimbabwe's most beautiful landscapes.",
  },
];

export default function LaunchingZimbabwe() {
  return (
    <section
      id="zimbabwe"
      className="scroll-mt-24 bg-forest px-4 py-20 text-white sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="text-center">

          <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold sm:text-sm">
            Built in Zimbabwe. Designed for Africa.
          </span>

          <h2 className="mt-6 font-serif text-3xl leading-tight sm:text-4xl md:text-5xl">
            Our Journey Begins
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-white/70 sm:mt-6 sm:text-lg sm:leading-8">
            AfriSphere AI launches with Zimbabwe to build the future of African
            travel intelligence. By combining trusted local knowledge with
            intelligent travel planning, Zuri creates personalized experiences
            that will expand across the continent—one destination at a time.
          </p>

        </div>

        {/* Zimbabwe Highlights */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:mt-16 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">

          {highlights.map((highlight) => (
            <div
              key={highlight.name}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition hover:-translate-y-1 hover:bg-white/10 sm:p-8"
            >

              <div className="text-3xl sm:text-4xl">
                {highlight.emoji}
              </div>

              <h3 className="mt-4 font-serif text-xl sm:mt-5">
                {highlight.name}
              </h3>

              <p className="mt-3 text-sm leading-6 text-white/70 sm:text-base sm:leading-7">
                {highlight.text}
              </p>

            </div>
          ))}

        </div>

        {/* Vision Card */}
        <div className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-6 text-center sm:mt-16 sm:p-10 md:p-12">

          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-heritage sm:text-sm sm:tracking-[0.2em]">
            Zimbabwe Today. Africa Tomorrow.
          </p>

          <h3 className="mx-auto mt-4 max-w-3xl font-serif text-2xl leading-tight sm:text-3xl md:text-4xl">
            Building toward Africa&apos;s trusted AI tourism platform.
          </h3>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/70 sm:mt-5 sm:text-base sm:leading-7">
            We begin by creating an exceptional experience in Zimbabwe before
            expanding country by country across the continent.
          </p>

          {/* CTA Buttons */}
          <div className="mt-7 flex flex-col justify-center gap-3 sm:mt-8 sm:flex-row sm:gap-4">

            <Link
              href="/destinations"
              className="inline-flex min-h-[50px] items-center justify-center rounded-full bg-sunrise px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-orange-600 sm:text-base"
            >
              Explore Destinations →
            </Link>

            <Link
              href="/#roadmap"
              className="inline-flex min-h-[50px] items-center justify-center rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10 sm:text-base"
            >
              View Product Roadmap
            </Link>

          </div>

        </div>

      </div>
    </section>
  );
}