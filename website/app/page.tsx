import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import WhyAfriSphere from "@/components/WhyAfriSphere";
import MeetZuri from "@/components/MeetZuri";
import LaunchingZimbabwe from "@/components/LaunchingZimbabwe";
import Roadmap from "@/components/Roadmap";
import ForBusinesses from "@/components/ForBusinesses";
import Testimonials from "@/components/Testimonials";
import Waitlist from "@/components/Waitlist";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* Navigation */}
      <Navbar />

      {/* Main Landing Page */}
      <main>
        {/* 1. Vision */}
        <Hero />

        {/* 2. Problem */}
        <Problem />

        {/* 3. Solution */}
        <WhyAfriSphere />

        {/* 4. Product Demo */}
        <MeetZuri />

        {/* 5. Launch Market */}
        <LaunchingZimbabwe />

        {/* 6. Growth Strategy */}
        <Roadmap />

        {/* 7. Tourism Business Partners */}
        <ForBusinesses />

        {/* 8. Early Community / Social Proof */}
        <Testimonials />

        {/* 9. Conversion */}
        <Waitlist />
      </main>

      {/* 9. Footer */}
      <Footer />
    </>
  );
}