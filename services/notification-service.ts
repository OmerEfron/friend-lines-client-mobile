import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { NotificationsAPI } from './notifications-api';

export class NotificationService {
  static async requestPermissions(): Promise<boolean> {
    try {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      
      return finalStatus === 'granted';
    } catch (error) {
      console.error('❌ [NotificationService] Permission request failed:', error);
      return false;
    }
  }

  static async getDeviceToken(): Promise<string | null> {
    try {
      if (!Device.isDevice) {
        console.log('📱 [NotificationService] Not a physical device, skipping token');
        return null;
      }

      const token = await Notifications.getExpoPushTokenAsync({
        projectId: 'friend-lines-mobile' // From your app.json
      });

      console.log('🔑 [NotificationService] Device token obtained:', token.data ? 'success' : 'failed');
      return token.data;
    } catch (error) {
      console.error('❌ [NotificationService] Failed to get device token:', error);
      return null;
    }
  }

  static async registerDeviceWithServer(deviceToken: string, authToken: string): Promise<boolean> {
    try {
      console.log('📡 [NotificationService] Registering device with server...');
      
      const response = await NotificationsAPI.registerDevice({
        deviceToken,
        platform: Device.osInternalBuildId ? 'android' : 'ios'
      }, authToken);

      if (response.success) {
        console.log('✅ [NotificationService] Device registered successfully');
        return true;
      } else {
        console.log('❌ [NotificationService] Server registration failed');
        return false;
      }
    } catch (error) {
      console.error('❌ [NotificationService] Device registration error:', error);
      return false;
    }
  }

  static async setupNotificationHandler() {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });
  }

  static async scheduleTestNotification() {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Friend Lines",
          body: "Welcome to Friend Lines! 🎉",
        },
        trigger: { seconds: 2 },
      });
      console.log('✅ [NotificationService] Test notification scheduled');
    } catch (error) {
      console.error('❌ [NotificationService] Failed to schedule test notification:', error);
    }
  }
}
