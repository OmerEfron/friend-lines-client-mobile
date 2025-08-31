import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { CreateNewsflashScreen } from '../screens/create-newsflash-screen';

// Mock the navigation and route props
const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
};

const mockRoute = {
  params: {},
};

// Mock the custom hook
jest.mock('../hooks/use-create-newsflash', () => ({
  useCreateNewsflash: () => ({
    createNewsflash: jest.fn(),
    isLoading: false,
    error: null,
  }),
}));

describe('CreateNewsflashScreen', () => {
  it('renders correctly', () => {
    render(
      <CreateNewsflashScreen 
        navigation={mockNavigation as any} 
        route={mockRoute as any} 
      />
    );
    
    expect(screen.getByText('Create Newsflash')).toBeTruthy();
    expect(screen.getByText('Cancel')).toBeTruthy();
    expect(screen.getByText('Post')).toBeTruthy();
    expect(screen.getByPlaceholderText("What's happening?")).toBeTruthy();
  });

  it('shows character count', () => {
    render(
      <CreateNewsflashScreen 
        navigation={mockNavigation as any} 
        route={mockRoute as any} 
      />
    );
    
    expect(screen.getByText('0/100')).toBeTruthy();
  });
});
