import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContextType, User, LoginCredentials, RegisterCredentials } from '../types/auth';
import { AuthAPI, UsersAPI } from '../services';

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
      // Map the types correctly - our LoginCredentials uses email, but API expects username
      const response = await AuthAPI.login({
        username: credentials.email, // Use email as username for the API
        password: credentials.password
      });
      console.log('✅ [AuthContext] Login API successful, setting user');
      
      // Ensure user object has required fields
      const userData: User = {
        uuid: response.data.user.uuid || response.data.user.id || response.data.user._id || 'unknown',
        username: response.data.user.username,
        fullName: response.data.user.fullName,
        email: response.data.user.email,
        createdAt: response.data.user.createdAt,
        updatedAt: response.data.user.updatedAt,
        _id: response.data.user._id,
        id: response.data.user.id,
        __v: response.data.user.__v
      };
      
      setUser(userData);
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      await AsyncStorage.setItem('token', response.data.token);
      console.log('💾 [AuthContext] User data saved to storage');
      console.log('🔑 [AuthContext] Token saved:', response.data.token ? 'exists' : 'missing');
      
      // Verify token was saved
      const savedToken = await AsyncStorage.getItem('token');
      console.log('🔍 [AuthContext] Token verification:', savedToken ? 'saved successfully' : 'failed to save');
    } catch (error) {
      console.error('💥 [AuthContext] Login failed:', error);
      throw error;
    }
  }

  async function register(credentials: RegisterCredentials) {
    console.log('🔐 [AuthContext] Register function called');
    try {
      const response = await UsersAPI.register({
        username: credentials.name,
        fullName: credentials.name,
        email: credentials.email,
        password: credentials.password
      });
      console.log('✅ [AuthContext] Register API successful, setting user');
      
      // After successful registration, automatically log the user in
      console.log('🔄 [AuthContext] Auto-login after registration...');
      const loginResponse = await AuthAPI.login({
        username: credentials.email, // Use email as username for login
        password: credentials.password
      });
      
      // Ensure user object has required fields
      const userData: User = {
        uuid: loginResponse.data.user.uuid || loginResponse.data.user.id || loginResponse.data.user._id || 'unknown',
        username: loginResponse.data.user.username,
        fullName: loginResponse.data.user.fullName,
        email: loginResponse.data.user.email,
        createdAt: loginResponse.data.user.createdAt,
        updatedAt: loginResponse.data.user.updatedAt,
        _id: loginResponse.data.user._id,
        id: loginResponse.data.user.id,
        __v: loginResponse.data.user.__v
      };
      
      setUser(userData);
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      await AsyncStorage.setItem('token', loginResponse.data.token);
      console.log('💾 [AuthContext] User data and token saved to storage');
      console.log('🔑 [AuthContext] Token saved:', loginResponse.data.token ? 'exists' : 'missing');
      
      // Verify token was saved
      const savedToken = await AsyncStorage.getItem('token');
      console.log('🔍 [AuthContext] Token verification:', savedToken ? 'saved successfully' : 'failed to save');
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
