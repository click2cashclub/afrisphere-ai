"use client";

import { useState, useEffect } from "react";

const conversations = {
  timing: {
    label: "Best Time",
    question: "When's the best time to visit Victoria Falls?",
    answer:
      "February to May is the best time to witness Victoria Falls at its most powerful after the rainy season. If you're planning a safari too, June to August offers excellent wildlife viewing around Hwange National Park.",
    cards: [
      {
        emoji: "💦",
        title: "Victoria Falls",
        tag: "Peak Flow • Feb – May",
      },
      {
        emoji: "🦁",
        title: "Hwange Safari",
        tag: "Best Wildlife • Jun – Aug",
      },
    ],
  },

  food: {
    label: "Local Food",
    question: "What local food should I try in Bulawayo?",
    answer:
      "Start with authentic sadza and nyama choma, then try road-runner chicken, mopane worms, and muriwo une dovi. I can also recommend highly rated local restaurants nearby.",
    cards: [
      {
        emoji: "🍖",
        title: "Nyama Choma",
        tag: "Local Favourite",
      },
      {
        emoji: "🥘",
        title: "Traditional Cuisine",
        tag: "Authentic Zimbabwe",
      },
    ],
  },

  safety: {
    label: "Safety",
    question: "Is Zimbabwe safe for solo travelers?",
    answer:
      "Yes. Zimbabwe is generally safe around major tourist destinations. I recommend registered guides for safaris, avoiding isolated areas at night, and following local travel advice that I can provide in real time.",
    cards: [
      {
        emoji: "🛡️",
        title: "Verified Guides",
        tag: "Trusted Operators",
      },
      {
        emoji: "📍",
        title: "Live Travel Tips",
        tag: "Updated Daily",
      },
    ],
  },
};

type ConvoKey = keyof typeof conversations;

export default function MeetZuri() {
  const [active, setActive] = useState<ConvoKey>("timing");
  const [showAnswer, setShowAnswer] = useState(false);
  const [showCards, setShowCards] = useState(false);

  const convo = conversations[active];

  useEffect(() => {
    setShowAnswer(false);
    setShowCards(false);

    const timer1 = setTimeout(() => setShowAnswer(true), 1000);
    const timer2 = setTimeout(() => setShowCards(true), 1500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [active]);

  return (
    <section
      id="zuri"
      className="bg-deepblue px-6 py-24 text-white"
    >
      <div className="mx-auto max-w-7xl">

        {/* Header */}

        <div className="mx-auto max-w-3xl text-center">

          <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-orange-300">
            🤖 Meet Zuri
          </span>

          <h2 className="mt-8 font-serif text-4xl leading-tight md:text-5xl">
            Your Local African Friend
            <span className="block text-heritage">
              Powered by AI
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-blue-100/80">
            From planning unforgettable safaris to discovering authentic local
            cuisine, Zuri helps you explore Africa with trusted local knowledge,
            personalized recommendations, and intelligent travel planning.
          </p>

        </div>

        {/* Conversation Buttons */}

        <div className="mx-auto mt-12 flex max-w-xl flex-wrap justify-center gap-3">

          {(Object.keys(conversations) as ConvoKey[]).map((key) => (

            <button
              key={key}
              onClick={() => setActive(key)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                active === key
                  ? "bg-orange-500 text-white shadow-lg"
                  : "border border-white/20 bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {conversations[key].label}
            </button>

          ))}

        </div>

        {/* Chat */}

        <div className="relative mx-auto mt-14 max-w-2xl">

          {/* Glow */}

          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-orange-500/20 via-yellow-400/10 to-emerald-500/20 blur-3xl"></div>

          <div className="relative rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

            {/* Header */}

            <div className="flex items-center gap-4 border-b border-white/10 pb-5">

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-yellow-500 font-bold text-white">
                Z
              </div>

              <div>

                <h3 className="font-semibold text-white">
                  Zuri AI
                </h3>

                <p className="text-sm text-green-300">
                  ● Online
                </p>

              </div>

            </div>

            {/* Messages */}

            <div className="mt-8 space-y-6">

              <div className="ml-auto max-w-[80%] rounded-2xl rounded-tr-sm bg-orange-500 px-5 py-4 text-sm text-white shadow-lg">
                {convo.question}
                <p className="mt-2 text-xs text-orange-100">
                  9:41 AM
                </p>
              </div>

              {!showAnswer && (

                <div className="flex max-w-[70%] items-center gap-2 rounded-2xl rounded-tl-sm bg-white/10 px-5 py-4">

                  <span className="h-2 w-2 animate-bounce rounded-full bg-white/60 [animation-delay:-0.3s]" />

                  <span className="h-2 w-2 animate-bounce rounded-full bg-white/60 [animation-delay:-0.15s]" />

                  <span className="h-2 w-2 animate-bounce rounded-full bg-white/60" />

                </div>

              )}

              {showAnswer && (

                <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-white/10 px-5 py-4 text-sm leading-7 text-white">

                  {convo.answer}

                  <p className="mt-3 text-xs text-white/50">
                    9:41 AM
                  </p>

                </div>

              )}

              {showCards && (

                <div className="grid grid-cols-2 gap-4">

                  {convo.cards.map((card) => (

                    <div
                      key={card.title}
                      className="rounded-2xl border border-white/10 bg-white/10 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-orange-400 hover:bg-white/15"
                    >

                      <div className="text-3xl">
                        {card.emoji}
                      </div>

                      <h4 className="mt-4 font-semibold text-white">
                        {card.title}
                      </h4>

                      <p className="mt-1 text-sm text-white/60">
                        {card.tag}
                      </p>

                    </div>

                  ))}

                </div>

              )}

            </div>

          </div>

        </div>

        {/* CTA */}

        <div className="mt-14 text-center">

          <p className="mb-5 text-sm uppercase tracking-widest text-blue-200">
            Powered by African Tourism Intelligence
          </p>

          <button className="rounded-full bg-orange-500 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-orange-600">
            Start Planning With Zuri →
          </button>

        </div>

      </div>
    </section>
  );
}