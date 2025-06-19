
-- Create customers/contacts table with unified profiles
CREATE TABLE public.customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    name VARCHAR NOT NULL,
    email VARCHAR UNIQUE,
    phone VARCHAR,
    company VARCHAR,
    title VARCHAR,
    industry VARCHAR,
    status VARCHAR DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'potential', 'churned')),
    lead_score INTEGER DEFAULT 0,
    address JSONB,
    custom_fields JSONB DEFAULT '{}',
    tags TEXT[],
    created_by UUID REFERENCES auth.users(id),
    assigned_to UUID REFERENCES auth.users(id),
    notes TEXT
);

-- Create deals/opportunities table
CREATE TABLE public.deals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    title VARCHAR NOT NULL,
    customer_id UUID REFERENCES public.customers(id) ON DELETE CASCADE,
    value DECIMAL(12,2),
    currency VARCHAR(3) DEFAULT 'USD',
    stage VARCHAR NOT NULL DEFAULT 'prospect',
    probability INTEGER DEFAULT 0 CHECK (probability >= 0 AND probability <= 100),
    expected_close_date DATE,
    actual_close_date DATE,
    source VARCHAR,
    description TEXT,
    assigned_to UUID REFERENCES auth.users(id),
    created_by UUID REFERENCES auth.users(id),
    custom_fields JSONB DEFAULT '{}'
);

-- Create activities/interactions table
CREATE TABLE public.activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    type VARCHAR NOT NULL CHECK (type IN ('call', 'email', 'meeting', 'task', 'note', 'sms', 'chat')),
    subject VARCHAR NOT NULL,
    description TEXT,
    customer_id UUID REFERENCES public.customers(id) ON DELETE CASCADE,
    deal_id UUID REFERENCES public.deals(id) ON DELETE SET NULL,
    completed BOOLEAN DEFAULT FALSE,
    due_date TIMESTAMP WITH TIME ZONE,
    completed_date TIMESTAMP WITH TIME ZONE,
    assigned_to UUID REFERENCES auth.users(id),
    created_by UUID REFERENCES auth.users(id),
    metadata JSONB DEFAULT '{}'
);

-- Create sales pipeline stages table
CREATE TABLE public.pipeline_stages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR NOT NULL,
    position INTEGER NOT NULL,
    color VARCHAR DEFAULT '#3B82F6',
    probability_default INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Insert default pipeline stages
INSERT INTO public.pipeline_stages (name, position, probability_default) VALUES
('Prospect', 1, 10),
('Qualified', 2, 25),
('Proposal', 3, 50),
('Negotiation', 4, 75),
('Closed Won', 5, 100),
('Closed Lost', 6, 0);

-- Create communication log table
CREATE TABLE public.communications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    type VARCHAR NOT NULL CHECK (type IN ('email', 'call', 'sms', 'chat', 'meeting')),
    direction VARCHAR NOT NULL CHECK (direction IN ('inbound', 'outbound')),
    subject VARCHAR,
    content TEXT,
    customer_id UUID REFERENCES public.customers(id) ON DELETE CASCADE,
    deal_id UUID REFERENCES public.deals(id) ON DELETE SET NULL,
    created_by UUID REFERENCES auth.users(id),
    metadata JSONB DEFAULT '{}'
);

-- Create tasks table
CREATE TABLE public.tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    title VARCHAR NOT NULL,
    description TEXT,
    priority VARCHAR DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    status VARCHAR DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
    due_date TIMESTAMP WITH TIME ZONE,
    completed_date TIMESTAMP WITH TIME ZONE,
    customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL,
    deal_id UUID REFERENCES public.deals(id) ON DELETE SET NULL,
    assigned_to UUID REFERENCES auth.users(id),
    created_by UUID REFERENCES auth.users(id)
);

-- Create user profiles table for team management
CREATE TABLE public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    full_name VARCHAR,
    avatar_url VARCHAR,
    role VARCHAR DEFAULT 'sales_rep' CHECK (role IN ('admin', 'manager', 'sales_rep', 'support_agent', 'marketing')),
    permissions JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT TRUE
);

-- Enable Row Level Security
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.communications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pipeline_stages ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for customers table
CREATE POLICY "Users can view all customers" ON public.customers FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can insert customers" ON public.customers FOR INSERT TO authenticated WITH CHECK (created_by = auth.uid());
CREATE POLICY "Users can update customers" ON public.customers FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Users can delete customers" ON public.customers FOR DELETE TO authenticated USING (created_by = auth.uid());

-- Create RLS policies for deals table
CREATE POLICY "Users can view all deals" ON public.deals FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can insert deals" ON public.deals FOR INSERT TO authenticated WITH CHECK (created_by = auth.uid());
CREATE POLICY "Users can update deals" ON public.deals FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Users can delete deals" ON public.deals FOR DELETE TO authenticated USING (created_by = auth.uid());

-- Create RLS policies for activities table
CREATE POLICY "Users can view all activities" ON public.activities FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can insert activities" ON public.activities FOR INSERT TO authenticated WITH CHECK (created_by = auth.uid());
CREATE POLICY "Users can update activities" ON public.activities FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Users can delete activities" ON public.activities FOR DELETE TO authenticated USING (created_by = auth.uid());

-- Create RLS policies for communications table
CREATE POLICY "Users can view all communications" ON public.communications FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can insert communications" ON public.communications FOR INSERT TO authenticated WITH CHECK (created_by = auth.uid());
CREATE POLICY "Users can update communications" ON public.communications FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Users can delete communications" ON public.communications FOR DELETE TO authenticated USING (created_by = auth.uid());

-- Create RLS policies for tasks table
CREATE POLICY "Users can view all tasks" ON public.tasks FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can insert tasks" ON public.tasks FOR INSERT TO authenticated WITH CHECK (created_by = auth.uid());
CREATE POLICY "Users can update tasks" ON public.tasks FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Users can delete tasks" ON public.tasks FOR DELETE TO authenticated USING (created_by = auth.uid());

-- Create RLS policies for user_profiles table
CREATE POLICY "Users can view all profiles" ON public.user_profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can insert own profile" ON public.user_profiles FOR INSERT TO authenticated WITH CHECK (id = auth.uid());
CREATE POLICY "Users can update own profile" ON public.user_profiles FOR UPDATE TO authenticated USING (id = auth.uid());

-- Create RLS policies for pipeline_stages table
CREATE POLICY "Users can view pipeline stages" ON public.pipeline_stages FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can manage pipeline stages" ON public.pipeline_stages FOR ALL TO authenticated USING (true);

-- Create indexes for better performance
CREATE INDEX idx_customers_email ON public.customers(email);
CREATE INDEX idx_customers_company ON public.customers(company);
CREATE INDEX idx_customers_status ON public.customers(status);
CREATE INDEX idx_customers_assigned_to ON public.customers(assigned_to);
CREATE INDEX idx_deals_customer_id ON public.deals(customer_id);
CREATE INDEX idx_deals_stage ON public.deals(stage);
CREATE INDEX idx_deals_assigned_to ON public.deals(assigned_to);
CREATE INDEX idx_activities_customer_id ON public.activities(customer_id);
CREATE INDEX idx_activities_deal_id ON public.activities(deal_id);
CREATE INDEX idx_activities_type ON public.activities(type);
CREATE INDEX idx_communications_customer_id ON public.communications(customer_id);
CREATE INDEX idx_tasks_assigned_to ON public.tasks(assigned_to);
CREATE INDEX idx_tasks_due_date ON public.tasks(due_date);

-- Create trigger for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON public.customers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_deals_updated_at BEFORE UPDATE ON public.deals FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_activities_updated_at BEFORE UPDATE ON public.activities FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON public.tasks FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON public.user_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
