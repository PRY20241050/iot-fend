export interface AuthToken {
  access_token?: string;
  refresh_token: string;
  token_type: "Bearer";
}

export interface Token {
  access: string;
  refresh: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  is_active: boolean;
  role?: string;
  is_staff: boolean;
  is_superuser: boolean;
  brickyard?: Brickyard;
  institution?: Institution;
}

export interface Institution {
  id: number;
  name: string;
  address: string;
  phone: number;
  contact: string;
  last_update: string;
  created_at: string;
}

export interface Brickyard extends Institution {
  ruc: string;
}
