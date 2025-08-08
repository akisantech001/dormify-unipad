import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from './useAuth';

export interface Favorite {
  id: string;
  user_id: string;
  property_id: string;
  created_at: string;
  property?: {
    id: string;
    title: string;
    location: string;
    price: number;
    images: string[];
    university: string;
    property_type: string;
    bedrooms: number;
    bathrooms: number;
  };
}

export const useFavorites = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['favorites', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('favorites')
        .select(`
          *,
          property:properties(
            id,
            title,
            location,
            price,
            images,
            university,
            property_type,
            bedrooms,
            bathrooms
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Favorite[];
    },
    enabled: !!user,
  });
};

export const useIsFavorited = (propertyId: string) => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['is-favorited', propertyId, user?.id],
    queryFn: async () => {
      if (!user) return false;
      
      const { data, error } = await supabase
        .from('favorites')
        .select('id')
        .eq('user_id', user.id)
        .eq('property_id', propertyId)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      return !!data;
    },
    enabled: !!user && !!propertyId,
  });
};

export const useToggleFavorite = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: async ({ propertyId, isFavorited }: { propertyId: string; isFavorited: boolean }) => {
      if (!user) throw new Error('User not authenticated');
      
      if (isFavorited) {
        // Remove from favorites
        const { error } = await supabase
          .from('favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('property_id', propertyId);
        
        if (error) throw error;
      } else {
        // Add to favorites
        const { error } = await supabase
          .from('favorites')
          .insert([{
            user_id: user.id,
            property_id: propertyId,
          }]);
        
        if (error) throw error;
      }
      
      return !isFavorited;
    },
    onSuccess: (newState, { propertyId }) => {
      queryClient.invalidateQueries({ queryKey: ['favorites', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['is-favorited', propertyId, user?.id] });
      toast.success(newState ? 'Added to favorites' : 'Removed from favorites');
    },
    onError: (error) => {
      toast.error('Failed to update favorites');
      console.error('Error updating favorites:', error);
    },
  });
};