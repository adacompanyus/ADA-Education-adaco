-- Create table to track user prompt usage
CREATE TABLE public.user_prompt_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  daily_prompts_used INTEGER NOT NULL DEFAULT 0,
  monthly_prompts_used INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, date)
);

-- Enable RLS
ALTER TABLE public.user_prompt_usage ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own prompt usage" 
ON public.user_prompt_usage 
FOR SELECT 
USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own prompt usage" 
ON public.user_prompt_usage 
FOR INSERT 
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own prompt usage" 
ON public.user_prompt_usage 
FOR UPDATE 
USING (user_id = auth.uid());

-- Function to reset daily prompts at midnight EST
CREATE OR REPLACE FUNCTION public.reset_daily_prompts()
RETURNS TRIGGER AS $$
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
$$ LANGUAGE plpgsql;

-- Create trigger for automatic resets
CREATE TRIGGER reset_prompts_on_date_change
  BEFORE UPDATE ON public.user_prompt_usage
  FOR EACH ROW
  EXECUTE FUNCTION public.reset_daily_prompts();