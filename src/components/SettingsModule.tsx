
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Puzzle, Globe, Zap } from 'lucide-react';
import Templates from './settings/Templates';
import ModuleSettings from './ModuleSettings';
import LanguageSettings from './LanguageSettings';
import IntegrationsSettings from './IntegrationsSettings';

interface SettingsModuleProps {
  enabledModules: string[];
  onToggleModule: (moduleId: string) => void;
}

const SettingsModule = ({ enabledModules, onToggleModule }: SettingsModuleProps) => {
  const [activeTab, setActiveTab] = useState('templates');

  return (
    <div className="w-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="px-4 md:px-8 py-2 border-b border-gray-200">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="templates" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Templates
            </TabsTrigger>
            <TabsTrigger value="modules" className="flex items-center gap-2">
              <Puzzle className="h-4 w-4" />
              Modules
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
        </div>

        <TabsContent value="templates" className="px-4 md:px-8 py-6">
          <Templates />
        </TabsContent>

        <TabsContent value="modules" className="px-4 md:px-8 py-6">
          <ModuleSettings enabledModules={enabledModules} onToggleModule={onToggleModule} />
        </TabsContent>

        <TabsContent value="language" className="px-4 md:px-8 py-6">
          <LanguageSettings />
        </TabsContent>

        <TabsContent value="integrations" className="px-4 md:px-8 py-6">
          <IntegrationsSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsModule;
