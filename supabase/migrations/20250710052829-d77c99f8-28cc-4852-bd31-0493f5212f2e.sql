
-- First, ensure the user_role enum exists and includes admin
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
        CREATE TYPE user_role AS ENUM ('student', 'landlord', 'admin');
    ELSE
        -- Add admin to existing enum if it doesn't exist
        IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'admin' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'user_role')) THEN
            ALTER TYPE user_role ADD VALUE 'admin';
        END IF;
    END IF;
END $$;

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
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admins can view all profiles' AND tablename = 'profiles') THEN
        CREATE POLICY "Admins can view all profiles" 
          ON public.profiles 
          FOR SELECT 
          USING (public.is_admin(auth.uid()));
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admins can update all profiles' AND tablename = 'profiles') THEN
        CREATE POLICY "Admins can update all profiles" 
          ON public.profiles 
          FOR UPDATE 
          USING (public.is_admin(auth.uid()));
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admins can view all properties' AND tablename = 'properties') THEN
        CREATE POLICY "Admins can view all properties" 
          ON public.properties 
          FOR SELECT 
          USING (public.is_admin(auth.uid()));
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admins can update all properties' AND tablename = 'properties') THEN
        CREATE POLICY "Admins can update all properties" 
          ON public.properties 
          FOR UPDATE 
          USING (public.is_admin(auth.uid()));
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admins can delete all properties' AND tablename = 'properties') THEN
        CREATE POLICY "Admins can delete all properties" 
          ON public.properties 
          FOR DELETE 
          USING (public.is_admin(auth.uid()));
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admins can view all bookings' AND tablename = 'bookings') THEN
        CREATE POLICY "Admins can view all bookings" 
          ON public.bookings 
          FOR SELECT 
          USING (public.is_admin(auth.uid()));
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admins can update all bookings' AND tablename = 'bookings') THEN
        CREATE POLICY "Admins can update all bookings" 
          ON public.bookings 
          FOR UPDATE 
          USING (public.is_admin(auth.uid()));
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admins can delete all bookings' AND tablename = 'bookings') THEN
        CREATE POLICY "Admins can delete all bookings" 
          ON public.bookings 
          FOR DELETE 
          USING (public.is_admin(auth.uid()));
    END IF;
END $$;
