
-- Insert fictitious feature requests across all categories
INSERT INTO public.feature_requests (title, description, module, status, created_by, vote_count) VALUES
-- Dashboard requests
('Real-time Analytics Dashboard', 'Add real-time data visualization with live charts that update every few seconds to show current metrics and KPIs.', 'dashboard', 'open', (SELECT id FROM auth.users LIMIT 1), 15),
('Customizable Widget Layout', 'Allow users to drag and drop widgets on the dashboard to create their own personalized layout and save multiple dashboard views.', 'dashboard', 'in_progress', (SELECT id FROM auth.users LIMIT 1), 23),
('Dark Mode Theme', 'Implement a dark mode theme for the dashboard with automatic switching based on system preferences.', 'dashboard', 'open', (SELECT id FROM auth.users LIMIT 1), 31),
('Export Dashboard Reports', 'Add functionality to export dashboard data as PDF, Excel, or CSV files with scheduled automated reports.', 'dashboard', 'open', (SELECT id FROM auth.users LIMIT 1), 8),

-- CRM requests
('Advanced Lead Scoring', 'Implement AI-powered lead scoring system that automatically ranks leads based on behavior, demographics, and engagement.', 'crm', 'open', (SELECT id FROM auth.users LIMIT 1), 42),
('Email Integration with Gmail/Outlook', 'Native integration with Gmail and Outlook to sync emails, track conversations, and log communication automatically.', 'crm', 'in_progress', (SELECT id FROM auth.users LIMIT 1), 67),
('Mobile CRM App', 'Develop a mobile application for iOS and Android to access CRM data, update records, and manage tasks on the go.', 'crm', 'open', (SELECT id FROM auth.users LIMIT 1), 55),
('Automated Follow-up Sequences', 'Create automated email and task sequences based on customer actions and timeline triggers.', 'crm', 'completed', (SELECT id FROM auth.users LIMIT 1), 34),
('Social Media Integration', 'Connect with LinkedIn, Twitter, and Facebook to pull social data and track social interactions with leads.', 'crm', 'open', (SELECT id FROM auth.users LIMIT 1), 28),

-- Invoice requests
('Recurring Invoice Templates', 'Create templates for recurring invoices with automatic generation and sending capabilities for subscription-based services.', 'invoice', 'open', (SELECT id FROM auth.users LIMIT 1), 19),
('Multi-currency Support', 'Add support for multiple currencies with real-time exchange rates and automatic conversion for international clients.', 'invoice', 'in_progress', (SELECT id FROM auth.users LIMIT 1), 45),
('Invoice Approval Workflow', 'Implement approval workflow where invoices require manager approval before sending to clients, with email notifications.', 'invoice', 'open', (SELECT id FROM auth.users LIMIT 1), 12),
('Payment Gateway Integration', 'Integrate with Stripe, PayPal, and Square to allow clients to pay invoices directly online with one-click payments.', 'invoice', 'open', (SELECT id FROM auth.users LIMIT 1), 58),
('Invoice Analytics Dashboard', 'Create analytics showing payment trends, overdue invoices, revenue forecasting, and client payment behavior.', 'invoice', 'on_hold', (SELECT id FROM auth.users LIMIT 1), 7),

-- Booking requests
('Calendar Sync Integration', 'Two-way sync with Google Calendar, Outlook, and Apple Calendar to prevent double bookings and sync appointments.', 'booking', 'open', (SELECT id FROM auth.users LIMIT 1), 39),
('Resource Management System', 'Manage bookable resources like meeting rooms, equipment, and staff with availability tracking and conflict prevention.', 'booking', 'open', (SELECT id FROM auth.users LIMIT 1), 26),
('Automated Booking Confirmations', 'Send automatic email and SMS confirmations, reminders, and follow-ups for appointments with custom templates.', 'booking', 'completed', (SELECT id FROM auth.users LIMIT 1), 41),
('Online Booking Widget', 'Embeddable booking widget for websites that allows customers to book appointments directly without leaving the site.', 'booking', 'in_progress', (SELECT id FROM auth.users LIMIT 1), 52),
('Waitlist Management', 'Automatic waitlist system that fills cancelled appointments and notifies customers of available slots.', 'booking', 'open', (SELECT id FROM auth.users LIMIT 1), 18),

-- Subscription requests
('Usage-based Billing', 'Implement metered billing for usage-based subscriptions with automatic calculation and proration capabilities.', 'subscription', 'open', (SELECT id FROM auth.users LIMIT 1), 33),
('Customer Self-service Portal', 'Allow customers to upgrade/downgrade plans, update payment methods, and view billing history through a self-service portal.', 'subscription', 'in_progress', (SELECT id FROM auth.users LIMIT 1), 29),
('Dunning Management', 'Automated dunning process for failed payments with customizable retry logic and communication sequences.', 'subscription', 'open', (SELECT id FROM auth.users LIMIT 1), 16),
('Subscription Analytics', 'Comprehensive analytics showing MRR, churn rate, LTV, cohort analysis, and subscription health metrics.', 'subscription', 'open', (SELECT id FROM auth.users LIMIT 1), 47),
('Plan Comparison Tool', 'Interactive tool that helps customers compare subscription plans with feature matrices and pricing calculators.', 'subscription', 'rejected', (SELECT id FROM auth.users LIMIT 1), 5);
