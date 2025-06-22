
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  BarChart3,
  Users,
  Calendar,
  FileText,
  CreditCard,
  Settings,
  MessageSquare,
  Plus,
  List,
  PieChart,
  Building,
  UserCheck,
  Package,
  TrendingUp,
  DollarSign,
  Star,
  ThumbsUp,
  Archive,
} from 'lucide-react';

interface SubNavigationProps {
  activeModule: string;
  activeSubTab?: string;
  onSubTabChange?: (tab: string) => void;
  isVisible: boolean;
}

const SubNavigation: React.FC<SubNavigationProps> = ({
  activeModule,
  activeSubTab,
  onSubTabChange,
  isVisible
}) => {
  const getModuleSubTabs = (moduleId: string) => {
    switch (moduleId) {
      case 'crm':
        return [
          { id: 'customers', name: 'Customers', icon: Users },
          { id: 'pipeline', name: 'Sales Pipeline', icon: TrendingUp },
          { id: 'tasks', name: 'Task Manager', icon: FileText },
          { id: 'activity', name: 'Activity Timeline', icon: BarChart3 },
        ];
      case 'invoice':
        return [
          { id: 'invoices', name: 'Invoices', icon: FileText },
          { id: 'create', name: 'Create Invoice', icon: Plus },
          { id: 'products', name: 'Product Catalog', icon: Package },
          { id: 'categories', name: 'Categories', icon: List },
          { id: 'templates', name: 'Templates', icon: FileText },
          { id: 'reports', name: 'Reports', icon: PieChart },
          { id: 'payments', name: 'Payment Tracking', icon: DollarSign },
          { id: 'workflows', name: 'Workflows', icon: Settings },
        ];
      case 'booking':
        return [
          { id: 'calendar', name: 'Calendar', icon: Calendar },
          { id: 'bookings', name: 'Bookings', icon: List },
          { id: 'todays', name: "Today's Bookings", icon: Calendar },
        ];
      case 'subscription':
        return [
          { id: 'plans', name: 'Subscription Plans', icon: List },
          { id: 'categories', name: 'Categories', icon: Building },
          { id: 'billing', name: 'Billing Management', icon: DollarSign },
          { id: 'analytics', name: 'Analytics', icon: BarChart3 },
          { id: 'churn', name: 'Churn Prediction', icon: TrendingUp },
          { id: 'portal', name: 'Customer Portal', icon: UserCheck },
          { id: 'payments', name: 'Payment Settings', icon: Settings },
        ];
      case 'feature-requests':
        return [
          { id: 'all', name: 'All Requests', icon: List },
          { id: 'my-votes', name: 'My Votes', icon: ThumbsUp },
          { id: 'archived', name: 'Archived', icon: Archive },
          { id: 'create', name: 'Create Request', icon: Plus },
        ];
      case 'settings':
        return [
          { id: 'modules', name: 'Modules', icon: Settings },
          { id: 'templates', name: 'Templates', icon: FileText },
          { id: 'language', name: 'Language', icon: MessageSquare },
          { id: 'profile', name: 'Profile', icon: Users },
          { id: 'integrations', name: 'Integrations', icon: Settings },
          { id: 'vat-tax', name: 'VAT/Tax', icon: DollarSign },
        ];
      case 'user':
        return [
          { id: 'profiles', name: 'User Profiles', icon: Users },
          { id: 'team-profiles', name: 'Team Profiles', icon: Users },
          { id: 'access-levels', name: 'Access Levels', icon: UserCheck },
          { id: 'team-access', name: 'Team Access', icon: UserCheck },
          { id: 'customer-access', name: 'Customer Access', icon: UserCheck },
          { id: 'organizations', name: 'Organizations', icon: Building },
          { id: 'billing', name: 'Customer Billing', icon: DollarSign },
          { id: 'invoice-info', name: 'Invoice Information', icon: FileText },
          { id: 'invoice-payment', name: 'Invoice Payment', icon: DollarSign },
          { id: 'crm-subscription', name: 'CRM Subscription', icon: Star },
        ];
      default:
        return [];
    }
  };

  const subTabs = getModuleSubTabs(activeModule);

  if (!isVisible || subTabs.length === 0) {
    return null;
  }

  return (
    <div className="w-48 bg-white border-r border-gray-200 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200 h-20 flex items-center">
        <h3 className="text-sm font-medium text-gray-700 capitalize">
          {activeModule} Menu
        </h3>
      </div>
      
      <nav className="flex-1 p-2">
        <div className="space-y-1">
          {subTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <Button
                key={tab.id}
                variant="ghost"
                className={cn(
                  "w-full justify-start text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-200"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                )}
                onClick={() => onSubTabChange?.(tab.id)}
              >
                <Icon className={cn(
                  "h-4 w-4 mr-3 flex-shrink-0",
                  isActive ? "text-blue-600" : "text-gray-400"
                )} />
                <span className="text-left">{tab.name}</span>
              </Button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default SubNavigation;
