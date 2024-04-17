export interface User {
  first_name: string;
  last_name: string;
  email: string;
}

export interface UserPayload extends User {
  password: string;
}

export interface UserResponse {
  id: number;
  full_name: string;
  email: string;
  phone?: string;
  avatar_url?: string;
  Company: CompanyResponse;
}

export interface CompanyResponse extends Company {
  name: string;
  primary_email: string;
  address_line_1: string;
  address_city: string;
  address_state: string;
  address_zip: string;
  address_country: string;
}

export interface CompanyPayload extends Company {
  activity: any;
  business_registration: string;
  has_trade_name: string;
}

interface Company {
  legal_name: string;
  business_type: any;
  early_pay_intent: string;
  expected_activity: string;
  industry: any;
  website: string;
  business_number: string;
  phone: string;
}
