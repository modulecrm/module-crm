
import { Users, Calendar, CheckSquare, FolderOpen, Mail, LifeBuoy, Building2, Zap, FileText } from 'lucide-react';

export const modules = [
  {
    id: 'crm',
    name: 'CRM Core Module',
    icon: Users,
    color: 'from-green-400 to-green-600',
    price: '$29/month',
    learnMoreUrl: 'https://example.com/crm-module'
  },
  {
    id: 'invoices',
    name: 'Invoice Management',
    icon: FileText,
    color: 'from-blue-400 to-blue-600',
    price: '$39/month',
    learnMoreUrl: 'https://example.com/invoice-module',
    required: true // Core dependency for other modules
  },
  {
    id: 'subscription',
    name: 'Subscription Management',
    icon: Building2,
    color: 'from-purple-400 to-purple-600',
    price: '$49/month',
    learnMoreUrl: 'https://example.com/subscription-module'
  },
  {
    id: 'booking',
    name: 'Booking Management',
    icon: Calendar,
    color: 'from-orange-400 to-orange-600',
    price: '$39/month',
    learnMoreUrl: 'https://example.com/booking-module'
  },
  {
    id: 'tasks',
    name: 'Task Management',
    icon: CheckSquare,
    color: 'from-red-400 to-red-600',
    price: '$19/month',
    learnMoreUrl: 'https://example.com/tasks-module'
  },
  {
    id: 'projects',
    name: 'Project Management',
    icon: FolderOpen,
    color: 'from-indigo-400 to-indigo-600',
    price: '$59/month',
    learnMoreUrl: 'https://example.com/projects-module'
  },
  {
    id: 'newsletters',
    name: 'Newsletters',
    icon: Mail,
    color: 'from-pink-400 to-pink-600',
    price: '$25/month',
    learnMoreUrl: 'https://example.com/newsletters-module'
  },
  {
    id: 'support',
    name: 'Support System',
    icon: LifeBuoy,
    color: 'from-teal-400 to-teal-600',
    price: '$35/month',
    learnMoreUrl: 'https://example.com/support-module'
  }
];

export const branchModules = [
  {
    id: 'coworking',
    name: 'Coworking Space Module',
    icon: Building2,
    color: 'from-blue-400 to-blue-600',
    price: '$89/month',
    learnMoreUrl: 'https://example.com/coworking-module',
    premium: true
  },
  {
    id: 'gym',
    name: 'Fitness & Gym Module',
    icon: Zap,
    color: 'from-yellow-400 to-yellow-600',
    price: '$79/month',
    learnMoreUrl: 'https://example.com/gym-module',
    premium: true
  }
];
