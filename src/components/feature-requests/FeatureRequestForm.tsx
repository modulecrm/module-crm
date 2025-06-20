
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { modules, branchModules } from '../modules/moduleData';

interface FeatureRequestFormProps {
  formData: {
    title: string;
    description: string;
    module: string;
  };
  onFormDataChange: (updates: Partial<{ title: string; description: string; module: string }>) => void;
}

const FeatureRequestForm = ({ formData, onFormDataChange }: FeatureRequestFormProps) => {
  // Combine all modules for selection
  const allModules = [
    { value: 'dashboard', label: 'Dashboard' },
    ...modules.map(m => ({ value: m.id, label: m.name })),
    ...branchModules.map(m => ({ value: m.id, label: m.name })),
  ];

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="title">Feature Title *</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => onFormDataChange({ title: e.target.value })}
          placeholder="Brief description of the feature"
          required
        />
      </div>

      <div>
        <Label htmlFor="module">Module *</Label>
        <Select value={formData.module} onValueChange={(value) => onFormDataChange({ module: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select a module" />
          </SelectTrigger>
          <SelectContent>
            {allModules.map((module) => (
              <SelectItem key={module.value} value={module.value}>
                {module.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => onFormDataChange({ description: e.target.value })}
          placeholder="Detailed description of the feature and why it would be valuable"
          rows={4}
        />
      </div>
    </div>
  );
};

export default FeatureRequestForm;
