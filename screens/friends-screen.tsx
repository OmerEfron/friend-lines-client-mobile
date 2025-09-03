import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useFriends } from '../hooks/use-friends';
import { useAuth } from '../contexts/auth-context';
import { FriendsScreenHeader } from '../components/friends-screen-header';
import { FriendsScreenList } from '../components/friends-screen-list';
import { FriendsScreenError } from '../components/friends-screen-error';
import { sharedStyles } from '../styles/shared';

export function FriendsScreen() {
  const { friends, isLoading, error, hasMore, refresh, loadMore } = useFriends();
  const { logout } = useAuth();
  const navigation = useNavigation();

  const handleFriendPress = (friend: any) => {
    navigation.navigate('UserProfile', { userId: friend.uuid });
  };

  if (error) {
    return <FriendsScreenError error={error} />;
  }

  return (
    <SafeAreaView style={sharedStyles.container}>
      <FriendsScreenHeader friendsCount={friends.length} onLogout={logout} />
      <FriendsScreenList
        friends={friends}
        isLoading={isLoading}
        hasMore={hasMore}
        onRefresh={refresh}
        onLoadMore={loadMore}
        onFriendPress={handleFriendPress}
      />
    </SafeAreaView>
  );
}
