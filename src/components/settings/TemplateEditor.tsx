
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save, Globe, Wand2, Eye } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface TemplateEditorProps {
  template: {
    id: string;
    name: string;
    description: string;
    isDefault: boolean;
  };
  onBack: () => void;
}

const TemplateEditor = ({ template, onBack }: TemplateEditorProps) => {
  const { availableLanguages } = useLanguage();
  const [activeLanguage, setActiveLanguage] = useState('en');
  const [templateContent, setTemplateContent] = useState({
    en: {
      subject: `Default subject for ${template.name}`,
      content: `<h1>Welcome!</h1>
<p>Dear {{customer_name}},</p>
<p>This is your ${template.name.toLowerCase()} email template.</p>
<p>You can use variables like:</p>
<ul>
  <li>{{customer_name}} - Customer's name</li>
  <li>{{company_name}} - Your company name</li>
  <li>{{date}} - Current date</li>
  <li>{{amount}} - Amount (for invoices)</li>
</ul>
<p>Best regards,<br>{{company_name}}</p>`
    }
  });

  const handleContentChange = (field: 'subject' | 'content', value: string) => {
    setTemplateContent(prev => ({
      ...prev,
      [activeLanguage]: {
        ...prev[activeLanguage],
        [field]: value
      }
    }));
  };

  const handleAutoTranslate = async (targetLanguage: string) => {
    // Mock auto-translation - in a real app, this would call an AI translation service
    const englishContent = templateContent.en;
    if (englishContent) {
      setTemplateContent(prev => ({
        ...prev,
        [targetLanguage]: {
          subject: `[${targetLanguage.toUpperCase()}] ${englishContent.subject}`,
          content: `[Translated to ${targetLanguage}] ${englishContent.content}`
        }
      }));
    }
  };

  const handleSave = () => {
    console.log('Saving template:', template.id, templateContent);
    // In a real app, this would save to backend
    alert('Template saved successfully!');
  };

  const handlePreview = () => {
    const currentContent = templateContent[activeLanguage];
    if (currentContent) {
      // Open preview in new window
      const previewWindow = window.open('', '_blank', 'width=600,height=800');
      if (previewWindow) {
        previewWindow.document.write(`
          <html>
            <head>
              <title>Template Preview - ${template.name}</title>
              <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                .email-preview { max-width: 600px; margin: 0 auto; border: 1px solid #ccc; padding: 20px; }
                .subject { font-weight: bold; margin-bottom: 20px; background: #f5f5f5; padding: 10px; }
              </style>
            </head>
            <body>
              <div class="email-preview">
                <div class="subject">Subject: ${currentContent.subject}</div>
                <div class="content">${currentContent.content}</div>
              </div>
            </body>
          </html>
        `);
        previewWindow.document.close();
      }
    }
  };

  const currentContent = templateContent[activeLanguage] || { subject: '', content: '' };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Templates
          </Button>
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              {template.name}
              {template.isDefault && (
                <Badge className="bg-green-100 text-green-700">Default</Badge>
              )}
            </h2>
            <p className="text-gray-600">{template.description}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePreview}>
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Template
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Template Content</CardTitle>
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium">Language:</label>
              <Select value={activeLanguage} onValueChange={setActiveLanguage}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {availableLanguages.map((language) => (
                    <SelectItem key={language.code} value={language.code}>
                      <div className="flex items-center justify-between w-full">
                        <span>{language.name}</span>
                        {!templateContent[language.code] && (
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAutoTranslate(language.code);
                            }}
                            variant="ghost"
                            size="sm"
                            className="ml-2 p-1 h-6 w-6"
                            title={`Auto-translate to ${language.name}`}
                          >
                            <Wand2 className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {activeLanguage !== 'en' && !templateContent[activeLanguage] && (
                <Button
                  onClick={() => handleAutoTranslate(activeLanguage)}
                  variant="outline"
                  size="sm"
                >
                  <Wand2 className="h-4 w-4 mr-2" />
                  Auto Translate
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Subject
            </label>
            <input
              type="text"
              value={currentContent.subject}
              onChange={(e) => handleContentChange('subject', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter email subject..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Content (HTML)
            </label>
            <textarea
              value={currentContent.content}
              onChange={(e) => handleContentChange('content', e.target.value)}
              rows={20}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
              placeholder="Enter email content (HTML supported)..."
            />
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Available Variables:</h4>
            <div className="grid grid-cols-2 gap-2 text-sm text-blue-800">
              <div><code>{'{{customer_name}}'}</code> - Customer's name</div>
              <div><code>{'{{company_name}}'}</code> - Your company name</div>
              <div><code>{'{{date}}'}</code> - Current date</div>
              <div><code>{'{{amount}}'}</code> - Amount (for invoices)</div>
              <div><code>{'{{invoice_number}}'}</code> - Invoice number</div>
              <div><code>{'{{due_date}}'}</code> - Due date</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Translation Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableLanguages.map((language) => (
              <div
                key={language.code}
                className={`p-3 rounded-lg border ${
                  templateContent[language.code] 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{language.name}</span>
                  {templateContent[language.code] ? (
                    <Badge className="bg-green-100 text-green-700">Translated</Badge>
                  ) : (
                    <Badge variant="outline">Missing</Badge>
                  )}
                </div>
                {!templateContent[language.code] && language.code !== 'en' && (
                  <Button
                    onClick={() => handleAutoTranslate(language.code)}
                    variant="ghost"
                    size="sm"
                    className="mt-2 p-0 h-auto text-blue-600 hover:text-blue-700"
                  >
                    <Wand2 className="h-3 w-3 mr-1" />
                    Auto translate
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TemplateEditor;
