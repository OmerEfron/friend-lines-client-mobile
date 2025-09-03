import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from '../contexts/theme-context';
import { Button } from '../components/ui/button';

// Mock the theme context for testing
const MockThemeProvider = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

describe('Button Component', () => {
  it('renders correctly with title', () => {
    const { getByText } = render(
      <MockThemeProvider>
        <Button title="Test Button" onPress={() => {}} />
      </MockThemeProvider>
    );

    expect(getByText('Test Button')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <MockThemeProvider>
        <Button title="Test Button" onPress={mockOnPress} />
      </MockThemeProvider>
    );

    fireEvent.press(getByText('Test Button'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('shows loading state correctly', () => {
    const { getByTestId } = render(
      <MockThemeProvider>
        <Button title="Test Button" onPress={() => {}} loading={true} />
      </MockThemeProvider>
    );

    // Check if loading indicator is present
    expect(getByTestId('activity-indicator')).toBeTruthy();
  });

  it('is disabled when disabled prop is true', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <MockThemeProvider>
        <Button title="Test Button" onPress={mockOnPress} disabled={true} />
      </MockThemeProvider>
    );

    fireEvent.press(getByText('Test Button'));
    expect(mockOnPress).not.toHaveBeenCalled();
  });

  it('renders with different variants', () => {
    const { getByText: getByTextPrimary } = render(
      <MockThemeProvider>
        <Button title="Primary" onPress={() => {}} variant="primary" />
      </MockThemeProvider>
    );

    const { getByText: getByTextSecondary } = render(
      <MockThemeProvider>
        <Button title="Secondary" onPress={() => {}} variant="secondary" />
      </MockThemeProvider>
    );

    expect(getByTextPrimary('Primary')).toBeTruthy();
    expect(getByTextSecondary('Secondary')).toBeTruthy();
  });
});
