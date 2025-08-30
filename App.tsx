import React, { useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Notifications from 'expo-notifications';
import { AuthProvider } from './contexts/auth-context';
import { AppNavigator } from './navigation/app-navigator';
import { NotificationService } from './services/notification-service';

export default function App() {
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    initializeNotifications();
    
    // Listen for incoming notifications
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log('🔔 [App] Notification received:', notification);
    });

    // Listen for notification responses (user taps notification)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('👆 [App] Notification response:', response);
      handleNotificationResponse(response);
    });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  const initializeNotifications = async () => {
    const notificationService = new NotificationService();
    
    try {
      console.log('🚀 [App] Initializing notifications...');
      
      // Request permissions
      const hasPermission = await notificationService.requestPermissions();
      
      if (hasPermission) {
        console.log('✅ [App] Notification permissions granted');
        
        // Get device token - Expo will convert to FCM for your server
        const deviceToken = await notificationService.getDeviceToken();
        
        if (deviceToken) {
          console.log('✅ [App] Device token obtained:', deviceToken.substring(0, 20) + '...');
          
          // Note: Device registration will happen in the useNotifications hook
          // when the user logs in and we have the auth token
        } else {
          console.log('❌ [App] Failed to get device token');
        }
      } else {
        console.log('❌ [App] Notification permissions denied');
      }
    } catch (error) {
      console.error('❌ [App] Failed to initialize notifications:', error);
    }
  };

  const handleNotificationResponse = (response: any) => {
    const data = response.notification.request.content.data;
    
    // Handle different notification types as per your server guide
    switch (data?.type) {
      case 'newsflash':
        console.log('📰 [App] Navigating to newsflash:', data.newsflashId);
        // navigation.navigate('NewsflashDetail', { id: data.newsflashId });
        break;
      case 'friend_request':
        console.log('👥 [App] Navigating to friends screen');
        // navigation.navigate('Friends');
        break;
      case 'group_invitation':
        console.log('🏷️ [App] Navigating to groups screen');
        // navigation.navigate('Groups');
        break;
      default:
        console.log('❓ [App] Unknown notification response type:', data?.type);
    }
  };

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <AppNavigator />
        <StatusBar style="auto" />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
