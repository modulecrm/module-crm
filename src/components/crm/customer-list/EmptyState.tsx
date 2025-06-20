
import React from 'react';
import { Plus, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  onCreateSampleCustomers: () => void;
  onCreateCustomer: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  onCreateSampleCustomers,
  onCreateCustomer
}) => {
  return (
    <div className="text-center py-12">
      <div className="mx-auto h-12 w-12 text-gray-400">
        <Eye className="h-12 w-12" />
      </div>
      <h3 className="mt-2 text-sm font-medium text-gray-900">No customers</h3>
      <p className="mt-1 text-sm text-gray-500">Get started by creating sample customers or adding a new customer.</p>
      <div className="mt-6 space-y-2 sm:space-y-0 sm:space-x-3 sm:flex sm:justify-center">
        <Button onClick={onCreateSampleCustomers} variant="outline" className="w-full sm:w-auto">
          Create Sample Customers
        </Button>
        <Button onClick={onCreateCustomer} className="w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Add Customer
        </Button>
      </div>
    </div>
  );
};

export default EmptyState;
