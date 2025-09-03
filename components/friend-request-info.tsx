import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface FriendRequestInfoProps {
  username: string;
  fullName: string;
  createdAt: string;
}

export function FriendRequestInfo({ username, fullName, createdAt }: FriendRequestInfoProps) {
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    } catch {
      return '';
    }
  };

  return (
    <View style={styles.userInfo}>
      <Text style={styles.username}>@{username}</Text>
      <Text style={styles.fullName}>{fullName}</Text>
      <Text style={styles.dateText}>
        Request sent {formatDate(createdAt)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: 4,
  },
  fullName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
    marginBottom: 2,
  },
  dateText: {
    fontSize: 14,
    color: '#666',
  },
});
