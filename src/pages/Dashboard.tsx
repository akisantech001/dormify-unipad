import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useFavorites } from '@/hooks/useFavorites';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useSendMessage } from '@/hooks/useMessages';

const Dashboard = () => {
  const { user, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { data: favorites = [] } = useFavorites();
  const [bookings, setBookings] = useState<any[]>([]);
  const [propertyMap, setPropertyMap] = useState<Record<string, any>>({});
  const sendMessage = useSendMessage();
  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    // Redirect admins to admin dashboard
    if (isAdmin) {
      navigate('/admin');
      return;
    }

    fetchProfile();
  }, [user, isAdmin, navigate]);

  const fetchProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  // Fetch bookings for landlord (their properties) or student (their own)
  useEffect(() => {
    if (!user || !profile) return;

    const load = async () => {
      try {
        if (profile.role === 'landlord') {
          const { data: props } = await supabase
            .from('properties')
            .select('id, title, location')
            .eq('landlord_id', user.id);

          const ids = props?.map((p) => p.id) || [];
          const map: Record<string, any> = {};
          props?.forEach((p) => (map[p.id] = p));
          setPropertyMap(map);

          if (ids.length > 0) {
            const { data: bks } = await supabase
              .from('bookings')
              .select('*')
              .in('property_id', ids)
              .order('created_at', { ascending: false });
            setBookings(bks || []);
          } else {
            setBookings([]);
          }
        } else {
          const { data: bks } = await supabase
            .from('bookings')
            .select('*')
            .eq('student_id', user.id)
            .order('created_at', { ascending: false });
          setBookings(bks || []);
        }
      } catch (err) {
        console.error('Error loading bookings:', err);
      }
    };

    load();

    const channel = supabase
      .channel('bookings-changes')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'bookings' }, (payload) => {
        try {
          if (profile?.role === 'landlord') {
            const propertyId = (payload.new as any)?.property_id;
            if (propertyId && propertyMap[propertyId]) {
              toast.success('New booking request received');
            }
          }
        } catch {}
        load();
      })
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'bookings' }, () => {
        load();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, profile]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleManageProperties = () => {
    navigate('/manage-properties');
  };

  const handleApprove = async (booking: any) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: 'approved' })
        .eq('id', booking.id);
      if (error) throw error;

      await sendMessage.mutateAsync({
        receiver_id: booking.student_id,
        property_id: booking.property_id,
        subject: 'Booking Approved',
        content: `Your booking for "${propertyMap[booking.property_id]?.title ?? 'the property'}" has been approved.`,
      });

      toast.success('Booking approved');
    } catch (err) {
      console.error('Error approving booking:', err);
      toast.error('Failed to approve booking');
    }
  };

  const handleDisapprove = async (booking: any) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: 'rejected' })
        .eq('id', booking.id);
      if (error) throw error;

      await sendMessage.mutateAsync({
        receiver_id: booking.student_id,
        property_id: booking.property_id,
        subject: 'Booking Disapproved',
        content: `Your booking for "${propertyMap[booking.property_id]?.title ?? 'the property'}" has been disapproved by the landlord.`,
      });

      toast.success('Booking disapproved');
    } catch (err) {
      console.error('Error disapproving booking:', err);
      toast.error('Failed to disapprove booking');
    }
  };
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
              <img 
                src="/lovable-uploads/5c4aa35b-ca69-4dc1-b276-5b3e91f46e3a.png" 
                alt="Dormify" 
                className="h-16 w-auto"
              />
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {profile?.full_name}</span>
              <Button onClick={handleSignOut} variant="outline">
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome to your {profile?.role} dashboard
          </p>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="properties">Properties</TabsTrigger>
            <TabsTrigger value="bookings">Bookings{bookings.length ? ` (${bookings.length})` : ''}</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0</div>
                  <p className="text-xs text-muted-foreground">
                    Properties listed
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0</div>
                  <p className="text-xs text-muted-foreground">
                    Current bookings
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Messages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0</div>
                  <p className="text-xs text-muted-foreground">
                    Unread messages
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0</div>
                  <p className="text-xs text-muted-foreground">
                    Total reviews
                  </p>
                </CardContent>
              </Card>
            </div>

            {profile?.role === 'landlord' && (
              <div className="mt-6">
                <Button onClick={handleManageProperties} className="mr-4">
                  Manage Properties
                </Button>
                <Button variant="outline" onClick={() => navigate('/messages')}>
                  View Messages
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="properties">
            <Card>
              <CardHeader>
                <CardTitle>Your Properties</CardTitle>
              </CardHeader>
              <CardContent>
                {profile?.role === 'landlord' ? (
                  <div>
                    <Button onClick={handleManageProperties}>
                      Add New Property
                    </Button>
                    <p className="text-gray-600 mt-4">Property list will be displayed here.</p>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Favorite Properties</h3>
                    {favorites.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {favorites.map((favorite) => (
                          <Card key={favorite.id} className="overflow-hidden">
                            <div className="relative">
                              <img
                                src={favorite.property?.images[0] ? `/lovable-uploads/${favorite.property.images[0]}.jpg` : '/placeholder.svg'}
                                alt={favorite.property?.title}
                                className="w-full h-32 object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = '/placeholder.svg';
                                }}
                              />
                            </div>
                            <CardContent className="p-3">
                              <h4 className="font-semibold text-sm truncate">{favorite.property?.title}</h4>
                              <p className="text-xs text-gray-600 truncate">{favorite.property?.location}</p>
                              <p className="text-sm font-bold text-blue-600">₦{favorite.property?.price?.toLocaleString()}/month</p>
                              <div className="flex justify-between items-center mt-2">
                                <span className="text-xs text-gray-500">{favorite.property?.bedrooms} bed • {favorite.property?.bathrooms} bath</span>
                                <Button size="sm" onClick={() => navigate('/properties')}>
                                  View
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-600">You haven't favorited any properties yet. Browse properties to add some favorites!</p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                {bookings.length === 0 ? (
                  <p className="text-gray-600">No bookings yet.</p>
                ) : (
                  <div className="space-y-4">
                    {bookings.map((b) => (
                      <div key={b.id} className="p-4 border rounded-lg flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">
                            {profile?.role === 'landlord'
                              ? propertyMap[b.property_id]?.title || 'Property'
                              : 'Your booking'}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {new Date(b.created_at).toLocaleString()} • {b.status}
                          </p>
                          {profile?.role === 'landlord' && (
                            <p className="text-sm text-gray-600">
                              Location: {propertyMap[b.property_id]?.location || '—'}
                            </p>
                          )}
                        </div>
                        <div className="text-right space-y-2">
                          <p className="text-sm">Check-in: {b.check_in_date || '—'}</p>
                          <p className="text-sm">Check-out: {b.check_out_date || '—'}</p>
                          {profile?.role === 'landlord' && b.status === 'pending' && (
                            <Button size="sm" onClick={() => handleApprove(b)} disabled={sendMessage.isPending}>
                              Approve
                            </Button>
                          )}
                          {profile?.role === 'landlord' && b.status === 'approved' && (
                            <Button size="sm" variant="destructive" onClick={() => handleDisapprove(b)} disabled={sendMessage.isPending}>
                              Disapprove
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle>Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Messaging system will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
