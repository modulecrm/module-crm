
import React from 'react';
import ModuleCard from './ModuleCard';

interface ModuleGridProps {
  title: string;
  description?: string;
  modules: any[];
  enabledModules: string[];
  onModuleToggle: (module: any) => void;
}

const ModuleGrid = ({ title, description, modules, enabledModules, onModuleToggle }: ModuleGridProps) => {
  return (
    <div className="mb-12">
      <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
      {description && <p className="text-gray-600 mb-6">{description}</p>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => (
          <ModuleCard
            key={module.id}
            module={module}
            isEnabled={enabledModules.includes(module.id)}
            onToggle={onModuleToggle}
          />
        ))}
      </div>
    </div>
  );
};

export default ModuleGrid;
