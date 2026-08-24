"use client";

import { FormEvent, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      setErrorMessage("Please enter your email address.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    const { error } = await supabase
      .from("waitlist")
      .insert([{ email: cleanEmail }]);

    if (error) {
      console.error("Waitlist signup error:", error);

      // PostgreSQL 23505 = email already exists
      if (error.code === "23505") {
        setSubmitted(true);
        setEmail("");
        setLoading(false);
        return;
      }

      setErrorMessage(
        "Something went wrong. Please try again in a moment."
      );
      setLoading(false);
      return;
    }

    setSubmitted(true);
    setEmail("");
    setLoading(false);
  };

  return (
    <section
      id="waitlist"
      className="bg-gradient-to-b from-deepblue to-slate-950 px-4 py-20 text-center text-white sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-2xl">

        {/* Badge */}
        <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white/90 sm:text-sm">
          🌍
        </span>

        {/* Heading */}
        <h2 className="mt-6 font-serif text-3xl leading-tight sm:text-4xl md:text-5xl">
          🌍 Early Access
        </h2>

        {/* Description */}
        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-white/70 sm:text-lg sm:leading-8">
          Join the AfriSphere AI early-access list and be among the first to
          experience personalized AI travel planning built with African
          destinations, culture, and local knowledge at its core.
        </p>

        {/* Success State */}
        {submitted ? (
          <div className="mt-8 rounded-3xl border border-heritage/40 bg-heritage/10 p-6 sm:mt-10 sm:p-8">

            <div className="text-4xl">
              🎉
            </div>

            <p className="mt-4 text-xl font-semibold text-heritage">
              You&apos;re on the list!
            </p>

            <p className="mt-2 text-sm leading-6 text-white/70 sm:text-base">
              We&apos;ll let you know when Zuri&apos;s early access is ready.
            </p>

          </div>
        ) : (

          /* Signup Form */
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-8 max-w-xl sm:mt-10"
          >
            <div className="flex flex-col gap-3 sm:flex-row">

              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                disabled={loading}
                autoComplete="email"
                className="min-h-[52px] min-w-0 flex-1 rounded-full border border-white/20 bg-white/10 px-5 py-3.5 text-sm text-white outline-none placeholder:text-white/40 focus:border-heritage focus:ring-2 focus:ring-heritage/20 disabled:opacity-60 sm:px-6 sm:text-base"
              />

              <button
                type="submit"
                disabled={loading}
                className="min-h-[52px] rounded-full bg-sunrise px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60 sm:px-8 sm:text-base"
              >
                {loading ? "Joining..." : "Join Waitlist →"}
              </button>

            </div>

            {/* Error */}
            {errorMessage && (
              <p className="mt-4 text-sm text-red-300">
                {errorMessage}
              </p>
            )}

            {/* Privacy reassurance */}
            <p className="mt-4 text-xs leading-5 text-white/50 sm:text-sm">
              No spam. Just product updates, early-access invitations, and
              launch news.
            </p>

          </form>
        )}

        {/* Trust Points */}
        <div className="mt-8 flex flex-wrap justify-center gap-x-3 gap-y-2 text-xs text-white/60 sm:mt-10 sm:text-sm">

          <span>
            Built in Zimbabwe
          </span>

          <span className="hidden sm:inline">
            •
          </span>

          <span>
            🧠 Intelligent Travel Planning
          </span>

          <span className="hidden sm:inline">
            •
          </span>

          <span>
            🌍 Built for African travel
          </span>

        </div>

      </div>
    </section>
  );
}