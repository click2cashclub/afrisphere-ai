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
      className="scroll-mt-24 bg-gray-50 px-4 py-20 sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="text-center">

          <span className="inline-flex rounded-full bg-green-100 px-4 py-2 text-xs font-semibold text-forest sm:text-sm">
            Why AfriSphere AI
          </span>

          <h2 className="mx-auto mt-7 max-w-3xl font-serif text-3xl leading-tight text-forest sm:text-4xl md:text-5xl">
            Built specifically for African travel.
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
            AfriSphere AI combines trusted local knowledge with the power of
            artificial intelligence to help travelers discover Africa with
            confidence, authenticity, and personalized recommendations.
          </p>

        </div>

        {/* Feature Grid */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:mt-16 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">

          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-3xl border border-black/5 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl sm:p-8"
            >

              {/* Icon */}
              <div className="text-3xl sm:text-4xl">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="mt-4 font-serif text-xl leading-snug text-forest transition group-hover:text-sunrise sm:mt-5">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-base sm:leading-7">
                {feature.text}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}