import React, { useState, useEffect } from 'react';
import { LanguageProvider } from '../contexts/LanguageContext';
import Sidebar from '../components/Sidebar';
import Dashboard from '../components/Dashboard';
import ModuleSettings from '../components/ModuleSettings';
import LanguageSettings from '../components/LanguageSettings';
import ProfileSettings from '../components/ProfileSettings';
import CRMModule from '../components/CRMModule';
import BookingModule from '../components/BookingModule';
import SubscriptionModule from '../components/SubscriptionModule';
import InvoiceModule from '../components/InvoiceModule';
import ModuleSearch from '../components/ModuleSearch';

const Index = () => {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [activeSettingsTab, setActiveSettingsTab] = useState('modules');
  // Activate all core modules and coworking module as requested
  const [enabledModules, setEnabledModules] = useState([
    'dashboard', 'crm', 'invoices', 'subscription', 'booking', 'tasks', 
    'projects', 'newsletters', 'support', 'coworking'
  ]);

  // Load saved settings from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('enabledModules');
    if (saved) {
      setEnabledModules(JSON.parse(saved));
    }
  }, []);

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem('enabledModules', JSON.stringify(enabledModules));
  }, [enabledModules]);

  const handleToggleModule = (moduleId: string) => {
    setEnabledModules(prev => {
      if (prev.includes(moduleId)) {
        // Don't allow disabling dashboard or invoices (core dependency)
        if (moduleId === 'dashboard' || moduleId === 'invoices') return prev;
        return prev.filter(id => id !== moduleId);
      } else {
        return [...prev, moduleId];
      }
    });
  };

  const handleSearchSelect = (moduleId: string) => {
    // Navigate to settings if not already there, then scroll to module
    if (activeModule !== 'settings') {
      setActiveModule('settings');
      setActiveSettingsTab('modules');
      // Wait for the component to render before scrolling
      setTimeout(() => {
        const moduleElement = document.getElementById(`module-${moduleId}`);
        if (moduleElement) {
          moduleElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          moduleElement.classList.add('ring-2', 'ring-blue-500');
          setTimeout(() => {
            moduleElement.classList.remove('ring-2', 'ring-blue-500');
          }, 2000);
        }
      }, 100);
    } else {
      // Already in settings, just scroll to module
      const moduleElement = document.getElementById(`module-${moduleId}`);
      if (moduleElement) {
        moduleElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        moduleElement.classList.add('ring-2', 'ring-blue-500');
        setTimeout(() => {
          moduleElement.classList.remove('ring-2', 'ring-blue-500');
        }, 2000);
      }
    }
  };

  const renderActiveModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <Dashboard enabledModules={enabledModules} />;
      case 'crm':
        return <CRMModule />;
      case 'booking':
        return <BookingModule />;
      case 'subscription':
        return <SubscriptionModule />;
      case 'invoices':
        return <InvoiceModule />;
      case 'tasks':
        return (
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Task Management</h1>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <p className="text-blue-800">This module is under development. Soon you'll be able to manage tasks and deadlines from here.</p>
            </div>
          </div>
        );
      case 'projects':
        return (
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Project Management</h1>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <p className="text-blue-800">This module is under development. Soon you'll be able to manage projects from here.</p>
            </div>
          </div>
        );
      case 'newsletters':
        return (
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Newsletter Management</h1>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <p className="text-blue-800">This module is under development. Soon you'll be able to send newsletters and email campaigns from here.</p>
            </div>
          </div>
        );
      case 'support':
        return (
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Support System</h1>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <p className="text-blue-800">This module is under development. Soon you'll be able to manage customer support tickets from here.</p>
            </div>
          </div>
        );
      case 'coworking':
        return (
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Coworking Space Module</h1>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
              <p className="text-blue-800 mb-2"><strong>Premium Module</strong></p>
              <p className="text-blue-700">Specialized module optimized for coworking spaces with desk booking, member management and access control.</p>
            </div>
          </div>
        );
      case 'gym':
        return (
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Fitness & Gym Module</h1>
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-6">
              <p className="text-yellow-800 mb-2"><strong>Premium Module</strong></p>
              <p className="text-yellow-700">Specialized module for fitness centers with memberships, class registration and PT booking.</p>
            </div>
          </div>
        );
      case 'settings':
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
                  onClick={() => setActiveSettingsTab('profile')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeSettingsTab === 'profile'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Profile
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
              </nav>
            </div>

            {/* Settings Content */}
            {activeSettingsTab === 'modules' && (
              <ModuleSettings enabledModules={enabledModules} onToggleModule={handleToggleModule} />
            )}
            {activeSettingsTab === 'profile' && <ProfileSettings enabledModules={enabledModules} />}
            {activeSettingsTab === 'language' && <LanguageSettings />}
          </div>
        );
      default:
        return <Dashboard enabledModules={enabledModules} />;
    }
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar 
          activeModule={activeModule} 
          onModuleChange={setActiveModule}
          enabledModules={enabledModules}
        />
        <div className="flex-1 overflow-auto">
          {/* Global Module Search */}
          <div className="bg-white border-b border-gray-200 px-8 py-4">
            <ModuleSearch onModuleSelect={handleSearchSelect} />
          </div>
          {renderActiveModule()}
        </div>
      </div>
    </LanguageProvider>
  );
};

export default Index;
