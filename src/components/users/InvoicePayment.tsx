
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, Download, CreditCard, Package, AlertCircle, Clock, CheckCircle, Plus } from 'lucide-react';
import { modules, branchModules } from '../modules/moduleData';
import { format, differenceInDays } from 'date-fns';

interface InvoicePaymentProps {
  enabledModules: string[];
}

// Mock invoice data
const mockInvoices = [
  {
    id: 'INV-2024-001',
    date: new Date('2024-01-15'),
    dueDate: null,
    amount: 299.99,
    status: 'pending',
    description: 'Premium Subscription - January 2024',
    paidDate: null
  },
  {
    id: 'INV-2024-002',
    date: new Date('2024-02-15'),
    dueDate: new Date('2024-02-20'),
    amount: 299.99,
    status: 'paid',
    description: 'Premium Subscription - February 2024',
    paidDate: new Date('2024-02-18')
  },
  {
    id: 'INV-2024-003',
    date: new Date('2024-01-01'),
    dueDate: new Date('2024-01-31'),
    amount: 149.99,
    status: 'overdue',
    description: 'Additional Services - January 2024',
    paidDate: null
  }
];

// Mock payment methods
const mockPaymentMethods = [
  {
    id: '1',
    type: 'card',
    brand: 'Visa',
    lastFour: '4242',
    expiryMonth: 12,
    expiryYear: 2025,
    isDefault: true
  },
  {
    id: '2',
    type: 'card',
    brand: 'MasterCard',
    lastFour: '5555',
    expiryMonth: 8,
    expiryYear: 2026,
    isDefault: false
  }
];

const InvoicePayment = ({ enabledModules }: InvoicePaymentProps) => {
  const [paymentMethods] = useState(mockPaymentMethods);

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
            <span className="text-xs text-gray-500">
              No due date set
            </span>
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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Invoice & Payment</h2>
        <p className="text-gray-600 mt-1">Manage your invoices, payment methods, and active modules</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Modules & Pricing */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Active Modules
            </CardTitle>
            <CardDescription>Your current subscription and pricing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activeModules.map((module) => (
                <div key={module.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${module.color}`}>
                      <module.icon className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{module.name}</p>
                      {'premium' in module && module.premium && (
                        <Badge variant="secondary" className="text-xs">Premium</Badge>
                      )}
                    </div>
                  </div>
                  <p className="font-semibold text-gray-900">{module.price}</p>
                </div>
              ))}
              
              {activeModules.length === 0 && (
                <p className="text-gray-500 text-center py-4">No active modules</p>
              )}
              
              {activeModules.length > 0 && (
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold text-gray-900">Total Monthly Cost</p>
                    <p className="text-xl font-bold text-blue-600">${totalPrice.toFixed(2)}/month</p>
                  </div>
                </div>
              )}
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
            <CardDescription>Manage your payment cards</CardDescription>
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
              
              {paymentMethods.length === 0 && (
                <p className="text-gray-500 text-center py-4">No payment methods added</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customer Invoices Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Your Invoices
          </CardTitle>
          <CardDescription>
            View and manage your billing history
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
              {mockInvoices.map((invoice) => (
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
                      {invoice.status === 'overdue' && (
                        <Button
                          size="sm"
                          onClick={() => handlePayNow(invoice.id)}
                          className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-1"
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
          
          {mockInvoices.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No invoices found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InvoicePayment;
