
import React, { useState } from 'react';
import { LanguageProvider } from '../../contexts/LanguageContext';
import CollapsibleSidebar from './CollapsibleSidebar';
import SubNavigation from './SubNavigation';
import ModuleSearch from '../ModuleSearch';

interface AppLayoutProps {
  activeModule: string;
  onModuleChange: (module: string) => void;
  enabledModules: string[];
  onModuleSelect: (moduleId: string) => void;
  children: React.ReactNode;
}

const AppLayout = ({ 
  activeModule, 
  onModuleChange, 
  enabledModules, 
  onModuleSelect, 
  children 
}: AppLayoutProps) => {
  const [activeSubTab, setActiveSubTab] = useState<string>('');

  const handleModuleChange = (module: string) => {
    onModuleChange(module);
    // Reset sub-tab when changing modules
    setActiveSubTab('');
  };

  const handleSubTabChange = (subTab: string) => {
    setActiveSubTab(subTab);
    // You can add logic here to navigate to specific sub-sections
    console.log('Sub-tab changed to:', subTab);
  };

  // Show sub-navigation for modules that have sub-tabs
  const showSubNavigation = ['crm', 'invoice', 'booking', 'subscription', 'feature-requests', 'settings', 'user'].includes(activeModule);

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gray-50 flex w-full">
        <CollapsibleSidebar
          activeModule={activeModule}
          onModuleChange={handleModuleChange}
          enabledModules={enabledModules}
        />
        
        <SubNavigation
          activeModule={activeModule}
          activeSubTab={activeSubTab}
          onSubTabChange={handleSubTabChange}
          isVisible={showSubNavigation}
        />
        
        <div className="flex-1 overflow-auto w-full">
          {/* Global Module Search */}
          <div className="bg-white border-b border-gray-200 px-4 md:px-8 py-4">
            <ModuleSearch onModuleSelect={onModuleSelect} />
          </div>
          <div className="w-full">
            {children}
          </div>
        </div>
      </div>
    </LanguageProvider>
  );
};

export default AppLayout;
