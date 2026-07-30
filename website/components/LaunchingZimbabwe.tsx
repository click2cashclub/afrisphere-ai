const highlights = [
  {
    name: "Victoria Falls",
    emoji: "🌊",
    description:
      "One of the Seven Natural Wonders of the World, famous for breathtaking waterfalls and adventure experiences.",
  },
  {
    name: "Hwange National Park",
    emoji: "🦁",
    description:
      "Zimbabwe's largest wildlife reserve with elephants, lions, and unforgettable safari adventures.",
  },
  {
    name: "Great Zimbabwe",
    emoji: "🏛️",
    description:
      "The ancient stone city that inspired the nation's name and showcases Africa's remarkable history.",
  },
  {
    name: "Matobo Hills",
    emoji: "🪨",
    description:
      "UNESCO World Heritage Site known for balancing rocks, ancient cave art, and rhino tracking.",
  },
  {
    name: "Bulawayo",
    emoji: "🏙️",
    description:
      "Zimbabwe's cultural capital, home to museums, heritage sites, local cuisine, and vibrant arts.",
  },
  {
    name: "Eastern Highlands",
    emoji: "🌿",
    description:
      "A paradise of mountains, waterfalls, forests, and scenic hiking trails.",
  },
];

export default function LaunchingZimbabwe() {
  return (
    <section className="bg-forest px-6 py-24 text-white">
      <div className="mx-auto max-w-7xl">

        {/* Header */}

        <div className="mx-auto max-w-3xl text-center">

          <span className="rounded-full border border-orange-400/30 bg-orange-500/10 px-4 py-2 text-sm font-medium text-orange-300">
            🇿🇼 Launching in Zimbabwe
          </span>

          <h2 className="mt-8 font-serif text-4xl leading-tight md:text-5xl">
            Our Journey Begins in Zimbabwe
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-green-100">
            AfriSphere AI launches in Zimbabwe to prove how artificial
            intelligence can transform African tourism. By combining trusted
            local knowledge with modern AI, Zuri delivers authentic,
            personalized travel experiences before expanding across Africa.
          </p>

        </div>

        {/* Destination Cards */}

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {highlights.map((place) => (

            <div
              key={place.name}
              className="rounded-3xl border border-white/10 bg-white/10 p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-orange-400 hover:bg-white/15"
            >

              <div className="text-5xl">
                {place.emoji}
              </div>

              <h3 className="mt-6 font-serif text-2xl">
                {place.name}
              </h3>

              <p className="mt-4 leading-7 text-green-100">
                {place.description}
              </p>

            </div>

          ))}

        </div>

        {/* Vision */}

        <div className="mt-20 rounded-3xl border border-white/10 bg-white/5 p-10 text-center backdrop-blur-md">

          <h3 className="font-serif text-3xl">
            Zimbabwe Today. Africa Tomorrow.
          </h3>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-green-100">
            Our vision is to build Africa's most trusted AI-powered tourism
            platform. We begin by creating an exceptional experience in
            Zimbabwe before expanding country by country across the continent.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

            <button className="rounded-full bg-orange-500 px-8 py-4 font-semibold text-white transition hover:bg-orange-600">
              Explore Zimbabwe →
            </button>

            <button className="rounded-full border border-white/20 px-8 py-4 font-semibold transition hover:bg-white/10">
              View Product Roadmap
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}