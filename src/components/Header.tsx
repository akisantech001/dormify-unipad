
import { Search, MapPin, GraduationCap, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedUniversity: string;
  setSelectedUniversity: (university: string) => void;
}

const universities = [
  "All Universities",
  "Harvard University",
  "MIT",
  "Stanford University",
  "UC Berkeley",
  "NYU",
  "Columbia University",
  "University of Chicago",
  "UCLA"
];

const Header = ({ searchTerm, setSearchTerm, selectedUniversity, setSelectedUniversity }: HeaderProps) => {
  const navigate = useNavigate();

  const handleAuthClick = () => {
    navigate('/auth');
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Login/Signup */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Dormify</h1>
            </div>
            <Button variant="outline" className="flex items-center space-x-2" onClick={handleAuthClick}>
              <User className="h-4 w-4" />
              <span>Login / Sign Up</span>
            </Button>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search by location, property type, or amenities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* University Filter */}
          <div className="flex items-center space-x-4">
            <Select value={selectedUniversity} onValueChange={setSelectedUniversity}>
              <SelectTrigger className="w-48">
                <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                <SelectValue placeholder="Select University" />
              </SelectTrigger>
              <SelectContent className="bg-white border shadow-lg">
                {universities.map((university) => (
                  <SelectItem key={university} value={university}>
                    {university}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
