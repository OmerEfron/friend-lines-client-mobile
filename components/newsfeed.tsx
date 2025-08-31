import React, { forwardRef, useImperativeHandle } from 'react';
import {
  View,
  Text,
  StyleSheet,
  RefreshControl,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { NewsflashItem } from './newsflash-item';
import { useNewsflashes } from '../hooks/use-newsflashes';
import { NewsflashWithAuthor } from '../services';

export interface NewsfeedRef {
  refresh: () => void;
}

export const Newsfeed = forwardRef<NewsfeedRef>((props, ref) => {
  const { newsflashes, isLoading, error, hasMore, refresh, loadMore } = useNewsflashes();

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
      <View style={styles.footer}>
        <ActivityIndicator size="small" color="#007AFF" />
        <Text style={styles.loadingText}>Loading more...</Text>
      </View>
    );
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>No newsflashes yet</Text>
      <Text style={styles.emptySubtitle}>
        When your friends post newsflashes, they'll appear here
      </Text>
    </View>
  );

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorTitle}>Something went wrong</Text>
        <Text style={styles.errorMessage}>{error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={newsflashes}
      renderItem={renderNewsflash}
      keyExtractor={(item) => item._id}
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refresh} />
      }
      onEndReached={loadMore}
      onEndReachedThreshold={0.1}
      ListFooterComponent={renderFooter}
      ListEmptyComponent={renderEmpty}
      showsVerticalScrollIndicator={false}
    />
  );
});

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 32,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  loadingText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 32,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  errorContainer: {
    alignItems: 'center',
    padding: 32,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FF3B30',
    marginBottom: 8,
  },
  errorMessage: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
});
