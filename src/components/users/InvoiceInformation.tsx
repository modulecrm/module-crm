
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Building, Edit2, Save, X } from 'lucide-react';

const InvoiceInformation = () => {
  // Mock user data - in a real app this would come from authentication/database
  const [userProfile, setUserProfile] = useState({
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
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Invoice Information</h2>
        <p className="text-gray-600 mt-1">Manage your company information and invoice address</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
            <CardDescription>Your business details for invoicing</CardDescription>
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
                <Building className="h-5 w-5" />
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
      </div>
    </div>
  );
};

export default InvoiceInformation;
