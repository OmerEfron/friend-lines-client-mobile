# Friend Lines Mobile

A React Native mobile application built with Expo for the Friend Lines platform.

## Features

- **Authentication System**: Login and registration screens
- **User Management**: Secure user authentication with token storage
- **Modern UI**: Clean, responsive design with proper safe area handling
- **Navigation**: Stack-based navigation with authentication flow
- **API Integration**: Connects to Friend Lines server API

## Tech Stack

- **Framework**: React Native with Expo SDK 53
- **Language**: TypeScript
- **Navigation**: React Navigation v7
- **State Management**: React Context API
- **Storage**: AsyncStorage for local data persistence
- **API**: RESTful API integration with fetch

## Project Structure

```
friend-lines-mobile/
├── contexts/           # React Context providers
│   └── auth-context.tsx
├── navigation/         # Navigation configuration
│   └── app-navigator.tsx
├── screens/           # Screen components
│   ├── login-screen.tsx
│   ├── register-screen.tsx
│   └── home-screen.tsx
├── services/          # API services
│   └── auth-api.ts
├── types/             # TypeScript interfaces
│   └── auth.ts
├── App.tsx            # Main application component
└── package.json       # Dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator (optional)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd friend-lines-mobile
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Run on your preferred platform:
```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

## API Configuration

The app connects to the Friend Lines server API at:
```
https://friend-lines-server.onrender.com
```

### Authentication Endpoints

- **POST** `/auth/login` - User login
- **POST** `/auth/register` - User registration

## Screen Descriptions

### Login Screen
- Email and password input fields
- Form validation
- Navigation to registration screen
- Error handling for failed login attempts

### Register Screen
- Name, email, and password input fields
- Password strength validation (minimum 6 characters)
- Navigation to login screen
- Error handling for failed registration

### Home Screen
- Personalized welcome message with user's name
- User information display
- Logout functionality
- Clean, card-based design

## Code Quality

- **Line Limit**: Each file is kept under 150 lines for maintainability
- **TypeScript**: Strict typing for better code quality
- **Component Structure**: Functional components with hooks
- **Error Handling**: Comprehensive error handling throughout the app
- **Accessibility**: Proper safe area management and keyboard handling

## Dependencies

### Core Dependencies
- `expo`: ~53.0.22
- `react`: 19.0.0
- `react-native`: 0.79.6
- `@react-navigation/native`: ^7.1.17
- `@react-navigation/stack`: ^7.4.7

### Additional Dependencies
- `react-native-screens`: ^4.15.3
- `react-native-safe-area-context`: ^5.6.1
- `react-native-gesture-handler`: ^2.28.0
- `@react-native-async-storage/async-storage`: ^2.2.0

## Development Guidelines

1. **File Organization**: Keep related functionality in appropriate directories
2. **Component Design**: Use functional components with TypeScript interfaces
3. **State Management**: Prefer React Context over local state when appropriate
4. **Error Handling**: Implement proper error boundaries and user feedback
5. **Performance**: Use React.memo and useCallback for optimization when needed

## Future Enhancements

- Push notification support
- Offline functionality
- Enhanced error logging
- Unit and integration tests
- Internationalization (i18n)
- Dark mode support

## Contributing

1. Follow the existing code style and structure
2. Keep files under 150 lines
3. Add proper TypeScript types
4. Test your changes thoroughly
5. Update documentation as needed

## License

This project is part of the Friend Lines platform.
