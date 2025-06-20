
import { useState, useEffect, useCallback } from 'react';

export const useModuleManagement = () => {
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

  const handleToggleModule = useCallback((moduleId: string) => {
    setEnabledModules(prev => {
      if (prev.includes(moduleId)) {
        if (moduleId === 'dashboard' || moduleId === 'invoice') return prev;
        return prev.filter(id => id !== moduleId);
      } else {
        return [...prev, moduleId];
      }
    });
  }, []);

  return {
    enabledModules,
    handleToggleModule
  };
};
