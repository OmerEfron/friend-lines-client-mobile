import React from 'react';
import { View, StyleSheet } from 'react-native';
import { PendingRequestsResponse } from '../services';
import { FriendRequestAvatar } from './friend-request-avatar';
import { FriendRequestInfo } from './friend-request-info';
import { FriendRequestActions } from './friend-request-actions';

type FriendRequest = PendingRequestsResponse['data']['requests'][0];

interface FriendRequestItemProps {
  request: FriendRequest;
  onAccept: () => void;
  onReject: () => void;
}

export function FriendRequestItem({ request, onAccept, onReject }: FriendRequestItemProps) {
  return (
    <View style={styles.container}>
      <FriendRequestAvatar username={request.username} />
      <FriendRequestInfo
        username={request.username}
        fullName={request.fullName}
        createdAt={request.createdAt}
      />
      <FriendRequestActions
        request={request}
        onAccept={onAccept}
        onReject={onReject}
      />
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
});
