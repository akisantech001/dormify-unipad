
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer flex-shrink-0 group" onClick={handleLogoClick}>
            <img 
              src="/lovable-uploads/5c4aa35b-ca69-4dc1-b276-5b3e91f46e3a.png" 
              alt="Dormify" 
              className="h-[25px] w-auto group-hover:scale-105 transition-transform duration-200"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-12">
            <nav className="flex items-center space-x-8">
              <button 
                onClick={() => handleNavClick('/about')}
                className="text-gray-700 hover:text-black font-light text-lg transition-colors duration-200 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full"
              >
                About
              </button>
              <button 
                onClick={() => handleNavClick('/contact')}
                className="text-gray-700 hover:text-black font-light text-lg transition-colors duration-200 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full"
              >
                Contact
              </button>
            </nav>
            
            <div className="flex items-center space-x-4">
              <Button 
                onClick={handleExploreClick}
                variant="outline"
                className="border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2 rounded-full font-light transition-all duration-200 hover:scale-105"
              >
                Browse Properties
              </Button>
              <Button 
                onClick={handleAuthClick}
                className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-full font-light transition-all duration-200 hover:scale-105"
              >
                <User className="h-4 w-4 mr-2" />
                {user ? 'Dashboard' : 'Sign In'}
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden hover:bg-gray-100 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t bg-white/95 backdrop-blur-xl">
            <div className="px-4 py-8 space-y-6">
              <button 
                onClick={() => handleNavClick('/about')}
                className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-2xl font-light text-lg transition-all"
              >
                About Us
              </button>
              <button 
                onClick={() => handleNavClick('/contact')}
                className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-2xl font-light text-lg transition-all"
              >
                Contact Us
              </button>
              <Button 
                onClick={handleExploreClick}
                variant="outline"
                className="w-full border-gray-200 text-gray-700 hover:bg-gray-50 py-4 rounded-2xl font-light"
              >
                Browse Properties
              </Button>
              <Button 
                onClick={handleAuthClick}
                className="w-full bg-black hover:bg-gray-800 text-white py-4 rounded-2xl font-light"
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
