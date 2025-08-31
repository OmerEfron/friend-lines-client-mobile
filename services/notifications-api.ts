import { BaseAPI } from './base-api';

export interface RegisterDeviceRequest {
  deviceToken: string;
  platform: 'ios' | 'android' | 'web';
}

export interface RegisterDeviceResponse {
  success: boolean;
  data: {
    id: string;
    platform: string;
  };
}

export class NotificationsAPI extends BaseAPI {
  static async registerDevice(
    deviceData: RegisterDeviceRequest,
    token: string
  ): Promise<RegisterDeviceResponse> {
    console.log('📱 [NotificationsAPI] Registering device:', deviceData);
    console.log('📤 [NotificationsAPI] Request payload being sent:', {
      endpoint: '/notifications/register-device',
      method: 'POST',
      body: JSON.stringify(deviceData),
      bodyLength: JSON.stringify(deviceData).length,
      deviceTokenLength: deviceData.deviceToken.length,
      platform: deviceData.platform
    });

    return this.authenticatedRequest<RegisterDeviceResponse>(
      '/notifications/register-device',
      token,
      {
        method: 'POST',
        body: JSON.stringify(deviceData),
      }
    );
  }
}
