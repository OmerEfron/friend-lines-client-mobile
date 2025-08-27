import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContextType, User, LoginCredentials, RegisterCredentials } from '../types/auth';
import { AuthAPI } from '../services/auth-api';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('🔄 [AuthContext] Loading stored user data...');
    loadStoredUser();
  }, []);

  async function loadStoredUser() {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      const storedToken = await AsyncStorage.getItem('token');
      
      console.log('💾 [AuthContext] Stored user:', storedUser ? 'exists' : 'none');
      console.log('💾 [AuthContext] Stored token:', storedToken ? 'exists' : 'none');
      
      if (storedUser && storedToken) {
        const userData = JSON.parse(storedUser);
        console.log('👤 [AuthContext] Setting user from storage:', userData.fullName || userData.username);
        setUser(userData);
      }
    } catch (error) {
      console.error('💥 [AuthContext] Error loading stored user:', error);
    } finally {
      setIsLoading(false);
      console.log('✅ [AuthContext] User loading completed');
    }
  }

  async function login(credentials: LoginCredentials) {
    console.log('🔐 [AuthContext] Login function called');
    try {
      const response = await AuthAPI.login(credentials);
      console.log('✅ [AuthContext] Login API successful, setting user');
      
      // Ensure user object has required fields
      const userData: User = {
        uuid: response.user.uuid || response.user.id || response.user._id || 'unknown',
        username: response.user.username,
        fullName: response.user.fullName,
        email: response.user.email,
        createdAt: response.user.createdAt,
        updatedAt: response.user.updatedAt,
        _id: response.user._id,
        id: response.user.id,
        __v: response.user.__v
      };
      
      setUser(userData);
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      await AsyncStorage.setItem('token', response.token);
      console.log('💾 [AuthContext] User data saved to storage');
    } catch (error) {
      console.error('💥 [AuthContext] Login failed:', error);
      throw error;
    }
  }

  async function register(credentials: RegisterCredentials) {
    console.log('🔐 [AuthContext] Register function called');
    try {
      const response = await AuthAPI.register(credentials);
      console.log('✅ [AuthContext] Register API successful, setting user');
      
      // Ensure user object has required fields
      const userData: User = {
        uuid: response.user.uuid || response.user.id || response.user._id || 'unknown',
        username: response.user.username,
        fullName: response.user.fullName,
        email: response.user.email,
        createdAt: response.user.createdAt,
        updatedAt: response.user.updatedAt,
        _id: response.user._id,
        id: response.user.id,
        __v: response.user.__v
      };
      
      setUser(userData);
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      await AsyncStorage.setItem('token', response.token);
      console.log('💾 [AuthContext] User data saved to storage');
    } catch (error) {
      console.error('💥 [AuthContext] Register failed:', error);
      throw error;
    }
  }

  async function logout() {
    console.log('🚪 [AuthContext] Logout function called');
    setUser(null);
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('token');
    console.log('💾 [AuthContext] User data cleared from storage');
  }

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
