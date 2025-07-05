
export interface Property {
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

export const sampleProperties: Property[] = [
  {
    id: 1,
    title: "Modern Studio Near Harvard Square",
    location: "Cambridge, MA",
    university: "Harvard University",
    price: 1800,
    rating: 4.8,
    reviews: 32,
    bedrooms: 1,
    bathrooms: 1,
    distance: "0.3 miles",
    amenities: ["WiFi", "Kitchen", "Laundry", "Security"],
    image: "photo-1721322800607-8c38375eef04",
    verified: true,
    type: "Studio"
  },
  {
    id: 2,
    title: "Shared House with Students",
    location: "Palo Alto, CA",
    university: "Stanford University",
    price: 1200,
    rating: 4.5,
    reviews: 18,
    bedrooms: 4,
    bathrooms: 2,
    distance: "0.8 miles",
    amenities: ["WiFi", "Parking", "Kitchen", "Furnished"],
    image: "photo-1487958449943-2429e8be8625",
    verified: true,
    type: "House"
  },
  {
    id: 3,
    title: "Cozy Apartment Near MIT",
    location: "Cambridge, MA",
    university: "MIT",
    price: 2100,
    rating: 4.7,
    reviews: 24,
    bedrooms: 2,
    bathrooms: 1,
    distance: "0.2 miles",
    amenities: ["WiFi", "Kitchen", "Gym", "Security"],
    image: "photo-1518005020951-eccb494ad742",
    verified: false,
    type: "Apartment"
  },
  {
    id: 4,
    title: "Student Housing Complex",
    location: "Berkeley, CA",
    university: "UC Berkeley",
    price: 950,
    rating: 4.3,
    reviews: 67,
    bedrooms: 1,
    bathrooms: 1,
    distance: "0.5 miles",
    amenities: ["WiFi", "Laundry", "Pool", "Gym", "Security"],
    image: "photo-1487958449943-2429e8be8625",
    verified: true,
    type: "Dorm"
  },
  {
    id: 5,
    title: "Luxury Apartment in Manhattan",
    location: "New York, NY",
    university: "NYU",
    price: 2800,
    rating: 4.9,
    reviews: 41,
    bedrooms: 2,
    bathrooms: 2,
    distance: "0.4 miles",
    amenities: ["WiFi", "Parking", "Kitchen", "Gym", "Security", "Furnished"],
    image: "photo-1518005020951-eccb494ad742",
    verified: true,
    type: "Apartment"
  },
  {
    id: 6,
    title: "Affordable Shared Room",
    location: "New York, NY",
    university: "Columbia University",
    price: 800,
    rating: 4.1,
    reviews: 15,
    bedrooms: 3,
    bathrooms: 1,
    distance: "0.6 miles",
    amenities: ["WiFi", "Kitchen", "Laundry"],
    image: "photo-1721322800607-8c38375eef04",
    verified: false,
    type: "Shared Room"
  },
  {
    id: 7,
    title: "Modern Studio with Great View",
    location: "Chicago, IL",
    university: "University of Chicago",
    price: 1500,
    rating: 4.6,
    reviews: 28,
    bedrooms: 1,
    bathrooms: 1,
    distance: "0.7 miles",
    amenities: ["WiFi", "Kitchen", "Parking", "Furnished"],
    image: "photo-1487958449943-2429e8be8625",
    verified: true,
    type: "Studio"
  },
  {
    id: 8,
    title: "Spacious House for Students",
    location: "Los Angeles, CA",
    university: "UCLA",
    price: 1400,
    rating: 4.4,
    reviews: 33,
    bedrooms: 5,
    bathrooms: 3,
    distance: "1.2 miles",
    amenities: ["WiFi", "Parking", "Kitchen", "Pool", "Gym"],
    image: "photo-1518005020951-eccb494ad742",
    verified: true,
    type: "House"
  }
];
