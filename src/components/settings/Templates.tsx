
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Globe } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import TemplateEditor from './TemplateEditor';
import ModuleSidebar from './templates/ModuleSidebar';
import TemplateCard from './templates/TemplateCard';
import TranslationSummaryCard from './templates/TranslationSummaryCard';
import { Template } from './templates/types';
import { 
  moduleOptions, 
  templateCategories 
} from './templates/templateData';
import {
  getTemplatesByCategory,
  getTranslationStatus,
  getTotalUntranslatedCount,
  getFilteredTemplates,
  createDuplicateTemplate
} from './templates/utils';

const Templates = () => {
  const { availableLanguages } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('emails');
  const [selectedModule, setSelectedModule] = useState('crm');
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  const [showUntranslatedOnly, setShowUntranslatedOnly] = useState(false);

  const templates = getTemplatesByCategory(activeCategory, selectedModule);
  const filteredTemplates = getFilteredTemplates(templates, showUntranslatedOnly, availableLanguages);
  const untranslatedCount = getTotalUntranslatedCount(templates, availableLanguages);

  const handleDuplicate = (template: Template) => {
    const duplicatedTemplate = createDuplicateTemplate(template);
    console.log('Duplicating template:', duplicatedTemplate);
    setEditingTemplate(duplicatedTemplate);
  };

  const handleModuleChange = (moduleId: string) => {
    setSelectedModule(moduleId);
  };

  if (editingTemplate) {
    return (
      <TemplateEditor 
        template={editingTemplate} 
        onBack={() => setEditingTemplate(null)} 
      />
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <ModuleSidebar 
        moduleOptions={moduleOptions}
        selectedModule={selectedModule}
        onModuleChange={handleModuleChange}
      />

      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Templates</h1>
                <p className="text-gray-600">
                  Manage email and contract templates for {moduleOptions.find(m => m.id === selectedModule)?.name}
                </p>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Template
              </Button>
            </div>
          </div>

          <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              {templateCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    {category.name}
                  </TabsTrigger>
                );
              })}
            </TabsList>

            <TabsContent value="emails" className="mt-6">
              <div className="mb-6">
                <TranslationSummaryCard 
                  untranslatedCount={untranslatedCount}
                  showUntranslatedOnly={showUntranslatedOnly}
                  onToggleFilter={() => setShowUntranslatedOnly(!showUntranslatedOnly)}
                />
                
                {showUntranslatedOnly && (
                  <div className="mt-4">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setShowUntranslatedOnly(false)}
                    >
                      Show All Templates
                    </Button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTemplates.map((template) => (
                  <TemplateCard 
                    key={template.id} 
                    template={template} 
                    translationStatus={getTranslationStatus(template.id, availableLanguages)}
                    onEdit={setEditingTemplate}
                    onDuplicate={handleDuplicate}
                  />
                ))}
              </div>

              {filteredTemplates.length === 0 && showUntranslatedOnly && (
                <div className="text-center py-8 text-gray-500">
                  <Globe className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>All templates are fully translated!</p>
                  <p className="text-sm">Great job on keeping your translations up to date.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="contracts" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTemplates.map((template) => (
                  <TemplateCard 
                    key={template.id} 
                    template={template} 
                    translationStatus={getTranslationStatus(template.id, availableLanguages)}
                    onEdit={setEditingTemplate}
                    onDuplicate={handleDuplicate}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Templates;
