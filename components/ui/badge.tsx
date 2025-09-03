import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useTheme } from '../../contexts/theme-context';

export type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  style?: ViewStyle;
  textStyle?: TextStyle;
  testID?: string;
}

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  style,
  textStyle,
  testID,
}: BadgeProps) {
  const { theme } = useTheme();

  const getBadgeStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: theme.radius.pill,
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: size === 'sm' ? 16 : 20,
    };

    const sizeStyles: Record<'sm' | 'md', ViewStyle> = {
      sm: {
        paddingHorizontal: theme.space[2],
        paddingVertical: theme.space[1],
        minHeight: 16,
      },
      md: {
        paddingHorizontal: theme.space[3],
        paddingVertical: theme.space[2],
        minHeight: 20,
      },
    };

    const variantStyles: Record<BadgeVariant, ViewStyle> = {
      default: {
        backgroundColor: theme.colors['badge-bg'],
      },
      success: {
        backgroundColor: theme.colors.semantic.success,
      },
      warning: {
        backgroundColor: theme.colors.semantic.warning,
      },
      error: {
        backgroundColor: theme.colors.semantic.error,
      },
      info: {
        backgroundColor: theme.colors.semantic.info,
      },
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
    };
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      fontWeight: theme.fonts.weight.medium,
      color: theme.colors.surface,
    };

    const sizeStyles: Record<'sm' | 'md', TextStyle> = {
      sm: {
        fontSize: theme.fonts.size.xs,
      },
      md: {
        fontSize: theme.fonts.size.sm,
      },
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
    };
  };

  return (
    <View style={[getBadgeStyle(), style]} testID={testID}>
      <Text style={[getTextStyle(), textStyle]}>
        {children}
      </Text>
    </View>
  );
}
