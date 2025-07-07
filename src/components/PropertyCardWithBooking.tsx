
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Bed, Bath, Star, Heart, Calendar } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import BookingModal from './BookingModal';
import { toast } from 'sonner';

interface Property {
  id: number;
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
  const [isFavorited, setIsFavorited] = useState(false);

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

  const handleFavoriteClick = () => {
    if (!user) {
      toast.error('Please log in to save favorites');
      return;
    }
    setIsFavorited(!isFavorited);
    toast.success(isFavorited ? 'Removed from favorites' : 'Added to favorites');
  };

  return (
    <>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
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
            >
              <Heart className={`h-4 w-4 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
          </div>
          <div className="absolute top-2 left-2">
            <Badge variant="secondary">{property.type}</Badge>
          </div>
        </div>
        
        <CardContent className="p-4">
          <div className="space-y-2">
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
            
            <div className="flex justify-between items-center pt-2">
              <div>
                <span className="text-2xl font-bold">₦{property.price.toLocaleString()}</span>
                <span className="text-gray-600 text-sm">/month</span>
              </div>
              <Button onClick={handleBookingClick} className="bg-blue-600 hover:bg-blue-700">
                <Calendar className="h-4 w-4 mr-2" />
                Book Now
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
