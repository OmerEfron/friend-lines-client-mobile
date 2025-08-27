export interface User {
  uuid: string; // Primary identifier as per API docs
  username: string;
  fullName: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
  // MongoDB fields that might be present
  _id?: string;
  id?: string;
  __v?: number;
}

export interface LoginCredentials {
  email: string; // We'll use email as username for login
  password: string;
}

export interface RegisterCredentials {
  name: string; // This will be used for both username and fullName
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
}
