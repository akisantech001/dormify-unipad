import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, MapPin, Bed, Bath, Star, Heart, Calendar } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useIsFavorited, useToggleFavorite } from '@/hooks/useFavorites';
import { useProperties } from '@/hooks/useProperties';
import BookingModal from '@/components/BookingModal';
import PropertyCardWithBooking from '@/components/PropertyCardWithBooking';
import { toast } from 'sonner';

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  
  const { data: property, isLoading } = useQuery({
    queryKey: ['property', id],
    queryFn: async () => {
      if (!id) throw new Error('Property ID is required');
      
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  const { data: similarProperties } = useProperties({
    university: property?.university,
  });

  const { data: isFavorited = false, refetch: refetchFavorites } = useIsFavorited(id || '');
  const toggleFavoriteMutation = useToggleFavorite();

  const handleFavoriteClick = async () => {
    if (!user) {
      toast.error('Please log in to save favorites');
      return;
    }
    
    if (!id) return;
    
    try {
      await toggleFavoriteMutation.mutateAsync({
        propertyId: id,
        isFavorited,
      });
      refetchFavorites();
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="bg-gray-200 h-96 rounded-lg mb-6"></div>
            <div className="space-y-4">
              <div className="bg-gray-200 h-8 rounded w-1/2"></div>
              <div className="bg-gray-200 h-4 rounded w-1/4"></div>
              <div className="bg-gray-200 h-20 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-6xl mx-auto text-center py-20">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Property not found</h1>
          <Button onClick={() => navigate('/properties')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Properties
          </Button>
        </div>
      </div>
    );
  }

  const filteredSimilarProperties = similarProperties?.filter(p => p.id !== property.id).slice(0, 4) || [];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-6xl mx-auto p-4">
          {/* Back Button */}
          <Button 
            variant="outline" 
            onClick={() => navigate('/properties')}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Properties
          </Button>

          {/* Property Images */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
            <div className="lg:col-span-2">
              <img
                src={`/lovable-uploads/${property.images[0] || 'photo-1721322800607-8c38375eef04'}.jpg`}
                alt={property.title}
                className="w-full h-96 lg:h-[500px] object-cover rounded-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder.svg';
                }}
              />
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
              {property.images.slice(1, 5).map((image, index) => (
                <img
                  key={index}
                  src={`/lovable-uploads/${image}.jpg`}
                  alt={`${property.title} - Image ${index + 2}`}
                  className="w-full h-24 lg:h-[118px] object-cover rounded-lg"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder.svg';
                  }}
                />
              ))}
            </div>
          </div>

          {/* Property Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{property.location}</span>
                  </div>
                  <div className="flex items-center space-x-4 text-gray-600">
                    <div className="flex items-center">
                      <Bed className="h-5 w-5 mr-1" />
                      <span>{property.bedrooms} beds</span>
                    </div>
                    <div className="flex items-center">
                      <Bath className="h-5 w-5 mr-1" />
                      <span>{property.bathrooms} baths</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {property.is_verified && (
                    <Badge className="bg-green-500 hover:bg-green-600">
                      Verified
                    </Badge>
                  )}
                  <Badge variant="secondary">{property.property_type}</Badge>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3">Description</h2>
                <p className="text-gray-700 leading-relaxed">
                  {property.description || 'No description available for this property.'}
                </p>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3">University</h2>
                <p className="text-gray-700">{property.university}</p>
                {property.distance_to_university && (
                  <p className="text-sm text-gray-600">Distance: {property.distance_to_university}</p>
                )}
              </div>

              {property.amenities && property.amenities.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-3">Amenities</h2>
                  <div className="flex flex-wrap gap-2">
                    {property.amenities.map((amenity) => (
                      <Badge key={amenity} variant="outline">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Booking Card */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <span className="text-3xl font-bold">₦{property.price.toLocaleString()}</span>
                    <span className="text-gray-600">/month</span>
                  </div>

                  <div className="space-y-4">
                    <Button 
                      onClick={handleBookingClick}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      size="lg"
                    >
                      <Calendar className="h-5 w-5 mr-2" />
                      Book Now
                    </Button>

                    <Button
                      variant="outline"
                      onClick={handleFavoriteClick}
                      className="w-full"
                      disabled={toggleFavoriteMutation.isPending}
                    >
                      <Heart 
                        className={`h-5 w-5 mr-2 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
                      />
                      {isFavorited ? 'Remove from Favorites' : 'Add to Favorites'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Similar Properties */}
          {filteredSimilarProperties.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Similar Properties</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredSimilarProperties.map((similarProperty) => (
                  <PropertyCardWithBooking
                    key={similarProperty.id}
                    property={{
                      id: similarProperty.id,
                      title: similarProperty.title,
                      location: similarProperty.location,
                      university: similarProperty.university,
                      price: similarProperty.price,
                      rating: 4.5,
                      reviews: 0,
                      bedrooms: similarProperty.bedrooms,
                      bathrooms: similarProperty.bathrooms,
                      distance: similarProperty.distance_to_university || '0.5 miles',
                      amenities: similarProperty.amenities || [],
                      image: similarProperty.images && similarProperty.images[0] ? similarProperty.images[0] : 'photo-1721322800607-8c38375eef04',
                      verified: similarProperty.is_verified,
                      type: similarProperty.property_type,
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        property={{
          id: property.id,
          title: property.title,
          location: property.location,
          price: property.price,
        }}
      />
    </>
  );
};

export default PropertyDetail;