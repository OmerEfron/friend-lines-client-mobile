import { BaseAPI } from './base-api';
import { User } from './users-api';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    user: User;
    accessToken: string;
  };
}

export interface RefreshResponse {
  success: boolean;
  data: {
    user: User;
    accessToken: string;
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

  static async refreshToken(): Promise<RefreshResponse> {
    console.log('🔄 [AuthAPI] Refreshing access token...');
    
    return this.request<RefreshResponse>('/auth/refresh', {
      method: 'POST',
    });
  }

  static async logout(): Promise<{ success: boolean; message: string }> {
    console.log('🚪 [AuthAPI] Logging out...');
    
    return this.request<{ success: boolean; message: string }>('/auth/logout', {
      method: 'POST',
    });
  }

  static async getCurrentUser(): Promise<{ success: boolean; data: { user: User } }> {
    console.log('👤 [AuthAPI] Getting current user...');
    
    return this.authenticatedRequest<{ success: boolean; data: { user: User } }>('/auth/me', {
      method: 'GET',
    });
  }
}
