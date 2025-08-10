-- Ensure students/users can add favorites while respecting RLS
CREATE POLICY IF NOT EXISTS "Users can insert their own favorites"
ON public.favorites
FOR INSERT
WITH CHECK (auth.uid() = user_id);
