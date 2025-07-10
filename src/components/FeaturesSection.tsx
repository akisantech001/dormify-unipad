
import { Shield, Clock, Users, Star, ArrowRight } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Verified Excellence",
    description: "Every property meets our rigorous standards for quality, safety, and student satisfaction.",
  },
  {
    icon: Clock,
    title: "Instant Booking",
    description: "Secure your ideal accommodation with our streamlined booking process in minutes.",
  },
  {
    icon: Users,
    title: "Vibrant Community",
    description: "Join a network of students and create lasting connections in premium living spaces.",
  },
  {
    icon: Star,
    title: "Premium Experience",
    description: "Curated properties with exceptional amenities and dedicated support throughout your stay.",
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-24 space-y-6">
          <h2 className="text-5xl lg:text-6xl font-light text-gray-900 tracking-tight">
            Why choose
          </h2>
          <h2 className="text-5xl lg:text-6xl font-light bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
            Dormify?
          </h2>
          <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto leading-relaxed mt-8">
            We've reimagined student housing with attention to every detail that matters to you.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group cursor-default space-y-8 p-8 rounded-3xl hover:bg-gray-50/50 transition-all duration-500"
            >
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="h-10 w-10 text-blue-600" />
              </div>
              
              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-2xl lg:text-3xl font-light text-gray-900 leading-tight">
                  {feature.title}
                </h3>
                <p className="text-lg text-gray-600 font-light leading-relaxed">
                  {feature.description}
                </p>
                
                {/* Subtle Arrow */}
                <div className="flex items-center text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-sm font-medium mr-2">Learn more</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
