# Newsflash Creation Feature

## Overview
The Newsflash Creation feature allows users to create and share short messages (up to 100 characters) with their friends or specific groups.

## Features
- **Content Input**: Text input with 100 character limit
- **Target Selection**: Choose between sharing with all friends or a specific group
- **Character Counter**: Real-time display of remaining characters
- **Validation**: Ensures content is not empty and within character limit
- **Error Handling**: Displays API errors and validation messages
- **Auto-refresh**: Newsfeed automatically refreshes after successful creation

## Components

### CreateNewsflashScreen
Main screen for creating newsflashes with:
- Header with Cancel/Post buttons
- Content input area
- Target type selection (Friends/Group)
- Group selection (when applicable)
- Error display

### CreateNewsflashButton
Floating action button (+ icon) that appears on the home screen to access newsflash creation.

## API Integration
Uses the existing `NewsflashesAPI.createNewsflash()` method to:
- Send POST request to `/api/newsflashes/create`
- Include JWT authentication token
- Handle success/error responses

## Navigation Flow
1. User taps + button on home screen
2. Navigate to CreateNewsflashScreen
3. User enters content and selects target
4. On successful creation, return to home screen
5. Newsfeed automatically refreshes to show new content

## State Management
- Uses `useCreateNewsflash` custom hook
- Manages loading states, errors, and API calls
- Integrates with existing authentication context

## Future Enhancements
- Group selection modal/screen
- Draft saving
- Rich text formatting
- Media attachments
- Scheduled posting
