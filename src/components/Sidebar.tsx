
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import UserMenu from '@/components/auth/UserMenu';
import {
  BarChart3,
  Users,
  FileText,
  Calendar,
  CreditCard,
  Settings,
} from 'lucide-react';

interface SidebarProps {
  activeModule: string;
  onModuleChange: (module: string) => void;
  enabledModules: string[];
}

const Sidebar: React.FC<SidebarProps> = ({ activeModule, onModuleChange, enabledModules }) => {
  const modules = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    { id: 'crm', name: 'CRM', icon: Users },
    { id: 'invoice', name: 'Invoice', icon: FileText },
    { id: 'booking', name: 'Booking', icon: Calendar },
    { id: 'subscription', name: 'Subscription', icon: CreditCard },
  ];

  const handleModuleClick = (moduleId: string) => {
    console.log('🔹 Sidebar: User clicked on module:', moduleId);
    onModuleChange(moduleId);
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">Module CRM</h1>
          <UserMenu />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-1">
          {modules.map((module) => {
            const Icon = module.icon;
            const isActive = activeModule === module.id;
            return (
              <Button
                key={module.id}
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  isActive && "bg-blue-50 text-blue-700 hover:bg-blue-100"
                )}
                onClick={() => handleModuleClick(module.id)}
              >
                <Icon className="mr-2 h-4 w-4" />
                {module.name}
              </Button>
            );
          })}
        </div>

        <Separator className="my-4" />

        {/* Settings */}
        <div className="space-y-1">
          <p className="text-xs font-medium text-gray-500 px-2 mb-2">SETTINGS</p>
          
          <Button
            variant={activeModule === 'settings' ? "default" : "ghost"}
            className={cn(
              "w-full justify-start",
              activeModule === 'settings' && "bg-blue-50 text-blue-700 hover:bg-blue-100"
            )}
            onClick={() => handleModuleClick('settings')}
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>

          <Button
            variant={activeModule === 'user' ? "default" : "ghost"}
            className={cn(
              "w-full justify-start",
              activeModule === 'user' && "bg-blue-50 text-blue-700 hover:bg-blue-100"
            )}
            onClick={() => handleModuleClick('user')}
          >
            <Users className="mr-2 h-4 w-4" />
            Users
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
