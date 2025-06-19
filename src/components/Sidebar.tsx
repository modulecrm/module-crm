
import React from 'react';
import { Home, Users, Calendar, CheckSquare, FolderOpen, Mail, MessageSquare, LifeBuoy, Settings, Building2, Globe } from '
react';
import { useLanguage } from '../contexts/LanguageContext';

interface SidebarProps {
  activeModule: string;
  onModuleChange: (module: string) => void;
  enabledModules: string[];
}

const Sidebar = ({ activeModule, onModuleChange, enabledModules }: SidebarProps) => {
  const { currentLanguage, availableLanguages, setCurrentLanguage, t } = useLanguage();

  const modules = [
    { id: 'dashboard', name: t('nav.dashboard'), icon: Home, color: 'text-blue-500' },
    { id: 'crm', name: t('nav.crm'), icon: Users, color: 'text-green-500' },
    { id: 'subscription', name: t('nav.subscription'), icon: Building2, color: 'text-purple-500' },
    { id: 'booking', name: t('nav.booking'), icon: Calendar, color: 'text-orange-500' },
    { id: 'tasks', name: t('nav.tasks'), icon: CheckSquare, color: 'text-red-500' },
    { id: 'projects', name: t('nav.projects'), icon: FolderOpen, color: 'text-indigo-500' },
    { id: 'newsletters', name: t('nav.newsletters'), icon: Mail, color: 'text-pink-500' },
    { id: 'support', name: t('nav.support'), icon: LifeBuoy, color: 'text-teal-500' },
  ];

  // Filter modules to only show enabled ones
  const visibleModules = modules.filter(module => enabledModules.includes(module.id));

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen overflow-y-auto">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">ModuleCRM</h1>
        <p className="text-sm text-gray-500">Flexible CRM System</p>
      </div>
      
      <nav className="px-4 pb-4">
        <div className="space-y-1">
          {visibleModules.map((module) => {
            const isActive = activeModule === module.id;
            const Icon = module.icon;
            
            return (
              <button
                key={module.id}
                onClick={() => onModuleChange(module.id)}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-700'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-blue-700' : module.color}`} />
                {module.name}
              </button>
            );
          })}
        </div>
        
        <div className="mt-8 pt-4 border-t border-gray-200">
          {/* Language Selector */}
          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-500 mb-2">{t('general.language')}</label>
            <select
              value={currentLanguage}
              onChange={(e) => setCurrentLanguage(e.target.value)}
              className="w-full text-sm px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {availableLanguages.map(language => (
                <option key={language.code} value={language.code}>
                  {language.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => onModuleChange('settings')}
            className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
              activeModule === 'settings'
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Settings className="mr-3 h-5 w-5 text-gray-500" />
            {t('nav.settings')}
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
