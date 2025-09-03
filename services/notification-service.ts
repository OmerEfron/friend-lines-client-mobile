import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import { NotificationsAPI } from './notifications-api';

export class NotificationService {
  constructor() {
    this.setupNotificationHandler();
  }

  setupNotificationHandler() {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
      }),
    });
  }

  async requestPermissions(): Promise<boolean> {
    if (Device.isDevice) {
      try {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        
        if (finalStatus !== 'granted') {
          console.log('❌ [NotificationService] Failed to get push token for push notification!');
          return false;
        }
        
        return true;
      } catch (error) {
        console.error('❌ [NotificationService] Permission request failed:', error);
        return false;
      }
    } else {
      console.log('📱 [NotificationService] Must use physical device for Push Notifications');
      return false;
    }
  }

  async getExpoPushToken(): Promise<string | null> {
    try {
      const token = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig?.extra?.eas?.projectId || 'friend-lines-mobile',
      });
      console.log('🔑 [NotificationService] Expo push token obtained successfully');
      return token.data;
    } catch (error) {
      console.error('❌ [NotificationService] Error getting Expo push token:', error);
      return null;
    }
  }

  async getFCMToken(): Promise<string | null> {
    try {
      // For dev builds with Firebase, try to get native FCM token first
      if (Device.isDevice) {
        try {
          // Import Firebase messaging dynamically to avoid build issues
          const messaging = require('@react-native-firebase/messaging').default;
          const token = await messaging().getToken();
          console.log('🔑 [NotificationService] Native FCM token obtained successfully');
          return token;
        } catch (firebaseError) {
          console.log('⚠️ [NotificationService] Firebase token failed, falling back to Expo token');
          // Fallback to Expo token
          return await this.getExpoPushToken();
        }
      } else {
        // For simulator, use Expo token
        return await this.getExpoPushToken();
      }
    } catch (error) {
      console.error('❌ [NotificationService] Error getting FCM token:', error);
      return null;
    }
  }

  async getDeviceToken(): Promise<string | null> {
    try {
      if (!Device.isDevice) {
        console.log('📱 [NotificationService] Not a physical device, skipping token');
        return null;
      }

      // Try to get FCM token first, fallback to Expo token
      console.log('🔑 [NotificationService] Getting FCM token for dev build...');
      const token = await this.getFCMToken();
      
      if (token) {
        console.log('✅ [NotificationService] Token obtained successfully');
        return token;
      }

      console.log('❌ [NotificationService] Failed to get any device token');
      return null;
    } catch (error) {
      console.error('❌ [NotificationService] Failed to get device token:', error);
      return null;
    }
  }

  async registerDeviceWithServer(deviceToken: string): Promise<boolean> {
    try {
      console.log('📡 [NotificationService] Registering device with Friend Lines API...');
      
      // Determine platform based on Device.osName
      const platform = Device.osName === 'Android' ? 'android' : 
                      Device.osName === 'iOS' ? 'ios' : 'web';
      
      console.log('📱 [NotificationService] Detected platform:', platform);
      
      const response = await NotificationsAPI.registerDevice({
        deviceToken,
        platform
      });

      if (response.success) {
        console.log('✅ [NotificationService] Device registered successfully with API');
        return true;
      } else {
        console.log('❌ [NotificationService] API registration failed');
        return false;
      }
    } catch (error) {
      console.error('❌ [NotificationService] Device registration error:', error);
      return false;
    }
  }

  async scheduleTestNotification() {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Friend Lines",
          body: "Welcome to Friend Lines! 🎉",
          data: { type: 'test' },
        },
        trigger: { seconds: 2 } as any, // Using type assertion for compatibility
      });
      console.log('✅ [NotificationService] Test notification scheduled');
    } catch (error) {
      console.error('❌ [NotificationService] Failed to schedule test notification:', error);
    }
  }

  // Method to handle incoming notifications
  async handleNotificationReceived(notification: any) {
    console.log('🔔 [NotificationService] Notification received:', notification);
    console.log('📱 [NotificationService] Notification details:', {
      title: notification.request.content.title,
      body: notification.request.content.body,
      data: notification.request.content.data,
      trigger: notification.request.trigger,
      date: notification.date
    });
    
    const data = notification.request.content.data;
    
    // Handle different notification types as per your server guide
    switch (data?.type) {
      case 'newsflash':
        console.log('📰 [NotificationService] Newsflash notification:', data);
        // Navigate to newsflash detail
        break;
      case 'friend_request':
        console.log('👥 [NotificationService] Friend request notification:', data);
        // Navigate to friends screen
        break;
      case 'group_invitation':
        console.log('🏷️ [NotificationService] Group invitation notification:', data);
        // Navigate to groups screen
        break;
      default:
        console.log('❓ [NotificationService] Unknown notification type:', data?.type);
    }
  }

  // Method to handle notification responses (user taps)
  async handleNotificationResponse(response: any) {
    console.log('👆 [NotificationService] Notification response:', response);
    
    const data = response.notification.request.content.data;
    
    // Handle navigation based on notification data
    switch (data?.type) {
      case 'newsflash':
        console.log('📰 [NotificationService] Navigating to newsflash:', data.newsflashId);
        // navigation.navigate('NewsflashDetail', { id: data.newsflashId });
        break;
      case 'friend_request':
        console.log('👥 [NotificationService] Navigating to friends screen');
        // navigation.navigate('Friends');
        break;
      case 'group_invitation':
        console.log('🏷️ [NotificationService] Navigating to groups screen');
        // navigation.navigate('Groups');
        break;
      default:
        console.log('❓ [NotificationService] Unknown notification response type:', data?.type);
    }
  }
}
