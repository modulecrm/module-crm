
import React from 'react';
import { Check, Users, Calendar, CheckSquare, FolderOpen, Mail, MessageSquare, LifeBuoy, Building2, Zap } from 'lucide-react';

interface ModuleSettingsProps {
  enabledModules: string[];
  onToggleModule: (moduleId: string) => void;
}

const modules = [
  {
    id: 'crm',
    name: 'CRM Grundmodul',
    description: 'Kundestyring, kontakter og salg',
    icon: Users,
    color: 'from-green-400 to-green-600',
    features: ['Kontaktstyring', 'Salgspipeline', 'Kundehistorik']
  },
  {
    id: 'subscription',
    name: 'Subscription Management',
    description: 'Håndter abonnementer og betalinger',
    icon: Building2,
    color: 'from-purple-400 to-purple-600',
    features: ['Abonnementsstyring', 'Fakturering', 'Betalingssporing']
  },
  {
    id: 'booking',
    name: 'Booking Management',
    description: 'Kalender og booking system',
    icon: Calendar,
    color: 'from-orange-400 to-orange-600',
    features: ['Kalenderstyring', 'Ressourcebooking', 'Automatiske påmindelser']
  },
  {
    id: 'tasks',
    name: 'Task Management',
    description: 'Opgave- og projektstyring',
    icon: CheckSquare,
    color: 'from-red-400 to-red-600',
    features: ['Opgavelister', 'Deadlines', 'Statussporing']
  },
  {
    id: 'projects',
    name: 'Project Management',
    description: 'Komplet projektstyring',
    icon: FolderOpen,
    color: 'from-indigo-400 to-indigo-600',
    features: ['Projektplanlægning', 'Teamsamarbejde', 'Tidsregistrering']
  },
  {
    id: 'newsletters',
    name: 'Newsletters',
    description: 'Email marketing og nyhedsbreve',
    icon: Mail,
    color: 'from-pink-400 to-pink-600',
    features: ['Email kampagner', 'Segmentering', 'Analytics']
  },
  {
    id: 'support',
    name: 'Support System',
    description: 'Kundesupport og ticket system',
    icon: LifeBuoy,
    color: 'from-teal-400 to-teal-600',
    features: ['Ticket system', 'Vidensbase', 'Live chat']
  }
];

const branchModules = [
  {
    id: 'coworking',
    name: 'Coworking Specialmodul',
    description: 'Optimeret til coworking spaces',
    icon: Building2,
    color: 'from-blue-400 to-blue-600',
    features: ['Deskbooking', 'Medlemsstyring', 'Adgangskontrol'],
    premium: true
  },
  {
    id: 'gym',
    name: 'Fitness & Gym Modul',
    description: 'Specialmodul til fitnesscentre',
    icon: Zap,
    color: 'from-yellow-400 to-yellow-600',
    features: ['Medlemskaber', 'Klassetilmeldinger', 'PT booking'],
    premium: true
  }
];

const ModuleSettings = ({ enabledModules, onToggleModule }: ModuleSettingsProps) => {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Modulindstillinger</h1>
        <p className="text-gray-600 mt-2">Aktivér eller deaktivér moduler efter dit behov</p>
      </div>

      {/* Core Modules */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Grundmoduler</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => {
            const isEnabled = enabledModules.includes(module.id);
            const Icon = module.icon;
            
            return (
              <div key={module.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200">
                <div className={`h-2 bg-gradient-to-r ${module.color}`}></div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${module.color}`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <button
                      onClick={() => onToggleModule(module.id)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                        isEnabled ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          isEnabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{module.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{module.description}</p>
                  
                  <ul className="space-y-2">
                    {module.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Branch-specific Modules */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Branchespecifikke Moduler</h2>
        <p className="text-gray-600 mb-6">Specialmoduler optimeret til specifikke brancher</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {branchModules.map((module) => {
            const isEnabled = enabledModules.includes(module.id);
            const Icon = module.icon;
            
            return (
              <div key={module.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200 relative">
                {module.premium && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-gold-400 to-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    PREMIUM
                  </div>
                )}
                <div className={`h-2 bg-gradient-to-r ${module.color}`}></div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${module.color}`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <button
                      onClick={() => onToggleModule(module.id)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                        isEnabled ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          isEnabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{module.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{module.description}</p>
                  
                  <ul className="space-y-2">
                    {module.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ModuleSettings;
