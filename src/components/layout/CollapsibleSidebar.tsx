
import React, { useState, useEffect } from 'react';
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
  const [showText, setShowText] = useState(false);

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

  // Handle text visibility with delay
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    if (isHovered) {
      // Delay showing text until after the width animation (300ms) completes
      timeoutId = setTimeout(() => {
        setShowText(true);
      }, 250);
    } else {
      // Hide text immediately when not hovered
      setShowText(false);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isHovered]);

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
      {/* Header - Fixed height to prevent jumping */}
      <div className="p-4 border-b border-gray-200 h-20 flex items-center">
        <div className="flex items-center w-full">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm">M</span>
          </div>
          
          {/* Text with opacity transition and fixed height container */}
          <div className="ml-3 flex-1 flex items-center justify-between overflow-hidden">
            <div 
              className={cn(
                "transition-opacity duration-200 ease-in-out whitespace-nowrap",
                showText ? "opacity-100" : "opacity-0"
              )}
              style={{ minHeight: '28px' }} // Prevent height collapse
            >
              <h1 className="text-xl font-bold text-gray-900 leading-7">
                Module<br />CRM
              </h1>
            </div>
            
            <div className={cn(
              "transition-opacity duration-200 ease-in-out",
              showText ? "opacity-100" : "opacity-0"
            )}>
              <UserMenu />
            </div>
          </div>
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
                
                {/* Text with opacity transition */}
                <span className={cn(
                  "transition-opacity duration-200 ease-in-out whitespace-nowrap",
                  showText ? "opacity-100" : "opacity-0"
                )}>
                  {showText && module.name}
                </span>
              </Button>
            );
          })}
        </div>

        <Separator className="my-4" />

        {/* Settings */}
        <div className="space-y-1">
          {/* Settings label with opacity transition */}
          <p className={cn(
            "text-xs font-medium text-gray-500 px-2 mb-2 transition-opacity duration-200 ease-in-out",
            showText ? "opacity-100" : "opacity-0"
          )}>
            {showText && "SETTINGS"}
          </p>
          
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
                
                {/* Text with opacity transition */}
                <span className={cn(
                  "transition-opacity duration-200 ease-in-out whitespace-nowrap",
                  showText ? "opacity-100" : "opacity-0"
                )}>
                  {showText && module.name}
                </span>
              </Button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default CollapsibleSidebar;
