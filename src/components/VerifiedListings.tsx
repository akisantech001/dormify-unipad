
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

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

const VerifiedListings = () => {
  return (
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
  );
};

export default VerifiedListings;
