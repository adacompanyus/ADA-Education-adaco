-- Fix function search path security issue
CREATE OR REPLACE FUNCTION public.reset_daily_prompts()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Reset daily prompts if it's a new day
  IF NEW.date > OLD.date THEN
    NEW.daily_prompts_used = 0;
  END IF;
  
  -- Reset monthly prompts if it's a new month
  IF EXTRACT(month FROM NEW.date) != EXTRACT(month FROM OLD.date) OR 
     EXTRACT(year FROM NEW.date) != EXTRACT(year FROM OLD.date) THEN
    NEW.monthly_prompts_used = 0;
  END IF;
  
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;