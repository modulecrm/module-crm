
import { Customer, CustomView } from './types';

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800';
    case 'inactive':
      return 'bg-red-100 text-red-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getLeadScoreColor = (score: number) => {
  if (score >= 80) return 'text-green-600';
  if (score >= 60) return 'text-yellow-600';
  return 'text-red-600';
};

export const getFieldValue = (customer: Customer, field: string): any => {
  if (field.includes('.')) {
    const [parent, child] = field.split('.');
    return customer[parent as keyof Customer]?.[child as any];
  }
  return customer[field as keyof Customer];
};

export const evaluateCondition = (fieldValue: any, operator: string, value: string): boolean => {
  switch (operator) {
    case 'equals':
      return fieldValue === value;
    case 'not_equals':
      return fieldValue !== value;
    case 'contains':
      return String(fieldValue).toLowerCase().includes(value.toLowerCase());
    case 'greater_than':
      return Number(fieldValue) > Number(value);
    case 'less_than':
      return Number(fieldValue) < Number(value);
    case 'in_last_days':
      const days = Number(value);
      const dateValue = new Date(fieldValue);
      const diff = Date.now() - dateValue.getTime();
      const daysDiff = diff / (1000 * 3600 * 24);
      return daysDiff <= days;
    default:
      return false;
  }
};

export const filterCustomers = (
  customers: Customer[],
  searchTerm: string,
  activeView: string,
  customViews: CustomView[]
): Customer[] => {
  return customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeView === 'all') return matchesSearch;
    
    const view = customViews.find(v => v.id === activeView);
    if (!view) return matchesSearch;
    
    const matchesConditions = view.conditions.every(condition => {
      const fieldValue = getFieldValue(customer, condition.field);
      return evaluateCondition(fieldValue, condition.operator, condition.value);
    });
    
    return matchesSearch && matchesConditions;
  });
};
