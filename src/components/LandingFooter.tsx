
import { Twitter, Youtube, Mail, Phone, ArrowUpRight } from "lucide-react";

const LandingFooter = () => {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="col-span-1 lg:col-span-2 space-y-8">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => window.location.href = '/'}>
              <img 
                src="/lovable-uploads/5c4aa35b-ca69-4dc1-b276-5b3e91f46e3a.png" 
                alt="Dormify" 
                className="h-8 w-auto"
              />
            </div>
            <p className="text-gray-400 font-light text-lg leading-relaxed max-w-md">
              Redefining student accommodation with premium properties, verified quality, and exceptional experiences across Nigeria's top universities.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://twitter.com/dormify" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl text-gray-400 hover:text-white transition-all duration-200 group"
              >
                <Twitter className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href="https://youtube.com/dormify" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl text-gray-400 hover:text-white transition-all duration-200 group"
              >
                <Youtube className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-light text-white">Explore</h3>
            <ul className="space-y-4">
              {[
                { name: 'About Us', href: '/about' },
                { name: 'Contact', href: '/contact' },
                { name: 'Properties', href: '/properties' },
                { name: 'Legal', href: '/legal' }
              ].map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-gray-400 hover:text-white font-light transition-colors duration-200 flex items-center group"
                  >
                    {link.name}
                    <ArrowUpRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-light text-white">Get in Touch</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 group">
                <div className="p-2 bg-white/5 rounded-xl group-hover:bg-white/10 transition-colors">
                  <Mail className="h-4 w-4 text-gray-400" />
                </div>
                <div>
                  <p className="text-gray-400 font-light">Email</p>
                  <p className="text-white font-light">hello@dormify.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 group">
                <div className="p-2 bg-white/5 rounded-xl group-hover:bg-white/10 transition-colors">
                  <Phone className="h-4 w-4 text-gray-400" />
                </div>
                <div>
                  <p className="text-gray-400 font-light">Phone</p>
                  <p className="text-white font-light">+234 (0) 123 456 7890</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 mt-16 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-gray-400 font-light">
            © 2024 Dormify. All rights reserved.
          </p>
          <p className="text-gray-500 font-light text-sm">
            Crafted with care for students everywhere
          </p>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
