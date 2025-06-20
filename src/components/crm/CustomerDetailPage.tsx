
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Edit, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CustomerDetailSidebar from './customer-detail/CustomerDetailSidebar';
import CustomerOverview from './customer-detail/CustomerOverview';
import CustomerInfo from './customer-detail/CustomerInfo';
import CommunicationStream from './customer-detail/CommunicationStream';
import DocumentsContracts from './customer-detail/DocumentsContracts';
import PurchasesProducts from './customer-detail/PurchasesProducts';
import TasksNotifications from './customer-detail/TasksNotifications';
import StatisticsInsights from './customer-detail/StatisticsInsights';
import GDPRCompliance from './customer-detail/GDPRCompliance';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: string;
  lead_score: number;
  tags: string[];
  industry: string;
  created_at: string;
  custom_fields?: {
    customer_type?: 'business' | 'private';
    language?: string;
    currency?: string;
    source?: string;
    segment?: string;
    employees_count?: number;
    revenue?: number;
    [key: string]: any;
  };
  address?: {
    country?: string;
    city?: string;
    [key: string]: any;
  };
}

interface CustomerDetailPageProps {
  customer: Customer;
  onBack: () => void;
}

const CustomerDetailPage: React.FC<CustomerDetailPageProps> = ({ customer, onBack }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <StatisticsInsights customer={customer} />;
      case 'info':
        return <CustomerInfo customer={customer} />;
      case 'communication':
        return <CommunicationStream customerId={customer.id} />;
      case 'documents':
        return <DocumentsContracts customerId={customer.id} />;
      case 'purchases':
        return <PurchasesProducts customerId={customer.id} />;
      case 'tasks':
        return <TasksNotifications customerId={customer.id} />;
      case 'analytics':
        return <StatisticsInsights customer={customer} />;
      case 'gdpr':
        return <GDPRCompliance customerId={customer.id} />;
      default:
        return <StatisticsInsights customer={customer} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      {/* Sidebar - 20% width */}
      <div className="w-1/5 min-w-0 flex-shrink-0">
        <CustomerDetailSidebar 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />
      </div>

      {/* Main Content - 80% width */}
      <div className="flex-1 min-w-0">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 md:px-6 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4 min-w-0 flex-1">
              <Button variant="ghost" onClick={onBack} className="flex items-center gap-2 flex-shrink-0">
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Back to Customers</span>
                <span className="sm:hidden">Back</span>
              </Button>
              <div className="min-w-0 flex-1">
                <h1 className="text-xl md:text-2xl font-bold text-gray-900 truncate">{customer.name}</h1>
                <p className="text-sm md:text-base text-gray-600 truncate">{customer.company || 'Individual Customer'}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                <Edit className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Edit Customer</span>
                <span className="sm:hidden">Edit</span>
              </Button>
              <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                <Settings className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Settings</span>
                <span className="sm:hidden">Settings</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Sticky Overview Section */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
          <CustomerOverview customer={customer} />
        </div>

        {/* Tab Content */}
        <div className="px-4 md:px-6 py-4 md:py-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailPage;
