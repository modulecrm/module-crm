
-- Create products/services catalog table
CREATE TABLE public.invoice_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR NOT NULL,
  description TEXT,
  sku VARCHAR UNIQUE,
  price DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  vat_rate DECIMAL(5,2) DEFAULT 0,
  category VARCHAR,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create invoice templates table
CREATE TABLE public.invoice_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR NOT NULL,
  is_default BOOLEAN DEFAULT false,
  template_data JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create main invoices table (extending existing one if needed)
CREATE TABLE IF NOT EXISTS public.invoices_extended (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_number VARCHAR UNIQUE NOT NULL,
  customer_id UUID REFERENCES public.customers(id),
  deal_id UUID REFERENCES public.deals(id),
  subscription_id UUID REFERENCES public.subscriptions(id),
  template_id UUID REFERENCES public.invoice_templates(id),
  status VARCHAR NOT NULL DEFAULT 'draft',
  subtotal DECIMAL(10,2) NOT NULL DEFAULT 0,
  tax_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
  discount_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
  total_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
  currency VARCHAR(3) DEFAULT 'USD',
  due_date DATE,
  payment_terms VARCHAR DEFAULT 'Net 30',
  notes TEXT,
  metadata JSONB DEFAULT '{}',
  is_recurring BOOLEAN DEFAULT false,
  recurring_frequency VARCHAR,
  next_invoice_date DATE,
  created_by UUID,
  approved_by UUID,
  approved_at TIMESTAMPTZ,
  sent_at TIMESTAMPTZ,
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create invoice line items table
CREATE TABLE public.invoice_line_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id UUID REFERENCES public.invoices_extended(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.invoice_products(id),
  description TEXT NOT NULL,
  quantity DECIMAL(10,2) NOT NULL DEFAULT 1,
  unit_price DECIMAL(10,2) NOT NULL,
  discount_percentage DECIMAL(5,2) DEFAULT 0,
  tax_rate DECIMAL(5,2) DEFAULT 0,
  line_total DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create invoice workflows table
CREATE TABLE public.invoice_workflows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR NOT NULL,
  trigger_type VARCHAR NOT NULL, -- 'booking_confirmed', 'subscription_renewed', 'milestone_completed'
  trigger_conditions JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  requires_approval BOOLEAN DEFAULT false,
  template_id UUID REFERENCES public.invoice_templates(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create payment reminders table
CREATE TABLE public.payment_reminders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id UUID REFERENCES public.invoices_extended(id) ON DELETE CASCADE,
  reminder_type VARCHAR NOT NULL, -- 'due_soon', 'overdue', 'second_notice'
  sent_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  email_content TEXT,
  status VARCHAR DEFAULT 'sent'
);

-- Enable RLS on all tables
ALTER TABLE public.invoice_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoice_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices_extended ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoice_line_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoice_workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_reminders ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for invoice_products
CREATE POLICY "Users can view all products" ON public.invoice_products
FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage products" ON public.invoice_products
FOR ALL USING (auth.uid() IS NOT NULL);

-- Create RLS policies for invoice_templates
CREATE POLICY "Users can view all templates" ON public.invoice_templates
FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage templates" ON public.invoice_templates
FOR ALL USING (auth.uid() IS NOT NULL);

-- Create RLS policies for invoices_extended
CREATE POLICY "Users can view invoices they created or are assigned to" ON public.invoices_extended
FOR SELECT USING (
  auth.uid() = created_by OR 
  auth.uid() IN (
    SELECT assigned_to FROM public.customers WHERE id = customer_id
  )
);

CREATE POLICY "Users can manage invoices they created" ON public.invoices_extended
FOR ALL USING (auth.uid() = created_by);

-- Create RLS policies for invoice_line_items
CREATE POLICY "Users can view line items for accessible invoices" ON public.invoice_line_items
FOR SELECT USING (
  invoice_id IN (
    SELECT id FROM public.invoices_extended WHERE 
    auth.uid() = created_by OR 
    auth.uid() IN (
      SELECT assigned_to FROM public.customers WHERE id = customer_id
    )
  )
);

CREATE POLICY "Users can manage line items for their invoices" ON public.invoice_line_items
FOR ALL USING (
  invoice_id IN (
    SELECT id FROM public.invoices_extended WHERE auth.uid() = created_by
  )
);

-- Create RLS policies for workflows and reminders
CREATE POLICY "Authenticated users can manage workflows" ON public.invoice_workflows
FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can view reminders for their invoices" ON public.payment_reminders
FOR SELECT USING (
  invoice_id IN (
    SELECT id FROM public.invoices_extended WHERE auth.uid() = created_by
  )
);

-- Create triggers for updated_at
CREATE TRIGGER update_invoice_products_updated_at
BEFORE UPDATE ON public.invoice_products
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_invoice_templates_updated_at
BEFORE UPDATE ON public.invoice_templates
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_invoices_extended_updated_at
BEFORE UPDATE ON public.invoices_extended
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_invoice_workflows_updated_at
BEFORE UPDATE ON public.invoice_workflows
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default invoice template
INSERT INTO public.invoice_templates (name, is_default, template_data) VALUES 
('Default Template', true, '{"logo": "", "colors": {"primary": "#3B82F6", "secondary": "#6B7280"}, "fonts": {"header": "Arial", "body": "Arial"}}');

-- Insert sample products
INSERT INTO public.invoice_products (name, description, sku, price, category, vat_rate) VALUES 
('Hot Desk Daily', 'Hot desk access for one day', 'HD-001', 25.00, 'Workspace', 25.00),
('Meeting Room Hour', 'Meeting room rental per hour', 'MR-001', 15.00, 'Meeting Rooms', 25.00),
('Virtual Office Monthly', 'Virtual office package per month', 'VO-001', 99.00, 'Virtual Services', 25.00),
('Printing Credits', 'Printing and scanning credits', 'PR-001', 0.10, 'Add-ons', 25.00);
