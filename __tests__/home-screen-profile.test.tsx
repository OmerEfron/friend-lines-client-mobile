import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { HomeScreen } from '../screens/home-screen';
import { useAuth } from '../contexts/auth-context';

// Mock the auth context
jest.mock('../contexts/auth-context');
const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

// Mock the navigation
const mockNavigation = {
  navigate: jest.fn(),
};

describe('HomeScreen Profile Access', () => {
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

  it('should render profile button in header', () => {
    const { getByTestId } = render(
      <HomeScreen navigation={mockNavigation} />
    );

    // The profile button should be present
    const profileButton = getByTestId('profile-button');
    expect(profileButton).toBeTruthy();
  });

  it('should navigate to profile when profile button is pressed', () => {
    const { getByTestId } = render(
      <HomeScreen navigation={mockNavigation} />
    );

    const profileButton = getByTestId('profile-button');
    fireEvent.press(profileButton);

    expect(mockNavigation.navigate).toHaveBeenCalledWith('Profile');
  });

  it('should display user greeting with full name', () => {
    const { getByText } = render(
      <HomeScreen navigation={mockNavigation} />
    );

    expect(getByText('Hello Test User!')).toBeTruthy();
  });

  it('should display user greeting with username when full name is not available', () => {
    const userWithoutFullName = {
      ...mockUser,
      fullName: '',
    };

    mockUseAuth.mockReturnValue({
      user: userWithoutFullName,
      isLoading: false,
      login: jest.fn(),
      register: jest.fn(),
      logout: jest.fn(),
    });

    const { getByText } = render(
      <HomeScreen navigation={mockNavigation} />
    );

    expect(getByText('Hello testuser!')).toBeTruthy();
  });
});
