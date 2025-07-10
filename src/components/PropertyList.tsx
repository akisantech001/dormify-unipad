
import PropertyCard from './PropertyCard';
import { sampleProperties } from '@/data/sampleProperties';

interface PropertyListProps {
  filters?: {
    university?: string;
    priceRange?: [number, number];
    propertyType?: string;
    bedrooms?: number;
  };
}

const PropertyList = ({ filters }: PropertyListProps) => {
  // Filter properties based on the provided filters
  const filteredProperties = sampleProperties.filter(property => {
    if (filters?.university && filters.university !== "All Universities" && property.university !== filters.university) {
      return false;
    }
    
    if (filters?.priceRange) {
      const [min, max] = filters.priceRange;
      if (property.price < min || property.price > max) {
        return false;
      }
    }
    
    if (filters?.propertyType && filters.propertyType !== "All Types" && property.type !== filters.propertyType) {
      return false;
    }
    
    if (filters?.bedrooms && property.bedrooms !== filters.bedrooms) {
      return false;
    }
    
    return true;
  });

  if (filteredProperties.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">🏠</div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">No properties found</h3>
        <p className="text-gray-600">Try adjusting your filters to see more results.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredProperties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
};

export default PropertyList;
