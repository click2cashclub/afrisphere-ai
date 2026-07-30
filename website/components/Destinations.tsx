const destinations = [
  { name: "Victoria Falls", country: "Zimbabwe", emoji: "💦" },
  { name: "Great Zimbabwe", country: "Zimbabwe", emoji: "🏛️" },
  { name: "Hwange Safari", country: "Zimbabwe", emoji: "🦁" },
  { name: "Cape Town", country: "South Africa", emoji: "🏔️" },
  { name: "Maasai Mara", country: "Kenya", emoji: "🐘" },
  { name: "Zanzibar", country: "Tanzania", emoji: "🏝️" },
];

export default function Destinations() {
  return (
    <section id="destinations" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-4xl font-bold text-white md:text-5xl">
          Explore Africa
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-lg text-gray-400">
          Starting in Zimbabwe, expanding across the continent.
        </p>
        <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-3">
          {destinations.map((d) => (
            <div
              key={d.name}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-950/40 to-slate-900 p-8 text-center transition hover:border-emerald-400/40"
            >
              <div className="text-4xl">{d.emoji}</div>
              <h3 className="mt-4 font-semibold text-white">{d.name}</h3>
              <p className="mt-1 text-sm text-gray-400">{d.country}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}