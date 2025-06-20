
import { Customer } from './types';

export const sampleCustomers: Customer[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'kontakt@flexum.dk',
    phone: '123-456-7890',
    company: 'Acme Corp',
    status: 'active',
    lead_score: 75,
    tags: ['premium', 'tech'],
    industry: 'Technology',
    created_at: '2024-01-20T12:00:00Z',
    custom_fields: {
      customer_type: 'business',
      sales_rep: 'Alice Smith'
    },
    address: {
      country: 'USA',
      city: 'New York'
    }
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'kontakt@flexum.dk',
    phone: '987-654-3210',
    company: 'Beta Inc',
    status: 'inactive',
    lead_score: 90,
    tags: ['vip', 'marketing'],
    industry: 'Marketing',
    created_at: '2024-02-15T14:30:00Z',
    custom_fields: {
      customer_type: 'business',
      marketing_channel: 'email'
    },
    address: {
      country: 'Canada',
      city: 'Toronto'
    }
  },
  {
    id: '3',
    name: 'Alice Johnson',
    email: 'kontakt@flexum.dk',
    phone: '555-123-4567',
    company: 'Gamma Co',
    status: 'active',
    lead_score: 60,
    tags: ['new', 'sales'],
    industry: 'Sales',
    created_at: '2024-03-10T10:00:00Z',
    custom_fields: {
      customer_type: 'private',
      last_contact: '2024-03-01'
    },
    address: {
      country: 'UK',
      city: 'London'
    }
  },
  {
    id: '4',
    name: 'Bob Williams',
    email: 'kontakt@flexum.dk',
    phone: '111-222-3333',
    company: 'Delta Ltd',
    status: 'pending',
    lead_score: 45,
    tags: ['trial', 'support'],
    industry: 'Support',
    created_at: '2024-04-05T08:00:00Z',
    custom_fields: {
      customer_type: 'business',
      support_level: 'basic'
    },
    address: {
      country: 'Australia',
      city: 'Sydney'
    }
  },
  {
    id: '5',
    name: 'Eva Brown',
    email: 'kontakt@flexum.dk',
    phone: '444-555-6666',
    company: 'Epsilon Group',
    status: 'active',
    lead_score: 80,
    tags: ['premium', 'tech'],
    industry: 'Technology',
    created_at: '2024-05-01T16:00:00Z',
    custom_fields: {
      customer_type: 'private',
      preferred_language: 'English'
    },
    address: {
      country: 'Germany',
      city: 'Berlin'
    }
  }
];
