
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Edit, Settings, MessageSquare, FileText, Package, CheckSquare, BarChart3, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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

  return (
    <div className="min-h-screen bg-gray-50">
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

      {/* Main Content with Tabs */}
      <div className="px-4 md:px-6 py-4 md:py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 md:space-y-6">
          <TabsList className="grid w-full grid-cols-4 md:grid-cols-8 gap-1 h-auto">
            <TabsTrigger value="overview" className="flex flex-col md:flex-row items-center gap-1 md:gap-2 text-xs md:text-sm p-2 md:p-3">
              <BarChart3 className="h-3 w-3 md:h-4 md:w-4" />
              <span className="hidden sm:inline">Overview</span>
              <span className="sm:hidden">Stats</span>
            </TabsTrigger>
            <TabsTrigger value="info" className="flex flex-col md:flex-row items-center gap-1 md:gap-2 text-xs md:text-sm p-2 md:p-3">
              <Edit className="h-3 w-3 md:h-4 md:w-4" />
              <span className="hidden sm:inline">Info & Contacts</span>
              <span className="sm:hidden">Info</span>
            </TabsTrigger>
            <TabsTrigger value="communication" className="flex flex-col md:flex-row items-center gap-1 md:gap-2 text-xs md:text-sm p-2 md:p-3">
              <MessageSquare className="h-3 w-3 md:h-4 md:w-4" />
              <span className="hidden sm:inline">Communication</span>
              <span className="sm:hidden">Comm</span>
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex flex-col md:flex-row items-center gap-1 md:gap-2 text-xs md:text-sm p-2 md:p-3">
              <FileText className="h-3 w-3 md:h-4 md:w-4" />
              <span className="hidden sm:inline">Documents</span>
              <span className="sm:hidden">Docs</span>
            </TabsTrigger>
            <TabsTrigger value="purchases" className="flex flex-col md:flex-row items-center gap-1 md:gap-2 text-xs md:text-sm p-2 md:p-3">
              <Package className="h-3 w-3 md:h-4 md:w-4" />
              <span className="hidden sm:inline">Purchases</span>
              <span className="sm:hidden">Sales</span>
            </TabsTrigger>
            <TabsTrigger value="tasks" className="flex flex-col md:flex-row items-center gap-1 md:gap-2 text-xs md:text-sm p-2 md:p-3">
              <CheckSquare className="h-3 w-3 md:h-4 md:w-4" />
              <span className="hidden sm:inline">Tasks</span>
              <span className="sm:hidden">Tasks</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex flex-col md:flex-row items-center gap-1 md:gap-2 text-xs md:text-sm p-2 md:p-3">
              <BarChart3 className="h-3 w-3 md:h-4 md:w-4" />
              <span className="hidden sm:inline">Analytics</span>
              <span className="sm:hidden">Data</span>
            </TabsTrigger>
            <TabsTrigger value="gdpr" className="flex flex-col md:flex-row items-center gap-1 md:gap-2 text-xs md:text-sm p-2 md:p-3">
              <Shield className="h-3 w-3 md:h-4 md:w-4" />
              <span className="hidden sm:inline">GDPR/KYC</span>
              <span className="sm:hidden">GDPR</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <StatisticsInsights customer={customer} />
          </TabsContent>

          <TabsContent value="info">
            <CustomerInfo customer={customer} />
          </TabsContent>

          <TabsContent value="communication">
            <CommunicationStream customerId={customer.id} />
          </TabsContent>

          <TabsContent value="documents">
            <DocumentsContracts customerId={customer.id} />
          </TabsContent>

          <TabsContent value="purchases">
            <PurchasesProducts customerId={customer.id} />
          </TabsContent>

          <TabsContent value="tasks">
            <TasksNotifications customerId={customer.id} />
          </TabsContent>

          <TabsContent value="analytics">
            <StatisticsInsights customer={customer} />
          </TabsContent>

          <TabsContent value="gdpr">
            <GDPRCompliance customerId={customer.id} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CustomerDetailPage;
