
import React from 'react';
import { Mail, Phone, MapPin, Building2, User, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

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
}

const CustomerTableView: React.FC<CustomerTableViewProps> = ({
  customers,
  getStatusColor,
  getLeadScoreColor
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <Table>
        <TableHeader>
          <TableRow>
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
            <TableRow key={customer.id} className="hover:bg-gray-50">
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

      {customers.length === 0 && (
        <div className="text-center py-12">
          <div className="text-lg font-medium text-gray-900 mb-2">No customers found</div>
          <p className="text-gray-600">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default CustomerTableView;
