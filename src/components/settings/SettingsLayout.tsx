
import React from 'react';
import ModuleSettings from '../ModuleSettings';
import PaymentSettings from '../subscription/PaymentSettings';
import IntegrationsSettings from '../IntegrationsSettings';
import LanguageSettings from '../LanguageSettings';
import ProfileSettings from '../ProfileSettings';

interface SettingsLayoutProps {
  activeSettingsTab: string;
  setActiveSettingsTab: (tab: string) => void;
  enabledModules: string[];
  onToggleModule: (moduleId: string) => void;
}

const SettingsLayout: React.FC<SettingsLayoutProps> = ({
  activeSettingsTab,
  setActiveSettingsTab,
  enabledModules,
  onToggleModule
}) => {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Manage your CRM system configuration</p>
      </div>

      {/* Settings Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveSettingsTab('modules')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeSettingsTab === 'modules'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Modules
          </button>
          <button
            onClick={() => setActiveSettingsTab('payments')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeSettingsTab === 'payments'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Payment Settings
          </button>
          <button
            onClick={() => setActiveSettingsTab('integrations')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeSettingsTab === 'integrations'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Integrations
          </button>
          <button
            onClick={() => setActiveSettingsTab('language')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeSettingsTab === 'language'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Language
          </button>
          <button
            onClick={() => setActiveSettingsTab('profile')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeSettingsTab === 'profile'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Profile & Invoice Settings
          </button>
        </nav>
      </div>

      {/* Settings Content */}
      {activeSettingsTab === 'modules' && (
        <ModuleSettings enabledModules={enabledModules} onToggleModule={onToggleModule} />
      )}
      {activeSettingsTab === 'payments' && <PaymentSettings />}
      {activeSettingsTab === 'integrations' && <IntegrationsSettings />}
      {activeSettingsTab === 'language' && <LanguageSettings />}
      {activeSettingsTab === 'profile' && <ProfileSettings enabledModules={enabledModules} />}
    </div>
  );
};

export default SettingsLayout;
