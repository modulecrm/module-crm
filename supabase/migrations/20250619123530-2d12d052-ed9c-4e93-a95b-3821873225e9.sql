
-- Clean up the customers table RLS policies to ensure proper user isolation
DROP POLICY IF EXISTS "Users can view own customers or unassigned" ON public.customers;
DROP POLICY IF EXISTS "Users can insert own customers" ON public.customers;
DROP POLICY IF EXISTS "Users can update own customers or unassigned" ON public.customers;
DROP POLICY IF EXISTS "Users can delete own customers or unassigned" ON public.customers;

-- Make user_id NOT NULL for new customers (existing NULL values will be preserved temporarily)
-- We'll update the default to ensure new customers always have a user_id
ALTER TABLE public.customers ALTER COLUMN user_id SET DEFAULT auth.uid();

-- Create secure RLS policies that only allow users to see their own customers
CREATE POLICY "Users can view own customers" ON public.customers
FOR SELECT TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Users can insert own customers" ON public.customers
FOR INSERT TO authenticated
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own customers" ON public.customers
FOR UPDATE TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete own customers" ON public.customers
FOR DELETE TO authenticated
USING (user_id = auth.uid());

-- Update existing customers that have NULL user_id to have proper ownership
-- This is a one-time cleanup - in production you'd need to decide how to handle orphaned records
UPDATE public.customers 
SET user_id = created_by 
WHERE user_id IS NULL AND created_by IS NOT NULL;

-- Apply similar policies to other related tables
DROP POLICY IF EXISTS "Users can view own deals or unassigned" ON public.deals;
DROP POLICY IF EXISTS "Users can insert own deals" ON public.deals;
DROP POLICY IF EXISTS "Users can update own deals or unassigned" ON public.deals;
DROP POLICY IF EXISTS "Users can delete own deals or unassigned" ON public.deals;

CREATE POLICY "Users can view own deals" ON public.deals
FOR SELECT TO authenticated
USING (user_id = auth.uid() OR customer_id IN (SELECT id FROM public.customers WHERE user_id = auth.uid()));

CREATE POLICY "Users can insert own deals" ON public.deals
FOR INSERT TO authenticated
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own deals" ON public.deals
FOR UPDATE TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete own deals" ON public.deals
FOR DELETE TO authenticated
USING (user_id = auth.uid());

-- Set default for deals user_id as well
ALTER TABLE public.deals ALTER COLUMN user_id SET DEFAULT auth.uid();

-- Update activities table policies
CREATE POLICY "Users can view own activities" ON public.activities
FOR SELECT TO authenticated
USING (user_id = auth.uid() OR customer_id IN (SELECT id FROM public.customers WHERE user_id = auth.uid()));

CREATE POLICY "Users can insert own activities" ON public.activities
FOR INSERT TO authenticated
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own activities" ON public.activities
FOR UPDATE TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete own activities" ON public.activities
FOR DELETE TO authenticated
USING (user_id = auth.uid());

ALTER TABLE public.activities ALTER COLUMN user_id SET DEFAULT auth.uid();

-- Update tasks table policies
CREATE POLICY "Users can view own tasks" ON public.tasks
FOR SELECT TO authenticated
USING (user_id = auth.uid() OR customer_id IN (SELECT id FROM public.customers WHERE user_id = auth.uid()));

CREATE POLICY "Users can insert own tasks" ON public.tasks
FOR INSERT TO authenticated
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own tasks" ON public.tasks
FOR UPDATE TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete own tasks" ON public.tasks
FOR DELETE TO authenticated
USING (user_id = auth.uid());

ALTER TABLE public.tasks ALTER COLUMN user_id SET DEFAULT auth.uid();

-- Update communications table policies
CREATE POLICY "Users can view own communications" ON public.communications
FOR SELECT TO authenticated
USING (user_id = auth.uid() OR customer_id IN (SELECT id FROM public.customers WHERE user_id = auth.uid()));

CREATE POLICY "Users can insert own communications" ON public.communications
FOR INSERT TO authenticated
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own communications" ON public.communications
FOR UPDATE TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete own communications" ON public.communications
FOR DELETE TO authenticated
USING (user_id = auth.uid());

ALTER TABLE public.communications ALTER COLUMN user_id SET DEFAULT auth.uid();
