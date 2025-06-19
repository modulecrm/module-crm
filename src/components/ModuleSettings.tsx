
import React, { useState } from 'react';
import { Check, Users, Calendar, CheckSquare, FolderOpen, Mail, MessageSquare, LifeBuoy, Building2, Zap, ExternalLink } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ModuleSettingsProps {
  enabledModules: string[];
  onToggleModule: (moduleId: string) => void;
}

const modules = [
  {
    id: 'crm',
    name: 'CRM Core Module',
    icon: Users,
    color: 'from-green-400 to-green-600',
    price: '$29/month',
    learnMoreUrl: 'https://example.com/crm-module'
  },
  {
    id: 'subscription',
    name: 'Subscription Management',
    icon: Building2,
    color: 'from-purple-400 to-purple-600',
    price: '$49/month',
    learnMoreUrl: 'https://example.com/subscription-module'
  },
  {
    id: 'booking',
    name: 'Booking Management',
    icon: Calendar,
    color: 'from-orange-400 to-orange-600',
    price: '$39/month',
    learnMoreUrl: 'https://example.com/booking-module'
  },
  {
    id: 'tasks',
    name: 'Task Management',
    icon: CheckSquare,
    color: 'from-red-400 to-red-600',
    price: '$19/month',
    learnMoreUrl: 'https://example.com/tasks-module'
  },
  {
    id: 'projects',
    name: 'Project Management',
    icon: FolderOpen,
    color: 'from-indigo-400 to-indigo-600',
    price: '$59/month',
    learnMoreUrl: 'https://example.com/projects-module'
  },
  {
    id: 'newsletters',
    name: 'Newsletters',
    icon: Mail,
    color: 'from-pink-400 to-pink-600',
    price: '$25/month',
    learnMoreUrl: 'https://example.com/newsletters-module'
  },
  {
    id: 'support',
    name: 'Support System',
    icon: LifeBuoy,
    color: 'from-teal-400 to-teal-600',
    price: '$35/month',
    learnMoreUrl: 'https://example.com/support-module'
  }
];

const branchModules = [
  {
    id: 'coworking',
    name: 'Coworking Space Module',
    icon: Building2,
    color: 'from-blue-400 to-blue-600',
    price: '$89/month',
    learnMoreUrl: 'https://example.com/coworking-module',
    premium: true
  },
  {
    id: 'gym',
    name: 'Fitness & Gym Module',
    icon: Zap,
    color: 'from-yellow-400 to-yellow-600',
    price: '$79/month',
    learnMoreUrl: 'https://example.com/gym-module',
    premium: true
  }
];

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

  const renderModuleCard = (module: any) => {
    const isEnabled = enabledModules.includes(module.id);
    const Icon = module.icon;
    
    return (
      <div key={module.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200 relative">
        {module.premium && (
          <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            PREMIUM
          </div>
        )}
        <div className={`h-2 bg-gradient-to-r ${module.color}`}></div>
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-lg bg-gradient-to-r ${module.color}`}>
              <Icon className="h-6 w-6 text-white" />
            </div>
            <button
              onClick={() => handleModuleToggle(module)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                isEnabled ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{module.name}</h3>
          
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-gray-900">{module.price}</div>
            <a
              href={module.learnMoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Learn more
              <ExternalLink className="h-4 w-4 ml-1" />
            </a>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Module Settings</h1>
        <p className="text-gray-600 mt-2">Enable or disable modules according to your needs</p>
      </div>

      {/* Core Modules */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Core Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map(renderModuleCard)}
        </div>
      </div>

      {/* Branch-specific Modules */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Industry-Specific Modules</h2>
        <p className="text-gray-600 mb-6">Specialized modules optimized for specific industries</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {branchModules.map(renderModuleCard)}
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={confirmationDialog.isOpen} onOpenChange={cancelToggle}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {confirmationDialog.action === 'enable' ? 'Enable' : 'Disable'} Module
            </DialogTitle>
            <DialogDescription>
              {confirmationDialog.action === 'enable' ? (
                <>
                  You are about to enable <strong>{confirmationDialog.module?.name}</strong>.
                  <br />
                  <span className="text-lg font-semibold text-gray-900 mt-2 block">
                    Price: {confirmationDialog.module?.price}
                  </span>
                  <br />
                  Do you want to proceed with this subscription?
                </>
              ) : (
                <>
                  You are about to disable <strong>{confirmationDialog.module?.name}</strong>.
                  <br />
                  This will cancel your subscription and you will lose access to this module.
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={cancelToggle}>
              Cancel
            </Button>
            <Button onClick={confirmToggle}>
              {confirmationDialog.action === 'enable' ? 'Accept & Enable' : 'Disable'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ModuleSettings;
