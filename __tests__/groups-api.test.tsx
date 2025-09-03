import { GroupsAPI } from '../services/groups-api';

// Mock the BaseAPI
jest.mock('../services/base-api', () => ({
  BaseAPI: {
    authenticatedRequest: jest.fn(),
  },
}));

describe('GroupsAPI', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a group with correct parameters', async () => {
    const mockResponse = {
      success: true,
      data: {
        group: {
          _id: 'group123',
          name: 'Test Group',
          description: 'Test Description',
          creatorId: 'user123',
          members: ['user123'],
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
        },
      },
    };

    const { BaseAPI } = require('../services/base-api');
    BaseAPI.authenticatedRequest.mockResolvedValue(mockResponse);

    const groupData = {
      name: 'Test Group',
      description: 'Test Description',
    };

    const result = await GroupsAPI.createGroup(groupData);

    expect(BaseAPI.authenticatedRequest).toHaveBeenCalledWith(
      '/groups/create',
      {
        method: 'POST',
        body: JSON.stringify(groupData),
      }
    );

    expect(result).toEqual(mockResponse);
  });

  it('should get user groups with pagination', async () => {
    const mockResponse = {
      success: true,
      data: {
        groups: [
          {
            _id: 'group1',
            name: 'Group 1',
            creatorId: 'user123',
            members: ['user123'],
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-01T00:00:00Z',
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

    const result = await GroupsAPI.getMyGroups(1, 20);

    expect(BaseAPI.authenticatedRequest).toHaveBeenCalledWith(
      '/groups/my-groups?page=1&limit=20',
      { method: 'GET' }
    );

    expect(result).toEqual(mockResponse);
  });
});
