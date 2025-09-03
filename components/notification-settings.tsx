import React from 'react';
import { View, Text, Alert } from 'react-native';
import { useNotifications } from '../hooks/use-notifications';
import { useTheme } from '../contexts/theme-context';
import { Button } from './ui/button';

export function NotificationSettings() {
  const { isEnabled, isLoading, testNotification } = useNotifications();
  const { theme } = useTheme();

  const handleTestNotification = () => {
    if (isEnabled) {
      testNotification();
      Alert.alert('Test Notification', 'A test notification will appear in 2 seconds!');
    }
  };

  const getContainerStyle = () => ({
    padding: theme.space[4],
  });

  const getStatusContainerStyle = () => ({
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    marginBottom: theme.space[4],
  });

  const getStatusLabelStyle = () => ({
    fontSize: theme.fonts.roles.body.size,
    color: theme.colors.text,
    marginRight: theme.space[2],
  });

  const getStatusValueStyle = () => ({
    fontSize: theme.fonts.roles.body.size,
    fontWeight: theme.fonts.roles.body.weight,
    color: isEnabled ? theme.colors.semantic.success : theme.colors.semantic.error,
  });

  const getLoadingTextStyle = () => ({
    fontSize: theme.fonts.roles.body.size,
    color: theme.colors['text-muted'],
    textAlign: 'center' as const,
  });

  const getHelpTextStyle = () => ({
    fontSize: theme.fonts.roles.body.size,
    color: theme.colors['text-muted'],
    lineHeight: theme.fonts.roles.body.size * theme.fonts.roles.body.lh,
    textAlign: 'center' as const,
  });

  if (isLoading) {
    return (
      <View style={getContainerStyle()}>
        <Text style={getLoadingTextStyle()}>Setting up notifications...</Text>
      </View>
    );
  }

  return (
    <View style={getContainerStyle()}>
      <View style={getStatusContainerStyle()}>
        <Text style={getStatusLabelStyle()}>Notifications:</Text>
        <Text style={getStatusValueStyle()}>
          {isEnabled ? 'Enabled' : 'Disabled'}
        </Text>
      </View>
      
      {isEnabled && (
        <Button
          title="Test Notification"
          onPress={handleTestNotification}
          variant="secondary"
          size="md"
        />
      )}
      
      {!isEnabled && (
        <Text style={getHelpTextStyle()}>
          Enable notifications in your device settings to receive updates from friends
        </Text>
      )}
    </View>
  );
}

// Styles are now handled by theme system
