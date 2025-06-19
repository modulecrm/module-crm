
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mail, File, Plus, Edit, Eye, Copy } from 'lucide-react';

const Templates = () => {
  const [activeCategory, setActiveCategory] = useState('emails');

  const templateCategories = [
    { id: 'emails', name: 'Emails', icon: Mail },
    { id: 'contracts', name: 'Contracts', icon: File },
  ];

  const emailTemplates = [
    { id: '1', name: 'Welcome Email', isDefault: true, description: 'New customer welcome message' },
    { id: '2', name: 'Invoice Reminder', isDefault: false, description: 'Payment reminder email' },
    { id: '3', name: 'Quote Follow-up', isDefault: false, description: 'Follow-up after sending quote' },
  ];

  const contractTemplates = [
    { id: '1', name: 'Service Agreement', isDefault: true, description: 'Standard service contract' },
    { id: '2', name: 'NDA Template', isDefault: false, description: 'Non-disclosure agreement' },
    { id: '3', name: 'Consulting Contract', isDefault: false, description: 'Professional consulting agreement' },
  ];

  const getTemplatesByCategory = (category: string) => {
    switch (category) {
      case 'emails':
        return emailTemplates;
      case 'contracts':
        return contractTemplates;
      default:
        return [];
    }
  };

  const TemplateCard = ({ template }: { template: any }) => (
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
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-1" />
            Preview
          </Button>
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button variant="outline" size="sm">
            <Copy className="h-4 w-4 mr-1" />
            Duplicate
          </Button>
        </div>
      </CardContent>
    </Card>
  );

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

        {templateCategories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getTemplatesByCategory(category.id).map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>
            
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
