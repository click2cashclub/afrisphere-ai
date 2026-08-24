"use client";

import Link from "next/link";
import { useState } from "react";

type DemoKey = "best-time" | "food" | "safety";

type Demo = {
  question: string;
  answer: string;
  cards: {
    icon: string;
    title: string;
    text: string;
  }[];
};

const demos: Record<DemoKey, Demo> = {
  "best-time": {
    question: "When's the best time to visit Victoria Falls?",
    answer:
      "Victoria Falls changes dramatically through the year. Higher water levels usually follow the rainy season, while the drier months can offer clearer views of the gorge and combine well with wildlife experiences around Hwange.",
    cards: [
      {
        icon: "💦",
        title: "Victoria Falls",
        text: "Different seasons, different experiences",
      },
      {
        icon: "🦁",
        title: "Hwange Safari",
        text: "Excellent wildlife experiences nearby",
      },
    ],
  },

  food: {
    question: "What local food should I try in Zimbabwe?",
    answer:
      "Start with sadza served with traditional vegetables and a local stew, then explore dishes such as beef, chicken, goat, or mopane worms if you're feeling adventurous. In places like Bulawayo, local restaurants can be a great way to experience Zimbabwean food beyond hotel menus. 🍲",
    cards: [
      {
        icon: "🍲",
        title: "Traditional Cuisine",
        text: "Discover authentic Zimbabwean dishes",
      },
      {
        icon: "🌽",
        title: "Sadza",
        text: "A staple of Zimbabwean cuisine",
      },
    ],
  },

  safety: {
    question: "Is Zimbabwe safe for solo travelers?",
    answer:
      "Many travelers explore Zimbabwe independently, but it's still important to use normal travel precautions. Use reputable transport and guides where appropriate, avoid isolated areas at night, protect valuables, and check current official travel guidance before and during your trip.",
    cards: [
      {
        icon: "🛡️",
        title: "Travel Smart",
        text: "Use reputable tourism providers",
      },
      {
        icon: "📍",
        title: "Local Guidance",
        text: "Check current conditions before traveling",
      },
    ],
  },
};

export default function MeetZuri() {
  const [activeDemo, setActiveDemo] =
    useState<DemoKey>("best-time");

  const demo = demos[activeDemo];

  return (
    <section
      id="zuri"
      className="scroll-mt-24 bg-slate-950 px-4 py-20 text-white sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">

        {/* Section Heading */}
        <div className="text-center">

          <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-heritage sm:text-sm">
            🌍 Meet Zuri
          </span>

          <h2 className="mx-auto mt-6 max-w-4xl font-serif text-3xl leading-tight sm:text-4xl md:text-5xl">
            Your African Travel
            <br />
            <span className="text-heritage">
              Intelligence Companion
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-white/65 sm:text-lg sm:leading-8">
            Plan unforgettable journeys, discover authentic local experiences,
            and explore Africa with personalized itineraries, trusted
            recommendations, and travel intelligence built for the continent.
          </p>

        </div>

        {/* Demo Controls */}
        <div className="mt-8 flex flex-wrap justify-center gap-2 sm:mt-10 sm:gap-3">

          <button
            type="button"
            onClick={() => setActiveDemo("best-time")}
            className={`rounded-full px-4 py-2.5 text-xs font-semibold transition sm:px-5 sm:text-sm ${
              activeDemo === "best-time"
                ? "bg-heritage text-slate-950"
                : "border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
            }`}
          >
            Best Time
          </button>

          <button
            type="button"
            onClick={() => setActiveDemo("food")}
            className={`rounded-full px-4 py-2.5 text-xs font-semibold transition sm:px-5 sm:text-sm ${
              activeDemo === "food"
                ? "bg-heritage text-slate-950"
                : "border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
            }`}
          >
            Local Food
          </button>

          <button
            type="button"
            onClick={() => setActiveDemo("safety")}
            className={`rounded-full px-4 py-2.5 text-xs font-semibold transition sm:px-5 sm:text-sm ${
              activeDemo === "safety"
                ? "bg-heritage text-slate-950"
                : "border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
            }`}
          >
            Safety
          </button>

        </div>

        {/* Zuri Demo */}
        <div className="mx-auto mt-8 max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-2xl sm:mt-10">

          {/* Chat Header */}
          <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4 sm:px-6 sm:py-5">

            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-forest via-heritage to-sunrise text-lg shadow-lg sm:h-11 sm:w-11 sm:text-xl">
              🌍

              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-slate-950 bg-green-400 sm:h-3.5 sm:w-3.5" />
            </div>

            <div>
              <p className="font-semibold text-white">
                Zuri
              </p>

              <p className="text-xs font-medium text-heritage">
                ● Ready
              </p>
            </div>

          </div>

          {/* Conversation */}
          <div className="space-y-5 p-4 sm:p-6 md:p-8">

            {/* User Question */}
            <div className="flex justify-end">

              <div className="max-w-[92%] rounded-2xl rounded-tr-sm bg-heritage px-4 py-3 text-sm leading-6 text-slate-950 sm:max-w-[85%] sm:px-5 sm:py-4 sm:text-base">
                {demo.question}
              </div>

            </div>

            {/* Zuri Answer */}
            <div className="flex justify-start">

              <div className="max-w-[95%] rounded-2xl rounded-tl-sm border border-white/10 bg-white/[0.06] px-4 py-3 text-sm leading-7 text-white/85 sm:max-w-[90%] sm:px-5 sm:py-4 sm:text-base">
                {demo.answer}
              </div>

            </div>

            {/* Recommendation Cards */}
            <div className="grid grid-cols-1 gap-3 pt-1 sm:grid-cols-2 sm:pt-2">

              {demo.cards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition hover:bg-white/[0.07]"
                >

                  <div className="text-2xl">
                    {card.icon}
                  </div>

                  <p className="mt-3 font-semibold">
                    {card.title}
                  </p>

                  <p className="mt-1 text-xs leading-5 text-white/50">
                    {card.text}
                  </p>

                </div>
              ))}

            </div>

            <div className="pt-1 text-center text-[11px] text-white/35 sm:pt-2 sm:text-xs">
              Powered by African Tourism Intelligence
            </div>

          </div>
        </div>

        {/* Real Chat CTA */}
        <div className="mt-8 flex justify-center sm:mt-10">

          <Link
            href="/chat"
            className="inline-flex min-h-[52px] w-full max-w-sm items-center justify-center rounded-full bg-sunrise px-7 py-3.5 text-base font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-orange-600 hover:shadow-xl sm:w-auto sm:px-8 sm:py-4"
          >
            Start Planning With Zuri →
          </Link>

        </div>

        <p className="mx-auto mt-4 max-w-xl px-4 text-center text-xs leading-6 text-white/40 sm:text-sm">
          Ask Zuri about destinations, itineraries, culture, food, wildlife,
          and travel across Zimbabwe.
        </p>

      </div>
    </section>
  );
}