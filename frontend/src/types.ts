export interface User {
  email: string;
  name: string;
}

export interface Invoice {
  _id: string;
  product_name: string;
  purchase_date: string;
  store_name: string;
  customer_care_number: string;
  price: number;
  category: string;
  subcategory: string;
  warranty_period?: string;
  documents: {
    type: string;
    path: string;
    name: string;
  }[];
  created_at: string;
  updated_at: string;
}

export interface DashboardStats {
  total_invoices: number;
  categories: {
    _id: string;
    count: number;
    total_value: number;
  }[];
  recent_invoices: Invoice[];
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface CategoryMap {
  [key: string]: string[];
}