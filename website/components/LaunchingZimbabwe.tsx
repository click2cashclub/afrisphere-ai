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
      className="scroll-mt-24 bg-forest px-6 py-24 text-white"
    >
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold">
            🇿🇼 Launching in Zimbabwe
          </span>

          <h2 className="mx-auto mt-7 max-w-4xl font-serif text-4xl leading-tight md:text-5xl">
            Our Journey Begins in Zimbabwe
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-white/75">
            AfriSphere AI launches in Zimbabwe to prove how artificial
            intelligence can transform African tourism. By combining trusted
            local knowledge with modern AI, Zuri delivers personalized travel
            experiences before expanding across Africa.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((highlight) => (
            <div
              key={highlight.name}
              className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition hover:-translate-y-1 hover:bg-white/10"
            >
              <div className="text-4xl">
                {highlight.emoji}
              </div>

              <h3 className="mt-5 font-serif text-xl">
                {highlight.name}
              </h3>

              <p className="mt-3 leading-7 text-white/70">
                {highlight.text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-3xl border border-white/10 bg-white/5 p-8 text-center md:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-heritage">
            Zimbabwe Today. Africa Tomorrow.
          </p>

          <h3 className="mx-auto mt-4 max-w-3xl font-serif text-3xl md:text-4xl">
            Building toward Africa&apos;s trusted AI tourism platform.
          </h3>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-white/70">
            We begin by creating an exceptional experience in Zimbabwe before
            expanding country by country across the continent.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/destinations"
              className="rounded-full bg-sunrise px-7 py-3.5 font-semibold text-white transition hover:bg-orange-600"
            >
              Explore Zimbabwe →
            </Link>

            <Link
              href="/#roadmap"
              className="rounded-full border border-white/20 px-7 py-3.5 font-semibold text-white transition hover:bg-white/10"
            >
              View Product Roadmap
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}