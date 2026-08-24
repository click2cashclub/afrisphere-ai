const problems = [
  {
    icon: "🌍",
    title: "Generic AI lacks local African context",
    text: "Global travel assistants can miss local context, languages, culture, and authentic experiences across the continent.",
  },
  {
    icon: "📚",
    title: "Travel information gets outdated",
    text: "Static travel content can't easily adapt to your interests, budget, travel style, or changing local conditions.",
  },
  {
    icon: "🤝",
    title: "Trusted local knowledge is fragmented",
    text: "Useful recommendations are scattered across reviews, social media, local experts, and websites — making reliable information harder to find.",
  },
  {
    icon: "⏱️",
    title: "Planning takes too much time",
    text: "Combining accommodation, transport, food, attractions, culture, and local experiences can turn trip planning into hours of research.",
  },
];

export default function Problem() {
  return (
    <section
      id="problem"
      className="bg-warmwhite px-4 py-20 sm:px-6 sm:py-24 md:py-28"
    >
      <div className="mx-auto max-w-6xl">

        {/* Section Badge */}
        <div className="flex justify-center">
          <span className="rounded-full bg-orange-100 px-4 py-2 text-xs font-semibold text-orange-700 sm:text-sm">
            The Challenge
          </span>
        </div>

        {/* Heading */}
        <h2 className="mx-auto mt-7 max-w-4xl text-center font-serif text-3xl leading-tight text-forest sm:mt-8 sm:text-4xl md:text-5xl">
          Africa deserves travel intelligence built for Africa.
        </h2>

        {/* Description */}
        <p className="mx-auto mt-5 max-w-3xl text-center text-base leading-7 text-gray-600 sm:mt-6 sm:text-lg sm:leading-8">
          Planning an African journey often means jumping between guidebooks,
          blogs, booking platforms, reviews, and scattered local information.
          Travelers need a simpler way to discover trusted local knowledge and
          build journeys around their interests.
        </p>

        {/* Problem Cards */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:mt-16 sm:grid-cols-2 sm:gap-6">
          {problems.map((problem) => (
            <div
              key={problem.title}
              className="group rounded-3xl border border-black/5 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl sm:p-8"
            >

              {/* Icon */}
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-2xl sm:h-14 sm:w-14 sm:text-3xl">
                {problem.icon}
              </div>

              {/* Title */}
              <h3 className="mt-5 font-serif text-xl leading-snug text-forest transition-colors duration-300 group-hover:text-sunrise sm:mt-6 sm:text-2xl">
                {problem.title}
              </h3>

              {/* Description */}
              <p className="mt-3 text-sm leading-6 text-gray-600 sm:mt-4 sm:text-base sm:leading-7">
                {problem.text}
              </p>

            </div>
          ))}
        </div>

        {/* Transition to Solution */}
        <div className="mt-12 text-center sm:mt-16">

          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sunrise sm:text-sm sm:tracking-[0.2em]">
            That&apos;s where AfriSphere AI comes in
          </p>

          <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
            Local intelligence meets artificial intelligence — starting in
            Zimbabwe.
          </p>

        </div>

      </div>
    </section>
  );
}