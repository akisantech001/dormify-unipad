-- Secure profiles updates: prevent non-admins from changing protected fields
-- 1) Create/replace trigger to enforce protected fields on profiles
DROP TRIGGER IF EXISTS enforce_protected_profile_fields_trigger ON public.profiles;

CREATE TRIGGER enforce_protected_profile_fields_trigger
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.enforce_protected_profile_fields();