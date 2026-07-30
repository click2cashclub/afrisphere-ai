import Navbar from "@/components/Navbar";
import Destinations from "@/components/Destinations";
import Footer from "@/components/Footer";

export default function DestinationsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white">
      <Navbar />
      <div className="pt-24">
        <Destinations />
      </div>
      <Footer />
    </main>
  );
}