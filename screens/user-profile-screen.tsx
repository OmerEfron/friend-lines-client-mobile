import React from 'react';
import { SafeAreaView, ScrollView, View, Text, ActivityIndicator } from 'react-native';
import { useUserProfile, useUserNewsflashes } from '../hooks';
import { UserProfileHeader } from '../components/user-profile-header';
import { UserProfileStats } from '../components/user-profile-stats';
import { UserNewsflashesList } from '../components/user-newsflashes-list';
import { UserProfileError } from '../components/user-profile-error';
import { useTheme } from '../contexts/theme-context';
import { TopBar } from '../components/top-bar';

interface UserProfileScreenProps {
  route?: {
    params?: {
      userId?: string;
    };
  };
}

export function UserProfileScreen({ route }: UserProfileScreenProps) {
  const { userId } = route?.params || {};
  const { profile, isLoading: profileLoading, error: profileError } = useUserProfile(userId);
  const { newsflashes, isLoading: newsflashesLoading, error: newsflashesError, hasMore, refresh, loadMore } = useUserNewsflashes(userId);
  const { theme } = useTheme();

  const handleSearch = () => {
    // Navigate to search screen
    console.log('Search pressed');
  };

  const handleInbox = () => {
    // Navigate to inbox
    console.log('Inbox pressed');
  };

  const handleLogo = () => {
    // Navigate to home
    console.log('Logo pressed');
  };

  const getContainerStyle = () => ({
    flex: 1,
    backgroundColor: theme.colors.bg,
  });

  const getLoadingStyle = () => ({
    flex: 1,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    padding: theme.space[5],
  });

  const getLoadingTextStyle = () => ({
    marginTop: theme.space[3],
    fontSize: theme.fonts.roles.body.size,
    color: theme.colors['text-muted'],
  });

  if (profileError) {
    return (
      <SafeAreaView style={getContainerStyle()}>
        <TopBar
          title="Profile"
          onPressLogo={handleLogo}
          onPressSearch={handleSearch}
          onPressInbox={handleInbox}
        />
        <UserProfileError error={profileError} />
      </SafeAreaView>
    );
  }

  if (profileLoading) {
    return (
      <SafeAreaView style={getContainerStyle()}>
        <TopBar
          title="Profile"
          onPressLogo={handleLogo}
          onPressSearch={handleSearch}
          onPressInbox={handleInbox}
        />
        <View style={getLoadingStyle()}>
          <ActivityIndicator size="large" color={theme.colors.brand.primary} />
          <Text style={getLoadingTextStyle()}>Loading profile...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!profile) {
    return (
      <SafeAreaView style={getContainerStyle()}>
        <TopBar
          title="Profile"
          onPressLogo={handleLogo}
          onPressSearch={handleSearch}
          onPressInbox={handleInbox}
        />
        <UserProfileError error="Profile not found" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={getContainerStyle()}>
      <TopBar
        title="Profile"
        onPressLogo={handleLogo}
        onPressSearch={handleSearch}
        onPressInbox={handleInbox}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <UserProfileHeader profile={profile} />
        <UserProfileStats profile={profile} />
        <UserNewsflashesList
          newsflashes={newsflashes}
          isLoading={newsflashesLoading}
          error={newsflashesError}
          hasMore={hasMore}
          onRefresh={refresh}
          onLoadMore={loadMore}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

// Styles are now handled by theme system
