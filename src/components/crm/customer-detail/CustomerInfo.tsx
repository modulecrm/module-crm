
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Mail, Phone, Edit, Star } from 'lucide-react';

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
    [key: string]: any;
  };
  address?: {
    country?: string;
    city?: string;
    [key: string]: any;
  };
}

interface CustomerInfoProps {
  customer: Customer;
}

interface Contact {
  id: string;
  name: string;
  title: string;
  phone: string;
  email: string;
  isPrimary: boolean;
}

const CustomerInfo: React.FC<CustomerInfoProps> = ({ customer }) => {
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: '1',
      name: 'John Smith',
      title: 'CEO',
      phone: '+1-555-0101',
      email: 'john@company.com',
      isPrimary: true
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      title: 'CFO',
      phone: '+1-555-0102',
      email: 'sarah@company.com',
      isPrimary: false
    }
  ]);

  return (
    <div className="space-y-6">
      {/* Primary Customer Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Customer Information
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Company Name</label>
              <p className="font-semibold">{customer.company || customer.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Customer Type</label>
              <Badge variant="outline">
                {customer.custom_fields?.customer_type === 'business' ? 'Business' : 'Private'}
              </Badge>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">CVR/VAT Number</label>
              <p className="font-semibold">{customer.custom_fields?.company_registration || 'N/A'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Language</label>
              <p className="font-semibold">{customer.custom_fields?.language?.toUpperCase() || 'EN'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Currency</label>
              <p className="font-semibold">{customer.custom_fields?.currency || 'USD'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Industry</label>
              <p className="font-semibold">{customer.industry || 'N/A'}</p>
            </div>
          </div>

          {/* Address Information */}
          <div className="border-t pt-4">
            <h4 className="font-medium mb-2">Address Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Country</label>
                <p className="font-semibold">{customer.address?.country || 'N/A'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">City</label>
                <p className="font-semibold">{customer.address?.city || 'N/A'}</p>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-600">Billing Address</label>
                <p className="font-semibold">{customer.address?.billing || 'N/A'}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contacts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Contacts
            <Button size="sm" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Contact
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {contacts.map((contact) => (
              <div key={contact.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">{contact.name}</h4>
                    {contact.isPrimary && (
                      <Badge variant="default" className="text-xs">
                        <Star className="h-3 w-3 mr-1" />
                        Primary
                      </Badge>
                    )}
                  </div>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-gray-600 mb-2">{contact.title}</p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">{contact.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">{contact.email}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerInfo;
