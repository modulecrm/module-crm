
import React from 'react';
import { ExternalLink } from 'lucide-react';

interface ModuleCardProps {
  module: {
    id: string;
    name: string;
    icon: React.ComponentType<any>;
    color: string;
    price: string;
    learnMoreUrl: string;
    required?: boolean;
    premium?: boolean;
  };
  isEnabled: boolean;
  onToggle: (module: any) => void;
}

const ModuleCard = ({ module, isEnabled, onToggle }: ModuleCardProps) => {
  const Icon = module.icon;
  
  return (
    <div 
      id={`module-${module.id}`}
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200 relative"
    >
      <div className={`h-2 bg-gradient-to-r ${module.color}`}></div>
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-lg bg-gradient-to-r ${module.color}`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div className="flex items-center gap-2">
            {module.premium && (
              <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                PREMIUM
              </div>
            )}
            {module.required && (
              <div className="bg-gradient-to-r from-red-400 to-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                REQUIRED
              </div>
            )}
            <button
              onClick={() => onToggle(module)}
              disabled={module.required && isEnabled}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                isEnabled ? 'bg-blue-600' : 'bg-gray-200'
              } ${module.required && isEnabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{module.name}</h3>
        
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-gray-900">{module.price}</div>
          <a
            href={module.learnMoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Learn more
            <ExternalLink className="h-4 w-4 ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ModuleCard;
