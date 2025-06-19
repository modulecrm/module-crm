
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { CreditCard, FileText, Download, Mail, Plus, Calendar, History, ArrowUpDown, Send } from 'lucide-react';

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

interface CustomerOverviewProps {
  customer: Customer;
}

const CustomerOverview: React.FC<CustomerOverviewProps> = ({ customer }) => {
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false);
  const [isInvoicesOpen, setIsInvoicesOpen] = useState(false);

  // Mock data for demonstration
  const subscriptionType = "Premium - Monthly";
  const totalRevenue = "DKK 72,540";
  const latestInvoice = { 
    id: "INV-2024-001", 
    date: "2024-01-15", 
    amount: "DKK 2,500",
    dueDate: "2024-02-15",
    paid: true 
  };
  const aiSuggestion = "Ready for upgrade";

  // Mock subscription plans for upgrade/downgrade
  const subscriptionPlans = [
    { id: 'basic', name: 'Basic', price: 'DKK 199', features: ['5 Projects', 'Basic Support'] },
    { id: 'premium', name: 'Premium', price: 'DKK 499', features: ['Unlimited Projects', 'Priority Support', 'Advanced Analytics'], current: true },
    { id: 'enterprise', name: 'Enterprise', price: 'DKK 999', features: ['Everything in Premium', 'Custom Integrations', 'Dedicated Support'] },
  ];

  // Mock invoices data
  const invoices = [
    { id: "INV-2024-003", date: "2024-03-15", amount: "DKK 2,500", dueDate: "2024-04-15", paid: false, status: "overdue" },
    { id: "INV-2024-002", date: "2024-02-15", amount: "DKK 2,500", dueDate: "2024-03-15", paid: true, status: "paid" },
    { id: "INV-2024-001", date: "2024-01-15", amount: "DKK 2,500", dueDate: "2024-02-15", paid: true, status: "paid" },
  ];

  const getPaymentStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSendPaymentLink = (invoiceId: string) => {
    console.log(`Sending payment link for invoice ${invoiceId}`);
    // Implementation for sending payment link
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* Subscription Type - Clickable */}
        <Sheet open={isSubscriptionOpen} onOpenChange={setIsSubscriptionOpen}>
          <SheetTrigger asChild>
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div>
                  <p className="text-sm text-gray-600">Subscription</p>
                  <p className="font-semibold">{subscriptionType}</p>
                </div>
              </CardContent>
            </Card>
          </SheetTrigger>
          <SheetContent className="w-[400px] sm:w-[540px]">
            <SheetHeader>
              <SheetTitle>Subscription Management</SheetTitle>
              <SheetDescription>
                Manage subscription plan for {customer.name}
              </SheetDescription>
            </SheetHeader>
            <div className="mt-6">
              <div className="space-y-4">
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2">Current Subscription</h3>
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="font-semibold text-blue-900">{subscriptionType}</p>
                    <p className="text-sm text-blue-700">Next billing: March 15, 2024</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Available Plans</h3>
                  <div className="space-y-3">
                    {subscriptionPlans.map((plan) => (
                      <div key={plan.id} className={`p-4 rounded-lg border ${plan.current ? 'border-blue-300 bg-blue-50' : 'border-gray-200'}`}>
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold">{plan.name}</h4>
                              {plan.current && <Badge className="bg-blue-100 text-blue-800">Current</Badge>}
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{plan.price}/month</p>
                            <ul className="text-xs text-gray-600 space-y-1">
                              {plan.features.map((feature, index) => (
                                <li key={index}>• {feature}</li>
                              ))}
                            </ul>
                          </div>
                          {!plan.current && (
                            <Button size="sm" variant="outline">
                              <ArrowUpDown className="h-4 w-4 mr-2" />
                              Switch
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Total Revenue */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold">💰</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="font-semibold text-green-600">{totalRevenue}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Latest Invoice & Payment Status - Merged and Clickable */}
        <Sheet open={isInvoicesOpen} onOpenChange={setIsInvoicesOpen}>
          <SheetTrigger asChild>
            <Card className="cursor-pointer hover:shadow-md transition-shadow col-span-1 md:col-span-2 lg:col-span-1">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Latest Invoice</p>
                    <p className="font-semibold">{latestInvoice.id}</p>
                    <p className="text-xs text-gray-500">Due: {latestInvoice.dueDate}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-xs font-medium">{latestInvoice.amount}</p>
                      <Badge className={getPaymentStatusColor(latestInvoice.paid ? 'paid' : 'pending')}>
                        {latestInvoice.paid ? 'Paid' : 'Pending'}
                      </Badge>
                    </div>
                  </div>
                  <FileText className="h-5 w-5 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          </SheetTrigger>
          <SheetContent className="w-[400px] sm:w-[540px]">
            <SheetHeader>
              <SheetTitle>Invoice Management</SheetTitle>
              <SheetDescription>
                View and manage invoices for {customer.name}
              </SheetDescription>
            </SheetHeader>
            <div className="mt-6">
              <div className="space-y-4">
                {invoices.map((invoice) => (
                  <div key={invoice.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">{invoice.id}</h4>
                          <Badge className={getPaymentStatusColor(invoice.status)}>
                            {invoice.status.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">Invoice Date: {invoice.date}</p>
                        <p className="text-sm text-gray-600">Due Date: {invoice.dueDate}</p>
                        <p className="text-sm font-medium mt-1">Amount: {invoice.amount}</p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                        {!invoice.paid && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleSendPaymentLink(invoice.id)}
                          >
                            <Send className="h-4 w-4 mr-2" />
                            Send Link
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* AI Suggestions */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold">🧠</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">AI Suggestion</p>
                <p className="font-semibold text-blue-600">{aiSuggestion}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Shortcuts */}
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Send Invoice
        </Button>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Task
        </Button>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Mail className="h-4 w-4" />
          Start Email
        </Button>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <History className="h-4 w-4" />
          View Subscription Log
        </Button>
      </div>
    </div>
  );
};

export default CustomerOverview;
