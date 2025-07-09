
import { Shield, Clock, Users, Star } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Verified Properties",
    description: "All properties are thoroughly verified for quality and safety standards."
  },
  {
    icon: Clock,
    title: "Quick Booking",
    description: "Book your ideal student accommodation in just a few clicks."
  },
  {
    icon: Users,
    title: "Student Community",
    description: "Connect with fellow students and build lasting friendships."
  },
  {
    icon: Star,
    title: "Top Rated",
    description: "Highly rated properties with excellent reviews from students."
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Dormify?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We make finding student accommodation simple, safe, and stress-free
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                <feature.icon className="h-8 w-8 text-blue-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
