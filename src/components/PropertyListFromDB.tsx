
import { useProperties } from '@/hooks/useProperties';
import PropertyCard from './PropertyCard';
import { useState } from 'react';

interface PropertyListFromDBProps {
  filters?: {
    university?: string;
    priceRange?: [number, number];
    propertyType?: string;
    bedrooms?: number;
  };
}

const PropertyListFromDB = ({ filters }: PropertyListFromDBProps) => {
  const { data: properties, isLoading, error } = useProperties(filters);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
            <div className="space-y-2">
              <div className="bg-gray-200 h-4 rounded w-3/4"></div>
              <div className="bg-gray-200 h-4 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Failed to load properties. Please try again.</p>
      </div>
    );
  }

  if (!properties || properties.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No properties found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          property={{
            id: parseInt(property.id),
            title: property.title,
            location: property.location,
            university: property.university,
            price: property.price,
            rating: 4.5, // We'll calculate this from reviews later
            reviews: 0, // We'll count this from reviews later
            bedrooms: property.bedrooms,
            bathrooms: property.bathrooms,
            distance: property.distance_to_university || '0.5 miles',
            amenities: property.amenities,
            image: property.images[0] || 'photo-1721322800607-8c38375eef04',
            verified: property.is_verified,
            type: property.property_type,
          }}
        />
      ))}
    </div>
  );
};

export default PropertyListFromDB;
