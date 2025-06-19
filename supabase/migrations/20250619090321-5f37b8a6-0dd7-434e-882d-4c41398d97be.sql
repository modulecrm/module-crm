
-- Create subscription plans table
CREATE TABLE public.subscription_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    name VARCHAR NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    billing_interval VARCHAR NOT NULL CHECK (billing_interval IN ('monthly', 'yearly', 'weekly', 'custom')),
    billing_interval_count INTEGER DEFAULT 1,
    trial_period_days INTEGER DEFAULT 0,
    features JSONB DEFAULT '[]',
    metadata JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT TRUE,
    tier VARCHAR CHECK (tier IN ('basic', 'premium', 'enterprise'))
);

-- Create subscriptions table
CREATE TABLE public.subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    plan_id UUID REFERENCES public.subscription_plans(id),
    status VARCHAR NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'canceled', 'past_due', 'unpaid', 'trialing', 'paused')),
    current_period_start TIMESTAMP WITH TIME ZONE,
    current_period_end TIMESTAMP WITH TIME ZONE,
    trial_end TIMESTAMP WITH TIME ZONE,
    cancel_at_period_end BOOLEAN DEFAULT FALSE,
    canceled_at TIMESTAMP WITH TIME ZONE,
    stripe_subscription_id VARCHAR UNIQUE,
    metadata JSONB DEFAULT '{}'
);

-- Create invoices table
CREATE TABLE public.invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    subscription_id UUID REFERENCES public.subscriptions(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    status VARCHAR NOT NULL CHECK (status IN ('draft', 'open', 'paid', 'void', 'uncollectible')),
    due_date DATE,
    paid_at TIMESTAMP WITH TIME ZONE,
    invoice_number VARCHAR UNIQUE,
    stripe_invoice_id VARCHAR UNIQUE,
    metadata JSONB DEFAULT '{}'
);

-- Create payment methods table
CREATE TABLE public.payment_methods (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    stripe_payment_method_id VARCHAR UNIQUE,
    type VARCHAR NOT NULL CHECK (type IN ('card', 'bank_account', 'paypal')),
    last_four VARCHAR(4),
    brand VARCHAR,
    exp_month INTEGER,
    exp_year INTEGER,
    is_default BOOLEAN DEFAULT FALSE,
    metadata JSONB DEFAULT '{}'
);

-- Create usage records table for metered billing
CREATE TABLE public.usage_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    subscription_id UUID REFERENCES public.subscriptions(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT now(),
    action VARCHAR,
    metadata JSONB DEFAULT '{}'
);

-- Create subscription add-ons table
CREATE TABLE public.subscription_addons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subscription_id UUID REFERENCES public.subscriptions(id) ON DELETE CASCADE,
    name VARCHAR NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    quantity INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create churn prediction table for AI features
CREATE TABLE public.churn_predictions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    subscription_id UUID REFERENCES public.subscriptions(id) ON DELETE CASCADE,
    risk_score DECIMAL(3,2) CHECK (risk_score >= 0 AND risk_score <= 1),
    predicted_churn_date DATE,
    factors JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Insert default subscription plans
INSERT INTO public.subscription_plans (name, description, price, tier, billing_interval, features) VALUES
('Basic Plan', 'Essential features for small teams', 9.99, 'basic', 'monthly', '["CRM Core", "Basic Support", "5 Users"]'),
('Premium Plan', 'Advanced features for growing businesses', 29.99, 'premium', 'monthly', '["CRM Core", "Sales Pipeline", "Booking System", "Priority Support", "25 Users"]'),
('Enterprise Plan', 'Full feature set for large organizations', 99.99, 'enterprise', 'monthly', '["All Features", "Custom Integration", "Dedicated Support", "Unlimited Users", "API Access"]');

-- Enable Row Level Security
ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_methods ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usage_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscription_addons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.churn_predictions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for subscription_plans (public read access)
CREATE POLICY "Anyone can view subscription plans" ON public.subscription_plans FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage subscription plans" ON public.subscription_plans FOR ALL USING (true);

-- Create RLS policies for subscriptions
CREATE POLICY "Users can view own subscriptions" ON public.subscriptions FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can insert own subscriptions" ON public.subscriptions FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can update own subscriptions" ON public.subscriptions FOR UPDATE USING (user_id = auth.uid());

-- Create RLS policies for invoices
CREATE POLICY "Users can view own invoices" ON public.invoices FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "System can manage invoices" ON public.invoices FOR ALL USING (true);

-- Create RLS policies for payment_methods
CREATE POLICY "Users can view own payment methods" ON public.payment_methods FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can manage own payment methods" ON public.payment_methods FOR ALL USING (user_id = auth.uid());

-- Create RLS policies for usage_records
CREATE POLICY "Users can view own usage records" ON public.usage_records FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "System can manage usage records" ON public.usage_records FOR ALL USING (true);

-- Create RLS policies for subscription_addons
CREATE POLICY "Users can view subscription addons" ON public.subscription_addons FOR SELECT USING (
    subscription_id IN (SELECT id FROM public.subscriptions WHERE user_id = auth.uid())
);
CREATE POLICY "System can manage subscription addons" ON public.subscription_addons FOR ALL USING (true);

-- Create RLS policies for churn_predictions
CREATE POLICY "Users can view own churn predictions" ON public.churn_predictions FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "System can manage churn predictions" ON public.churn_predictions FOR ALL USING (true);

-- Create indexes for better performance
CREATE INDEX idx_subscriptions_user_id ON public.subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON public.subscriptions(status);
CREATE INDEX idx_invoices_user_id ON public.invoices(user_id);
CREATE INDEX idx_invoices_subscription_id ON public.invoices(subscription_id);
CREATE INDEX idx_payment_methods_user_id ON public.payment_methods(user_id);
CREATE INDEX idx_usage_records_subscription_id ON public.usage_records(subscription_id);
CREATE INDEX idx_churn_predictions_user_id ON public.churn_predictions(user_id);

-- Create trigger for updated_at timestamps
CREATE TRIGGER update_subscription_plans_updated_at BEFORE UPDATE ON public.subscription_plans FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON public.subscriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_churn_predictions_updated_at BEFORE UPDATE ON public.churn_predictions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
