import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

interface FriendItemProps {
  friend: {
    uuid: string;
    username: string;
    fullName: string;
    email: string;
    createdAt?: string;
  };
  onPress?: () => void;
}

export function FriendItem({ friend, onPress }: FriendItemProps) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    } catch {
      return '';
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {friend.fullName.charAt(0).toUpperCase()}
        </Text>
      </View>

      <View style={styles.userInfo}>
        <Text style={styles.fullName}>{friend.fullName}</Text>
        <Text style={styles.username}>@{friend.username}</Text>
        {friend.createdAt && (
          <Text style={styles.dateText}>
            Friends since {formatDate(friend.createdAt)}
          </Text>
        )}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.messageButton}>
          <Text style={styles.messageButtonText}>Message</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
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
    backgroundColor: '#007AFF',
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
  fullName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  username: {
    fontSize: 14,
    color: '#007AFF',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 12,
    color: '#999',
  },
  actions: {
    marginLeft: 16,
  },
  messageButton: {
    backgroundColor: '#34C759',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  messageButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
});
