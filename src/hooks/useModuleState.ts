
import { useState, useEffect } from 'react';

export const useModuleState = () => {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [activeSettingsTab, setActiveSettingsTab] = useState('modules');
  const [enabledModules, setEnabledModules] = useState([
    'dashboard', 'crm', 'invoice', 'subscription', 'booking', 'tasks',
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
        if (moduleId === 'dashboard' || moduleId === 'invoice') return prev;
        return prev.filter(id => id !== moduleId);
      } else {
        return [...prev, moduleId];
      }
    });
  };

  const handleSearchSelect = (moduleId: string) => {
    if (activeModule !== 'settings') {
      setActiveModule('settings');
      setActiveSettingsTab('modules');
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

  return {
    activeModule,
    setActiveModule,
    activeSettingsTab,
    setActiveSettingsTab,
    enabledModules,
    handleToggleModule,
    handleSearchSelect
  };
};
