import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { FriendshipsAPI } from '../services';

interface FriendRequestActionsProps {
  request: any;
  onAccept: () => void;
  onReject: () => void;
}

export function FriendRequestActions({ request, onAccept, onReject }: FriendRequestActionsProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleAccept = async () => {
    try {
      setIsLoading(true);

      const friendId = request.uuid;
      if (!friendId) {
        Alert.alert('Error', 'Invalid friend request data');
        return;
      }

      console.log('🔍 [FriendRequestActions] Accepting request for user:', {
        username: request.username,
        uuid: request.uuid,
        requestId: request._id
      });

      await FriendshipsAPI.acceptFriendRequest({ friendId });

      Alert.alert('Success', 'Friend request accepted!');
      onAccept();
    } catch (error: any) {
      const errorMessage = error?.message || 'Unknown error';
      
      console.log('❌ [FriendRequestActions] Error accepting request:', errorMessage);
      
      if (errorMessage.includes('No friend request found')) {
        Alert.alert('Request Not Found', 'This friend request is no longer available or has already been processed.');
        onAccept();
      } else if (errorMessage.includes('User not found')) {
        Alert.alert('User Not Found', 'The user who sent this request no longer exists.');
        onAccept();
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

  return (
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
  );
}

const styles = StyleSheet.create({
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
