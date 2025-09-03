import React from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useUserProfile, useUserNewsflashes } from '../hooks';
import { UserProfileHeader } from '../components/user-profile-header';
import { UserProfileStats } from '../components/user-profile-stats';
import { UserNewsflashesList } from '../components/user-newsflashes-list';
import { UserProfileError } from '../components/user-profile-error';
import { sharedStyles } from '../styles/shared';

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

  if (profileError) {
    return <UserProfileError error={profileError} />;
  }

  if (profileLoading) {
    return (
      <SafeAreaView style={sharedStyles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading profile...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!profile) {
    return <UserProfileError error="Profile not found" />;
  }

  return (
    <SafeAreaView style={sharedStyles.container}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
});
