# User Profiles

This document describes the user profile functionality implemented in the Friend Lines mobile app.

## Overview

The user profile system allows users to view their own profile and the profiles of their friends. Users can see profile information, stats, and newsflashes from any user they're connected with.

## Features

### Profile Viewing
- **User Profile Screen**: Displays user information including name, username, email, and join date
- **Profile Stats**: Shows friends count, groups count, and newsflashes count
- **User Newsflashes**: Displays all newsflashes posted by the user with pagination support

### Navigation
- **Friend Navigation**: Clicking on a friend's name in the friends list navigates to their profile
- **Profile Header**: Clean, modern design with user avatar and information
- **Back Navigation**: Standard back button in the header for easy navigation

## Components

### Core Components
- `UserProfileScreen`: Main profile screen component
- `UserProfileHeader`: Displays user avatar and basic information
- `UserProfileStats`: Shows user statistics (friends, groups, newsflashes)
- `UserNewsflashesList`: Lists user's newsflashes with pagination
- `UserProfileError`: Error handling component

### Hooks
- `useUserProfile`: Fetches and manages user profile data
- `useUserNewsflashes`: Fetches and manages user's own newsflashes (not friends' feed) with pagination

### API Services
- `ProfileAPI`: Handles all profile-related API calls
  - `getUserProfile(userId)`: Get specific user's profile
  - `getCurrentUserProfile()`: Get current user's profile
  - `getUserNewsflashes(userId, page, limit)`: Get user's own newsflashes

## API Integration

The profile system integrates with the following API endpoints:

- `GET /users/profile/{userId}` - Get user profile
- `GET /users/profile` - Get current user profile
- `GET /newsflashes/author/{userId}` - Get user's own newsflashes (not friends' feed)

## Navigation Flow

### Accessing Your Own Profile
1. **Home Screen** → Click profile button in header → **My Profile Tab**
2. **Tab Navigator** → **My Profile Tab** → **User Profile Screen**

### Accessing Friend Profiles
1. **Friends Screen** → Click on friend → **User Profile Screen**
2. **User Profile Screen** shows:
   - User header with avatar and info
   - Profile statistics
   - User's newsflashes list

## Error Handling

- Network errors are handled gracefully with retry options
- Profile not found errors show appropriate messaging
- Loading states provide good user feedback

## Testing

Comprehensive tests are included for:
- API service methods
- React hooks
- Screen components
- Error scenarios

## Usage

### Accessing Your Own Profile
```typescript
// From home screen header
const handleProfilePress = () => {
  navigation.navigate('Profile'); // Navigates to Profile tab
};

// From tab navigator - automatically shows current user's profile
// No additional code needed - the Profile tab shows current user
```

### Viewing a Friend's Profile
```typescript
// In friends screen, clicking a friend navigates to their profile
const handleFriendPress = (friend: any) => {
  navigation.navigate('UserProfile', { userId: friend.uuid });
};
```

### Using Profile Hooks
```typescript
// Get user profile
const { profile, isLoading, error, refresh } = useUserProfile(userId);

// Get user's own newsflashes (not friends' feed)
const { newsflashes, hasMore, loadMore } = useUserNewsflashes(userId);

// Get current user's own newsflashes (when no userId provided)
const { newsflashes, hasMore, loadMore } = useUserNewsflashes();
```

## Future Enhancements

- Profile editing capabilities
- Profile pictures upload
- Enhanced statistics
- Activity timeline
- Privacy settings
