
import { useState } from "react";
import Header from "@/components/Header";
import PropertyFilters from "@/components/PropertyFilters";
import PropertyListFromDB from "@/components/PropertyListFromDB";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [filters, setFilters] = useState<{
    university?: string;
    priceRange?: [number, number];
    propertyType?: string;
    bedrooms?: number;
  }>({});

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Student Accommodations</h1>
            <p className="text-gray-600 mt-2">Find your perfect place to stay</p>
          </div>
          
          {user && (
            <Button onClick={() => navigate('/dashboard')}>
              Go to Dashboard
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <PropertyFilters onFilterChange={handleFilterChange} />
          </div>
          
          <div className="lg:col-span-3">
            <PropertyListFromDB filters={filters} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
