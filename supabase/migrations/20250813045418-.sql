-- Prevent duplicate active bookings (pending/approved) per student per property
CREATE UNIQUE INDEX IF NOT EXISTS bookings_unique_active_per_student_property
ON public.bookings (student_id, property_id)
WHERE status IN ('pending','approved') AND student_id IS NOT NULL AND property_id IS NOT NULL;