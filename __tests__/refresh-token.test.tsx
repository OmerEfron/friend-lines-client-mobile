import { TokenManager } from '../services/token-manager';
import { AuthAPI } from '../services/auth-api';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  multiRemove: jest.fn(),
}));

// Mock the AuthAPI
jest.mock('../services/auth-api', () => ({
  AuthAPI: {
    refreshToken: jest.fn(),
  },
}));

describe('Refresh Token Implementation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle token refresh successfully', async () => {
    const mockRefreshResponse = {
      success: true,
      data: {
        user: {
          uuid: 'test-uuid',
          username: 'testuser',
          fullName: 'Test User',
          email: 'test@example.com',
        },
        accessToken: 'new-access-token',
      },
    };

    (AuthAPI.refreshToken as jest.Mock).mockResolvedValue(mockRefreshResponse);

    const result = await TokenManager.refreshAccessToken();

    expect(result).toBe('new-access-token');
    expect(AuthAPI.refreshToken).toHaveBeenCalledTimes(1);
  });

  it('should handle token refresh failure', async () => {
    (AuthAPI.refreshToken as jest.Mock).mockRejectedValue(new Error('Refresh failed'));

    await expect(TokenManager.refreshAccessToken()).rejects.toThrow('Refresh failed');
  });

  it('should prevent multiple simultaneous refresh attempts', async () => {
    const mockRefreshResponse = {
      success: true,
      data: {
        user: { uuid: 'test', username: 'test', fullName: 'Test', email: 'test@test.com' },
        accessToken: 'new-token',
      },
    };

    (AuthAPI.refreshToken as jest.Mock).mockResolvedValue(mockRefreshResponse);

    // Start multiple refresh attempts simultaneously
    const promise1 = TokenManager.refreshAccessToken();
    const promise2 = TokenManager.refreshAccessToken();
    const promise3 = TokenManager.refreshAccessToken();

    const [result1, result2, result3] = await Promise.all([promise1, promise2, promise3]);

    // All should return the same token
    expect(result1).toBe('new-token');
    expect(result2).toBe('new-token');
    expect(result3).toBe('new-token');

    // But refreshToken should only be called once
    expect(AuthAPI.refreshToken).toHaveBeenCalledTimes(1);
  });
});
