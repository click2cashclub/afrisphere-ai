"use client";

import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Message = { role: "user" | "zuri"; text: string };

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "zuri", text: "Hi! I'm Zuri, your local African friend powered by AI. Ask me anything about traveling in Zimbabwe — where to go, what to eat, or when to visit. 🌍" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const historyToSend = messages.map((m) => ({ role: m.role, text: m.text }));

    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history: historyToSend }),
      });
      const data = await res.json();

      if (data.reply) {
        setMessages((prev) => [...prev, { role: "zuri", text: data.reply }]);
      } else {
        setMessages((prev) => [...prev, { role: "zuri", text: "Sorry, I had trouble answering that — try again?" }]);
      }
    } catch {
      setMessages((prev) => [...prev, { role: "zuri", text: "I'm having connection trouble right now — try again in a moment." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white">
      <Navbar />

      <section className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-6 pt-28 pb-8">
        <div className="mb-4 flex items-center gap-3 border-b border-white/10 pb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-heritage text-lg">🌍</div>
          <div>
            <p className="font-semibold text-white">Zuri</p>
            <p className="text-xs text-green-400">● Online</p>
          </div>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                m.role === "user"
                  ? "ml-auto rounded-tr-sm bg-heritage text-slate-950"
                  : "rounded-tl-sm bg-white/10 text-white/90"
              }`}
            >
              {m.text}
            </div>
          ))}

          {loading && (
            <div className="flex max-w-[85%] items-center gap-1 rounded-2xl rounded-tl-sm bg-white/10 px-4 py-3">
              <span className="h-2 w-2 animate-bounce rounded-full bg-white/60 [animation-delay:-0.3s]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-white/60 [animation-delay:-0.15s]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-white/60" />
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="mt-6 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Zuri anything..."
            className="flex-1 bg-transparent py-2 text-sm text-white placeholder-white/40 outline-none"
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="rounded-full bg-heritage px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-yellow-500 disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
}