
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, FileText, CreditCard, Shield } from 'lucide-react';
import UserProfiles from './users/UserProfiles';
import InvoiceInformation from './users/InvoiceInformation';
import InvoicePayment from './users/InvoicePayment';
import AccessLevels from './users/AccessLevels';

interface UserPageProps {
  enabledModules: string[];
}

const UserPage = ({ enabledModules }: UserPageProps) => {
  console.log('🔷 UserPage: USERS/PROFILE SETTINGS COMPONENT IS RENDERING');
  
  const [activeTab, setActiveTab] = useState('profiles');

  return (
    <div className="p-8" data-testid="profile-settings-page">
      {/* Users & Profile Settings Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3 flex items-center gap-3">
          <User className="h-8 w-8" />
          Users & Profile Settings
        </h1>
        <p className="text-lg text-gray-600">
          Manage users, billing information, and access levels for your organization
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profiles" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            User Profiles
          </TabsTrigger>
          <TabsTrigger value="invoice-info" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Invoice Information
          </TabsTrigger>
          <TabsTrigger value="invoice-payment" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Invoice & Payment
          </TabsTrigger>
          <TabsTrigger value="access-levels" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Access Levels
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profiles" className="mt-6">
          <UserProfiles />
        </TabsContent>

        <TabsContent value="invoice-info" className="mt-6">
          <InvoiceInformation />
        </TabsContent>

        <TabsContent value="invoice-payment" className="mt-6">
          <InvoicePayment enabledModules={enabledModules} />
        </TabsContent>

        <TabsContent value="access-levels" className="mt-6">
          <AccessLevels />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserPage;
