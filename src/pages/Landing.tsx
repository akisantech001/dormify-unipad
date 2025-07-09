
import { useState } from "react";
import LandingHeader from "@/components/LandingHeader";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import CTASection from "@/components/CTASection";
import LandingFooter from "@/components/LandingFooter";

const Landing = () => {
  const [selectedUniversity, setSelectedUniversity] = useState("");

  return (
    <div className="min-h-screen bg-white">
      <LandingHeader 
        selectedUniversity={selectedUniversity}
        setSelectedUniversity={setSelectedUniversity}
      />

      <main>
        <HeroSection />
        <FeaturesSection />
        <CTASection />
      </main>

      <LandingFooter />
    </div>
  );
};

export default Landing;
