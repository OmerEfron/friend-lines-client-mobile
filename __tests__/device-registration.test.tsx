import { NotificationsAPI } from '../services/notifications-api';
import { NotificationService } from '../services/notification-service';

// Mock the BaseAPI
jest.mock('../services/base-api', () => ({
  BaseAPI: {
    authenticatedRequest: jest.fn(),
  },
}));

// Mock expo modules
jest.mock('expo-notifications', () => ({
  setNotificationHandler: jest.fn(),
  getPermissionsAsync: jest.fn(),
  requestPermissionsAsync: jest.fn(),
  getExpoPushTokenAsync: jest.fn(),
  scheduleNotificationAsync: jest.fn(),
}));

jest.mock('expo-device', () => ({
  isDevice: true,
  osName: 'Android',
}));

jest.mock('expo-constants', () => ({
  expoConfig: {
    extra: {
      eas: {
        projectId: 'test-project-id',
      },
    },
  },
}));

describe('Device Registration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('NotificationsAPI', () => {
    it('should register device with correct endpoint and payload', async () => {
      const mockResponse = {
        success: true,
        data: {
          id: 'device-123',
          platform: 'android',
        },
      };

      const { BaseAPI } = require('../services/base-api');
      BaseAPI.authenticatedRequest.mockResolvedValue(mockResponse);

      const deviceData = {
        deviceToken: 'test-device-token-123',
        platform: 'android' as const,
      };

      const result = await NotificationsAPI.registerDevice(deviceData);

      expect(BaseAPI.authenticatedRequest).toHaveBeenCalledWith(
        '/notifications/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            deviceToken: 'test-device-token-123',
            platform: 'android',
          }),
        }
      );

      expect(result).toEqual(mockResponse);
    });

    it('should register device without platform when not provided', async () => {
      const mockResponse = {
        success: true,
        data: {
          id: 'device-123',
          platform: 'android',
        },
      };

      const { BaseAPI } = require('../services/base-api');
      BaseAPI.authenticatedRequest.mockResolvedValue(mockResponse);

      const deviceData = {
        deviceToken: 'test-device-token-123',
      };

      const result = await NotificationsAPI.registerDevice(deviceData);

      expect(BaseAPI.authenticatedRequest).toHaveBeenCalledWith(
        '/notifications/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            deviceToken: 'test-device-token-123',
          }),
        }
      );

      expect(result).toEqual(mockResponse);
    });
  });

  describe('NotificationService', () => {
    it('should detect Android platform correctly', async () => {
      const { Device } = require('expo-device');
      Device.osName = 'Android';

      const notificationService = new NotificationService();
      
      // Mock the NotificationsAPI
      const mockRegisterDevice = jest.fn().mockResolvedValue({
        success: true,
        data: { id: 'device-123', platform: 'android' },
      });
      
      // Replace the static method
      NotificationsAPI.registerDevice = mockRegisterDevice;

      const result = await notificationService.registerDeviceWithServer('test-token');

      expect(mockRegisterDevice).toHaveBeenCalledWith({
        deviceToken: 'test-token',
        platform: 'android',
      });

      expect(result).toBe(true);
    });

    it('should detect iOS platform correctly', async () => {
      const { Device } = require('expo-device');
      Device.osName = 'iOS';

      const notificationService = new NotificationService();
      
      // Mock the NotificationsAPI
      const mockRegisterDevice = jest.fn().mockResolvedValue({
        success: true,
        data: { id: 'device-123', platform: 'ios' },
      });
      
      // Replace the static method
      NotificationsAPI.registerDevice = mockRegisterDevice;

      const result = await notificationService.registerDeviceWithServer('test-token');

      expect(mockRegisterDevice).toHaveBeenCalledWith({
        deviceToken: 'test-token',
        platform: 'ios',
      });

      expect(result).toBe(true);
    });

    it('should default to web platform for unknown OS', async () => {
      const { Device } = require('expo-device');
      Device.osName = 'Unknown';

      const notificationService = new NotificationService();
      
      // Mock the NotificationsAPI
      const mockRegisterDevice = jest.fn().mockResolvedValue({
        success: true,
        data: { id: 'device-123', platform: 'web' },
      });
      
      // Replace the static method
      NotificationsAPI.registerDevice = mockRegisterDevice;

      const result = await notificationService.registerDeviceWithServer('test-token');

      expect(mockRegisterDevice).toHaveBeenCalledWith({
        deviceToken: 'test-token',
        platform: 'web',
      });

      expect(result).toBe(true);
    });

    it('should handle registration failure gracefully', async () => {
      const notificationService = new NotificationService();
      
      // Mock the NotificationsAPI to return failure
      const mockRegisterDevice = jest.fn().mockResolvedValue({
        success: false,
        data: { id: 'device-123', platform: 'android' },
      });
      
      // Replace the static method
      NotificationsAPI.registerDevice = mockRegisterDevice;

      const result = await notificationService.registerDeviceWithServer('test-token');

      expect(result).toBe(false);
    });

    it('should handle registration error gracefully', async () => {
      const notificationService = new NotificationService();
      
      // Mock the NotificationsAPI to throw error
      const mockRegisterDevice = jest.fn().mockRejectedValue(new Error('Network error'));
      
      // Replace the static method
      NotificationsAPI.registerDevice = mockRegisterDevice;

      const result = await notificationService.registerDeviceWithServer('test-token');

      expect(result).toBe(false);
    });
  });
});
