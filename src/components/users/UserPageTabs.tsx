
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building2, FileText, CreditCard, Shield } from 'lucide-react';
import CustomerOrganizations from './CustomerOrganizations';
import InvoiceInformation from './InvoiceInformation';
import CustomerBilling from './CustomerBilling';
import CustomerAccessLevels from './CustomerAccessLevels';

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
          <Building2 className="h-4 w-4" />
          Customer Organizations
        </TabsTrigger>
        <TabsTrigger value="invoice-info" className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          My Invoice Information
        </TabsTrigger>
        <TabsTrigger value="invoice-payment" className="flex items-center gap-2">
          <CreditCard className="h-4 w-4" />
          Customer Billing
        </TabsTrigger>
        <TabsTrigger value="access-levels" className="flex items-center gap-2">
          <Shield className="h-4 w-4" />
          Customer Access Levels
        </TabsTrigger>
      </TabsList>

      <TabsContent value="profiles" className="mt-6">
        <CustomerOrganizations />
      </TabsContent>

      <TabsContent value="invoice-info" className="mt-6">
        <InvoiceInformation />
      </TabsContent>

      <TabsContent value="invoice-payment" className="mt-6">
        <CustomerBilling enabledModules={enabledModules} />
      </TabsContent>

      <TabsContent value="access-levels" className="mt-6">
        <CustomerAccessLevels />
      </TabsContent>
    </Tabs>
  );
};

export default UserPageTabs;
