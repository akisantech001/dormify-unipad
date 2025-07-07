
import { useState, useMemo } from "react";
import Header from "@/components/Header";
import PropertyCard from "@/components/PropertyCard";
import PropertyFilters from "@/components/PropertyFilters";
import { sampleProperties, Property } from "@/data/sampleProperties";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("All Universities");
  const [priceRange, setPriceRange] = useState([0, 250000]);
  const [propertyType, setPropertyType] = useState("All Types");
  const [bedrooms, setBedrooms] = useState("Any");
  const [amenities, setAmenities] = useState<string[]>([]);

  console.log("Sample properties loaded:", sampleProperties.length);
  console.log("Current filters:", { searchTerm, selectedUniversity, priceRange, propertyType, bedrooms, amenities });

  const filteredProperties = useMemo(() => {
    const filtered = sampleProperties.filter((property: Property) => {
      // Search term filter
      const matchesSearch = searchTerm === "" || 
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.amenities.some(amenity => amenity.toLowerCase().includes(searchTerm.toLowerCase()));

      // University filter
      const matchesUniversity = selectedUniversity === "All Universities" || 
        property.university === selectedUniversity;

      // Price filter
      const matchesPrice = property.price >= priceRange[0] && property.price <= priceRange[1];

      // Property type filter
      const matchesType = propertyType === "All Types" || property.type === propertyType;

      // Bedrooms filter
      const matchesBedrooms = bedrooms === "Any" || 
        (bedrooms === "4+" && property.bedrooms >= 4) ||
        property.bedrooms.toString() === bedrooms;

      // Amenities filter
      const matchesAmenities = amenities.length === 0 || 
        amenities.every(amenity => property.amenities.includes(amenity));

      return matchesSearch && matchesUniversity && matchesPrice && matchesType && matchesBedrooms && matchesAmenities;
    });
    
    console.log("Filtered properties:", filtered.length);
    return filtered;
  }, [searchTerm, selectedUniversity, priceRange, propertyType, bedrooms, amenities]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedUniversity={selectedUniversity}
        setSelectedUniversity={setSelectedUniversity}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
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

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Student Accommodations
              </h2>
              <p className="text-gray-600">
                {filteredProperties.length} properties found
                {selectedUniversity !== "All Universities" && (
                  <span> near {selectedUniversity}</span>
                )}
              </p>
            </div>

            {/* Property Grid */}
            {filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="bg-gray-100 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
                <p className="text-gray-500">Try adjusting your filters to see more results.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
