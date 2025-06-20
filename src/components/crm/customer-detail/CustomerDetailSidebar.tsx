
import React from 'react';
import { Edit, MessageSquare, FileText, Package, CheckSquare, BarChart3, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CustomerDetailSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const CustomerDetailSidebar: React.FC<CustomerDetailSidebarProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'info', name: 'Info & Contacts', icon: Edit },
    { id: 'communication', name: 'Communication', icon: MessageSquare },
    { id: 'documents', name: 'Documents', icon: FileText },
    { id: 'purchases', name: 'Purchases', icon: Package },
    { id: 'tasks', name: 'Tasks', icon: CheckSquare },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
    { id: 'gdpr', name: 'GDPR/KYC', icon: Shield },
  ];

  return (
    <div className="w-full h-full bg-white border-r border-gray-200">
      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Customer Details</h3>
        <nav className="space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
                  isActive
                    ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-200"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                )}
              >
                <Icon className={cn(
                  "h-4 w-4 flex-shrink-0",
                  isActive ? "text-blue-600" : "text-gray-400"
                )} />
                <span className="text-left">{tab.name}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default CustomerDetailSidebar;
