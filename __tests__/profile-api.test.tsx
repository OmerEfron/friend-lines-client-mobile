import { ProfileAPI } from '../services/profile-api';
import { BaseAPI } from '../services/base-api';

// Mock the BaseAPI
jest.mock('../services/base-api');
const MockedBaseAPI = BaseAPI as jest.Mocked<typeof BaseAPI>;

describe('ProfileAPI', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getUserProfile', () => {
    it('should fetch user profile successfully', async () => {
      const mockResponse = {
        success: true,
        data: {
          user: {
            uuid: '123e4567-e89b-12d3-a456-426614174000',
            username: 'testuser',
            fullName: 'Test User',
            email: 'test@example.com',
            createdAt: '2023-01-01T00:00:00.000Z',
            updatedAt: '2023-01-01T00:00:00.000Z',
          },
        },
      };

      MockedBaseAPI.authenticatedRequest.mockResolvedValue(mockResponse);

      const result = await ProfileAPI.getUserProfile('123e4567-e89b-12d3-a456-426614174000');

      expect(MockedBaseAPI.authenticatedRequest).toHaveBeenCalledWith(
        '/users/profile/123e4567-e89b-12d3-a456-426614174000',
        { method: 'GET' }
      );
      expect(result).toEqual(mockResponse);
    });

    it('should handle API errors', async () => {
      const error = new Error('Network error');
      MockedBaseAPI.authenticatedRequest.mockRejectedValue(error);

      await expect(ProfileAPI.getUserProfile('invalid-id')).rejects.toThrow('Network error');
    });
  });

  describe('getCurrentUserProfile', () => {
    it('should fetch current user profile successfully', async () => {
      const mockResponse = {
        success: true,
        data: {
          user: {
            uuid: '123e4567-e89b-12d3-a456-426614174000',
            username: 'currentuser',
            fullName: 'Current User',
            email: 'current@example.com',
            createdAt: '2023-01-01T00:00:00.000Z',
            updatedAt: '2023-01-01T00:00:00.000Z',
          },
        },
      };

      MockedBaseAPI.authenticatedRequest.mockResolvedValue(mockResponse);

      const result = await ProfileAPI.getCurrentUserProfile();

      expect(MockedBaseAPI.authenticatedRequest).toHaveBeenCalledWith(
        '/users/profile',
        { method: 'GET' }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getUserNewsflashes', () => {
    it('should fetch user newsflashes with pagination', async () => {
      const mockResponse = {
        success: true,
        data: {
          newsflashes: [
            {
              _id: 'newsflash1',
              authorId: '123e4567-e89b-12d3-a456-426614174000',
              content: 'Test newsflash',
              targetType: 'friends' as const,
              isDeleted: false,
              createdAt: '2023-01-01T00:00:00.000Z',
              updatedAt: '2023-01-01T00:00:00.000Z',
              author: {
                uuid: '123e4567-e89b-12d3-a456-426614174000',
                username: 'testuser',
                fullName: 'Test User',
                email: 'test@example.com',
                createdAt: '2023-01-01T00:00:00.000Z',
                updatedAt: '2023-01-01T00:00:00.000Z',
              },
            },
          ],
          pagination: {
            page: 1,
            limit: 20,
            total: 1,
            totalPages: 1,
          },
        },
      };

      MockedBaseAPI.authenticatedRequest.mockResolvedValue(mockResponse);

      const result = await ProfileAPI.getUserNewsflashes('123e4567-e89b-12d3-a456-426614174000', 1, 20);

      expect(MockedBaseAPI.authenticatedRequest).toHaveBeenCalledWith(
        '/newsflashes/user/123e4567-e89b-12d3-a456-426614174000?page=1&limit=20',
        { method: 'GET' }
      );
      expect(result).toEqual(mockResponse);
    });
  });
});
