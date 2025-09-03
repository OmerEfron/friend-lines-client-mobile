import { GroupsAPI } from '../services/groups-api';

// Mock the BaseAPI
jest.mock('../services/base-api', () => ({
  BaseAPI: {
    authenticatedRequest: jest.fn(),
  },
}));

describe('GroupsAPI - Group Feed', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should get group newsflashes with pagination', async () => {
    const mockResponse = {
      success: true,
      data: {
        newsflashes: [
          {
            _id: 'newsflash1',
            content: 'Hello group!',
            authorId: 'user123',
            targetType: 'group',
            targetId: 'group123',
            isDeleted: false,
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-01T00:00:00Z',
            author: {
              uuid: 'user123',
              username: 'testuser',
              fullName: 'Test User',
              email: 'test@example.com',
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

    const { BaseAPI } = require('../services/base-api');
    BaseAPI.authenticatedRequest.mockResolvedValue(mockResponse);

    const result = await GroupsAPI.getGroupNewsflashes('group123', 1, 20);

    expect(BaseAPI.authenticatedRequest).toHaveBeenCalledWith(
      '/groups/group123/newsflashes?page=1&limit=20',
      { method: 'GET' }
    );

    expect(result).toEqual(mockResponse);
  });
});
