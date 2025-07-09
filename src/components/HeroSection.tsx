
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const HeroSection = () => {
  const navigate = useNavigate();
  const [searchLocation, setSearchLocation] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/properties');
  };

  return (
    <div className="relative bg-gradient-to-br from-blue-50 to-white">
      {/* Hero Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Find Your Perfect
            <span className="block text-blue-600 mt-2">Student Home</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover verified student accommodations near top universities. 
            Safe, affordable, and convenient housing solutions for students.
          </p>
        </div>

        {/* Search Section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 border border-gray-100">
            <form onSubmit={handleSearchSubmit} className="space-y-6">
              {/* Search Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type="text"
                  placeholder="Enter your university or preferred location..."
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="pl-12 pr-4 py-4 text-lg border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  type="submit"
                  size="lg" 
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-xl"
                >
                  <Search className="h-5 w-5 mr-2" />
                  Search Properties
                </Button>
                <Button 
                  type="button"
                  variant="outline"
                  size="lg" 
                  onClick={() => navigate('/properties')}
                  className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg rounded-xl"
                >
                  Browse All
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-16 lg:mt-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Properties</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-gray-600">Universities</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">10K+</div>
              <div className="text-gray-600">Happy Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">100%</div>
              <div className="text-gray-600">Verified</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
