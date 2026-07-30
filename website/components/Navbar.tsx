"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { label: "Product", href: "/#why" },
  { label: "Meet Zuri", href: "/#zuri" },
  { label: "Zimbabwe", href: "/#launch" },
  { label: "Roadmap", href: "/#roadmap" },
  { label: "Early Access", href: "/#waitlist" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    onScroll();

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-black/5 bg-warmwhite/90 shadow-sm backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link
          href="/"
          className={`flex items-center gap-3 transition-colors ${
            scrolled ? "text-forest" : "text-white"
          }`}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-forest to-sunrise text-sm font-bold text-white shadow-md">
            A
          </span>

          <span className="font-serif text-xl font-semibold">
            AfriSphere{" "}
            <span className={scrolled ? "text-sunrise" : "text-heritage"}>
              AI
            </span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div
          className={`hidden items-center gap-7 text-sm font-medium lg:flex ${
            scrolled ? "text-gray-700" : "text-white/80"
          }`}
        >
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`transition-colors duration-300 ${
                scrolled
                  ? "hover:text-forest"
                  : "hover:text-heritage"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <Link
          href="/#zuri"
          className={`hidden rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 hover:scale-105 lg:block ${
            scrolled
              ? "bg-forest text-white hover:bg-sunrise"
              : "bg-sunrise text-white hover:bg-orange-600"
          }`}
        >
          Meet Zuri →
        </Link>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          className={`text-2xl transition-colors lg:hidden ${
            scrolled ? "text-forest" : "text-white"
          }`}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="border-t border-black/5 bg-warmwhite px-6 py-6 shadow-xl lg:hidden">
          <div className="flex flex-col gap-5">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium text-gray-700 transition hover:text-forest"
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/#zuri"
              onClick={() => setMenuOpen(false)}
              className="mt-2 rounded-full bg-sunrise px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              Meet Zuri →
            </Link>

            <Link
              href="/#waitlist"
              onClick={() => setMenuOpen(false)}
              className="rounded-full border border-forest/20 px-6 py-3 text-center text-sm font-semibold text-forest transition hover:bg-forest hover:text-white"
            >
              Join Early Access
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}