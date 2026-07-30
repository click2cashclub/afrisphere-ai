const features = [
  { icon: "🗺️", title: "AI Travel Planning", text: "Personalized itineraries built around your interests and time." },
  { icon: "🏘️", title: "Local Experiences", text: "Discover hidden gems that only locals know about." },
  { icon: "💰", title: "Budget Planner", text: "Smart trip planning that fits your budget." },
  { icon: "🗣️", title: "Multilingual Assistant", text: "Zuri speaks English, Shona, Ndebele, and more." },
  { icon: "🛡️", title: "Safety Tips", text: "Local, up-to-date guidance for a safer trip." },
  { icon: "🎭", title: "Cultural Insights", text: "Understand the traditions and stories behind each place." },
];

export default function Features() {
  return (
    <section id="features" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-4xl font-bold text-white md:text-5xl">
          Why AfriSphere AI?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-lg text-gray-400">
          More than a guidebook — a companion that knows Africa.
        </p>
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-emerald-400/40 hover:bg-white/10"
            >
              <div className="text-3xl">{f.icon}</div>
              <h3 className="mt-4 text-lg font-semibold text-white">{f.title}</h3>
              <p className="mt-2 text-sm text-gray-400">{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}