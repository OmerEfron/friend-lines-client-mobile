import React from 'react';
import {
  View,
  Pressable,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useTheme } from '../../contexts/theme-context';

interface ChipProps {
  children: React.ReactNode;
  selected?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  testID?: string;
}

export function Chip({
  children,
  selected = false,
  onPress,
  style,
  textStyle,
  testID,
}: ChipProps) {
  const { theme } = useTheme();

  const getChipStyle = (pressed: boolean): ViewStyle => {
    const baseStyle: ViewStyle = {
      backgroundColor: selected 
        ? theme.colors.states.selected 
        : theme.colors['chip-bg'],
      borderRadius: theme.radius.pill,
      paddingHorizontal: theme.space[3],
      paddingVertical: theme.space[2],
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 32,
    };

    const pressedStyle: ViewStyle = pressed && onPress
      ? { opacity: 0.8 }
      : {};

    return {
      ...baseStyle,
      ...pressedStyle,
    };
  };

  const getTextStyle = (): TextStyle => ({
    fontSize: theme.fonts.roles.caption.size,
    fontWeight: theme.fonts.roles.caption.weight,
    color: selected ? theme.colors.brand.primary : theme.colors['text-muted'],
  });

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [getChipStyle(pressed), style]}
        testID={testID}
        accessibilityRole="button"
        accessibilityState={{ selected }}
      >
        <Text style={[getTextStyle(), textStyle]}>
          {children}
        </Text>
      </Pressable>
    );
  }

  return (
    <View style={[getChipStyle(false), style]} testID={testID}>
      <Text style={[getTextStyle(), textStyle]}>
        {children}
      </Text>
    </View>
  );
}
