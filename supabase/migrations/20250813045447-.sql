-- Deduplicate existing active bookings by keeping the most recent per (student_id, property_id)
WITH ranked AS (
  SELECT id,
         student_id,
         property_id,
         status,
         created_at,
         ROW_NUMBER() OVER (
           PARTITION BY student_id, property_id
           ORDER BY created_at DESC, id DESC
         ) AS rn
  FROM public.bookings
  WHERE status IN ('pending','approved')
)
UPDATE public.bookings b
SET status = 'rejected', updated_at = now()
FROM ranked r
WHERE b.id = r.id AND r.rn > 1;

-- Now enforce uniqueness for active bookings
CREATE UNIQUE INDEX IF NOT EXISTS bookings_unique_active_per_student_property
ON public.bookings (student_id, property_id)
WHERE status IN ('pending','approved') AND student_id IS NOT NULL AND property_id IS NOT NULL;