
import React, { useState, useEffect } from 'react';
import CustomerTableView from './CustomerTableView';
import CustomerDetailPage from './CustomerDetailPage';
import CreateCustomerForm from './CreateCustomerForm';
import CustomViewEditor from './CustomViewEditor';
import CustomerHeader from './customer-list/CustomerHeader';
import CustomerFilters from './customer-list/CustomerFilters';
import EmptyState from './customer-list/EmptyState';
import { Customer, CustomView } from './customer-list/types';
import { sampleCustomers } from './customer-list/sampleData';
import { getStatusColor, getLeadScoreColor, filterCustomers } from './customer-list/utils';

const CustomerList: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [currentView, setCurrentView] = useState<'list' | 'detail' | 'create'>('list');
  const [isCustomViewEditorOpen, setIsCustomViewEditorOpen] = useState(false);
  const [customViews, setCustomViews] = useState<CustomView[]>([]);
  const [activeView, setActiveView] = useState('all');
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);

  useEffect(() => {
    // Load customers from local storage or an API here
  }, []);

  const handleViewCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setCurrentView('detail');
  };

  const handleBackToList = () => {
    setSelectedCustomer(null);
    setCurrentView('list');
  };

  const handleCreateCustomer = () => {
    setCurrentView('create');
  };

  const handleCustomerCreated = () => {
    setCurrentView('list');
    // Optionally refresh customer list here
  };

  const handleSaveCustomView = (view: CustomView) => {
    setCustomViews(prev => {
      const existingIndex = prev.findIndex(v => v.id === view.id);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = view;
        return updated;
      }
      return [...prev, view];
    });
  };

  const createSampleCustomers = () => {
    setCustomers(sampleCustomers);
  };

  const handleCustomerSelect = (customerId: string) => {
    setSelectedCustomers(prev => 
      prev.includes(customerId) 
        ? prev.filter(id => id !== customerId)
        : [...prev, customerId]
    );
  };

  const handleSelectAll = () => {
    setSelectedCustomers(filteredCustomers.map(c => c.id));
  };

  const handleClearSelection = () => {
    setSelectedCustomers([]);
  };

  const filteredCustomers = filterCustomers(customers, searchTerm, activeView, customViews);

  if (currentView === 'detail' && selectedCustomer) {
    return <CustomerDetailPage customer={selectedCustomer} onBack={handleBackToList} />;
  }

  if (currentView === 'create') {
    return (
      <CreateCustomerForm 
        onClose={() => setCurrentView('list')}
        onSuccess={handleCustomerCreated}
      />
    );
  }

  return (
    <div className="w-full h-full bg-gray-50">
      <CustomerHeader
        hasCustomers={customers.length > 0}
        onCreateSampleCustomers={createSampleCustomers}
        onCreateCustomer={handleCreateCustomer}
      />

      <CustomerFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onOpenCustomViewEditor={() => setIsCustomViewEditorOpen(true)}
        activeView={activeView}
        onActiveViewChange={setActiveView}
        customViews={customViews}
      />

      {/* Customer Count */}
      <div className="bg-gray-50 px-4 sm:px-6 lg:px-8 py-2">
        <p className="text-sm text-gray-600">
          {filteredCustomers.length} customer{filteredCustomers.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {customers.length === 0 ? (
          <EmptyState
            onCreateSampleCustomers={createSampleCustomers}
            onCreateCustomer={handleCreateCustomer}
          />
        ) : (
          <CustomerTableView 
            customers={filteredCustomers}
            getStatusColor={getStatusColor}
            getLeadScoreColor={getLeadScoreColor}
            selectedCustomers={selectedCustomers}
            onCustomerSelect={handleCustomerSelect}
            onSelectAll={handleSelectAll}
            onClearSelection={handleClearSelection}
            onCustomerClick={handleViewCustomer}
          />
        )}
      </div>

      <CustomViewEditor
        isOpen={isCustomViewEditorOpen}
        onClose={() => setIsCustomViewEditorOpen(false)}
        onSave={handleSaveCustomView}
      />
    </div>
  );
};

export default CustomerList;
