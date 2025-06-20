
import { useCallback } from 'react';

export const useModuleSearch = (
  activeModule: string,
  setActiveModule: (module: string) => void,
  setActiveSettingsTab: (tab: string) => void
) => {
  const handleSearchSelect = useCallback((moduleId: string) => {
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
  }, [activeModule, setActiveModule, setActiveSettingsTab]);

  return { handleSearchSelect };
};
