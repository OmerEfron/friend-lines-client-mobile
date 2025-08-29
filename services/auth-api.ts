import { BaseAPI } from './base-api';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    user: {
      uuid: string;
      username: string;
      fullName: string;
      email: string;
      createdAt?: string;
      updatedAt?: string;
      _id?: string;
      id?: string;
      __v?: number;
    };
    token: string;
  };
}

export class AuthAPI extends BaseAPI {
  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    console.log('🔐 [AuthAPI] Attempting login with:', { username: credentials.username });
    
    return this.request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }
}
