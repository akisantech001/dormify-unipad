
import { MapPin, Users, Wifi, Car, Utensils, Star, Heart, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Property } from "@/data/sampleProperties";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const amenityIcons: { [key: string]: any } = {
    'WiFi': Wifi,
    'Parking': Car,
    'Kitchen': Utensils,
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white rounded-2xl overflow-hidden border-0 shadow-lg">
      <div className="relative">
        <Carousel className="w-full">
          <CarouselContent>
            {property.images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={`https://images.unsplash.com/${image}?auto=format&fit=crop&w=600&q=80`}
                    alt={`${property.title} - Image ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-0 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300" />
          <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-0 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300" />
        </Carousel>
        
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {property.verified && (
            <Badge className="bg-green-500/90 hover:bg-green-600 text-white border-0 backdrop-blur-sm">
              Verified
            </Badge>
          )}
          <Badge variant="secondary" className="bg-white/90 text-gray-800 border-0 backdrop-blur-sm">
            {property.type}
          </Badge>
        </div>
        
        <div className="absolute top-4 right-4">
          <Button
            size="sm"
            variant="outline"
            className="bg-white/90 hover:bg-white border-0 shadow-lg backdrop-blur-sm"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>

        <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold">{property.rating}</span>
            <span className="text-xs text-gray-600">({property.reviews})</span>
          </div>
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="font-bold text-xl text-gray-900 line-clamp-1 mb-2">
              {property.title}
            </h3>
            <div className="flex items-center text-gray-600 text-sm mb-1">
              <MapPin className="h-4 w-4 mr-2 text-blue-500" />
              <span>{property.location}</span>
            </div>
            <div className="text-sm text-blue-600 font-medium">
              {property.distance} from {property.university}
            </div>
          </div>

          <p className="text-gray-600 text-sm line-clamp-2">
            {property.description}
          </p>

          <div className="flex items-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2 text-gray-400" />
              <span>{property.bedrooms} bed</span>
            </div>
            <div className="flex items-center">
              <span>{property.bathrooms} bath</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {property.amenities.slice(0, 4).map((amenity) => {
              const IconComponent = amenityIcons[amenity];
              return (
                <div key={amenity} className="flex items-center bg-gray-50 rounded-full px-3 py-1 hover:bg-gray-100 transition-colors">
                  {IconComponent && <IconComponent className="h-3 w-3 mr-2 text-gray-600" />}
                  <span className="text-xs text-gray-700 font-medium">{amenity}</span>
                </div>
              );
            })}
            {property.amenities.length > 4 && (
              <div className="flex items-center bg-blue-50 rounded-full px-3 py-1">
                <span className="text-xs text-blue-700 font-medium">+{property.amenities.length - 4} more</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div>
              <span className="text-3xl font-bold text-gray-900">{formatPrice(property.price)}</span>
              <span className="text-gray-600 text-sm ml-1">/month</span>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
              <Calendar className="h-4 w-4 mr-2" />
              Book Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
