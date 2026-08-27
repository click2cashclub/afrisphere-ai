"use client";

import { FormEvent, useState } from "react";
import { supabase } from "@/lib/supabase";

const benefits = [
  {
    emoji: "🌍",
    title: "Reach travellers actively planning trips",
    text: "Get in front of people already asking Zuri about Zimbabwe, not passive browsers.",
  },
  {
    emoji: "🤝",
    title: "Be part of the Partner Network from day one",
    text: "Early partners shape how Zuri recommends hotels, restaurants, tours, and experiences.",
  },
  {
    emoji: "📈",
    title: "Grow with a platform built for African tourism",
    text: "AfriSphere AI is built to increase visibility for local tourism businesses, not just global chains.",
  },
];

export default function ForBusinesses() {
  const [email, setEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
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
      .insert([
        {
          email: cleanEmail,
          signup_type: "business",
          business_name:
            businessName.trim() || null,
        },
      ]);

    if (error) {
      // PostgreSQL 23505 = email already exists. Same graceful handling
      // as the traveller waitlist: treat "already signed up" as success,
      // not an error the visitor needs to see.
      if (error.code === "23505") {
        setSubmitted(true);
        setEmail("");
        setBusinessName("");
        setLoading(false);
        return;
      }

      console.error(
        "Business signup error:",
        error
      );

      setErrorMessage(
        "Something went wrong. Please try again in a moment."
      );
      setLoading(false);
      return;
    }

    setSubmitted(true);
    setEmail("");
    setBusinessName("");
    setLoading(false);
  };

  return (
    <section
      id="for-businesses"
      className="bg-forest px-4 py-20 text-center text-white sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-3xl">

        {/* Badge */}
        <span className="inline-flex rounded-full border border-heritage/30 bg-heritage/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-heritage sm:text-sm">
          🤝 For Tourism Businesses
        </span>

        {/* Heading */}
        <h2 className="mt-6 font-serif text-3xl leading-tight sm:text-4xl md:text-5xl">
          Partner With AfriSphere AI
        </h2>

        {/* Description */}
        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-white/70 sm:text-lg sm:leading-8">
          Hotels, restaurants, guides, and tour operators are the backbone of
          African tourism. AfriSphere AI is building the Tourism Partner
          Network to connect Zuri&apos;s recommendations directly with real
          local businesses.
        </p>

        {/* Benefits */}
        <div className="mt-10 grid gap-4 text-left sm:mt-12 sm:grid-cols-3 sm:gap-5">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <div className="text-2xl">
                {benefit.emoji}
              </div>

              <p className="mt-3 text-sm font-semibold text-white">
                {benefit.title}
              </p>

              <p className="mt-2 text-xs leading-5 text-white/60">
                {benefit.text}
              </p>
            </div>
          ))}
        </div>

        {/* Success State */}
        {submitted ? (
          <div className="mt-10 rounded-3xl border border-heritage/40 bg-heritage/10 p-6 sm:p-8">

            <div className="text-4xl">
              🎉
            </div>

            <p className="mt-4 text-xl font-semibold text-heritage">
              You&apos;re on the partner list!
            </p>

            <p className="mt-2 text-sm leading-6 text-white/70 sm:text-base">
              We&apos;ll be in touch as the Tourism Partner Network opens up.
            </p>

          </div>
        ) : (

          /* Signup Form */
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-10 max-w-xl"
          >
            <div className="flex flex-col gap-3">

              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="Business name (optional)"
                disabled={loading}
                autoComplete="organization"
                className="min-h-[52px] rounded-full border border-white/20 bg-white/10 px-5 py-3.5 text-sm text-white outline-none placeholder:text-white/40 focus:border-heritage focus:ring-2 focus:ring-heritage/20 disabled:opacity-60 sm:px-6 sm:text-base"
              />

              <div className="flex flex-col gap-3 sm:flex-row">

                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Business email address"
                  disabled={loading}
                  autoComplete="email"
                  className="min-h-[52px] min-w-0 flex-1 rounded-full border border-white/20 bg-white/10 px-5 py-3.5 text-sm text-white outline-none placeholder:text-white/40 focus:border-heritage focus:ring-2 focus:ring-heritage/20 disabled:opacity-60 sm:px-6 sm:text-base"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="min-h-[52px] rounded-full bg-sunrise px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60 sm:px-8 sm:text-base"
                >
                  {loading
                    ? "Submitting..."
                    : "Register Interest →"}
                </button>

              </div>
            </div>

            {/* Error */}
            {errorMessage && (
              <p className="mt-4 text-sm text-red-300">
                {errorMessage}
              </p>
            )}

            <p className="mt-4 text-xs leading-5 text-white/50 sm:text-sm">
              We&apos;ll reach out about partnership opportunities as the
              network opens. No spam.
            </p>

          </form>
        )}

      </div>
    </section>
  );
}