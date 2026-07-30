import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white">
      <Navbar />
      <section className="mx-auto max-w-xl px-6 pt-32 pb-24 text-center">
        <h1 className="text-4xl font-bold">Get in Touch</h1>
        <p className="mt-4 text-gray-400">
          Questions, partnerships, or feedback — we'd love to hear from you.
        </p>
      </section>
      <Footer />
    </main>
  );
}