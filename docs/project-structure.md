# Project Structure

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

## Code Quality

- **Line Limit**: Each file is kept under 150 lines for maintainability
- **TypeScript**: Strict typing for better code quality
- **Component Structure**: Functional components with hooks
- **Error Handling**: Comprehensive error handling throughout the app
- **Accessibility**: Proper safe area management and keyboard handling

## Development Guidelines

1. **File Organization**: Keep related functionality in appropriate directories
2. **Component Design**: Use functional components with TypeScript interfaces
3. **State Management**: Prefer React Context over local state when appropriate
4. **Error Handling**: Implement proper error boundaries and user feedback
5. **Performance**: Use React.memo and useCallback for optimization when needed
