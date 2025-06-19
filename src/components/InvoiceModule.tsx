
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Package, Settings, BarChart3, Calendar, CreditCard, Tags } from 'lucide-react';
import InvoiceList from './invoice/InvoiceList';
import ProductCatalog from './invoice/ProductCatalog';
import InvoiceTemplates from './invoice/InvoiceTemplates';
import ProductCategory from './invoice/ProductCategory';
import InvoiceReports from './invoice/InvoiceReports';
import PaymentTracking from './invoice/PaymentTracking';

const InvoiceModule = () => {
  const [activeTab, setActiveTab] = useState('invoices');

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Invoice Management</h1>
        <p className="text-gray-600 mt-2">Comprehensive invoicing with CRM integration and AI-powered automation</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="invoices" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Invoices
          </TabsTrigger>
          <TabsTrigger value="products" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Products
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </TabsTrigger>
          <TabsTrigger value="categories" className="flex items-center gap-2">
            <Tags className="h-4 w-4" />
            Categories
          </TabsTrigger>
          <TabsTrigger value="payments" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Payments
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="invoices" className="mt-6">
          <InvoiceList />
        </TabsContent>

        <TabsContent value="products" className="mt-6">
          <ProductCatalog />
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <InvoiceTemplates />
        </TabsContent>

        <TabsContent value="categories" className="mt-6">
          <ProductCategory />
        </TabsContent>

        <TabsContent value="payments" className="mt-6">
          <PaymentTracking />
        </TabsContent>

        <TabsContent value="reports" className="mt-6">
          <InvoiceReports />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InvoiceModule;
