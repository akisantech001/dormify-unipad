
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Property {
  id: string;
  title: string;
  description?: string;
  location: string;
  university: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  property_type: string;
  amenities: string[];
  images: string[];
  is_verified: boolean;
  is_available: boolean;
  distance_to_university?: string;
  latitude?: number;
  longitude?: number;
  landlord_id?: string;
  created_at: string;
  updated_at: string;
}

export const useProperties = (filters?: {
  university?: string;
  priceRange?: [number, number];
  propertyType?: string;
  bedrooms?: number;
}) => {
  return useQuery({
    queryKey: ['properties', filters],
    queryFn: async () => {
      let query = supabase
        .from('properties')
        .select('*')
        .eq('is_available', true)
        .order('created_at', { ascending: false });

      if (filters?.university) {
        query = query.eq('university', filters.university);
      }
      
      if (filters?.propertyType) {
        query = query.eq('property_type', filters.propertyType);
      }
      
      if (filters?.bedrooms) {
        query = query.eq('bedrooms', filters.bedrooms);
      }
      
      if (filters?.priceRange) {
        query = query.gte('price', filters.priceRange[0]).lte('price', filters.priceRange[1]);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      return data as Property[];
    },
  });
};

export const useCreateProperty = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (property: Omit<Property, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('properties')
        .insert([property])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      toast.success('Property created successfully!');
    },
    onError: (error) => {
      toast.error('Failed to create property');
      console.error('Error creating property:', error);
    },
  });
};

export const useUpdateProperty = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Property> & { id: string }) => {
      const { data, error } = await supabase
        .from('properties')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      toast.success('Property updated successfully!');
    },
    onError: (error) => {
      toast.error('Failed to update property');
      console.error('Error updating property:', error);
    },
  });
};
