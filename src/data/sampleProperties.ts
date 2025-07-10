
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
  images: string[];
  verified: boolean;
  type: string;
  description: string;
}

export const sampleProperties: Property[] = [
  {
    id: 1,
    title: "Luxury Modern Studio",
    location: "Victoria Island, Lagos",
    university: "University of Lagos",
    price: 350000,
    rating: 4.9,
    reviews: 47,
    bedrooms: 1,
    bathrooms: 1,
    distance: "0.2 miles",
    amenities: ["WiFi", "Kitchen", "Gym", "Pool", "Security", "Parking"],
    images: [
      "photo-1721322800607-8c38375eef04",
      "photo-1487958449943-2429e8be8625",
      "photo-1518005020951-eccb494ad742",
      "photo-1524230572899-a752b3835840",
      "photo-1493397212122-2b85dda8106b"
    ],
    verified: true,
    type: "Studio",
    description: "Premium studio apartment with modern amenities and stunning city views."
  },
  {
    id: 2,
    title: "Cozy Student Apartment",
    location: "Yaba, Lagos",
    university: "University of Lagos",
    price: 180000,
    rating: 4.6,
    reviews: 32,
    bedrooms: 2,
    bathrooms: 1,
    distance: "0.5 miles",
    amenities: ["WiFi", "Kitchen", "Laundry", "Security"],
    images: [
      "photo-1487958449943-2429e8be8625",
      "photo-1721322800607-8c38375eef04",
      "photo-1518005020951-eccb494ad742",
      "photo-1524230572899-a752b3835840",
      "photo-1493397212122-2b85dda8106b"
    ],
    verified: true,
    type: "Apartment",
    description: "Perfect for students seeking comfort and convenience near campus."
  },
  {
    id: 3,
    title: "Budget-Friendly Shared Space",
    location: "Akoka, Lagos",
    university: "University of Lagos",
    price: 85000,
    rating: 4.2,
    reviews: 28,
    bedrooms: 3,
    bathrooms: 2,
    distance: "0.8 miles",
    amenities: ["WiFi", "Kitchen", "Laundry"],
    images: [
      "photo-1518005020951-eccb494ad742",
      "photo-1487958449943-2429e8be8625",
      "photo-1721322800607-8c38375eef04",
      "photo-1524230572899-a752b3835840",
      "photo-1493397212122-2b85dda8106b"
    ],
    verified: false,
    type: "Shared Room",
    description: "Affordable shared accommodation with essential amenities for students."
  },
  {
    id: 4,
    title: "Premium Family House",
    location: "Surulere, Lagos",
    university: "Lagos State University",
    price: 450000,
    rating: 4.8,
    reviews: 19,
    bedrooms: 4,
    bathrooms: 3,
    distance: "1.2 miles",
    amenities: ["WiFi", "Parking", "Kitchen", "Garden", "Security", "Generator"],
    images: [
      "photo-1524230572899-a752b3835840",
      "photo-1721322800607-8c38375eef04",
      "photo-1487958449943-2429e8be8625",
      "photo-1518005020951-eccb494ad742",
      "photo-1493397212122-2b85dda8106b"
    ],
    verified: true,
    type: "House",
    description: "Spacious family home perfect for graduate students or small families."
  },
  {
    id: 5,
    title: "Modern Executive Suite",
    location: "Ikoyi, Lagos",
    university: "University of Lagos",
    price: 520000,
    rating: 4.9,
    reviews: 61,
    bedrooms: 2,
    bathrooms: 2,
    distance: "0.3 miles",
    amenities: ["WiFi", "Kitchen", "Gym", "Pool", "Concierge", "Parking", "Security"],
    images: [
      "photo-1493397212122-2b85dda8106b",
      "photo-1721322800607-8c38375eef04",
      "photo-1487958449943-2429e8be8625",
      "photo-1518005020951-eccb494ad742",
      "photo-1524230572899-a752b3835840"
    ],
    verified: true,
    type: "Apartment",
    description: "Executive apartment with premium finishes and world-class amenities."
  },
  {
    id: 6,
    title: "Student Hostel Complex",
    location: "Ile-Ife, Osun State",
    university: "Obafemi Awolowo University",
    price: 95000,
    rating: 4.1,
    reviews: 89,
    bedrooms: 1,
    bathrooms: 1,
    distance: "0.1 miles",
    amenities: ["WiFi", "Cafeteria", "Study Room", "Laundry", "Security"],
    images: [
      "photo-1721322800607-8c38375eef04",
      "photo-1518005020951-eccb494ad742",
      "photo-1487958449943-2429e8be8625",
      "photo-1524230572899-a752b3835840",
      "photo-1493397212122-2b85dda8106b"
    ],
    verified: true,
    type: "Dorm",
    description: "Traditional hostel accommodation with modern amenities on campus."
  },
  {
    id: 7,
    title: "Affordable Twin Studio",
    location: "Zaria, Kaduna State",
    university: "Ahmadu Bello University",
    price: 120000,
    rating: 4.4,
    reviews: 35,
    bedrooms: 1,
    bathrooms: 1,
    distance: "0.6 miles",
    amenities: ["WiFi", "Kitchen", "Laundry", "Parking"],
    images: [
      "photo-1487958449943-2429e8be8625",
      "photo-1721322800607-8c38375eef04",
      "photo-1518005020951-eccb494ad742",
      "photo-1524230572899-a752b3835840",
      "photo-1493397212122-2b85dda8106b"
    ],
    verified: true,
    type: "Studio",
    description: "Compact and efficient studio perfect for focused academic life."
  },
  {
    id: 8,
    title: "Luxury Penthouse Suite",
    location: "Abuja, FCT",
    university: "University of Abuja",
    price: 650000,
    rating: 5.0,
    reviews: 23,
    bedrooms: 3,
    bathrooms: 2,
    distance: "0.4 miles",
    amenities: ["WiFi", "Kitchen", "Gym", "Pool", "Terrace", "Parking", "Security", "Generator"],
    images: [
      "photo-1518005020951-eccb494ad742",
      "photo-1493397212122-2b85dda8106b",
      "photo-1721322800607-8c38375eef04",
      "photo-1487958449943-2429e8be8625",
      "photo-1524230572899-a752b3835840"
    ],
    verified: true,
    type: "Apartment",
    description: "Ultra-luxurious penthouse with panoramic city views and premium amenities."
  },
  {
    id: 9,
    title: "Comfortable Duplex",
    location: "Nsukka, Enugu State",
    university: "University of Nigeria, Nsukka",
    price: 200000,
    rating: 4.5,
    reviews: 42,
    bedrooms: 3,
    bathrooms: 2,
    distance: "0.9 miles",
    amenities: ["WiFi", "Kitchen", "Garden", "Parking", "Security"],
    images: [
      "photo-1524230572899-a752b3835840",
      "photo-1721322800607-8c38375eef04",
      "photo-1487958449943-2429e8be8625",
      "photo-1518005020951-eccb494ad742",
      "photo-1493397212122-2b85dda8106b"
    ],
    verified: true,
    type: "House",
    description: "Two-story home with ample space for comfortable student living."
  },
  {
    id: 10,
    title: "Economy Single Room",
    location: "Benin City, Edo State",
    university: "University of Benin",
    price: 75000,
    rating: 3.9,
    reviews: 24,
    bedrooms: 1,
    bathrooms: 1,
    distance: "1.1 miles",
    amenities: ["WiFi", "Kitchen", "Laundry"],
    images: [
      "photo-1493397212122-2b85dda8106b",
      "photo-1721322800607-8c38375eef04",
      "photo-1487958449943-2429e8be8625",
      "photo-1518005020951-eccb494ad742",
      "photo-1524230572899-a752b3835840"
    ],
    verified: false,
    type: "Single Room",
    description: "Basic but comfortable accommodation for budget-conscious students."
  },
  {
    id: 11,
    title: "Mid-Range Apartment",
    location: "Ibadan, Oyo State",
    university: "University of Ibadan",
    price: 250000,
    rating: 4.7,
    reviews: 56,
    bedrooms: 2,
    bathrooms: 2,
    distance: "0.7 miles",
    amenities: ["WiFi", "Kitchen", "Gym", "Parking", "Security", "Generator"],
    images: [
      "photo-1721322800607-8c38375eef04",
      "photo-1487958449943-2429e8be8625",
      "photo-1518005020951-eccb494ad742",
      "photo-1524230572899-a752b3835840",
      "photo-1493397212122-2b85dda8106b"
    ],
    verified: true,
    type: "Apartment",
    description: "Well-appointed apartment with excellent amenities and location."
  },
  {
    id: 12,
    title: "Shared Family House",
    location: "Calabar, Cross River State",
    university: "University of Calabar",
    price: 140000,
    rating: 4.3,
    reviews: 31,
    bedrooms: 4,
    bathrooms: 2,
    distance: "1.3 miles",
    amenities: ["WiFi", "Kitchen", "Garden", "Parking"],
    images: [
      "photo-1487958449943-2429e8be8625",
      "photo-1518005020951-eccb494ad742",
      "photo-1721322800607-8c38375eef04",
      "photo-1524230572899-a752b3835840",
      "photo-1493397212122-2b85dda8106b"
    ],
    verified: true,
    type: "House",
    description: "Spacious shared house perfect for group accommodation."
  }
];
