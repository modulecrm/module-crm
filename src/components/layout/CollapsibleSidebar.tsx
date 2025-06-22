
import React, { useState } from 'react';
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
  MessageSquare,
} from 'lucide-react';

interface CollapsibleSidebarProps {
  activeModule: string;
  onModuleChange: (module: string) => void;
  enabledModules: string[];
}

const CollapsibleSidebar: React.FC<CollapsibleSidebarProps> = ({ 
  activeModule, 
  onModuleChange, 
  enabledModules 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const modules = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    { id: 'crm', name: 'CRM', icon: Users },
    { id: 'invoice', name: 'Invoice', icon: FileText },
    { id: 'booking', name: 'Booking', icon: Calendar },
    { id: 'subscription', name: 'Subscription', icon: CreditCard },
  ];

  const settingsModules = [
    { id: 'settings', name: 'Settings', icon: Settings },
    { id: 'user', name: 'Users', icon: Users },
    { id: 'feature-requests', name: 'Feature Requests', icon: MessageSquare },
  ];

  const handleModuleClick = (moduleId: string) => {
    console.log('🔹 CollapsibleSidebar: User clicked on module:', moduleId);
    onModuleChange(moduleId);
  };

  return (
    <div 
      className={cn(
        "bg-white border-r border-gray-200 flex flex-col h-full transition-all duration-300 ease-in-out",
        isHovered ? "w-64" : "w-16"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {isHovered ? (
            <>
              <h1 className="text-xl font-bold text-gray-900">Module CRM</h1>
              <UserMenu />
            </>
          ) : (
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
          )}
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
                  "w-full transition-all duration-200",
                  isHovered ? "justify-start" : "justify-center px-2",
                  isActive && "bg-blue-50 text-blue-700 hover:bg-blue-100"
                )}
                onClick={() => handleModuleClick(module.id)}
                title={!isHovered ? module.name : undefined}
              >
                <Icon className={cn("h-4 w-4", isHovered && "mr-2")} />
                {isHovered && <span>{module.name}</span>}
              </Button>
            );
          })}
        </div>

        <Separator className="my-4" />

        {/* Settings */}
        <div className="space-y-1">
          {isHovered && (
            <p className="text-xs font-medium text-gray-500 px-2 mb-2">SETTINGS</p>
          )}
          
          {settingsModules.map((module) => {
            const Icon = module.icon;
            const isActive = activeModule === module.id;
            return (
              <Button
                key={module.id}
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full transition-all duration-200",
                  isHovered ? "justify-start" : "justify-center px-2",
                  isActive && "bg-blue-50 text-blue-700 hover:bg-blue-100"
                )}
                onClick={() => handleModuleClick(module.id)}
                title={!isHovered ? module.name : undefined}
              >
                <Icon className={cn("h-4 w-4", isHovered && "mr-2")} />
                {isHovered && <span>{module.name}</span>}
              </Button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default CollapsibleSidebar;
