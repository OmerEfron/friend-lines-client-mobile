import { LoginCredentials, RegisterCredentials, AuthResponse } from '../types/auth';

const API_BASE_URL = 'http://192.168.1.154:3000/api'; // Updated to match your server structure

export class AuthAPI {
  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    console.log('🔐 [AuthAPI] Attempting login with:', { username: credentials.email }); // Using email as username
    console.log('🌐 [AuthAPI] API URL:', `${API_BASE_URL}/auth/login`);
    
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: credentials.email, // API expects 'username' field
          password: credentials.password
        }),
      });

      console.log('📡 [AuthAPI] Login response status:', response.status);
      console.log('📡 [AuthAPI] Login response headers:', response.headers);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ [AuthAPI] Login failed:', errorText);
        throw new Error(`Login failed: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('✅ [AuthAPI] Login successful:', data);
      
      // Handle server response structure based on API docs
      if (data.success && data.data && data.data.user) {
        return {
          user: data.data.user,
          token: data.data.token || 'dummy-token' // Server should return token
        };
      } else {
        throw new Error('Invalid response format from server');
      }
    } catch (error) {
      console.error('💥 [AuthAPI] Login error:', error);
      throw error;
    }
  }

  static async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    console.log('🔐 [AuthAPI] Attempting registration with:', { 
      username: credentials.name, // Using name as username
      fullName: credentials.name, // Using name as fullName
      email: credentials.email 
    });
    console.log('🌐 [AuthAPI] API URL:', `${API_BASE_URL}/users/register`);
    
    try {
      const response = await fetch(`${API_BASE_URL}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: credentials.name, // Server expects 'username'
          fullName: credentials.name, // Server expects 'fullName'
          email: credentials.email,
          password: credentials.password
        }),
      });

      console.log('📡 [AuthAPI] Register response status:', response.status);
      console.log('📡 [AuthAPI] Register response headers:', response.headers);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ [AuthAPI] Registration failed:', errorText);
        throw new Error(`Registration failed: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('✅ [AuthAPI] Registration successful:', data);
      
      // Handle server response structure based on API docs
      if (data.success && data.data && data.data.user) {
        return {
          user: data.data.user,
          token: data.data.token || 'dummy-token' // Server might not return token in registration
        };
      } else {
        throw new Error('Invalid response format from server');
      }
    } catch (error) {
      console.error('💥 [AuthAPI] Registration error:', error);
      throw error;
    }
  }
}
