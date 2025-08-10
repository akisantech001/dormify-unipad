import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const LandlordSignup = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Post Your Property | Dormify';
  }, []);

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
              <h1 className="text-xl font-semibold">Become a Landlord</h1>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={() => navigate('/properties')}>Browse Properties</Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle>Post Your Property</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-700">
              List your student accommodation and reach thousands of verified students. Create an account to get started, then add your property details and photos. You can manage availability and updates anytime.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                onClick={() => (user ? navigate('/add-property') : navigate('/auth'))}
                className="min-w-48"
              >
                {user ? 'Post a Property' : 'Sign in / Create Account'}
              </Button>
              {user && (
                <Button variant="outline" onClick={() => navigate('/manage-properties')} className="min-w-48">
                  Manage My Properties
                </Button>
              )}
            </div>

            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Upload multiple images per listing</li>
              <li>Mark listings available/unavailable anytime</li>
              <li>Verified listings gain higher visibility</li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default LandlordSignup;
