
import React from 'react';
import { Mail, Phone, MapPin, Building2, User, Star, ChevronDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

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

interface CustomerTableViewProps {
  customers: Customer[];
  getStatusColor: (status: string) => string;
  getLeadScoreColor: (score: number) => string;
  selectedCustomers: string[];
  onCustomerSelect: (customerId: string) => void;
  onSelectAll: () => void;
  onClearSelection: () => void;
  onCustomerClick?: (customer: Customer) => void;
}

const CustomerTableView: React.FC<CustomerTableViewProps> = ({
  customers,
  getStatusColor,
  getLeadScoreColor,
  selectedCustomers,
  onCustomerSelect,
  onSelectAll,
  onClearSelection,
  onCustomerClick
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const allSelected = customers.length > 0 && selectedCustomers.length === customers.length;
  const someSelected = selectedCustomers.length > 0 && selectedCustomers.length < customers.length;

  const handleAction = (action: string) => {
    if (selectedCustomers.length === 0) {
      alert('Please select at least one customer first.');
      return;
    }

    switch (action) {
      case 'send_email':
        console.log('Send email to customers:', selectedCustomers);
        alert(`Send email action for ${selectedCustomers.length} customer(s)`);
        break;
      case 'create_task':
        console.log('Create task for customers:', selectedCustomers);
        alert(`Create task action for ${selectedCustomers.length} customer(s)`);
        break;
      case 'mass_update':
        console.log('Mass update customers:', selectedCustomers);
        alert(`Mass update action for ${selectedCustomers.length} customer(s)`);
        break;
      case 'create_document':
        console.log('Create document for customers:', selectedCustomers);
        alert(`Create document action for ${selectedCustomers.length} customer(s)`);
        break;
      case 'delete':
        if (confirm(`Are you sure you want to delete ${selectedCustomers.length} customer(s)?`)) {
          console.log('Delete customers:', selectedCustomers);
          alert(`Delete action for ${selectedCustomers.length} customer(s)`);
        }
        break;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
      {/* Actions Bar */}
      <div className="p-3 md:p-4 border-b flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-center gap-2 md:gap-4">
          <div className="flex items-center gap-2">
            <Checkbox
              checked={allSelected || someSelected}
              onCheckedChange={allSelected ? onClearSelection : onSelectAll}
            />
            <span className="text-sm text-gray-600">
              {selectedCustomers.length > 0 
                ? `${selectedCustomers.length} selected` 
                : 'Select all'
              }
            </span>
          </div>
          
          {selectedCustomers.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClearSelection}
            >
              Clear selection
            </Button>
          )}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-2 w-full sm:w-auto"
              disabled={selectedCustomers.length === 0}
            >
              Actions
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-white z-50">
            <DropdownMenuItem onClick={() => handleAction('send_email')}>
              <Mail className="h-4 w-4 mr-2" />
              Send Email
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleAction('create_task')}>
              Create Task
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleAction('mass_update')}>
              Mass Update
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleAction('create_document')}>
              Create Document
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => handleAction('delete')}
              className="text-red-600 hover:text-red-700"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Mobile Card View for small screens */}
      <div className="block md:hidden">
        {customers.map((customer) => (
          <div
            key={customer.id}
            className={`border-b p-4 hover:bg-gray-50 cursor-pointer ${
              selectedCustomers.includes(customer.id) ? 'bg-blue-50' : ''
            }`}
            onClick={(e) => {
              if (!(e.target as HTMLElement).closest('[role="checkbox"]') && onCustomerClick) {
                onCustomerClick(customer);
              }
            }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <Checkbox
                  checked={selectedCustomers.includes(customer.id)}
                  onCheckedChange={() => onCustomerSelect(customer.id)}
                  onClick={(e) => e.stopPropagation()}
                />
                
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  {customer.custom_fields?.customer_type === 'business' ? (
                    <Building2 className="h-4 w-4 text-blue-500 flex-shrink-0" />
                  ) : (
                    <User className="h-4 w-4 text-green-500 flex-shrink-0" />
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-gray-900 text-sm truncate">{customer.name}</div>
                    {customer.company && (
                      <div className="text-xs text-gray-500 truncate">{customer.company}</div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 flex-shrink-0">
                <Badge className={getStatusColor(customer.status)} />
                <div className="flex items-center gap-1">
                  <Star className={`h-3 w-3 ${getLeadScoreColor(customer.lead_score)}`} />
                  <span className={`text-xs font-medium ${getLeadScoreColor(customer.lead_score)}`}>
                    {customer.lead_score}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2 text-xs text-gray-600 mb-2">
              {customer.email && (
                <div className="flex items-center">
                  <Mail className="h-3 w-3 mr-2" />
                  <span className="truncate">{customer.email}</span>
                </div>
              )}
              {customer.phone && (
                <div className="flex items-center">
                  <Phone className="h-3 w-3 mr-2" />
                  <span className="truncate">{customer.phone}</span>
                </div>
              )}
              {customer.address?.country && (
                <div className="flex items-center">
                  <MapPin className="h-3 w-3 mr-2" />
                  <span className="truncate">{customer.address.city}, {customer.address.country}</span>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center text-xs">
              <Badge variant="outline">
                {customer.custom_fields?.customer_type === 'business' ? 'B2B' : 'B2C'}
              </Badge>
              <span className="text-gray-500">{formatDate(customer.created_at)}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={allSelected || someSelected}
                  onCheckedChange={allSelected ? onClearSelection : onSelectAll}
                />
              </TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Industry</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Lead Score</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow 
                key={customer.id} 
                className={`hover:bg-gray-50 cursor-pointer ${
                  selectedCustomers.includes(customer.id) ? 'bg-blue-50' : ''
                }`}
                onClick={(e) => {
                  if (!(e.target as HTMLElement).closest('[role="checkbox"]') && onCustomerClick) {
                    onCustomerClick(customer);
                  }
                }}
              >
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    checked={selectedCustomers.includes(customer.id)}
                    onCheckedChange={() => onCustomerSelect(customer.id)}
                  />
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-3">
                    {customer.custom_fields?.customer_type === 'business' ? (
                      <Building2 className="h-5 w-5 text-blue-500" />
                    ) : (
                      <User className="h-5 w-5 text-green-500" />
                    )}
                    <div>
                      <div className="font-semibold text-gray-900">{customer.name}</div>
                      {customer.company && (
                        <div className="text-sm text-gray-500">{customer.company}</div>
                      )}
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <Badge variant="outline" className="text-xs">
                    {customer.custom_fields?.customer_type === 'business' ? 'B2B' : 'B2C'}
                  </Badge>
                </TableCell>

                <TableCell>
                  <div className="space-y-1">
                    {customer.email && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="h-3 w-3 mr-2" />
                        {customer.email}
                      </div>
                    )}
                    {customer.phone && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="h-3 w-3 mr-2" />
                        {customer.phone}
                      </div>
                    )}
                  </div>
                </TableCell>

                <TableCell>
                  <span className="text-sm text-gray-600">{customer.industry || '-'}</span>
                </TableCell>

                <TableCell>
                  {customer.address?.country && (
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-3 w-3 mr-2" />
                      {customer.address.city}, {customer.address.country}
                    </div>
                  )}
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2">
                    <Star className={`h-4 w-4 ${getLeadScoreColor(customer.lead_score)}`} />
                    <span className={`text-sm font-medium ${getLeadScoreColor(customer.lead_score)}`}>
                      {customer.lead_score}
                    </span>
                  </div>
                </TableCell>

                <TableCell>
                  <Badge className={getStatusColor(customer.status)}>
                    {customer.status}
                  </Badge>
                </TableCell>

                <TableCell>
                  {customer.tags && customer.tags.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {customer.tags.slice(0, 2).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {customer.tags.length > 2 && (
                        <span className="text-xs text-gray-500">
                          +{customer.tags.length - 2}
                        </span>
                      )}
                    </div>
                  ) : (
                    <span className="text-xs text-gray-400">No tags</span>
                  )}
                </TableCell>

                <TableCell>
                  <span className="text-sm text-gray-600">
                    {formatDate(customer.created_at)}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {customers.length === 0 && (
        <div className="text-center py-8 md:py-12">
          <div className="text-base md:text-lg font-medium text-gray-900 mb-2">No customers found</div>
          <p className="text-sm md:text-base text-gray-600">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default CustomerTableView;
