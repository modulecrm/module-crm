
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CustomerHeaderProps {
  hasCustomers: boolean;
  onCreateSampleCustomers: () => void;
  onCreateCustomer: () => void;
}

const CustomerHeader: React.FC<CustomerHeaderProps> = ({
  hasCustomers,
  onCreateSampleCustomers,
  onCreateCustomer
}) => {
  return (
    <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Customer Management</h1>
          <p className="text-sm text-gray-600 mt-1">Manage your customer relationships and data</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          {!hasCustomers && (
            <Button 
              onClick={onCreateSampleCustomers}
              variant="outline"
              className="w-full sm:w-auto"
            >
              Create Sample Customers
            </Button>
          )}
          <Button 
            onClick={onCreateCustomer}
            className="w-full sm:w-auto"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Customer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomerHeader;
