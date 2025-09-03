import React from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { NewsflashItem } from './newsflash-item';

interface NewsflashWithAuthor {
  _id: string;
  authorId: string;
  content: string;
  targetType: 'friends' | 'group';
  targetId?: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  author: {
    uuid: string;
    username: string;
    fullName: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
}

interface UserNewsflashesListProps {
  newsflashes: NewsflashWithAuthor[];
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
  onRefresh: () => void;
  onLoadMore: () => void;
}

export function UserNewsflashesList({
  newsflashes,
  isLoading,
  error,
  hasMore,
  onRefresh,
  onLoadMore,
}: UserNewsflashesListProps) {
  const renderNewsflash = ({ item }: { item: NewsflashWithAuthor }) => (
    <NewsflashItem newsflash={item} />
  );

  const renderFooter = () => {
    if (!isLoading || newsflashes.length === 0) return null;
    
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color="#007AFF" />
      </View>
    );
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No newsflashes yet</Text>
      <Text style={styles.emptySubtext}>
        This user hasn't shared any newsflashes
      </Text>
    </View>
  );

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load newsflashes</Text>
        <Text style={styles.errorSubtext}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Newsflashes</Text>
      <FlatList
        data={newsflashes}
        renderItem={renderNewsflash}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={renderFooter}
        refreshControl={
          <RefreshControl refreshing={isLoading && newsflashes.length === 0} onRefresh={onRefresh} />
        }
        onEndReached={hasMore ? onLoadMore : undefined}
        onEndReachedThreshold={0.1}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  errorContainer: {
    padding: 20,
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF3B30',
    marginBottom: 4,
  },
  errorSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});
