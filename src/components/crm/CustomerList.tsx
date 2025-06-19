import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus, Mail, Phone, MapPin, Tag, Users, Star, Building2, User, Grid3X3, List, Edit } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import CreateCustomerForm from './CreateCustomerForm';
import CustomerTableView from './CustomerTableView';
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

  // Generate 20 fictitious customers
  const generateFictitiousCustomers = async () => {
    const fictitiousCustomers = [
      {
        name: 'TechCorp Solutions',
        email: 'contact@techcorp.com',
        phone: '+1-555-0101',
        company: 'TechCorp Solutions',
        status: 'active',
        industry: 'Software Development',
        tags: ['Enterprise', 'VIP'],
        lead_score: 85,
        custom_fields: {
          customer_type: 'business',
          language: 'en',
          currency: 'USD',
          source: 'google_ads',
          segment: 'Enterprise Software',
          employees_count: 250,
          revenue: 5000000,
          company_registration: 'CVR: 12345678',
          business_form: 'Corp'
        },
        address: { country: 'US', city: 'San Francisco', billing: '123 Tech St, San Francisco, CA' }
      },
      {
        name: 'Green Energy Nordic',
        email: 'info@greenenergy.dk',
        phone: '+45-1234-5678',
        company: 'Green Energy Nordic',
        status: 'active',
        industry: 'Renewable Energy',
        tags: ['Subscriber', 'High Priority'],
        lead_score: 92,
        custom_fields: {
          customer_type: 'business',
          language: 'da',
          currency: 'DKK',
          source: 'referral',
          segment: 'Clean Tech',
          employees_count: 150,
          revenue: 25000000,
          company_registration: 'CVR: 87654321',
          business_form: 'ApS'
        },
        address: { country: 'DK', city: 'Copenhagen', billing: 'Ørestads Boulevard 108, Copenhagen' }
      },
      {
        name: 'John Smith',
        email: 'john.smith@email.com',
        phone: '+1-555-0102',
        company: '',
        status: 'potential',
        industry: '',
        tags: ['Lead'],
        lead_score: 45,
        custom_fields: {
          customer_type: 'private',
          language: 'en',
          currency: 'USD',
          source: 'website',
          segment: 'Individual Consumer'
        },
        address: { country: 'US', city: 'New York', billing: '456 Main St, New York, NY' }
      },
      {
        name: 'Digital Marketing Hub',
        email: 'hello@dmhub.co.uk',
        phone: '+44-20-7123-4567',
        company: 'Digital Marketing Hub',
        status: 'active',
        industry: 'Marketing',
        tags: ['SMB', 'Subscriber'],
        lead_score: 78,
        custom_fields: {
          customer_type: 'business',
          language: 'en',
          currency: 'GBP',
          source: 'facebook',
          segment: 'Digital Marketing',
          employees_count: 35,
          revenue: 1500000,
          company_registration: 'UK: 09876543',
          business_form: 'LLC'
        },
        address: { country: 'GB', city: 'London', billing: '789 Marketing Lane, London' }
      },
      {
        name: 'Sarah Johnson',
        email: 'sarah.j@example.com',
        phone: '+1-555-0103',
        company: '',
        status: 'active',
        industry: '',
        tags: ['VIP'],
        lead_score: 88,
        custom_fields: {
          customer_type: 'private',
          language: 'en',
          currency: 'USD',
          source: 'referral',
          segment: 'Premium Individual'
        },
        address: { country: 'US', city: 'Los Angeles', billing: '321 Premium Ave, Los Angeles, CA' }
      },
      {
        name: 'Startup Accelerator Berlin',
        email: 'contact@accelerator.de',
        phone: '+49-30-12345678',
        company: 'Startup Accelerator Berlin',
        status: 'potential',
        industry: 'Venture Capital',
        tags: ['Startup', 'High Priority'],
        lead_score: 82,
        custom_fields: {
          customer_type: 'business',
          language: 'de',
          currency: 'EUR',
          source: 'trade_show',
          segment: 'Venture Capital',
          employees_count: 25,
          revenue: 2000000,
          company_registration: 'DE: 11223344',
          business_form: 'LLC'
        },
        address: { country: 'DE', city: 'Berlin', billing: 'Startup Str. 42, Berlin' }
      },
      {
        name: 'Healthcare Innovation Labs',
        email: 'info@healthlabs.com',
        phone: '+1-555-0104',
        company: 'Healthcare Innovation Labs',
        status: 'active',
        industry: 'Healthcare',
        tags: ['Enterprise', 'High Priority'],
        lead_score: 95,
        custom_fields: {
          customer_type: 'business',
          language: 'en',
          currency: 'USD',
          source: 'cold_outreach',
          segment: 'Healthcare Technology',
          employees_count: 300,
          revenue: 12000000,
          company_registration: 'CVR: 55667788',
          business_form: 'Corp'
        },
        address: { country: 'US', city: 'Boston', billing: '567 Innovation Dr, Boston, MA' }
      },
      {
        name: 'Marie Dubois',
        email: 'marie.dubois@email.fr',
        phone: '+33-1-23-45-67-89',
        company: '',
        status: 'inactive',
        industry: '',
        tags: ['Lead'],
        lead_score: 35,
        custom_fields: {
          customer_type: 'private',
          language: 'fr',
          currency: 'EUR',
          source: 'facebook',
          segment: 'French Market'
        },
        address: { country: 'FR', city: 'Paris', billing: '123 Rue de la Paix, Paris' }
      },
      {
        name: 'Nordic Food Chain',
        email: 'orders@nordicfood.no',
        phone: '+47-22-12-34-56',
        company: 'Nordic Food Chain',
        status: 'active',
        industry: 'Food & Beverage',
        tags: ['SMB', 'Subscriber'],
        lead_score: 70,
        custom_fields: {
          customer_type: 'business',
          language: 'en',
          currency: 'EUR',
          source: 'website',
          segment: 'Food Service',
          employees_count: 125,
          revenue: 8000000,
          company_registration: 'NO: 99887766',
          business_form: 'ApS'
        },
        address: { country: 'NO', city: 'Oslo', billing: 'Food Street 15, Oslo' }
      },
      {
        name: 'Michael Chen',
        email: 'michael.chen@techmail.com',
        phone: '+1-555-0105',
        company: '',
        status: 'potential',
        industry: '',
        tags: ['Prospect'],
        lead_score: 55,
        custom_fields: {
          customer_type: 'private',
          language: 'en',
          currency: 'USD',
          source: 'google_ads',
          segment: 'Tech Professional'
        },
        address: { country: 'US', city: 'Seattle', billing: '890 Tech Valley, Seattle, WA' }
      },
      {
        name: 'Sustainable Fashion Co.',
        email: 'hello@sustainablefashion.com',
        phone: '+1-555-0106',
        company: 'Sustainable Fashion Co.',
        status: 'active',
        industry: 'Fashion & Retail',
        tags: ['SMB', 'Startup'],
        lead_score: 72,
        custom_fields: {
          customer_type: 'business',
          language: 'en',
          currency: 'USD',
          source: 'referral',
          segment: 'Sustainable Retail',
          employees_count: 45,
          revenue: 3500000,
          company_registration: 'CVR: 44556677',
          business_form: 'LLC'
        },
        address: { country: 'US', city: 'Portland', billing: '456 Eco Street, Portland, OR' }
      },
      {
        name: 'AI Research Institute',
        email: 'research@aiinstitute.edu',
        phone: '+1-555-0107',
        company: 'AI Research Institute',
        status: 'active',
        industry: 'Research & Development',
        tags: ['Enterprise', 'High Priority'],
        lead_score: 90,
        custom_fields: {
          customer_type: 'business',
          language: 'en',
          currency: 'USD',
          source: 'trade_show',
          segment: 'Research Institution',
          employees_count: 180,
          revenue: 15000000,
          company_registration: 'CVR: 33445566',
          business_form: 'Corp'
        },
        address: { country: 'US', city: 'Stanford', billing: '123 Research Blvd, Stanford, CA' }
      },
      {
        name: 'Emma Wilson',
        email: 'emma.wilson@example.co.uk',
        phone: '+44-20-7987-6543',
        company: '',
        status: 'active',
        industry: '',
        tags: ['VIP', 'Subscriber'],
        lead_score: 85,
        custom_fields: {
          customer_type: 'private',
          language: 'en',
          currency: 'GBP',
          source: 'referral',
          segment: 'UK Premium'
        },
        address: { country: 'GB', city: 'Manchester', billing: '789 Premium Gardens, Manchester' }
      },
      {
        name: 'Fintech Solutions AG',
        email: 'info@fintech.ch',
        phone: '+41-44-123-4567',
        company: 'Fintech Solutions AG',
        status: 'potential',
        industry: 'Financial Services',
        tags: ['Enterprise', 'Prospect'],
        lead_score: 88,
        custom_fields: {
          customer_type: 'business',
          language: 'de',
          currency: 'EUR',
          source: 'cold_outreach',
          segment: 'Financial Technology',
          employees_count: 85,
          revenue: 6500000,
          company_registration: 'CH: 77889900',
          business_form: 'A/S'
        },
        address: { country: 'CH', city: 'Zurich', billing: 'Fintech Plaza 10, Zurich' }
      },
      {
        name: 'Carlos Rodriguez',
        email: 'carlos.rodriguez@email.es',
        phone: '+34-91-123-4567',
        company: '',
        status: 'inactive',
        industry: '',
        tags: ['Lead'],
        lead_score: 40,
        custom_fields: {
          customer_type: 'private',
          language: 'es',
          currency: 'EUR',
          source: 'website',
          segment: 'Spanish Market'
        },
        address: { country: 'ES', city: 'Madrid', billing: 'Calle Principal 25, Madrid' }
      },
      {
        name: 'Clean Water Initiative',
        email: 'contact@cleanwater.org',
        phone: '+1-555-0108',
        company: 'Clean Water Initiative',
        status: 'active',
        industry: 'Non-Profit',
        tags: ['High Priority', 'Subscriber'],
        lead_score: 75,
        custom_fields: {
          customer_type: 'business',
          language: 'en',
          currency: 'USD',
          source: 'referral',
          segment: 'Non-Profit Organization',
          employees_count: 65,
          revenue: 2500000,
          company_registration: 'CVR: 22334455',
          business_form: 'Non-Profit'
        },
        address: { country: 'US', city: 'Denver', billing: '345 Clean St, Denver, CO' }
      },
      {
        name: 'Lisa Anderson',
        email: 'lisa.anderson@email.ca',
        phone: '+1-416-123-4567',
        company: '',
        status: 'potential',
        industry: '',
        tags: ['Prospect'],
        lead_score: 50,
        custom_fields: {
          customer_type: 'private',
          language: 'en',
          currency: 'USD',
          source: 'facebook',
          segment: 'Canadian Market'
        },
        address: { country: 'CA', city: 'Toronto', billing: '567 Maple Ave, Toronto, ON' }
      },
      {
        name: 'Smart City Solutions',
        email: 'info@smartcity.nl',
        phone: '+31-20-123-4567',
        company: 'Smart City Solutions',
        status: 'active',
        industry: 'Government Technology',
        tags: ['Enterprise', 'VIP'],
        lead_score: 93,
        custom_fields: {
          customer_type: 'business',
          language: 'en',
          currency: 'EUR',
          source: 'trade_show',
          segment: 'Smart City Technology',
          employees_count: 220,
          revenue: 18000000,
          company_registration: 'NL: 11223344',
          business_form: 'LLC'
        },
        address: { country: 'NL', city: 'Amsterdam', billing: 'Smart Plaza 50, Amsterdam' }
      },
      {
        name: 'Renewable Energy Consulting',
        email: 'consult@renewable.se',
        phone: '+46-8-123-4567',
        company: 'Renewable Energy Consulting',
        status: 'active',
        industry: 'Consulting',
        tags: ['SMB', 'High Priority'],
        lead_score: 80,
        custom_fields: {
          customer_type: 'business',
          language: 'en',
          currency: 'EUR',
          source: 'website',
          segment: 'Energy Consulting',
          employees_count: 55,
          revenue: 4200000,
          company_registration: 'SE: 55667788',
          business_form: 'ApS'
        },
        address: { country: 'SE', city: 'Stockholm', billing: 'Energy Street 12, Stockholm' }
      },
      {
        name: 'David Kim',
        email: 'david.kim@example.kr',
        phone: '+82-2-123-4567',
        company: '',
        status: 'potential',
        industry: '',
        tags: ['Lead', 'Prospect'],
        lead_score: 45,
        custom_fields: {
          customer_type: 'private',
          language: 'en',
          currency: 'USD',
          source: 'google_ads',
          segment: 'Asian Market'
        },
        address: { country: 'KR', city: 'Seoul', billing: '789 Tech District, Seoul' }
      }
    ];

    try {
      const { error } = await supabase
        .from('customers')
        .insert(fictitiousCustomers);

      if (error) throw error;
      fetchCustomers(); // Refresh the list
      console.log('20 fictitious customers created successfully!');
    } catch (error) {
      console.error('Error creating fictitious customers:', error);
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

  const loadCustomViews = () => {
    const saved = localStorage.getItem('customerCustomViews');
    if (saved) {
      setCustomViews(JSON.parse(saved));
    }
  };

  useEffect(() => {
    loadCustomViews();
  }, []);

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
        {/* Temporary button to generate test data */}
        <Button onClick={generateFictitiousCustomers} variant="outline" className="flex items-center gap-2">
          Generate Test Data
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
        />
      ) : (
        <>
          {/* Customer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCustomers.map((customer) => (
              <div key={customer.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
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
              <p className="text-gray-600">Try adjusting your search or filters</p>
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
