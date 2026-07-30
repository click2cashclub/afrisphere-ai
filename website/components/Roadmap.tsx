const milestones = [
  {
    status: "done",
    tag: "Foundation",
    title: "Research & Product Foundation",
    text: "Zimbabwe tourism research, Zuri concept, brand system, product architecture, and initial knowledge base.",
  },
  {
    status: "active",
    tag: "Q3 2026",
    title: "Zimbabwe MVP",
    text: "Launch the first working Zuri experience with AI conversations, personalized itineraries, destination discovery, and Zimbabwe tourism intelligence.",
  },
  {
    status: "upcoming",
    tag: "Next",
    title: "Tourism Partner Network",
    text: "Connect Zuri with local guides, tour operators, accommodation providers, restaurants, and authentic community experiences.",
  },
  {
    status: "upcoming",
    tag: "Expansion",
    title: "Southern Africa",
    text: "Expand the platform into Botswana, Zambia, South Africa, Namibia, and Mozambique with country-specific local intelligence.",
  },
  {
    status: "upcoming",
    tag: "Long-term Vision",
    title: "Pan-African Tourism Intelligence",
    text: "Build a multilingual AI tourism platform capable of helping travelers discover and plan authentic experiences across Africa.",
  },
];

const statusStyle: Record<string, string> = {
  done: "bg-forest text-white",
  active: "bg-sunrise text-white shadow-lg shadow-orange-500/20",
  upcoming: "bg-stone-200 text-gray-500",
};

const statusLabel: Record<string, string> = {
  done: "✓",
  active: "●",
  upcoming: "○",
};

export default function Roadmap() {
  return (
    <section id="roadmap" className="bg-warmwhite px-6 py-24">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="text-center">
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-deepblue">
            Product Roadmap
          </span>

          <h2 className="mx-auto mt-8 max-w-3xl font-serif text-4xl leading-tight text-forest md:text-5xl">
            Building Africa&apos;s Tourism Intelligence Platform
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            We&apos;re starting with deep local intelligence in Zimbabwe,
            validating Zuri with real travelers, and expanding country by
            country across Africa.
          </p>
        </div>

        {/* Timeline */}
        <div className="mt-20 border-l border-black/10 pl-8 md:pl-12">
          <div className="space-y-12">
            {milestones.map((milestone) => (
              <div key={milestone.title} className="relative">

                {/* Timeline Indicator */}
                <span
                  className={`absolute -left-[45px] flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold md:-left-[61px] ${statusStyle[milestone.status]}`}
                >
                  {statusLabel[milestone.status]}
                </span>

                {/* Milestone Card */}
                <div className="group rounded-3xl border border-black/5 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl md:p-8">

                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">
                      {milestone.tag}
                    </span>

                    {milestone.status === "active" && (
                      <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                        Building Now
                      </span>
                    )}

                    {milestone.status === "done" && (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-forest">
                        Completed
                      </span>
                    )}
                  </div>

                  <h3 className="mt-4 font-serif text-2xl text-forest">
                    {milestone.title}
                  </h3>

                  <p className="mt-3 leading-7 text-gray-600">
                    {milestone.text}
                  </p>

                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vision */}
        <div className="mt-20 rounded-3xl bg-deepblue px-8 py-12 text-center text-white md:px-12">

          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-heritage">
            Our North Star
          </span>

          <h3 className="mx-auto mt-5 max-w-2xl font-serif text-3xl leading-tight md:text-4xl">
            Zimbabwe today. Africa tomorrow.
          </h3>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-blue-100/80">
            Our long-term vision is one intelligent tourism layer connecting
            travelers with Africa&apos;s destinations, cultures, communities,
            and local businesses.
          </p>

        </div>

      </div>
    </section>
  );
}