
import React from 'react';
import Dashboard from '../Dashboard';
import CRMModule from '../CRMModule';
import InvoiceModule from '../InvoiceModule';
import BookingModule from '../BookingModule';
import SubscriptionModule from '../SubscriptionModule';
import SettingsModule from '../SettingsModule';
import UserPage from '../UserPage';
import FeatureRequestsModule from '../FeatureRequestsModule';

interface ModuleRendererProps {
  activeModule: string;
  enabledModules: string[];
  activeSettingsTab: string;
  setActiveSettingsTab: (tab: string) => void;
  onToggleModule: (moduleId: string) => void;
}

const ModuleRenderer: React.FC<ModuleRendererProps> = ({ 
  activeModule, 
  enabledModules, 
  activeSettingsTab, 
  setActiveSettingsTab, 
  onToggleModule 
}) => {
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
            activeTab={activeSettingsTab}
            setActiveTab={setActiveSettingsTab}
            enabledModules={enabledModules}
            onToggleModule={onToggleModule}
          />
        );
      case 'user':
        return <UserPage />;
      case 'feature-requests':
        return <FeatureRequestsModule />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex-1">
      {renderModule()}
    </div>
  );
};

export default ModuleRenderer;
