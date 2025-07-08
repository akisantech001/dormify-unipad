
-- Add admin role to the existing user_role enum
ALTER TYPE user_role ADD VALUE 'admin';

-- Create a function to check if a user has admin role
CREATE OR REPLACE FUNCTION public.is_admin(user_uuid uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = user_uuid AND role = 'admin'
  );
$$;

-- Create admin-specific policies for full access to manage the platform
CREATE POLICY "Admins can view all profiles" 
  ON public.profiles 
  FOR SELECT 
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update all profiles" 
  ON public.profiles 
  FOR UPDATE 
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can view all properties" 
  ON public.properties 
  FOR SELECT 
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update all properties" 
  ON public.properties 
  FOR UPDATE 
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete all properties" 
  ON public.properties 
  FOR DELETE 
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can view all bookings" 
  ON public.bookings 
  FOR SELECT 
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update all bookings" 
  ON public.bookings 
  FOR UPDATE 
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete all bookings" 
  ON public.bookings 
  FOR DELETE 
  USING (public.is_admin(auth.uid()));

-- Insert test accounts (you'll need to create these users first in Supabase Auth, then update with the actual UUIDs)
-- Note: Replace these UUIDs with actual user IDs after creating the accounts in Supabase Auth
INSERT INTO public.profiles (id, email, full_name, role, phone, university) VALUES
-- Test Admin (replace with actual UUID after creating in Supabase Auth)
('00000000-0000-0000-0000-000000000001', 'admin@dormify.com', 'Admin User', 'admin', '+234-800-000-0001', NULL),
-- Test Student (replace with actual UUID after creating in Supabase Auth)  
('00000000-0000-0000-0000-000000000002', 'student@test.com', 'Test Student', 'student', '+234-800-000-0002', 'University of Lagos'),
-- Test Landlord (replace with actual UUID after creating in Supabase Auth)
('00000000-0000-0000-0000-000000000003', 'landlord@test.com', 'Test Landlord', 'landlord', '+234-800-000-0003', NULL)
ON CONFLICT (id) DO NOTHING;
