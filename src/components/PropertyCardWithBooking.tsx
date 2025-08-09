
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Bed, Bath, Star, Heart, Calendar } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useIsFavorited, useToggleFavorite } from '@/hooks/useFavorites';
import BookingModal from './BookingModal';
import { toast } from 'sonner';

interface Property {
  id: number | string;
  title: string;
  location: string;
  university: string;
  price: number;
  rating: number;
  reviews: number;
  bedrooms: number;
  bathrooms: number;
  distance: string;
  amenities: string[];
  image: string;
  verified: boolean;
  type: string;
}

interface PropertyCardProps {
  property: Property;
}

const PropertyCardWithBooking = ({ property }: PropertyCardProps) => {
  const { user } = useAuth();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  
  // Convert property.id to string to ensure consistency
  const propertyIdString = property.id.toString();
  
  const { data: isFavorited = false, refetch: refetchFavorites } = useIsFavorited(propertyIdString);
  const toggleFavoriteMutation = useToggleFavorite();

  const handleBookingClick = () => {
    if (!user) {
      toast.error('Please log in to make a booking');
      return;
    }
    if (user.role === 'landlord') {
      toast.error('Landlords cannot book properties');
      return;
    }
    setIsBookingModalOpen(true);
  };

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      toast.error('Please log in to save favorites');
      return;
    }
    
    console.log('Toggling favorite for property:', propertyIdString, 'Current state:', isFavorited);
    
    try {
      await toggleFavoriteMutation.mutateAsync({
        propertyId: propertyIdString,
        isFavorited,
      });
      // Refetch to ensure UI is updated
      refetchFavorites();
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const handleCardClick = () => {
    window.location.href = `/property/${propertyIdString}`;
  };

  return (
    <>
      <Card 
        className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col cursor-pointer" 
        onClick={handleCardClick}
      >
        <div className="relative">
          <img
            src={`/lovable-uploads/${property.image}.jpg`}
            alt={property.title}
            className="w-full h-48 object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder.svg';
            }}
          />
          <div className="absolute top-2 right-2 flex space-x-2">
            {property.verified && (
              <Badge className="bg-green-500 hover:bg-green-600">
                Verified
              </Badge>
            )}
            <Button
              size="sm"
              variant="outline"
              className="bg-white/80 hover:bg-white"
              onClick={handleFavoriteClick}
              disabled={toggleFavoriteMutation.isPending}
            >
              <Heart 
                className={`h-4 w-4 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
              />
            </Button>
          </div>
          <div className="absolute top-2 left-2">
            <Badge variant="secondary">{property.type}</Badge>
          </div>
        </div>
        
        <CardContent className="p-4 flex flex-col flex-1">
          <div className="space-y-2 flex-1 flex flex-col">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-lg line-clamp-1">{property.title}</h3>
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm">{property.rating}</span>
                <span className="text-sm text-gray-500">({property.reviews})</span>
              </div>
            </div>
            
            <div className="flex items-center text-gray-600 text-sm">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="line-clamp-1">{property.location}</span>
            </div>
            
            <div className="text-sm text-gray-600">
              <span className="font-medium">{property.university}</span>
              <span className="mx-1">•</span>
              <span>{property.distance}</span>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Bed className="h-4 w-4 mr-1" />
                <span>{property.bedrooms} bed</span>
              </div>
              <div className="flex items-center">
                <Bath className="h-4 w-4 mr-1" />
                <span>{property.bathrooms} bath</span>
              </div>
            </div>
            
            {property.amenities.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {property.amenities.slice(0, 3).map((amenity) => (
                  <Badge key={amenity} variant="outline" className="text-xs">
                    {amenity}
                  </Badge>
                ))}
                {property.amenities.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{property.amenities.length - 3} more
                  </Badge>
                )}
              </div>
            )}
            
            <div className="flex justify-between items-end pt-3 mt-auto">
              <div className="flex flex-col">
                <span className="text-2xl font-bold">₦{property.price.toLocaleString()}</span>
                <span className="text-gray-600 text-sm">/month</span>
              </div>
              <Button 
                onClick={handleBookingClick} 
                size="icon"
                className="bg-blue-600 hover:bg-blue-700 h-10 w-10 flex-shrink-0"
                title="Book Now"
              >
                <Calendar className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        property={property}
      />
    </>
  );
};

export default PropertyCardWithBooking;
