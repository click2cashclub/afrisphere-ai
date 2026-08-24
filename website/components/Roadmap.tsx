const milestones = [
  {
    status: "done",
    tag: "Foundation",
    badge: "Completed",
    title: "Research & Product Foundation",
    text: "Zimbabwe tourism research, Zuri concept, brand system, product architecture, and initial knowledge base.",
  },
  {
    status: "active",
    tag: "Q3 2026",
    badge: "Building Now",
    title: "Zimbabwe MVP",
    text: "Launch the first working Zuri experience with AI conversations, personalized itineraries, destination discovery, and Zimbabwe tourism intelligence.",
  },
  {
    status: "upcoming",
    tag: "Next",
    badge: "Partner Network",
    title: "Tourism Partner Network",
    text: "Connect Zuri with local guides, tour operators, accommodation providers, restaurants, and authentic community experiences.",
  },
  {
    status: "upcoming",
    tag: "Expansion",
    badge: "Southern Africa",
    title: "Southern Africa",
    text: "Expand into Botswana, Zambia, South Africa, Namibia, and Mozambique with country-specific local intelligence.",
  },
  {
    status: "upcoming",
    tag: "Long-term Vision",
    badge: "Pan-African",
    title: "Pan-African Tourism Intelligence",
    text: "Build a multilingual AI tourism platform capable of helping travelers discover and plan authentic experiences across Africa.",
  },
];

const statusStyle: Record<string, string> = {
  done: "bg-forest text-white",
  active: "bg-sunrise text-white",
  upcoming: "bg-gray-200 text-gray-500",
};

const statusLabel: Record<string, string> = {
  done: "✓",
  active: "●",
  upcoming: "○",
};

export default function Roadmap() {
  return (
    <section
      id="roadmap"
      className="scroll-mt-24 bg-warmwhite px-4 py-20 sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="text-center">

          <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-xs font-semibold text-deepblue sm:text-sm">
            Product Roadmap
          </span>

          <h2 className="mx-auto mt-7 max-w-4xl font-serif text-3xl leading-tight text-forest sm:text-4xl md:text-5xl">
            Building Africa&apos;s Tourism Intelligence Platform
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
            We&apos;re starting with deep local intelligence in Zimbabwe,
            validating Zuri with real travelers, and expanding country by
            country across Africa.
          </p>

        </div>

        {/* Timeline */}
        <div className="mt-12 border-l border-black/10 pl-6 sm:mt-16 sm:pl-8 md:pl-10">

          <div className="space-y-6 sm:space-y-10">

            {milestones.map((milestone) => (
              <div
                key={milestone.title}
                className="relative rounded-3xl border border-black/5 bg-white p-6 shadow-sm sm:p-7"
              >

                {/* Timeline Marker */}
                <span
                  className={`absolute -left-[39px] top-6 flex h-7 w-7 items-center justify-center rounded-full text-xs sm:-left-[45px] sm:top-7 md:-left-[53px] ${statusStyle[milestone.status]}`}
                >
                  {statusLabel[milestone.status]}
                </span>

                {/* Tags */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">

                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 sm:text-xs">
                    {milestone.tag}
                  </span>

                  <span className="rounded-full bg-gray-100 px-3 py-1 text-[11px] font-medium text-gray-500 sm:text-xs">
                    {milestone.badge}
                  </span>

                </div>

                {/* Title */}
                <h3 className="mt-4 font-serif text-xl leading-snug text-forest sm:text-2xl">
                  {milestone.title}
                </h3>

                {/* Description */}
                <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-base sm:leading-7">
                  {milestone.text}
                </p>

              </div>
            ))}

          </div>
        </div>

        {/* North Star */}
        <div className="mt-12 rounded-3xl bg-deepblue p-6 text-center text-white sm:mt-16 sm:p-10 md:p-12">

          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-heritage sm:text-sm sm:tracking-[0.2em]">
            Our North Star
          </p>

          <h3 className="mt-4 font-serif text-2xl leading-tight sm:text-3xl md:text-4xl">
            Zimbabwe today. Africa tomorrow.
          </h3>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/70 sm:mt-5 sm:text-base sm:leading-7">
            Our long-term vision is one intelligent tourism layer connecting
            travelers with Africa&apos;s destinations, cultures, communities,
            and local businesses.
          </p>

        </div>

      </div>
    </section>
  );
}