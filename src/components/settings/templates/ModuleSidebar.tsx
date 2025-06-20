
import React from 'react';
import { Filter } from 'lucide-react';
import { ModuleOption } from './types';

interface ModuleSidebarProps {
  moduleOptions: ModuleOption[];
  selectedModule: string;
  onModuleChange: (moduleId: string) => void;
}

const ModuleSidebar = ({ moduleOptions, selectedModule, onModuleChange }: ModuleSidebarProps) => {
  return (
    <div className="w-1/5 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter by Module
          </h2>
          <p className="text-sm text-gray-600">
            Select a module to manage its templates
          </p>
        </div>

        <div className="space-y-2">
          {moduleOptions.map((module) => {
            const Icon = module.icon;
            return (
              <button
                key={module.id}
                onClick={() => onModuleChange(module.id)}
                className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                  selectedModule === module.id
                    ? 'bg-blue-50 border-blue-200 border'
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-md bg-gradient-to-r ${module.color}`}>
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                  <span className={`text-sm font-medium ${
                    selectedModule === module.id ? 'text-blue-900' : 'text-gray-700'
                  }`}>
                    {module.name}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ModuleSidebar;
