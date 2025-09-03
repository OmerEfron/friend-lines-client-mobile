import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';

export class NotificationTokens {
  async getExpoPushToken(): Promise<string | null> {
    try {
      const token = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig?.extra?.eas?.projectId || 'friend-lines-mobile',
      });
      console.log('🔑 [NotificationTokens] Expo push token obtained successfully');
      return token.data;
    } catch (error) {
      console.error('❌ [NotificationTokens] Error getting Expo push token:', error);
      return null;
    }
  }

  async getFCMToken(): Promise<string | null> {
    try {
      if (Device.isDevice) {
        try {
          const messaging = require('@react-native-firebase/messaging').default;
          const token = await messaging().getToken();
          console.log('🔑 [NotificationTokens] Native FCM token obtained successfully');
          return token;
        } catch (firebaseError) {
          console.log('⚠️ [NotificationTokens] Firebase token failed, falling back to Expo token');
          return await this.getExpoPushToken();
        }
      } else {
        return await this.getExpoPushToken();
      }
    } catch (error) {
      console.error('❌ [NotificationTokens] Error getting FCM token:', error);
      return null;
    }
  }

  async getDeviceToken(): Promise<string | null> {
    try {
      if (!Device.isDevice) {
        console.log('📱 [NotificationTokens] Not a physical device, skipping token');
        return null;
      }

      console.log('🔑 [NotificationTokens] Getting FCM token for dev build...');
      const token = await this.getFCMToken();
      
      if (token) {
        console.log('✅ [NotificationTokens] Token obtained successfully');
        return token;
      }

      console.log('❌ [NotificationTokens] Failed to get any device token');
      return null;
    } catch (error) {
      console.error('❌ [NotificationTokens] Failed to get device token:', error);
      return null;
    }
  }
}
