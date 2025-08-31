import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FriendshipsAPI, PendingRequestsResponse } from '../services';

type FriendRequest = PendingRequestsResponse['data']['requests'][0];

interface FriendRequestItemProps {
  request: FriendRequest;
  onAccept: () => void;
  onReject: () => void;
}

export function FriendRequestItem({ request, onAccept, onReject }: FriendRequestItemProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleAccept = async () => {
    try {
      setIsLoading(true);
      const token = await AsyncStorage.getItem('token');
      
      if (!token) {
        Alert.alert('Error', 'Authentication token not found');
        return;
      }

      // Use the uuid from the request object
      const friendId = request.uuid;
      if (!friendId) {
        Alert.alert('Error', 'Invalid friend request data');
        return;
      }

      await FriendshipsAPI.acceptFriendRequest(
        { friendId },
        token
      );

      Alert.alert('Success', 'Friend request accepted!');
      onAccept();
    } catch (error: any) {
      // Handle specific API error cases gracefully
      const errorMessage = error?.message || 'Unknown error';
      
      if (errorMessage.includes('No pending request found')) {
        Alert.alert('Request Not Found', 'This friend request is no longer available.');
        onAccept(); // Refresh the list
      } else if (errorMessage.includes('User not found')) {
        Alert.alert('User Not Found', 'The user who sent this request no longer exists.');
        onAccept(); // Refresh the list
      } else {
        Alert.alert('Error', 'Failed to accept friend request. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleReject = () => {
    Alert.alert(
      'Reject Request',
      'Are you sure you want to reject this friend request?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Reject', style: 'destructive', onPress: onReject },
      ]
    );
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    } catch {
      return '';
    }
  };

  // Get the first character for avatar from the username
  const getAvatarChar = () => {
    return request.username && request.username.length > 0 
      ? request.username.charAt(0).toUpperCase() 
      : '?';
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {getAvatarChar()}
        </Text>
      </View>

      <View style={styles.userInfo}>
        <Text style={styles.username}>@{request.username}</Text>
        <Text style={styles.fullName}>{request.fullName}</Text>
        <Text style={styles.dateText}>
          Request sent {formatDate(request.createdAt)}
        </Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.acceptButton, isLoading && styles.buttonDisabled]}
          onPress={handleAccept}
          disabled={isLoading}
        >
          <Text style={styles.acceptButtonText}>
            {isLoading ? 'Accepting...' : 'Accept'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.rejectButton, isLoading && styles.buttonDisabled]}
          onPress={handleReject}
          disabled={isLoading}
        >
          <Text style={styles.rejectButtonText}>Reject</Text>
        </TouchableOpacity>
      </View>
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
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FF9500',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
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
  dateText: {
    fontSize: 14,
    color: '#666',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  acceptButton: {
    backgroundColor: '#34C759',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  rejectButton: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  acceptButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  rejectButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});
