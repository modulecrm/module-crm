
-- Phase 1: Critical RLS Policy Fixes (Fixed version)
-- Add user_id columns to tables that need user ownership

-- Add user_id to customers table for proper ownership (allow NULL temporarily)
ALTER TABLE public.customers ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);

-- Add user_id to other tables
ALTER TABLE public.deals ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);
ALTER TABLE public.activities ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);
ALTER TABLE public.communications ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);
ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);

-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Users can view all customers" ON public.customers;
DROP POLICY IF EXISTS "Users can insert customers" ON public.customers;
DROP POLICY IF EXISTS "Users can update customers" ON public.customers;
DROP POLICY IF EXISTS "Users can delete customers" ON public.customers;

-- Create user roles system for admin access
CREATE TYPE public.app_role AS ENUM ('admin', 'manager', 'sales_rep', 'support_agent', 'marketing');

CREATE TABLE IF NOT EXISTS public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check user roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create secure RLS policies for customers table that handle NULL user_id
-- This allows existing data to be visible until proper ownership is assigned
CREATE POLICY "Users can view own customers or unassigned" ON public.customers
FOR SELECT TO authenticated
USING (user_id = auth.uid() OR user_id IS NULL OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can insert own customers" ON public.customers
FOR INSERT TO authenticated
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own customers or unassigned" ON public.customers
FOR UPDATE TO authenticated
USING (user_id = auth.uid() OR user_id IS NULL OR public.has_role(auth.uid(), 'admin'))
WITH CHECK (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can delete own customers or unassigned" ON public.customers
FOR DELETE TO authenticated
USING (user_id = auth.uid() OR user_id IS NULL OR public.has_role(auth.uid(), 'admin'));

-- Create policies for other tables (similar pattern)
CREATE POLICY "Users can view own deals or unassigned" ON public.deals
FOR SELECT TO authenticated
USING (user_id = auth.uid() OR user_id IS NULL OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can insert own deals" ON public.deals
FOR INSERT TO authenticated
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own deals or unassigned" ON public.deals
FOR UPDATE TO authenticated
USING (user_id = auth.uid() OR user_id IS NULL OR public.has_role(auth.uid(), 'admin'))
WITH CHECK (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can delete own deals or unassigned" ON public.deals
FOR DELETE TO authenticated
USING (user_id = auth.uid() OR user_id IS NULL OR public.has_role(auth.uid(), 'admin'));

-- User roles policies
CREATE POLICY "Users can view own roles" ON public.user_roles
FOR SELECT TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Admins can manage all user roles" ON public.user_roles
FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));
