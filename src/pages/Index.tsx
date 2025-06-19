
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Dashboard from '../components/Dashboard';
import ModuleSettings from '../components/ModuleSettings';
import CRMModule from '../components/CRMModule';
import BookingModule from '../components/BookingModule';

const Index = () => {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [enabledModules, setEnabledModules] = useState(['dashboard', 'crm', 'booking']);

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
        // Don't allow disabling dashboard
        if (moduleId === 'dashboard') return prev;
        return prev.filter(id => id !== moduleId);
      } else {
        return [...prev, moduleId];
      }
    });
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
        return (
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Subscription Management</h1>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <p className="text-blue-800">Dette modul er under udvikling. Snart kan du administrere abonnementer og betalinger herfra.</p>
            </div>
          </div>
        );
      case 'tasks':
        return (
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Task Management</h1>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <p className="text-blue-800">Dette modul er under udvikling. Snart kan du administrere opgaver og deadlines herfra.</p>
            </div>
          </div>
        );
      case 'projects':
        return (
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Project Management</h1>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <p className="text-blue-800">Dette modul er under udvikling. Snart kan du administrere projekter herfra.</p>
            </div>
          </div>
        );
      case 'newsletters':
        return (
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Newsletter Management</h1>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <p className="text-blue-800">Dette modul er under udvikling. Snart kan du sende nyhedsbreve og email kampagner herfra.</p>
            </div>
          </div>
        );
      case 'support':
        return (
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Support System</h1>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <p className="text-blue-800">Dette modul er under udvikling. Snart kan du administrere kundesupport tickets herfra.</p>
            </div>
          </div>
        );
      case 'coworking':
        return (
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Coworking Specialmodul</h1>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
              <p className="text-blue-800 mb-2"><strong>Premium Modul</strong></p>
              <p className="text-blue-700">Specialmodul optimeret til coworking spaces med deskbooking, medlemsstyring og adgangskontrol.</p>
            </div>
          </div>
        );
      case 'gym':
        return (
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Fitness & Gym Modul</h1>
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-6">
              <p className="text-yellow-800 mb-2"><strong>Premium Modul</strong></p>
              <p className="text-yellow-700">Specialmodul til fitnesscentre med medlemskaber, klassetilmeldinger og PT booking.</p>
            </div>
          </div>
        );
      case 'settings':
        return <ModuleSettings enabledModules={enabledModules} onToggleModule={handleToggleModule} />;
      default:
        return <Dashboard enabledModules={enabledModules} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        activeModule={activeModule} 
        onModuleChange={setActiveModule}
        enabledModules={enabledModules}
      />
      <div className="flex-1 overflow-auto">
        {renderActiveModule()}
      </div>
    </div>
  );
};

export default Index;
