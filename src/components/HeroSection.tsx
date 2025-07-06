
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate('/properties');
  };

  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
        Find Your Perfect
        <span className="block text-blue-600">Student Home</span>
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Discover verified student accommodations near top universities
      </p>
      <Button onClick={handleExploreClick} size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
        Start Exploring
      </Button>
    </div>
  );
};

export default HeroSection;
