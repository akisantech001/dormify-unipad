
import { useState } from "react";
import Header from "@/components/Header";
import PropertyFilters from "@/components/PropertyFilters";
import PropertyListFromDB from "@/components/PropertyListFromDB";
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
  const [priceRange, setPriceRange] = useState<number[]>([0, 250000]);
  const [propertyType, setPropertyType] = useState("All Types");
  const [bedrooms, setBedrooms] = useState("Any");
  const [amenities, setAmenities] = useState<string[]>([]);

  // Convert filters to the format expected by PropertyListFromDB
  const filters = {
    university: selectedUniversity !== "All Universities" ? selectedUniversity : undefined,
    priceRange: priceRange as [number, number],
    propertyType: propertyType !== "All Types" ? propertyType : undefined,
    bedrooms: bedrooms !== "Any" ? parseInt(bedrooms) : undefined,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedUniversity={selectedUniversity}
        setSelectedUniversity={setSelectedUniversity}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Student Accommodations</h1>
            <p className="text-gray-600 mt-2">Find your perfect place to stay</p>
          </div>
          
          {user && (
            <Button onClick={() => navigate('/dashboard')}>
              Go to Dashboard
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
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
          
          <div className="lg:col-span-3">
            <PropertyListFromDB filters={filters} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
