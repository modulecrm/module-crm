
import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus, Mail, Phone, MapPin, Tag, Users, Star, Building2, User, Grid3X3, List, Edit } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import CreateCustomerForm from './CreateCustomerForm';
import CustomerTableView from './CustomerTableView';
import CustomViewEditor from './CustomViewEditor';
import CustomerDetailPage from './CustomerDetailPage';

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

const CustomerList = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [customerTypeFilter, setCustomerTypeFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [customViews, setCustomViews] = useState<Array<{
    id: string;
    name: string;
    conditions: Array<{
      id: string;
      field: string;
      operator: string;
      value: string;
    }>;
  }>>([]);
  const [activeCustomView, setActiveCustomView] = useState<string | null>(null);
  const [showCustomViewEditor, setShowCustomViewEditor] = useState(false);
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Type cast the data to match our Customer interface
      const typedCustomers: Customer[] = (data || []).map(customer => ({
        ...customer,
        custom_fields: customer.custom_fields as Customer['custom_fields'],
        address: customer.address as Customer['address']
      }));
      
      setCustomers(typedCustomers);
    } catch (error) {
      console.error('Error fetching customers:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyCustomViewFilter = (customer: Customer, conditions: any[]) => {
    return conditions.every(condition => {
      const { field, operator, value } = condition;
      let customerValue: any;

      // Get the customer field value
      if (field.includes('.')) {
        const [parent, child] = field.split('.');
        customerValue = customer[parent as keyof Customer]?.[child];
      } else {
        customerValue = customer[field as keyof Customer];
      }

      // Convert to string for comparison
      const customerStr = String(customerValue || '').toLowerCase();
      const valueStr = String(value).toLowerCase();

      switch (operator) {
        case 'equals':
          return customerStr === valueStr;
        case 'not_equals':
          return customerStr !== valueStr;
        case 'contains':
          return customerStr.includes(valueStr);
        case 'greater_than':
          return Number(customerValue) > Number(value);
        case 'less_than':
          return Number(customerValue) < Number(value);
        case 'in_last_days':
          const daysDiff = Math.floor((Date.now() - new Date(customerValue).getTime()) / (1000 * 60 * 60 * 24));
          return daysDiff <= Number(value);
        default:
          return true;
      }
    });
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
    const matchesType = customerTypeFilter === 'all' || 
                       customer.custom_fields?.customer_type === customerTypeFilter;

    // Apply custom view filter if active
    const matchesCustomView = activeCustomView 
      ? (() => {
          const customView = customViews.find(v => v.id === activeCustomView);
          return customView ? applyCustomViewFilter(customer, customView.conditions) : true;
        })()
      : true;

    return matchesSearch && matchesStatus && matchesType && matchesCustomView;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'potential': return 'bg-blue-100 text-blue-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'churned': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLeadScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    if (score >= 40) return 'text-orange-600';
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
    setSelectedCustomers(filteredCustomers.map(customer => customer.id));
  };

  const handleClearSelection = () => {
    setSelectedCustomers([]);
  };

  const handleCustomerClick = (customer: Customer) => {
    setSelectedCustomer(customer);
  };

  const handleBackToList = () => {
    setSelectedCustomer(null);
  };

  const loadCustomViews = () => {
    const saved = localStorage.getItem('customerCustomViews');
    if (saved) {
      setCustomViews(JSON.parse(saved));
    }
  };

  const handleSaveCustomView = (view: {
    id: string;
    name: string;
    conditions: Array<{
      id: string;
      field: string;
      operator: string;
      value: string;
    }>;
  }) => {
    const updatedViews = [...customViews];
    const existingIndex = updatedViews.findIndex(v => v.id === view.id);
    
    if (existingIndex >= 0) {
      updatedViews[existingIndex] = view;
    } else {
      updatedViews.push(view);
    }
    
    setCustomViews(updatedViews);
    localStorage.setItem('customerCustomViews', JSON.stringify(updatedViews));
  };

  useEffect(() => {
    loadCustomViews();
  }, []);

  // If a customer is selected, show the detail page
  if (selectedCustomer) {
    return (
      <CustomerDetailPage 
        customer={selectedCustomer} 
        onBack={handleBackToList}
      />
    );
  }

  if (loading) {
    return <div className="p-8">Loading customers...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="potential">Potential</option>
          <option value="inactive">Inactive</option>
          <option value="churned">Churned</option>
        </select>
        <select
          value={customerTypeFilter}
          onChange={(e) => setCustomerTypeFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Types</option>
          <option value="business">B2B</option>
          <option value="private">B2C</option>
        </select>

        {/* Custom Views Dropdown */}
        <select
          value={activeCustomView || ''}
          onChange={(e) => setActiveCustomView(e.target.value || null)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Customers</option>
          {customViews.map(view => (
            <option key={view.id} value={view.id}>{view.name}</option>
          ))}
        </select>

        {/* View Mode Toggle */}
        <div className="flex border border-gray-300 rounded-lg overflow-hidden">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('grid')}
            className="rounded-none"
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('list')}
            className="rounded-none"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>

        {/* Edit Custom View Button */}
        <Button
          onClick={() => setShowCustomViewEditor(true)}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Edit className="h-4 w-4" />
          Custom View
        </Button>

        <Button onClick={() => setShowCreateForm(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Customer
        </Button>
      </div>

      {/* Active Custom View Indicator */}
      {activeCustomView && (
        <div className="flex items-center gap-2 text-sm text-blue-600 bg-blue-50 px-3 py-2 rounded-lg">
          <Filter className="h-4 w-4" />
          Active view: {customViews.find(v => v.id === activeCustomView)?.name}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveCustomView(null)}
            className="text-blue-600 hover:text-blue-800"
          >
            Clear
          </Button>
        </div>
      )}

      {/* Customer Content */}
      {viewMode === 'list' ? (
        <CustomerTableView
          customers={filteredCustomers}
          getStatusColor={getStatusColor}
          getLeadScoreColor={getLeadScoreColor}
          selectedCustomers={selectedCustomers}
          onCustomerSelect={handleCustomerSelect}
          onSelectAll={handleSelectAll}
          onClearSelection={handleClearSelection}
          onCustomerClick={handleCustomerClick}
        />
      ) : (
        <>
          {/* Customer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCustomers.map((customer) => (
              <div 
                key={customer.id} 
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleCustomerClick(customer)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    {customer.custom_fields?.customer_type === 'business' ? (
                      <Building2 className="h-5 w-5 text-blue-500" />
                    ) : (
                      <User className="h-5 w-5 text-green-500" />
                    )}
                    <div>
                      <h3 className="font-semibold text-gray-900">{customer.name}</h3>
                      {customer.company && (
                        <p className="text-sm text-gray-500">{customer.company}</p>
                      )}
                      <Badge className="text-xs mt-1" variant="outline">
                        {customer.custom_fields?.customer_type === 'business' ? 'B2B' : 'B2C'}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className={`h-4 w-4 ${getLeadScoreColor(customer.lead_score)}`} />
                    <span className={`text-sm font-medium ${getLeadScoreColor(customer.lead_score)}`}>
                      {customer.lead_score}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  {customer.email && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="h-4 w-4 mr-2" />
                      {customer.email}
                    </div>
                  )}
                  {customer.phone && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="h-4 w-4 mr-2" />
                      {customer.phone}
                    </div>
                  )}
                  {customer.address?.country && (
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      {customer.address.city}, {customer.address.country}
                    </div>
                  )}
                  {customer.industry && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="h-4 w-4 mr-2" />
                      {customer.industry}
                    </div>
                  )}
                  {customer.custom_fields?.source && (
                    <div className="text-xs text-gray-500">
                      Source: {customer.custom_fields.source}
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <Badge className={getStatusColor(customer.status)}>
                    {customer.status}
                  </Badge>
                  
                  {customer.tags && customer.tags.length > 0 && (
                    <div className="flex items-center gap-1">
                      <Tag className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-500">
                        {customer.tags.length} tags
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredCustomers.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No customers found</h3>
              <p className="text-gray-600">Try adjusting your search or filters, or create your first customer</p>
            </div>
          )}
        </>
      )}

      {/* Create Customer Form Modal */}
      {showCreateForm && (
        <CreateCustomerForm
          onClose={() => setShowCreateForm(false)}
          onSuccess={() => {
            fetchCustomers();
            setShowCreateForm(false);
          }}
        />
      )}

      {/* Custom View Editor Modal */}
      <CustomViewEditor
        isOpen={showCustomViewEditor}
        onClose={() => setShowCustomViewEditor(false)}
        onSave={handleSaveCustomView}
      />
    </div>
  );
};

export default CustomerList;
