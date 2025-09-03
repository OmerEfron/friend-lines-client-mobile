import React, { forwardRef, useImperativeHandle } from 'react';
import {
  View,
  Text,
  RefreshControl,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { NewsflashItem } from './newsflash-item';
import { useNewsflashes } from '../hooks/use-newsflashes';
import { NewsflashWithAuthor } from '../services';
import { useTheme } from '../contexts/theme-context';

export interface NewsfeedRef {
  refresh: () => void;
}

export const Newsfeed = forwardRef<NewsfeedRef>((props, ref) => {
  const { newsflashes, isLoading, error, hasMore, refresh, loadMore } = useNewsflashes();
  const { theme } = useTheme();

  useImperativeHandle(ref, () => ({
    refresh
  }));

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
        When your friends post newsflashes, they'll appear here
      </Text>
    </View>
  );

  const getContainerStyle = () => ({
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
      <View style={getErrorStyle()}>
        <Text style={getErrorTitleStyle()}>Something went wrong</Text>
        <Text style={getErrorMessageStyle()}>{error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={newsflashes}
      renderItem={renderNewsflash}
      keyExtractor={(item) => item._id}
      contentContainerStyle={getContainerStyle()}
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
  );
});

// Styles are now handled by theme system
