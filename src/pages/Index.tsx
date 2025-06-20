
import React, { useState } from 'react';
import AppLayout from '../components/layout/AppLayout';
import ModuleRenderer from '../components/modules/ModuleRenderer';
import { useModuleManagement } from '../hooks/useModuleManagement';
import { useModuleSearch } from '../hooks/useModuleSearch';

const Index = () => {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [activeSettingsTab, setActiveSettingsTab] = useState('modules');
  
  const { enabledModules, handleToggleModule } = useModuleManagement();
  const { handleSearchSelect } = useModuleSearch(activeModule, setActiveModule, setActiveSettingsTab);

  const handleModuleChange = (module: string) => {
    console.log('App: Active module changed to:', module);
    setActiveModule(module);
  };

  return (
    <AppLayout
      activeModule={activeModule}
      onModuleChange={handleModuleChange}
      enabledModules={enabledModules}
      onModuleSelect={handleSearchSelect}
    >
      <ModuleRenderer
        activeModule={activeModule}
        enabledModules={enabledModules}
        activeSettingsTab={activeSettingsTab}
        setActiveSettingsTab={setActiveSettingsTab}
        onToggleModule={handleToggleModule}
      />
    </AppLayout>
  );
};

export default Index;
