
import React from 'react';
import { LanguageProvider } from '../../contexts/LanguageContext';
import Sidebar from '../Sidebar';
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
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gray-50 flex w-full">
        <Sidebar
          activeModule={activeModule}
          onModuleChange={onModuleChange}
          enabledModules={enabledModules}
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
