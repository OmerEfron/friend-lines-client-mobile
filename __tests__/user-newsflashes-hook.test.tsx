import { renderHook, waitFor } from '@testing-library/react-native';
import { useUserNewsflashes } from '../hooks/use-user-newsflashes';
import { ProfileAPI } from '../services/profile-api';
import { useAuth } from '../contexts/auth-context';

// Mock the ProfileAPI
jest.mock('../services/profile-api');
const MockedProfileAPI = ProfileAPI as jest.Mocked<typeof ProfileAPI>;

// Mock the auth context
jest.mock('../contexts/auth-context');
const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

describe('useUserNewsflashes', () => {
  const mockUser = {
    uuid: '123e4567-e89b-12d3-a456-426614174000',
    username: 'testuser',
    fullName: 'Test User',
    email: 'test@example.com',
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T00:00:00.000Z',
  };

  const mockNewsflashes = [
    {
      _id: 'newsflash1',
      authorId: '123e4567-e89b-12d3-a456-426614174000',
      content: 'Test newsflash',
      targetType: 'friends' as const,
      isDeleted: false,
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z',
      author: mockUser,
    },
  ];

  const mockResponse = {
    success: true,
    data: {
      newsflashes: mockNewsflashes,
      pagination: {
        page: 1,
        limit: 20,
        total: 1,
        totalPages: 1,
      },
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAuth.mockReturnValue({
      user: mockUser,
      isLoading: false,
      login: jest.fn(),
      register: jest.fn(),
      logout: jest.fn(),
    });
  });

  it('should fetch user newsflashes for specific user', async () => {
    MockedProfileAPI.getUserNewsflashes.mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useUserNewsflashes('123e4567-e89b-12d3-a456-426614174000'));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.newsflashes).toEqual([]);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.newsflashes).toEqual(mockNewsflashes);
    expect(MockedProfileAPI.getUserNewsflashes).toHaveBeenCalledWith('123e4567-e89b-12d3-a456-426614174000', 1, 20);
  });

  it('should fetch current user newsflashes when no userId provided', async () => {
    MockedProfileAPI.getUserNewsflashes.mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useUserNewsflashes());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.newsflashes).toEqual(mockNewsflashes);
    expect(MockedProfileAPI.getUserNewsflashes).toHaveBeenCalledWith('123e4567-e89b-12d3-a456-426614174000', 1, 20);
  });

  it('should handle error when user not found', async () => {
    mockUseAuth.mockReturnValue({
      user: null,
      isLoading: false,
      login: jest.fn(),
      register: jest.fn(),
      logout: jest.fn(),
    });

    const { result } = renderHook(() => useUserNewsflashes());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toBe('User not found');
    expect(result.current.newsflashes).toEqual([]);
  });

  it('should handle API errors', async () => {
    const error = new Error('Network error');
    MockedProfileAPI.getUserNewsflashes.mockRejectedValue(error);

    const { result } = renderHook(() => useUserNewsflashes('123e4567-e89b-12d3-a456-426614174000'));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toBe('Network error');
    expect(result.current.newsflashes).toEqual([]);
  });

  it('should handle failed API response', async () => {
    const failedResponse = {
      success: false,
      data: null,
    };

    MockedProfileAPI.getUserNewsflashes.mockResolvedValue(failedResponse);

    const { result } = renderHook(() => useUserNewsflashes('123e4567-e89b-12d3-a456-426614174000'));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toBe('Failed to load newsflashes');
    expect(result.current.newsflashes).toEqual([]);
  });

  it('should refresh newsflashes data', async () => {
    MockedProfileAPI.getUserNewsflashes.mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useUserNewsflashes('123e4567-e89b-12d3-a456-426614174000'));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Clear the mock to verify it's called again
    MockedProfileAPI.getUserNewsflashes.mockClear();

    // Call refresh
    await result.current.refresh();

    expect(MockedProfileAPI.getUserNewsflashes).toHaveBeenCalledWith('123e4567-e89b-12d3-a456-426614174000', 1, 20);
  });
});
