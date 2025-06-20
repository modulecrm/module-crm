
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Puzzle, User, Globe, Zap } from 'lucide-react';
import Templates from './settings/Templates';
import ModuleSettings from './ModuleSettings';
import ProfileSettings from './ProfileSettings';
import LanguageSettings from './LanguageSettings';
import IntegrationsSettings from './IntegrationsSettings';

interface SettingsModuleProps {
  enabledModules: string[];
  onToggleModule: (moduleId: string) => void;
}

const SettingsModule = ({ enabledModules, onToggleModule }: SettingsModuleProps) => {
  const [activeTab, setActiveTab] = useState('templates');

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Manage your application settings and preferences</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Templates
          </TabsTrigger>
          <TabsTrigger value="modules" className="flex items-center gap-2">
            <Puzzle className="h-4 w-4" />
            Modules
          </TabsTrigger>
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="language" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Language
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Integrations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="mt-6">
          <Templates />
        </TabsContent>

        <TabsContent value="modules" className="mt-6">
          <ModuleSettings enabledModules={enabledModules} onToggleModule={onToggleModule} />
        </TabsContent>

        <TabsContent value="profile" className="mt-6">
          <ProfileSettings enabledModules={enabledModules} />
        </TabsContent>

        <TabsContent value="language" className="mt-6">
          <LanguageSettings />
        </TabsContent>

        <TabsContent value="integrations" className="mt-6">
          <IntegrationsSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsModule;
