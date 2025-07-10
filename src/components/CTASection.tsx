
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-32 bg-gradient-to-b from-gray-900 to-black text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="space-y-12">
          {/* Main Headline */}
          <div className="space-y-6">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight leading-none">
              Ready to find your
            </h2>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent leading-none">
              perfect home?
            </h2>
            <p className="text-xl sm:text-2xl text-gray-300 font-light max-w-3xl mx-auto leading-relaxed mt-8">
              Join thousands of students who've discovered their ideal living space through Dormify's curated collection.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
            <Button 
              onClick={() => navigate('/properties')}
              size="lg"
              className="bg-white text-black hover:bg-gray-100 px-12 py-6 text-lg rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
            >
              Start Your Search
              <ArrowRight className="h-5 w-5 ml-3 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              onClick={() => navigate('/auth')}
              variant="outline"
              size="lg"
              className="border-2 border-white/20 text-white hover:bg-white/10 hover:border-white/30 px-12 py-6 text-lg rounded-full font-medium transition-all duration-300 hover:scale-105 backdrop-blur-sm"
            >
              Sign Up Free
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="pt-16 border-t border-white/10">
            <p className="text-gray-400 font-light mb-8">Trusted by students at</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {["University of Lagos", "University of Ibadan", "Covenant University", "UNILAG"].map((uni, index) => (
                <div key={index} className="text-sm font-light text-gray-300 hover:text-white transition-colors cursor-default">
                  {uni}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
