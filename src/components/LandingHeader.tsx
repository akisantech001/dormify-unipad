
import { MapPin, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

const universities = [
  "University of Lagos",
  "University of Ibadan",
  "Ahmadu Bello University",
  "University of Nigeria, Nsukka",
  "Obafemi Awolowo University",
  "Lagos State University",
  "Covenant University",
  "University of Abuja",
  "Federal University of Technology, Akure",
  "University of Benin",
  "Babcock University",
  "Afe Babalola University"
];

interface LandingHeaderProps {
  selectedUniversity: string;
  setSelectedUniversity: (university: string) => void;
}

const LandingHeader = ({ selectedUniversity, setSelectedUniversity }: LandingHeaderProps) => {
  const navigate = useNavigate();

  const handleAuthClick = () => {
    navigate('/auth');
  };

  const handleExploreClick = () => {
    navigate('/properties');
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer flex-shrink-0" onClick={handleLogoClick}>
            <img 
              src="/lovable-uploads/5c4aa35b-ca69-4dc1-b276-5b3e91f46e3a.png" 
              alt="Dormify" 
              className="h-16 w-auto"
            />
          </div>

          {/* Explore Button and University Dropdown - Hidden on mobile */}
          <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
            <div className="flex items-center space-x-2 w-full">
              <Button 
                onClick={handleExploreClick}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 xl:px-6 py-2 text-sm xl:text-base"
              >
                Explore Accommodations
              </Button>
              <Select value={selectedUniversity} onValueChange={setSelectedUniversity}>
                <SelectTrigger className="w-40 xl:w-48">
                  <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                  <SelectValue placeholder="Select University" />
                </SelectTrigger>
                <SelectContent className="bg-white border shadow-lg z-50">
                  {universities.map((university) => (
                    <SelectItem key={university} value={university}>
                      {university}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            <Button 
              variant="outline" 
              className="hidden sm:flex items-center space-x-2 text-xs sm:text-sm px-2 sm:px-4" 
              onClick={handleAuthClick}
            >
              <User className="h-4 w-4" />
              <span className="hidden md:inline">Login / Sign Up</span>
              <span className="md:hidden">Login</span>
            </Button>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu - Show explore button and university selector on mobile */}
        <div className="lg:hidden pb-4">
          <div className="flex flex-col space-y-2">
            <Button 
              onClick={handleExploreClick}
              className="bg-blue-600 hover:bg-blue-700 text-white w-full"
            >
              Explore Accommodations
            </Button>
            <Select value={selectedUniversity} onValueChange={setSelectedUniversity}>
              <SelectTrigger className="w-full">
                <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                <SelectValue placeholder="Select University" />
              </SelectTrigger>
              <SelectContent className="bg-white border shadow-lg z-50">
                {universities.map((university) => (
                  <SelectItem key={university} value={university}>
                    {university}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button 
              variant="outline" 
              className="sm:hidden flex items-center justify-center space-x-2 w-full" 
              onClick={handleAuthClick}
            >
              <User className="h-4 w-4" />
              <span>Login / Sign Up</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default LandingHeader;
