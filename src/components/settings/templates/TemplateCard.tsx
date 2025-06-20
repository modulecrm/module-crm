
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Eye, Copy, Globe } from 'lucide-react';
import { Template, TranslationStatus } from './types';

interface TemplateCardProps {
  template: Template;
  translationStatus: TranslationStatus;
  onEdit: (template: Template) => void;
  onDuplicate: (template: Template) => void;
}

const TemplateCard = ({ template, translationStatus, onEdit, onDuplicate }: TemplateCardProps) => {
  const { translatedLanguages, untranslatedLanguages } = translationStatus;

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
            onClick={() => onEdit(template)}
          >
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onDuplicate(template)}
          >
            <Copy className="h-4 w-4 mr-1" />
            Duplicate
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TemplateCard;
