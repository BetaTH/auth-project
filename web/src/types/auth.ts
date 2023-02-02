export interface LoginFormData {
  email: string;
  password: string;
}
export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export interface RegisterResponse {
  id: string;
  name: string;
  email: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
}

export interface JwtUser {
  email: string;
  exp: number;
  iat: number;
  name: string;
  sub: number;
}

export interface AuthProviderProps {
  userData: User | null;
  children: React.ReactNode;
}
