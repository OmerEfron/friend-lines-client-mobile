import React from 'react';
import {
  TextInput,
  Text,
  View,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useTheme } from '../../contexts/theme-context';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helper?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  testID?: string;
}

export function Input({
  label,
  error,
  helper,
  leftIcon,
  rightIcon,
  containerStyle,
  inputStyle,
  testID,
  ...textInputProps
}: InputProps) {
  const { theme } = useTheme();

  const getContainerStyle = (): ViewStyle => ({
    marginBottom: theme.space[4],
  });

  const getLabelStyle = (): TextStyle => ({
    fontSize: theme.fonts.roles.caption.size,
    fontWeight: theme.fonts.roles.caption.weight,
    color: theme.colors.text,
    marginBottom: theme.space[2],
  });

  const getInputContainerStyle = (): ViewStyle => ({
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: error ? theme.colors.semantic.error : theme.colors.divider,
    paddingHorizontal: theme.space[4],
    minHeight: 44,
  });

  const getInputStyle = (): TextStyle => ({
    flex: 1,
    fontSize: theme.fonts.roles.body.size,
    color: theme.colors.text,
    paddingVertical: theme.space[3],
  });

  const getHelperStyle = (): TextStyle => ({
    fontSize: theme.fonts.roles.caption.size,
    color: error ? theme.colors.semantic.error : theme.colors['text-muted'],
    marginTop: theme.space[1],
  });

  return (
    <View style={[getContainerStyle(), containerStyle]}>
      {label && (
        <Text style={getLabelStyle()}>
          {label}
        </Text>
      )}
      
      <View style={getInputContainerStyle()}>
        {leftIcon && (
          <View style={{ marginRight: theme.space[2] }}>
            {leftIcon}
          </View>
        )}
        
        <TextInput
          style={[getInputStyle(), inputStyle]}
          placeholderTextColor={theme.colors['text-muted']}
          testID={testID}
          {...textInputProps}
        />
        
        {rightIcon && (
          <View style={{ marginLeft: theme.space[2] }}>
            {rightIcon}
          </View>
        )}
      </View>
      
      {(error || helper) && (
        <Text style={getHelperStyle()}>
          {error || helper}
        </Text>
      )}
    </View>
  );
}
