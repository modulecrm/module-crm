
import React from 'react';
import { useModuleState } from '../hooks/useModuleState';
import MainLayout from '../components/layout/MainLayout';

const Index = () => {
  const {
    activeModule,
    setActiveModule,
    activeSettingsTab,
    setActiveSettingsTab,
    enabledModules,
    handleToggleModule,
    handleSearchSelect
  } = useModuleState();

  return (
    <MainLayout
      activeModule={activeModule}
      setActiveModule={setActiveModule}
      activeSettingsTab={activeSettingsTab}
      setActiveSettingsTab={setActiveSettingsTab}
      enabledModules={enabledModules}
      onToggleModule={handleToggleModule}
      onSearchSelect={handleSearchSelect}
    />
  );
};

export default Index;
