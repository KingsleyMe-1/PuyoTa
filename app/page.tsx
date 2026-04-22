import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import DistrictsSection from "./components/DistrictsSection";
import PhilosophySection from "./components/PhilosophySection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <Navbar />
      <main className="flex flex-col flex-1">
        <HeroSection />
        <DistrictsSection />
        <PhilosophySection />
      </main>
      <Footer />
    </div>
  );
}

