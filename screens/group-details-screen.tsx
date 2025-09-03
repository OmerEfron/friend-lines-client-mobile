import React from 'react';
import { View, Text, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGroupFeed } from '../hooks/use-group-feed';
import { NewsflashItem } from '../components/newsflash-item';
import { NewsflashWithAuthor } from '../services/newsflashes-api';
import { useTheme } from '../contexts/theme-context';
import { TopBar } from '../components/top-bar';

export function GroupDetailsScreen({ route, navigation }: any) {
  const { group } = route.params;
  const { newsflashes, isLoading, error, hasMore, refresh, loadMore } = useGroupFeed(group._id);
  const { theme } = useTheme();

  const renderNewsflash = ({ item }: { item: NewsflashWithAuthor }) => (
    <NewsflashItem 
      newsflash={item} 
      onPress={() => console.log('Newsflash pressed:', item._id)}
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
      <Text style={getEmptyTitleStyle()}>No newsflashes yet</Text>
      <Text style={getEmptySubtitleStyle()}>
        Be the first to share something in this group!
      </Text>
    </View>
  );

  const handleSearch = () => {
    console.log('Search pressed');
  };

  const handleInbox = () => {
    console.log('Inbox pressed');
  };

  const handleLogo = () => {
    navigation.goBack();
  };

  const getContainerStyle = () => ({
    flex: 1,
    backgroundColor: theme.colors.bg,
  });

  const getHeaderStyle = () => ({
    padding: theme.space[5],
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.divider,
  });

  const getTitleStyle = () => ({
    fontSize: theme.fonts.roles.headline.size,
    fontWeight: theme.fonts.roles.headline.weight,
    color: theme.colors.text,
    marginBottom: theme.space[1],
  });

  const getMemberCountStyle = () => ({
    fontSize: theme.fonts.roles.caption.size,
    color: theme.colors['text-muted'],
    marginBottom: theme.space[2],
  });

  const getDescriptionStyle = () => ({
    fontSize: theme.fonts.roles.body.size,
    color: theme.colors.text,
    lineHeight: theme.fonts.roles.body.size * theme.fonts.roles.body.lh,
  });

  const getListStyle = () => ({
    padding: theme.space[4],
    paddingBottom: theme.space[8],
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
          title={group.name}
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
        title={group.name}
        onPressLogo={handleLogo}
        onPressSearch={handleSearch}
        onPressInbox={handleInbox}
      />
      
      <View style={getHeaderStyle()}>
        <Text style={getTitleStyle()}>{group.name}</Text>
        <Text style={getMemberCountStyle()}>{group.members.length} members</Text>
        {group.description && (
          <Text style={getDescriptionStyle()}>{group.description}</Text>
        )}
      </View>

      <FlatList
        data={newsflashes}
        renderItem={renderNewsflash}
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
