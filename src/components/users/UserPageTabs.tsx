
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Building, CreditCard, Shield } from 'lucide-react';
import TeamProfiles from './TeamProfiles';
import InvoiceInformation from './InvoiceInformation';
import CRMSubscription from './CRMSubscription';
import TeamAccessLevels from './TeamAccessLevels';

interface UserPageTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  enabledModules: string[];
}

const UserPageTabs = ({ activeTab, onTabChange, enabledModules }: UserPageTabsProps) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <div className="px-4 md:px-8 py-2 border-b border-gray-200">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profiles" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Team Members
          </TabsTrigger>
          <TabsTrigger value="invoice-info" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            Company Information
          </TabsTrigger>
          <TabsTrigger value="invoice-payment" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            CRM Subscription
          </TabsTrigger>
          <TabsTrigger value="access-levels" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Access Levels
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="profiles" className="px-4 md:px-8 py-6">
        <TeamProfiles />
      </TabsContent>

      <TabsContent value="invoice-info" className="px-4 md:px-8 py-6">
        <InvoiceInformation />
      </TabsContent>

      <TabsContent value="invoice-payment" className="px-4 md:px-8 py-6">
        <CRMSubscription enabledModules={enabledModules} />
      </TabsContent>

      <TabsContent value="access-levels" className="px-4 md:px-8 py-6">
        <TeamAccessLevels />
      </TabsContent>
    </Tabs>
  );
};

export default UserPageTabs;
