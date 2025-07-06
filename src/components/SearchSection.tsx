
import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const SearchSection = () => {
  const [universitySearch, setUniversitySearch] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/properties');
  };

  return (
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
  );
};

export default SearchSection;
