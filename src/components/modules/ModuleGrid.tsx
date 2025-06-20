
import React from 'react';
import ModuleCard from './ModuleCard';

interface ModuleGridProps {
  title: string;
  description?: string;
  modules: any[];
  enabledModules: string[];
  onModuleToggle: (module: any) => void;
  showFeatureRequests?: boolean;
}

const ModuleGrid = ({ 
  title, 
  description, 
  modules, 
  enabledModules, 
  onModuleToggle,
  showFeatureRequests = false 
}: ModuleGridProps) => {
  return (
    <div className="mb-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        {description && (
          <p className="text-gray-600 mt-2">{description}</p>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {modules.map((module) => (
          <ModuleCard
            key={module.id}
            module={module}
            isEnabled={enabledModules.includes(module.id)}
            onToggle={() => onModuleToggle(module)}
            showFeatureRequests={showFeatureRequests}
          />
        ))}
      </div>
    </div>
  );
};

export default ModuleGrid;
