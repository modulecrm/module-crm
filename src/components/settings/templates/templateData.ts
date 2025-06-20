
import { Users, FileText, Calendar, CreditCard, MessageSquare, LifeBuoy, Send, Mail, File } from 'lucide-react';
import { Template, ModuleOption, TemplateCategory } from './types';

export const moduleTemplates: Record<string, Template[]> = {
  crm: [
    { id: '1', name: 'Welcome Email', isDefault: true, description: 'New customer welcome message' },
    { id: '2', name: 'Follow-up Email', isDefault: false, description: 'Customer follow-up after meeting' },
    { id: '3', name: 'Quote Follow-up', isDefault: false, description: 'Follow-up after sending quote' },
    { id: '4', name: 'Thank You Email', isDefault: false, description: 'Thank you after purchase' },
    { id: '5', name: 'Birthday Greeting', isDefault: false, description: 'Customer birthday wishes' },
  ],
  invoice: [
    { id: '1', name: 'Invoice', isDefault: true, description: 'Standard invoice email' },
    { id: '2', name: 'Credit Note', isDefault: false, description: 'Credit note notification' },
    { id: '3', name: 'Receipt', isDefault: false, description: 'Payment receipt confirmation' },
    { id: '4', name: 'Payment Reminder', isDefault: false, description: 'Payment reminder email' },
    { id: '5', name: 'Due Fee', isDefault: false, description: 'Overdue payment notification' },
    { id: '6', name: 'Order', isDefault: false, description: 'Order confirmation email' },
    { id: '7', name: 'Payment Failed', isDefault: false, description: 'Failed payment notification' },
  ],
  subscription: [
    { id: '1', name: 'New Agreement', isDefault: true, description: 'New subscription agreement' },
    { id: '2', name: 'Renewal Notice', isDefault: false, description: 'Subscription renewal reminder' },
    { id: '3', name: 'Cancellation Confirmation', isDefault: false, description: 'Subscription cancellation notice' },
    { id: '4', name: 'Payment Updated', isDefault: false, description: 'Payment method updated' },
    { id: '5', name: 'Upgrade Notification', isDefault: false, description: 'Plan upgrade confirmation' },
  ],
  booking: [
    { id: '1', name: 'Booking Confirmation', isDefault: true, description: 'Appointment booking confirmation' },
    { id: '2', name: 'Booking Reminder', isDefault: false, description: 'Appointment reminder 24h before' },
    { id: '3', name: 'Booking Cancelled', isDefault: false, description: 'Booking cancellation notice' },
    { id: '4', name: 'Reschedule Request', isDefault: false, description: 'Appointment reschedule notification' },
    { id: '5', name: 'No-Show Follow-up', isDefault: false, description: 'Follow-up after missed appointment' },
  ],
  tasks: [
    { id: '1', name: 'Task Assignment', isDefault: true, description: 'New task assignment notification' },
    { id: '2', name: 'Task Completed', isDefault: false, description: 'Task completion notification' },
    { id: '3', name: 'Task Overdue', isDefault: false, description: 'Overdue task reminder' },
    { id: '4', name: 'Project Update', isDefault: false, description: 'Project progress update' },
  ],
  support: [
    { id: '1', name: 'Ticket Created', isDefault: true, description: 'Support ticket confirmation' },
    { id: '2', name: 'Ticket Updated', isDefault: false, description: 'Ticket status update' },
    { id: '3', name: 'Ticket Resolved', isDefault: false, description: 'Ticket resolution notification' },
    { id: '4', name: 'Customer Satisfaction', isDefault: false, description: 'Post-support feedback request' },
  ],
  newsletters: [
    { id: '1', name: 'Monthly Newsletter', isDefault: true, description: 'Monthly company newsletter' },
    { id: '2', name: 'Product Update', isDefault: false, description: 'New product/feature announcement' },
    { id: '3', name: 'Event Invitation', isDefault: false, description: 'Company event invitation' },
    { id: '4', name: 'Welcome Series', isDefault: false, description: 'New subscriber welcome series' },
  ]
};

export const contractTemplates: Template[] = [
  { id: '1', name: 'Service Agreement', isDefault: true, description: 'Standard service contract' },
  { id: '2', name: 'NDA Template', isDefault: false, description: 'Non-disclosure agreement' },
  { id: '3', name: 'Consulting Contract', isDefault: false, description: 'Professional consulting agreement' },
];

export const moduleOptions: ModuleOption[] = [
  { id: 'crm', name: 'CRM', icon: Users, color: 'from-blue-400 to-blue-500' },
  { id: 'invoice', name: 'Invoice', icon: FileText, color: 'from-green-400 to-green-500' },
  { id: 'subscription', name: 'Subscriptions', icon: CreditCard, color: 'from-purple-400 to-purple-500' },
  { id: 'booking', name: 'Booking', icon: Calendar, color: 'from-orange-400 to-orange-500' },
  { id: 'tasks', name: 'Tasks', icon: MessageSquare, color: 'from-indigo-400 to-indigo-500' },
  { id: 'support', name: 'Support', icon: LifeBuoy, color: 'from-red-400 to-red-500' },
  { id: 'newsletters', name: 'Newsletters', icon: Send, color: 'from-teal-400 to-teal-500' },
];

export const templateCategories: TemplateCategory[] = [
  { id: 'emails', name: 'Emails', icon: Mail },
  { id: 'contracts', name: 'Contracts', icon: File },
];

export const templateTranslations: Record<string, Record<string, boolean>> = {
  '1': { en: true, da: true, de: false, es: true },
  '2': { en: true, da: false, de: false, es: false },
  '3': { en: true, da: true, de: true, es: true },
  '4': { en: true, da: false, de: true, es: false },
  '5': { en: true, da: true, de: false, es: true },
};
