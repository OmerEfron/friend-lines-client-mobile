import { renderHook, waitFor } from '@testing-library/react-native';
import { useUserProfile } from '../hooks/use-user-profile';
import { ProfileAPI } from '../services/profile-api';
import { useAuth } from '../contexts/auth-context';

// Mock the ProfileAPI
jest.mock('../services/profile-api');
const MockedProfileAPI = ProfileAPI as jest.Mocked<typeof ProfileAPI>;

// Mock the auth context
jest.mock('../contexts/auth-context');
const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

describe('useUserProfile', () => {
  const mockUser = {
    uuid: '123e4567-e89b-12d3-a456-426614174000',
    username: 'testuser',
    fullName: 'Test User',
    email: 'test@example.com',
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T00:00:00.000Z',
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

  it('should fetch user profile successfully', async () => {
    const mockProfile = {
      uuid: '123e4567-e89b-12d3-a456-426614174000',
      username: 'testuser',
      fullName: 'Test User',
      email: 'test@example.com',
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z',
    };

    const mockResponse = {
      success: true,
      data: { user: mockProfile },
    };

    MockedProfileAPI.getUserProfile.mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useUserProfile('123e4567-e89b-12d3-a456-426614174000'));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.profile).toBe(null);
    expect(result.current.error).toBe(null);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.profile).toEqual(mockProfile);
    expect(result.current.error).toBe(null);
    expect(MockedProfileAPI.getUserProfile).toHaveBeenCalledWith('123e4567-e89b-12d3-a456-426614174000');
  });

  it('should fetch current user profile when no userId provided', async () => {
    const mockProfile = {
      uuid: '123e4567-e89b-12d3-a456-426614174000',
      username: 'currentuser',
      fullName: 'Current User',
      email: 'current@example.com',
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z',
    };

    const mockResponse = {
      success: true,
      data: { user: mockProfile },
    };

    MockedProfileAPI.getCurrentUserProfile.mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useUserProfile());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.profile).toEqual(mockProfile);
    expect(MockedProfileAPI.getCurrentUserProfile).toHaveBeenCalled();
  });

  it('should handle API errors', async () => {
    const error = new Error('Network error');
    MockedProfileAPI.getUserProfile.mockRejectedValue(error);

    const { result } = renderHook(() => useUserProfile('123e4567-e89b-12d3-a456-426614174000'));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.profile).toBe(null);
    expect(result.current.error).toBe('Network error');
  });

  it('should handle failed API response', async () => {
    const mockResponse = {
      success: false,
      data: null,
    };

    MockedProfileAPI.getUserProfile.mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useUserProfile('123e4567-e89b-12d3-a456-426614174000'));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.profile).toBe(null);
    expect(result.current.error).toBe('Failed to load profile');
  });

  it('should refresh profile data', async () => {
    const mockProfile = {
      uuid: '123e4567-e89b-12d3-a456-426614174000',
      username: 'testuser',
      fullName: 'Test User',
      email: 'test@example.com',
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z',
    };

    const mockResponse = {
      success: true,
      data: { user: mockProfile },
    };

    MockedProfileAPI.getUserProfile.mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useUserProfile('123e4567-e89b-12d3-a456-426614174000'));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Clear the mock to verify it's called again
    MockedProfileAPI.getUserProfile.mockClear();

    // Call refresh
    await result.current.refresh();

    expect(MockedProfileAPI.getUserProfile).toHaveBeenCalledWith('123e4567-e89b-12d3-a456-426614174000');
  });
});
