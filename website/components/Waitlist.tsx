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
      className="bg-gradient-to-b from-deepblue to-slate-950 px-6 py-24 text-center text-white"
    >
      <div className="mx-auto max-w-2xl">
        <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white/90">
          🌍 Early Access · Zimbabwe
        </span>

        <h2 className="mt-6 font-serif text-4xl leading-tight md:text-5xl">
          Be among the first to explore Africa with Zuri.
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-white/70">
          Join the AfriSphere AI early-access list and be among the first to
          experience personalized AI travel planning built with African
          destinations, culture, and local knowledge at its core.
        </p>

        {submitted ? (
          <div className="mt-10 rounded-3xl border border-heritage/40 bg-heritage/10 p-8">
            <div className="text-4xl">🎉</div>

            <p className="mt-4 text-xl font-semibold text-heritage">
              You&apos;re on the list!
            </p>

            <p className="mt-2 text-white/70">
              We&apos;ll let you know when Zuri&apos;s early access is ready.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-10 max-w-xl"
          >
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                disabled={loading}
                className="min-w-0 flex-1 rounded-full border border-white/20 bg-white/10 px-6 py-4 text-white outline-none placeholder:text-white/40 focus:border-heritage disabled:opacity-60"
              />

              <button
                type="submit"
                disabled={loading}
                className="rounded-full bg-sunrise px-8 py-4 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Joining..." : "Join Waitlist →"}
              </button>
            </div>

            {errorMessage && (
              <p className="mt-4 text-sm text-red-300">
                {errorMessage}
              </p>
            )}

            <p className="mt-4 text-sm text-white/50">
              No spam. Just product updates, early-access invitations, and
              launch news.
            </p>
          </form>
        )}

        <div className="mt-10 flex flex-wrap justify-center gap-3 text-sm text-white/60">
          <span>🇿🇼 Starting in Zimbabwe</span>
          <span>•</span>
          <span>🤖 AI-powered</span>
          <span>•</span>
          <span>🌍 Built for African travel</span>
        </div>
      </div>
    </section>
  );
}