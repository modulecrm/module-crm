
import React from 'react';
import { Users } from 'lucide-react';

const UserPageHeader = () => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-3 flex items-center gap-3">
        <Users className="h-8 w-8" />
        Team Management
      </h1>
      <p className="text-lg text-gray-600">
        Manage your internal team members, their roles, and access permissions within your organization
      </p>
    </div>
  );
};

export default UserPageHeader;
