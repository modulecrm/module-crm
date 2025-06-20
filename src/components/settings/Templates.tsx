import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, File, Plus, Edit, Eye, Copy, Globe, AlertCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import TemplateEditor from './TemplateEditor';

const Templates = () => {
  const { availableLanguages } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('emails');
  const [selectedModule, setSelectedModule] = useState('crm');
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [showUntranslatedOnly, setShowUntranslatedOnly] = useState(false);

  // Mock template content data - in a real app, this would come from a backend
  const templateTranslations = {
    '1': { en: true, da: true, de: false, es: true },
    '2': { en: true, da: false, de: false, es: false },
    '3': { en: true, da: true, de: true, es: true },
    '4': { en: true, da: false, de: true, es: false },
    '5': { en: true, da: true, de: false, es: true },
  };

  const templateCategories = [
    { id: 'emails', name: 'Emails', icon: Mail },
    { id: 'contracts', name: 'Contracts', icon: File },
  ];

  const moduleTemplates = {
    crm: [
      { id: '1', name: 'Welcome Email', isDefault: true, description: 'New customer welcome message' },
      { id: '2', name: 'Follow-up Email', isDefault: false, description: 'Customer follow-up after meeting' },
      { id: '3', name: 'Quote Follow-up', isDefault: false, description: 'Follow-up after sending quote' },
      { id: '4', name: 'Thank You Email', isDefault: false, description: 'Thank you after purchase' },
      { id: '5', name: 'Birthday Greeting', isDefault: false, description: 'Customer birthday wishes' },
    ],
    invoice: [
      { id: '1', name: 'Invoice', isDefault: true, description: 'Standard invoice email' },
      { id: '2', name: 'Credit Note', isDefault: false, description: 'Credit note notification' },
      { id: '3', name: 'Receipt', isDefault: false, description: 'Payment receipt confirmation' },
      { id: '4', name: 'Payment Reminder', isDefault: false, description: 'Payment reminder email' },
      { id: '5', name: 'Due Fee', isDefault: false, description: 'Overdue payment notification' },
      { id: '6', name: 'Order', isDefault: false, description: 'Order confirmation email' },
      { id: '7', name: 'Payment Failed', isDefault: false, description: 'Failed payment notification' },
    ],
    subscription: [
      { id: '1', name: 'New Agreement', isDefault: true, description: 'New subscription agreement' },
      { id: '2', name: 'Renewal Notice', isDefault: false, description: 'Subscription renewal reminder' },
      { id: '3', name: 'Cancellation Confirmation', isDefault: false, description: 'Subscription cancellation notice' },
      { id: '4', name: 'Payment Updated', isDefault: false, description: 'Payment method updated' },
      { id: '5', name: 'Upgrade Notification', isDefault: false, description: 'Plan upgrade confirmation' },
    ],
    booking: [
      { id: '1', name: 'Booking Confirmation', isDefault: true, description: 'Appointment booking confirmation' },
      { id: '2', name: 'Booking Reminder', isDefault: false, description: 'Appointment reminder 24h before' },
      { id: '3', name: 'Booking Cancelled', isDefault: false, description: 'Booking cancellation notice' },
      { id: '4', name: 'Reschedule Request', isDefault: false, description: 'Appointment reschedule notification' },
      { id: '5', name: 'No-Show Follow-up', isDefault: false, description: 'Follow-up after missed appointment' },
    ],
    tasks: [
      { id: '1', name: 'Task Assignment', isDefault: true, description: 'New task assignment notification' },
      { id: '2', name: 'Task Completed', isDefault: false, description: 'Task completion notification' },
      { id: '3', name: 'Task Overdue', isDefault: false, description: 'Overdue task reminder' },
      { id: '4', name: 'Project Update', isDefault: false, description: 'Project progress update' },
    ],
    support: [
      { id: '1', name: 'Ticket Created', isDefault: true, description: 'Support ticket confirmation' },
      { id: '2', name: 'Ticket Updated', isDefault: false, description: 'Ticket status update' },
      { id: '3', name: 'Ticket Resolved', isDefault: false, description: 'Ticket resolution notification' },
      { id: '4', name: 'Customer Satisfaction', isDefault: false, description: 'Post-support feedback request' },
    ],
    newsletters: [
      { id: '1', name: 'Monthly Newsletter', isDefault: true, description: 'Monthly company newsletter' },
      { id: '2', name: 'Product Update', isDefault: false, description: 'New product/feature announcement' },
      { id: '3', name: 'Event Invitation', isDefault: false, description: 'Company event invitation' },
      { id: '4', name: 'Welcome Series', isDefault: false, description: 'New subscriber welcome series' },
    ]
  };

  const contractTemplates = [
    { id: '1', name: 'Service Agreement', isDefault: true, description: 'Standard service contract' },
    { id: '2', name: 'NDA Template', isDefault: false, description: 'Non-disclosure agreement' },
    { id: '3', name: 'Consulting Contract', isDefault: false, description: 'Professional consulting agreement' },
  ];

  const getTemplatesByCategory = (category: string) => {
    switch (category) {
      case 'emails':
        return moduleTemplates[selectedModule] || [];
      case 'contracts':
        return contractTemplates;
      default:
        return [];
    }
  };

  const getTranslationStatus = (templateId: string) => {
    const translations = templateTranslations[templateId] || {};
    const translatedLanguages = availableLanguages.filter(lang => translations[lang.code]);
    const untranslatedLanguages = availableLanguages.filter(lang => !translations[lang.code]);
    
    return {
      translatedLanguages,
      untranslatedLanguages,
      isFullyTranslated: untranslatedLanguages.length === 0
    };
  };

  const getTotalUntranslatedCount = () => {
    const templates = getTemplatesByCategory(activeCategory);
    return templates.reduce((count, template) => {
      const status = getTranslationStatus(template.id);
      return count + (status.isFullyTranslated ? 0 : 1);
    }, 0);
  };

  const getFilteredTemplates = () => {
    const templates = getTemplatesByCategory(activeCategory);
    if (!showUntranslatedOnly) return templates;
    
    return templates.filter(template => {
      const status = getTranslationStatus(template.id);
      return !status.isFullyTranslated;
    });
  };

  const moduleOptions = [
    { value: 'crm', label: 'CRM' },
    { value: 'invoice', label: 'Invoice' },
    { value: 'subscription', label: 'Subscriptions' },
    { value: 'booking', label: 'Booking' },
    { value: 'tasks', label: 'Tasks' },
    { value: 'support', label: 'Support' },
    { value: 'newsletters', label: 'Newsletters' },
  ];

  const handleDuplicate = (template: any) => {
    const duplicatedTemplate = {
      ...template,
      id: `${template.id}_copy_${Date.now()}`, // Generate unique ID
      name: `${template.name} (Copy)`,
      isDefault: false // Duplicated templates are never default
    };
    
    console.log('Duplicating template:', duplicatedTemplate);
    setEditingTemplate(duplicatedTemplate);
  };

  const TranslationSummaryCard = () => {
    const untranslatedCount = getTotalUntranslatedCount();
    
    return (
      <Card 
        className={`cursor-pointer transition-all hover:shadow-md ${showUntranslatedOnly ? 'ring-2 ring-orange-500 bg-orange-50' : 'hover:border-orange-300'}`}
        onClick={() => setShowUntranslatedOnly(!showUntranslatedOnly)}
      >
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <AlertCircle className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Translation Status</h3>
                <p className="text-sm text-gray-600">
                  {untranslatedCount} template{untranslatedCount !== 1 ? 's' : ''} need{untranslatedCount === 1 ? 's' : ''} translation
                </p>
              </div>
            </div>
            <Badge 
              variant={untranslatedCount > 0 ? "destructive" : "default"}
              className={untranslatedCount > 0 ? "bg-orange-100 text-orange-700" : "bg-green-100 text-green-700"}
            >
              {untranslatedCount > 0 ? `${untranslatedCount} pending` : 'Complete'}
            </Badge>
          </div>
          <div className="mt-3 text-xs text-gray-500">
            {showUntranslatedOnly ? 'Showing untranslated templates only' : 'Click to filter untranslated templates'}
          </div>
        </CardContent>
      </Card>
    );
  };

  const TemplateCard = ({ template }: { template: any }) => {
    const { translatedLanguages, untranslatedLanguages, isFullyTranslated } = getTranslationStatus(template.id);
    
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-semibold text-lg">{template.name}</h3>
              <p className="text-sm text-gray-600">{template.description}</p>
            </div>
            {template.isDefault && (
              <Badge className="bg-green-100 text-green-700">Default</Badge>
            )}
          </div>
          
          {/* Translation Status */}
          <div className="mb-3">
            <div className="flex items-center gap-2 mb-2">
              <Globe className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Translation Status</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {translatedLanguages.map(lang => (
                <Badge key={lang.code} className="bg-green-100 text-green-700 text-xs">
                  {lang.name}
                </Badge>
              ))}
              {untranslatedLanguages.map(lang => (
                <Badge key={lang.code} variant="destructive" className="bg-red-100 text-red-700 text-xs">
                  {lang.name}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-1" />
              Preview
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setEditingTemplate(template)}
            >
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleDuplicate(template)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Duplicate
            </Button>
          </div>
        </CardContent>
      </Card>
    );
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Templates</h2>
          <p className="text-gray-600">Manage email and contract templates</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Template
        </Button>
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
            <div className="flex items-center gap-4 mb-4">
              <label className="text-sm font-medium text-gray-700">Select Module:</label>
              <Select value={selectedModule} onValueChange={setSelectedModule}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Choose module" />
                </SelectTrigger>
                <SelectContent>
                  {moduleOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {showUntranslatedOnly && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowUntranslatedOnly(false)}
                >
                  Show All Templates
                </Button>
              )}
            </div>
            
            {/* Translation Summary Card */}
            <TranslationSummaryCard />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getFilteredTemplates().map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>

          {getFilteredTemplates().length === 0 && showUntranslatedOnly && (
            <div className="text-center py-8 text-gray-500">
              <Globe className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>All templates are fully translated!</p>
              <p className="text-sm">Great job on keeping your translations up to date.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="contracts" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getTemplatesByCategory('contracts').map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        </TabsContent>

        {templateCategories.map((category) => (
          <TabsContent key={category.id} value={category.id}>
            {getTemplatesByCategory(category.id).length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <category.icon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No templates found for this category</p>
                <p className="text-sm">Create your first template to get started</p>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Templates;
