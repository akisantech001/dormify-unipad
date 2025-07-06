
import { useState } from "react";
import LandingHeader from "@/components/LandingHeader";
import HeroSection from "@/components/HeroSection";
import VerifiedListings from "@/components/VerifiedListings";
import SearchSection from "@/components/SearchSection";
import LandingFooter from "@/components/LandingFooter";

const Landing = () => {
  const [selectedUniversity, setSelectedUniversity] = useState("");

  return (
    <div className="min-h-screen bg-white">
      <LandingHeader 
        selectedUniversity={selectedUniversity}
        setSelectedUniversity={setSelectedUniversity}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <HeroSection />
        <VerifiedListings />
        <SearchSection />
      </main>

      <LandingFooter />
    </div>
  );
};

export default Landing;
