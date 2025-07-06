
import { MapPin, Menu, User, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

const universities = [
  "Harvard University",
  "MIT",
  "Stanford University",
  "UC Berkeley",
  "NYU",
  "Columbia University",
  "University of Chicago",
  "UCLA"
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
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={handleLogoClick}>
            <div className="bg-blue-600 p-2 rounded-lg">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">Dormify</h1>
          </div>

          {/* Explore Button and University Dropdown */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="flex items-center space-x-2">
              <Button 
                onClick={handleExploreClick}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
              >
                Explore Accommodations
              </Button>
              <Select value={selectedUniversity} onValueChange={setSelectedUniversity}>
                <SelectTrigger className="w-48">
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
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="flex items-center space-x-2" onClick={handleAuthClick}>
              <User className="h-4 w-4" />
              <span>Login / Sign Up</span>
            </Button>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default LandingHeader;
