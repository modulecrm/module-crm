
-- Update RLS policies to allow anonymous users to insert customers for testing
-- This is temporary for development/testing purposes

-- Drop the existing insert policy that requires authentication
DROP POLICY IF EXISTS "Users can insert customers" ON public.customers;

-- Create a new policy that allows both authenticated users and anonymous users to insert
CREATE POLICY "Users can insert customers" ON public.customers 
FOR INSERT 
WITH CHECK (
  -- Allow if user is authenticated and created_by matches auth.uid()
  (auth.uid() IS NOT NULL AND created_by = auth.uid()) 
  OR 
  -- Allow anonymous users (for testing/demo purposes)
  (auth.uid() IS NULL)
);

-- Also update the select policy to allow viewing customers without authentication for demo
DROP POLICY IF EXISTS "Users can view all customers" ON public.customers;

CREATE POLICY "Users can view all customers" ON public.customers 
FOR SELECT 
USING (true); -- Allow all users to view customers
