import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NotificationService } from '../services/notification-service';
import { useAuth } from '../contexts/auth-context';

export function useNotifications() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [deviceToken, setDeviceToken] = useState<string | null>(null);
  const { user } = useAuth();
  const [notificationService] = useState(() => new NotificationService());

  const setupNotifications = useCallback(async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      // Request permissions
      const hasPermission = await notificationService.requestPermissions();
      if (!hasPermission) {
        console.log('❌ [useNotifications] Permission denied');
        setIsEnabled(false);
        return;
      }

      // Get device token
      const token = await notificationService.getDeviceToken();
      if (!token) {
        console.log('❌ [useNotifications] Failed to get device token');
        setIsEnabled(false);
        return;
      }

      setDeviceToken(token);
      setIsEnabled(true);
      
      // Register with server
      const authToken = await AsyncStorage.getItem('token');
      if (authToken) {
        await notificationService.registerDeviceWithServer(token, authToken);
      }
      
      console.log('✅ [useNotifications] Notifications setup complete');
    } catch (error) {
      console.error('❌ [useNotifications] Setup failed:', error);
      setIsEnabled(false);
    } finally {
      setIsLoading(false);
    }
  }, [user, notificationService]);

  const testNotification = useCallback(async () => {
    if (!isEnabled) return;
    
    try {
      await notificationService.scheduleTestNotification();
    } catch (error) {
      console.error('❌ [useNotifications] Test notification failed:', error);
    }
  }, [isEnabled, notificationService]);

  useEffect(() => {
    if (user) {
      setupNotifications();
    }
  }, [user, setupNotifications]);

  return {
    isEnabled,
    isLoading,
    deviceToken,
    setupNotifications,
    testNotification,
  };
}
