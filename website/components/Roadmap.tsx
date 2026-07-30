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
      className="scroll-mt-24 bg-warmwhite px-6 py-24"
    >
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-deepblue">
            Product Roadmap
          </span>

          <h2 className="mx-auto mt-7 max-w-4xl font-serif text-4xl leading-tight text-forest md:text-5xl">
            Building Africa&apos;s Tourism Intelligence Platform
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-gray-600">
            We&apos;re starting with deep local intelligence in Zimbabwe,
            validating Zuri with real travelers, and expanding country by
            country across Africa.
          </p>
        </div>

        <div className="mt-16 border-l border-black/10 pl-8 md:pl-10">
          <div className="space-y-10">
            {milestones.map((milestone) => (
              <div
                key={milestone.title}
                className="relative rounded-3xl border border-black/5 bg-white p-7 shadow-sm"
              >
                <span
                  className={`absolute -left-[45px] top-7 flex h-7 w-7 items-center justify-center rounded-full text-xs md:-left-[53px] ${statusStyle[milestone.status]}`}
                >
                  {statusLabel[milestone.status]}
                </span>

                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    {milestone.tag}
                  </span>

                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500">
                    {milestone.badge}
                  </span>
                </div>

                <h3 className="mt-4 font-serif text-2xl text-forest">
                  {milestone.title}
                </h3>

                <p className="mt-3 leading-7 text-gray-600">
                  {milestone.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 rounded-3xl bg-deepblue p-8 text-center text-white md:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-heritage">
            Our North Star
          </p>

          <h3 className="mt-4 font-serif text-3xl md:text-4xl">
            Zimbabwe today. Africa tomorrow.
          </h3>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-white/70">
            Our long-term vision is one intelligent tourism layer connecting
            travelers with Africa&apos;s destinations, cultures, communities,
            and local businesses.
          </p>
        </div>
      </div>
    </section>
  );
}