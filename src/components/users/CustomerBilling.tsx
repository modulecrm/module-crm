
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, Download, Package, AlertCircle, Clock, CheckCircle, Building2, DollarSign } from 'lucide-react';
import { format, differenceInDays } from 'date-fns';

interface CustomerBillingProps {
  enabledModules: string[];
}

// Mock customer invoices data - invoices YOU send TO your customers
const mockCustomerInvoices = [
  {
    id: 'INV-2024-001',
    customerId: '1',
    customerName: 'FitLife Training Center',
    date: new Date('2024-01-15'),
    dueDate: new Date('2024-01-30'),
    amount: 299.99,
    status: 'paid',
    description: 'Premium CRM Subscription - January 2024',
    paidDate: new Date('2024-01-16'),
    employeeCount: 12
  },
  {
    id: 'INV-2024-002',
    customerId: '2',
    customerName: 'PowerGym Chain',
    date: new Date('2024-01-15'),
    dueDate: new Date('2024-01-30'),
    amount: 599.99,
    status: 'paid',
    description: 'Enterprise CRM Subscription - January 2024',
    paidDate: new Date('2024-01-12'),
    employeeCount: 25
  },
  {
    id: 'INV-2024-003',
    customerId: '4',
    customerName: 'Elite Sports Academy',
    date: new Date('2024-01-15'),
    dueDate: new Date('2024-01-30'),
    amount: 299.99,
    status: 'overdue',
    description: 'Premium CRM Subscription - January 2024',
    paidDate: null,
    employeeCount: 8
  },
  {
    id: 'INV-2024-004',
    customerId: '3',
    customerName: 'Wellness Studio Pro',
    date: new Date('2024-02-01'),
    dueDate: new Date('2024-02-15'),
    amount: 149.99,
    status: 'pending',
    description: 'Standard CRM Subscription - February 2024',
    paidDate: null,
    employeeCount: 6
  }
];

// Your CRM pricing tiers
const pricingTiers = [
  {
    id: 'standard',
    name: 'Standard Plan',
    price: 149.99,
    modules: ['CRM', 'Booking', 'Invoice'],
    features: ['Up to 10 employees', 'Basic support', 'Standard modules']
  },
  {
    id: 'premium',
    name: 'Premium Plan', 
    price: 299.99,
    modules: ['CRM', 'Booking', 'Invoice', 'Subscription'],
    features: ['Up to 25 employees', 'Priority support', 'Advanced modules', 'Analytics']
  },
  {
    id: 'enterprise',
    name: 'Enterprise Plan',
    price: 599.99,
    modules: ['CRM', 'Booking', 'Invoice', 'Subscription', 'Analytics', 'Custom'],
    features: ['Unlimited employees', 'Dedicated support', 'All modules', 'Custom integrations']
  }
];

const CustomerBilling = ({ enabledModules }: CustomerBillingProps) => {
  const [customerInvoices] = useState(mockCustomerInvoices);

  const getStatusBadge = (status: string, dueDate: Date | null, paidDate: Date | null) => {
    const today = new Date();
    
    switch (status) {
      case 'paid':
        return (
          <span className="flex flex-col items-start">
            <Badge className="bg-green-100 text-green-700 flex items-center gap-1 mb-1">
              <CheckCircle className="h-3 w-3" />
              Paid
            </Badge>
            {paidDate && (
              <span className="text-xs text-gray-500">
                Paid: {format(paidDate, 'MMM dd, yyyy')}
              </span>
            )}
          </span>
        );
      case 'pending':
        return (
          <span className="flex flex-col items-start">
            <Badge className="bg-yellow-100 text-yellow-700 flex items-center gap-1 mb-1">
              <Clock className="h-3 w-3" />
              Pending
            </Badge>
            {dueDate && (
              <span className="text-xs text-gray-500">
                Due: {format(dueDate, 'MMM dd, yyyy')}
              </span>
            )}
          </span>
        );
      case 'overdue':
        const daysOverdue = dueDate ? differenceInDays(today, dueDate) : 0;
        return (
          <span className="flex flex-col items-start">
            <Badge className="bg-red-100 text-red-700 flex items-center gap-1 mb-1">
              <AlertCircle className="h-3 w-3" />
              Overdue
            </Badge>
            <span className="text-xs text-red-600 font-medium">
              {daysOverdue} days overdue
            </span>
          </span>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleSendReminder = (invoiceId: string, customerName: string) => {
    console.log(`Sending payment reminder for invoice ${invoiceId} to ${customerName}`);
    // In a real app, this would send an email reminder
  };

  const handleDownloadPDF = (invoiceId: string) => {
    console.log(`Downloading PDF for invoice: ${invoiceId}`);
    // In a real app, this would generate and download the invoice PDF
  };

  const totalRevenue = customerInvoices
    .filter(invoice => invoice.status === 'paid')
    .reduce((sum, invoice) => sum + invoice.amount, 0);

  const pendingRevenue = customerInvoices
    .filter(invoice => invoice.status === 'pending' || invoice.status === 'overdue')
    .reduce((sum, invoice) => sum + invoice.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Customer Billing</h2>
        <p className="text-gray-600 mt-1">Manage invoices sent to your customers and track payments</p>
      </div>

      {/* Revenue Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Revenue (Paid)</p>
                <p className="text-2xl font-bold text-gray-900">${totalRevenue.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Pending Revenue</p>
                <p className="text-2xl font-bold text-gray-900">${pendingRevenue.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Invoices</p>
                <p className="text-2xl font-bold text-gray-900">{customerInvoices.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CRM Pricing Plans */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Your CRM Pricing Plans
            </CardTitle>
            <CardDescription>The subscription plans you offer to customers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pricingTiers.map((tier) => (
                <div key={tier.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{tier.name}</h4>
                    <p className="text-xl font-bold text-blue-600">${tier.price}/month</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-1">
                      {tier.modules.map((module) => (
                        <Badge key={module} variant="secondary" className="text-xs">
                          {module}
                        </Badge>
                      ))}
                    </div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {tier.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Recent Billing Activity
            </CardTitle>
            <CardDescription>Latest payment updates from customers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {customerInvoices.slice(0, 4).map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{invoice.customerName}</p>
                    <p className="text-sm text-gray-600">{invoice.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${invoice.amount.toFixed(2)}</p>
                    <Badge className={
                      invoice.status === 'paid' ? 'bg-green-100 text-green-700' :
                      invoice.status === 'overdue' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                    }>
                      {invoice.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customer Invoices Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Customer Invoices
          </CardTitle>
          <CardDescription>
            Invoices sent to your customers for CRM subscriptions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice #</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Employees</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customerInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-gray-400" />
                      {invoice.customerName}
                    </div>
                  </TableCell>
                  <TableCell>{format(invoice.date, 'MMM dd, yyyy')}</TableCell>
                  <TableCell>
                    {invoice.dueDate ? format(invoice.dueDate, 'MMM dd, yyyy') : '-'}
                  </TableCell>
                  <TableCell className="font-semibold">${invoice.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    {getStatusBadge(invoice.status, invoice.dueDate, invoice.paidDate)}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{invoice.employeeCount} users</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownloadPDF(invoice.id)}
                        className="flex items-center gap-1"
                      >
                        <Download className="h-4 w-4" />
                        PDF
                      </Button>
                      {invoice.status === 'overdue' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleSendReminder(invoice.id, invoice.customerName)}
                          className="text-orange-600 hover:text-orange-700 flex items-center gap-1"
                        >
                          <AlertCircle className="h-4 w-4" />
                          Remind
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {customerInvoices.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No customer invoices found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerBilling;
