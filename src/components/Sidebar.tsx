
import React from 'react';
import { Home, Users, Calendar, CheckSquare, FolderOpen, Mail, MessageSquare, LifeBuoy, Settings, Building2 } from 'lucide-react';

interface SidebarProps {
  activeModule: string;
  onModuleChange: (module: string) => void;
  enabledModules: string[];
}

const modules = [
  { id: 'dashboard', name: 'Dashboard', icon: Home, color: 'text-blue-500' },
  { id: 'crm', name: 'CRM Core Module', icon: Users, color: 'text-green-500' },
  { id: 'subscription', name: 'Subscription Management', icon: Building2, color: 'text-purple-500' },
  { id: 'booking', name: 'Booking Management', icon: Calendar, color: 'text-orange-500' },
  { id: 'tasks', name: 'Task Management', icon: CheckSquare, color: 'text-red-500' },
  { id: 'projects', name: 'Project Management', icon: FolderOpen, color: 'text-indigo-500' },
  { id: 'newsletters', name: 'Newsletters', icon: Mail, color: 'text-pink-500' },
  { id: 'support', name: 'Support System', icon: LifeBuoy, color: 'text-teal-500' },
];

const Sidebar = ({ activeModule, onModuleChange, enabledModules }: SidebarProps) => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen overflow-y-auto">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">ModularCRM</h1>
        <p className="text-sm text-gray-500">Flexible CRM System</p>
      </div>
      
      <nav className="px-4 pb-4">
        <div className="space-y-1">
          {modules.map((module) => {
            const isEnabled = enabledModules.includes(module.id);
            const isActive = activeModule === module.id;
            const Icon = module.icon;
            
            return (
              <button
                key={module.id}
                onClick={() => isEnabled && onModuleChange(module.id)}
                disabled={!isEnabled && module.id !== 'dashboard'}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-700'
                    : isEnabled
                    ? 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    : 'text-gray-400 cursor-not-allowed opacity-50'
                }`}
              >
                <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-blue-700' : module.color}`} />
                {module.name}
                {!isEnabled && module.id !== 'dashboard' && (
                  <span className="ml-auto text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">
                    Disabled
                  </span>
                )}
              </button>
            );
          })}
        </div>
        
        <div className="mt-8 pt-4 border-t border-gray-200">
          <button
            onClick={() => onModuleChange('settings')}
            className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
              activeModule === 'settings'
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Settings className="mr-3 h-5 w-5 text-gray-500" />
            Settings
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
