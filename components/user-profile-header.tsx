import React from 'react';
import { View, Text } from 'react-native';
import { UserProfile } from '../types/profile';
import { useTheme } from '../contexts/theme-context';
import { Avatar } from './ui/avatar';

interface UserProfileHeaderProps {
  profile: UserProfile;
}

export function UserProfileHeader({ profile }: UserProfileHeaderProps) {
  const { theme } = useTheme();

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return 'Unknown';
    }
  };

  const getContainerStyle = () => ({
    alignItems: 'center' as const,
    padding: theme.space[6],
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.divider,
  });

  const getUserInfoStyle = () => ({
    alignItems: 'center' as const,
    marginTop: theme.space[4],
  });

  const getFullNameStyle = () => ({
    fontSize: theme.fonts.roles.headline.size,
    fontWeight: theme.fonts.roles.headline.weight,
    color: theme.colors.text,
    marginBottom: theme.space[1],
  });

  const getUsernameStyle = () => ({
    fontSize: theme.fonts.roles.body.size,
    color: theme.colors.brand.primary,
    marginBottom: theme.space[2],
  });

  const getEmailStyle = () => ({
    fontSize: theme.fonts.roles.caption.size,
    color: theme.colors['text-muted'],
    marginBottom: theme.space[2],
  });

  const getJoinedDateStyle = () => ({
    fontSize: theme.fonts.roles.meta.size,
    color: theme.colors['text-muted'],
  });

  return (
    <View style={getContainerStyle()}>
      <Avatar
        size="xl"
        name={profile.fullName}
        source={profile.avatar ? { uri: profile.avatar } : undefined}
      />
      
      <View style={getUserInfoStyle()}>
        <Text style={getFullNameStyle()}>{profile.fullName}</Text>
        <Text style={getUsernameStyle()}>@{profile.username}</Text>
        <Text style={getEmailStyle()}>{profile.email}</Text>
        <Text style={getJoinedDateStyle()}>
          Joined {formatDate(profile.createdAt)}
        </Text>
      </View>
    </View>
  );
}

// Styles are now handled by theme system
