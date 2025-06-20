
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { User, Mail, Building, CreditCard, Package, Edit2, Save, X, FileText, Download, AlertCircle, Clock, CheckCircle } from 'lucide-react';
import { modules, branchModules } from './modules/moduleData';
import { format, differenceInDays } from 'date-fns';

interface ProfileSettingsProps {
  enabledModules: string[];
}

// Mock invoice data with updated status definitions
const mockInvoices = [
  {
    id: 'INV-2024-001',
    date: new Date('2024-01-15'),
    dueDate: null, // No due date = pending
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
  },
  {
    id: 'INV-2023-012',
    date: new Date('2023-12-15'),
    dueDate: new Date('2024-01-15'),
    amount: 299.99,
    status: 'paid',
    description: 'Premium Subscription - December 2023',
    paidDate: new Date('2024-01-10')
  },
  {
    id: 'INV-2024-004',
    date: new Date('2024-03-01'),
    dueDate: new Date('2024-03-15'),
    amount: 199.99,
    status: 'overdue',
    description: 'Custom Development - March 2024',
    paidDate: null
  }
];

const ProfileSettings = ({ enabledModules }: ProfileSettingsProps) => {
  console.log('🔷 ProfileSettings: USERS/PROFILE SETTINGS COMPONENT IS RENDERING');
  
  // Mock user data - in a real app this would come from authentication/database
  const [userProfile, setUserProfile] = useState({
    email: 'john.doe@company.com',
    name: 'John Doe',
    company: 'Acme Corporation',
    companyNumber: 'GB123456789',
    invoiceAddress: {
      street: '123 Business Street',
      city: 'London',
      postalCode: 'SW1A 1AA',
      country: 'United Kingdom'
    }
  });

  // Edit states
  const [isEditingCompany, setIsEditingCompany] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  // Temporary form data
  const [tempCompanyData, setTempCompanyData] = useState({
    company: userProfile.company,
    companyNumber: userProfile.companyNumber
  });

  const [tempAddressData, setTempAddressData] = useState({
    street: userProfile.invoiceAddress.street,
    city: userProfile.invoiceAddress.city,
    postalCode: userProfile.invoiceAddress.postalCode,
    country: userProfile.invoiceAddress.country
  });

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
    // Mock payment link - in real implementation, this would generate a Stripe payment link
    console.log(`Redirecting to payment for invoice: ${invoiceId}`);
    window.open(`https://checkout.stripe.com/pay/invoice/${invoiceId}`, '_blank');
  };

  const handleDownloadPDF = (invoiceId: string) => {
    // Mock PDF download - in real implementation, this would generate and download the PDF
    console.log(`Downloading PDF for invoice: ${invoiceId}`);
    // Create a mock download
    const link = document.createElement('a');
    link.href = '#';
    link.download = `${invoiceId}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSaveCompany = () => {
    setUserProfile(prev => ({
      ...prev,
      company: tempCompanyData.company,
      companyNumber: tempCompanyData.companyNumber
    }));
    setIsEditingCompany(false);
  };

  const handleCancelCompany = () => {
    setTempCompanyData({
      company: userProfile.company,
      companyNumber: userProfile.companyNumber
    });
    setIsEditingCompany(false);
  };

  const handleSaveAddress = () => {
    setUserProfile(prev => ({
      ...prev,
      invoiceAddress: { ...tempAddressData }
    }));
    setIsEditingAddress(false);
  };

  const handleCancelAddress = () => {
    setTempAddressData({
      street: userProfile.invoiceAddress.street,
      city: userProfile.invoiceAddress.city,
      postalCode: userProfile.invoiceAddress.postalCode,
      country: userProfile.invoiceAddress.country
    });
    setIsEditingAddress(false);
  };

  return (
    <div className="p-8" data-testid="profile-settings-page">
      {/* Users & Profile Settings Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3 flex items-center gap-3">
          <User className="h-8 w-8" />
          Users & Profile Settings
        </h1>
        <p className="text-lg text-gray-600">
          Manage your personal account, billing information, and subscription details
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
              <CardDescription>Your account and login details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <p className="text-gray-900">{userProfile.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Email Address</label>
                <p className="text-gray-900 flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {userProfile.email}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Company Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Company Information
                </div>
                {!isEditingCompany && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditingCompany(true)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                )}
              </CardTitle>
              <CardDescription>Your business details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isEditingCompany ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name</Label>
                    <Input
                      id="company"
                      value={tempCompanyData.company}
                      onChange={(e) => setTempCompanyData(prev => ({ ...prev, company: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="companyNumber">Company Number</Label>
                    <Input
                      id="companyNumber"
                      value={tempCompanyData.companyNumber}
                      onChange={(e) => setTempCompanyData(prev => ({ ...prev, companyNumber: e.target.value }))}
                    />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" onClick={handleSaveCompany}>
                      <Save className="h-4 w-4 mr-1" />
                      Save
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleCancelCompany}>
                      <X className="h-4 w-4 mr-1" />
                      Cancel
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Company Name</label>
                    <p className="text-gray-900">{userProfile.company}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Company Number</label>
                    <p className="text-gray-900">{userProfile.companyNumber}</p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Invoice Address */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Invoice Address
                </div>
                {!isEditingAddress && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditingAddress(true)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                )}
              </CardTitle>
              <CardDescription>Where we send your invoices</CardDescription>
            </CardHeader>
            <CardContent>
              {isEditingAddress ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="street">Street Address</Label>
                    <Input
                      id="street"
                      value={tempAddressData.street}
                      onChange={(e) => setTempAddressData(prev => ({ ...prev, street: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={tempAddressData.city}
                      onChange={(e) => setTempAddressData(prev => ({ ...prev, city: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input
                      id="postalCode"
                      value={tempAddressData.postalCode}
                      onChange={(e) => setTempAddressData(prev => ({ ...prev, postalCode: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      value={tempAddressData.country}
                      onChange={(e) => setTempAddressData(prev => ({ ...prev, country: e.target.value }))}
                    />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" onClick={handleSaveAddress}>
                      <Save className="h-4 w-4 mr-1" />
                      Save
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleCancelAddress}>
                      <X className="h-4 w-4 mr-1" />
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-1">
                  <p className="text-gray-900">{userProfile.company}</p>
                  <p className="text-gray-900">{userProfile.invoiceAddress.street}</p>
                  <p className="text-gray-900">
                    {userProfile.invoiceAddress.city}, {userProfile.invoiceAddress.postalCode}
                  </p>
                  <p className="text-gray-900">{userProfile.invoiceAddress.country}</p>
                </div>
              )}
            </CardContent>
          </Card>

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
              <div className="mt-2 text-sm space-y-1">
                <div><strong>Pending:</strong> Invoice created, no due date set</div>
                <div><strong>Overdue:</strong> Invoice not paid by due date</div>
                <div><strong>Paid:</strong> Invoice payment confirmed</div>
              </div>
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
    </div>
  );
};

export default ProfileSettings;
