import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950 px-4 py-14 text-white sm:px-6 sm:py-16">
      <div className="mx-auto max-w-6xl">

        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-12 md:grid-cols-4">

          {/* Brand */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-forest text-lg">
                🌍
              </div>

              <span className="font-serif text-xl">
                AfriSphere{" "}
                <span className="text-heritage">
                  AI
                </span>
              </span>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-6 text-white/60">
              Ancient cultures. Modern intelligence. One Africa.
            </p>

            <p className="mt-3 text-sm text-white/40">
              📍 Bulawayo, Zimbabwe
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold text-white">
              Product
            </h4>

            <ul className="mt-5 space-y-3 text-sm text-white/60">

              <li>
                <Link
                  href="/#why"
                  className="transition hover:text-sunrise"
                >
                  Why AfriSphere AI
                </Link>
              </li>

              <li>
                <Link
                  href="/#zuri"
                  className="transition hover:text-sunrise"
                >
                  Meet Zuri
                </Link>
              </li>

              <li>
                <Link
                  href="/#zimbabwe"
                  className="transition hover:text-sunrise"
                >
                  Explore Zimbabwe
                </Link>
              </li>

              <li>
                <Link
                  href="/#roadmap"
                  className="transition hover:text-sunrise"
                >
                  Roadmap
                </Link>
              </li>

            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-white">
              Company
            </h4>

            <ul className="mt-5 space-y-3 text-sm text-white/60">

              <li>
                <Link
                  href="/#roadmap"
                  className="transition hover:text-sunrise"
                >
                  Our Vision
                </Link>
              </li>

              <li>
                <Link
                  href="/#waitlist"
                  className="transition hover:text-sunrise"
                >
                  Early Access
                </Link>
              </li>

              <li>
                <Link
                  href="/#for-businesses"
                  className="transition hover:text-sunrise"
                >
                  For Businesses
                </Link>
              </li>

            </ul>
          </div>

          {/* Join */}
          <div>
            <h4 className="text-sm font-semibold text-white">
              Join the Journey
            </h4>

            <p className="mt-5 text-sm leading-6 text-white/60">
              Be among the first to experience Zuri as we launch in Zimbabwe.
            </p>

            <Link
              href="/#waitlist"
              className="mt-6 inline-flex min-h-[48px] items-center justify-center rounded-full bg-sunrise px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-orange-600"
            >
              Join Waitlist →
            </Link>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-7 text-xs text-white/40 sm:mt-14 sm:flex-row sm:items-center sm:justify-between sm:text-sm">

          <p>
            © {new Date().getFullYear()} AfriSphere AI. All rights reserved.
          </p>

          <p>
            Built in Zimbabwe. Designed for Africa.
          </p>

        </div>

      </div>
    </footer>
  );
}