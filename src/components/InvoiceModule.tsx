
import React, { useState, useEffect } from 'react';
import { FileText, Package, Settings, BarChart3, Calendar, CreditCard, Tags } from 'lucide-react';
import InvoiceList from './invoice/InvoiceList';
import ProductCatalog from './invoice/ProductCatalog';
import ProductCategory from './invoice/ProductCategory';
import InvoiceReports from './invoice/InvoiceReports';
import PaymentTracking from './invoice/PaymentTracking';
import VATTaxSettings from './settings/VATTaxSettings';

interface InvoiceModuleProps {
  activeSubTab?: string;
}

const InvoiceModule = ({ activeSubTab }: InvoiceModuleProps) => {
  const [activeTab, setActiveTab] = useState('invoices');

  useEffect(() => {
    if (activeSubTab) {
      setActiveTab(activeSubTab);
    }
  }, [activeSubTab]);

  const renderActiveContent = () => {
    switch (activeTab) {
      case 'invoices':
        return <InvoiceList />;
      case 'products':
        return <ProductCatalog />;
      case 'categories':
        return <ProductCategory />;
      case 'payments':
        return <PaymentTracking />;
      case 'reports':
        return <InvoiceReports />;
      case 'settings':
        return <VATTaxSettings />;
      default:
        return <InvoiceList />;
    }
  };

  return (
    <div className="w-full">
      <div className="p-4 md:p-8 mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Invoice Management</h1>
        <p className="text-gray-600 mt-2">Comprehensive invoicing with CRM integration and AI-powered automation</p>
      </div>

      {/* Content based on sub-navigation selection */}
      <div className="w-full">
        {renderActiveContent()}
      </div>
    </div>
  );
};

export default InvoiceModule;
