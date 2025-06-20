
import React from 'react';
import Dashboard from '../Dashboard';
import CRMModule from '../CRMModule';
import InvoiceModule from '../InvoiceModule';
import BookingModule from '../BookingModule';
import SubscriptionModule from '../SubscriptionModule';
import SettingsModule from '../SettingsModule';
import ProfileSettings from '../ProfileSettings';
import SettingsPage from '../settings/SettingsPage';

interface ModuleRendererProps {
  activeModule: string;
  enabledModules: string[];
  activeSettingsTab: string;
  setActiveSettingsTab: (tab: string) => void;
  onToggleModule: (moduleId: string) => void;
}

const ModuleRenderer = ({
  activeModule,
  enabledModules,
  activeSettingsTab,
  setActiveSettingsTab,
  onToggleModule,
}: ModuleRendererProps) => {
  console.log('🔹 ModuleRenderer: Rendering module:', activeModule);

  const renderModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <Dashboard />;
      case 'crm':
        return <CRMModule />;
      case 'invoice':
        return <InvoiceModule />;
      case 'booking':
        return <BookingModule />;
      case 'subscription':
        return <SubscriptionModule />;
      case 'settings':
        return (
          <SettingsModule
            enabledModules={enabledModules}
            onToggleModule={onToggleModule}
          />
        );
      case 'profile':
        console.log('🔹 ModuleRenderer: ✅ RENDERING PROFILE SETTINGS for Users menu');
        return <ProfileSettings enabledModules={enabledModules} />;
      default:
        return <Dashboard />;
    }
  };

  return <div className="flex-1 overflow-auto">{renderModule()}</div>;
};

export default ModuleRenderer;
