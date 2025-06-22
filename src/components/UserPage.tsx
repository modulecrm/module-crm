
import React, { useState } from 'react';
import UserPageHeader from './users/UserPageHeader';
import UserPageTabs from './users/UserPageTabs';

interface UserPageProps {
  enabledModules: string[];
}

const UserPage = ({ enabledModules }: UserPageProps) => {
  console.log('🔷 UserPage: USERS/PROFILE SETTINGS COMPONENT IS RENDERING');
  
  const [activeTab, setActiveTab] = useState('profiles');

  return (
    <div className="w-full" data-testid="profile-settings-page">
      <div className="p-4 md:p-8">
        <UserPageHeader />
        <UserPageTabs 
          activeTab={activeTab}
          onTabChange={setActiveTab}
          enabledModules={enabledModules}
        />
      </div>
    </div>
  );
};

export default UserPage;
