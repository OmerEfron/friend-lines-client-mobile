import React from 'react';
import { View, Text } from 'react-native';
import { UserProfile } from '../types/profile';
import { useTheme } from '../contexts/theme-context';

interface UserProfileStatsProps {
  profile: UserProfile;
}

export function UserProfileStats({ profile }: UserProfileStatsProps) {
  const { theme } = useTheme();

  // For now, we'll show placeholder stats
  // In a real app, you'd fetch these from the API
  const stats = [
    { label: 'Friends', value: '0' },
    { label: 'Groups', value: '0' },
    { label: 'Newsflashes', value: '0' },
  ];

  const getContainerStyle = () => ({
    backgroundColor: theme.colors.surface,
    paddingVertical: theme.space[5],
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.divider,
  });

  const getStatsRowStyle = () => ({
    flexDirection: 'row' as const,
    justifyContent: 'space-around' as const,
    paddingHorizontal: theme.space[5],
  });

  const getStatItemStyle = () => ({
    alignItems: 'center' as const,
  });

  const getStatValueStyle = () => ({
    fontSize: theme.fonts.roles.headline.size,
    fontWeight: theme.fonts.roles.headline.weight,
    color: theme.colors.text,
    marginBottom: theme.space[1],
  });

  const getStatLabelStyle = () => ({
    fontSize: theme.fonts.roles.caption.size,
    color: theme.colors['text-muted'],
    textTransform: 'uppercase' as const,
    letterSpacing: 0.5,
  });

  return (
    <View style={getContainerStyle()}>
      <View style={getStatsRowStyle()}>
        {stats.map((stat, index) => (
          <View key={stat.label} style={getStatItemStyle()}>
            <Text style={getStatValueStyle()}>{stat.value}</Text>
            <Text style={getStatLabelStyle()}>{stat.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

// Styles are now handled by theme system
