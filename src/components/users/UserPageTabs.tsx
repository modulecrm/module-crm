
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, FileText, CreditCard, Shield } from 'lucide-react';
import UserProfiles from './UserProfiles';
import InvoiceInformation from './InvoiceInformation';
import InvoicePayment from './InvoicePayment';
import AccessLevels from './AccessLevels';

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
  );
};

export default UserPageTabs;
