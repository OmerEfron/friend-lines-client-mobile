import { NotificationService } from '../services/notification-service';
import { NotificationsAPI } from '../services/notifications-api';

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

describe('NotificationService - Device Registration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should detect Android platform correctly', async () => {
    const { Device } = require('expo-device');
    Device.osName = 'Android';

    const notificationService = new NotificationService();
    
    const mockRegisterDevice = jest.fn().mockResolvedValue({
      success: true,
      data: { id: 'device-123', platform: 'android' },
    });
    
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
    
    const mockRegisterDevice = jest.fn().mockResolvedValue({
      success: true,
      data: { id: 'device-123', platform: 'ios' },
    });
    
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
    
    const mockRegisterDevice = jest.fn().mockResolvedValue({
      success: true,
      data: { id: 'device-123', platform: 'web' },
    });
    
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
    
    const mockRegisterDevice = jest.fn().mockResolvedValue({
      success: false,
      data: { id: 'device-123', platform: 'android' },
    });
    
    NotificationsAPI.registerDevice = mockRegisterDevice;

    const result = await notificationService.registerDeviceWithServer('test-token');

    expect(result).toBe(false);
  });

  it('should handle registration error gracefully', async () => {
    const notificationService = new NotificationService();
    
    const mockRegisterDevice = jest.fn().mockRejectedValue(new Error('Network error'));
    
    NotificationsAPI.registerDevice = mockRegisterDevice;

    const result = await notificationService.registerDeviceWithServer('test-token');

    expect(result).toBe(false);
  });
});
