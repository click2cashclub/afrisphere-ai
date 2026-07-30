const testimonials = [
  {
    name: "Adventure Traveler",
    role: "Early Access User",
    quote:
      "I've always wanted an AI that truly understands Africa. Zuri feels like having a knowledgeable local guide available 24/7.",
  },
  {
    name: "Local Tour Operator",
    role: "Tourism Partner",
    quote:
      "AfriSphere AI has the potential to connect more travelers with authentic local experiences while supporting communities across Africa.",
  },
  {
    name: "Digital Nomad",
    role: "Future Explorer",
    quote:
      "Instead of spending hours researching blogs and reviews, I can imagine planning my entire African journey in minutes with Zuri.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-slate-950 px-6 py-24 text-white">
      <div className="mx-auto max-w-7xl">

        {/* Header */}

        <div className="mx-auto max-w-3xl text-center">

          <span className="rounded-full border border-orange-400/30 bg-orange-500/10 px-4 py-2 text-sm font-medium text-orange-300">
            ⭐ Community Feedback
          </span>

          <h2 className="mt-8 font-serif text-4xl md:text-5xl">
            Why People Are Excited About Zuri
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-300">
            AfriSphere AI is building the future of African tourism with
            artificial intelligence, trusted local knowledge, and authentic
            travel experiences.
          </p>

        </div>

        {/* Cards */}

        <div className="mt-16 grid gap-8 md:grid-cols-3">

          {testimonials.map((testimonial) => (

            <div
              key={testimonial.name}
              className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-orange-400 hover:bg-white/10"
            >

              <div className="mb-6 flex text-orange-400 text-xl">
                ⭐⭐⭐⭐⭐
              </div>

              <p className="leading-8 text-gray-200">
                "{testimonial.quote}"
              </p>

              <div className="mt-8 border-t border-white/10 pt-6">

                <h3 className="font-semibold text-white">
                  {testimonial.name}
                </h3>

                <p className="text-sm text-orange-300">
                  {testimonial.role}
                </p>

              </div>

            </div>

          ))}

        </div>

        {/* Stats */}

        <div className="mt-20 grid gap-8 rounded-3xl border border-white/10 bg-white/5 p-10 text-center md:grid-cols-4">

          <div>
            <h3 className="text-4xl font-bold text-orange-400">AI</h3>
            <p className="mt-2 text-gray-300">Powered Travel Planning</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold text-orange-400">🇿🇼</h3>
            <p className="mt-2 text-gray-300">Launching in Zimbabwe</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold text-orange-400">24/7</h3>
            <p className="mt-2 text-gray-300">Local AI Assistance</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold text-orange-400">🌍</h3>
            <p className="mt-2 text-gray-300">Vision: All of Africa</p>
          </div>

        </div>

      </div>
    </section>
  );
}