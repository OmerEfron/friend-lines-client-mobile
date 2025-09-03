import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ViewStyle,
  ImageSourcePropType,
} from 'react-native';
import { useTheme } from '../../contexts/theme-context';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface AvatarProps {
  source?: ImageSourcePropType;
  name?: string;
  size?: AvatarSize;
  showStatus?: boolean;
  statusColor?: string;
  style?: ViewStyle;
  testID?: string;
}

export function Avatar({
  source,
  name = '',
  size = 'md',
  showStatus = false,
  statusColor,
  style,
  testID,
}: AvatarProps) {
  const { theme } = useTheme();

  const getSizeStyles = (): { container: ViewStyle; text: any } => {
    const sizes = {
      xs: { size: 20, fontSize: 8 },
      sm: { size: 28, fontSize: 12 },
      md: { size: 36, fontSize: 16 },
      lg: { size: 48, fontSize: 20 },
      xl: { size: 64, fontSize: 24 },
    };

    const { size: avatarSize, fontSize } = sizes[size];

    return {
      container: {
        width: avatarSize,
        height: avatarSize,
        borderRadius: avatarSize / 2,
      },
      text: {
        fontSize,
        fontWeight: theme.fonts.weight.semibold,
      },
    };
  };

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getAvatarStyle = (): ViewStyle => {
    const { container } = getSizeStyles();
    
    return {
      ...container,
      backgroundColor: theme.colors.brand.primary,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    };
  };

  const getTextStyle = (): any => {
    const { text } = getSizeStyles();
    
    return {
      ...text,
      color: theme.colors.surface,
    };
  };

  const getStatusStyle = (): ViewStyle => {
    const { container } = getSizeStyles();
    const statusSize = Math.max(8, container.width * 0.25);
    
    return {
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: statusSize,
      height: statusSize,
      borderRadius: statusSize / 2,
      backgroundColor: statusColor || theme.colors.semantic.success,
      borderWidth: 2,
      borderColor: theme.colors.surface,
    };
  };

  return (
    <View style={[getAvatarStyle(), style]} testID={testID}>
      {source ? (
        <Image
          source={source}
          style={getAvatarStyle()}
          resizeMode="cover"
        />
      ) : (
        <Text style={getTextStyle()}>
          {getInitials(name)}
        </Text>
      )}
      
      {showStatus && (
        <View style={getStatusStyle()} />
      )}
    </View>
  );
}
