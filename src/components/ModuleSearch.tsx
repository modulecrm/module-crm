
import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';

interface Module {
  id: string;
  name: string;
  category: 'Core' | 'Industry-Specific';
}

interface ModuleSearchProps {
  onModuleSelect: (moduleId: string) => void;
}

const allModules: Module[] = [
  { id: 'crm', name: 'CRM Core Module', category: 'Core' },
  { id: 'invoices', name: 'Invoice Management', category: 'Core' },
  { id: 'subscription', name: 'Subscription Management', category: 'Core' },
  { id: 'booking', name: 'Booking Management', category: 'Core' },
  { id: 'tasks', name: 'Task Management', category: 'Core' },
  { id: 'projects', name: 'Project Management', category: 'Core' },
  { id: 'newsletters', name: 'Newsletters', category: 'Core' },
  { id: 'support', name: 'Support System', category: 'Core' },
  { id: 'coworking', name: 'Coworking Space Module', category: 'Industry-Specific' },
  { id: 'gym', name: 'Fitness & Gym Module', category: 'Industry-Specific' }
];

const ModuleSearch = ({ onModuleSelect }: ModuleSearchProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredModules, setFilteredModules] = useState<Module[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (searchTerm.length >= 3) {
      const filtered = allModules.filter(module =>
        module.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredModules(filtered);
      setShowSuggestions(true);
    } else {
      setFilteredModules([]);
      setShowSuggestions(false);
    }
  }, [searchTerm]);

  const handleModuleSelect = (moduleId: string) => {
    onModuleSelect(moduleId);
    setSearchTerm('');
    setShowSuggestions(false);
  };

  return (
    <div className="relative mb-8">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Search modules (type 3+ characters)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
        />
      </div>
      
      {showSuggestions && filteredModules.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-50 bg-white border border-gray-200 rounded-lg shadow-lg mt-1">
          <Command>
            <CommandList className="max-h-60">
              <CommandGroup>
                {filteredModules.map((module) => (
                  <CommandItem
                    key={module.id}
                    onSelect={() => handleModuleSelect(module.id)}
                    className="cursor-pointer hover:bg-gray-50 px-4 py-3"
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="font-medium">{module.name}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        module.category === 'Core' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        {module.category}
                      </span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
              {filteredModules.length === 0 && (
                <CommandEmpty>No modules found.</CommandEmpty>
              )}
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  );
};

export default ModuleSearch;
