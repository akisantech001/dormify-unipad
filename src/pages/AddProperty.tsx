
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const universities = [
  "University of Lagos",
  "University of Ibadan",
  "Ahmadu Bello University",
  "University of Nigeria, Nsukka",
  "Obafemi Awolowo University",
  "Lagos State University",
  "Covenant University",
  "University of Abuja",
  "Federal University of Technology, Akure",
  "University of Benin",
  "Babcock University",
  "Afe Babalola University"
];

const propertyTypes = [
  "Apartment",
  "Studio",
  "Shared Room",
  "Private Room",
  "House",
  "Hostel"
];

const amenitiesList = [
  "WiFi",
  "Air Conditioning",
  "Kitchen",
  "Laundry",
  "Parking",
  "Security",
  "Gym",
  "Pool",
  "Study Area",
  "Common Room"
];

const AddProperty = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [landlords, setLandlords] = useState<{id: string, full_name: string, email: string}[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    university: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    property_type: '',
    distance_to_university: '',
    amenities: [] as string[],
    landlord_id: user?.id || '' // Default to current user
  });

  useEffect(() => {
    // If admin, fetch list of landlords for property assignment
    if (isAdmin) {
      fetchLandlords();
    }
  }, [isAdmin]);

  const [images, setImages] = useState<File[]>([]);

  const fetchLandlords = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name, email')
        .eq('role', 'landlord')
        .order('full_name');
      
      if (error) throw error;
      if (data) setLandlords(data);
    } catch (error) {
      console.error('Error fetching landlords:', error);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      amenities: checked 
        ? [...prev.amenities, amenity]
        : prev.amenities.filter(a => a !== amenity)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('You must be logged in to add a property');
      return;
    }

    setLoading(true);

    try {
      // Upload images to Supabase Storage
      const imageUrls: string[] = [];
      if (images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          const file = images[i];
          const path = `${user.id}/${Date.now()}-${i}-${file.name}`;
          const { error: uploadError } = await supabase
            .storage
            .from('property-images')
            .upload(path, file, {
              cacheControl: '3600',
              upsert: false,
              contentType: file.type,
            });
          if (uploadError) throw uploadError;
          const { data: publicData } = supabase
            .storage
            .from('property-images')
            .getPublicUrl(path);
          if (publicData?.publicUrl) {
            imageUrls.push(publicData.publicUrl);
          }
        }
      }

      const { error } = await supabase
        .from('properties')
        .insert([{
          ...formData,
          price: parseFloat(formData.price),
          bedrooms: parseInt(formData.bedrooms),
          bathrooms: parseInt(formData.bathrooms),
          landlord_id: isAdmin ? formData.landlord_id : user.id,
          images: imageUrls,
        }]);

      if (error) throw error;

      toast.success('Property added successfully!');
      navigate(isAdmin ? '/admin' : '/manage-properties');
    } catch (error) {
      console.error('Error adding property:', error);
      toast.error('Failed to add property');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <img 
                src="/lovable-uploads/5c4aa35b-ca69-4dc1-b276-5b3e91f46e3a.png" 
                alt="Dormify" 
                className="h-20 w-auto cursor-pointer"
                onClick={() => navigate('/')}
              />
              <h1 className="text-xl font-semibold">Add Property</h1>
            </div>
            <Button onClick={() => navigate(isAdmin ? '/admin' : '/manage-properties')} variant="outline">
              {isAdmin ? 'Back to Admin' : 'Back to Properties'}
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle>Add New Property</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Property Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Monthly Rent (₦)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="university">University</Label>
                  <Select value={formData.university} onValueChange={(value) => handleInputChange('university', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select University" />
                    </SelectTrigger>
                    <SelectContent>
                      {universities.map((uni) => (
                        <SelectItem key={uni} value={uni}>{uni}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="property_type">Property Type</Label>
                  <Select value={formData.property_type} onValueChange={(value) => handleInputChange('property_type', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Property Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {propertyTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {isAdmin && (
                  <div className="space-y-2">
                    <Label htmlFor="landlord">Assign to Landlord</Label>
                    <Select value={formData.landlord_id} onValueChange={(value) => handleInputChange('landlord_id', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Landlord" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={user?.id || ''}>Admin (Self)</SelectItem>
                        {landlords.map((landlord) => (
                          <SelectItem key={landlord.id} value={landlord.id}>
                            {landlord.full_name} ({landlord.email})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="distance">Distance to University</Label>
                  <Input
                    id="distance"
                    value={formData.distance_to_university}
                    onChange={(e) => handleInputChange('distance_to_university', e.target.value)}
                    placeholder="e.g., 5 minutes walk"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <Input
                    id="bedrooms"
                    type="number"
                    min="1"
                    value={formData.bedrooms}
                    onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bathrooms">Bathrooms</Label>
                  <Input
                    id="bathrooms"
                    type="number"
                    min="1"
                    value={formData.bathrooms}
                    onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label>Amenities</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {amenitiesList.map((amenity) => (
                    <div key={amenity} className="flex items-center space-x-2">
                      <Checkbox
                        id={amenity}
                        checked={formData.amenities.includes(amenity)}
                        onCheckedChange={(checked) => handleAmenityChange(amenity, checked as boolean)}
                      />
                      <Label htmlFor={amenity}>{amenity}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="images">Property Images</Label>
                <Input
                  id="images"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => setImages(Array.from(e.target.files || []))}
                />
              </div>

              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={() => navigate(isAdmin ? '/admin' : '/manage-properties')}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Adding...' : 'Add Property'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AddProperty;
