
import { MapPin, Menu, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

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
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleAuthClick = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/auth');
    }
  };

  const handleExploreClick = () => {
    navigate('/properties');
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleNavClick = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer flex-shrink-0" onClick={handleLogoClick}>
            <img 
              src="/lovable-uploads/5c4aa35b-ca69-4dc1-b276-5b3e91f46e3a.png" 
              alt="Dormify" 
              className="h-16 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <button 
              onClick={() => handleNavClick('/about')}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              About
            </button>
            <button 
              onClick={() => handleNavClick('/contact')}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Contact
            </button>
            <Button 
              onClick={handleExploreClick}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
            >
              Browse Properties
            </Button>
            <Button 
              variant="outline" 
              onClick={handleAuthClick}
              className="border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2"
            >
              <User className="h-4 w-4 mr-2" />
              {user ? 'Dashboard' : 'Sign In'}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t bg-white/95 backdrop-blur-sm">
            <div className="px-4 py-6 space-y-4">
              <button 
                onClick={() => handleNavClick('/about')}
                className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium"
              >
                About Us
              </button>
              <button 
                onClick={() => handleNavClick('/contact')}
                className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium"
              >
                Contact Us
              </button>
              <Button 
                onClick={handleExploreClick}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
              >
                Browse Properties
              </Button>
              <Button 
                variant="outline" 
                onClick={handleAuthClick}
                className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 py-3"
              >
                <User className="h-4 w-4 mr-2" />
                {user ? 'Dashboard' : 'Sign In'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default LandingHeader;
