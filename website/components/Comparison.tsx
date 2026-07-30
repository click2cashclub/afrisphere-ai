const traditional = [
  "Doesn't know local transport",
  "Doesn't know hidden gems",
  "Doesn't understand African tourism",
];

const zuri = [
  "Local guides",
  "Community experiences",
  "Wildlife",
  "Culture",
  "Languages",
  "Budget optimization",
  "Safety insights",
  "Real itineraries",
];

export default function Comparison() {
  return (
    <section className="bg-warmwhite px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center font-serif text-4xl text-forest md:text-5xl">
          Traditional AI vs. Zuri
        </h2>
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-black/5 bg-white p-8">
            <h3 className="font-semibold text-gray-500">Traditional AI</h3>
            <ul className="mt-4 space-y-3">
              {traditional.map((t) => (
                <li key={t} className="flex items-start gap-2 text-gray-500">
                  <span className="text-red-400">✕</span> {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-forest/20 bg-forest text-white p-8">
            <h3 className="font-semibold">Zuri</h3>
            <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {zuri.map((z) => (
                <li key={z} className="flex items-start gap-2">
                  <span className="text-heritage">✔</span> {z}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}