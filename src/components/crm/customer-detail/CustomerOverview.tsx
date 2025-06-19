import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CreditCard, FileText, Download, Mail, Plus, Calendar, History, ArrowUpDown, Send, Package, TrendingUp, X, ChevronDown, ChevronRight } from 'lucide-react';

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
  const [isRevenueOpen, setIsRevenueOpen] = useState(false);
  const [isAccountStatementOpen, setIsAccountStatementOpen] = useState(false);
  const [isCancelSubscriptionOpen, setIsCancelSubscriptionOpen] = useState(false);
  const [showPurchaseDetails, setShowPurchaseDetails] = useState(false);
  const [isSubscriptionHistoryOpen, setIsSubscriptionHistoryOpen] = useState(false);
  const [isPlanSwitchOpen, setIsPlanSwitchOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [switchTiming, setSwitchTiming] = useState('');
  const [upgradeInvoicing, setUpgradeInvoicing] = useState('');
  const [statementFromDate, setStatementFromDate] = useState('');
  const [statementToDate, setStatementToDate] = useState('');
  const [cancellationDate, setCancellationDate] = useState('2024-03-15'); // Default to current period end

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

  // Mock purchase data
  const purchaseCategories = [
    { category: 'Subscriptions', amount: 'DKK 48,000', count: 16, percentage: 66 },
    { category: 'Add-ons', amount: 'DKK 15,000', count: 8, percentage: 21 },
    { category: 'Support', amount: 'DKK 9,540', count: 5, percentage: 13 },
  ];

  const detailedPurchases = [
    { id: '1', date: '2024-03-01', item: 'Premium Subscription', category: 'Subscriptions', amount: 'DKK 2,500' },
    { id: '2', date: '2024-02-15', item: 'Additional Storage', category: 'Add-ons', amount: 'DKK 500' },
    { id: '3', date: '2024-02-01', item: 'Premium Subscription', category: 'Subscriptions', amount: 'DKK 2,500' },
    { id: '4', date: '2024-01-20', item: 'Priority Support', category: 'Support', amount: 'DKK 1,200' },
    { id: '5', date: '2024-01-01', item: 'Premium Subscription', category: 'Subscriptions', amount: 'DKK 2,500' },
  ];

  const subscriptionHistory = [
    { plan: 'Premium - Monthly', startDate: '2024-01-01', endDate: 'Current', status: 'Active' },
    { plan: 'Basic - Monthly', startDate: '2023-06-01', endDate: '2023-12-31', status: 'Ended' },
    { plan: 'Starter - Monthly', startDate: '2023-01-01', endDate: '2023-05-31', status: 'Upgraded' },
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

  const handleSendInvoice = (invoiceId: string) => {
    console.log(`Sending invoice ${invoiceId}`);
    // Implementation for sending invoice
  };

  const handleDownloadStatement = () => {
    console.log(`Downloading account statement from ${statementFromDate} to ${statementToDate}`);
    setIsAccountStatementOpen(false);
    // Implementation for downloading account statement
  };

  const handleSendStatement = () => {
    console.log(`Sending account statement from ${statementFromDate} to ${statementToDate} to ${customer.email}`);
    setIsAccountStatementOpen(false);
    // Implementation for sending account statement
  };

  const handleCancelSubscription = () => {
    console.log(`Cancelling customer subscription on ${cancellationDate}`);
    setIsCancelSubscriptionOpen(false);
    // Implementation for cancelling customer subscription
  };

  const handlePlanSwitch = () => {
    const currentPlan = subscriptionPlans.find(p => p.current);
    const newPlan = subscriptionPlans.find(p => p.id === selectedPlan);
    
    if (!currentPlan || !newPlan) return;
    
    const currentPrice = parseInt(currentPlan.price.replace('DKK ', ''));
    const newPrice = parseInt(newPlan.price.replace('DKK ', ''));
    const planChangeType = newPrice > currentPrice ? 'Upgrade' : 'Downgrade';
    
    console.log(`Processing ${planChangeType} from ${currentPlan.name} to ${newPlan.name}`);
    console.log(`Switch timing: ${switchTiming}`);
    if (planChangeType === 'Upgrade' && upgradeInvoicing) {
      console.log(`Invoicing preference: ${upgradeInvoicing}`);
    }
    
    setIsPlanSwitchOpen(false);
    setSelectedPlan('');
    setSwitchTiming('');
    setUpgradeInvoicing('');
    // Implementation for plan switching
  };

  const renderPlanSwitchDialog = () => {
    if (!selectedPlan) return null;
    
    const currentPlan = subscriptionPlans.find(p => p.current);
    const newPlan = subscriptionPlans.find(p => p.id === selectedPlan);
    
    if (!currentPlan || !newPlan) return null;
    
    const currentPrice = parseInt(currentPlan.price.replace('DKK ', ''));
    const newPrice = parseInt(newPlan.price.replace('DKK ', ''));
    const isUpgrade = newPrice > currentPrice;
    const priceDifference = Math.abs(newPrice - currentPrice);
    
    return (
      <div className="mt-6 p-4 border rounded-lg bg-gray-50">
        <h4 className="font-semibold mb-3">
          {isUpgrade ? 'Upgrade' : 'Downgrade'} Confirmation
        </h4>
        <p className="text-sm text-gray-600 mb-4">
          Switching from {currentPlan.name} (DKK {currentPrice}) to {newPlan.name} (DKK {newPrice})
          {isUpgrade ? ` - Additional DKK ${priceDifference}/month` : ` - Save DKK ${priceDifference}/month`}
        </p>
        
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium">When should the change take effect?</Label>
            <RadioGroup value={switchTiming} onValueChange={setSwitchTiming} className="mt-2">
              {isUpgrade ? (
                <>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="immediate" id="immediate" />
                    <Label htmlFor="immediate" className="text-sm">
                      Immediately (pro-rated billing)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="next-period" id="next-period" />
                    <Label htmlFor="next-period" className="text-sm">
                      At next billing cycle (March 15, 2024)
                    </Label>
                  </div>
                </>
              ) : (
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="next-period" id="next-period" />
                  <Label htmlFor="next-period" className="text-sm">
                    At end of current billing cycle (March 15, 2024)
                  </Label>
                </div>
              )}
            </RadioGroup>
          </div>
          
          {isUpgrade && switchTiming === 'immediate' && (
            <div>
              <Label className="text-sm font-medium">How to handle the price difference?</Label>
              <RadioGroup value={upgradeInvoicing} onValueChange={setUpgradeInvoicing} className="mt-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="invoice-now" id="invoice-now" />
                  <Label htmlFor="invoice-now" className="text-sm">
                    Create invoice for DKK {priceDifference} now
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="next-invoice" id="next-invoice" />
                  <Label htmlFor="next-invoice" className="text-sm">
                    Add DKK {priceDifference} to next period's invoice
                  </Label>
                </div>
              </RadioGroup>
            </div>
          )}
        </div>
        
        <div className="flex gap-2 mt-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              setSelectedPlan('');
              setSwitchTiming('');
              setUpgradeInvoicing('');
            }}
          >
            Cancel
          </Button>
          <Button 
            size="sm"
            onClick={handlePlanSwitch}
            disabled={
              !switchTiming || 
              (isUpgrade && switchTiming === 'immediate' && !upgradeInvoicing)
            }
          >
            Confirm {isUpgrade ? 'Upgrade' : 'Downgrade'}
          </Button>
        </div>
      </div>
    );
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
                    <p className="text-sm text-blue-700 mb-3">Next billing: March 15, 2024</p>
                    
                    <div className="flex gap-2">
                      <Dialog open={isPlanSwitchOpen} onOpenChange={setIsPlanSwitchOpen}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <ArrowUpDown className="h-4 w-4 mr-2" />
                            Switch Plan
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                          <DialogHeader>
                            <DialogTitle>Switch Subscription Plan</DialogTitle>
                            <DialogDescription>
                              Choose a new plan for {customer.name}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label className="text-sm font-medium mb-3 block">Available Plans</Label>
                              <div className="space-y-3">
                                {subscriptionPlans.filter(plan => !plan.current).map((plan) => (
                                  <div 
                                    key={plan.id} 
                                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                                      selectedPlan === plan.id ? 'border-blue-300 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                    onClick={() => setSelectedPlan(plan.id)}
                                  >
                                    <div className="flex justify-between items-start">
                                      <div>
                                        <h4 className="font-semibold">{plan.name}</h4>
                                        <p className="text-sm text-gray-600 mb-2">{plan.price}/month</p>
                                        <ul className="text-xs text-gray-600 space-y-1">
                                          {plan.features.map((feature, index) => (
                                            <li key={index}>• {feature}</li>
                                          ))}
                                        </ul>
                                      </div>
                                      <div className="w-4 h-4 rounded-full border-2 border-gray-300 flex items-center justify-center">
                                        {selectedPlan === plan.id && (
                                          <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            {renderPlanSwitchDialog()}
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setIsPlanSwitchOpen(false)}>
                              Cancel
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      
                      <Dialog open={isCancelSubscriptionOpen} onOpenChange={setIsCancelSubscriptionOpen}>
                        <DialogTrigger asChild>
                          <Button variant="destructive" size="sm">
                            <X className="h-4 w-4 mr-2" />
                            Cancel Subscription
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Cancel Customer Subscription</DialogTitle>
                            <DialogDescription>
                              The customer has paid until March 15, 2024. 
                              Please select when you'd like to terminate their subscription service.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="cancellation-date" className="text-right">
                                Termination Date
                              </Label>
                              <Input
                                id="cancellation-date"
                                type="date"
                                value={cancellationDate}
                                onChange={(e) => setCancellationDate(e.target.value)}
                                className="col-span-3"
                              />
                            </div>
                            <div className="text-sm text-gray-600 col-span-4">
                              <p>• Customer has paid until March 15, 2024</p>
                              <p>• If you terminate before March 15, 2024, consider providing a pro-rated refund</p>
                              <p>• If you terminate on March 15, 2024, the customer receives full value for their payment</p>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setIsCancelSubscriptionOpen(false)}>
                              Keep Active
                            </Button>
                            <Button variant="destructive" onClick={handleCancelSubscription}>
                              Confirm Termination
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </div>
                
                <Collapsible open={isSubscriptionHistoryOpen} onOpenChange={setIsSubscriptionHistoryOpen}>
                  <div className="mt-6">
                    <CollapsibleTrigger asChild>
                      <Button variant="outline" className="flex items-center justify-between w-full">
                        <span className="text-lg font-medium">Subscription History</span>
                        {isSubscriptionHistoryOpen ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-4">
                      <div className="space-y-3">
                        {subscriptionHistory.map((sub, index) => (
                          <div key={index} className="p-4 border rounded-lg">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-semibold">{sub.plan}</h4>
                                <p className="text-sm text-gray-600">Start: {sub.startDate}</p>
                                <p className="text-sm text-gray-600">End: {sub.endDate}</p>
                              </div>
                              <Badge className={sub.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                                {sub.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Total Revenue - Now Clickable */}
        <Sheet open={isRevenueOpen} onOpenChange={setIsRevenueOpen}>
          <SheetTrigger asChild>
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
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
          </SheetTrigger>
          <SheetContent className="w-[400px] sm:w-[540px]">
            <SheetHeader>
              <SheetTitle>Revenue & Purchase Overview</SheetTitle>
              <SheetDescription>
                Detailed revenue and purchase analysis for {customer.name}
              </SheetDescription>
            </SheetHeader>
            <div className="mt-6 space-y-6">
              {/* Purchase Categories Overview */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Purchase Categories</h3>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowPurchaseDetails(!showPurchaseDetails)}
                  >
                    {showPurchaseDetails ? 'Hide Details' : 'View Details'}
                  </Button>
                </div>
                <div className="space-y-3">
                  {purchaseCategories.map((category, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <Package className="h-4 w-4 text-gray-400" />
                          <span className="font-medium">{category.category}</span>
                        </div>
                        <span className="font-semibold text-green-600">{category.amount}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>{category.count} purchases</span>
                        <span>{category.percentage}% of total</span>
                      </div>
                      <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${category.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detailed Purchase List */}
              {showPurchaseDetails && (
                <div>
                  <h3 className="text-lg font-medium mb-4">Purchase Details</h3>
                  <div className="border rounded-lg">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Item</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {detailedPurchases.map((purchase) => (
                          <TableRow key={purchase.id}>
                            <TableCell className="text-sm">{purchase.date}</TableCell>
                            <TableCell className="font-medium">{purchase.item}</TableCell>
                            <TableCell>
                              <Badge variant="secondary">{purchase.category}</Badge>
                            </TableCell>
                            <TableCell className="text-right font-semibold">{purchase.amount}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>

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
              <div className="mb-4">
                <Dialog open={isAccountStatementOpen} onOpenChange={setIsAccountStatementOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full">
                      <FileText className="h-4 w-4 mr-2" />
                      Create Account Statement
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Create Account Statement</DialogTitle>
                      <DialogDescription>
                        Select the date range for the account statement
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="from-date" className="text-right">
                          From
                        </Label>
                        <Input
                          id="from-date"
                          type="date"
                          value={statementFromDate}
                          onChange={(e) => setStatementFromDate(e.target.value)}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="to-date" className="text-right">
                          To
                        </Label>
                        <Input
                          id="to-date"
                          type="date"
                          value={statementToDate}
                          onChange={(e) => setStatementToDate(e.target.value)}
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={handleDownloadStatement}>
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      <Button onClick={handleSendStatement}>
                        <Send className="h-4 w-4 mr-2" />
                        Send to Customer
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              
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
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleSendInvoice(invoice.id)}
                        >
                          <Send className="h-4 w-4 mr-2" />
                          Send Invoice
                        </Button>
                        {!invoice.paid && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleSendPaymentLink(invoice.id)}
                          >
                            <Send className="h-4 w-4 mr-2" />
                            Payment Link
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
