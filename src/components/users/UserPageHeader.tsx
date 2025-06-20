
import React from 'react';
import { Building2 } from 'lucide-react';

const UserPageHeader = () => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-3 flex items-center gap-3">
        <Building2 className="h-8 w-8" />
        Customer Organizations
      </h1>
      <p className="text-lg text-gray-600">
        Manage your paying customers, their subscriptions, billing, and employee access levels
      </p>
    </div>
  );
};

export default UserPageHeader;
