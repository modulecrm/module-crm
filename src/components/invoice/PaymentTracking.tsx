
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CreditCard, Clock, AlertCircle, CheckCircle, Send, DollarSign } from 'lucide-react';
import { format } from 'date-fns';

const PaymentTracking = () => {
  const [statusFilter, setStatusFilter] = useState('all');

  const { data: paymentData, isLoading } = useQuery({
    queryKey: ['payment_tracking', statusFilter],
    queryFn: async () => {
      let query = supabase
        .from('invoices_extended')
        .select(`
          *,
          customers(name, email),
          payment_reminders(*)
        `)
        .order('due_date', { ascending: true });

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    }
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'overdue':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      case 'sent':
        return <Clock className="h-4 w-4 text-orange-600" />;
      default:
        return <CreditCard className="h-4 w-4 text-gray-600" />;
    }
  };

  const getPaymentMethods = () => [
    { id: 'stripe', name: 'Stripe', icon: '💳' },
    { id: 'paypal', name: 'PayPal', icon: '🅿️' },
    { id: 'bank', name: 'Bank Transfer', icon: '🏦' },
    { id: 'mobilepay', name: 'MobilePay', icon: '📱' }
  ];

  const totalOutstanding = paymentData?.filter(inv => inv.status === 'sent').reduce((sum, inv) => sum + inv.total_amount, 0) || 0;
  const totalOverdue = paymentData?.filter(inv => inv.status === 'overdue').reduce((sum, inv) => sum + inv.total_amount, 0) || 0;
  const totalPaid = paymentData?.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.total_amount, 0) || 0;

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading payment data...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Payment Tracking</h2>
          <p className="text-gray-600">Monitor invoice payments and send automated reminders</p>
        </div>
        <Button>
          <Send className="h-4 w-4 mr-2" />
          Send Reminders
        </Button>
      </div>

      {/* Payment overview cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">${totalOutstanding.toFixed(2)}</div>
                <div className="text-sm text-gray-600">Outstanding</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertCircle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">${totalOverdue.toFixed(2)}</div>
                <div className="text-sm text-gray-600">Overdue</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">${totalPaid.toFixed(2)}</div>
                <div className="text-sm text-gray-600">Paid This Month</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <DollarSign className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">94%</div>
                <div className="text-sm text-gray-600">Collection Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment methods */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Gateway Integration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {getPaymentMethods().map((method) => (
              <div key={method.id} className="flex items-center gap-3 p-4 border rounded-lg">
                <span className="text-2xl">{method.icon}</span>
                <div>
                  <div className="font-medium">{method.name}</div>
                  <Badge variant="outline" className="text-xs">Connected</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment tracking table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Invoice Payment Status</CardTitle>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Invoices</SelectItem>
                <SelectItem value="sent">Outstanding</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Days Overdue</TableHead>
                <TableHead>Reminders Sent</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paymentData?.map((invoice) => {
                const daysOverdue = invoice.due_date ? 
                  Math.max(0, Math.floor((Date.now() - new Date(invoice.due_date).getTime()) / (1000 * 60 * 60 * 24))) : 0;
                
                return (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">
                      {invoice.invoice_number}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{invoice.customers?.name}</div>
                        <div className="text-sm text-gray-500">{invoice.customers?.email}</div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      ${invoice.total_amount.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      {invoice.due_date ? format(new Date(invoice.due_date), 'MMM dd, yyyy') : '-'}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(invoice.status)}
                        <Badge variant={
                          invoice.status === 'paid' ? 'default' :
                          invoice.status === 'overdue' ? 'destructive' :
                          invoice.status === 'sent' ? 'secondary' : 'outline'
                        }>
                          {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      {invoice.status === 'overdue' && daysOverdue > 0 ? (
                        <Badge variant="destructive">{daysOverdue} days</Badge>
                      ) : '-'}
                    </TableCell>
                    <TableCell>
                      {invoice.payment_reminders?.length || 0}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {invoice.status !== 'paid' && (
                          <Button variant="outline" size="sm">
                            <Send className="h-4 w-4 mr-1" />
                            Remind
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          Mark Paid
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
              
              {!paymentData?.length && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                    No invoices found for the selected filter.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Customer payment portal info */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Self-Service Portal</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">Portal Features</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• View and download invoices</li>
                <li>• Make secure online payments</li>
                <li>• Access payment history</li>
                <li>• Update billing information</li>
                <li>• Set up automatic payments</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Portal Settings</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  Configure Portal Theme
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Set Payment Options
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Manage Access Settings
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentTracking;
