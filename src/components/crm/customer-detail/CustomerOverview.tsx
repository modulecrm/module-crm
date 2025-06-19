
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CreditCard, FileText, Download, Mail, Plus, Calendar, History } from 'lucide-react';

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
  // Mock data for demonstration
  const subscriptionType = "Premium - Monthly";
  const totalRevenue = "DKK 72,540";
  const latestInvoice = { id: "INV-2024-001", date: "2024-01-15", amount: "DKK 2,500" };
  const paymentStatus = "Paid";
  const aiSuggestion = "Ready for upgrade";

  const getPaymentStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
        {/* Subscription Type */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Subscription</p>
                <p className="font-semibold">{subscriptionType}</p>
              </div>
              <Button variant="outline" size="sm">Change</Button>
            </div>
          </CardContent>
        </Card>

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

        {/* Latest Invoice */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Latest Invoice</p>
                <p className="font-semibold">{latestInvoice.id}</p>
                <p className="text-xs text-gray-500">{latestInvoice.date} • {latestInvoice.amount}</p>
              </div>
              <Button variant="ghost" size="sm">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Payment Status */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Payment Status</p>
                <Badge className={getPaymentStatusColor(paymentStatus)}>
                  {paymentStatus}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

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
