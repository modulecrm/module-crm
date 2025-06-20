
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
  console.log('ModuleRenderer: Current active module is:', activeModule);
  
  switch (activeModule) {
    case 'dashboard':
      console.log('ModuleRenderer: Rendering Dashboard module');
      return <Dashboard enabledModules={enabledModules} />;
    case 'crm':
      console.log('ModuleRenderer: Rendering CRM module');
      return <CRMModule />;
    case 'booking':
      console.log('ModuleRenderer: Rendering Booking module');
      return <BookingModule />;
    case 'subscription':
      console.log('ModuleRenderer: Rendering Subscription module');
      return <SubscriptionModule />;
    case 'invoice':
      console.log('ModuleRenderer: Rendering Invoice module');
      return <InvoiceModule />;
    case 'profile':
      console.log('ModuleRenderer: Rendering ProfileSettings for PROFILE module (NOT Dashboard)');
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
      console.log('ModuleRenderer: Rendering Settings module');
      return (
        <SettingsPage
          activeSettingsTab={activeSettingsTab}
          setActiveSettingsTab={setActiveSettingsTab}
          enabledModules={enabledModules}
          onToggleModule={onToggleModule}
        />
      );
    default:
      console.warn('ModuleRenderer: Unknown module:', activeModule, '- this should NOT happen for profile module');
      return <Dashboard enabledModules={enabledModules} />;
  }
};

export default ModuleRenderer;
