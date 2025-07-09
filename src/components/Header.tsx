
import { Search, MapPin, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedUniversity: string;
  setSelectedUniversity: (university: string) => void;
}

const universities = [
  "All Universities",
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

const Header = ({ searchTerm, setSearchTerm, selectedUniversity, setSelectedUniversity }: HeaderProps) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleAuthClick = () => {
    navigate('/auth');
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleNavClick = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24 lg:h-20">
          {/* Logo and Login/Signup */}
          <div className="flex items-center space-x-2 lg:space-x-4 flex-shrink-0">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={handleLogoClick}>
              <img 
                src="/lovable-uploads/5c4aa35b-ca69-4dc1-b276-5b3e91f46e3a.png" 
                alt="Dormify" 
                className="h-20 w-auto"
              />
            </div>
            <Button 
              variant="outline" 
              className="hidden sm:flex items-center space-x-2 text-xs lg:text-sm px-2 lg:px-4" 
              onClick={handleAuthClick}
            >
              <User className="h-4 w-4" />
              <span className="hidden md:inline">Login / Sign Up</span>
              <span className="md:hidden">Login</span>
            </Button>
          </div>

          {/* Search Bar - Hidden on small screens */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-4 lg:mx-8">
            <div className="relative w-full">
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

          {/* University Filter and Burger Menu */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            <div className="hidden lg:flex">
              <Select value={selectedUniversity} onValueChange={setSelectedUniversity}>
                <SelectTrigger className="w-40 xl:w-48">
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
            
            {/* Burger Menu - Now visible on all screen sizes */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search and Filters */}
        <div className="md:hidden lg:hidden pb-4">
          <div className="space-y-3">
            {/* Mobile Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            {/* Mobile University Filter */}
            <Select value={selectedUniversity} onValueChange={setSelectedUniversity}>
              <SelectTrigger className="w-full">
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

            {/* Mobile Login Button */}
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

        {/* Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="absolute left-0 right-0 top-full bg-white border-b shadow-lg z-40">
            <div className="px-4 py-4 space-y-3">
              <button 
                onClick={() => handleNavClick('/about')}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                About Us
              </button>
              <button 
                onClick={() => handleNavClick('/contact')}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Contact Us
              </button>
              <button 
                onClick={() => handleNavClick('/legal')}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Legal
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
