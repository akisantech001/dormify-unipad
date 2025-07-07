
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  property_id?: string;
  subject?: string;
  content: string;
  is_read: boolean;
  created_at: string;
}

export const useMessages = (userId: string) => {
  return useQuery({
    queryKey: ['messages', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('messages')
        .select(`
          *,
          sender:profiles!messages_sender_id_fkey(full_name, email),
          receiver:profiles!messages_receiver_id_fkey(full_name, email),
          property:properties(title)
        `)
        .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });
};

export const useSendMessage = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (message: {
      receiver_id: string;
      property_id?: string;
      subject?: string;
      content: string;
    }) => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error('Not authenticated');
      
      const { data, error } = await supabase
        .from('messages')
        .insert([{
          ...message,
          sender_id: userData.user.id,
        }])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
      toast.success('Message sent successfully!');
    },
    onError: (error) => {
      toast.error('Failed to send message');
      console.error('Error sending message:', error);
    },
  });
};

export const useMarkMessageAsRead = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (messageId: string) => {
      const { error } = await supabase
        .from('messages')
        .update({ is_read: true })
        .eq('id', messageId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    },
  });
};
