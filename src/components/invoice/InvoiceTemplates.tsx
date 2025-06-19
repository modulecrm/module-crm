
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Plus, Edit, Eye } from 'lucide-react';

const InvoiceTemplates = () => {
  const templates = [
    {
      id: '1',
      name: 'Default Template',
      isDefault: true,
      preview: '/api/placeholder/300/400',
      colors: { primary: '#3B82F6', secondary: '#6B7280' }
    },
    {
      id: '2',
      name: 'Modern Blue',
      isDefault: false,
      preview: '/api/placeholder/300/400',
      colors: { primary: '#1E40AF', secondary: '#3B82F6' }
    },
    {
      id: '3',
      name: 'Clean Minimal',
      isDefault: false,
      preview: '/api/placeholder/300/400',
      colors: { primary: '#059669', secondary: '#10B981' }
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Invoice Templates</h2>
          <p className="text-gray-600">Customize your invoice appearance with professional templates</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Template
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <Card key={template.id} className="overflow-hidden">
            <div className="relative">
              <div className="aspect-[3/4] bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <FileText className="h-16 w-16 text-gray-400" />
              </div>
              {template.isDefault && (
                <Badge className="absolute top-2 right-2 bg-green-100 text-green-700">
                  Default
                </Badge>
              )}
            </div>
            
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold">{template.name}</h3>
                <div className="flex gap-1">
                  <div 
                    className="w-4 h-4 rounded-full border"
                    style={{ backgroundColor: template.colors.primary }}
                  />
                  <div 
                    className="w-4 h-4 rounded-full border"
                    style={{ backgroundColor: template.colors.secondary }}
                  />
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="h-4 w-4 mr-1" />
                  Preview
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Template customization section */}
      <Card>
        <CardHeader>
          <CardTitle>Template Customization</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="font-semibold">Branding Options</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Upload company logo</li>
                <li>• Custom color schemes</li>
                <li>• Font selection</li>
                <li>• Header and footer customization</li>
                <li>• Contact information placement</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold">Localization</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Multi-language support</li>
                <li>• Date format customization</li>
                <li>• Number format settings</li>
                <li>• Tax ID layouts</li>
                <li>• Legal disclaimers</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvoiceTemplates;
