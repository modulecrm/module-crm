
export const vatRates = [
  { id: '1', name: 'Standard VAT', rate: 20, isDefault: true },
  { id: '2', name: 'Reduced VAT', rate: 5, isDefault: false },
  { id: '3', name: 'Zero VAT', rate: 0, isDefault: false },
];

export const taxCategories = [
  { id: '1', name: 'Sales Tax', rate: 8.5 },
  { id: '2', name: 'Service Tax', rate: 12 },
  { id: '3', name: 'Import Duty', rate: 15 },
];

export const mockCategories = [
  { id: '1', name: 'Workspace', description: 'Workspace-related products and services', product_count: 12, created_at: '2024-01-15' },
  { id: '2', name: 'Meeting Rooms', description: 'Meeting room rentals and equipment', product_count: 8, created_at: '2024-01-10' },
  { id: '3', name: 'Virtual Services', description: 'Virtual office and digital services', product_count: 6, created_at: '2024-01-20' },
  { id: '4', name: 'Add-ons', description: 'Additional services and products', product_count: 15, created_at: '2024-01-05' },
];
