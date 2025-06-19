
import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import Dashboard from '@/components/Dashboard';
import CRMModule from '@/components/CRMModule';
import InvoiceModule from '@/components/InvoiceModule';
import BookingModule from '@/components/BookingModule';
import SubscriptionModule from '@/components/SubscriptionModule';
import { useToast } from "@/hooks/use-toast"
import { Toast } from "@/components/ui/toast"
import SettingsModule from './components/SettingsModule';

function App() {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [enabledModules, setEnabledModules] = useState(['dashboard', 'crm', 'invoice', 'booking', 'subscription']);
  const { toast } = useToast()

  useEffect(() => {
    console.log('App: Active module changed to:', activeModule);
  }, [activeModule]);

  const handleModuleChange = (module: string) => {
    setActiveModule(module);
  };

  const handleToggleModule = (moduleId: string) => {
    setEnabledModules(prev => {
      if (prev.includes(moduleId)) {
        return prev.filter(id => id !== moduleId);
      } else {
        return [...prev, moduleId];
      }
    });
  };

  const renderActiveModule = () => {
    console.log('App: Rendering module:', activeModule);
    
    switch (activeModule) {
      case 'dashboard':
        return <Dashboard enabledModules={enabledModules} />;
      case 'crm':
        return <CRMModule />;
      case 'invoice':
        return <InvoiceModule />;
      case 'booking':
        return <BookingModule />;
      case 'subscription':
        return <SubscriptionModule />;
      case 'settings':
        return <SettingsModule enabledModules={enabledModules} onToggleModule={handleToggleModule} />;
      default:
        return <Dashboard enabledModules={enabledModules} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        activeModule={activeModule}
        onModuleChange={handleModuleChange}
        enabledModules={enabledModules}
      />
      <main className="flex-1 p-4">
        {renderActiveModule()}
      </main>
      <Toast />
    </div>
  );
}

export default App;
