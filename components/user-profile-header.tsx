import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { UserProfile } from '../types/profile';

interface UserProfileHeaderProps {
  profile: UserProfile;
}

export function UserProfileHeader({ profile }: UserProfileHeaderProps) {
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

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {profile.fullName.charAt(0).toUpperCase()}
        </Text>
      </View>
      
      <View style={styles.userInfo}>
        <Text style={styles.fullName}>{profile.fullName}</Text>
        <Text style={styles.username}>@{profile.username}</Text>
        <Text style={styles.email}>{profile.email}</Text>
        <Text style={styles.joinedDate}>
          Joined {formatDate(profile.createdAt)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    color: '#fff',
    fontSize: 36,
    fontWeight: '600',
  },
  userInfo: {
    alignItems: 'center',
  },
  fullName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  username: {
    fontSize: 16,
    color: '#007AFF',
    marginBottom: 8,
  },
  email: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  joinedDate: {
    fontSize: 12,
    color: '#999',
  },
});
