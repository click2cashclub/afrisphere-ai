"use client";

import {
  ComponentPropsWithoutRef,
  FormEvent,
  KeyboardEvent,
  Suspense,
  useEffect,
  useRef,
  useState,
} from "react";

import { useSearchParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TripSummaryCard from "@/components/TripSummaryCard";
import DestinationCards from "@/components/DestinationCards";
import HotelCards from "@/components/HotelCards";
import RestaurantCards from "@/components/RestaurantCards";
import ExperienceCards from "@/components/ExperienceCards";
import FollowUpQuestions from "@/components/FollowUpQuestions";

type TripSummary = {
  country?: string;
  duration?: number;
  travelStyle?: string;
  transport?: string;
  budget?: string;
  accommodation?: string;
  activities?: string;
  food?: string;
  transportCost?: string;
  dailyEstimate?: string;
  bestFor?: string;
  matchScore?: string;
};

type Destination = {
  name: string;
  type?: string;
  description?: string;
};

type Hotel = {
  name: string;
  description?: string;
  rating?: string;
  priceRange?: string;
  location?: string;
  reasons?: string[];
};

type Restaurant = {
  name: string;
  description?: string;
  rating?: string;
  reasons?: string[];
};

type Experience = {
  name: string;
  description?: string;
  duration?: string;
  bestTime?: string;
  location?: string;
  reasons?: string[];
};

type Message = {
  role: "user" | "zuri";
  text: string;
  trip?: TripSummary;
  destinations?: Destination[];
  hotels?: Hotel[];
  restaurants?: Restaurant[];
  experiences?: Experience[];
  followUpQuestions?: string[];
};

const welcomeMessage: Message = {
  role: "zuri",
  text:
    "Welcome! I'm Zuri, your African travel companion. Tell me where you'd like to explore, and I'll help you discover authentic destinations, cultures, wildlife, food, and unforgettable experiences across Africa.",
};

const suggestions = [
  {
    emoji: "🗺️",
    text: "Plan a 5-day Zimbabwe trip",
  },
  {
    emoji: "🌊",
    text: "Best time to visit Victoria Falls?",
  },
  {
    emoji: "🍽️",
    text: "Where should I eat in Bulawayo?",
  },
  {
    emoji: "🦁",
    text: "Plan a wildlife and culture trip",
  },
];

/*
|--------------------------------------------------------------------------
| MARKDOWN STYLING
|--------------------------------------------------------------------------
|
| Zuri's replies come back as markdown from Gemini (headers, bold text,
| lists, dividers). These overrides render that markdown as properly
| styled elements matching the app's dark slate / heritage-gold theme, instead
| of showing raw "###" and "**" characters as literal text.
*/

const markdownComponents = {
  h1: (props: ComponentPropsWithoutRef<"h1">) => (
    <h1
      className="mb-3 mt-5 text-lg font-bold text-white first:mt-0"
      {...props}
    />
  ),
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2
      className="mb-3 mt-5 text-base font-bold text-white first:mt-0"
      {...props}
    />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3
      className="mb-2 mt-4 text-sm font-bold uppercase tracking-wide text-heritage first:mt-0"
      {...props}
    />
  ),
  h4: (props: ComponentPropsWithoutRef<"h4">) => (
    <h4
      className="mb-2 mt-4 text-sm font-bold text-heritage first:mt-0"
      {...props}
    />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="mb-3 leading-7 last:mb-0" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-semibold text-white" {...props} />
  ),
  em: (props: ComponentPropsWithoutRef<"em">) => (
    <em className="text-white/80" {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className="mb-3 ml-1 space-y-1.5 last:mb-0" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol
      className="mb-3 ml-1 list-decimal space-y-1.5 pl-4 last:mb-0"
      {...props}
    />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => (
    <li className="flex gap-2 leading-6">
      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-heritage" />
      <span className="min-w-0">{props.children}</span>
    </li>
  ),
  a: (props: ComponentPropsWithoutRef<"a">) => (
    <a
      className="font-medium text-heritage underline decoration-heritage/40 underline-offset-2 hover:text-white"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  hr: () => <hr className="my-4 border-white/10" />,
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="mb-3 border-l-2 border-heritage/40 pl-3 text-white/70 last:mb-0"
      {...props}
    />
  ),
  code: (props: ComponentPropsWithoutRef<"code">) => (
    <code
      className="rounded bg-black/30 px-1.5 py-0.5 font-mono text-[13px] text-heritage"
      {...props}
    />
  ),
};

function ChatPageContent() {
  const [messages, setMessages] = useState<Message[]>([
    welcomeMessage,
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const searchParams = useSearchParams();
  const hasAutoSent = useRef(false);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, loading]);

  useEffect(() => {
    if (hasAutoSent.current) return;

    const initialQuestion = searchParams.get("q");

    if (!initialQuestion) return;

    hasAutoSent.current = true;

    const timer = setTimeout(() => {
      sendMessage(initialQuestion);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchParams]);

  async function sendMessage(messageText?: string) {
    const text = (messageText ?? input).trim();

    if (!text || loading) return;

    const historyToSend = messages.map((message) => ({
      role: message.role,
      text: message.text,
    }));

    setMessages((previous) => [
      ...previous,
      {
        role: "user",
        text,
      },
    ]);

    setInput("");
    setErrorMessage("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
          history: historyToSend,
        }),
      });

      const data = await response.json();

      console.log("API RESPONSE:", data);

      if (!response.ok) {
        const apiError =
          typeof data?.error === "string"
            ? data.error
            : "";

        const lowerError = apiError.toLowerCase();

        if (
          response.status === 429 ||
          lowerError.includes("quota") ||
          lowerError.includes("rate limit") ||
          lowerError.includes("resource_exhausted")
        ) {
          throw new Error(
            "Zuri is temporarily unavailable because the Gemini API quota has been reached. Your conversation is still here — please try again once the service is available."
          );
        }

        throw new Error(
          apiError || "Zuri could not respond."
        );
      }

      if (
        !data.answer ||
        typeof data.answer !== "string"
      ) {
        throw new Error(
          "Zuri returned an empty response."
        );
      }

      setMessages((previous) => [
        ...previous,
        {
          role: "zuri",
          text: data.answer,
          trip: data.trip,
          destinations: Array.isArray(data.destinations)
            ? data.destinations
            : [],
          hotels: Array.isArray(data.hotels)
            ? data.hotels
            : [],
          restaurants: Array.isArray(data.restaurants)
            ? data.restaurants
            : [],
          experiences: Array.isArray(data.experiences)
            ? data.experiences
            : [],
          followUpQuestions: Array.isArray(
            data.followUpQuestions
          )
            ? data.followUpQuestions
            : [],
        },
      ]);
    } catch (error) {
      console.error("Zuri chat error:", error);

      const message =
        error instanceof Error
          ? error.message
          : "Zuri couldn't respond right now.";

      setErrorMessage(message);
    } finally {
      setLoading(false);

      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    sendMessage();
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const clearConversation = () => {
    setMessages([welcomeMessage]);
    setInput("");
    setErrorMessage("");

    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const isWelcomeOnly = messages.length === 1;

  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white">
      <Navbar />

      <section className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 pb-10 pt-28 sm:px-6">

        {/* Header */}
        <div className="mb-6 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-xl backdrop-blur-xl">
          <div className="relative p-5 sm:p-6">

            <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-heritage/10 blur-3xl" />

            <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex items-center gap-4">

                {/* Zuri Avatar */}
                <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-forest via-heritage to-sunrise text-xl font-bold text-white shadow-lg shadow-heritage/20">
                  Z

                  <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-slate-950 bg-heritage" />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="font-serif text-2xl font-bold">
                      Zuri
                    </h1>

                    <span className="rounded-full border border-heritage/20 bg-heritage/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-heritage">
                      Travel AI
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-white/60">
                    Your African travel companion
                  </p>

                  <div className="mt-1 flex items-center gap-2 text-xs text-heritage">
                    <span className="h-1.5 w-1.5 rounded-full bg-heritage shadow-[0_0_8px_rgba(202,138,4,0.8)]" />
                    Ready to plan your journey
                  </div>
                </div>

              </div>

              <button
                type="button"
                onClick={clearConversation}
                disabled={loading}
                className="self-start rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 text-xs font-medium text-white/60 transition hover:border-white/20 hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-40 sm:self-auto"
              >
                + New conversation
              </button>

            </div>
          </div>
        </div>

        {/* Chat Container */}
        <div className="flex min-h-[620px] flex-1 flex-col overflow-hidden rounded-3xl border border-white/10 bg-black/20 shadow-2xl backdrop-blur-xl">

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-7 sm:py-8">

            <div className="mx-auto max-w-4xl space-y-7">

              {messages.map((message, index) => {
                const isUser = message.role === "user";

                return (
                  <div
                    key={`${message.role}-${index}`}
                    className={`flex ${
                      isUser
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >

                    <div
                      className={`flex max-w-[94%] gap-3 sm:max-w-[82%] ${
                        isUser
                          ? "flex-row-reverse"
                          : ""
                      }`}
                    >

                      {/* Avatar */}
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[10px] font-bold ${
                          isUser
                            ? "bg-white/10 text-white/70"
                            : "bg-heritage text-slate-950 shadow-lg shadow-heritage/10"
                        }`}
                      >
                        {isUser ? "YOU" : "Z"}
                      </div>

                      <div className="min-w-0">

                        {/* Message */}
                        <div
                          className={`rounded-3xl px-5 py-4 text-sm leading-7 sm:text-[15px] ${
                            isUser
                              ? "whitespace-pre-wrap rounded-tr-md bg-heritage text-slate-950 shadow-lg shadow-heritage/10"
                              : "rounded-tl-md border border-white/10 bg-white/[0.06] text-white/90 shadow-lg shadow-black/10"
                          }`}
                        >
                          {isUser ? (
                            message.text
                          ) : (
                            <ReactMarkdown
                              remarkPlugins={[remarkGfm]}
                              components={markdownComponents}
                            >
                              {message.text}
                            </ReactMarkdown>
                          )}
                        </div>

                        {/* Recommendation Cards */}
                        {!isUser && (
                          <div className="mt-5 space-y-5">

                            {message.trip &&
  Object.keys(message.trip).length > 0 &&
  message.restaurants?.length === 0 &&
  message.hotels?.length === 0 &&
  message.experiences?.length === 0 && (
    <TripSummaryCard
      country={message.trip.country}
      duration={message.trip.duration}
      travelStyle={
        message.trip.travelStyle
      }
      transport={
        message.trip.transport
      }
      budget={message.trip.budget}
      bestFor={message.trip.bestFor}
      matchScore={
        message.trip.matchScore
      }
    />
  )}
                            {message.destinations &&
                              message.destinations.length > 0 && (
                                <DestinationCards
                                  destinations={
                                    message.destinations
                                  }
                                />
                              )}

                            {message.hotels &&
                              message.hotels.length > 0 && (
                                <HotelCards
                                  hotels={message.hotels}
                                />
                              )}

                            {message.restaurants &&
                              message.restaurants.length > 0 && (
                                <RestaurantCards
                                  restaurants={
                                    message.restaurants
                                  }
                                />
                              )}

                            {message.experiences &&
                              message.experiences.length > 0 && (
                                <ExperienceCards
                                  experiences={
                                    message.experiences
                                  }
                                />
                              )}

                            {message.followUpQuestions &&
                              message.followUpQuestions.length >
                                0 && (
                                <FollowUpQuestions
                                  questions={
                                    message.followUpQuestions
                                  }
                                  onSelect={(question) =>
                                    sendMessage(question)
                                  }
                                />
                              )}

                          </div>
                        )}

                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Loading */}
              {loading && (
                <div className="flex justify-start">

                  <div className="flex max-w-[90%] gap-3">

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-heritage text-xs font-bold text-slate-950">
                      Z
                    </div>

                    <div className="rounded-3xl rounded-tl-md border border-white/10 bg-white/[0.06] px-5 py-4">

                      <div className="flex items-center gap-3">

                        <div className="flex items-center gap-1.5">
                          <span className="h-2 w-2 animate-bounce rounded-full bg-heritage [animation-delay:-0.3s]" />
                          <span className="h-2 w-2 animate-bounce rounded-full bg-heritage [animation-delay:-0.15s]" />
                          <span className="h-2 w-2 animate-bounce rounded-full bg-heritage" />
                        </div>

                        <span className="text-xs text-white/40">
                          Zuri is planning your journey...
                        </span>

                      </div>
                    </div>

                  </div>
                </div>
              )}

              <div ref={bottomRef} />

            </div>
          </div>

          {/* Welcome Suggestions */}
          {isWelcomeOnly && !loading && (
            <div className="border-t border-white/5 px-4 py-5 sm:px-7">

              <div className="mx-auto max-w-4xl">

                <div className="mb-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-heritage/70">
                    Start exploring
                  </p>

                  <p className="mt-1 text-sm text-white/40">
                    Try one of these or ask Zuri anything about your trip.
                  </p>
                </div>

                <div className="grid gap-2 sm:grid-cols-2">

                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion.text}
                      type="button"
                      onClick={() =>
                        sendMessage(suggestion.text)
                      }
                      className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-left transition hover:-translate-y-0.5 hover:border-heritage/30 hover:bg-heritage/[0.06]"
                    >
                      <span className="text-lg">
                        {suggestion.emoji}
                      </span>

                      <span className="text-sm text-white/65 transition group-hover:text-white">
                        {suggestion.text}
                      </span>

                      <span className="ml-auto text-white/20 transition group-hover:translate-x-1 group-hover:text-heritage">
                        →
                      </span>
                    </button>
                  ))}

                </div>

              </div>
            </div>
          )}

          {/* Error */}
          {errorMessage && (
            <div className="border-t border-red-400/10 px-4 py-4 sm:px-7">

              <div className="mx-auto flex max-w-4xl items-start gap-3 rounded-2xl border border-red-400/20 bg-red-400/[0.07] px-4 py-4">

                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-400/10 text-sm">
                  ⚠️
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-semibold text-red-200">
                    Zuri is temporarily unavailable
                  </p>

                  <p className="mt-1 text-xs leading-5 text-red-200/60">
                    {errorMessage}
                  </p>
                </div>

              </div>
            </div>
          )}

          {/* Input */}
          <div className="border-t border-white/10 bg-slate-950/80 p-4 sm:p-5">

            <div className="mx-auto max-w-4xl">

              <form
                onSubmit={handleSubmit}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-2 transition focus-within:border-heritage/40 focus-within:bg-white/[0.06]"
              >

                <div className="flex items-end gap-2">

                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(event) =>
                      setInput(event.target.value)
                    }
                    onKeyDown={handleKeyDown}
                    placeholder="Ask Zuri about Zimbabwe..."
                    rows={1}
                    maxLength={2000}
                    disabled={loading}
                    className="max-h-36 min-h-[48px] flex-1 resize-none bg-transparent px-4 py-3 text-sm leading-6 text-white outline-none placeholder:text-white/30 disabled:opacity-50"
                  />

                  <button
                    type="submit"
                    disabled={
                      loading || !input.trim()
                    }
                    className="flex h-12 shrink-0 items-center justify-center rounded-full bg-sunrise px-5 text-sm font-semibold text-white shadow-lg shadow-sunrise/10 transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-30 sm:px-6"
                  >
                    {loading
                      ? "Thinking..."
                      : "Send →"}
                  </button>

                </div>
              </form>

              <div className="mt-3 flex flex-col justify-between gap-2 px-2 text-[11px] text-white/25 sm:flex-row">

                <span>
                  Enter to send · Shift + Enter for a new line
                </span>

                <span>
                  Verify important travel information before booking.
                </span>

              </div>

            </div>
          </div>

        </div>

        {/* Product Positioning */}
        <div className="mt-5 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-white/30">

          <span>🇿🇼 Zimbabwe first</span>
          <span>🌍 Built for African travel</span>
          <span>🤖 Powered by AI</span>
          <span>🤝 Local knowledge</span>

        </div>

      </section>

      <Footer />
    </main>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={null}>
      <ChatPageContent />
    </Suspense>
  );
}