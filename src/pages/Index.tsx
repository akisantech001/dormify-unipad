
import { useState } from "react";
import Header from "@/components/Header";
import PropertyFilters from "@/components/PropertyFilters";
import PropertyList from "@/components/PropertyList";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // State for header search and university
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("All Universities");
  
  // State for property filters
  const [priceRange, setPriceRange] = useState<number[]>([0, 700000]);
  const [propertyType, setPropertyType] = useState("All Types");
  const [bedrooms, setBedrooms] = useState("Any");
  const [amenities, setAmenities] = useState<string[]>([]);

  // Convert filters to the format expected by PropertyList
  const filters = {
    university: selectedUniversity !== "All Universities" ? selectedUniversity : undefined,
    priceRange: priceRange as [number, number],
    propertyType: propertyType !== "All Types" ? propertyType : undefined,
    bedrooms: bedrooms !== "Any" ? parseInt(bedrooms) : undefined,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedUniversity={selectedUniversity}
        setSelectedUniversity={setSelectedUniversity}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Student Accommodations</h1>
            <p className="text-gray-600 text-lg">Discover your perfect place to stay</p>
          </div>
          
          {user && (
            <Button 
              onClick={() => navigate('/dashboard')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Go to Dashboard
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <PropertyFilters 
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                propertyType={propertyType}
                setPropertyType={setPropertyType}
                bedrooms={bedrooms}
                setBedrooms={setBedrooms}
                amenities={amenities}
                setAmenities={setAmenities}
              />
            </div>
          </div>
          
          <div className="lg:col-span-3">
            <PropertyList filters={filters} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
