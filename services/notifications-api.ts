import { BaseAPI } from './base-api';

export interface RegisterDeviceRequest {
  deviceToken: string;
  platform?: 'ios' | 'android' | 'web';
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
    deviceData: RegisterDeviceRequest
  ): Promise<RegisterDeviceResponse> {
    console.log('📱 [NotificationsAPI] Registering device:', deviceData);
    
    // Prepare request body according to API specification
    const requestBody = {
      deviceToken: deviceData.deviceToken,
      ...(deviceData.platform && { platform: deviceData.platform })
    };
    
    console.log('📤 [NotificationsAPI] Request payload being sent:', {
      endpoint: '/notifications/register',
      method: 'POST',
      body: JSON.stringify(requestBody),
      bodyLength: JSON.stringify(requestBody).length,
      deviceTokenLength: deviceData.deviceToken.length,
      platform: deviceData.platform
    });

    return this.authenticatedRequest<RegisterDeviceResponse>(
      '/notifications/register',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      }
    );
  }
}
