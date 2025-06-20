
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: string;
  lead_score: number;
  tags: string[];
  industry: string;
  created_at: string;
  custom_fields?: {
    [key: string]: any;
  };
  address?: {
    [key: string]: any;
  };
}

export interface CustomView {
  id: string;
  name: string;
  conditions: Array<{
    field: string;
    operator: string;
    value: string;
  }>;
}
