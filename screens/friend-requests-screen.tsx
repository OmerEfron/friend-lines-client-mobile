import React from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFriendRequests } from '../hooks/use-friend-requests';
import { FriendRequestItem } from '../components/friend-request-item';
import { useTheme } from '../contexts/theme-context';
import { TopBar } from '../components/top-bar';

export function FriendRequestsScreen() {
  const { requests, isLoading, error, hasMore, refresh, loadMore } = useFriendRequests();
  const { theme } = useTheme();

  const renderRequest = ({ item }: { item: any }) => (
    <FriendRequestItem 
      request={item} 
      onAccept={() => refresh()}
      onReject={() => refresh()}
    />
  );

  const renderFooter = () => {
    if (!hasMore) return null;
    
    return (
      <View style={getFooterStyle()}>
        <ActivityIndicator size="small" color={theme.colors.brand.primary} />
        <Text style={getLoadingTextStyle()}>Loading more...</Text>
      </View>
    );
  };

  const renderEmpty = () => (
    <View style={getEmptyStyle()}>
      <Text style={getEmptyTitleStyle()}>You're all caught up</Text>
      <Text style={getEmptySubtitleStyle()}>
        When someone sends you a friend request, it will appear here
      </Text>
    </View>
  );

  const handleSearch = () => {
    // Navigate to search screen
    console.log('Search pressed');
  };

  const handleInbox = () => {
    // Already in inbox
    console.log('Already in inbox');
  };

  const handleLogo = () => {
    // Navigate to home
    console.log('Logo pressed');
  };

  const getContainerStyle = () => ({
    flex: 1,
    backgroundColor: theme.colors.bg,
  });

  const getListStyle = () => ({
    padding: theme.space[4],
  });

  const getFooterStyle = () => ({
    flexDirection: 'row' as const,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    padding: theme.space[4],
  });

  const getLoadingTextStyle = () => ({
    marginLeft: theme.space[2],
    fontSize: theme.fonts.roles.caption.size,
    color: theme.colors['text-muted'],
  });

  const getEmptyStyle = () => ({
    alignItems: 'center' as const,
    padding: theme.space[8],
  });

  const getEmptyTitleStyle = () => ({
    fontSize: theme.fonts.roles.title.size,
    fontWeight: theme.fonts.roles.title.weight,
    color: theme.colors.text,
    marginBottom: theme.space[2],
  });

  const getEmptySubtitleStyle = () => ({
    fontSize: theme.fonts.roles.body.size,
    color: theme.colors['text-muted'],
    textAlign: 'center' as const,
    lineHeight: theme.fonts.roles.body.size * theme.fonts.roles.body.lh,
  });

  const getErrorStyle = () => ({
    flex: 1,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    padding: theme.space[8],
  });

  const getErrorTitleStyle = () => ({
    fontSize: theme.fonts.roles.title.size,
    fontWeight: theme.fonts.roles.title.weight,
    color: theme.colors.semantic.error,
    marginBottom: theme.space[2],
  });

  const getErrorMessageStyle = () => ({
    fontSize: theme.fonts.roles.body.size,
    color: theme.colors['text-muted'],
    textAlign: 'center' as const,
    lineHeight: theme.fonts.roles.body.size * theme.fonts.roles.body.lh,
  });

  if (error) {
    return (
      <SafeAreaView style={getContainerStyle()}>
        <TopBar
          title="Inbox"
          onPressLogo={handleLogo}
          onPressSearch={handleSearch}
          onPressInbox={handleInbox}
        />
        <View style={getErrorStyle()}>
          <Text style={getErrorTitleStyle()}>Something went wrong</Text>
          <Text style={getErrorMessageStyle()}>{error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={getContainerStyle()}>
      <TopBar
        title="Inbox"
        onPressLogo={handleLogo}
        onPressSearch={handleSearch}
        onPressInbox={handleInbox}
        badgeCount={requests.length}
      />

      <FlatList
        data={requests}
        renderItem={renderRequest}
        keyExtractor={(item) => item._id}
        contentContainerStyle={getListStyle()}
        refreshControl={
          <RefreshControl 
            refreshing={isLoading} 
            onRefresh={refresh}
            tintColor={theme.colors.brand.primary}
          />
        }
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

// Styles are now handled by theme system
