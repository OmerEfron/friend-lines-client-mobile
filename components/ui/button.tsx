import React from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useTheme } from '../../contexts/theme-context';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'icon';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  title?: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
  testID?: string;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  style,
  textStyle,
  testID,
}: ButtonProps) {
  const { theme } = useTheme();

  const getButtonStyle = (pressed: boolean): ViewStyle => {
    const baseStyle: ViewStyle = {
      minHeight: 44,
      borderRadius: theme.radius.lg,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: theme.space[2],
      opacity: disabled ? 0.5 : pressed ? 0.92 : 1,
    };

    // Size adjustments
    const sizeStyles: Record<ButtonSize, ViewStyle> = {
      sm: {
        paddingVertical: theme.space[2],
        paddingHorizontal: theme.space[3],
        minHeight: 36,
      },
      md: {
        paddingVertical: theme.space[3],
        paddingHorizontal: theme.space[4],
      },
      lg: {
        paddingVertical: theme.space[4],
        paddingHorizontal: theme.space[5],
        minHeight: 52,
      },
    };

    // Variant styles
    const variantStyles: Record<ButtonVariant, ViewStyle> = {
      primary: {
        backgroundColor: theme.colors.brand.primary,
      },
      secondary: {
        backgroundColor: theme.colors['chip-bg'],
        borderWidth: 1,
        borderColor: theme.colors.divider,
      },
      tertiary: {
        backgroundColor: 'transparent',
      },
      icon: {
        backgroundColor: 'transparent',
        minHeight: 44,
        minWidth: 44,
        borderRadius: theme.radius.md,
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
      fontSize: theme.fonts.roles.body.size,
      fontWeight: theme.fonts.roles.body.weight,
    };

    const variantStyles: Record<ButtonVariant, TextStyle> = {
      primary: {
        color: theme.colors.surface,
      },
      secondary: {
        color: theme.colors.text,
      },
      tertiary: {
        color: theme.colors.brand.primary,
      },
      icon: {
        color: theme.colors['text-muted'],
      },
    };

    return {
      ...baseStyle,
      ...variantStyles[variant],
    };
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        getButtonStyle(pressed),
        style,
      ]}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading, busy: loading }}
      testID={testID}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? theme.colors.surface : theme.colors.brand.primary}
        />
      ) : (
        <>
          {icon}
          {title && (
            <Text style={[getTextStyle(), textStyle]}>
              {title}
            </Text>
          )}
        </>
      )}
    </Pressable>
  );
}
