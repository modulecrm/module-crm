
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Building, CreditCard, Package } from 'lucide-react';
import { modules, branchModules } from './modules/moduleData';

interface ProfileSettingsProps {
  enabledModules: string[];
}

const ProfileSettings = ({ enabledModules }: ProfileSettingsProps) => {
  // Mock user data - in a real app this would come from authentication/database
  const userProfile = {
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
  };

  // Get all modules data
  const allModules = [...modules, ...branchModules];
  
  // Filter to get only enabled modules
  const activeModules = allModules.filter(module => enabledModules.includes(module.id));
  
  // Calculate total price
  const totalPrice = activeModules.reduce((sum, module) => {
    const price = parseFloat(module.price.replace(/[^0-9.]/g, ''));
    return sum + price;
  }, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Profile Settings</h2>
        <p className="text-gray-600">Manage your account information and view your subscription details</p>
      </div>

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
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Company Information
            </CardTitle>
            <CardDescription>Your business details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Company Name</label>
              <p className="text-gray-900">{userProfile.company}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Company Number</label>
              <p className="text-gray-900">{userProfile.companyNumber}</p>
            </div>
          </CardContent>
        </Card>

        {/* Invoice Address */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Invoice Address
            </CardTitle>
            <CardDescription>Where we send your invoices</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <p className="text-gray-900">{userProfile.company}</p>
              <p className="text-gray-900">{userProfile.invoiceAddress.street}</p>
              <p className="text-gray-900">
                {userProfile.invoiceAddress.city}, {userProfile.invoiceAddress.postalCode}
              </p>
              <p className="text-gray-900">{userProfile.invoiceAddress.country}</p>
            </div>
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
                      {module.premium === true && (
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
    </div>
  );
};

export default ProfileSettings;
