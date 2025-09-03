import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

export class NotificationPermissions {
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
          console.log('❌ [NotificationPermissions] Failed to get push token for push notification!');
          return false;
        }
        
        return true;
      } catch (error) {
        console.error('❌ [NotificationPermissions] Permission request failed:', error);
        return false;
      }
    } else {
      console.log('📱 [NotificationPermissions] Must use physical device for Push Notifications');
      return false;
    }
  }
}
