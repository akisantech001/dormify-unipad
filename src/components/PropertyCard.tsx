
import { MapPin, Users, Wifi, Car, Utensils, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
}

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const amenityIcons: { [key: string]: any } = {
    'WiFi': Wifi,
    'Parking': Car,
    'Kitchen': Utensils,
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white rounded-xl overflow-hidden border border-gray-200">
      <div className="relative">
        <img
          src={`https://images.unsplash.com/${property.image}?auto=format&fit=crop&w=400&q=80`}
          alt={property.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {property.verified && (
          <Badge className="absolute top-3 left-3 bg-green-500 text-white">
            Verified
          </Badge>
        )}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
          <div className="flex items-center space-x-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium">{property.rating}</span>
            <span className="text-xs text-gray-500">({property.reviews})</span>
          </div>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">
              {property.title}
            </h3>
            <div className="flex items-center text-sm text-gray-600 mt-1">
              <MapPin className="h-3 w-3 mr-1" />
              <span>{property.location}</span>
            </div>
            <div className="text-xs text-blue-600 font-medium mt-1">
              {property.distance} from {property.university}
            </div>
          </div>

          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              <span>{property.bedrooms} bed</span>
            </div>
            <div className="flex items-center">
              <span>{property.bathrooms} bath</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1">
            {property.amenities.slice(0, 3).map((amenity) => {
              const IconComponent = amenityIcons[amenity];
              return (
                <div key={amenity} className="flex items-center bg-gray-100 rounded-full px-2 py-1">
                  {IconComponent && <IconComponent className="h-3 w-3 mr-1 text-gray-600" />}
                  <span className="text-xs text-gray-700">{amenity}</span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-2 border-t">
            <div>
              <span className="text-2xl font-bold text-gray-900">${property.price}</span>
              <span className="text-sm text-gray-600">/month</span>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              View Details
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
