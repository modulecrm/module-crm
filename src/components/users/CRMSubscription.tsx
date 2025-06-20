
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, Download, CreditCard, Package, AlertCircle, Clock, CheckCircle, Plus, Settings } from 'lucide-react';
import { modules, branchModules } from '../modules/moduleData';
import { format, differenceInDays } from 'date-fns';

interface CRMSubscriptionProps {
  enabledModules: string[];
}

// Mock subscription invoices - what this organization pays for CRM access
const mockSubscriptionInvoices = [
  {
    id: 'INV-2024-001',
    date: new Date('2024-01-15'),
    dueDate: null,
    amount: 299.99,
    status: 'paid',
    description: 'CRM Premium Plan - January 2024 (5 users)',
    paidDate: new Date('2024-01-16')
  },
  {
    id: 'INV-2024-002',
    date: new Date('2024-02-15'),
    dueDate: new Date('2024-02-20'),
    amount: 299.99,
    status: 'pending',
    description: 'CRM Premium Plan - February 2024 (5 users)',
    paidDate: null
  }
];

// Mock payment methods for CRM subscription
const mockPaymentMethods = [
  {
    id: '1',
    type: 'card',
    brand: 'Visa',
    lastFour: '4242',
    expiryMonth: 12,
    expiryYear: 2025,
    isDefault: true
  }
];

const CRMSubscription = ({ enabledModules }: CRMSubscriptionProps) => {
  const [paymentMethods] = useState(mockPaymentMethods);
  const [subscriptionInvoices] = useState(mockSubscriptionInvoices);

  // Get all modules data
  const allModules = [...modules, ...branchModules];
  
  // Filter to get only enabled modules
  const activeModules = allModules.filter(module => enabledModules.includes(module.id));
  
  // Calculate total price
  const totalPrice = activeModules.reduce((sum, module) => {
    const price = parseFloat(module.price.replace(/[^0-9.]/g, ''));
    return sum + price;
  }, 0);

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

  const handlePayNow = (invoiceId: string) => {
    console.log(`Redirecting to payment for invoice: ${invoiceId}`);
    window.open(`https://checkout.stripe.com/pay/invoice/${invoiceId}`, '_blank');
  };

  const handleDownloadPDF = (invoiceId: string) => {
    console.log(`Downloading PDF for invoice: ${invoiceId}`);
    const link = document.createElement('a');
    link.href = '#';
    link.download = `${invoiceId}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const currentUserCount = 5; // Mock current user count

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">CRM Subscription</h2>
        <p className="text-gray-600 mt-1">Manage your subscription, billing, and active CRM modules</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Subscription Plan */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Current Plan
              </div>
              <Button size="sm" variant="outline">
                <Settings className="h-4 w-4 mr-1" />
                Upgrade
              </Button>
            </CardTitle>
            <CardDescription>Your active CRM subscription and modules</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg bg-blue-50">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">Premium Plan</h4>
                  <Badge className="bg-blue-100 text-blue-700">Active</Badge>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Users:</span>
                    <span className="font-medium">{currentUserCount} users</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Active Modules:</span>
                    <span className="font-medium">{activeModules.length} modules</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly Cost:</span>
                    <span className="font-bold text-blue-600">${totalPrice.toFixed(2)}/month</span>
                  </div>
                </div>
              </div>

              <div>
                <h5 className="font-medium text-gray-900 mb-2">Active Modules</h5>
                <div className="space-y-2">
                  {activeModules.slice(0, 4).map((module) => (
                    <div key={module.id} className="flex items-center justify-between py-1">
                      <div className="flex items-center gap-2">
                        <div className={`p-1 rounded bg-gradient-to-r ${module.color}`}>
                          <module.icon className="h-3 w-3 text-white" />
                        </div>
                        <span className="text-sm text-gray-700">{module.name}</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{module.price}</span>
                    </div>
                  ))}
                  {activeModules.length > 4 && (
                    <div className="text-sm text-gray-500">
                      +{activeModules.length - 4} more modules
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Methods
              </div>
              <Button size="sm" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Card
              </Button>
            </CardTitle>
            <CardDescription>Manage payment methods for your CRM subscription</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center">
                      <CreditCard className="h-4 w-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {method.brand} •••• {method.lastFour}
                      </p>
                      <p className="text-sm text-gray-600">
                        Expires {method.expiryMonth}/{method.expiryYear}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {method.isDefault && (
                      <Badge variant="secondary" className="text-xs">Default</Badge>
                    )}
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Billing History
          </CardTitle>
          <CardDescription>
            Your CRM subscription invoices and payment history
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice #</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscriptionInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{format(invoice.date, 'MMM dd, yyyy')}</TableCell>
                  <TableCell>
                    {invoice.dueDate ? format(invoice.dueDate, 'MMM dd, yyyy') : '-'}
                  </TableCell>
                  <TableCell className="font-semibold">${invoice.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    {getStatusBadge(invoice.status, invoice.dueDate, invoice.paidDate)}
                  </TableCell>
                  <TableCell className="max-w-xs truncate">{invoice.description}</TableCell>
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
                      {invoice.status === 'pending' && (
                        <Button
                          size="sm"
                          onClick={() => handlePayNow(invoice.id)}
                          className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1"
                        >
                          <CreditCard className="h-4 w-4" />
                          Pay Now
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {subscriptionInvoices.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No billing history found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CRMSubscription;
