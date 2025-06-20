
import React from 'react';
import { User } from 'lucide-react';

const UserPageHeader = () => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-3 flex items-center gap-3">
        <User className="h-8 w-8" />
        Users & Profile Settings
      </h1>
      <p className="text-lg text-gray-600">
        Manage users, billing information, and access levels for your organization
      </p>
    </div>
  );
};

export default UserPageHeader;
