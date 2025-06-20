
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

      <TabsContent value="profiles" className="mt-6">
        <TeamProfiles />
      </TabsContent>

      <TabsContent value="invoice-info" className="mt-6">
        <InvoiceInformation />
      </TabsContent>

      <TabsContent value="invoice-payment" className="mt-6">
        <CRMSubscription enabledModules={enabledModules} />
      </TabsContent>

      <TabsContent value="access-levels" className="mt-6">
        <TeamAccessLevels />
      </TabsContent>
    </Tabs>
  );
};

export default UserPageTabs;
