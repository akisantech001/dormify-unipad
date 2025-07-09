
import { useState } from "react";
import Header from "@/components/Header";

const About = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("All Universities");

  return (
    <div className="min-h-screen bg-white">
      <Header 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedUniversity={selectedUniversity}
        setSelectedUniversity={setSelectedUniversity}
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">About Dormify</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-6">
            Dormify is Nigeria's premier platform connecting students with verified, 
            quality accommodation near universities across the country.
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-6">
            We simplify the process of finding safe, affordable, and convenient student 
            housing by providing a trusted marketplace where students can discover their 
            perfect home away from home.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Why Choose Dormify?</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Verified properties and landlords</li>
            <li>University-specific accommodation options</li>
            <li>Transparent pricing and reviews</li>
            <li>Secure booking process</li>
            <li>24/7 customer support</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Contact Information</h2>
          <p className="text-gray-600">
            Have questions? Reach out to us at support@dormify.com or visit our Contact page.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
