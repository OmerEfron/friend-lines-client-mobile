import React from 'react';
import {
  Pressable,
  View,
  StyleSheet,
  ViewStyle,
  Platform,
} from 'react-native';
import { useTheme } from '../../contexts/theme-context';

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  elevation?: 0 | 1 | 2 | 3 | 4 | 5;
  style?: ViewStyle;
  testID?: string;
}

export function Card({
  children,
  onPress,
  elevation = 1,
  style,
  testID,
}: CardProps) {
  const { theme } = useTheme();

  const getCardStyle = (pressed: boolean): ViewStyle => {
    const baseStyle: ViewStyle = {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.radius.md,
      marginHorizontal: theme.space[4],
      marginVertical: theme.space[3],
      overflow: 'hidden',
    };

    // Add elevation/shadow
    const elevationStyle = theme.elevation[elevation];
    const shadowStyle = Platform.select({
      ios: elevationStyle.ios,
      android: { elevation: elevationStyle.android.elevation },
    });

    // Add pressed state
    const pressedStyle: ViewStyle = pressed && onPress
      ? { backgroundColor: theme.colors.states.pressed }
      : {};

    return {
      ...baseStyle,
      ...shadowStyle,
      ...pressedStyle,
    };
  };

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [getCardStyle(pressed), style]}
        testID={testID}
        accessibilityRole="button"
      >
        {children}
      </Pressable>
    );
  }

  return (
    <View style={[getCardStyle(false), style]} testID={testID}>
      {children}
    </View>
  );
}
