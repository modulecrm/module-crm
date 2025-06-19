
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { 
  Calculator, 
  CreditCard, 
  Mail, 
  FileText, 
  Users, 
  ShoppingCart, 
  Scale, 
  Brain, 
  BarChart3, 
  Building2,
  Settings,
  ExternalLink,
  CheckCircle,
  Clock
} from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  description: string;
  status: 'connected' | 'available' | 'coming-soon';
  category: string;
  setupSteps?: string[];
  requirements?: string[];
}

const integrationCategories = [
  {
    id: 'accounting',
    name: 'Bogføring & Regnskab',
    description: 'Synkronisering af fakturaer, bilag, moms, kontoplan og regnskabsrapporter',
    icon: Calculator,
    color: 'from-blue-500 to-blue-600',
    integrations: [
      { id: 'dinero', name: 'Dinero', description: 'Cloud-based regnskabssystem', status: 'available' as const },
      { id: 'billy', name: 'Billy', description: 'Simpel fakturering og regnskab', status: 'available' as const },
      { id: 'economic', name: 'e-conomic', description: 'Professionelt regnskabssystem', status: 'connected' as const },
      { id: 'fortnox', name: 'Fortnox', description: 'Skandinavisk regnskabsløsning', status: 'available' as const },
      { id: 'xero', name: 'Xero', description: 'International regnskabssoftware', status: 'coming-soon' as const },
      { id: 'quickbooks', name: 'QuickBooks', description: 'Verdens mest brugte regnskabssystem', status: 'available' as const }
    ]
  },
  {
    id: 'payments',
    name: 'Betalingsgateways & POS',
    description: 'Modtag betalinger direkte via CRM, fakturamodul og webshop',
    icon: CreditCard,
    color: 'from-green-500 to-green-600',
    integrations: [
      { id: 'stripe', name: 'Stripe', description: 'Globalt betalingssystem', status: 'connected' as const },
      { id: 'paypal', name: 'PayPal', description: 'Kendt betalingsløsning', status: 'available' as const },
      { id: 'quickpay', name: 'QuickPay', description: 'Dansk betalingsgateway', status: 'available' as const },
      { id: 'mobilepay', name: 'MobilePay', description: 'Mobil betalingsapp', status: 'coming-soon' as const },
      { id: 'klarna', name: 'Klarna', description: 'Køb nu, betal senere', status: 'available' as const },
      { id: 'nets', name: 'Nets', description: 'Nordisk betalingsløsning', status: 'available' as const }
    ]
  },
  {
    id: 'communication',
    name: 'E-mail & Kommunikation',
    description: 'Automatisk udsendelse af fakturaer, påmindelser, og kundeopfølgning',
    icon: Mail,
    color: 'from-purple-500 to-purple-600',
    integrations: [
      { id: 'gmail', name: 'Gmail', description: 'Google e-mail integration', status: 'available' as const },
      { id: 'outlook', name: 'Outlook', description: 'Microsoft e-mail platform', status: 'available' as const },
      { id: 'smtp', name: 'IMAP/SMTP', description: 'Standard e-mail protokoller', status: 'available' as const },
      { id: 'mailgun', name: 'Mailgun', description: 'E-mail API service', status: 'connected' as const },
      { id: 'sendgrid', name: 'SendGrid', description: 'Cloud e-mail delivery', status: 'available' as const },
      { id: 'twilio', name: 'Twilio', description: 'SMS og kommunikation', status: 'available' as const }
    ]
  },
  {
    id: 'documents',
    name: 'Dokumentsignering & Fildeling',
    description: 'Digital underskrift af kontrakter, deling af bilag og fakturaer',
    icon: FileText,
    color: 'from-orange-500 to-orange-600',
    integrations: [
      { id: 'docusign', name: 'DocuSign', description: 'Digital signatur platform', status: 'available' as const },
      { id: 'hellosign', name: 'HelloSign', description: 'Simpel e-signatur', status: 'available' as const },
      { id: 'adobe-sign', name: 'Adobe Sign', description: 'Adobe e-signatur løsning', status: 'coming-soon' as const },
      { id: 'dropbox', name: 'Dropbox', description: 'Cloud fil deling', status: 'available' as const },
      { id: 'google-drive', name: 'Google Drive', description: 'Google cloud storage', status: 'connected' as const },
      { id: 'onedrive', name: 'OneDrive', description: 'Microsoft cloud storage', status: 'available' as const }
    ]
  },
  {
    id: 'crm-booking',
    name: 'Booking, CRM & Projekter',
    description: 'Fakturering ud fra bookinger, abonnementsfornyelser, eller milepæle',
    icon: Users,
    color: 'from-teal-500 to-teal-600',
    integrations: [
      { id: 'internal-crm', name: 'Internt CRM-modul', description: 'Indbygget CRM system', status: 'connected' as const },
      { id: 'booking-module', name: 'Booking-modul', description: 'Indbygget booking system', status: 'connected' as const },
      { id: 'project-module', name: 'Project Management-modul', description: 'Indbygget projekt styring', status: 'available' as const },
      { id: 'asana', name: 'Asana', description: 'Team projekt management', status: 'available' as const },
      { id: 'trello', name: 'Trello', description: 'Kanban projekt boards', status: 'available' as const },
      { id: 'clickup', name: 'ClickUp', description: 'Alt-i-en produktivitetsapp', status: 'coming-soon' as const }
    ]
  },
  {
    id: 'ecommerce',
    name: 'Webshop & Fysisk butik (POS)',
    description: 'Automatisk fakturering af salg fra online shop eller kassesystem',
    icon: ShoppingCart,
    color: 'from-pink-500 to-pink-600',
    integrations: [
      { id: 'shopify', name: 'Shopify', description: 'E-commerce platform', status: 'available' as const },
      { id: 'woocommerce', name: 'WooCommerce', description: 'WordPress webshop', status: 'available' as const },
      { id: 'magento', name: 'Magento', description: 'Enterprise e-commerce', status: 'coming-soon' as const },
      { id: 'square', name: 'Square', description: 'POS og betalingssystem', status: 'available' as const },
      { id: 'lightspeed', name: 'Lightspeed', description: 'Retail POS system', status: 'available' as const },
      { id: 'bigcommerce', name: 'BigCommerce', description: 'SaaS e-commerce platform', status: 'available' as const }
    ]
  },
  {
    id: 'compliance',
    name: 'Moms & Compliance',
    description: 'Automatisk håndtering af momssatser og eksport af fakturaer til det offentlige',
    icon: Scale,
    color: 'from-indigo-500 to-indigo-600',
    integrations: [
      { id: 'avalara', name: 'Avalara', description: 'Automatisk momsberegning', status: 'available' as const },
      { id: 'taxjar', name: 'TaxJar', description: 'Salgsmoms automation', status: 'available' as const },
      { id: 'oioubl', name: 'OIOUBL', description: 'Dansk faktura standard', status: 'connected' as const },
      { id: 'peppol', name: 'Peppol', description: 'EU e-faktura netværk', status: 'available' as const },
      { id: 'nemhandel', name: 'NemHandel', description: 'Dansk offentlig handel', status: 'available' as const },
      { id: 'skat-api', name: 'SKAT API', description: 'Integration til Skattestyrelsen', status: 'coming-soon' as const }
    ]
  },
  {
    id: 'ai-automation',
    name: 'AI & Automatisering',
    description: 'Smart prisforslag, automatiske udkast, fejlretning, cash flow forudsigelser',
    icon: Brain,
    color: 'from-violet-500 to-violet-600',
    integrations: [
      { id: 'openai', name: 'OpenAI (ChatGPT/Aiden)', description: 'AI-assisteret indhold', status: 'available' as const },
      { id: 'zapier', name: 'Zapier', description: 'Workflow automation', status: 'available' as const },
      { id: 'make', name: 'Make (Integromat)', description: 'Avanceret automation', status: 'available' as const },
      { id: 'tray', name: 'Tray.io', description: 'Enterprise integration', status: 'coming-soon' as const },
      { id: 'huggingface', name: 'Hugging Face', description: 'Open source AI modeller', status: 'coming-soon' as const }
    ]
  },
  {
    id: 'analytics',
    name: 'Analyse & Rapporter',
    description: 'Visualisering af omsætning, betalingsstatus og kundeperformance',
    icon: BarChart3,
    color: 'from-cyan-500 to-cyan-600',
    integrations: [
      { id: 'looker', name: 'Google Looker Studio', description: 'Gratis data visualisering', status: 'available' as const },
      { id: 'powerbi', name: 'Power BI', description: 'Microsoft business intelligence', status: 'available' as const },
      { id: 'plecto', name: 'Plecto', description: 'Real-time dashboards', status: 'connected' as const },
      { id: 'klipfolio', name: 'Klipfolio', description: 'Cloud dashboards', status: 'available' as const },
      { id: 'tableau', name: 'Tableau', description: 'Avanceret data analyse', status: 'coming-soon' as const },
      { id: 'excel', name: 'Excel', description: 'Microsoft regneark', status: 'available' as const }
    ]
  },
  {
    id: 'erp',
    name: 'ERP & HR-systemer',
    description: 'Integration til ressourceplanlægning, medarbejderfakturering og løn',
    icon: Building2,
    color: 'from-gray-500 to-gray-600',
    integrations: [
      { id: 'sap', name: 'SAP', description: 'Enterprise resource planning', status: 'coming-soon' as const },
      { id: 'netsuite', name: 'NetSuite', description: 'Oracle ERP system', status: 'available' as const },
      { id: 'dynamics', name: 'Microsoft Dynamics', description: 'Microsoft ERP løsning', status: 'available' as const },
      { id: 'erpnext', name: 'ERPNext', description: 'Open source ERP', status: 'available' as const },
      { id: 'visma', name: 'Visma', description: 'Nordisk ERP og løn', status: 'available' as const },
      { id: 'workday', name: 'Workday', description: 'HR og finansiel management', status: 'coming-soon' as const }
    ]
  }
];

const IntegrationsSettings = () => {
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const getStatusBadge = (status: Integration['status']) => {
    switch (status) {
      case 'connected':
        return (
          <Badge className="bg-green-100 text-green-700 flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            Connected
          </Badge>
        );
      case 'available':
        return (
          <Badge variant="secondary" className="flex items-center gap-1">
            <Settings className="h-3 w-3" />
            Available
          </Badge>
        );
      case 'coming-soon':
        return (
          <Badge className="bg-yellow-100 text-yellow-700 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Coming Soon
          </Badge>
        );
    }
  };

  const handleIntegrationClick = (integration: any, category: any) => {
    setSelectedIntegration({
      ...integration,
      category: category.name,
      setupSteps: [
        'Create an account with the service provider',
        'Generate API keys or authentication tokens',
        'Configure webhook endpoints (if required)',
        'Test the connection',
        'Enable sync settings'
      ],
      requirements: [
        'Active account with the service',
        'Administrator access to your account',
        'API access enabled',
        'Valid webhook URL (if applicable)'
      ]
    });
    setSheetOpen(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Integrations</h2>
        <p className="text-gray-600">Connect your CRM with external services to streamline your workflow</p>
      </div>

      <div className="space-y-8">
        {integrationCategories.map((category) => {
          const IconComponent = category.icon;
          return (
            <Card key={category.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${category.color}`}>
                    <IconComponent className="h-5 w-5 text-white" />
                  </div>
                  {category.name}
                </CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.integrations.map((integration) => (
                    <Sheet key={integration.id} open={sheetOpen && selectedIntegration?.id === integration.id} onOpenChange={(open) => {
                      if (!open) {
                        setSheetOpen(false);
                        setSelectedIntegration(null);
                      }
                    }}>
                      <SheetTrigger asChild>
                        <Card 
                          className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-blue-200"
                          onClick={() => handleIntegrationClick(integration, category)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-semibold text-gray-900">{integration.name}</h4>
                              {getStatusBadge(integration.status)}
                            </div>
                            <p className="text-sm text-gray-600 mb-3">{integration.description}</p>
                            <div className="flex items-center text-blue-600 text-sm">
                              <span>Configure</span>
                              <ExternalLink className="h-3 w-3 ml-1" />
                            </div>
                          </CardContent>
                        </Card>
                      </SheetTrigger>
                      
                      <SheetContent className="w-1/2 max-w-none">
                        <SheetHeader>
                          <SheetTitle className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg bg-gradient-to-r ${category.color}`}>
                              <IconComponent className="h-5 w-5 text-white" />
                            </div>
                            {selectedIntegration?.name} Integration
                          </SheetTitle>
                          <SheetDescription>
                            Set up and configure your {selectedIntegration?.name} integration
                          </SheetDescription>
                        </SheetHeader>
                        
                        {selectedIntegration && (
                          <div className="mt-6 space-y-6">
                            <div>
                              <h3 className="text-lg font-semibold mb-2">About this integration</h3>
                              <p className="text-gray-600">{selectedIntegration.description}</p>
                              <div className="mt-2 flex items-center gap-2">
                                <span className="text-sm text-gray-500">Category:</span>
                                <Badge variant="outline">{selectedIntegration.category}</Badge>
                              </div>
                            </div>

                            <div>
                              <h3 className="text-lg font-semibold mb-3">Status</h3>
                              {getStatusBadge(selectedIntegration.status)}
                            </div>

                            {selectedIntegration.status !== 'coming-soon' && (
                              <>
                                <div>
                                  <h3 className="text-lg font-semibold mb-3">Requirements</h3>
                                  <ul className="space-y-2">
                                    {selectedIntegration.requirements?.map((req, index) => (
                                      <li key={index} className="flex items-center gap-2">
                                        <div className="h-2 w-2 bg-blue-500 rounded-full" />
                                        <span className="text-sm text-gray-600">{req}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                <div>
                                  <h3 className="text-lg font-semibold mb-3">Setup Steps</h3>
                                  <ol className="space-y-3">
                                    {selectedIntegration.setupSteps?.map((step, index) => (
                                      <li key={index} className="flex items-start gap-3">
                                        <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                                          {index + 1}
                                        </div>
                                        <span className="text-sm text-gray-600">{step}</span>
                                      </li>
                                    ))}
                                  </ol>
                                </div>

                                <div className="pt-4 border-t">
                                  {selectedIntegration.status === 'connected' ? (
                                    <div className="space-y-3">
                                      <Button variant="outline" className="w-full">
                                        <Settings className="h-4 w-4 mr-2" />
                                        Manage Connection
                                      </Button>
                                      <Button variant="destructive" className="w-full">
                                        Disconnect
                                      </Button>
                                    </div>
                                  ) : (
                                    <Button className="w-full">
                                      <ExternalLink className="h-4 w-4 mr-2" />
                                      Connect {selectedIntegration.name}
                                    </Button>
                                  )}
                                </div>
                              </>
                            )}

                            {selectedIntegration.status === 'coming-soon' && (
                              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                <p className="text-yellow-800 text-sm">
                                  This integration is coming soon. We're working hard to bring you this functionality. 
                                  Stay tuned for updates!
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </SheetContent>
                    </Sheet>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default IntegrationsSettings;
