
-- Insert 20 fictitious tasks with varying priorities and due dates
INSERT INTO public.tasks (title, description, priority, status, due_date, created_by) VALUES
('Follow up with ABC Corp contract', 'Review and finalize contract terms with ABC Corporation', 'urgent', 'pending', '2025-06-21', (SELECT auth.uid())),
('Prepare quarterly sales report', 'Compile Q2 sales data and create presentation for board meeting', 'high', 'pending', '2025-06-23', (SELECT auth.uid())),
('Schedule demo for TechStart Inc', 'Set up product demonstration for potential client TechStart Inc', 'medium', 'pending', '2025-06-25', (SELECT auth.uid())),
('Update CRM customer data', 'Clean and update outdated customer information in the system', 'low', 'pending', '2025-06-30', (SELECT auth.uid())),
('Call back Johnson Industries', 'Return call regarding pricing inquiry from Johnson Industries', 'urgent', 'pending', '2025-06-20', (SELECT auth.uid())),
('Review marketing campaign metrics', 'Analyze performance data from recent email marketing campaign', 'medium', 'pending', '2025-06-28', (SELECT auth.uid())),
('Prepare proposal for MegaCorp', 'Create detailed proposal for MegaCorp enterprise solution', 'high', 'pending', '2025-06-22', (SELECT auth.uid())),
('Attend industry conference', 'Participate in SaaS Industry Summit 2025', 'medium', 'pending', '2025-07-05', (SELECT auth.uid())),
('Complete compliance audit', 'Finish security compliance documentation review', 'high', 'pending', '2025-06-24', (SELECT auth.uid())),
('Update product documentation', 'Revise user manual and API documentation', 'low', 'pending', '2025-07-10', (SELECT auth.uid())),
('Negotiate contract with GlobalTech', 'Finalize pricing and terms with GlobalTech partnership', 'urgent', 'pending', '2025-06-22', (SELECT auth.uid())),
('Onboard new team member', 'Complete orientation process for new sales representative', 'medium', 'pending', '2025-06-27', (SELECT auth.uid())),
('Analyze competitor pricing', 'Research and document competitor pricing strategies', 'low', 'pending', '2025-07-08', (SELECT auth.uid())),
('Present to venture capital firm', 'Pitch company growth strategy to VC partners', 'urgent', 'pending', '2025-06-21', (SELECT auth.uid())),
('Optimize sales funnel process', 'Review and improve lead conversion workflow', 'medium', 'pending', '2025-06-29', (SELECT auth.uid())),
('Conduct customer satisfaction survey', 'Send and analyze customer feedback questionnaire', 'low', 'pending', '2025-07-12', (SELECT auth.uid())),
('Renew software licenses', 'Process annual renewals for essential business software', 'high', 'pending', '2025-06-26', (SELECT auth.uid())),
('Plan team building event', 'Organize quarterly team building activity', 'low', 'pending', '2025-07-15', (SELECT auth.uid())),
('Review budget allocation', 'Analyze Q3 budget and adjust spending priorities', 'medium', 'pending', '2025-06-26', (SELECT auth.uid())),
('Submit regulatory filing', 'Complete and submit required business compliance documents', 'high', 'pending', '2025-06-25', (SELECT auth.uid()));
