
import React from 'react';
import Dashboard from '../Dashboard';
import CRMModule from '../CRMModule';
import BookingModule from '../BookingModule';
import SubscriptionModule from '../SubscriptionModule';
import InvoiceModule from '../InvoiceModule';
import ProfileSettings from '../ProfileSettings';
import SettingsPage from '../settings/SettingsPage';
import PlaceholderModule from './PlaceholderModule';

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
  onToggleModule 
}: ModuleRendererProps) => {
  console.log('ModuleRenderer: Rendering module:', activeModule);
  
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
      console.log('ModuleRenderer: Rendering ProfileSettings for profile module');
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
          isPremium={true}
        />
      );
    case 'gym':
      return (
        <PlaceholderModule
          title="Fitness & Gym Module"
          description="Specialized module for fitness centers with memberships, class registration and PT booking."
          isPremium={true}
        />
      );
    case 'settings':
      return (
        <SettingsPage
          activeSettingsTab={activeSettingsTab}
          setActiveSettingsTab={setActiveSettingsTab}
          enabledModules={enabledModules}
          onToggleModule={onToggleModule}
        />
      );
    default:
      console.log('ModuleRenderer: Defaulting to Dashboard for module:', activeModule);
      return <Dashboard enabledModules={enabledModules} />;
  }
};

export default ModuleRenderer;
