
import { Twitter, Youtube } from "lucide-react";

const LandingFooter = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <img 
            src="/lovable-uploads/5c4aa35b-ca69-4dc1-b276-5b3e91f46e3a.png" 
            alt="Dormify" 
            className="h-8 w-auto"
          />
        </div>
        <p className="text-gray-400 mb-6">
          Making student accommodation search simple and reliable
        </p>
        
        {/* Social Media Icons */}
        <div className="flex items-center justify-center space-x-6">
          <a 
            href="https://twitter.com/dormify" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Twitter className="h-6 w-6" />
          </a>
          <a 
            href="https://youtube.com/dormify" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Youtube className="h-6 w-6" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
