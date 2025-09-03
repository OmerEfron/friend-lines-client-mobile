import React from 'react';
import { render } from '@testing-library/react-native';
import { TabNavigator } from '../navigation/tab-navigator';

// Mock the screens
jest.mock('../screens/home-screen', () => ({
  HomeScreen: () => null,
}));

jest.mock('../screens/user-search-screen', () => ({
  UserSearchScreen: () => null,
}));

jest.mock('../screens/friends-screen', () => ({
  FriendsScreen: () => null,
}));

jest.mock('../screens/friend-requests-screen', () => ({
  FriendRequestsScreen: () => null,
}));

jest.mock('../screens/groups-list-screen', () => ({
  GroupsListScreen: () => null,
}));

jest.mock('../screens/user-profile-screen', () => ({
  UserProfileScreen: () => null,
}));

describe('TabNavigator Profile Tab', () => {
  it('should render all tabs including Profile tab', () => {
    const { getByText } = render(<TabNavigator />);

    // Check that all tab titles are present
    expect(getByText('Newsfeed')).toBeTruthy();
    expect(getByText('Find Friends')).toBeTruthy();
    expect(getByText('My Friends')).toBeTruthy();
    expect(getByText('Requests')).toBeTruthy();
    expect(getByText('Groups')).toBeTruthy();
    expect(getByText('My Profile')).toBeTruthy();
  });

  it('should have Profile tab with correct configuration', () => {
    const { getByText } = render(<TabNavigator />);
    
    // The Profile tab should be present with the correct title
    const profileTab = getByText('My Profile');
    expect(profileTab).toBeTruthy();
  });
});
