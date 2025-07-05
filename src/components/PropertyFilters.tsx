
import { SlidersHorizontal, DollarSign, Home, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PropertyFiltersProps {
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
  propertyType: string;
  setPropertyType: (type: string) => void;
  bedrooms: string;
  setBedrooms: (bedrooms: string) => void;
  amenities: string[];
  setAmenities: (amenities: string[]) => void;
}

const propertyTypes = [
  "All Types",
  "Apartment",
  "House",
  "Studio",
  "Shared Room",
  "Dorm"
];

const bedroomOptions = [
  "Any",
  "1",
  "2",
  "3",
  "4+"
];

const availableAmenities = [
  "WiFi",
  "Parking",
  "Kitchen",
  "Laundry",
  "Gym",
  "Pool",
  "Security",
  "Furnished"
];

const PropertyFilters = ({
  priceRange,
  setPriceRange,
  propertyType,
  setPropertyType,
  bedrooms,
  setBedrooms,
  amenities,
  setAmenities
}: PropertyFiltersProps) => {
  const handleAmenityChange = (amenity: string, checked: boolean) => {
    if (checked) {
      setAmenities([...amenities, amenity]);
    } else {
      setAmenities(amenities.filter(a => a !== amenity));
    }
  };

  const clearAllFilters = () => {
    setPriceRange([0, 3000]);
    setPropertyType("All Types");
    setBedrooms("Any");
    setAmenities([]);
  };

  return (
    <Card className="bg-white shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-lg font-semibold">
            <SlidersHorizontal className="h-5 w-5 mr-2 text-blue-600" />
            Filters
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-blue-600 hover:text-blue-700">
            Clear All
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Price Range */}
        <div>
          <div className="flex items-center mb-3">
            <DollarSign className="h-4 w-4 mr-2 text-gray-600" />
            <span className="font-medium">Price Range</span>
          </div>
          <div className="px-2">
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={3000}
              min={0}
              step={50}
              className="mb-2"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </div>

        {/* Property Type */}
        <div>
          <div className="flex items-center mb-3">
            <Home className="h-4 w-4 mr-2 text-gray-600" />
            <span className="font-medium">Property Type</span>
          </div>
          <Select value={propertyType} onValueChange={setPropertyType}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white border shadow-lg">
              {propertyTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Bedrooms */}
        <div>
          <div className="flex items-center mb-3">
            <Users className="h-4 w-4 mr-2 text-gray-600" />
            <span className="font-medium">Bedrooms</span>
          </div>
          <Select value={bedrooms} onValueChange={setBedrooms}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white border shadow-lg">
              {bedroomOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option} {option !== "Any" && option !== "4+" ? "bedroom" : ""}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Amenities */}
        <div>
          <span className="font-medium mb-3 block">Amenities</span>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {availableAmenities.map((amenity) => (
              <div key={amenity} className="flex items-center space-x-2">
                <Checkbox
                  id={amenity}
                  checked={amenities.includes(amenity)}
                  onCheckedChange={(checked) => handleAmenityChange(amenity, checked as boolean)}
                />
                <label htmlFor={amenity} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {amenity}
                </label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyFilters;
