
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const HeroSection = () => {
  const navigate = useNavigate();
  const [searchLocation, setSearchLocation] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/properties');
  };

  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-50 to-white flex flex-col">
      {/* Hero Content */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        <div className="max-w-6xl mx-auto text-center space-y-12">
          {/* Main Headlines */}
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tight text-gray-900 leading-none">
              Your perfect
            </h1>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-none">
              student home
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 font-light max-w-2xl mx-auto leading-relaxed mt-8">
              Discover premium student accommodations near top universities. Verified, safe, and thoughtfully designed.
            </p>
          </div>

          {/* Search Section */}
          <div className="max-w-2xl mx-auto animate-scale-in">
            <form onSubmit={handleSearchSubmit} className="space-y-6">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <Input
                  type="text"
                  placeholder="Enter your university or location"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="pl-14 pr-6 py-6 text-lg bg-white/70 backdrop-blur-sm border-0 rounded-2xl shadow-lg hover:shadow-xl focus:shadow-xl transition-all duration-300 focus:bg-white/90 placeholder:text-gray-400"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  type="submit"
                  size="lg" 
                  className="bg-black hover:bg-gray-800 text-white px-12 py-6 text-lg rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <Search className="h-5 w-5 mr-3" />
                  Find Properties
                </Button>
                <Button 
                  type="button"
                  variant="outline"
                  size="lg" 
                  onClick={() => navigate('/properties')}
                  className="border-2 border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50 px-12 py-6 text-lg rounded-full font-medium transition-all duration-300 hover:scale-105"
                >
                  Browse All
                </Button>
              </div>
            </form>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto pt-16">
            {[
              { number: "500+", label: "Properties" },
              { number: "50+", label: "Universities" },
              { number: "10K+", label: "Students" },
              { number: "100%", label: "Verified" }
            ].map((stat, index) => (
              <div key={index} className="space-y-2 group cursor-default">
                <div className="text-4xl lg:text-5xl font-light text-gray-900 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-light text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button 
          onClick={scrollToFeatures}
          className="p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        >
          <ChevronDown className="h-6 w-6 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
