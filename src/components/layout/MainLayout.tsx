
import React from 'react';
import { LanguageProvider } from '../../contexts/LanguageContext';
import Sidebar from '../Sidebar';
import ModuleSearch from '../ModuleSearch';
import ModuleRenderer from './ModuleRenderer';

interface MainLayoutProps {
  activeModule: string;
  setActiveModule: (module: string) => void;
  activeSettingsTab: string;
  setActiveSettingsTab: (tab: string) => void;
  enabledModules: string[];
  onToggleModule: (moduleId: string) => void;
  onSearchSelect: (moduleId: string) => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  activeModule,
  setActiveModule,
  activeSettingsTab,
  setActiveSettingsTab,
  enabledModules,
  onToggleModule,
  onSearchSelect
}) => {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gray-50 flex w-full">
        <Sidebar
          activeModule={activeModule}
          onModuleChange={setActiveModule}
          enabledModules={enabledModules}
        />
        <div className="flex-1 overflow-auto w-full">
          {/* Global Module Search */}
          <div className="bg-white border-b border-gray-200 px-4 md:px-8 py-4">
            <ModuleSearch onModuleSelect={onSearchSelect} />
          </div>
          <div className="w-full">
            <ModuleRenderer
              activeModule={activeModule}
              activeSettingsTab={activeSettingsTab}
              setActiveSettingsTab={setActiveSettingsTab}
              enabledModules={enabledModules}
              onToggleModule={onToggleModule}
            />
          </div>
        </div>
      </div>
    </LanguageProvider>
  );
};

export default MainLayout;
