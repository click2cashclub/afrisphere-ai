"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const suggestions = [
  "Plan a 5-day Zimbabwe trip",
  "Best time to visit Victoria Falls?",
  "Where should I eat in Bulawayo?",
  "Plan a wildlife and culture trip",
];

export default function HeroSearch() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const submit = (value?: string) => {
    const text = (value ?? query).trim();

    if (!text) return;

    router.push(`/chat?q=${encodeURIComponent(text)}`);
  };

  return (
    <div className="mx-auto mt-10 w-full max-w-3xl">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-3 backdrop-blur-md">
        <div className="flex flex-col gap-3 md:flex-row">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") submit();
            }}
            placeholder="Ask Zuri anything about Africa..."
            className="flex-1 rounded-2xl bg-transparent px-5 py-4 text-white outline-none placeholder:text-white/40"
          />

          <button
            onClick={() => submit()}
            className="rounded-full bg-sunrise px-8 py-4 font-semibold text-white transition hover:bg-orange-600"
          >
            Ask Zuri →
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {suggestions.map((item) => (
          <button
            key={item}
            onClick={() => submit(item)}
            className="rounded-full border border-white/10 px-4 py-2 text-xs text-white/70 transition hover:border-heritage/50 hover:bg-white/5"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
