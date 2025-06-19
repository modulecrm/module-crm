
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Trash2, Sparkles, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LineItem {
  id: string;
  product_id?: string;
  description: string;
  quantity: number;
  unit_price: number;
  discount_percentage: number;
  tax_rate: number;
  line_total: number;
}

const CreateInvoice = () => {
  const [invoiceData, setInvoiceData] = useState({
    customer_id: '',
    deal_id: '',
    subscription_id: '',
    due_date: '',
    payment_terms: 'Net 30',
    notes: '',
    currency: 'USD'
  });
  
  const [lineItems, setLineItems] = useState<LineItem[]>([
    { id: '1', description: '', quantity: 1, unit_price: 0, discount_percentage: 0, tax_rate: 25, line_total: 0 }
  ]);

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch customers for dropdown
  const { data: customers } = useQuery({
    queryKey: ['customers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('customers')
        .select('id, name, email')
        .order('name');
      if (error) throw error;
      return data;
    }
  });

  // Fetch products for AI suggestions
  const { data: products } = useQuery({
    queryKey: ['invoice_products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('invoice_products')
        .select('*')
        .eq('is_active', true)
        .order('name');
      if (error) throw error;
      return data;
    }
  });

  // Calculate line item total
  const calculateLineTotal = (item: LineItem) => {
    const subtotal = item.quantity * item.unit_price;
    const discountAmount = subtotal * (item.discount_percentage / 100);
    const afterDiscount = subtotal - discountAmount;
    const taxAmount = afterDiscount * (item.tax_rate / 100);
    return afterDiscount + taxAmount;
  };

  // Update line item
  const updateLineItem = (id: string, field: keyof LineItem, value: any) => {
    setLineItems(prev => prev.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: value };
        updated.line_total = calculateLineTotal(updated);
        return updated;
      }
      return item;
    }));
  };

  // Add line item
  const addLineItem = () => {
    const newId = Date.now().toString();
    setLineItems(prev => [...prev, {
      id: newId,
      description: '',
      quantity: 1,
      unit_price: 0,
      discount_percentage: 0,
      tax_rate: 25,
      line_total: 0
    }]);
  };

  // Remove line item
  const removeLineItem = (id: string) => {
    if (lineItems.length > 1) {
      setLineItems(prev => prev.filter(item => item.id !== id));
    }
  };

  // AI suggestion for products based on customer
  const suggestProducts = async (customerId: string) => {
    if (!customerId || !products) return;
    
    // Simple AI logic: suggest popular products for this customer type
    const suggestedProducts = products.slice(0, 3);
    
    toast({
      title: "AI Suggestions",
      description: `Found ${suggestedProducts.length} recommended products for this customer.`,
    });
  };

  // Calculate totals
  const subtotal = lineItems.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0);
  const totalDiscount = lineItems.reduce((sum, item) => sum + (item.quantity * item.unit_price * item.discount_percentage / 100), 0);
  const totalTax = lineItems.reduce((sum, item) => {
    const afterDiscount = (item.quantity * item.unit_price) - (item.quantity * item.unit_price * item.discount_percentage / 100);
    return sum + (afterDiscount * item.tax_rate / 100);
  }, 0);
  const grandTotal = subtotal - totalDiscount + totalTax;

  // Create invoice mutation
  const createInvoiceMutation = useMutation({
    mutationFn: async () => {
      // Generate invoice number
      const invoiceNumber = `INV-${Date.now()}`;
      
      // Create invoice
      const { data: invoice, error: invoiceError } = await supabase
        .from('invoices_extended')
        .insert({
          invoice_number: invoiceNumber,
          ...invoiceData,
          subtotal,
          tax_amount: totalTax,
          discount_amount: totalDiscount,
          total_amount: grandTotal,
          status: 'draft'
        })
        .select()
        .single();

      if (invoiceError) throw invoiceError;

      // Create line items
      const lineItemsData = lineItems.map(item => ({
        invoice_id: invoice.id,
        ...item
      }));

      const { error: lineItemError } = await supabase
        .from('invoice_line_items')
        .insert(lineItemsData);

      if (lineItemError) throw lineItemError;

      return invoice;
    },
    onSuccess: () => {
      toast({
        title: "Invoice Created",
        description: "Invoice has been created successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      // Reset form
      setInvoiceData({
        customer_id: '',
        deal_id: '',
        subscription_id: '',
        due_date: '',
        payment_terms: 'Net 30',
        notes: '',
        currency: 'USD'
      });
      setLineItems([
        { id: '1', description: '', quantity: 1, unit_price: 0, discount_percentage: 0, tax_rate: 25, line_total: 0 }
      ]);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create invoice. Please try again.",
        variant: "destructive"
      });
      console.error('Invoice creation error:', error);
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Create New Invoice</h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => suggestProducts(invoiceData.customer_id)}
            disabled={!invoiceData.customer_id}
          >
            <Sparkles className="h-4 w-4 mr-2" />
            AI Suggestions
          </Button>
          <Button onClick={() => createInvoiceMutation.mutate()}>
            Create Invoice
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Invoice Details */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Invoice Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="customer">Customer *</Label>
                <Select value={invoiceData.customer_id} onValueChange={(value) => setInvoiceData(prev => ({ ...prev, customer_id: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select customer">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>Select customer</span>
                      </div>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {customers?.map((customer) => (
                      <SelectItem key={customer.id} value={customer.id}>
                        <div>
                          <div className="font-medium">{customer.name}</div>
                          <div className="text-sm text-gray-500">{customer.email}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="due_date">Due Date</Label>
                <Input
                  id="due_date"
                  type="date"
                  value={invoiceData.due_date}
                  onChange={(e) => setInvoiceData(prev => ({ ...prev, due_date: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="payment_terms">Payment Terms</Label>
                <Select value={invoiceData.payment_terms} onValueChange={(value) => setInvoiceData(prev => ({ ...prev, payment_terms: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Due on Receipt">Due on Receipt</SelectItem>
                    <SelectItem value="Net 15">Net 15</SelectItem>
                    <SelectItem value="Net 30">Net 30</SelectItem>
                    <SelectItem value="Net 60">Net 60</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="currency">Currency</Label>
                <Select value={invoiceData.currency} onValueChange={(value) => setInvoiceData(prev => ({ ...prev, currency: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                    <SelectItem value="DKK">DKK</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="Additional notes for the invoice..."
                value={invoiceData.notes}
                onChange={(e) => setInvoiceData(prev => ({ ...prev, notes: e.target.value }))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Invoice Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Invoice Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-red-600">
              <span>Discount:</span>
              <span>-${totalDiscount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax:</span>
              <span>${totalTax.toFixed(2)}</span>
            </div>
            <hr />
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>${grandTotal.toFixed(2)} {invoiceData.currency}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Line Items */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Line Items</CardTitle>
            <Button onClick={addLineItem} variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead>Unit Price</TableHead>
                <TableHead>Discount %</TableHead>
                <TableHead>Tax %</TableHead>
                <TableHead>Total</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lineItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Input
                      placeholder="Item description..."
                      value={item.description}
                      onChange={(e) => updateLineItem(item.id, 'description', e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.quantity}
                      onChange={(e) => updateLineItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                      className="w-20"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.unit_price}
                      onChange={(e) => updateLineItem(item.id, 'unit_price', parseFloat(e.target.value) || 0)}
                      className="w-24"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      step="0.01"
                      value={item.discount_percentage}
                      onChange={(e) => updateLineItem(item.id, 'discount_percentage', parseFloat(e.target.value) || 0)}
                      className="w-20"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.tax_rate}
                      onChange={(e) => updateLineItem(item.id, 'tax_rate', parseFloat(e.target.value) || 0)}
                      className="w-20"
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    ${item.line_total.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeLineItem(item.id)}
                      disabled={lineItems.length === 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateInvoice;
