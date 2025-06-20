
import React from 'react';
import Dashboard from '../Dashboard';
import CRMModule from '../CRMModule';
import BookingModule from '../BookingModule';
import SubscriptionModule from '../SubscriptionModule';
import InvoiceModule from '../InvoiceModule';
import ProfileSettings from '../ProfileSettings';
import SettingsLayout from '../settings/SettingsLayout';
import PlaceholderModule from '../modules/PlaceholderModule';

interface ModuleRendererProps {
  activeModule: string;
  activeSettingsTab: string;
  setActiveSettingsTab: (tab: string) => void;
  enabledModules: string[];
  onToggleModule: (moduleId: string) => void;
}

const ModuleRenderer: React.FC<ModuleRendererProps> = ({
  activeModule,
  activeSettingsTab,
  setActiveSettingsTab,
  enabledModules,
  onToggleModule
}) => {
  console.log('App: Rendering module:', activeModule);
  
  switch (activeModule) {
    case 'dashboard':
      return <Dashboard enabledModules={enabledModules} />;
    case 'crm':
      return <CRMModule />;
    case 'booking':
      return <BookingModule />;
    case 'subscription':
      return <SubscriptionModule />;
    case 'invoice':
      return <InvoiceModule />;
    case 'profile':
      return <ProfileSettings enabledModules={enabledModules} />;
    case 'tasks':
      return (
        <PlaceholderModule
          title="Task Management"
          description="This module is under development. Soon you'll be able to manage tasks and deadlines from here."
        />
      );
    case 'projects':
      return (
        <PlaceholderModule
          title="Project Management"
          description="This module is under development. Soon you'll be able to manage projects from here."
        />
      );
    case 'newsletters':
      return (
        <PlaceholderModule
          title="Newsletter Management"
          description="This module is under development. Soon you'll be able to send newsletters and email campaigns from here."
        />
      );
    case 'support':
      return (
        <PlaceholderModule
          title="Support System"
          description="This module is under development. Soon you'll be able to manage customer support tickets from here."
        />
      );
    case 'coworking':
      return (
        <PlaceholderModule
          title="Coworking Space Module"
          description="Specialized module optimized for coworking spaces with desk booking, member management and access control."
          variant="premium"
          premiumType="coworking"
        />
      );
    case 'gym':
      return (
        <PlaceholderModule
          title="Fitness & Gym Module"
          description="Specialized module for fitness centers with memberships, class registration and PT booking."
          variant="premium"
          premiumType="gym"
        />
      );
    case 'settings':
      return (
        <SettingsLayout
          activeSettingsTab={activeSettingsTab}
          setActiveSettingsTab={setActiveSettingsTab}
          enabledModules={enabledModules}
          onToggleModule={onToggleModule}
        />
      );
    default:
      return <Dashboard enabledModules={enabledModules} />;
  }
};

export default ModuleRenderer;
