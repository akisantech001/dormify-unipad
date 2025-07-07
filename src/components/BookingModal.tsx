
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: {
    id: number;
    title: string;
    price: number;
    location: string;
  };
}

const BookingModal = ({ isOpen, onClose, property }: BookingModalProps) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    check_in_date: '',
    check_out_date: '',
    message: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('You must be logged in to make a booking');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from('bookings')
        .insert([{
          property_id: property.id.toString(),
          student_id: user.id,
          check_in_date: formData.check_in_date,
          check_out_date: formData.check_out_date,
          message: formData.message,
          status: 'pending'
        }]);

      if (error) throw error;

      toast.success('Booking request sent successfully!');
      onClose();
      setFormData({ check_in_date: '', check_out_date: '', message: '' });
    } catch (error) {
      console.error('Error creating booking:', error);
      toast.error('Failed to create booking request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Book {property.title}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="check_in">Check-in Date</Label>
            <Input
              id="check_in"
              type="date"
              value={formData.check_in_date}
              onChange={(e) => handleInputChange('check_in_date', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="check_out">Check-out Date</Label>
            <Input
              id="check_out"
              type="date"
              value={formData.check_out_date}
              onChange={(e) => handleInputChange('check_out_date', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message to Landlord</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              placeholder="Tell the landlord about yourself and why you're interested..."
              rows={3}
            />
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">
              <strong>Property:</strong> {property.title}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Location:</strong> {property.location}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Price:</strong> ₦{property.price.toLocaleString()}/month
            </p>
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Submitting...' : 'Send Booking Request'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
