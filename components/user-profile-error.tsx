import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../contexts/theme-context';
import { Button } from './ui/button';

interface UserProfileErrorProps {
  error: string;
  onRetry?: () => void;
}

export function UserProfileError({ error, onRetry }: UserProfileErrorProps) {
  const { theme } = useTheme();

  const getContainerStyle = () => ({
    flex: 1,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    backgroundColor: theme.colors.bg,
    padding: theme.space[5],
  });

  const getErrorContentStyle = () => ({
    alignItems: 'center' as const,
    maxWidth: 300,
  });

  const getErrorIconStyle = () => ({
    fontSize: 48,
    marginBottom: theme.space[4],
  });

  const getErrorTitleStyle = () => ({
    fontSize: theme.fonts.roles.title.size,
    fontWeight: theme.fonts.roles.title.weight,
    color: theme.colors.text,
    marginBottom: theme.space[2],
    textAlign: 'center' as const,
  });

  const getErrorMessageStyle = () => ({
    fontSize: theme.fonts.roles.body.size,
    color: theme.colors['text-muted'],
    textAlign: 'center' as const,
    marginBottom: theme.space[6],
    lineHeight: theme.fonts.roles.body.size * theme.fonts.roles.body.lh,
  });

  return (
    <View style={getContainerStyle()}>
      <View style={getErrorContentStyle()}>
        <Text style={getErrorIconStyle()}>⚠️</Text>
        <Text style={getErrorTitleStyle()}>Unable to load profile</Text>
        <Text style={getErrorMessageStyle()}>{error}</Text>
        {onRetry && (
          <Button
            title="Try Again"
            onPress={onRetry}
            variant="primary"
            size="md"
          />
        )}
      </View>
    </View>
  );
}

// Styles are now handled by theme system
