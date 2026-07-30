const features = [
  {
    icon: "🧠",
    title: "AI Built for Africa",
    text: "Zuri understands African destinations, cultures, languages, and local travel patterns to provide recommendations that generic AI simply can't.",
    accent: "text-forest",
  },
  {
    icon: "🗺️",
    title: "Personalized Itineraries",
    text: "Every journey is tailored to your budget, travel style, interests, and available time—from weekend escapes to cross-country adventures.",
    accent: "text-deepblue",
  },
  {
    icon: "🏘️",
    title: "Authentic Local Experiences",
    text: "Discover hidden gems, community experiences, and unforgettable places recommended by locals instead of generic tourist lists.",
    accent: "text-orange-600",
  },
  {
    icon: "🗣️",
    title: "Multilingual Travel Companion",
    text: "Zuri is designed to communicate naturally across African languages and cultures, creating a more inclusive travel experience.",
    accent: "text-yellow-600",
  },
  {
    icon: "🛡️",
    title: "Smart Safety Guidance",
    text: "Receive practical, location-aware travel advice, safety tips, transport guidance, and local recommendations throughout your journey.",
    accent: "text-emerald-700",
  },
  {
    icon: "🎭",
    title: "Culture Beyond Tourism",
    text: "Experience Africa through its people, cuisine, music, traditions, festivals, history, and authentic cultural stories.",
    accent: "text-blue-700",
  },
];

export default function WhyAfriSphere() {
  return (
    <section
      id="why"
      className="bg-stone-100 px-6 py-24"
    >
      <div className="mx-auto max-w-7xl">

        {/* Section Badge */}

        <div className="flex justify-center">
          <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-forest">
            Why AfriSphere AI
          </span>
        </div>

        {/* Heading */}

        <h2 className="mx-auto mt-8 max-w-4xl text-center font-serif text-4xl leading-tight text-forest md:text-5xl">
          Built specifically for African travel.
        </h2>

        {/* Intro */}

        <p className="mx-auto mt-6 max-w-3xl text-center text-lg leading-8 text-gray-600">
          AfriSphere AI combines trusted local knowledge with the power of
          artificial intelligence to help travelers discover Africa with
          confidence, authenticity, and personalized recommendations.
        </p>

        {/* Feature Cards */}

        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">

          {features.map((feature) => (

            <div
              key={feature.title}
              className="group rounded-3xl border border-black/5 bg-warmwhite p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >

              {/* Icon */}

              <div className="mb-6 text-5xl transition-transform duration-300 group-hover:scale-110">
                {feature.icon}
              </div>

              {/* Title */}

              <h3 className={`font-serif text-2xl ${feature.accent}`}>
                {feature.title}
              </h3>

              {/* Text */}

              <p className="mt-4 leading-7 text-gray-600">
                {feature.text}
              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}