-- Fix RLS policies for stripe_customers table to allow edge functions to insert and update
CREATE POLICY "Edge functions can insert customer data" ON public.stripe_customers
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Edge functions can update customer data" ON public.stripe_customers  
FOR UPDATE
USING (true);

-- Fix RLS policies for stripe_subscriptions table to allow edge functions to insert and update
CREATE POLICY "Edge functions can insert subscription data" ON public.stripe_subscriptions
FOR INSERT  
WITH CHECK (true);

CREATE POLICY "Edge functions can update subscription data" ON public.stripe_subscriptions
FOR UPDATE
USING (true);