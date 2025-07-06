
import { useState } from "react";
import { Search, MapPin, Menu, User, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useNavigate } from "react-router-dom";

const universities = [
  "Harvard University",
  "MIT",
  "Stanford University",
  "UC Berkeley",
  "NYU",
  "Columbia University",
  "University of Chicago",
  "UCLA"
];

const verifiedListings = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop",
    title: "Modern Student Apartment",
    location: "Near Harvard University"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop",
    title: "Cozy Shared Living",
    location: "Near MIT"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
    title: "Premium Studio",
    location: "Near Stanford"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop",
    title: "Student Housing Complex",
    location: "Near UC Berkeley"
  }
];

const Landing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [universitySearch, setUniversitySearch] = useState("");
  const navigate = useNavigate();

  const handleAuthClick = () => {
    navigate('/auth');
  };

  const handleExploreClick = () => {
    navigate('/properties');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/properties');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Dormify</h1>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Explore accommodations"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <Select value={selectedUniversity} onValueChange={setSelectedUniversity}>
                  <SelectTrigger className="w-48">
                    <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                    <SelectValue placeholder="Select University" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border shadow-lg z-50">
                    {universities.map((university) => (
                      <SelectItem key={university} value={university}>
                        {university}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="flex items-center space-x-2" onClick={handleAuthClick}>
                <User className="h-4 w-4" />
                <span>Login / Sign Up</span>
              </Button>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Find Your Perfect
            <span className="block text-blue-600">Student Home</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Discover verified student accommodations near top universities
          </p>
          <Button onClick={handleExploreClick} size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
            Start Exploring
          </Button>
        </div>

        {/* Verified Listings Slider */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Verified Listings
          </h2>
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {verifiedListings.map((listing) => (
                <CarouselItem key={listing.id} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
                    <CardContent className="p-0">
                      <div className="relative">
                        <img
                          src={listing.image}
                          alt={listing.title}
                          className="w-full h-64 object-cover rounded-t-lg"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                            Verified
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {listing.title}
                        </h3>
                        <p className="text-gray-600">{listing.location}</p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        {/* Search Section */}
        <div className="bg-blue-50 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Find Your Perfect Student Accommodation
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Search for verified student housing near your university
          </p>
          
          <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="What university are you studying in?"
                  value={universitySearch}
                  onChange={(e) => setUniversitySearch(e.target.value)}
                  className="w-full h-12 text-lg border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <Button 
                type="submit"
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 h-12"
              >
                <Search className="h-5 w-5 mr-2" />
                Search
              </Button>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="bg-blue-600 p-2 rounded-lg">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold">Dormify</h3>
          </div>
          <p className="text-gray-400">
            Making student accommodation search simple and reliable
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
