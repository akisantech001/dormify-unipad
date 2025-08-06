-- Allow admins to insert properties
CREATE POLICY "Admins can insert properties" 
ON public.properties 
FOR INSERT 
WITH CHECK (is_admin(auth.uid()));