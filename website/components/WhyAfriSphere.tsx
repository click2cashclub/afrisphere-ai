const features = [
  {
    icon: "🧠",
    title: "AI Built for Africa",
    text: "Zuri understands African destinations, cultures, languages, and local travel patterns to provide more relevant recommendations.",
  },
  {
    icon: "🗺️",
    title: "Personalized Itineraries",
    text: "Every journey is tailored to your budget, travel style, interests, and available time — from weekend escapes to cross-country adventures.",
  },
  {
    icon: "🏘️",
    title: "Authentic Local Experiences",
    text: "Discover hidden gems, community experiences, and unforgettable places beyond generic tourist lists.",
  },
  {
    icon: "🗣️",
    title: "Multilingual Travel Companion",
    text: "Zuri is designed to communicate naturally across African languages and cultures, creating a more inclusive travel experience.",
  },
  {
    icon: "🛡️",
    title: "Smart Safety Guidance",
    text: "Receive practical travel advice, transport guidance, safety information, and relevant local recommendations.",
  },
  {
    icon: "🎭",
    title: "Culture Beyond Tourism",
    text: "Experience Africa through its people, cuisine, music, traditions, festivals, history, and cultural stories.",
  },
];

export default function WhyAfriSphere() {
  return (
    <section
      id="why"
      className="scroll-mt-24 bg-gray-50 px-6 py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-forest">
            Why AfriSphere AI
          </span>

          <h2 className="mx-auto mt-7 max-w-3xl font-serif text-4xl leading-tight text-forest md:text-5xl">
            Built specifically for African travel.
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-gray-600">
            AfriSphere AI combines trusted local knowledge with the power of
            artificial intelligence to help travelers discover Africa with
            confidence, authenticity, and personalized recommendations.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-3xl border border-black/5 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="text-4xl">
                {feature.icon}
              </div>

              <h3 className="mt-5 font-serif text-xl text-forest transition group-hover:text-sunrise">
                {feature.title}
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                {feature.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}