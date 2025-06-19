
import React, { useState } from 'react';
import ModuleGrid from './modules/ModuleGrid';
import ConfirmationDialog from './modules/ConfirmationDialog';
import { modules, branchModules } from './modules/moduleData';

interface ModuleSettingsProps {
  enabledModules: string[];
  onToggleModule: (moduleId: string) => void;
}

const ModuleSettings = ({ enabledModules, onToggleModule }: ModuleSettingsProps) => {
  const [confirmationDialog, setConfirmationDialog] = useState<{
    isOpen: boolean;
    module: any;
    action: 'enable' | 'disable';
  }>({
    isOpen: false,
    module: null,
    action: 'enable'
  });

  const handleModuleToggle = (module: any) => {
    // Prevent disabling core modules
    if (module.required && enabledModules.includes(module.id)) {
      return; // Don't allow disabling required modules
    }
    
    const isEnabled = enabledModules.includes(module.id);
    setConfirmationDialog({
      isOpen: true,
      module,
      action: isEnabled ? 'disable' : 'enable'
    });
  };

  const confirmToggle = () => {
    if (confirmationDialog.module) {
      onToggleModule(confirmationDialog.module.id);
    }
    setConfirmationDialog({ isOpen: false, module: null, action: 'enable' });
  };

  const cancelToggle = () => {
    setConfirmationDialog({ isOpen: false, module: null, action: 'enable' });
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Module Settings</h1>
        <p className="text-gray-600 mt-2">Enable or disable modules according to your needs</p>
      </div>

      {/* Core Modules */}
      <ModuleGrid
        title="Core Modules"
        modules={modules}
        enabledModules={enabledModules}
        onModuleToggle={handleModuleToggle}
      />

      {/* Branch-specific Modules */}
      <ModuleGrid
        title="Industry-Specific Modules"
        description="Specialized modules optimized for specific industries"
        modules={branchModules}
        enabledModules={enabledModules}
        onModuleToggle={handleModuleToggle}
      />

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={confirmationDialog.isOpen}
        module={confirmationDialog.module}
        action={confirmationDialog.action}
        onConfirm={confirmToggle}
        onCancel={cancelToggle}
      />
    </div>
  );
};

export default ModuleSettings;
