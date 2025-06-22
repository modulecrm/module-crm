
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
  renderModule: (activeSubTab?: string) => React.ReactNode;
}

const AppLayout = ({ 
  activeModule, 
  onModuleChange, 
  enabledModules, 
  onModuleSelect, 
  renderModule
}: AppLayoutProps) => {
  const [activeSubTab, setActiveSubTab] = useState<string>('');

  const handleModuleChange = (module: string) => {
    onModuleChange(module);
    // Reset sub-tab when changing modules
    setActiveSubTab('');
  };

  const handleSubTabChange = (subTab: string) => {
    setActiveSubTab(subTab);
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
        
        <div className={`flex-1 overflow-auto w-full transition-all duration-300 ${showSubNavigation ? 'ml-64' : 'ml-0'}`}>
          {/* Global Module Search - Compact header */}
          <div className="bg-white border-b border-gray-200 px-4 py-2">
            <ModuleSearch onModuleSelect={onModuleSelect} />
          </div>
          {/* Content area without additional spacing */}
          <div className="w-full">
            {renderModule(activeSubTab)}
          </div>
        </div>
      </div>
    </LanguageProvider>
  );
};

export default AppLayout;
