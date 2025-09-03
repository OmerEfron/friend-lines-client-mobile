import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { UserProfileScreen } from '../screens/user-profile-screen';
import { useUserProfile, useUserNewsflashes } from '../hooks';

// Mock the hooks
jest.mock('../hooks', () => ({
  useUserProfile: jest.fn(),
  useUserNewsflashes: jest.fn(),
}));

const mockUseUserProfile = useUserProfile as jest.MockedFunction<typeof useUserProfile>;
const mockUseUserNewsflashes = useUserNewsflashes as jest.MockedFunction<typeof useUserNewsflashes>;

describe('UserProfileScreen', () => {
  const mockRoute = {
    params: {
      userId: '123e4567-e89b-12d3-a456-426614174000',
    },
  };

  const mockProfile = {
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
      author: mockProfile,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render loading state', () => {
    mockUseUserProfile.mockReturnValue({
      profile: null,
      isLoading: true,
      error: null,
      refresh: jest.fn(),
    });

    mockUseUserNewsflashes.mockReturnValue({
      newsflashes: [],
      isLoading: false,
      error: null,
      hasMore: false,
      refresh: jest.fn(),
      loadMore: jest.fn(),
    });

    const { getByText } = render(<UserProfileScreen route={mockRoute} />);

    expect(getByText('Loading profile...')).toBeTruthy();
  });

  it('should render profile error', () => {
    mockUseUserProfile.mockReturnValue({
      profile: null,
      isLoading: false,
      error: 'Failed to load profile',
      refresh: jest.fn(),
    });

    mockUseUserNewsflashes.mockReturnValue({
      newsflashes: [],
      isLoading: false,
      error: null,
      hasMore: false,
      refresh: jest.fn(),
      loadMore: jest.fn(),
    });

    const { getByText } = render(<UserProfileScreen route={mockRoute} />);

    expect(getByText('Unable to load profile')).toBeTruthy();
    expect(getByText('Failed to load profile')).toBeTruthy();
  });

  it('should render profile not found error', () => {
    mockUseUserProfile.mockReturnValue({
      profile: null,
      isLoading: false,
      error: null,
      refresh: jest.fn(),
    });

    mockUseUserNewsflashes.mockReturnValue({
      newsflashes: [],
      isLoading: false,
      error: null,
      hasMore: false,
      refresh: jest.fn(),
      loadMore: jest.fn(),
    });

    const { getByText } = render(<UserProfileScreen route={mockRoute} />);

    expect(getByText('Unable to load profile')).toBeTruthy();
    expect(getByText('Profile not found')).toBeTruthy();
  });

  it('should render profile successfully', async () => {
    mockUseUserProfile.mockReturnValue({
      profile: mockProfile,
      isLoading: false,
      error: null,
      refresh: jest.fn(),
    });

    mockUseUserNewsflashes.mockReturnValue({
      newsflashes: mockNewsflashes,
      isLoading: false,
      error: null,
      hasMore: false,
      refresh: jest.fn(),
      loadMore: jest.fn(),
    });

    const { getByText } = render(<UserProfileScreen route={mockRoute} />);

    await waitFor(() => {
      expect(getByText('Test User')).toBeTruthy();
      expect(getByText('@testuser')).toBeTruthy();
      expect(getByText('test@example.com')).toBeTruthy();
    });
  });

  it('should work without userId parameter', () => {
    const routeWithoutUserId = { params: {} };

    mockUseUserProfile.mockReturnValue({
      profile: mockProfile,
      isLoading: false,
      error: null,
      refresh: jest.fn(),
    });

    mockUseUserNewsflashes.mockReturnValue({
      newsflashes: [],
      isLoading: false,
      error: null,
      hasMore: false,
      refresh: jest.fn(),
      loadMore: jest.fn(),
    });

    const { getByText } = render(<UserProfileScreen route={routeWithoutUserId} />);

    expect(getByText('Test User')).toBeTruthy();
  });
});
