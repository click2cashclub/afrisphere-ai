"use client";

import {
  FormEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Message = {
  role: "user" | "zuri";
  text: string;
};

const welcomeMessage: Message = {
  role: "zuri",
  text:
    "Welcome! I'm Zuri, your African AI travel companion. 🇿🇼 Tell me what kind of trip you're dreaming about, and I'll help you discover Zimbabwe through local knowledge, culture, nature, food, and unforgettable experiences.",
};

const suggestions = [
  "Plan a 5-day Zimbabwe trip",
  "Best time to visit Victoria Falls?",
  "Where should I eat in Bulawayo?",
  "Plan a wildlife and culture trip",
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([welcomeMessage]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, loading]);

  const sendMessage = async (messageText?: string) => {
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

      if (!response.ok) {
        throw new Error(data.error || "Zuri could not respond.");
      }

      if (!data.reply || typeof data.reply !== "string") {
        throw new Error("Zuri returned an empty response.");
      }

      setMessages((previous) => [
        ...previous,
        {
          role: "zuri",
          text: data.reply,
        },
      ]);
    } catch (error) {
      console.error("Zuri chat error:", error);

      setErrorMessage(
        "Zuri couldn't connect right now. Please try again in a moment."
      );
    } finally {
      setLoading(false);

      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
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

  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white">
      <Navbar />

      <section className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 pb-10 pt-28 sm:px-6">
        {/* Chat Header */}
        <div className="mb-6 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-forest via-heritage to-sunrise text-xl font-bold shadow-lg">
                Z

                <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-slate-900 bg-green-400" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-serif text-2xl">
                    Zuri
                  </h1>

                  <span className="rounded-full bg-heritage/15 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-heritage">
                    AI
                  </span>
                </div>

                <p className="mt-1 text-sm text-white/60">
                  Your African AI travel companion
                </p>

                <p className="mt-1 text-xs text-green-400">
                  ● Ready to help
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={clearConversation}
              disabled={loading}
              className="self-start rounded-full border border-white/10 px-4 py-2 text-xs font-medium text-white/60 transition hover:border-white/20 hover:bg-white/5 hover:text-white disabled:opacity-40 sm:self-auto"
            >
              New conversation
            </button>
          </div>
        </div>

        {/* Main Chat Container */}
        <div className="flex min-h-[620px] flex-1 flex-col overflow-hidden rounded-3xl border border-white/10 bg-black/20 shadow-2xl backdrop-blur-sm">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-7">
            <div className="space-y-6">
              {messages.map((message, index) => {
                const isUser = message.role === "user";

                return (
                  <div
                    key={`${message.role}-${index}`}
                    className={`flex ${
                      isUser ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`flex max-w-[90%] gap-3 sm:max-w-[78%] ${
                        isUser ? "flex-row-reverse" : ""
                      }`}
                    >
                      {/* Avatar */}
                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                          isUser
                            ? "bg-white/10 text-white"
                            : "bg-heritage text-slate-950"
                        }`}
                      >
                        {isUser ? "You" : "Z"}
                      </div>

                      {/* Message */}
                      <div>
                        <div
                          className={`whitespace-pre-wrap rounded-3xl px-5 py-4 text-sm leading-7 sm:text-[15px] ${
                            isUser
                              ? "rounded-tr-md bg-heritage text-slate-950"
                              : "rounded-tl-md border border-white/10 bg-white/[0.07] text-white/90"
                          }`}
                        >
                          {message.text}
                        </div>

                        {!isUser && (
                          <p className="mt-2 px-2 text-[11px] text-white/30">
                            Zuri · AfriSphere AI
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Typing indicator */}
              {loading && (
                <div className="flex justify-start">
                  <div className="flex max-w-[80%] gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-heritage text-xs font-bold text-slate-950">
                      Z
                    </div>

                    <div className="rounded-3xl rounded-tl-md border border-white/10 bg-white/[0.07] px-5 py-4">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 animate-bounce rounded-full bg-white/60 [animation-delay:-0.3s]" />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-white/60 [animation-delay:-0.15s]" />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-white/60" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>
          </div>

          {/* Suggestions */}
          {messages.length === 1 && !loading && (
            <div className="border-t border-white/5 px-4 py-4 sm:px-7">
              <p className="mb-3 text-xs font-medium uppercase tracking-wider text-white/35">
                Try asking Zuri
              </p>

              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => sendMessage(suggestion)}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-left text-xs text-white/70 transition hover:border-heritage/50 hover:bg-heritage/10 hover:text-white"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Error */}
          {errorMessage && (
            <div className="mx-4 mb-2 rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200 sm:mx-7">
              {errorMessage}
            </div>
          )}

          {/* Input */}
          <div className="border-t border-white/10 bg-slate-950/80 p-4 sm:p-5">
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-white/10 bg-white/5 p-2 transition focus-within:border-heritage/50"
            >
              <div className="flex items-end gap-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask Zuri about Zimbabwe..."
                  rows={1}
                  maxLength={2000}
                  disabled={loading}
                  className="max-h-36 min-h-[48px] flex-1 resize-none bg-transparent px-4 py-3 text-sm leading-6 text-white outline-none placeholder:text-white/35 disabled:opacity-50"
                />

                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="flex h-12 shrink-0 items-center justify-center rounded-full bg-sunrise px-6 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {loading ? "Thinking..." : "Send →"}
                </button>
              </div>
            </form>

            <div className="mt-3 flex flex-col justify-between gap-2 px-2 text-[11px] text-white/30 sm:flex-row">
              <span>
                Press Enter to send · Shift + Enter for a new line
              </span>

              <span>
                Zuri can make mistakes. Verify important travel information.
              </span>
            </div>
          </div>
        </div>

        {/* Product positioning */}
        <div className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-white/35">
          <span>Zimbabwe first</span>
          <span>🌍 Built for African travel</span>
          <span>🤖 Powered by AI</span>
          <span>🤝 Local knowledge</span>
        </div>
      </section>

      <Footer />
    </main>
  );
}