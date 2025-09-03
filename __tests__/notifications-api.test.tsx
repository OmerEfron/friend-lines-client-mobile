import { NotificationsAPI } from '../services/notifications-api';

// Mock the BaseAPI
jest.mock('../services/base-api', () => ({
  BaseAPI: {
    authenticatedRequest: jest.fn(),
  },
}));

describe('NotificationsAPI', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

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
