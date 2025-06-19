
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
  Search,
  Globe
} from 'lucide-react';

interface SidebarProps {
  activeModule: string;
  onModuleChange: (module: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeModule, onModuleChange }) => {
  const modules = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    { id: 'crm', name: 'CRM', icon: Users },
    { id: 'invoice', name: 'Invoice', icon: FileText },
    { id: 'booking', name: 'Booking', icon: Calendar },
    { id: 'subscription', name: 'Subscription', icon: CreditCard },
  ];

  const settingsItems = [
    { id: 'modules', name: 'Modules', icon: Search },
    { id: 'profile', name: 'Profile', icon: Settings },
    { id: 'language', name: 'Language', icon: Globe },
    { id: 'integrations', name: 'Integrations', icon: Settings },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">Business CRM</h1>
          <UserMenu />
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-1">
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <Button
                key={module.id}
                variant={activeModule === module.id ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  activeModule === module.id && "bg-blue-50 text-blue-700 hover:bg-blue-100"
                )}
                onClick={() => onModuleChange(module.id)}
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
          {settingsItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeModule === item.id ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  activeModule === item.id && "bg-blue-50 text-blue-700 hover:bg-blue-100"
                )}
                onClick={() => onModuleChange(item.id)}
              >
                <Icon className="mr-2 h-4 w-4" />
                {item.name}
              </Button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
