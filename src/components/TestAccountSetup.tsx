
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

const TestAccountSetup = () => {
  const [loading, setLoading] = useState(false);
  const [setupComplete, setSetupComplete] = useState(false);
  const { isAdmin } = useAuth();

  if (!isAdmin) return null;

  const createTestAccounts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-test-accounts');
      
      if (error) {
        console.error('Error creating test accounts:', error);
        toast.error('Failed to create test accounts');
        return;
      }

      console.log('Test accounts setup result:', data);
      toast.success('Test accounts created successfully!');
      setSetupComplete(true);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to create test accounts');
    } finally {
      setLoading(false);
    }
  };

  if (setupComplete) {
    return (
      <Card className="mb-6 border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="text-green-800 flex items-center gap-2">
            ✅ Test Accounts Ready
          </CardTitle>
        </CardHeader>
        <CardContent className="text-green-700">
          <p>Test accounts have been set up successfully. You can now use the credentials below to log in.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6 border-blue-200 bg-blue-50">
      <CardHeader>
        <CardTitle className="text-blue-800">First Time Setup</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-blue-700 mb-4">
          Click the button below to create test accounts for demo purposes.
        </p>
        <Button 
          onClick={createTestAccounts}
          disabled={loading}
          className="w-full"
        >
          {loading ? 'Creating Test Accounts...' : 'Setup Test Accounts'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default TestAccountSetup;
