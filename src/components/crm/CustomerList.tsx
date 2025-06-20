
import React, { useState, useEffect } from 'react';
import { Search, Plus, Filter, Grid, List, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CustomerTableView from './CustomerTableView';
import CustomerDetailPage from './CustomerDetailPage';
import CreateCustomerForm from './CreateCustomerForm';
import CustomViewEditor from './CustomViewEditor';

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
    [key: string]: any;
  };
  address?: {
    [key: string]: any;
  };
}

const sampleCustomers: Customer[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'kontakt@flexum.dk',
    phone: '123-456-7890',
    company: 'Acme Corp',
    status: 'active',
    lead_score: 75,
    tags: ['premium', 'tech'],
    industry: 'Technology',
    created_at: '2024-01-20T12:00:00Z',
    custom_fields: {
      customer_type: 'business',
      sales_rep: 'Alice Smith'
    },
    address: {
      country: 'USA',
      city: 'New York'
    }
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'kontakt@flexum.dk',
    phone: '987-654-3210',
    company: 'Beta Inc',
    status: 'inactive',
    lead_score: 90,
    tags: ['vip', 'marketing'],
    industry: 'Marketing',
    created_at: '2024-02-15T14:30:00Z',
    custom_fields: {
      customer_type: 'business',
      marketing_channel: 'email'
    },
    address: {
      country: 'Canada',
      city: 'Toronto'
    }
  },
  {
    id: '3',
    name: 'Alice Johnson',
    email: 'kontakt@flexum.dk',
    phone: '555-123-4567',
    company: 'Gamma Co',
    status: 'active',
    lead_score: 60,
    tags: ['new', 'sales'],
    industry: 'Sales',
    created_at: '2024-03-10T10:00:00Z',
    custom_fields: {
      customer_type: 'private',
      last_contact: '2024-03-01'
    },
    address: {
      country: 'UK',
      city: 'London'
    }
  },
  {
    id: '4',
    name: 'Bob Williams',
    email: 'kontakt@flexum.dk',
    phone: '111-222-3333',
    company: 'Delta Ltd',
    status: 'pending',
    lead_score: 45,
    tags: ['trial', 'support'],
    industry: 'Support',
    created_at: '2024-04-05T08:00:00Z',
    custom_fields: {
      customer_type: 'business',
      support_level: 'basic'
    },
    address: {
      country: 'Australia',
      city: 'Sydney'
    }
  },
  {
    id: '5',
    name: 'Eva Brown',
    email: 'kontakt@flexum.dk',
    phone: '444-555-6666',
    company: 'Epsilon Group',
    status: 'active',
    lead_score: 80,
    tags: ['premium', 'tech'],
    industry: 'Technology',
    created_at: '2024-05-01T16:00:00Z',
    custom_fields: {
      customer_type: 'private',
      preferred_language: 'English'
    },
    address: {
      country: 'Germany',
      city: 'Berlin'
    }
  }
];

const CustomerList: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [currentView, setCurrentView] = useState<'list' | 'detail' | 'create'>('list');
  const [isCustomViewEditorOpen, setIsCustomViewEditorOpen] = useState(false);
  const [customViews, setCustomViews] = useState<any[]>([]);
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

  const handleSaveCustomView = (view: any) => {
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getLeadScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
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

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeView === 'all') return matchesSearch;
    
    const view = customViews.find(v => v.id === activeView);
    if (!view) return matchesSearch;
    
    const matchesConditions = view.conditions.every(condition => {
      const fieldValue = getFieldValue(customer, condition.field);
      return evaluateCondition(fieldValue, condition.operator, condition.value);
    });
    
    return matchesSearch && matchesConditions;
  });

  const getFieldValue = (customer: Customer, field: string): any => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      return customer[parent as keyof Customer]?.[child as any];
    }
    return customer[field as keyof Customer];
  };

  const evaluateCondition = (fieldValue: any, operator: string, value: string): boolean => {
    switch (operator) {
      case 'equals':
        return fieldValue === value;
      case 'not_equals':
        return fieldValue !== value;
      case 'contains':
        return String(fieldValue).toLowerCase().includes(value.toLowerCase());
      case 'greater_than':
        return Number(fieldValue) > Number(value);
      case 'less_than':
        return Number(fieldValue) < Number(value);
      case 'in_last_days':
        const days = Number(value);
        const dateValue = new Date(fieldValue);
        const diff = Date.now() - dateValue.getTime();
        const daysDiff = diff / (1000 * 3600 * 24);
        return daysDiff <= days;
      default:
        return false;
    }
  };

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
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Customer Management</h1>
            <p className="text-sm text-gray-600 mt-1">Manage your customer relationships and data</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            {customers.length === 0 && (
              <Button 
                onClick={createSampleCustomers}
                variant="outline"
                className="w-full sm:w-auto"
              >
                Create Sample Customers
              </Button>
            )}
            <Button 
              onClick={handleCreateCustomer}
              className="w-full sm:w-auto"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Customer
            </Button>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <Button
              variant="outline"
              onClick={() => setIsCustomViewEditorOpen(true)}
              className="w-full sm:w-auto"
            >
              <Filter className="h-4 w-4 mr-2" />
              <span className="sm:hidden">Filter</span>
              <span className="hidden sm:inline">Custom View</span>
            </Button>
            
            <div className="flex rounded-md border border-gray-300 bg-white">
              <Button
                variant={viewMode === 'table' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('table')}
                className="rounded-r-none border-0"
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-l-none border-0"
              >
                <Grid className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <Tabs value={activeView} onValueChange={setActiveView}>
            <TabsList className="w-full sm:w-auto">
              <TabsTrigger value="all" className="flex-1 sm:flex-none">All Customers</TabsTrigger>
              {customViews.map(view => (
                <TabsTrigger key={view.id} value={view.id} className="flex-1 sm:flex-none">
                  {view.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Customer Count */}
      <div className="bg-gray-50 px-4 sm:px-6 lg:px-8 py-2">
        <p className="text-sm text-gray-600">
          {filteredCustomers.length} customer{filteredCustomers.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {customers.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto h-12 w-12 text-gray-400">
              <Eye className="h-12 w-12" />
            </div>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No customers</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating sample customers or adding a new customer.</p>
            <div className="mt-6 space-y-2 sm:space-y-0 sm:space-x-3 sm:flex sm:justify-center">
              <Button onClick={createSampleCustomers} variant="outline" className="w-full sm:w-auto">
                Create Sample Customers
              </Button>
              <Button onClick={handleCreateCustomer} className="w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                Add Customer
              </Button>
            </div>
          </div>
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
