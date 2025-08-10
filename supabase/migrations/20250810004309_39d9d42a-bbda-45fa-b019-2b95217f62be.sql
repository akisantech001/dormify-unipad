-- Storage policies for property-images bucket
-- Public read access
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Public can view property-images'
  ) THEN
    CREATE POLICY "Public can view property-images"
    ON storage.objects
    FOR SELECT
    USING (bucket_id = 'property-images');
  END IF;
END $$;

-- Authenticated users can upload to their own folder
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Users can upload to their own folder (property-images)'
  ) THEN
    CREATE POLICY "Users can upload to their own folder (property-images)"
    ON storage.objects
    FOR INSERT
    TO authenticated
    WITH CHECK (
      bucket_id = 'property-images'
      AND auth.uid()::text = (storage.foldername(name))[1]
    );
  END IF;
END $$;

-- Authenticated users can update their own files
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Users can update their own files (property-images)'
  ) THEN
    CREATE POLICY "Users can update their own files (property-images)"
    ON storage.objects
    FOR UPDATE
    TO authenticated
    USING (
      bucket_id = 'property-images'
      AND auth.uid()::text = (storage.foldername(name))[1]
    )
    WITH CHECK (
      bucket_id = 'property-images'
      AND auth.uid()::text = (storage.foldername(name))[1]
    );
  END IF;
END $$;

-- Authenticated users can delete their own files
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Users can delete their own files (property-images)'
  ) THEN
    CREATE POLICY "Users can delete their own files (property-images)"
    ON storage.objects
    FOR DELETE
    TO authenticated
    USING (
      bucket_id = 'property-images'
      AND auth.uid()::text = (storage.foldername(name))[1]
    );
  END IF;
END $$;