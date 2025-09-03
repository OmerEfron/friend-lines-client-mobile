import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useFriends } from '../hooks/use-friends';
import { useAuth } from '../contexts/auth-context';
import { useTheme } from '../contexts/theme-context';
import { FriendsScreenHeader } from '../components/friends-screen-header';
import { FriendsScreenList } from '../components/friends-screen-list';
import { FriendsScreenError } from '../components/friends-screen-error';
import { TopBar } from '../components/top-bar';

export function FriendsScreen() {
  const { friends, isLoading, error, hasMore, refresh, loadMore } = useFriends();
  const { logout } = useAuth();
  const { theme } = useTheme();
  const navigation = useNavigation();

  const handleFriendPress = (friend: any) => {
    navigation.navigate('UserProfile', { userId: friend.uuid });
  };

  const handleSearch = () => {
    // Navigate to search screen
    console.log('Search pressed');
  };

  const handleInbox = () => {
    navigation.navigate('Inbox');
  };

  const handleLogo = () => {
    navigation.navigate('Home');
  };

  const getContainerStyle = () => ({
    flex: 1,
    backgroundColor: theme.colors.bg,
  });

  if (error) {
    return (
      <SafeAreaView style={getContainerStyle()}>
        <TopBar
          title="Friends"
          onPressLogo={handleLogo}
          onPressSearch={handleSearch}
          onPressInbox={handleInbox}
        />
        <FriendsScreenError error={error} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={getContainerStyle()}>
      <TopBar
        title="Friends"
        onPressLogo={handleLogo}
        onPressSearch={handleSearch}
        onPressInbox={handleInbox}
      />
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
