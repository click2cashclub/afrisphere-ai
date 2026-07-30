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
    <section id="problem" className="bg-warmwhite px-6 py-24 md:py-28">
      <div className="mx-auto max-w-6xl">

        {/* Section Badge */}
        <div className="flex justify-center">
          <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-700">
            The Challenge
          </span>
        </div>

        {/* Heading */}
        <h2 className="mx-auto mt-8 max-w-4xl text-center font-serif text-4xl leading-tight text-forest md:text-5xl">
          Africa deserves travel intelligence built for Africa.
        </h2>

        {/* Description */}
        <p className="mx-auto mt-6 max-w-3xl text-center text-lg leading-8 text-gray-600">
          Planning an African journey often means jumping between guidebooks,
          blogs, booking platforms, reviews, and scattered local information.
          Travelers need a simpler way to discover trusted local knowledge and
          build journeys around their interests.
        </p>

        {/* Problem Cards */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {problems.map((problem) => (
            <div
              key={problem.title}
              className="group rounded-3xl border border-black/5 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-3xl">
                {problem.icon}
              </div>

              <h3 className="mt-6 font-serif text-2xl text-forest transition-colors duration-300 group-hover:text-sunrise">
                {problem.title}
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                {problem.text}
              </p>
            </div>
          ))}
        </div>

        {/* Transition to solution */}
        <div className="mt-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sunrise">
            That&apos;s where AfriSphere AI comes in
          </p>

          <p className="mx-auto mt-3 max-w-2xl text-lg text-gray-600">
            Local intelligence meets artificial intelligence — starting in
            Zimbabwe.
          </p>
        </div>

      </div>
    </section>
  );
}