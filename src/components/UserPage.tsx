
import React, { useState } from 'react';
import UserPageTabs from './users/UserPageTabs';

interface UserPageProps {
  enabledModules: string[];
}

const UserPage = ({ enabledModules }: UserPageProps) => {
  console.log('🔷 UserPage: USERS/PROFILE SETTINGS COMPONENT IS RENDERING');
  
  const [activeTab, setActiveTab] = useState('profiles');

  return (
    <div className="w-full" data-testid="profile-settings-page">
      <UserPageTabs 
        activeTab={activeTab}
        onTabChange={setActiveTab}
        enabledModules={enabledModules}
      />
    </div>
  );
};

export default UserPage;
