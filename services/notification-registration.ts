import * as Device from 'expo-device';
import { NotificationsAPI } from './notifications-api';

export class NotificationRegistration {
  async registerDeviceWithServer(deviceToken: string): Promise<boolean> {
    try {
      console.log('📡 [NotificationRegistration] Registering device with Friend Lines API...');
      
      const platform = Device.osName === 'Android' ? 'android' : 
                      Device.osName === 'iOS' ? 'ios' : 'web';
      
      console.log('📱 [NotificationRegistration] Detected platform:', platform);
      
      const response = await NotificationsAPI.registerDevice({
        deviceToken,
        platform
      });

      if (response.success) {
        console.log('✅ [NotificationRegistration] Device registered successfully with API');
        return true;
      } else {
        console.log('❌ [NotificationRegistration] API registration failed');
        return false;
      }
    } catch (error) {
      console.error('❌ [NotificationRegistration] Device registration error:', error);
      return false;
    }
  }
}
