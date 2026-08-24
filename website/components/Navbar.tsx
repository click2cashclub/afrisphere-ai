"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { label: "Product", href: "/#why" },
  { label: "Meet Zuri", href: "/chat" },
  { label: "Zimbabwe", href: "/#zimbabwe" },
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

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnResize = () => {
      if (window.innerWidth >= 1024) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", closeOnResize);

    return () => {
      window.removeEventListener("resize", closeOnResize);
    };
  }, [menuOpen]);

  return (
    <nav
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        scrolled || menuOpen
          ? "border-b border-black/5 bg-warmwhite/95 shadow-sm backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      {/* Main Navbar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">

        {/* Logo */}
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className={`flex min-w-0 items-center gap-2 text-lg font-semibold transition sm:text-xl ${
            scrolled || menuOpen
              ? "text-forest"
              : "text-white"
          }`}
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-forest via-heritage to-sunrise text-sm font-bold text-white shadow-md">
            A
          </span>

          <span className="truncate font-serif">
            AfriSphere{" "}
            <span className="text-heritage">
              AI
            </span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div
          className={`hidden items-center gap-7 text-sm font-medium lg:flex ${
            scrolled
              ? "text-gray-700"
              : "text-white/90"
          }`}
        >
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`transition ${
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
          href="/chat"
          className="hidden rounded-full bg-sunrise px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-orange-600 lg:inline-flex"
        >
          Meet Zuri →
        </Link>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() =>
            setMenuOpen((open) => !open)
          }
          aria-label={
            menuOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xl transition ${
            scrolled || menuOpen
              ? "text-forest hover:bg-black/5"
              : "text-white hover:bg-white/10"
          } lg:hidden`}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        id="mobile-navigation"
        className={`overflow-hidden transition-all duration-300 ease-out lg:hidden ${
          menuOpen
            ? "max-h-[500px] opacity-100"
            : "pointer-events-none max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-black/5 bg-warmwhite/95 px-4 pb-6 pt-4 shadow-lg backdrop-blur-xl sm:px-6">

          <div className="mx-auto max-w-7xl">

            {/* Navigation Links */}
            <div className="flex flex-col">

              {links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() =>
                    setMenuOpen(false)
                  }
                  className="border-b border-black/5 py-4 text-base font-medium text-gray-700 transition hover:pl-1 hover:text-forest"
                >
                  {link.label}
                </Link>
              ))}

            </div>

            {/* Mobile CTA */}
            <Link
              href="/chat"
              onClick={() => setMenuOpen(false)}
              className="mt-5 flex items-center justify-center rounded-full bg-sunrise px-6 py-3.5 font-semibold text-white shadow-sm transition hover:bg-orange-600"
            >
              Meet Zuri →
            </Link>

          </div>
        </div>
      </div>
    </nav>
  );
}