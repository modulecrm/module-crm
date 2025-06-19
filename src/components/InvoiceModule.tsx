
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, List, BarChart3, CreditCard, Settings, Package, Workflow } from 'lucide-react';
import CreateInvoice from './invoice/CreateInvoice';
import InvoiceList from './invoice/InvoiceList';
import InvoiceReports from './invoice/InvoiceReports';
import PaymentTracking from './invoice/PaymentTracking';
import ProductCatalog from './invoice/ProductCatalog';
import InvoiceWorkflows from './invoice/InvoiceWorkflows';
import InvoiceTemplates from './invoice/InvoiceTemplates';

const InvoiceModule = () => {
  const [activeTab, setActiveTab] = useState('create');

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Invoice Management</h1>
        <p className="text-gray-600 mt-2">Create, manage, and track your invoices and payments</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="create" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Create
          </TabsTrigger>
          <TabsTrigger value="invoices" className="flex items-center gap-2">
            <List className="h-4 w-4" />
            Invoices
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Reports
          </TabsTrigger>
          <TabsTrigger value="payments" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Payments
          </TabsTrigger>
          <TabsTrigger value="products" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Products
          </TabsTrigger>
          <TabsTrigger value="workflows" className="flex items-center gap-2">
            <Workflow className="h-4 w-4" />
            Workflows
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Templates
          </TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="mt-6">
          <CreateInvoice />
        </TabsContent>

        <TabsContent value="invoices" className="mt-6">
          <InvoiceList />
        </TabsContent>

        <TabsContent value="reports" className="mt-6">
          <InvoiceReports />
        </TabsContent>

        <TabsContent value="payments" className="mt-6">
          <PaymentTracking />
        </TabsContent>

        <TabsContent value="products" className="mt-6">
          <ProductCatalog />
        </TabsContent>

        <TabsContent value="workflows" className="mt-6">
          <InvoiceWorkflows />
        </TabsContent>

        <TabsContent value="templates" className="mt-6">
          <InvoiceTemplates />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InvoiceModule;
