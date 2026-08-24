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
    <section className="bg-slate-950 px-4 py-20 text-white sm:px-6 sm:py-24">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">

          <span className="inline-flex rounded-full border border-sunrise/30 bg-sunrise/10 px-4 py-2 text-xs font-medium text-sunrise sm:text-sm">
            ⭐ Community Feedback
          </span>

          <h2 className="mt-7 font-serif text-3xl leading-tight sm:mt-8 sm:text-4xl md:text-5xl">
            Why People Are Excited About Zuri
          </h2>

          <p className="mt-5 text-base leading-7 text-gray-300 sm:mt-6 sm:text-lg sm:leading-8">
            AfriSphere AI is building the future of African tourism with
            artificial intelligence, trusted local knowledge, and authentic
            travel experiences.
          </p>

        </div>

        {/* Testimonial Cards */}
        <div className="mt-12 grid gap-4 sm:mt-16 sm:gap-6 md:grid-cols-3">

          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-sunrise hover:bg-white/10 sm:p-8"
            >

              {/* Rating */}
              <div className="mb-5 text-lg text-heritage sm:mb-6 sm:text-xl">
                ⭐⭐⭐⭐⭐
              </div>

              {/* Quote */}
              <p className="text-sm leading-7 text-gray-200 sm:text-base sm:leading-8">
                &quot;{testimonial.quote}&quot;
              </p>

              {/* Author */}
              <div className="mt-7 border-t border-white/10 pt-5 sm:mt-8 sm:pt-6">

                <h3 className="font-semibold text-white">
                  {testimonial.name}
                </h3>

                <p className="mt-1 text-sm text-heritage">
                  {testimonial.role}
                </p>

              </div>

            </div>
          ))}

        </div>

        {/* Stats */}
        <div className="mt-12 grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 text-center sm:mt-20 sm:grid-cols-2 sm:gap-6 sm:p-8 md:grid-cols-4 md:p-10">

          <div>
            <h3 className="text-3xl font-bold text-sunrise sm:text-4xl">
              AI
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-300">
              🧠 Intelligent Travel Planning
            </p>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-heritage sm:text-4xl">
              🌍
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-300">
              Built in Zimbabwe. Designed for Africa.
            </p>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-sunrise sm:text-4xl">
              24/7
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-300">
              Local AI Assistance
            </p>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-sunrise sm:text-4xl">
              🌍
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-300">
              Vision: All of Africa
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}