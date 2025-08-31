import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useAuth } from '../contexts/auth-context';
import { FriendshipsAPI } from '../services';

interface UserSearchItemProps {
  user: {
    uuid: string;
    username: string;
    fullName: string;
    email: string;
  };
}

export function UserSearchItem({ user }: UserSearchItemProps) {
  const { user: currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleSendFriendRequest = async () => {
    if (!currentUser) return;

    try {
      setIsLoading(true);
      const token = await import('@react-native-async-storage/async-storage')
        .then(AsyncStorage => AsyncStorage.default.getItem('token'));

      if (!token) {
        Alert.alert('Error', 'Authentication token not found');
        return;
      }

      await FriendshipsAPI.sendFriendRequest(
        { friendId: user.uuid },
        token
      );

      Alert.alert('Success', 'Friend request sent successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to send friend request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const isCurrentUser = currentUser?.uuid === user.uuid;

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Text style={styles.username}>@{user.username}</Text>
        <Text style={styles.fullName}>{user.fullName}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      {!isCurrentUser && (
        <TouchableOpacity
          style={[styles.addButton, isLoading && styles.addButtonDisabled]}
          onPress={handleSendFriendRequest}
          disabled={isLoading}
        >
          <Text style={styles.addButtonText}>
            {isLoading ? 'Sending...' : 'Add Friend'}
          </Text>
        </TouchableOpacity>
      )}

      {isCurrentUser && (
        <View style={styles.currentUserBadge}>
          <Text style={styles.currentUserText}>You</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
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
  email: {
    fontSize: 14,
    color: '#666',
  },
  addButton: {
    backgroundColor: '#34C759',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  addButtonDisabled: {
    backgroundColor: '#ccc',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  currentUserBadge: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  currentUserText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
});
