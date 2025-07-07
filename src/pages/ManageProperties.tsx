
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useProperties } from '@/hooks/useProperties';

const ManageProperties = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data: properties, isLoading, error } = useProperties();
  const [userProperties, setUserProperties] = useState<any[]>([]);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    fetchUserProperties();
  }, [user, navigate]);

  const fetchUserProperties = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('landlord_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUserProperties(data || []);
    } catch (error) {
      console.error('Error fetching properties:', error);
      toast.error('Failed to load properties');
    }
  };

  const toggleAvailability = async (propertyId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('properties')
        .update({ is_available: !currentStatus })
        .eq('id', propertyId);

      if (error) throw error;
      
      toast.success(`Property ${!currentStatus ? 'made available' : 'made unavailable'}`);
      fetchUserProperties();
    } catch (error) {
      console.error('Error updating property:', error);
      toast.error('Failed to update property');
    }
  };

  const deleteProperty = async (propertyId: string) => {
    if (!confirm('Are you sure you want to delete this property?')) return;

    try {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', propertyId);

      if (error) throw error;
      
      toast.success('Property deleted successfully');
      fetchUserProperties();
    } catch (error) {
      console.error('Error deleting property:', error);
      toast.error('Failed to delete property');
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
              <h1 className="text-xl font-semibold">Manage Properties</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button onClick={() => navigate('/dashboard')} variant="outline">
                Dashboard
              </Button>
              <Button onClick={() => navigate('/add-property')}>
                <Plus className="h-4 w-4 mr-2" />
                Add Property
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Your Properties</h2>
          <p className="text-gray-600 mt-2">Manage your property listings</p>
        </div>

        {userProperties.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-gray-600 mb-4">You haven't added any properties yet.</p>
              <Button onClick={() => navigate('/add-property')}>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Property
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userProperties.map((property) => (
              <Card key={property.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{property.title}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleAvailability(property.id, property.is_available)}
                      >
                        {property.is_available ? (
                          <Eye className="h-4 w-4" />
                        ) : (
                          <EyeOff className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => navigate(`/edit-property/${property.id}`)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteProperty(property.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">{property.location}</p>
                    <p className="text-sm text-gray-600">{property.university}</p>
                    <p className="font-semibold text-lg">₦{property.price.toLocaleString()}/month</p>
                    <p className="text-sm text-gray-600">
                      {property.bedrooms} bed • {property.bathrooms} bath
                    </p>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        property.is_available 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {property.is_available ? 'Available' : 'Unavailable'}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        property.is_verified 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {property.is_verified ? 'Verified' : 'Pending'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ManageProperties;
