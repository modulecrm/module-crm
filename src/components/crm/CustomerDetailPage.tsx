
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
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Customers
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{customer.name}</h1>
              <p className="text-gray-600">{customer.company || 'Individual Customer'}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Edit Customer
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </div>

      {/* Sticky Overview Section */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <CustomerOverview customer={customer} />
      </div>

      {/* Main Content with Tabs */}
      <div className="px-6 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-8">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="info" className="flex items-center gap-2">
              <Edit className="h-4 w-4" />
              Info & Contacts
            </TabsTrigger>
            <TabsTrigger value="communication" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Communication
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Documents
            </TabsTrigger>
            <TabsTrigger value="purchases" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Purchases
            </TabsTrigger>
            <TabsTrigger value="tasks" className="flex items-center gap-2">
              <CheckSquare className="h-4 w-4" />
              Tasks
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="gdpr" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              GDPR/KYC
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
