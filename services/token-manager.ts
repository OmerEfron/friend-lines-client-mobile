import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthAPI } from './auth-api';
import { User } from './users-api';

const ACCESS_TOKEN_KEY = 'accessToken';
const USER_KEY = 'user';

export class TokenManager {
  private static refreshPromise: Promise<string> | null = null;

  static async getAccessToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
    } catch (error) {
      console.error('💥 [TokenManager] Error getting access token:', error);
      return null;
    }
  }

  static async setAccessToken(token: string): Promise<void> {
    try {
      await AsyncStorage.setItem(ACCESS_TOKEN_KEY, token);
      console.log('🔑 [TokenManager] Access token saved');
    } catch (error) {
      console.error('💥 [TokenManager] Error saving access token:', error);
    }
  }

  static async getUser(): Promise<User | null> {
    try {
      const userData = await AsyncStorage.getItem(USER_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('💥 [TokenManager] Error getting user:', error);
      return null;
    }
  }

  static async setUser(user: User): Promise<void> {
    try {
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
      console.log('👤 [TokenManager] User saved');
    } catch (error) {
      console.error('💥 [TokenManager] Error saving user:', error);
    }
  }

  static async clearTokens(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([ACCESS_TOKEN_KEY, USER_KEY]);
      console.log('🗑️ [TokenManager] Tokens cleared');
    } catch (error) {
      console.error('💥 [TokenManager] Error clearing tokens:', error);
    }
  }

  static async refreshAccessToken(): Promise<string> {
    // Prevent multiple simultaneous refresh attempts
    if (this.refreshPromise) {
      console.log('🔄 [TokenManager] Refresh already in progress, waiting...');
      return this.refreshPromise;
    }

    this.refreshPromise = this.performRefresh();
    
    try {
      const newToken = await this.refreshPromise;
      return newToken;
    } finally {
      this.refreshPromise = null;
    }
  }

  private static async performRefresh(): Promise<string> {
    try {
      console.log('🔄 [TokenManager] Performing token refresh...');
      const response = await AuthAPI.refreshToken();
      
      await this.setAccessToken(response.data.accessToken);
      await this.setUser(response.data.user);
      
      console.log('✅ [TokenManager] Token refreshed successfully');
      return response.data.accessToken;
    } catch (error) {
      console.error('💥 [TokenManager] Token refresh failed:', error);
      await this.clearTokens();
      throw error;
    }
  }

  static async getValidToken(): Promise<string | null> {
    const currentToken = await this.getAccessToken();
    
    if (!currentToken) {
      console.log('❌ [TokenManager] No access token found');
      return null;
    }

    try {
      // Try to refresh the token to ensure it's valid
      return await this.refreshAccessToken();
    } catch (error) {
      console.error('💥 [TokenManager] Failed to get valid token:', error);
      return null;
    }
  }
}
