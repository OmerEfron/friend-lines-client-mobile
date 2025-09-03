import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface FriendRequestAvatarProps {
  username: string;
}

export function FriendRequestAvatar({ username }: FriendRequestAvatarProps) {
  const getAvatarChar = () => {
    return username && username.length > 0 
      ? username.charAt(0).toUpperCase() 
      : '?';
  };

  return (
    <View style={styles.avatar}>
      <Text style={styles.avatarText}>
        {getAvatarChar()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
