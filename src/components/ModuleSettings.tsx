
import React, { useState } from 'react';
import ModuleGrid from './modules/ModuleGrid';
import ConfirmationDialog from './modules/ConfirmationDialog';
import FeatureRequestModuleCard from './modules/FeatureRequestModuleCard';
import { modules, branchModules } from './modules/moduleData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

  const handleNavigateToFeatureRequests = () => {
    // This would typically use router navigation
    console.log('Navigate to feature requests');
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Module Settings</h1>
        <p className="text-gray-600 mt-2">Enable or disable modules according to your needs</p>
      </div>

      {/* Feature Requests Overview */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Feature Requests & Voting
          </CardTitle>
          <CardDescription>
            Vote on features for any module, even ones you haven't enabled yet. Help us prioritize development!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={handleNavigateToFeatureRequests}
            className="flex items-center gap-2"
          >
            View All Feature Requests
            <ArrowRight className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>

      {/* Core Modules */}
      <ModuleGrid
        title="Core Modules"
        modules={modules}
        enabledModules={enabledModules}
        onModuleToggle={handleModuleToggle}
        showFeatureRequests={true}
      />

      {/* Branch-specific Modules */}
      <ModuleGrid
        title="Industry-Specific Modules"
        description="Specialized modules optimized for specific industries"
        modules={branchModules}
        enabledModules={enabledModules}
        onModuleToggle={handleModuleToggle}
        showFeatureRequests={true}
      />

      {/* Feature Request Module Cards */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Feature Requests by Module</h2>
        <p className="text-gray-600 mb-6">See what features are being requested for each module and add your votes</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureRequestModuleCard moduleId="dashboard" moduleName="Dashboard" />
          {modules.map((module) => (
            <FeatureRequestModuleCard 
              key={module.id} 
              moduleId={module.id} 
              moduleName={module.name} 
            />
          ))}
          {branchModules.map((module) => (
            <FeatureRequestModuleCard 
              key={module.id} 
              moduleId={module.id} 
              moduleName={module.name} 
            />
          ))}
        </div>
      </div>

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
