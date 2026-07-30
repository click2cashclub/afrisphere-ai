"use client";

import Link from "next/link";
import { useState } from "react";

type DemoKey = "best-time" | "food" | "safety";

const demos: Record<
  DemoKey,
  {
    question: string;
    answer: string;
    cards: {
      icon: string;
      title: string;
      text: string;
    }[];
  }
> = {
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
      className="scroll-mt-24 bg-slate-950 px-6 py-24 text-white"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section heading */}
        <div className="text-center">
          <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-heritage">
            🤖 Meet Zuri
          </span>

          <h2 className="mx-auto mt-6 max-w-4xl font-serif text-4xl leading-tight md:text-5xl">
            Your Local African Friend
            <br />
            <span className="text-heritage">
              Powered by AI
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-white/65">
            From planning unforgettable safaris to discovering authentic local
            cuisine, Zuri helps you explore Africa with trusted local knowledge,
            personalized recommendations, and intelligent travel planning.
          </p>
        </div>

        {/* Demo controls */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => setActiveDemo("best-time")}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
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
            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
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
            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
              activeDemo === "safety"
                ? "bg-heritage text-slate-950"
                : "border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
            }`}
          >
            Safety
          </button>
        </div>

        {/* Zuri demo */}
        <div className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-2xl">
          {/* Chat header */}
          <div className="flex items-center gap-3 border-b border-white/10 px-6 py-5">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-forest via-heritage to-sunrise font-bold text-white">
              Z

              <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-slate-950 bg-green-400" />
            </div>

            <div>
              <p className="font-semibold">
                Zuri AI
              </p>

              <p className="text-xs text-green-400">
                ● Online
              </p>
            </div>
          </div>

          {/* Conversation */}
          <div className="space-y-5 p-6 md:p-8">
            {/* User question */}
            <div className="flex justify-end">
              <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-heritage px-5 py-4 text-sm leading-6 text-slate-950 md:text-base">
                {demo.question}
              </div>
            </div>

            {/* Zuri answer */}
            <div className="flex justify-start">
              <div className="max-w-[90%] rounded-2xl rounded-tl-sm border border-white/10 bg-white/[0.06] px-5 py-4 text-sm leading-7 text-white/85 md:text-base">
                {demo.answer}
              </div>
            </div>

            {/* Recommendation cards */}
            <div className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-2">
              {demo.cards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
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

            <div className="pt-2 text-center text-xs text-white/35">
              Powered by African Tourism Intelligence
            </div>
          </div>
        </div>

        {/* REAL CHAT CTA */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/chat"
            className="inline-flex cursor-pointer items-center justify-center rounded-full bg-sunrise px-8 py-4 text-base font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-orange-600 hover:shadow-xl"
          >
            Start Planning With Zuri →
          </Link>
        </div>

        <p className="mx-auto mt-4 max-w-xl text-center text-sm text-white/40">
          Ask Zuri about destinations, itineraries, culture, food, wildlife,
          and travel across Zimbabwe.
        </p>
      </div>
    </section>
  );
}