"use client";

import { useState, type FormEvent } from "react";

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) return;

    // Temporary frontend success state.
    // We will connect this to Supabase later.
    setSubmitted(true);
  };

  return (
    <section
      id="waitlist"
      className="relative overflow-hidden bg-gradient-to-b from-deepblue to-slate-950 px-6 py-28 text-center text-white"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-orange-500/10 blur-3xl" />

      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-3xl">
        {/* Badge */}
        <span className="inline-flex rounded-full border border-heritage/30 bg-heritage/10 px-4 py-2 text-sm font-medium text-heritage">
          🌍 Early Access · Zimbabwe
        </span>

        {/* Heading */}
        <h2 className="mx-auto mt-8 max-w-2xl font-serif text-4xl leading-tight md:text-5xl">
          Be among the first to explore Africa with{" "}
          <span className="text-heritage">Zuri.</span>
        </h2>

        {/* Description */}
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/75">
          Join the AfriSphere AI early-access list and be among the first to
          experience personalized AI travel planning built with African
          destinations, culture, and local knowledge at its core.
        </p>

        {/* Form / Success State */}
        {submitted ? (
          <div className="mx-auto mt-10 max-w-xl rounded-3xl border border-heritage/30 bg-heritage/10 p-8 backdrop-blur-sm">
            <div className="text-4xl">🎉</div>

            <h3 className="mt-4 font-serif text-2xl text-heritage">
              You&apos;re on the list!
            </h3>

            <p className="mt-3 leading-7 text-white/70">
              Thanks for joining AfriSphere AI early access. We&apos;ll let you
              know when Zuri is ready for testing.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-10 flex max-w-xl flex-col gap-3 rounded-3xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm sm:flex-row"
          >
            <label htmlFor="waitlist-email" className="sr-only">
              Email address
            </label>

            <input
              id="waitlist-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="min-w-0 flex-1 rounded-full border border-white/20 bg-white/10 px-6 py-4 text-white outline-none placeholder:text-white/40 focus:border-heritage focus:ring-2 focus:ring-heritage/20"
            />

            <button
              type="submit"
              className="rounded-full bg-sunrise px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:bg-orange-600"
            >
              Join Waitlist →
            </button>
          </form>
        )}

        {/* Trust line */}
        <p className="mt-5 text-sm text-white/45">
          No spam. Just product updates, early-access invitations, and launch
          news.
        </p>

        {/* Brand / Launch points */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-white/60">
          <span>🇿🇼 Starting in Zimbabwe</span>
          <span>🤖 AI-powered</span>
          <span>🌍 Built for African travel</span>
        </div>
      </div>
    </section>
  );
}