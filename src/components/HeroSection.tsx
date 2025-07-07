
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate('/properties');
  };

  return (
    <div className="text-center mb-8 lg:mb-12 px-4">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 lg:mb-6 leading-tight">
        Find Your Perfect
        <span className="block text-blue-600 mt-2">Student Home</span>
      </h1>
      <p className="text-lg sm:text-xl text-gray-600 mb-6 lg:mb-8 max-w-2xl mx-auto px-4">
        Discover verified student accommodations near top universities
      </p>
      <Button 
        onClick={handleExploreClick} 
        size="lg" 
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 text-base sm:text-lg w-full sm:w-auto"
      >
        Start Exploring
      </Button>
    </div>
  );
};

export default HeroSection;
