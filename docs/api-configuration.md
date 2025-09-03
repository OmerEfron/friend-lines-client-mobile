# API Configuration

The app connects to the Friend Lines server API at:
```
https://friend-lines-server.onrender.com
```

## Authentication Endpoints

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
