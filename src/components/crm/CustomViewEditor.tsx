
import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface Condition {
  id: string;
  field: string;
  operator: string;
  value: string;
}

interface CustomView {
  id: string;
  name: string;
  conditions: Condition[];
}

interface CustomViewEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (view: CustomView) => void;
  existingView?: CustomView;
}

const CustomViewEditor: React.FC<CustomViewEditorProps> = ({
  isOpen,
  onClose,
  onSave,
  existingView
}) => {
  const [viewName, setViewName] = useState(existingView?.name || '');
  const [conditions, setConditions] = useState<Condition[]>(
    existingView?.conditions || [{ id: '1', field: 'status', operator: 'equals', value: '' }]
  );

  const fieldOptions = [
    { value: 'status', label: 'Status' },
    { value: 'lead_score', label: 'Lead Score' },
    { value: 'industry', label: 'Industry' },
    { value: 'custom_fields.customer_type', label: 'Customer Type' },
    { value: 'custom_fields.revenue', label: 'Revenue' },
    { value: 'custom_fields.employees_count', label: 'Employee Count' },
    { value: 'tags', label: 'Tags' },
    { value: 'created_at', label: 'Created Date' }
  ];

  const operatorOptions = [
    { value: 'equals', label: 'Equals' },
    { value: 'not_equals', label: 'Not Equals' },
    { value: 'contains', label: 'Contains' },
    { value: 'greater_than', label: 'Greater Than' },
    { value: 'less_than', label: 'Less Than' },
    { value: 'in_last_days', label: 'In Last X Days' }
  ];

  const addCondition = () => {
    const newCondition: Condition = {
      id: Date.now().toString(),
      field: 'status',
      operator: 'equals',
      value: ''
    };
    setConditions([...conditions, newCondition]);
  };

  const removeCondition = (id: string) => {
    setConditions(conditions.filter(c => c.id !== id));
  };

  const updateCondition = (id: string, field: keyof Condition, value: string) => {
    setConditions(conditions.map(c => 
      c.id === id ? { ...c, [field]: value } : c
    ));
  };

  const handleSave = () => {
    if (!viewName.trim()) return;

    const view: CustomView = {
      id: existingView?.id || Date.now().toString(),
      name: viewName.trim(),
      conditions: conditions.filter(c => c.value.trim() !== '')
    };

    onSave(view);
    onClose();
  };

  const handleClose = () => {
    setViewName(existingView?.name || '');
    setConditions(existingView?.conditions || [{ id: '1', field: 'status', operator: 'equals', value: '' }]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {existingView ? 'Edit Custom View' : 'Create Custom View'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              View Name
            </label>
            <Input
              value={viewName}
              onChange={(e) => setViewName(e.target.value)}
              placeholder="Enter view name..."
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Conditions
              </label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addCondition}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Condition
              </Button>
            </div>

            <div className="space-y-3">
              {conditions.map((condition, index) => (
                <div key={condition.id} className="flex items-center gap-3 p-3 border rounded-lg">
                  {index > 0 && (
                    <span className="text-sm text-gray-500 font-medium">AND</span>
                  )}
                  
                  <select
                    value={condition.field}
                    onChange={(e) => updateCondition(condition.id, 'field', e.target.value)}
                    className="px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  >
                    {fieldOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>

                  <select
                    value={condition.operator}
                    onChange={(e) => updateCondition(condition.id, 'operator', e.target.value)}
                    className="px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  >
                    {operatorOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>

                  <Input
                    value={condition.value}
                    onChange={(e) => updateCondition(condition.id, 'value', e.target.value)}
                    placeholder="Enter value..."
                    className="flex-1"
                  />

                  {conditions.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeCondition(condition.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={!viewName.trim()}>
              {existingView ? 'Update View' : 'Create View'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CustomViewEditor;
