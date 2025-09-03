import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/theme-context';

interface TopBarProps {
  title: string;
  section?: 'Main' | 'Groups' | 'Friends' | string;
  onPressLogo?: () => void;
  onPressSearch?: () => void;
  onPressInbox?: () => void;
  onOpenSectionPicker?: () => void;
  badgeCount?: number;
  testID?: string;
}

export function TopBar({
  title,
  section,
  onPressLogo,
  onPressSearch,
  onPressInbox,
  onOpenSectionPicker,
  badgeCount = 0,
  testID,
}: TopBarProps) {
  const { theme } = useTheme();

  const getContainerStyle = (): ViewStyle => ({
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.space[4],
    paddingVertical: theme.space[3],
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.divider,
    minHeight: 56,
  });

  const getLeftSectionStyle = (): ViewStyle => ({
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  });

  const getCenterSectionStyle = (): ViewStyle => ({
    flex: 2,
    alignItems: 'center',
  });

  const getRightSectionStyle = (): ViewStyle => ({
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.space[3],
    flex: 1,
    justifyContent: 'flex-end',
  });

  const getLogoStyle = (): ViewStyle => ({
    padding: theme.space[2],
    borderRadius: theme.radius.sm,
  });

  const getTitleStyle = (): TextStyle => ({
    fontSize: theme.fonts.roles.title.size,
    fontWeight: theme.fonts.roles.title.weight,
    color: theme.colors.text,
  });

  const getSectionStyle = (): TextStyle => ({
    fontSize: theme.fonts.roles.caption.size,
    color: theme.colors['text-muted'],
    marginTop: theme.space[1],
  });

  const getIconButtonStyle = (): ViewStyle => ({
    padding: theme.space[2],
    borderRadius: theme.radius.sm,
    minWidth: 44,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  });

  const getBadgeStyle = (): ViewStyle => ({
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: theme.colors.semantic.error,
    borderRadius: theme.radius.pill,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  });

  const getBadgeTextStyle = (): TextStyle => ({
    color: theme.colors.surface,
    fontSize: 10,
    fontWeight: theme.fonts.weight.bold,
  });

  return (
    <View style={getContainerStyle()} testID={testID}>
      {/* Left Section - Logo */}
      <View style={getLeftSectionStyle()}>
        {onPressLogo && (
          <Pressable
            onPress={onPressLogo}
            style={({ pressed }) => [
              getLogoStyle(),
              pressed && { backgroundColor: theme.colors.states.pressed },
            ]}
            accessibilityRole="button"
            accessibilityLabel="Home"
          >
            <Ionicons
              name="home-outline"
              size={24}
              color={theme.colors.brand.primary}
            />
          </Pressable>
        )}
      </View>

      {/* Center Section - Title & Section */}
      <View style={getCenterSectionStyle()}>
        <Pressable
          onPress={onOpenSectionPicker}
          style={({ pressed }) => [
            pressed && { opacity: 0.7 },
          ]}
          accessibilityRole="button"
          accessibilityLabel={`Current section: ${section || 'Main'}`}
        >
          <Text style={getTitleStyle()}>
            {title}
          </Text>
          {section && (
            <Text style={getSectionStyle()}>
              {section}
            </Text>
          )}
        </Pressable>
      </View>

      {/* Right Section - Search & Inbox */}
      <View style={getRightSectionStyle()}>
        {onPressSearch && (
          <Pressable
            onPress={onPressSearch}
            style={({ pressed }) => [
              getIconButtonStyle(),
              pressed && { backgroundColor: theme.colors.states.pressed },
            ]}
            accessibilityRole="button"
            accessibilityLabel="Search"
          >
            <Ionicons
              name="search-outline"
              size={24}
              color={theme.colors['text-muted']}
            />
          </Pressable>
        )}

        {onPressInbox && (
          <Pressable
            onPress={onPressInbox}
            style={({ pressed }) => [
              getIconButtonStyle(),
              pressed && { backgroundColor: theme.colors.states.pressed },
            ]}
            accessibilityRole="button"
            accessibilityLabel="Inbox"
          >
            <Ionicons
              name="mail-outline"
              size={24}
              color={theme.colors['text-muted']}
            />
            {badgeCount > 0 && (
              <View style={getBadgeStyle()}>
                <Text style={getBadgeTextStyle()}>
                  {badgeCount > 99 ? '99+' : badgeCount}
                </Text>
              </View>
            )}
          </Pressable>
        )}
      </View>
    </View>
  );
}
