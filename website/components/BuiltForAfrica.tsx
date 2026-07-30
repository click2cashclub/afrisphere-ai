const pillars = [
  { icon: "🗺️", title: "Local Knowledge" },
  { icon: "🌍", title: "Indigenous Culture" },
  { icon: "🏕️", title: "Community Tourism" },
  { icon: "📍", title: "Offline-first" },
  { icon: "🌐", title: "Multilingual" },
  { icon: "🤖", title: "AI Native" },
];

export default function BuiltForAfrica() {
  return (
    <section className="bg-white px-6 py-24">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="font-serif text-4xl text-forest md:text-5xl">Built for Africa.</h2>
        <p className="mt-3 text-lg text-gray-600">
          Not adapted for Africa. <span className="text-sunrise font-medium">Designed from Africa.</span>
        </p>
        <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-3">
          {pillars.map((p) => (
            <div key={p.title} className="rounded-2xl border border-black/5 bg-warmwhite p-6">
              <div className="text-3xl">{p.icon}</div>
              <p className="mt-3 text-sm font-medium text-forest">{p.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}